import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../../utils/swr";
import { Heading, Spinner } from "@chakra-ui/react";
import NavBar from "../../../components/NavBar/NavBar";
import ProjectFunding from "../../../components/Funding/ProjectFunding";
import { FundingProps } from "../../../types/fundingProps";
import { AuthNextPage } from "../../../types/appProps";

import styles from "./[id].module.scss";

const ProjectFundFlow: AuthNextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<FundingProps>(`/api/project/${id}`, fetcher);

  function FundingContent() {
    // Search Error -- Error Prompt
    if (error)
      return <Heading className={styles.error}>An error occured.</Heading>;
    // Waiting for Data -- Spinner
    else if (!data) {
      return (
        <>
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
    // Display Funding Flow
    else {
      return (
        <ProjectFunding
          id={data.id}
          name={data.name}
          ownerId={data.ownerId}
          images={data.images}
          rewards={data.rewards}
          currentFunding={data.currentFunding}
        />
      );
    }
  }

  return (
    <>
      <Head>
        <title>{data ? `MicroRaptor - ${data.name}` : "MicroRaptor"}</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {FundingContent()}
    </>
  );
};

export default ProjectFundFlow;

ProjectFundFlow.requireAuth = true;
