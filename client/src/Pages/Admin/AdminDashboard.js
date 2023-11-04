import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function AdminDashboard() {
  const [lastUpdated, setLastUpdated] = useState("");
  const [newDate, setNewDate] = useState(dayjs());

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
          <div className="card">
            <p>Last Updated Price Date </p>
            <Button
              variant="outlined"
              disabled
              style={{ color: "#000", marginBottom: "1rem" }}
            >
              {formattedDate}
            </Button>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="New Price Date"
                value={newDate}
                format="DD MMMM YYYY"
                onChange={(e) => setNewDate(e)}
              />
            </LocalizationProvider>
            <br />
            <button
              onClick={handleUpdate}
              className="admin_btn"
              id="update_btn"
            >
              <i className="ri-refresh-fill" /> Update date
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
