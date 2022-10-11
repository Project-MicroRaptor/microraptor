export interface ProjectProps {
  id: string;
  name: string;
  active: boolean;
  shortDescription: string;
  image?: string;
  currentFunding: number;
  targetFunding: number;
}

export interface ProjectCardsProps {
  id: string;
  name: string;
  active: boolean;
  shortDescription: string;
  images: string[];
  currentFunding: number;
  targetFunding: number;
}
