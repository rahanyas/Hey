import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/user/userSlice";


const OAuthSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, isLogedIn}  = useSelector((state) => state.user)

    useEffect(() => {
            dispatch(checkAuth());

            if(isLogedIn){
              return navigate("/home")      
            }else{
              return navigate('/login')
            }
    },[])

  return (
    <div>Loging...</div>
  )
}

export default OAuthSuccess