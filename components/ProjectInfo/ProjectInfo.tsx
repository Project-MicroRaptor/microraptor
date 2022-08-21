import useSWR from 'swr';
import ViewProject from './ViewProject';
import { fetcher } from '../../utils/swr';

type Info = {
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
}[];

export default function ProjectInfo() {
  const { data } = useSWR<Info>("/api/projectinfo", fetcher);

  if (!data) {
    return null;
  }

  if (data) {
    return <>{data.map(project => {
      return (
        <ViewProject
          key={project.id}
          name={project.name}
          shortDescription={project.shortDescription}
          image={project.images[0]}
          currentFunding={project.currentFunding}
          targetFunding={project.targetFunding}
          postcode={project.postcode}
          categories={project.categories}
          createdAt={project.createdAt}
          completedAt={project.completedAt}
        />
      );
    })};
    </>
  };
}
