import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify';
import Profile from './pages/Profile';

const App = () => {
  const location = useLocation();

  React.useEffect(() => {
    const shell = document.querySelector('.app-shell');
    if (shell) {
      // when location changes, ensure shell is visible (fade-in)
      shell.classList.remove('faded');
    }
  }, [location]);

  return (
    <>
      {/* Background with Blob — kept outside the fading app-shell so it remains visible */}
      <div className="dynamic-bg">
        <div className="blob"></div>
        <div className="blob" style={{ animationDelay: "2s" }}></div>
        <div className="blob"></div>
        <div className="blob" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="app-shell px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative">
        <ToastContainer />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/Product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;