import React, { useState, useEffect } from "react";
import { useRecovery } from "../../Context/Recovery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OTPInput.css";
import { Link } from "react-router-dom";

export default function OTPInput() {
  const { email, otp} = useRecovery();
  const [timerCount, setTimer] = React.useState(45);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  function resendOTP() {
    if (disable) return;
    axios
      .post(`${process.env.REACT_APP_URL}/send_recovery_email`, {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(45))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/reset_password");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); 
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <>
      <div className="otp_page">
        <div className="otp_main_container">
          <h2>Email Verification</h2>
          <p className="text_center mt-1">We have sent a code to your email {email}</p>
          <div className="otp_container">
            <input
              maxLength="1"
              className="otp_input"
              type="text"
              name=""
              id=""
              onChange={(e) =>
                setOTPinput([
                  e.target.value,
                  OTPinput[1],
                  OTPinput[2],
                  OTPinput[3],
                ])
              }
            />
            <input
              maxLength="1"
              className="otp_input"
              type="text"
              name=""
              id=""
              onChange={(e) =>
                setOTPinput([
                  OTPinput[0],
                  e.target.value,
                  OTPinput[2],
                  OTPinput[3],
                ])
              }
            />
            <input
              maxLength="1"
              className="otp_input"
              type="text"
              name=""
              id=""
              onChange={(e) =>
                setOTPinput([
                  OTPinput[0],
                  OTPinput[1],
                  e.target.value,
                  OTPinput[3],
                ])
              }
            />
            <input
              maxLength="1"
              className="otp_input"
              type="text"
              name=""
              id=""
              onChange={(e) =>
                setOTPinput([
                  OTPinput[0],
                  OTPinput[1],
                  OTPinput[2],
                  e.target.value,
                ])
              }
            />
          </div>
            <button className="admin_btn" id="create_btn" onClick={verfiyOTP}>Verify Account</button>
            <div className="link_container">
              <p>Didn't receive code?&nbsp;</p>
              <Link
                onClick={resendOTP}
                style={{
                  color: disable ? "gray" : "blue",
                  cursor: disable ? "none" : "pointer",
                  textDecorationLine: disable ? "none" : "underline",
                }}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </Link>
            </div>
        </div>
      </div>
    </>
  );
}
