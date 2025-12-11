import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {  checkAuth } from "../features/user/userSlice";
import { useEffect } from "react";


//4seconds

const Oauth = () => {
    const dispatch = useDispatch();
    const { isLogedIn, status } = useSelector((state) => state.user);
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const res = await dispatch(checkAuth()).unwrap();
            console.log('res from ',res)
            if(res.success === true){
                return navigate('/home')
            }
        })()
    }, []);

    // if (status === "loading") return <h1>Checking login...</h1>;

    // if (isLogedIn) return <Navigate to="/home" />;

    return <h1>loging you in ...  </h1>
};


export default Oauth