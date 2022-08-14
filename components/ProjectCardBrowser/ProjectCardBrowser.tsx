import styles from "./ProjectCardBrowser.module.scss"
import ProjectCard from "../ProjectCard/ProjectCard";

type Props = {
    projects: Array<{
        id: string
        name: string
        shortDescription: string
        images: string[]
        currentFunding: number
        targetFunding: number
    }>
};

export default function ProjectCardBrowser(props: Props) {
    if (props.projects.length == 0) {
        return (<p className={styles.noProjects}>There are currently no projects looking for funding. Why not start one by selecting "Create Project" in the upper left hand corner?</p>);
    }

    return (
        <div className={styles.browser}>
            {props.projects.map(project => {
                return <ProjectCard
                    key={project.id}
                    name={project.name}
                    shortDescription={project.shortDescription}
                    image={project.images[0]}
                    currentFunding={project.currentFunding}
                    targetFunding={project.targetFunding}
                />
            })}
        </div>
    );
}
