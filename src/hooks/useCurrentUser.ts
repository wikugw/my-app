import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'; // your initialized Firebase Auth instance

export function useCurrentUser() {
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
  };
}
