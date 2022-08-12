import Head from "next/head";
import Image from "next/image";
import LogInOutButton from "../components/LogInOutButton/LogInOutButton";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import NavBar from "../components/NavBar/NavBar";

import { PrismaClient } from "@prisma/client";
import {prisma} from "./api/auth/prisma"
import styles from "../styles/Home.module.scss";

import type { NextPage } from "next";

type Props = {
  projects: {
    id: string
    name: string
    shortDescription: string
    images: string[]
    currentFunding: number
    targetFunding: number
  }[]
}

export async function getServerSideProps() {
  const projects = await prisma.project.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      images: true,
      currentFunding: true,
      targetFunding: true,
    }
  })
  return { props: {projects} }
}

const Home: NextPage<Props> = ({projects}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MicroRaptor</title>
        <meta name="description" content="Welcome to Microraptor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        {projects.map(project => {
          return <ProjectCard 
            key={project.id} // Each child in a list should have a unique "key" prop.
            name={project.name} 
            shortDescription={project.shortDescription} 
            image={project.images[0]}
            currentFunding={project.currentFunding}
            targetFunding={project.targetFunding}
            />
        })}
        <LogInOutButton></LogInOutButton>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
