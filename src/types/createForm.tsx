import type { Location } from "./location";
import type { ProjectRewards } from "./project";

export type CreateFormData = {
  name?: string;
  shortDescription?: string;
  targetFunding?: number;
  completedAt?: Date;
  location?: Location;
  categories?: {
    [key: string]: boolean;
  };
  aboutBusiness?: string;
  aboutOwner?: string;
  businessPlan?: string;
  image?: {
    [key: string]: string;
  };
  rewards?: {
    [key: string]: ProjectRewards;
  };
  rewardCount?: number;
};

export type ProjectDetails = {
  name: string | undefined;
  shortDescription: string | undefined;
  targetFunding: number | undefined;
  completedAt: string | undefined;
  postcode: number | undefined;
  categories: Array<string>;
  aboutBusiness?: string;
  aboutOwner?: string;
  businessPlan?: string;
  images: Array<string>;
};
