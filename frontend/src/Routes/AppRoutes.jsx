import { 
    createBrowserRouter, 
    Route,
    createRoutesFromElements
} from "react-router-dom";

import { lazy } from "react";

import Layout from '../structure/Layout'
import LandingPage from '../Pages/Landing.page.jsx';
import Oauth from '../Pages/OauthPage.jsx';
import HomePage from '../Pages/HomePage/Home.page.jsx'
import IndexRidirect from "../security/IndexRidirect.jsx";

import { ProtectedRoutes } from '../security/ProtectedRoutes';


const SignUpPage = lazy(() => import('../Pages/SignUp.page.jsx'))
const ErrorPage = lazy(() => import('../Pages/ErrorPage.jsx'))
const LoginPage = lazy(() => import('../Pages/LoginPage/Login.Page.jsx'));
const SettingsPage = lazy(() => import('../Pages/SettingsPage/Settings.page.jsx'));
const UserAdd = lazy(() => import('../Pages/addUserPage/UserAdd.jsx'));
const ProfilePage = lazy(() => import('../Pages/profilePage/Profile.page.jsx'))
const MsgPage = lazy(() => import('../Pages/chatArea/Msg.page.jsx'));
const OtpPage = lazy(() => import('../Pages/otp/OtpPage.jsx'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
          <Route path='/' element={<Layout/>}>

          <Route index element={<IndexRidirect/>} />

                <Route path="/landing" element={<LandingPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path="/otpPage" element={<OtpPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>

                <Route path='/oauth/google/success' element={<Oauth/>}/>

                {/* if not user is loged in go to login page  */}
                <Route  element={<ProtectedRoutes/>}>
                    <Route path='/home'  element={<HomePage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                    <Route path='/addUserPage' element={<UserAdd/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/chat" element={<MsgPage/>}/>
                </Route>

          </Route>
        </Route>
    )
);

export default router