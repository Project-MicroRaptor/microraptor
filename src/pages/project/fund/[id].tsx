import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import useSWR from "swr";
import { fetcher } from "../../../utils/swr";
import { Heading, Spinner } from "@chakra-ui/react";
import NavBar from "../../../components/NavBar/NavBar";
import ProjectFunding from "../../../components/Funding/ProjectFunding";
import { FundingProps } from "../../../types/fundingProps";

import styles from "./[id].module.scss";

export default function ProjectFundFlow() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<FundingProps>(
    `/api/project/fund/${id}`,
    fetcher
  );

  // Search Error -- Error Prompt
  if (error)
    return (
      <>
        <Head>
          <title>Error</title>
          <meta name="description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Heading className={styles.error}>An error occured.</Heading>;
      </>
    );
  // Waiting for Data -- Spinner
  else if (!data) {
    return (
      <>
        <Head>
          <title>Error</title>
          <meta name="description" />
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
  }

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <ProjectFunding
        id={data.id}
        name={data.name}
        ownerId={data.ownerId}
        images={data.images}
        rewards={data.rewards}
      />
    </>
  );
}
