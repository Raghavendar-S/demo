import React, { useState, useEffect } from "react";
import "../Admin/AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";

export default function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${process.env.REACT_APP_URL}/profile`, {
        name,
        email,
        phone,
        password,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log("Unable to update user");
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone } = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
    }
  }, [auth?.user]);

  return (
    <Layout>
      <div className="admin_container">
        <div className="card user_card">
          <h1 className="text-center">User Profile</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              type="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="tel"
              label="Phone Number"
              name="phone"
              inputProps={{ maxLength: 10 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-center">
              <button className="admin_btn" id="update_btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
