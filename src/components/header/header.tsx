import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined,
  CloseOutlined,
  ProfileOutlined,
  HeartOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Menu, message, Button, Dropdown, Badge, Avatar, Modal, Empty, Card, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { customerLogout } from "../../api/customerAuth";
import "../../index.css";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import RecentBookingPage from "../../pages/RecentBookingPage";
import ConfirmBookingModal from "../ConfirmAddressModal";
import EmployeeAllocationModal from "../EmployeeAllocationModal";
import ProfilePage from "../../pages/ProfilePage";
import logo from "../../assets/swachify-logo.png";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [showBookingPage, setShowBookingPage] = useState(false);
  const [employeeAllocationOpen, setEmployeeAllocationOpen] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string>("");

  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<any | null>(null);

  const handleLogout = async () => {
    try {
      await customerLogout();
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
    }, 400);
    return () => clearTimeout(timer);
  }, [headerSearch, navigate]);

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
        { key: "wishlist", label: `Wishlist (${wishlist.length})`, icon: <HeartOutlined /> },
        { key: "cart", label: `Cart (${cart.length})`, icon: <ShoppingCartOutlined /> },
        { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
      ]}
      onClick={(info) => {
        if (info.key === "profile") setShowProfilePage(true);
        else if (info.key === "cart") setCartOpen(true);
        else if (info.key === "wishlist") setWishlistOpen(true);
        else if (info.key === "bookings") setShowBookingPage(true);
        else if (info.key === "logout") handleLogout();
      }}
    />
  );

  const handleBuyNowClick = (item: any) => {
    setSelectedCartItem(item);
    setConfirmModalOpen(true);
  };

  const handleBookingConfirmed = (booking: Booking) => {
    const raw = localStorage.getItem(LS_BOOKINGS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(arr) ? [...arr, booking] : [booking];
    localStorage.setItem(LS_BOOKINGS_KEY, JSON.stringify(next));

    setCartOpen(false);
    setConfirmModalOpen(false);
  };

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
      <div className="sw-header-container">
        <div className="sw-header-left" onClick={() => navigate("/app/dashboard")}>
          <img src={logo} alt="Swachify India" style={{ height: '30px', objectFit: 'contain' }} />
          <span className="sw-logo-text">Swachify India</span>
        </div>

        <div className="sw-header-center desktop-search">
          <Input
            allowClear
            size="large"
            placeholder="Search products & services..."
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
          />
        </div>

        <div className="sw-header-right">
          <Dropdown overlay={notificationMenu} trigger={["click"]}>
            <span className="sw-header-item-notif">
              <Badge count={cart.length} offset={[2, 0]}>
                <BellOutlined className="sw-header-icon-cart" />
              </Badge>
            </span>
          </Dropdown>

          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <span className="sw-header-item-profile">
              <Avatar size="small" icon={<UserOutlined />} src="/avatar-placeholder.png" />
              <span className="sw-profile-text">My Account</span>
            </span>
          </Dropdown>
        </div>
      </div>

      {/* Cart, Wishlist, and other Modals/Overlays below */}
      <Modal
        open={cartOpen}
        footer={null}
        centered
        width={650}
        closable={false}
        onCancel={() => setCartOpen(false)}
        bodyStyle={{ padding: 0, height: "75vh", overflow: "hidden" }}
      >
        <div className="cart-container">
          <div className="cart-header">
            <span className="cart-title">My Cart ({cart.length})</span>
            <CloseOutlined className="cart-close" onClick={() => setCartOpen(false)} />
          </div>
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
                    <span className="cart-remove" onClick={() => removeFromCart(item.id)}>REMOVE</span>
                  </div>
                  <div className="cart-price">₹{item.totalPrice}</div>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total Amount</span>
              <strong>₹{cart.reduce((s, i) => s + Number(i.totalPrice || 0), 0)}</strong>
            </div>
            <Button type="primary" block size="large" className="cart-place-order" onClick={() => handleBuyNowClick(cart[0])}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmBookingModal
        open={confirmModalOpen}
        item={selectedCartItem}
        onClose={() => { setConfirmModalOpen(false); setSelectedCartItem(null); }}
        onConfirm={handleBookingConfirmed}
        onPaymentSuccess={(bookingData: Booking) => {
          setCurrentBookingId(String(bookingData.id));
          setEmployeeAllocationOpen(true);
        }}
      />

      <EmployeeAllocationModal
        open={employeeAllocationOpen}
        onClose={() => setEmployeeAllocationOpen(false)}
        bookingId={currentBookingId}
      />

      {showBookingPage && (
        <div className="sw-booking-page-overlay" onClick={() => setShowBookingPage(false)}>
          <div className="sw-booking-page-content" onClick={(e) => e.stopPropagation()}>
            <button className="sw-booking-page-close" onClick={() => setShowBookingPage(false)}><CloseOutlined /></button>
            <RecentBookingPage />
          </div>
        </div>
      )}

      {showProfilePage && (
        <div className="sw-booking-page-overlay" onClick={() => setShowProfilePage(false)}>
          <div className="sw-booking-page-content" onClick={(e) => e.stopPropagation()}>
            <button className="sw-booking-page-close" onClick={() => setShowProfilePage(false)}><CloseOutlined /></button>
            <div className="profile-modal-scroll"><ProfilePage /></div>
          </div>
        </div>
      )}

      <Modal
        open={wishlistOpen}
        footer={null}
        centered
        width={800}
        closable={false}
        onCancel={() => setWishlistOpen(false)}
        bodyStyle={{ padding: 0, maxHeight: "75vh", overflow: "hidden" }}
      >
        <div className="cart-container">
          <div className="cart-header">
            <span className="cart-title"><HeartOutlined style={{ marginRight: 8, color: '#ff4d4f' }} />My Wishlist ({wishlist.length})</span>
            <CloseOutlined className="cart-close" onClick={() => setWishlistOpen(false)} />
          </div>
          <div className="cart-items-scroll" style={{ padding: '16px' }}>
            {wishlist.length === 0 ? (
              <div className="cart-empty">
                <Empty description="No items in wishlist" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                <p>Add products to see them here</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {wishlist.map((item) => (
                  <Card
                    key={item.id}
                    hoverable
                    style={{ borderRadius: '12px' }}
                    cover={<img alt={item.name} src={item.image} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
                  >
                    <div style={{ padding: '8px 0' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                      <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.company}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: '#2563eb' }}>₹{item.price.toLocaleString()}</span>
                        <Button type="text" danger size="small" icon={<DeleteOutlined />} onClick={() => { removeFromWishlist(item.id); message.success(`${item.name} removed from wishlist`); }} />
                      </div>
                      <Button
                        type="primary"
                        size="small"
                        block
                        icon={<ShoppingCartOutlined />}
                        style={{ background: '#000', borderColor: '#000', borderRadius: '6px' }}
                        onClick={() => {
                          const cartItem = {
                            id: parseInt(item.id),
                            title: item.name,
                            image: item.image,
                            quantity: 1,
                            price: item.price,
                            totalPrice: item.price,
                            customerName: '',
                            email: '',
                            deliveryType: 'Standard',
                            deliveryDate: '',
                            deliveryTime: '',
                            contact: '',
                            address: '',
                            instructions: `Product from ${item.company}`,
                          };
                          addToCart(cartItem);
                          message.success(`${item.name} added to cart!`);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;