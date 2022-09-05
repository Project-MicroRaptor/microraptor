import ProjectSearch from "../ProjectSearch/ProjectSearch";
import ProjectCard from "../ProjectCard/ProjectCard";
import { SimpleGrid, Spinner, Heading, Link } from "@chakra-ui/react";
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

  // API Route -- Retrieve Projects
  var queryString = "/api/projects?";
  if (searchState) queryString += new URLSearchParams({ name: searchState });
  if (categoryState != null) queryString += new URLSearchParams({ category: categoryState.toString() });
  var { data, error } = useSWR<Projects>(queryString, fetcher);

  function displayProjects() {
    // Search Error -- Error Prompt
    if (error)
      return <Heading className={styles.error}>An error occured.</Heading>;
    // Waiting for Data -- Spinner
    else if (!data) {
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
    }

    // No Results -- No Projects Prompt
    else if (data.length == 0) {
      return (
        <div className={styles.noProjects}>
          <Heading size="lg">
            There are currently no projects looking for funding.
          </Heading>
          <br />
          <Heading size="sm">
            Why not start one by selecting{" "}
            <Link color="brand.primary" href="/create-project">
              Create Project{" "}
            </Link>
            in the upper left hand corner?
          </Heading>
        </div>
      );
    }

    // Success -- Display Projects
    else {
      return (
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
      );
    }
  }

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
      {displayProjects()}
    </div>
  );
}
