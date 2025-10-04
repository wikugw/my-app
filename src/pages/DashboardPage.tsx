import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';

const DashboardPage = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <h2>Welcome {user?.email}</h2>
    </div>
  );
};

export default DashboardPage;
