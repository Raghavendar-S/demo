import React, { useState } from "react";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/product/create-product/`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong ${error.toString()}`);
    }
  };

  return (
    <Layout>
      <div className="admin_container">
        <div className="admin_menu">
          <AdminMenu />
        </div>
        <div className="admin_right_container">
          <div className="card">
            <h1 className="text-center">Create product</h1><br/>
            <div className="text-center">
              <label className="custom-label">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
              {photo && (
                <div className="text_center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="custom-img"
                  />
                </div>
              )}
              <form>
                <TextField
                  required
                  type="text"
                  label="Enter name:"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextareaAutosize
                  required
                  minRows={4}
                  className="textarea"
                  placeholder="Enter description:"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  required
                  type="number"
                  label="Enter price:"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </form>
              <button className="admin_btn" id="create_btn" onClick={handleCreate}>
                <i className="ri-file-edit-line"/> Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
