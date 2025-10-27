import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'; // your initialized Firebase Auth instance
import { useEmployeeByEmail } from './modules/useEmployee';
import { useEffect, useMemo } from 'react';
import { useLoginWithGoogle } from './auth/useGoogleLogin';

export function useCurrentUser() {
  const [user, loading, error] = useAuthState(auth);
  const {
    data: employeeInfo,
    isLoading: isGetEmployeeLoading,
    isError,
  } = useEmployeeByEmail(user?.email);
  const { mutate: loginWithGoogle, isPending } = useLoginWithGoogle();

  const isLoading = useMemo(() => {
    return loading || isGetEmployeeLoading || isPending;
  }, [loading, isGetEmployeeLoading, isPending]);

  useEffect(() => {
    if (!user) return;

    // Dapatkan Google ID token dari Firebase user
    user.getIdToken().then((idToken: string) => {
      loginWithGoogle(idToken);
    });
  }, [user?.getIdToken, user?.getIdTokenResult, loginWithGoogle, user]);

  return {
    user,
    error,
    employeeInfo,
    isLoading,
    isError,
  };
}
