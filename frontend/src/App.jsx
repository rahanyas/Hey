import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from './structure/Layout'
import LandingPage from './Pages/Landing.page';
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx';


import { ProtectedRoutes } from './security/ProtectedRoutes';
import { checkAuth } from './features/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from './Pages/OauthPage.jsx';
import HomePage from './Pages/HomePage/Home.page.jsx'

const SignUpPage = lazy(() => import('./Pages/SignUp.page'))
const ErrorPage = lazy(() => import('./Pages/ErrorPage'))
const LoginPage = lazy(() => import('./Pages/LoginPage/Login.Page'));
const SettingsPage = lazy(() => import('./Pages/SettingsPage/Settings.page.jsx'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
          <Route path='/' element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>

                <Route path='/oauth/google/success' element={<Oauth/>}/>

                {/* if not user is loged in go to login page  */}
                <Route  element={<ProtectedRoutes/>}>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Route>

          </Route>
        </Route>
    )
)

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