import { Navigate, Outlet, Route, Routes as Switch } from 'react-router-dom'
import { useAuth } from 'modules/auth/context'
import { Action, Auth, Home, Verification } from 'pages'

const Routes = () => {
  const { isAuthenticated, user } = useAuth()
  const isVerified = user?.isVerified || false

  return (
    <Switch>
      <Route path="" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />

      <Route path="auth" element={isAuthenticated ? <Navigate to="/" /> : <Outlet />}>
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register />} />
        <Route path="*" index element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path="verification" element={isAuthenticated && !isVerified ? <Verification /> : <Navigate to="/" />} />

      <Route path="action" element={<Action />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  )
}

export default Routes
