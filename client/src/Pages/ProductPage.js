import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import toast from "react-hot-toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-product`
      );
      setProducts(data.products);
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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="product_container">
        <div className="product_card_list">
          <h1 className="text-center">All products</h1>
          <div className="product_list">
            {products.map((p) => (
              <>
                <div key={p._id} className="custom-card">
                  <img
                    src={`${process.env.REACT_APP_URL}/product/product-photo/${p._id}`}
                    className="custom-card-img"
                    alt={p.name}
                  />
                  <div className="custom-card-body">
                    <h5 className="custom-card-title">{p.name}</h5>
                    <p className="custom-card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="custom-card-text">Price: <b>₹{p.price}</b> per box onwards</p>
                    <div className="card_button_container">
                      <button
                        className="admin_btn"
                        onClick={() => navigate(`/product/${p.slug}`)}
                        id="details_btn"
                      >
                        <i className="ri-more-2-fill" /> More Details
                      </button>
                      <button
                        className="admin_btn"
                        onClick={() => handleAddToCart(p)}
                        id="create_btn"
                      >
                        <i className="ri-shopping-cart-2-fill" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
