import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {  checkAuth } from "../features/user/userSlice";
import { useEffect } from "react";

const Oauth = () => {
    const dispatch = useDispatch();
    const { isLogedIn, status } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (status === "loading") return <h1>Checking login...</h1>;

    if (isLogedIn) return <Navigate to="/home" />;

    return(
        <h1>logginh through google....</h1>
    )
};


export default Oauth