import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, 
         updateFeild, 
         oauthLogin,
         addErrorMsg
} from '../features/user/userSlice.js' 

import { useState, useEffect } from 'react'
import '../styles/page/signup.style.scss'

const Signup = () => {
  const [confirmPass, setConfirmPass] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user.isLogedIn === true) navigate('/home')
  }, [user.isLogedIn, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateFeild({ field: name, value }))
  }

  const handleSubmit = () => {
    if (!name || !email || !pass || !mobile || !confirmPass) {
    return dispatch(addErrorMsg('Enter all valid fields'));
  }

  if (!email.includes('@') || !email.includes('gmail.com')) {
    return dispatch(addErrorMsg('Please enter a valid email'));
  }

  if (mobile.length !== 10) {
    return dispatch(addErrorMsg('Please enter a valid mobile number'));
  }

  if (pass.length < 3) {
    return dispatch(addErrorMsg('Password must be at least 3 characters'));
  }

  if (confirmPass !== pass) {
    dispatch(addErrorMsg('Passwords do not match'));
    setConfirmPass('');
    return;
  }


    dispatch(register({ name, email, mobile, pass }))
  }

  return (
    <div className="container">

      <div className="box1">
        <input type="text" name="name" value={user.name} placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" value={user.email} placeholder="Email" onChange={handleChange} required />
        <input type="number" name="mobile" value={user.mobile} placeholder="Mobile" onChange={handleChange} required maxLength={10} />
        <input type="password" name="pass" value={user.pass} placeholder="Password" onChange={handleChange} required />
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
