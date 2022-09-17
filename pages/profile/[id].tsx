import { useRouter } from 'next/router';
import { fetcher } from '../../utils/swr';
import useSWR from 'swr';
import { Spinner, Heading } from '@chakra-ui/react';

import ViewProfile from '../../components/ViewProfile/ViewProfile';
import NavBar from '../../components/NavBar/NavBar';

import styles from './[id].module.scss';
import type { Profile } from '../../types/profile';

export default function ProfileView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<Profile>(`/api/profile/${id}`, fetcher);

  if (error)
    return (
      <>
        <NavBar />
        <Heading className={styles.error}> 404 | Page not found </Heading>;
      </>
    )


  if (!data)
    return (
      <>
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
    <div className={styles.container}>
      <NavBar />
      <ViewProfile
        name={data.name}
        bio={data.bio}
        image={data.image}
      />
    </div>
  );
};
