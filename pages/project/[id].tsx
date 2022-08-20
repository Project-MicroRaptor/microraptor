import { useRouter } from 'next/router';
import { fetcher } from './../utils/swr';
import useSWR from "swr";
import ViewProject from '../../components/ProjectInfo/ViewProject';

type Projects = {
    id: string;
    name: string;
    shortDescription: string;
    images: string[];
    currentFunding: number;
    targetFunding: number;
    postcode: number;
};

export default function ProjectView() {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR<Projects>(`/api/project/${id}`, fetcher);

    console.log(data);

    if (!data) {
        return null;
    }

    return (
        <ViewProject
            name={data.name}
            shortDescription={data.shortDescription}
            image={data.images[0]}
            currentFunding={data.currentFunding}
            targetFunding={data.targetFunding}
            postcode={data.postcode}
        />
    );
};

