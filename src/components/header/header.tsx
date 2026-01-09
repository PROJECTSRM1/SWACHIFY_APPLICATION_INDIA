// src/components/header/header.tsx
import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined,
  CloseOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu, message, Button, Dropdown, Badge, Avatar, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import { customerLogout } from "../../api/customerAuth";
import "../../index.css";
import { useCart } from "../../context/CartContext";
import RecentBookingPage from "../../pages/RecentBookingPage";
//import PaymentPage from "../../pages/PaymentPage";
import ConfirmBookingModal from "../ConfirmAddressModal";
import { Input } from "antd";
import EmployeeAllocationModal from "../EmployeeAllocationModal";
import ProfilePage from "../../pages/ProfilePage";



type Booking = {
  id: number;
  title: string;
  date: string;
  time: string;
  amount: number;
  image?: string;
  paymentDone: boolean;
};



const LS_BOOKINGS_KEY = "bookings";


const Header: React.FC = () => {
  const [notificationOpen] = useState(false); // kept for parity; not used visibly
  const [cartOpen, setCartOpen] = useState(false); // cart drawer
  const [showBookingPage, setShowBookingPage] = useState(false);
  const [employeeAllocationOpen, setEmployeeAllocationOpen] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);


  console.log(notificationOpen)

  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // confirm address modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<any | null>(null);

  // payment overlay
  


const handleLogout = async () => {
  try {
    await customerLogout();     // wait but safe even if user invalid
  } catch (err) {
    console.warn("Logout API failed but continuing", err);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  message.success("Logout successful");
  navigate("/landing", { replace: true });
};
const [headerSearch, setHeaderSearch] = useState("");
useEffect(() => {
  const timer = setTimeout(() => {
    if (headerSearch.trim()) {
      navigate(`/app/dashboard?q=${encodeURIComponent(headerSearch)}`);
    } else {
      navigate("/app/dashboard");
    }
  }, 400); // ⏱ debounce delay

  return () => clearTimeout(timer);
}, [headerSearch, navigate]);


//  const handleNavigate = (key: string) => {
//     if (key === "packers") navigate("/app/dashboard/packers");
//     else if (key === "homeservices") navigate("/app/dashboard/homeservices");
//     else if (key === "rentals") navigate("/app/dashboard/rentals");
//     else if (key === "commercial") navigate("/app/dashboard/commercials");
//     else if (key === "construction") navigate("/app/dashboard/constructions");
//     else if (key === "swachify_products") navigate("/app/dashboard/swachify_products");
//     else if (key === "education") navigate("/app/dashboard/education");
//     else if (key === "bookings") setShowBookingPage(true);
//     else if (key === "cart") setCartOpen(true);
//     else navigate(`/app/dashboard/${key}`);
//   };

  // const centerMenu = [
  //   { key: "packers", label: <span className="sw-menu-item">Transport</span> },
  //   { key: "homeservices", label: <span className="sw-menu-item">Home & Cleaning Services</span> },
  //   { key: "commercial", label: <span className="sw-menu-item">Buy/Sale/Rentals</span> },
  //   { key: "construction", label: <span className="sw-menu-item">Construction Raw Materials</span> },
  //   { key: "swachify_products", label: <span className="sw-menu-item">Swachify Products</span> },
  //   { key: "education", label: <span className="sw-menu-item">Education</span> },
  // ];

  const notificationMenu = (
    <Menu
      className="sw-notification-dropdown-menu"
      items={
        cart.length === 0
          ? [{ key: "empty", label: <span>No new notifications</span> }]
          : cart.map((item: any, index) => ({
              key: index,
              label: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>New Service Added</strong>
                  <span>{item.title} added to cart</span>
                </div>
              ),
            }))
      }
    />
  );

const profileMenu = (
  <Menu
    items={[
      { key: "profile", label: "Profile", icon: <ProfileOutlined /> },
      { key: "bookings", label: "Recent Booking", icon: <HomeOutlined /> },
      { key: "cart", label: `Cart (${cart.length})`, icon: <ShoppingCartOutlined /> },
      { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
    ]}
    onClick={(info) => {
      if (info.key === "profile") setShowProfilePage(true);
      else if (info.key === "cart") setCartOpen(true);
      else if (info.key === "bookings") setShowBookingPage(true);
      else if (info.key === "logout") handleLogout();
    }}
  />
);


  const addBookingToLocalStorage = (b: Booking) => {
    try {
      const raw = localStorage.getItem(LS_BOOKINGS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(arr) ? [...arr, b] : [b];
      localStorage.setItem(LS_BOOKINGS_KEY, JSON.stringify(next));
    } catch {}
  };


  const handleBuyNowClick = (item: any) => {
    // open confirm address modal (asks "is this address ok?" and allows edit)
    setSelectedCartItem(item);
    setConfirmModalOpen(true);
  };

  const handleBookingConfirmed = (booking: Booking) => {
    addBookingToLocalStorage(booking);
    

    setCartOpen(false);
    setConfirmModalOpen(false);

    
  };

 

  // Escape Key Close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setShowBookingPage(false);
        setConfirmModalOpen(false);
       
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

 return (
  <>
  {/* ===== FIXED HEADER ===== */}
  <div className="sw-header-container">
    {/* LEFT */}
    <div
      className="sw-header-left"
      onClick={() => navigate("/app/dashboard")}
    >
      <HomeOutlined className="sw-logo-icon" />
      <span className="sw-logo-text">Home</span>
    </div>

    {/* DESKTOP SEARCH ONLY */}
    <div className="sw-header-center desktop-search">
      <Input
        allowClear
        size="large"
        placeholder="Search services..."
        value={headerSearch}
        onChange={(e) => setHeaderSearch(e.target.value)}
      />
    </div>
    

    {/* ✅ RIGHT ICONS — MUST BE INSIDE HEADER */}
    <div className="sw-header-right">
      <Dropdown overlay={notificationMenu} trigger={["click"]}>
        <span className="sw-header-item-notif">
          <Badge count={cart.length}>
            <BellOutlined className="sw-header-icon-cart" />
          </Badge>
        </span>
      </Dropdown>

      <Dropdown overlay={profileMenu} trigger={["click"]}>
        <span className="sw-header-item-profile">
          <Avatar size="small" icon={<UserOutlined />} />
          <span className="sw-profile-text">Profile</span>
        </span>
      </Dropdown>
      </div>
    </div>
      <div className="mobile-search">
    <Input
      allowClear
      size="large"
      placeholder="Search services..."
      value={headerSearch}
      onChange={(e) => setHeaderSearch(e.target.value)}
    />
  </div>   
    
      <Modal
  open={cartOpen}
  footer={null}
  centered
  width={650}
  closable={false}
  onCancel={() => setCartOpen(false)}
  bodyStyle={{
    padding: 0,
    height: "75vh",
    overflow: "hidden", 
  }}
  style={{ top: 20 }}
>
  <div className="cart-container">
    {/* HEADER */}
    <div className="cart-header">
      <span className="cart-title">My Cart ({cart.length})</span>
      <CloseOutlined
        className="cart-close"
        onClick={() => setCartOpen(false)}
      />
    </div>


    {/* ITEMS (ONLY SCROLL) */}
<div className="cart-items-scroll">
  {cart.length === 0 ? (
    <div className="cart-empty">
      <h3>No items in cart</h3>
      <p>Add services to proceed</p>
    </div>
  ) : (
    cart.map((item, i) => (
      <div key={i} className="cart-item">
        <img src={item.image} alt={item.title} />


        <div className="cart-info">
          <strong>{item.title}</strong>
          <span>Qty: {item.quantity}</span>
          <span
            className="cart-remove"
            onClick={() => removeFromCart(item.id)}
          >
            REMOVE
          </span>
        </div>


        <div className="cart-price">₹{item.totalPrice}</div>
      </div>
    ))
  )}
</div>



    {/* FOOTER */}
    <div className="cart-footer">
      <div className="cart-total">
        <span>Total Amount</span>
        <strong>
          ₹{cart.reduce(
            (s, i) => s + Number(i.totalPrice || 0),
            0
          )}
        </strong>
      </div>


      <Button
        type="primary"
        block
        size="large"
        className="cart-place-order"
        onClick={() => handleBuyNowClick(cart[0])}
      >
        PLACE ORDER
      </Button>
    </div>
  </div>
</Modal>



        {/* CONFIRM ADDRESS MODAL */}
        {/* <ConfirmBookingModal
          open={confirmModalOpen}
          item={selectedCartItem}
          onClose={() => {
            setConfirmModalOpen(false);
            setSelectedCartItem(null);
          }}
          onConfirm={(bookingData: Booking) => handleBookingConfirmed(bookingData)}
        /> */}

        <ConfirmBookingModal
  open={confirmModalOpen}
  item={selectedCartItem}
  onClose={() => {
    setConfirmModalOpen(false);
    setSelectedCartItem(null);
  }}
  onConfirm={(bookingData: Booking) => handleBookingConfirmed(bookingData)}
  onPaymentSuccess={() => setEmployeeAllocationOpen(true)}   // ✅ ADD THIS
/>

<EmployeeAllocationModal
  open={employeeAllocationOpen}
  onClose={() => setEmployeeAllocationOpen(false)}
/>



        


        {/* RECENT BOOKING OVERLAY */}
        {/* RECENT BOOKING OVERLAY */}
{showBookingPage && (
  <div
    className="sw-booking-page-overlay"
    onClick={() => setShowBookingPage(false)}
  >
    <div
      className="sw-booking-page-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="sw-booking-page-close"
        onClick={() => setShowBookingPage(false)}
      >
        <CloseOutlined />
      </button>


      {/* ✅ THIS WAS MISSING */}
      <RecentBookingPage />
    </div>
  </div>
)}
{showProfilePage && (
  <div
    className="sw-booking-page-overlay"
    onClick={() => setShowProfilePage(false)}
  >
    <div
      className="sw-booking-page-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="sw-booking-page-close"
        onClick={() => setShowProfilePage(false)}
      >
        <CloseOutlined />
      </button>
<div className="profile-modal-scroll">
  <ProfilePage />
</div>

    </div>
  </div>
)}




        {/* PAYMENT OVERLAY */}
       
       </>
);

};



export default Header;