import { ProjectCardsProps } from "./projectCardProps";

export type Profile = {
  id?: string;
  name?: string;
  bio?: string;
  image?: string;
  projects?: Array<ProjectCardsProps>;
};
