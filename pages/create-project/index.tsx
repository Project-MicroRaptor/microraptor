import Head from "next/head";
import LogInOutButton from "../../components/LogInOutButton/LogInOutButton";
import NavBar from "../../components/NavBar/NavBar";
import ProjectForm from "../../components/ProjectCreation/ProjectForm/ProjectForm";

import type { AuthNextPage } from "../../types/appProps";

import styles from "./createProject.module.scss";

const CreateProject: AuthNextPage = (props) => {
  return (
    <>
      <Head>
        <title>MicroRaptor - Create Project</title>
        <meta name="description" content="Create a Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <NavBar />
        <ProjectForm />
        <LogInOutButton />
      </div>
    </>
  );
}

export default CreateProject;

CreateProject.requireAuth = true;
