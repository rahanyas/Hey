import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

import Layout from './structure/Layout'
import LandingPage from './Pages/Landing.page';
import LoadingPage from './Pages/LoadingPage/LoadingPage.jsx';


import { ProtectedRoutes } from './security/ProtectedRoutes';
import { checkAuth } from './features/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SignUpPage = lazy(() => import('./Pages/SignUp.page'))
const ErrorPage = lazy(() => import('./Pages/ErrorPage'))
const HomePage = lazy(() => import('./Pages/HomePage/Home.page'));
const LoginPage = lazy(() => import('./Pages/LoginPage/Login.Page'));
const SettingsPage = lazy(() => import('./Pages/SettingsPage/Settings.page.jsx'));
const OauthSuccessPage = lazy(() => import('./Pages/oauthSuccess/OAuthSuccess.page.jsx'))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
          <Route  element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/auth/google/success' element={<OauthSuccessPage/>}/>

                {/* if not user is loged in go to login page  */}
                <Route  element={<ProtectedRoutes/>}>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Route>

                <Route path='/login' element={<LoginPage/>}/>
          </Route>
        </Route>
    )
)

const App = () => {
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.user);
  
    
  useEffect(() => {

    const path  = window.location.pathname;
    if(path.includes("/auth/google/success")) return;
    
    dispatch(checkAuth())

  },[]);

  if(status === 'loading') return <LoadingPage />



  return (
    <Suspense fallback={<LoadingPage/>}>
      <RouterProvider router={router}/>
    </Suspense>
  )
};


export default App;