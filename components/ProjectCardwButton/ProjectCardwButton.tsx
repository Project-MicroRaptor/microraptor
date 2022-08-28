import ProjectCard from "../../components/ProjectCard/ProjectCard";

import styles from "./ProjectCardwButton.module.scss";

export default function ProjectCardwButton() {
  return (
    <ProjectCard
      key={project.id} // Each child in a list should have a unique "key" prop.
      name={project.name}
      shortDescription={project.shortDescription}
      image={project.images[0]}
      currentFunding={project.currentFunding}
      targetFunding={project.targetFunding}
    />
  );
}
