import Head from "next/head";
import Image from "next/image";
import ProjectCardBrowser from "../components/ProjectCardBrowser/ProjectCardBrowser";
import NavBar from "../components/NavBar/NavBar";
import styles from "../styles/Home.module.scss";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MicroRaptor</title>
        <meta name="description" content="Welcome to Microraptor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <ProjectCardBrowser />
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
