import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const accessToken = Cookies.get("X-Jwt-Token");

  const ExpiredFunc = () => {
    const expireDate = Date.parse(Cookies.get("X-expire"));
    const timeNow = Date.parse(new Date());
    let notExpired = expireDate > timeNow;
    console.log("expireDate \t", expireDate);
    console.log("timeNow \t", timeNow);
    return notExpired;
  };

  const location = useLocation();

  return accessToken && ExpiredFunc() ? ( //changed from user to accessToken to persist login after refresh
    <Outlet />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
