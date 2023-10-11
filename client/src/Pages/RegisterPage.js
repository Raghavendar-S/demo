import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../Components/LoginRegister.css'
import TextField from "@mui/material/TextField";
import axios from 'axios';

export function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const {name,email,phone,password} = formData;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password and Confirm password does not match.";
    }

    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:3001/register',{name,email,phone,password})
      .then((result)=>{
        console.log(result)
        navigate("/login")
      })
      .catch((error)=>{
        console.log('Unable to register user')
      })
    }else{
      setErrors(errors);
    }
  };

  return (
    <div className="container">
      <div className="register_container_left"></div>
      <div className="container_right">
        <div className="content">
          <p className="heading">Register Page</p>
          <div className="header_content">
            <p>Already have an account? <Link to="/login">Login now</Link></p>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField required className="input" type="name" label="Name" name="name" 
            value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error-message">{errors.name}</p>}
            <TextField required className="input" type="email" label="Email" name="email" 
            value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <TextField required className="input" type="number" label="Phone Number" name="phone" 
            value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            <TextField required className="input" type="password" label="Password" name="password" 
            value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-message">{errors.password}</p>}
            <TextField required className="input" type="password" label="Confirm Password" name="confirmPassword" 
            value={formData.confirmPassword} onChange={handleChange} />
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
        </div>
      </div>
    </div>
  );
}