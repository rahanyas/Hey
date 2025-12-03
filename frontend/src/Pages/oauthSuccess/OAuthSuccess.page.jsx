import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/user/userSlice";


const OAuthSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLogedIn, status}  = useSelector((state) => state.user);

    useEffect(() => {
           dispatch(checkAuth());
    },[]);

    useEffect(() => {
            if(status === 'success' && isLogedIn === true){
               navigate("/home")      
            };

            if(status === 'failed'){
              navigate('/login')
            };
            
    },[isLogedIn, status])

  return (
    <div>Loging...</div>
  )
}

export default OAuthSuccess