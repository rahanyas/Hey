import { useEffect, useRef, useState } from 'react';
import server from '../../utils/axiosInstance.utils';
import { useSelector } from 'react-redux';
import './otpStyles.scss';

const OtpPage = () => {

  const OTP_LENGTH = 4;
  const RESEND_DELAY = 30; // seconds
  const MAX_RESEND = 5;

  const [inputArr, setInpArr] = useState(new Array(OTP_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(RESEND_DELAY);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendCount, setResendCount] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const inpRef = useRef([]);
  const timerRef = useRef(null);

  const { email } = useSelector(state => state.user);

  // ---------------- SEND OTP ----------------

  async function sendOtp(email) {
    try {
      await server.post('/otp/sendotp', { email });
      startTimer();
    } catch (err) {
      console.log(err);
    }
  }

  // ---------------- VERIFY OTP ----------------

  async function verifyOtp(otp) {
    try {
      setIsVerifying(true);

      const res = await server.post('/otp/otpverify', {
        email,
        otp
      });

      console.log(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setIsVerifying(false);
    }
  }

  // ---------------- TIMER ----------------

  function startTimer() {

    setIsResendDisabled(true);
    setTimeLeft(RESEND_DELAY);

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {

      setTimeLeft(prev => {

        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsResendDisabled(false);
          return 0;
        }

        return prev - 1;
      });

    }, 1000);
  }

  // ---------------- RESEND ----------------

  function handleResend() {

    if (resendCount >= MAX_RESEND) return;

    sendOtp(email);
    setResendCount(prev => prev + 1);
  }

  // ---------------- INPUT CHANGE ----------------

  function handleOnChange(value, index) {

    if (!/^\d*$/.test(value)) return;

    const newArr = [...inputArr];
    newArr[index] = value.slice(-1);
    setInpArr(newArr);

    if (value && index < OTP_LENGTH - 1) {
      inpRef.current[index + 1]?.focus();
    }

    const otp = newArr.join('');

    if (otp.length === OTP_LENGTH && !newArr.includes('')) {
      verifyOtp(otp);
    }
  }

  // ---------------- BACKSPACE ----------------

  function handleKeyDown(e, index) {

    if (e.key === 'Backspace' && !inputArr[index] && index > 0) {
      inpRef.current[index - 1]?.focus();
    }
  }

  // ---------------- PASTE SUPPORT ----------------

  function handlePaste(e) {

    const paste = e.clipboardData.getData('text').trim();

    if (!/^\d+$/.test(paste)) return;

    const pasteArr = paste.slice(0, OTP_LENGTH).split('');

    const newArr = [...inputArr];

    pasteArr.forEach((digit, i) => {
      newArr[i] = digit;
    });

    setInpArr(newArr);

    const lastIndex = pasteArr.length - 1;

    inpRef.current[lastIndex]?.focus();

    if (pasteArr.length === OTP_LENGTH) {
      verifyOtp(pasteArr.join(''));
    }
  }

  // ---------------- INIT ----------------

  useEffect(() => {

    inpRef.current[0]?.focus();

    sendOtp(email);

    return () => clearInterval(timerRef.current);

  }, [email]);

  // ---------------- FORMAT TIMER ----------------

  function formatTime(sec) {

    const s = sec.toString().padStart(2, '0');
    return `00:${s}`;
  }

  // ---------------- UI ----------------

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
              ref={el => inpRef.current[index] = el}
              onChange={e => handleOnChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onPaste={handlePaste}
              maxLength={1}
            />

          ))}

        </div>

        <button
          className="otp-btn"
          disabled={inputArr.includes('') || isVerifying}
          onClick={() => verifyOtp(inputArr.join(''))}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        <div className="otp-resend-container">

          <button
            className="otp-resend-btn"
            disabled={isResendDisabled || resendCount >= MAX_RESEND}
            onClick={handleResend}
          >
            Resend OTP
          </button>

          <span className="otp-timer">

            {resendCount >= MAX_RESEND
              ? "Limit reached"
              : isResendDisabled
                ? formatTime(timeLeft)
                : "Ready"}

          </span>

        </div>

        <p className="otp-hint">
          Enter the {OTP_LENGTH}-digit code sent to {email}
        </p>

      </div>

    </div>

  );
};

export default OtpPage;
