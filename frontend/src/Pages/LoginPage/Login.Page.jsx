import {Link, useNavigate} from 'react-router-dom'
import { login, 
         oauthLogin,
         addErrorMsg 
}from '../../features/user/userSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


import './login.style.scss'

const LoginPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('');

    const [data, setData] = useState(({
        email : '',
        pass : ''
    }))

    useEffect(() => {
        if(user.isLogedIn === true){
            navigate('/home')
        }
    }, [user.isLogedIn,navigate])
  
    const userLogin = () => {
        const {email, pass} = data
        if(!email || !pass){
           return dispatch(addErrorMsg('please Enter All Fields'));
        };
        

        if(!email.includes('@') || !email.includes('gmail.com')){
            return dispatch(addErrorMsg('Please Enter Valid Email'));
        };

        dispatch(login({email, pass}));
    }

    return (
        <div className='login-container'>
                <div className="login-box">
                    <input type="email" className='login-inp' name='email' value={data.email} placeholder='email' onChange={(e) => {setData((prev) => ({...prev, email:e.target.value})), setErrorMsg('')}} />
                    <input type="password" className='login-inp' name="pass" value={data.pass} placeholder='password' onChange={(e) => {setData((prev) => ({...prev, pass:e.target.value})), setErrorMsg('')}}/>
                    <button className='login-btn' onClick={userLogin}>login</button>
                </div>
                <div className="oauth-box">
                    <button className='oauth-Btn' onClick={oauthLogin}>login with google</button>
                    <p>dont have an account?<Link to='/signup'>sign-in</Link></p>
                </div>
        </div>
    )
};

export default LoginPage