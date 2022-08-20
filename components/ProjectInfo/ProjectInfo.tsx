import useSWR from 'swr';
import ViewProject from './ViewProject';
import { fetcher } from './../../pages/utils/swr';

type Info = {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  currentFunding: number;
  targetFunding: number;
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
        />
      );
    })}
    </>
  }
}
