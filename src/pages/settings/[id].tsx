import useSWR from "swr";

import ProfileSettings from '../../components/Settings/ProfileSettings';
import { useRouter } from 'next/router';
import { fetcher } from './../../utils/swr';

type User = {
  bio: string;
};

export default function ProfileView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<User>(`/api/profile/${id}`, fetcher);

  return (
    <>
      <ProfileSettings
        bio={data?.bio}
      />
    </>
  )
} 
