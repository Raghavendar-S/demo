import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="admin_container">
        <div className="admin_menu">
          <AdminMenu />
        </div>
        <div className="admin_right_container">
          <div className="card">
            <h1 className="text-center">All product list</h1>
            <div className="product_list">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="custom-card">
                    <img
                      src={`${process.env.REACT_APP_URL}/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="custom-card-body">
                      <h5 className="custom-card-title">{p.name}</h5>
                      <p className="custom-card-text">
                        {p.description.substring(0, 50)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
