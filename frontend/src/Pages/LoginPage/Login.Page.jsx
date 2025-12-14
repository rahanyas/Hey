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
   

    const [data, setData] = useState(({
        email : '',
        password : ''
    }))

    useEffect(() => {
        if(user.isLogedIn === true){
            navigate('/home')
        }
    }, [user.isLogedIn,navigate])
  
    const userLogin = () => {
        const {email, password} = data
        if(!email || !password){
           return dispatch(addErrorMsg('please Enter All Fields'));
        };
        

        if(!email.includes('@') || !email.includes('gmail.com')){
            return dispatch(addErrorMsg('Please Enter Valid Email'));
        };

        dispatch(login({email, password}));
    }

    return (
        <div className='login-container'>
                <div className="login-box">
                    <input type="email" className='login-inp' name='email' value={data.email} placeholder='email' onChange={(e) => setData((prev) => ({...prev, email:e.target.value}))} />
                    <input type="password" className='login-inp' name="pass" value={data.password} placeholder='password' onChange={(e) => setData((prev) => ({...prev, password:e.target.value}))}/>
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