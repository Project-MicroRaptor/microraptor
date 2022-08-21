import { useRouter } from 'next/router';
import { fetcher } from '../../utils/swr';
import useSWR from "swr";
import ViewProject from '../../components/ProjectInfo/ViewProject';
import NavBar from './../../components/NavBar/NavBar';
import { Spinner } from "@chakra-ui/react";
import styles from './[id].module.scss';

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
};

export default function ProjectView() {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR<Projects>(`/api/project/${id}`, fetcher);

    if (!data) {
        return null;
    }

    <NavBar />

    return (
        <ViewProject
            name={data.name}
            shortDescription={data.shortDescription}
            image={data.images[0]}
            currentFunding={data.currentFunding}
            targetFunding={data.targetFunding}
            postcode={data.postcode}
            categories={data.categories}
            createdAt={data.createdAt}
            completedAt={data.completedAt}
        />
    );
};

