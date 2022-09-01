import ProjectSearch from "../ProjectSearch/ProjectSearch"
import ProjectCard from "../ProjectCard/ProjectCard";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../../utils/swr";

import styles from "./ProjectBrowser.module.scss";

type Projects = {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  currentFunding: number;
  targetFunding: number;
}[];

export default function ProjectBrowser() {
  const { data, error } = useSWR<Projects>("/api/projects", fetcher);

  // Error message.
  if (error) return <div>An error occured.</div>;

  // Waiting for data.
  if (!data)
    return (
      <div className={styles.spinnerContainer}>
        <Spinner
          margin="auto"
          width="200px"
          height="200px"
          thickness="12px"
          color="brand.primary"
          emptyColor="gray.200"
          speed="1s"
        />
      </div>
    );

  // No projects.
  if (data.length == 0) {
    return (
      <p className={styles.noProjects}>
        There are currently no projects looking for funding. Why not start one
        by selecting Create Project in the upper left hand corner?
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <ProjectSearch />
      <SimpleGrid className={styles.grid} spacing="40px">
        {data.map((project) => {
          return (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              shortDescription={project.shortDescription}
              image={project.images[0]}
              currentFunding={project.currentFunding}
              targetFunding={project.targetFunding}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
}
