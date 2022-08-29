import ProjectCard, { ProjectProps } from "../../components/ProjectCard/ProjectCard";

import styles from "./ProjectCardwButton.module.scss";


export default function ProjectCardwButton(props: ProjectProps) {
  return (
    <div className={styles.container}>
    <ProjectCard
      key={key} // Each child in a list should have a unique "key" prop.
      name={props.name}
      shortDescription={props.shortDescription}
      image={props.image}
      currentFunding={props.currentFunding}
      targetFunding={props.targetFunding}
    />
    <button className={styles.button}>Edit</button>
    </div>
  );
}
