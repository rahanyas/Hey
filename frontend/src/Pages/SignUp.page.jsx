 import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
         register, 
         updateFeild, 
         oauthLogin,
         addErrorMsg
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

  function otpHandler(){
    navigate('/otpPage');
  }

  const handleSubmit = () => {
  //   if (!name || !email || !password || !mobile || !confirmPass) {
  //     dispatch(addErrorMsg('Enter all valid fields'));
  //     return
  // }

  // if (!email.includes('@') || !email.includes('gmail.com')) {
  //    return dispatch(addErrorMsg('Please enter a valid email'));
      
  // }

  // if (mobile.length !== 10) {
  //    return dispatch(addErrorMsg('Please enter a valid mobile number'));
  // }

  // if (password.length < 3) {
  //    return dispatch(addErrorMsg('Password must be at least 3 characters'));
  // }

  // if (confirmPass !== password) {
  //   dispatch(addErrorMsg('Passwords do not match'));
  //   setConfirmPass('');
  //   return
  // }

  otpHandler()
  //  return dispatch(register({ name, email, mobile, password}))
  }

  return (
    <div className="container">

      <div className="box1">
        <input type="text" name="name" value={name} placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" value={email} placeholder="Email" onChange={handleChange} required />
        <input type="number" name="mobile" value={mobile} placeholder="Mobile" onChange={handleChange} required maxLength={10} />
        <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" name="confirmPas" value={confirmPass} placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} required />

        <button type="button" onClick={handleSubmit}>Signup</button>
      </div>

      <span  className='span1'>Already have an account? <Link to='/login' className='login-link'>Login</Link></span>
      <span className='span2'>or</span>
      <button className='oauth-btn' onClick={oauthLogin}>Login with Google</button>
    </div>
  )
}

export default Signup
