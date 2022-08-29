import { useRouter } from 'next/router';
import { fetcher } from '../../utils/swr';
import useSWR from "swr";
import ViewProject from '../../components/ProjectInfo/ViewProject';
import NavBar from './../../components/NavBar/NavBar';

type Projects = {
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
  rewards: string[];
};

export default function ProjectView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<Projects>(`/api/project/${id}`, fetcher);

  if (!data) {
    return null;
  }

  return (
    <>
      <NavBar />
      <ViewProject
        name={data.name}
        shortDescription={data.shortDescription}
        images={data.images}
        currentFunding={data.currentFunding}
        targetFunding={data.targetFunding}
        postcode={data.postcode}
        categories={data.categories}
        createdAt={data.createdAt}
        completedAt={data.completedAt}
        aboutBusiness={data.aboutBusiness}
        aboutOwner={data.aboutOwner}
        businessPlan={data.businessPlan}
        rewards={data.rewards}
      />
    </>
  );
};
