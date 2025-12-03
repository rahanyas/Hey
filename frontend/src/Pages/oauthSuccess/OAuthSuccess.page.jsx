import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/user/userSlice";

const OAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogedIn, status } = useSelector((state) => state.user);

  // 1️⃣ Run checkAuth once
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // 2️⃣ Redirect ONLY after checkAuth finishes
  useEffect(() => {
    // still loading → do nothing
    if (status === "loading") return;

    // checkAuth finished with success
    if (status === "success" && isLogedIn) {
      navigate("/home", { replace: true });
    }

    // checkAuth finished with failure
    if (status === "failed") {
      navigate("/login", { replace: true });
    }
  }, [status, isLogedIn, navigate]);

  return <div>Logging in…</div>;
};

export default OAuthSuccess;
