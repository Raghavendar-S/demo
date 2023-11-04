import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App";
import { AuthProvider } from "./Context/Auth";
import { RecoveryProvider } from "./Context/Recovery";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RecoveryProvider>
      <Toaster position="top-right" reverseOrder={false}/>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </RecoveryProvider>
  </AuthProvider>
);
