import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { ProjectCardsProps } from "../../types/projectCardProps";
import ProjectCardEdit from "../ProjectCardwButton/ProjectCardEdit";
import { LeftArrow, RightArrow } from "./Arrows";

import styles from "./ProjectsSlider.module.scss";

type Props = {
  projects: Array<ProjectCardsProps>;
};

export default function ProjectsSlider(props: Props) {
  const { projects } = props;

  const Arrows = () => (
    <div className={styles.arrows}>
      <LeftArrow /> <RightArrow />
    </div>
  );

  const cards = projects?.map((project) => {
    return (
      <div key={project.id} className={styles.card}>
        <ProjectCardEdit
          id={project.id}
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
    <div className={styles.slider}>
      {cards && (
        <ScrollMenu scrollContainerClassName={styles.scroll} Header={Arrows}>
          {cards}
        </ScrollMenu>
      )}
    </div>
  );
}
