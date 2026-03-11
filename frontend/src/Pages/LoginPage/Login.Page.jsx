// import {Link, useNavigate} from 'react-router-dom'
// import { login, 
//          oauthLogin,
//          addErrorMsg 
// }from '../../features/user/userSlice';

// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';


// import './login.style.scss';

// const LoginPage = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.user);
//     const navigate = useNavigate();
   

//     const [data, setData] = useState(({
//         email : '',
//         password : ''
//     }))

//     useEffect(() => {
//         if(user.isLogedIn === true){
//             navigate('/home')
//         }
//     }, [user.isLogedIn,navigate])
  
//     const userLogin = () => {
//         const {email, password} = data
//         if(!email || !password){
//            return dispatch(addErrorMsg('please Enter All Fields'));
//         };
        

//         if(!email.includes('@') || !email.includes('gmail.com')){
//             return dispatch(addErrorMsg('Please Enter Valid Email'));
//         };

//         dispatch(login({email, password}));
//     }

//     return (
//         <div className='login-container'>
//                 <div className="login-box">
//                     <input type="email" className='login-inp' name='email' value={data.email} placeholder='email' onChange={(e) => setData((prev) => ({...prev, email:e.target.value}))} />
//                     <input type="password" className='login-inp' name="pass" value={data.password} placeholder='password' onChange={(e) => setData((prev) => ({...prev, password:e.target.value}))}/>
//                     <button className='login-btn' onClick={userLogin}>login</button>
//                 </div>
//                 <div className="oauth-box">
//                     <button className='oauth-Btn' onClick={oauthLogin}>login with google</button>
//                     <p>dont have an account?<Link to='/signup'>sign-in</Link></p>
//                 </div>
//         </div>
//     )
// };

// export default LoginPage

import { Link, useNavigate } from 'react-router-dom'
import { login, oauthLogin, addErrorMsg } from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './login.style.scss';

const LoginPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user.isLogedIn === true) {
            navigate('/home')
        }
    }, [user.isLogedIn, navigate]);

    const userLogin = () => {
        const { email, password } = data;
        if (!email || !password) {
            return dispatch(addErrorMsg('please Enter All Fields'));
        }
        if (!email.includes('@') || !email.includes('gmail.com')) {
            return dispatch(addErrorMsg('Please Enter Valid Email'));
        }
        dispatch(login({ email, password }));
    };

    return (
        <div className="lp2-root">
            {/* Ambient orbs */}
            <div className="lp2-orb lp2-orb-1" />
            <div className="lp2-orb lp2-orb-2" />
            <div className="lp2-noise" />
            <div className="lp2-grid" />

            <div className="lp2-card">
                {/* Corner brackets */}
                <span className="lp2-corner lp2-corner-tl" />
                <span className="lp2-corner lp2-corner-tr" />
                <span className="lp2-corner lp2-corner-bl" />
                <span className="lp2-corner lp2-corner-br" />
                <div className="lp2-scanline" />

                {/* Brand */}
                <div className="lp2-brand">
                    <span className="lp2-brand-dot" />
                    <span className="lp2-brand-name">hey</span>
                </div>

                <h2 className="lp2-title">Welcome back</h2>
                <p className="lp2-subtitle">Sign in to continue.</p>

                {/* Error message */}
                {user.errorMsg && (
                    <div className="lp2-error-box">
                        <span className="lp2-error-icon">!</span>
                        <p className="lp2-error-msg">{user.errorMsg}</p>
                    </div>
                )}

                {/* Fields */}
                <div className="lp2-fields">
                    <div className="lp2-field">
                        <label className="lp2-label">Email</label>
                        <input
                            className="lp2-input"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="you@gmail.com"
                            onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div className="lp2-field">
                        <label className="lp2-label">Password</label>
                        <input
                            className="lp2-input"
                            type="password"
                            name="pass"
                            value={data.password}
                            placeholder="Your password"
                            onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                        />
                    </div>
                </div>

                {/* Login button */}
                <button className="lp2-btn-primary" onClick={userLogin}>
                    <span>Log in</span>
                    <span className="lp2-btn-arrow">→</span>
                </button>

                {/* Divider */}
                <div className="lp2-divider">
                    <span /><p>or</p><span />
                </div>

                {/* OAuth */}
                <button className="lp2-btn-oauth" onClick={oauthLogin}>
                    <svg className="lp2-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>

                {/* Footer */}
                <p className="lp2-footer">
                    Don't have an account?{' '}
                    <Link to="/signup" className="lp2-signup-link">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;