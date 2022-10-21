import { Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import NavBar from "../../../components/NavBar/NavBar";
import ProjectForm from "../../../components/ProjectWizard/ProjectForm/ProjectForm";
import { projectDataToFormData } from "../../../utils/project";
import { fetcher } from "../../../utils/swr";

import type { Project } from "../../../types/project";

import styles from "./projectId.module.scss";
import { useSession } from "next-auth/react";
import { AuthNextPage } from "../../../types/appProps";

const EditProject: AuthNextPage = () => {
  const router = useRouter();
  let { id } = router.query;
  const { data, error } = useSWR<Project>(`/api/project/${id}`, fetcher);
  const { data: session } = useSession();

  // Get first array from ID if is array
  if (Array.isArray(id)) id = id[0];

  if (error) {
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
  }

  if (!data) {
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
  }

  if (!session || session?.user.id !== data.owner.id) {
    return (
      <>
        <Head>
          <title>MicroRaptor</title>
          <meta name="description" content="Error" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Heading className={styles.error}>
          You are unauthorized to edit this page
        </Heading>
      </>
    );
  }

  const initialFormData = projectDataToFormData(data);

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <ProjectForm
        projectId={id}
        projectName={data.name}
        projectActive={data.active}
        initialFormData={initialFormData}
        editMode
      />
    </>
  );
};

export default EditProject;

EditProject.requireAuth = true;
