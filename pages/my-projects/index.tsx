import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";
import { fetcher } from "../../utils/swr";
import useSWR from "swr";
import ProjectCardwButton from "../../components/ProjectCardwButton/ProjectCardwButton";

import type { AuthNextPage } from "../../types/appProps";
import type { ProjectCards } from "../../types/projectTypes";

import styles from "./myProjects.module.scss";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
  LeftArrow,
  RightArrow,
} from "../../components/HorizontalSlider/arrows";

const MyProjects: AuthNextPage = (props) => {
  const { data, error } = useSWR<ProjectCards>("/api/my-projects", fetcher);

  const Arrows = () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        fontSize: "2.5em",
      }}
    >
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <LeftArrow /> <RightArrow />
      </div>
    </div>
  );

  const cards = data?.map((project) => {
    return (
      <div className={styles.card}>
        <ProjectCardwButton
          key={project.id} // Each child in a list should have a unique "key" prop.
          name={project.name}
          shortDescription={project.shortDescription}
          image={project.images[0]}
          currentFunding={project.currentFunding}
          targetFunding={project.targetFunding}
        />
      </div>
    );
  });
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
        <div className={styles.slider}>
          {cards && <ScrollMenu Header={Arrows}>{cards}</ScrollMenu>}
        </div>
      </div>
    </>
  );
};

export default MyProjects;

MyProjects.requireAuth = true;
