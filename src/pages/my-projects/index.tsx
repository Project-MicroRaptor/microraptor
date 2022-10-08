import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";
import { fetcher } from "../../utils/swr";
import useSWR from "swr";

import type { AuthNextPage } from "../../types/appProps";
import type { ProjectCards } from "../../types/projectTypes";

import styles from "./myProjects.module.scss";
import ProjectsSlider from "../../components/ProjectsSlider/ProjectsSlider";
import Link from "next/link";

const MyProjects: AuthNextPage = (props) => {
  const { data, error } = useSWR<ProjectCards>("/api/my-projects", fetcher);

  return (
    <>
      <Head>
        <title>MicroRaptor - My Projects</title>
        <meta name="description" content="My Projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.heading}>My Projects</h1>
        {data && data.length > 0 ? (
          <ProjectsSlider projects={data} />
        ) : (
          <h2 className={styles.noProj}>
            You have no projects, you can create one{" "}
            <Link href="/create-project">
              <a className={styles.createProject}>here!</a>
            </Link>
          </h2>
        )}
      </div>
    </>
  );
};

export default MyProjects;

MyProjects.requireAuth = true;
