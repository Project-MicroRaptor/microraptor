export type ProjectCards = {
  id: string;
  name: string;
  active: boolean;
  shortDescription: string;
  images: string[];
  currentFunding: number;
  targetFunding: number;
}[];
