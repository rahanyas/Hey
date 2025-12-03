import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from '../Pages/LoadingPage/LoadingPage'

export const ProtectedRoutes = () => {
  const { isLogedIn, status, isFirstAuthCheck } = useSelector((state) => state.user);

//  if(status === 'loading'){
//   return <LoadingPage />
//  }

  if (isFirstAuthCheck && status === "loading") {
    return <LoadingPage />;
  }
  
  if (isLogedIn === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
