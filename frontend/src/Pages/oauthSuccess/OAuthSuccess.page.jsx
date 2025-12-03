import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/user/userSlice";


const OAuthSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLogedIn}  = useSelector((state) => state.user);

    useEffect(() => {
           dispatch(checkAuth());
    },[]);

    useEffect(() => {
            if(isLogedIn === true){
               navigate("/home")      
            }else{
               navigate('/login')
            }
    },[isLogedIn])

  return (
    <div>Loging...</div>
  )
}

export default OAuthSuccess