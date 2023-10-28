import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../Context/Auth";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

export default function AdminDashboard() {
  const [auth] = useAuth();
  const [lastUpdated, setLastUpdated] = useState("");
  const [newDate, setNewDate] = useState("");

  const dateObject = new Date(lastUpdated);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
  const year = dateObject.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/other/get-price-date`)
      .then((response) => {
        setLastUpdated(response.data.price.priceUpdated);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = () => {
    const date = new Date(newDate);

    if (!isNaN(date.getTime())) {
      const isoDate = date.toISOString();
      axios
        .put(`${process.env.REACT_APP_URL}/other/price-update`, {
          priceUpdated: isoDate,
        })
        .then((response) => {
          toast.success(response.data.message);
          setLastUpdated(isoDate);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <Layout>
      <div className="admin_container">
        <div className="admin_menu">
          <AdminMenu />
        </div>
        <div className="admin_right_container card text-center">
          <div className="card mb-2">
            <h3>Admin Name: {auth?.user?.name}</h3>
            <h3>Admin Email: {auth?.user?.email}</h3>
            <h3>Admin Contact: {auth?.user?.phone}</h3>
          </div>
          <div className="card">
            <p>Last Updated Price Date </p>
            <Button variant="outlined" disabled style={{ color: "#000", marginBottom:"1rem" }}>
              {formattedDate}
            </Button><br/>
            <label>New Price Date</label>
            <br />
            <input
              type="date"
              className="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <br />
            <button
              onClick={handleUpdate}
              className="admin_btn"
              id="update_btn"
            >
              <i className="ri-refresh-fill"/> Update date
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
