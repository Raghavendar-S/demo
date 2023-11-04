import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting single product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL}/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong ${error.toString()}`);
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete the product? (yes/no)");
      if (answer.toLowerCase() === "no" ) {
        return;
      }
      await axios.delete(
        `${process.env.REACT_APP_URL}/product/delete-product/${id}`
      );
      toast.success("Product Deleted successfully");
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
              <h1 className="text-center">Update product</h1><br/>
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
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        className="custom-img"
                      />
                    </div>
                  ) : (id && (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_URL}/product/product-photo/${id}`}
                        alt="product_photo"
                        className="custom-img"
                      />
                    </div>
                  ))}
                  <form>
                    <TextField
                      required
                      type="text"
                      label="Enter name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea 
                      rows="3" 
                      required
                      className="textarea"
                      placeholder="Enter description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                      required
                      type="number"
                      label="Enter price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </form>
                <div className="admin_button_container">
                <button className="admin_btn" id="update_btn" onClick={handleUpdate}>
                  <i className="ri-refresh-fill"/> Update Product
                </button>
                <button className="admin_btn" id="delete_btn" onClick={handleDelete}>
                  <i className="ri-delete-bin-line"/> Delete Product
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}
