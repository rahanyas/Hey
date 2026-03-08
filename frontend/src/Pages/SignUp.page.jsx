 import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  
         updateFeild, 
         oauthLogin,
         addErrorMsg,
         register
} from '../features/user/userSlice.js' 

import { useState, useEffect } from 'react'
import '../styles/page/signup.style.scss'

const Signup = () => {
  const [confirmPass, setConfirmPass] = useState('')
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {email, mobile, name, isLogedIn} = useSelector((state) => state.user)

  useEffect(() => {
    if (isLogedIn === true) navigate('/home')
  }, [isLogedIn, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateFeild({ field: name, value }))
  }

  // function otpHandler(){
  //   navigate('/otpPage', {
  //     state : {
  //       pass : password
  //     }
  //   });
  // }

  const handleSubmit = async () => {
    if (!name || !email || !password || !mobile || !confirmPass) {
      dispatch(addErrorMsg('Enter all valid fields'));
      return
  }

  if (!email.includes('@') || !email.includes('gmail.com')) {
     return dispatch(addErrorMsg('Please enter a valid email'));
      
  }

  if (mobile.length !== 10) {
     return dispatch(addErrorMsg('Please enter a valid mobile number'));
  }

  if (password.length < 3) {
     return dispatch(addErrorMsg('Password must be at least 3 characters'));
  }

  if (confirmPass !== password) {
    dispatch(addErrorMsg('Passwords do not match'));
    setConfirmPass('');
    return
  }
  try {
    
    await dispatch(register({name, email, password, mobile})).unwrap()
  } catch (err) {
    console.error('error in register dispatching : ', err)
  }


  // otpHandler()
  
  }

  return (
    // <div className="container">

    //   <div className="box1">
    //     <input type="text" name="name" value={name} placeholder="Username" onChange={handleChange} required />
    //     <input type="email" name="email" value={email} placeholder="Email" onChange={handleChange} required />
    //     <input type="number" name="mobile" value={mobile} placeholder="Mobile" onChange={handleChange} required maxLength={10} />
    //     <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
    //     <input type="password" name="confirmPas" value={confirmPass} placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} required />

    //     <button type="button" onClick={handleSubmit}>Signup</button>
    //   </div>

    //   <span  className='span1'>Already have an account? <Link to='/login' className='login-link'>Login</Link></span>
    //   <span className='span2'>or</span>
    //   <button className='oauth-btn' onClick={oauthLogin}>Login with Google</button>
    // </div>

    // Replace only the JSX inside your existing return() with this.
// All your existing handlers, state, and imports remain unchanged.
// Just add: import '../styles/page/signupPage.style.scss';

<div className="su-root">
  {/* Decorative orbs */}
  <div className="su-orb su-orb-1" />
  <div className="su-orb su-orb-2" />
  <div className="su-noise" />

  <div className="su-card">

    {/* Brand mark */}
    <div className="su-brand">
      <span className="su-brand-dot" />
      <span className="su-brand-name">hey</span>
    </div>

    <h2 className="su-title">Create your account</h2>
    <p className="su-subtitle">Join thousands already connected.</p>

    {/* ── Error / success — keep your existing conditional rendering here ── */}
    {/* Example:
    {error && (
      <div className="su-error-box">
        <span className="su-error-icon">!</span>
        <p className="su-error-msg">{error}</p>
      </div>
    )}
    {success && <p className="su-success-msg">{success}</p>}
    */}

    {/* Fields */}
    <div className="su-fields">
      <div className="su-field">
        <label className="su-label">Username</label>
        <input className="su-input" type="text" name="name" value={name}
          placeholder="e.g. john_doe" onChange={handleChange} required />
      </div>

      <div className="su-field">
        <label className="su-label">Email</label>
        <input className="su-input" type="email" name="email" value={email}
          placeholder="you@example.com" onChange={handleChange} required />
      </div>

      <div className="su-field">
        <label className="su-label">Mobile</label>
        <input className="su-input" type="number" name="mobile" value={mobile}
          placeholder="10-digit number" onChange={handleChange} required maxLength={10} />
      </div>

      <div className="su-field">
        <label className="su-label">Password</label>
        <input className="su-input" type="password" name="password" value={password}
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="su-field">
        <label className="su-label">Confirm Password</label>
        <input className="su-input" type="password" name="confirmPas" value={confirmPass}
          placeholder="Repeat password"
          onChange={(e) => setConfirmPass(e.target.value)} required />
      </div>
    </div>

    {/* Primary CTA */}
    <button className="su-btn-primary" type="button" onClick={handleSubmit}>
      <span>Sign up</span>
      <span className="su-btn-arrow">→</span>
    </button>

    {/* Divider */}
    <div className="su-divider">
      <span /><p>or</p><span />
    </div>

    {/* OAuth */}
    <button className="su-btn-oauth" onClick={oauthLogin}>
      <svg className="su-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>

    {/* Footer */}
    <p className="su-footer">
      Already have an account?{' '}
      <Link to="/login" className="su-login-link">Log in</Link>
    </p>

  </div>
</div>
  )
}

export default Signup
