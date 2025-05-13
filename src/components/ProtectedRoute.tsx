
import { Navigate } from "react-router-dom";
import { SidebarLayout } from "./Sidebar";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedRoute;
