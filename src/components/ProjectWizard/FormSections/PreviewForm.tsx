import { CreateFormData } from "../../../types/createForm";
import ViewProject from "../../ViewProject/ViewProject";

import type { ProjectRewards } from "../../../types/project";
import { useSession } from 'next-auth/react';

type Props = {
  formData: CreateFormData;
};

export default function PreviewForm(props: Props) {
  const { formData } = props;
  const { data: session } = useSession();

  let owner;
  if (session) {
    owner = {
      id: session.user.id,
      name: session.user.name ?? "",
      image: session.user.image ?? ""
    };
  }

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

  const rewards: Array<ProjectRewards> = [];
  if (formData?.rewards) {
    Object.values(formData?.rewards).forEach((reward: any) => {
      rewards.push(reward);
    });
  }

  return (
    <ViewProject
      name={formData?.name}
      shortDescription={formData?.shortDescription}
      images={images}
      currentFunding={0}
      owner={owner ?? undefined}
      targetFunding={formData?.targetFunding}
      postcode={formData?.postcode ? Number(formData?.postcode) : undefined}
      categories={categories}
      completedAt={Number(formData?.completedAt ?? new Date())}
      aboutBusiness={formData?.aboutBusiness}
      aboutOwner={formData?.aboutOwner}
      businessPlan={formData?.businessPlan}
      rewards={rewards}
      active={true}
      preview={true}
    />
  );
}
