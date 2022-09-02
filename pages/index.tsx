import Head from "next/head";
import ProjectBrowser from "../components/ProjectBrowser/ProjectBrowser";
import NavBar from "../components/NavBar/NavBar";

import type { NextPage, InferGetServerSidePropsType } from "next";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>MicroRaptor</title>
        <meta name="description" content="Welcome to Microraptor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <ProjectBrowser />
      
    </div>
  );
};

export default Home;
