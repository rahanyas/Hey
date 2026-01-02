import {
  RouterProvider
} from 'react-router-dom';
import router from './Routes/AppRoutes.jsx';
import { Suspense, useEffect } from 'react';

import { checkAuth } from './features/user/userSlice.js';
import { useDispatch} from 'react-redux';
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  
    
  useEffect(() => {
        const path = window.location.pathname;
        if(path.includes('/oauth/google/success')) return ;
        
        dispatch(checkAuth())

  },[dispatch]);



  return (
    <>
    <Suspense fallback={<LoadingPage/>}>
      <RouterProvider router={router}/>
    </Suspense>
    
      <ToastContainer />
    </>
  )
};


export default App;