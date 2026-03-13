import {
  RouterProvider
} from 'react-router-dom';
import router from './Routes/AppRoutes.jsx';
import { Suspense, useEffect } from 'react';

import { checkAuth } from './features/user/userSlice.js';
import { useDispatch, useSelector} from 'react-redux';
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './styles/components/toast.style.scss';

import { connectSocket, disconnectSocket } from './sokcet/connectSocket.js';
import { registerSocketListeners } from './sokcet/socketEvents.js';

const App = () => {
  const dispatch = useDispatch();
  const {status, isLogedIn} = useSelector(state => state.user);

    
  useEffect(() => {
        const path = window.location.pathname;
        if(path.includes('/oauth/google/success')) return ;
        
        dispatch(checkAuth());
  },[dispatch]);

  useEffect(() => {
      if(isLogedIn){
          connectSocket();
          registerSocketListeners()
      }else{
        disconnectSocket()
      }
  }, [isLogedIn])


  if(status === 'loading'){
    return <LoadingPage />
  }


  return (
    <>
    <Suspense fallback={<LoadingPage/>}>
      <RouterProvider router={router}/>
    </Suspense>
    
      <ToastContainer />
             {/* <ToastContainer
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          toastClassName="hey-toast"
          progressClassName="hey-toast__progress"
        /> */}
    </>
  )
};


export default App;