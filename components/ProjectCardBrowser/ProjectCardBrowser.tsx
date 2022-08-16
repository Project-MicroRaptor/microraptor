import styles from "./ProjectCardBrowser.module.scss"
import ProjectCard from "../ProjectCard/ProjectCard";
import { SimpleGrid, Spinner, Grid } from '@chakra-ui/react'
import useSWR from 'swr'

type Projects = {
    id: string
    name: string
    shortDescription: string
    images: string[]
    currentFunding: number
    targetFunding: number
}[];

const fetcher = async () => {
    const response = await fetch('http://localhost:3000/api/projects');
    const data: Projects = await response.json();
    return data;
}

export default function ProjectCardBrowser() {
    const { data, error } = useSWR('projects', fetcher);

    // Error message.
    if (error) return <div>An error occured.</div>;

    // Waiting for data.
    if (!data) return <Spinner />;

    // No projects.
    if (data.length == 0) {
        return (<p className={styles.noProjects}>There are currently no projects looking for funding. Why not start one by selecting Create Project in the upper left hand corner?</p>);
    }

    return (
        <SimpleGrid className={styles.grid} columns={[1,2,3,4]} minChildWidth="350px" spacing="20px">
            {data.map(project => {
                return (
                    <ProjectCard
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
    );
}
