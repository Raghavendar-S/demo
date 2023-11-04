import React from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecovery } from "../../Context/Recovery";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { email, setEmail } = useRecovery();

  function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      axios
        .post(`${process.env.REACT_APP_URL}/send_recovery_email`, {
          OTP,
          recipient_email: email,
        })
        .then(() => navigate("/otp_input"))
        .catch(console.log);
      return;
    }
    return alert("Please enter your email");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/forgot-password`,
        { email }
      );
      if (response.data.success) {
        toast.success("Email is verified");
        navigateToOtp();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  return (
    <>
      <div className="container">
        <div className="left_container" id="forgot"></div>
        <div className="container_right">
          <div className="content">
            <p className="heading">Forgot Password Page</p>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                className="input"
                type="email"
                label="Email "
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="submit_btn" type="submit">
                Submit
              </button>
              <button
                className="back"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i className="ri-arrow-left-s-line" /> Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
