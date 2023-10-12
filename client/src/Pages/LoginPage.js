import React,{useState} from "react";
import '../Components/LoginRegister.css'
import {Link, useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email,password} = formData;

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (formData.email.length === 0) {
      errors.email = "Email is required";
    }

    if (formData.password.length === 0) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length === 0) {
      try{
        // const response = await axios.post('http://localhost:3001/login',{email,password})
        const response = await axios.post('https://karur-polymers-backend.onrender.com/login',{email,password})
        if(response.data.success){
          const token = response.data.token;
          localStorage.setItem('token',token);
          localStorage.setItem('loginMessage', response.data.message);
          navigate("/dashboard");        
          window.location.reload();
        }else{
          toast.error(response.data.message);
        }
      }catch(error){
        console.log(error);
        toast.error(error.toString());
      }
    }else{
      setErrors(errors);
    }
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false}/>
    <div className="container">
      <div className="login_container_left"></div>
      <div className="container_right">
        <div className="content">
          <p className="heading">Login Page</p>
          <div className="header_content">
            <p>Not a member yet? <Link to="/register">Register now</Link></p>
          </div>
          <form onSubmit={handleSubmit}>
          <TextField
            required
            className="input"
            type="email"
            label="Email "
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <TextField
              required
              className="input"
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
            <button className="submit_btn" type="submit">Login</button>
            <p className="forget_password">Forgot your password?</p>
          </form>
          <p className="social_login_header">Or sign in with</p>
          <div className="socials">
            <div className="social_login google_login">
              <i className="ri-google-fill"></i>
              <span>Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}