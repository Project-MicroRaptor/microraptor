import Head from "next/head";
import NavBar from "../../components/NavBar/NavBar";
import { fetcher } from "../../utils/swr";
import useSWR from "swr";
import ProjectCardwButton from "../../components/ProjectCardwButton/ProjectCardwButton";

import type { AuthNextPage } from "../../types/appProps";
import type { ProjectCards } from "../../types/projectTypes";

import styles from "./myProjects.module.scss";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

const MyProjects: AuthNextPage = (props) => {
  const { data, error } = useSWR<ProjectCards>("/api/my-projects", fetcher);

  const Arrow = ({ text, className }: { text: string; className: string }) => {
    return <div className={className}>{text}</div>;
  };

  const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
  const ArrowRight = Arrow({ text: ">", className: "arrow-next" });
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
          {cards && (
            <ScrollMenu LeftArrow={ArrowLeft} RightArrow={ArrowRight}>
              {cards}
            </ScrollMenu>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProjects;

MyProjects.requireAuth = true;
