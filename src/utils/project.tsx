import { CreateFormData, ProjectDetails } from "../types/createForm";
import { Project, ProjectRewards } from "../types/project";

export function projectDataToFormData(data: Project): CreateFormData {
  const {
    name,
    shortDescription,
    targetFunding,
    completedAt,
    postcode,
    categories,
    aboutBusiness,
    aboutOwner,
    businessPlan,
    images,
    rewards
  } = data;

  let formCategories = {};
  categories.forEach((category) => {
    formCategories = {
      ...formCategories,
      [category]: true
    };
  });

  let formImages = {};
  images.forEach((image, i) => {
    formImages = {
      ...formImages,
      [i]: image
    };
  });

  const rewardCount = rewards.length;
  let formRewards = {};
  rewards.forEach((reward, i) => {
    formRewards = {
      ...formRewards,
      [i]: {
        name: reward.name,
        cost: reward.cost,
        description: reward.description
      }
    };
  });

  return {
    name,
    shortDescription,
    targetFunding,
    completedAt: new Date(completedAt),
    postcode: postcode.toString(),
    categories: formCategories,
    aboutBusiness,
    aboutOwner,
    businessPlan,
    image: formImages,
    rewardCount,
    rewards: formRewards
  };
}

export function formDataToProjectInfo(formData: CreateFormData): {
  projectDetails: ProjectDetails;
  rewardDetails: Array<ProjectRewards>;
} {
  const categories: Array<string> = [];
  if (formData?.categories) {
    Object.entries(formData?.categories)?.forEach(([key, value]) => {
      if (value) categories.push(key);
    });
  }

  const images: Array<string> = [];
  if (formData?.image) {
    Object.values(formData?.image)?.forEach((value: any) => {
      if (value) images.push(value);
    });
  }

  const rewardDetails: Array<ProjectRewards> = [];
  if (formData?.rewards) {
    Object.values(formData?.rewards).forEach((reward: any) => {
      if (reward?.name && reward?.description && reward?.cost) {
        rewardDetails.push(reward);
      }
    });
  }

  const projectDetails = {
    name: formData.name,
    completedAt: formData.completedAt?.toISOString(),
    targetFunding: Number(formData.targetFunding),
    postcode: Number(formData.postcode),
    shortDescription: formData.shortDescription,
    categories,
    ...(formData?.aboutBusiness && { aboutBusiness: formData.aboutBusiness }),
    ...(formData?.aboutOwner && { aboutOwner: formData.aboutOwner }),
    ...(formData?.businessPlan && { businessPlan: formData.businessPlan }),
    images
  };

  return {
    projectDetails,
    rewardDetails
  };
}
