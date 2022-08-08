import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";

import type { AuthNextPage } from "../../types/appProps";

const CreateProject: AuthNextPage = (props) => {
  return (
    <>
      <Head>
        <title>MicroRaptor - Create Project</title>
        <meta name="description" content="Create a Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </>
  );
}

export default CreateProject;

CreateProject.requireAuth = true;
