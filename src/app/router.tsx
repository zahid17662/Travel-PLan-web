import { lazy, Suspense, type JSX } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/lib/routes'
import { ProtectedRoute } from './guards'
import { PageSkeleton } from '@/components/ui/PageSkeleton'

// Route-level code splitting with React.lazy
const LandingPage = lazy(() =>
  import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage }))
)
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import('@/pages/SignupPage').then((m) => ({ default: m.SignupPage })))
const ForgotPasswordPage = lazy(() =>
  import('@/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
)
const MyTripsPage = lazy(() =>
  import('@/pages/MyTripsPage').then((m) => ({ default: m.MyTripsPage }))
)
const TripPlannerPage = lazy(() =>
  import('@/pages/TripPlannerPage').then((m) => ({ default: m.TripPlannerPage }))
)
const GuidesPage = lazy(() => import('@/pages/GuidesPage').then((m) => ({ default: m.GuidesPage })))
const GuideDetailPage = lazy(() =>
  import('@/pages/GuideDetailPage').then((m) => ({ default: m.GuideDetailPage }))
)
const HotelsPage = lazy(() => import('@/pages/HotelsPage').then((m) => ({ default: m.HotelsPage })))
const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
)
const StyleguidePage = lazy(() =>
  import('@/pages/StyleguidePage').then((m) => ({ default: m.StyleguidePage }))
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
)

export function AppRouter(): JSX.Element {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.STYLEGUIDE} element={<StyleguidePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route
          path={ROUTES.MY_TRIPS}
          element={
            <ProtectedRoute>
              <MyTripsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TRIP_PLANNER}
          element={
            <ProtectedRoute>
              <TripPlannerPage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.GUIDES} element={<GuidesPage />} />
        <Route path={ROUTES.GUIDE_DETAIL} element={<GuideDetailPage />} />
        <Route path={ROUTES.HOTELS} element={<HotelsPage />} />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
