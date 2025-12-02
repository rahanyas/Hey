import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/user/userSlice";


const OAuthSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            await new Promise(res => setiTimeout(res, 300));

            await dispatch(checkAuth())

            navigate("/home", {replace: true})
        };

        run()
    },[])

  return (
    <div>Loging...</div>
  )
}

export default OAuthSuccess