import React, { useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  MenuOutlined,
  //CloseOutlined,
} from "@ant-design/icons";
import { useCart } from "../../../src/context/CartContext";



import { Menu, Drawer, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";


const HeaderBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { cart ,removeFromCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);


  const handleLogout = () => {

    localStorage.removeItem("user");
    message.success("logout successful");
    navigate("/landing");
  };

  const handleCartClick = () => {
  setCartOpen(true);   // open popup instead of navigate
};


  const handleNavigate = (key: String)=>{
    if(key=="cleaning"){
      navigate("/app/dashboard/cleaning")

    }
    if(key=="packers"){
      navigate("/app/dashboard/packers")

    }
     if(key=="homeservices"){
      navigate("/app/dashboard/homeservices")
    }
      if(key=="rentals"){
      navigate("/app/dashboard/rentals")
    }
      if(key=="commercial"){
      navigate("/app/dashboard/commercials")
    }
      if(key=="construction"){
     navigate("/app/dashboard/constructions") 
    }
    
  }


  const centerMenu = [
    // { key: "cleaning", label: <span className="menu-item">Cleaning</span> },
    {
      key: "packers",
      label: <span className="menu-item">Packers & Movers</span>,
    },
    {
      key: "homeservices",
      label: <span className="menu-item">Home & Cleaning Services</span>,
    },
    { key: "rentals", label: <span className="menu-item">Rentals</span> },
    {
      key: "commercial",
      label: <span className="menu-item">Commercial Plots</span>,
    },
    {
      key: "construction",
      label: <span className="menu-item">Construction Materials</span>,
    },
     {
      key: "freelancer",
      label: <span className="menu-item">Freelancer</span>,
    },
    {
      key: "location",
      label: <span className="menu-item">Location</span>,
    },
  ];

  return (
    <div className="header-container">

      <div className="header-left">
        <HomeOutlined className="logo-icon" />
        <span className="logo-text">Home</span>
      </div>

      

      <div className="header-center">
        <Menu mode="horizontal" items={centerMenu} className="header-menu"
          onClick={(info) => handleNavigate(info.key)}
        />
      </div>

      <div className="header-right">
       
        <span className="header-item-cart" onClick={handleCartClick}>
  <ShoppingCartOutlined className="header-icon-cart" /> Cart ({cart.length})
</span>


        {/* Logout with navigation */}
        <span className="header-item" onClick={handleLogout}>
          <LogoutOutlined className="header-icon-large" /> Logout
        </span>
      </div>

      <div className="mobile-menu-btn">
        <MenuOutlined
          className="header-icon-large"
          onClick={() => setOpen(true)}
        />
      </div>
      <Drawer
  title="Menu"
  placement="left"
  onClose={() => setOpen(false)}
  open={open}
>
  <Menu
    mode="vertical"
    items={[
      ...centerMenu,   // existing items
      {
        key: "cart",
        label: (
          <span
            onClick={() => {
              setCartOpen(true);
              setOpen(false);
            }}
          >
            <ShoppingCartOutlined /> Cart ({cart.length})
          </span>
        )
      },
      {
        key: "logout",
        label: (
          <span
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
          >
            <LogoutOutlined /> Logout
          </span>
        )
      }
    ]}
    onClick={(info) => {
      
      if (info.key !== "cart" && info.key !== "logout") {
        handleNavigate(info.key);
        setOpen(false);
      }
    }}
  />
</Drawer>


    <Drawer
  title="Your Cart"
  placement="right"
  width={350}
  onClose={() => setCartOpen(false)}
  open={cartOpen}
>
  {cart.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
   <div className="cart-list">
  {cart.map((item, index) => (
    <div key={index} className="cart-item">

      {/* IMAGE */}
      <img src={item.image} alt={item.title} />

      {/* DETAILS */}
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>Qty: {item.quantity}</p>
        <p>Total: ₹{item.totalPrice}</p>
      </div>

      {/* BUTTONS */}
      <div className="cart-buttons">
        <Button>
          Buy Now
        </Button>

        <Button
          danger
          type="primary"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  ))}
</div>

  )}
</Drawer>

    </div>
  );
};

export default HeaderBar;
