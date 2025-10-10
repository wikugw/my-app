import { useCurrentUser } from '@/hooks/useCurrentUser';

const DashboardPage = () => {
  const { user } = useCurrentUser();

  return (
    <div>
      <h2>Welcome {user?.email}</h2>
    </div>
  );
};

export default DashboardPage;
