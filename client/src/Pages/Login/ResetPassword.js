import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecovery } from "../../Context/Recovery";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const {email} = useRecovery();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password and Confirm password does not match.";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_URL}/reset-password`,
          { email, password }
        );
        if (response.data.success) {
          toast.success("Password reset successfully");
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="left_container" id="reset"></div>
        <div className="container_right">
          <div className="content">
            <p className="heading">Reset Password Page</p>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                className="input"
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              <TextField
                required
                className="input"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
              <button className="submit_btn" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
