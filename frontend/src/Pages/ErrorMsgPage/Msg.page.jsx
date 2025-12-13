import { useSelector } from "react-redux";
import {toast} from 'react-toastify';
import { useEffect } from "react";
const ShowErrMsg = () => {

  const {isError, msg} = useSelector(state => state.user);

  useEffect(() => {
    if(!msg) return;

    if(!isError){
       toast.success(msg, {
        autoClose : '2000',
        closeOnClick : true,
        position : "top-left",

      })
    }else{
      toast.error(msg , {
        autoClose : '2000'
      })
    }
  },[isError, msg])
    return null
};

export default ShowErrMsg;