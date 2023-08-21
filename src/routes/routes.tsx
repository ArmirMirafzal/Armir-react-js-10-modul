import { BrowserRouter, Route, Routes as BaseRoutes, Navigate } from "react-router-dom";
import { Auth } from "../pages";
import Protected from "./protected";
import { Chess } from "../pages/game";
import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingOverlay } from "@mantine/core";

interface RoutesProps {}

const Routes = (props: RoutesProps) => {
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);
  const isAuthenticated: boolean | undefined = Boolean(user);

  if (loading) return <LoadingOverlay visible overlayBlur={2} />;

  return (
    <BrowserRouter>
      <BaseRoutes>
        {/* HOME PAGE */}
        <Route path="" element={<Protected allow={isAuthenticated} navigate="/auth/login" />}>
          <Route index element={<Chess />} />
          <Route path="*" element={<Chess />} />
        </Route>

        {/* USERS */}
        <Route path="auth" element={<Protected allow={!isAuthenticated} navigate="/" />}>
          <Route path="login" element={<Auth.Login />} />
          <Route path="register" element={<Auth.Register />} />
          <Route path="forgot-password" element={<Auth.ForgotPassword />} />
          <Route path="reset-password" element={<Auth.ResetPassword />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Route>
      </BaseRoutes>
    </BrowserRouter>
  );
};

export default Routes;
