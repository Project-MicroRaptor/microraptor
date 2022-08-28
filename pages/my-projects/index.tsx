import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";
import { fetcher } from "../../utils/swr";
import useSWR from "swr";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import type { AuthNextPage } from "../../types/appProps";
import type { ProjectCards } from "../../types/projectTypes";


import styles from "./myProjects.module.scss";



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
          <h1>Active Projects</h1>
        {data && data.map(project => {
          return <ProjectCard
            key={project.id} // Each child in a list should have a unique "key" prop.
            name={project.name}
            shortDescription={project.shortDescription}
            image={project.images[0]}
            currentFunding={project.currentFunding}
            targetFunding={project.targetFunding}
          />
        })}
        </div>
    </>
  );
};

export default MyProjects;

MyProjects.requireAuth = true;
