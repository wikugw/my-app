// useNav.ts
import { useNavigate, type NavigateOptions } from 'react-router-dom';

export function useNav() {
  const navigate = useNavigate();

  return {
    go: (to: string, options?: NavigateOptions) => navigate(to, options),
    back: () => navigate(-1),
    home: () => navigate('/'),
  };
}
