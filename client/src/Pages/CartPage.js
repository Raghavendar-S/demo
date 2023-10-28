import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/Auth";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./CartPage.css";
import axios from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [productTotalPrices, setProductTotalPrices] = useState({});
  const options = { year: "numeric", month: "long", day: "numeric" };
  const price_date = "October 26, 2023";
  const [selectedInchTape, setSelectedInchTape] = useState("1_inch");
  const [selectedColor, setSelectedColor] = useState("red");
  const [lastUpdated, setLastUpdated] = useState("");

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

  useEffect(() => {
    // Load auth data from localStorage when the component mounts
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setAuth(authData);
    }
  }, [setAuth]);

  useEffect(() => {
    const productTotals = {};
    auth.cart.forEach((item) => {
      productTotals[item._id] = item.price * item.quantity;
    });
    setProductTotalPrices(productTotals);
  }, [auth.cart]);

  const totalPrice = () => {
    const productTotalArray = Object.values(productTotalPrices);
    const total = productTotalArray.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    return total;
  };

  const calculatePieces = (inchTape) => {
    switch (inchTape) {
      case "1_inch":
        return 144;
      case "2_inch":
        return 72;
      case "3_inch":
        return 48;
      case "4_inch":
        return 36;
      default:
        return 0;
    }
  };

  const removeCardItem = (pid) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData) {
        const updatedCart = authData.cart.filter((item) => item._id !== pid);
        authData.cart = updatedCart;
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = (pid) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData) {
        const updatedCart = authData.cart.map((item) => {
          if (item._id === pid) {
            item.quantity += 1;
          }
          return item;
        });
        authData.cart = updatedCart;
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = (pid) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData) {
        const updatedCart = authData.cart.map((item) => {
          if (item._id === pid) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            }
          }
          return item;
        });
        authData.cart = updatedCart;
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="cart_container">
        <div className="user_card text-center">
          <h2>
            {`Hello ${
              auth?.token && auth?.user?.name ? auth.user.name : "User"
            }`}
          </h2>
          <h4>Email id: {auth?.user?.email}</h4>
          <h4>Phone Number: {auth?.user?.phone}</h4>
          <h4>Date: {new Date().toLocaleDateString(undefined, options)}</h4>
          <h4>
            {auth.cart?.length
              ? `You have ${auth.cart.length} items in your cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your cart is empty"}
          </h4>
          <h4>Lastly updated price date: {formattedDate || price_date}</h4>
        </div>
        <div className="cart_product_container">
          {auth.cart?.map((p) => (
            <div className="single_product_cart_container outer_card">
              <div className="cart_image_container">
                <img
                  src={`${process.env.REACT_APP_URL}/product/product-photo/${p._id}`}
                  className="custom-cart-img-card"
                  alt={p.name}
                />
              </div>
              <div className="cart_details_container card text-center">
                <h2>{p.name}</h2>
                <p>Price : ₹{p.price} per box</p>
                <p>
                  Total price: ₹{p.price * p.quantity} for {p.quantity} box
                </p>
                <Stack spacing={2} alignItems="center" className="mt-2">
                  {p.name === "Color Tape" ? (
                    <FormControl>
                      <FormLabel id="tape-color" style={{ color: "#000" }}>Tape Color</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="tape-color"
                        value={selectedColor}
                        onChange={(event) =>
                          setSelectedColor(event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="red"
                          control={<Radio />}
                          label="Red"
                        />
                        <FormControlLabel
                          value="blue"
                          control={<Radio />}
                          label="Blue"
                        />
                        <FormControlLabel
                          value="green"
                          control={<Radio />}
                          label="Green"
                        />
                        <FormControlLabel
                          value="yellow"
                          control={<Radio />}
                          label="Yellow"
                        />
                         <FormControlLabel
                          value="mixed"
                          control={<Radio />}
                          label="Mixed"
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <></>
                  )}
                  <FormControl>
                    <FormLabel id="tape-inch" style={{ color: "#000" }}>Tape Width</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="tape-inch"
                      value={selectedInchTape}
                      onChange={(e) => setSelectedInchTape(e.target.value)}
                    >
                      <FormControlLabel
                        value="1_inch"
                        control={<Radio />}
                        label="1 inch"
                      />
                      <FormControlLabel
                        value="2_inch"
                        control={<Radio />}
                        label="2 inch"
                      />
                      <FormControlLabel
                        value="3_inch"
                        control={<Radio />}
                        label="3 inch"
                      />
                      <FormControlLabel
                        value="4_inch"
                        control={<Radio />}
                        label="4 inch"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormLabel style={{ color: "#000" }} id="rolls">
                    Number of tape rolls in a box
                  </FormLabel>
                  <Button variant="outlined" disabled style={{ color: "#000" }}>
                    {calculatePieces(selectedInchTape)} Piece
                  </Button>
                  <FormControl>
                    <FormLabel id="tape-length" style={{ color: "#000" }}>Tape Length</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="tape-length"
                      defaultValue="45_meter"
                    >
                      <FormControlLabel
                        value="45_meter"
                        control={<Radio />}
                        label="45 Meter"
                      />
                      <FormControlLabel
                        value="65_meter"
                        control={<Radio />}
                        label="65 Meter"
                      />
                      <FormControlLabel
                        value="90_meter"
                        control={<Radio />}
                        label="90 Meter"
                      />
                      <FormControlLabel
                        value="100_meter"
                        control={<Radio />}
                        label="100 Meter"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormLabel id="quantity" style={{ color: "#000" }}>Box Quantity</FormLabel>
                  <ButtonGroup variant="contained" size="large">
                    <Button onClick={() => decrementQuantity(p._id)}>-</Button>
                    <Button>{p.quantity} </Button>
                    <Button onClick={() => incrementQuantity(p._id)}>+</Button>
                  </ButtonGroup>
                </Stack>
                <button
                  className="admin_btn"
                  id="delete_btn"
                  onClick={() => removeCardItem(p._id)}
                >
                  <i className="ri-delete-bin-line" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="admin_menu text-center checkout_card">
          <h2>Cart Summary</h2>
          <p style={{ marginBottom: "0.75rem" }}>Total | Checkout | Payment</p>
          <hr />
          <h4 style={{ marginTop: "0.75rem" }}>Total : ₹{totalPrice()}</h4>
          <h4 style={{ marginTop: "0.75rem" }}>Net Total : ₹{(totalPrice() + (totalPrice() * 0.18))} (included GST)</h4>
          <button className="admin_btn" id="update_btn" onClick={downloadPDF}>
            <i className="ri-file-download-line" /> Download PDF
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
