export interface ProjectProps {
  id: string;
  name: string;
  shortDescription: string;
  image?: string;
  currentFunding: number;
  targetFunding: number;
}

export interface ProjectCardsProps {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  currentFunding: number;
  targetFunding: number;
}