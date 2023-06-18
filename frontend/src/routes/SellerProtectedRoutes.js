import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";

const SellerProtectedRoutes = ({ children }) => {
  const { isLoading, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );
  if (isLoading === false) {
    if (!isSellerAuthenticated) {
      return <Navigate to={"/seller-login"} replace />;
    }
  }
  return children;
};

export default SellerProtectedRoutes;
