import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import "./Users.css";
import axios from "axios";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function Users() {
  const [users, setUsers] = useState([]);

  //get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/get-users`
      );
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "User Id",
      width: 250,
      headerClassName: "header-color",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      headerClassName: "header-color",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 380,
      headerClassName: "header-color",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      headerClassName: "header-color",
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }));

  return (
    <Layout>
      <div className="admin_container">
        <div className="admin_menu">
          <AdminMenu />
        </div>
        <div className="admin_right_container card text-center">
          <h1>All Users</h1>
          <br />
          <Box
            sx={{
              height: 400,
              width: "100%",
              "& .header-color": {
                backgroundColor: "#ccc",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}  
              slots={{
                toolbar: GridToolbar,
              }}
              columnMenuManageColumnsIcon = {true}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
        </div>
      </div>
    </Layout>
  );
}
