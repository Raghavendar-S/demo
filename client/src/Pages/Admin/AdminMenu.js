import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminMenu() {
  return (
    <>
      <div className="list-group text-center">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/product"
          className="list-group-item list-group-item-action"
        >
          Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin"
          className="list-group-item list-group-item-action"
        >
          Others
        </NavLink>
      </div>
    </>
  );
}
