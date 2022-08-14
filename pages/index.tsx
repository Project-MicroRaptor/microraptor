import Head from "next/head";
import Image from "next/image";
import ProjectCardBrowser from "../components/ProjectCardBrowser/ProjectCardBrowser";
import NavBar from "../components/NavBar/NavBar";
import { prisma } from "../db/prisma"
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
  });
  return { props: { projects } };
}

const Home: NextPage<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MicroRaptor</title>
        <meta name="description" content="Welcome to Microraptor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <ProjectCardBrowser {...props} />
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
