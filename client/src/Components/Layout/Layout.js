import React from 'react'
import Footer from './Footer';
import { Navbar } from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <div>
        <Toaster position="top-right" reverseOrder={false}/>
        <Navbar/>
        <main style={{minHeight: "100vh"}}>
            {children}
        </main>
        <Footer/>
    </div>
  );
}

export default Layout;