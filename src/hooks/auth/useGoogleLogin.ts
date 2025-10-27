import { authApi } from '@/api-client/auth/authApi';
import { useMutation } from '@tanstack/react-query';

export function useLoginWithGoogle() {
  return useMutation({
    mutationFn: async (idToken: string) => {
      // panggil API login
      const jwt = await authApi.loginWithGoogle(idToken);
      return jwt;
    },
    onError: (error: Error) => {
      console.error('❌ Login gagal:', error);
    },
  });
}
