import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../components/micro/button/Button';

const DashboardPage = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h2>Welcome {user?.email}</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default DashboardPage;
