import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from 'firebase/auth';

export default function FinishSignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // Already logged in → go to dashboard
        navigate('/dashboard', { replace: true });
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn');

        if (!email) {
          // Still no email → redirect back to sign-in
          navigate('/signin', { replace: true });
          return;
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          navigate('/dashboard', { replace: true });
        } catch (err) {
          console.error('Error signing in with email link', err);
          navigate('/signin', { replace: true });
        }
      } else {
        // Not a valid link → go to sign-in
        navigate('/signin', { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return <p>Completing sign-in...</p>;
}
