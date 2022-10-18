export type FundingProps = {
  id: string;
  name: string;
  images: string[];
  ownerId: string;
  rewards: {
    name: string;
    cost: number;
    description: string;
  }[];
};
