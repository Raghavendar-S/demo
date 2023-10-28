import React,{useState, useEffect} from "react";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import "./Users.css";
import axios from "axios";
import toast from "react-hot-toast";

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
  },[]);

  return (
    <Layout>
      <div className="admin_container">
          <div className="admin_menu">
            <AdminMenu />
          </div>
          <div className="admin_right_container card text-center">
              <h1>All Users</h1><br/>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </Layout>
  );
}
