export type FundingProps = {
  id: string;
  name: string;
  images: string[];
  ownerId: string;
  rewards: {
    id: string;
    name: string;
    cost: number;
    description: string;
  }[];
  currentFunding: number;
};
