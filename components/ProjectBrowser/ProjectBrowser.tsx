import ProjectSearch from "../ProjectSearch/ProjectSearch";
import ProjectCard from "../ProjectCard/ProjectCard";
import { SimpleGrid, Spinner, Heading } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/swr";
import { SearchType } from "../../types/search";

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
  const [selectionState, setSelection] = useState(SearchType.Featured);
  const [categoryState, setCategory] = useState<string | null>(null);
  const [distanceState, setDistance] = useState<number | null>(null);
  const [searchState, setSearch] = useState<string | null>(null);

  var queryString = "/api/projects?";
  if (searchState) queryString += new URLSearchParams({ name: searchState });
  var { data, error } = useSWR<Projects>(queryString, fetcher);

  return (
    <div className={styles.container}>
      <ProjectSearch
        selectionState={selectionState}
        setSelection={setSelection}
        categoryState={categoryState}
        setCategory={setCategory}
        distanceState={distanceState}
        setDistance={setDistance}
        searchState={searchState}
        setSearch={setSearch}
      />

      {
        // Search Error -- Error Prompt
        error ? (
          <Heading className={styles.error}>An error occured.</Heading>
        ) : // Waiting for Data -- Spinner
        !data ? (
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
        ) : // No Results -- No Projects Prompt
        data.length == 0 ? (
          <div className={styles.noProjects}>
            <Heading size="lg">
              There are currently no projects looking for funding.
            </Heading>
            <br />
            <Heading size="sm">
              Why not start one by selecting Create Project in the upper left
              hand corner?
            </Heading>
          </div>
        ) : (
          // Success -- Display Projects
          <SimpleGrid className={styles.grid} spacing="40px">
            {data.map((project) => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  shortDescription={project.shortDescription}
                  image={project.images[0]}
                  currentFunding={project.currentFunding}
                  targetFunding={project.targetFunding}
                />
              );
            })}
          </SimpleGrid>
        )
      }
    </div>
  );
}
