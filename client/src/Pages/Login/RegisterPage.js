import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import './LoginRegister.css'
import TextField from "@mui/material/TextField";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email,setEmail] = useState();
  const [name,setName] = useState();
  const [phone,setPhone] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Password and Confirm password does not match.";
    }

    if (Object.keys(errors).length === 0) {
      try{
<<<<<<< HEAD:client/src/Pages/Login/RegisterPage.js
        const response = await axios.post(`${process.env.REACT_APP_URL}/register`,{name,email,phone,password})
=======
        // const response = await axios.post('http://localhost:3001/register',{name,email,phone,password})
        const response = await axios.post('https://karur-polymers-backend.onrender.com/register',{name,email,phone,password})
>>>>>>> 27a9af530f5a710b62801e8afdaaa5dd480d3adb:client/src/Pages/RegisterPage.js
        if(response.data.success){
          toast.success("Registered successfully");
          navigate("/login");
        }else{
          toast.error(response.data.message);
        }
      }
      catch(error){
        console.log('Unable to register user');
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
      <div className="left_container" id="register"></div>
      <div className="container_right">
        <div className="content">
          <p className="heading">Register Page</p>
          <div className="header_content">
            <p>Already have an account? <Link to="/login">Login now</Link></p>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField required className="input" type="name" label="Name" name="name" 
            value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="error-message">{errors.name}</p>}
            <TextField required className="input" type="email" label="Email" name="email" 
            value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <TextField required className="input" type="tel" label="Phone Number" name="phone" inputProps={{ maxLength: 10 }}
            value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            <TextField required className="input" type="password" label="Password" name="password" 
            value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="error-message">{errors.password}</p>}
            <TextField required className="input" type="password" label="Confirm Password" name="confirmPassword" 
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            <button className="submit_btn" id="register_btn">Register</button>
          </form>
          <p className="social_login_header">Or sign up with</p>
          <div className="socials">
            <div className="social_login google_login">
              <i className="ri-google-fill"></i>
              <span>Google</span>
            </div>
          </div>
          <button
              className="back"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ri-arrow-left-s-line" /> Back
            </button>
        </div>
      </div>
    </div>
    </>
  );
}