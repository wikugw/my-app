import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { ProtectedRoute } from './components/macro/auth/ProtectedRoute';
import FinishSignInPage from './pages/FinishSignInPage';
import MainLayout from './components/layouts/main-layout/MainLayout';
import RecruitmentPage from './pages/RecruitmentPage';
import RecruitmentFormPage from './pages/RecruitmentFormPage';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route path="/finishSignIn" element={<FinishSignInPage />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/recruitment/create" element={<RecruitmentFormPage />} />
      </Route>
      {/* catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
