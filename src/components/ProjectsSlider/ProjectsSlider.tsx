import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { ProjectCardsProps } from "../../types/projectCardProps";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectCardEdit from "../ProjectCardEdit/ProjectCardEdit";
import { LeftArrow, RightArrow } from "./Arrows";

import styles from "./ProjectsSlider.module.scss";

type Props = {
  projects: Array<ProjectCardsProps>;
  editable?: boolean;
};

export default function ProjectsSlider(props: Props) {
  const { projects, editable } = props;

  const Arrows = () => (
    <div className={styles.arrows}>
      <LeftArrow /> <RightArrow />
    </div>
  );

  const cards = projects?.map((project) => {
    return (
      <div key={project.id} className={styles.card}>
        {editable ? (
          <ProjectCardEdit
            id={project.id}
            name={project.name}
            shortDescription={project.shortDescription}
            image={project.images[0]}
            currentFunding={project.currentFunding}
            targetFunding={project.targetFunding}
          />
        ) : (
          <ProjectCard
            id={project.id}
            name={project.name}
            shortDescription={project.shortDescription}
            image={project.images[0]}
            currentFunding={project.currentFunding}
            targetFunding={project.targetFunding}
          />
        )}
      </div>
    );
  });

  return (
    <div className={styles.slider}>
      {cards && (
        <ScrollMenu scrollContainerClassName={styles.scroll} Header={Arrows}>
          {cards}
        </ScrollMenu>
      )}
    </div>
  );
}
