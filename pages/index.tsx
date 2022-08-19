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

      <ProjectCardBrowser />
      
    </div>
  );
};

export default Home;
