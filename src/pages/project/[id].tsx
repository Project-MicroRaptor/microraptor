import { useRouter } from "next/router";
import { fetcher } from "../../utils/swr";
import { Spinner, Heading } from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";
import NavBar from "./../../components/NavBar/NavBar";
import ViewProject from "../../components/ViewProject/ViewProject";
import { ProjectRewards } from "../../types/project";
import { ProjectOwner } from "../../types/projectOwner";

import styles from "./[id].module.scss";

type Projects = {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  owner: ProjectOwner;
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
};

export default function ProjectView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<Projects>(`/api/project/${id}`, fetcher);

  if (error)
    return (
      <>
        <Head>
          <title>MicroRaptor</title>
          <meta name="description" content="Error" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Heading className={styles.error}>404 | Page Not Found</Heading>
      </>
    );

  if (!data)
    return (
      <>
        <Head>
          <title>MicroRaptor</title>
          <meta name="description" content="Loading" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <div className={styles.spinner}>
          <Spinner
            margin="auto"
            width="200px"
            height="200px"
            thickness="12px"
            color="brand.primary"
            emptyColor="gray.200"
            speed="1s"
          />
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <ViewProject
        name={data.name}
        shortDescription={data.shortDescription}
        images={data.images}
        owner={data.owner}
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
        active={data.active}
      />
    </>
  );
}
