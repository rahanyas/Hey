import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import checkOauthAfterOauth from '../features/user/userSlice';

const Oauth = () => {
    const dispatch = useDispatch();
    const { isLogedIn, status } = useSelector((state) => state.user);

    useEffect(() => {
        console.log('from otuth useeff')
        dispatch(checkOauthAfterOauth());

    }, [dispatch]);

    if (status === "loading") return <h1>Checking login...</h1>;

    if (isLogedIn === true) return <Navigate to="/home" />;

    return(
        <h1>logginh through google....</h1>
    )
};


export default Oauth