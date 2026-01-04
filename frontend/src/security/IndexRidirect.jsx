import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

const IndexRidirect = () => {

    const {isLogedIn, authChecked} = useSelector((state) => state.user);
    if(!authChecked){
        return <LoadingPage />
    };

  return isLogedIn === true
  ? <Navigate to='/home' replace/>
  : <Navigate to='/landing' replace/>

}

export default IndexRidirect