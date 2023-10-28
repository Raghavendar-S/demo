import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import toast from "react-hot-toast";
import "./CartPage.css";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if(!authData){
      toast.error("Please login to add products to the cart");
      return;
    }
    const existingProduct = auth.cart?.find((item) => item._id === product._id);
    if (!existingProduct) {
        authData.cart = authData.cart || [];
        authData.cart.push(product);
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
        toast.success("Item added to cart");
    } else {
      toast.error("Item already added in the cart");
    }
  };

  return (
    <Layout>
      <div className="admin_container">
        <div className="admin_menu">
          {product._id && (
            <img
              src={`${process.env.REACT_APP_URL}/product/product-photo/${product._id}`}
              className="custom-card-img"
              alt={product.name}
            />
          )}
        </div>
        <div className="admin_right_container card">
          <h1 className="text-center">Product Details</h1>
          <h4>Product Name:</h4> <p>{product.name}</p>
          <h4>Description:</h4> <p className="justify">{product.description}</p>
          <h4>Price: </h4> <p>₹{product.price} per box</p>
          <div className="text-center">
            <button
              className="admin_btn"
              onClick={() => handleAddToCart(product)}
              id="create_btn"
            >
              <i className="ri-shopping-cart-2-fill" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
