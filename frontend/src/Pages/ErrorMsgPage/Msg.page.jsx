import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify';
import { useEffect } from "react";
import { clearMsg } from "../../features/user/userSlice";

const ShowErrMsg = () => {

  const {isError, msg} = useSelector(state => state.user);
  const dispatch = useDispatch();

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
    };
    dispatch(clearMsg())
  },[isError, msg])
    return null
};

export default ShowErrMsg;