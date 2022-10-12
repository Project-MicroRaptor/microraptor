import { User } from "./user";

export type ProjectRewards = {
  name?: string;
  description?: string;
  cost?: number;
};

export type Project = {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  currentFunding: number;
  targetFunding: number;
  postcode: number;
  categories: string[];
  createdAt: number;
  completedAt: number;
  aboutBusiness: string;
  aboutOwner: string;
  businessPlan: string;
  rewards: Array<ProjectRewards>;
  active: boolean;
  owner: User;
};
