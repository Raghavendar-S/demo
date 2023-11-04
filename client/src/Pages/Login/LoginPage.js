import React, { useState } from "react";
import "./LoginRegister.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/Auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/login`, {
        email,
        password,
      });      
      if (response && response.data.success) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        toast.success("Login successfully");
        navigate(location.state || "/");
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
        <div className="left_container" id="login"></div>
        <div className="container_right">
          <div className="content">
            <p className="heading">Login Page</p>
            <div className="header_content">
              <p>
                Not a member yet? <Link to="/register">Register now</Link>
              </p>
            </div>
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
              <TextField
                required
                className="input"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button className="submit_btn" type="submit">
                Login
              </button>
              <Link to="/forgot_password">
                <p className="forget_password">Forgot your password?</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
