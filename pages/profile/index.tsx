import NavBar from "../../components/NavBar/NavBar";
import { fetcher } from "../../utils/swr";
import useSWR from "swr";
import { Spinner, Heading } from '@chakra-ui/react';

import type { AuthNextPage } from "../../types/appProps";
import type { Profile } from "../../types/profile";
import ViewProfile from "../../components/ViewProfile/ViewProfile";

import styles from "./profile.module.scss";

const MyProfile: AuthNextPage = (props) => {

  const { data, error } = useSWR<Profile>("/api/my-profile", fetcher);

  if (error)
    return <Heading className={styles.error}> 404 | Page not found </Heading>;

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
  else {
    return (
      <div>
        <NavBar />
        <ViewProfile
          name={data.name}
          bio={data.bio}
          image={data.image}
        />
      </div>
    );
  }
};

export default MyProfile;

MyProfile.requireAuth = true;
