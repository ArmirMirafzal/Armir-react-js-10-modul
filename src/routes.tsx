import { Navigate, Outlet, Route, Routes as Switch } from 'react-router-dom'
import { useAuth } from 'modules/auth/context'
import { Action, Auth, ForgotPassword,Home, Verification } from 'pages'
import Game from 'pages/home/game'

import ChessBoard from './pages/home/components/chess-board';

const Routes = () => {
  const { isAuthenticated, user } = useAuth()
  const isVerified = user?.isVerified || false

  return (
    <Switch>
      <Route path="" element={isAuthenticated ? <Outlet /> : <Navigate to="/auth" />}>
        <Route index element={<Home />} />
        <Route path="game" element={user?.isVerified ? <Game /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route path="auth" element={isAuthenticated ? <Navigate to="/" /> : <Outlet />}>
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register />} />
        <Route path="*" index element={<Navigate to="/auth/login" />} />
      </Route>

      <Route path="verification" element={isAuthenticated && !isVerified ? <Verification /> : <Navigate to="/" />} />
      <Route path="forgotPassword" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path="chessboard" element={<ChessBoard />} />

      <Route path="action" element={<Action />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  )
}

export default Routes
