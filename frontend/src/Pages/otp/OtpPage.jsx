import { useEffect, useRef, useState } from 'react';
import './otpStyles.scss';

const OtpPage = () => {

  const otp_digit = 4;
  const [inputArr, setInpArr] = useState(new Array(otp_digit).fill(''));
  const inpRef = useRef([]);

  useEffect(() => {
      inpRef.current[0]?.focus();
  },[])

  function handleOnChange(value, index) {
    const newValue = value.trim();
    if(!/^\d*$/.test(newValue)) return;
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInpArr(newArr);
    newValue && inpRef.current[index + 1]?.focus()
  };

  function handleKeyDown(e, index){
    if(!e.target.value && e.key === 'Backspace'){
      inpRef.current[index -1]?.focus();
    }
  }

  return (
<div className="otp-page">
  <div className="otp-card">
    <h2 className="otp-title">Verify OTP</h2>

    <div className="otp-inputs">
      {inputArr.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          className="otp-input"
          ref={input => {inpRef.current[index] = input}}
          onChange={(e) => handleOnChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>

    <p className="otp-hint">Enter the {otp_digit}-digit code sent to your device</p>
  </div>
</div>


  )
};

export default OtpPage;