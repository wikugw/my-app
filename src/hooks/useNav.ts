// useNav.ts
import { useNavigate } from 'react-router-dom';

export function useNav() {
  const navigate = useNavigate();

  return {
    go: (to: string, replace = false) => navigate(to, { replace }),
    back: () => navigate(-1),
    home: () => navigate('/'),
  };
}
