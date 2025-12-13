import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {  checkAuth } from "../features/user/userSlice";
import { useEffect } from "react";


//4seconds

const Oauth = () => {
    const dispatch = useDispatch();
    const { isLogedIn, status } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {      
                const res = await dispatch(checkAuth()).unwrap();
                if(res.success === true){
                    return navigate('/home')
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);


    if (status === "loading") return <h1>Checking login...</h1>;

    return <h1>loging you in ...  </h1>
};


export default Oauth