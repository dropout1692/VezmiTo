import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import componentLoader from './helpers/componentLoader'
import useRouter from './hooks/router/useRouter'
import { PageContainer } from './layout/PageContainer'
import AboutProjectPage from './pages/aboutProject/AboutProjectPage'
import HomePage from './pages/home/HomePage'
import LoadingPage from './pages/loading/LoadingPage'
import PrivacyPolicyPage from './pages/privacyPolicy/PrivacyPolicyPage'
import NotFoundPage from './pages/system/NotFoundPage'

const AdminDashboardPage = lazy(() =>
  componentLoader(() => import('./pages/admin/AdminDashboardPage')),
)

export function App() {
  const { registerRoute } = useRouter()
  return (
    <Suspense fallback={<LoadingPage />}>
      <PageContainer>
        <Routes>
          <Route
            path={registerRoute('home', { exact: true })}
            element={<HomePage />}
          />
          <Route
            path={registerRoute('adminDashboard')}
            element={<AdminDashboardPage />}
          />
          <Route
            path={registerRoute('privacyPolicy')}
            element={<PrivacyPolicyPage />}
          />
          <Route
            path={registerRoute('aboutProject')}
            element={<AboutProjectPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageContainer>
    </Suspense>
  )
}
