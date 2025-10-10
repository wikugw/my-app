import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import MainLayout from './components/layouts/main-layout/MainLayout';
import { ProtectedRoute } from './components/macro/auth/ProtectedRoute';
import { auth } from './firebase';
import DashboardPage from './pages/DashboardPage';
import FinishSignInPage from './pages/FinishSignInPage';
import LoginPage from './pages/LoginPage';
import RecruitmentFormPage from './pages/recruitments/RecruitmentFormPage';
import RecruitmentPage from './pages/recruitments/RecruitmentPage';
import ApplicationPage from './pages/applications/ApplicationPage';
import { ContainerLayout } from './components/layouts/ContainerLayout';
import ApplicationPreviewPage from './pages/applications/ApplicationPreviewPage';
import { GlobalFeedbackDialog } from './components/macro/GlobalFeedbackDialog';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/finishSignIn" element={<FinishSignInPage />} />
        <Route
          element={
            <ContainerLayout>
              <Outlet />
            </ContainerLayout>
          }
        >
          <Route path="/application" element={<ApplicationPage />} />
          <Route
            path="/application/detail"
            element={<ApplicationPreviewPage />}
          />
        </Route>
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
          <Route path="/recruitment/detail" element={<RecruitmentFormPage />} />
        </Route>
        {/* catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <GlobalFeedbackDialog />
    </>
  );
}

export default App;
