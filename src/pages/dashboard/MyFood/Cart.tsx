import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

import { ArrowLeftOutlined } from "@ant-design/icons";

type CartItem = {
  name: string;
  img: string;
  price: number;
  qty: number;
  size: string;
  restaurant: string;
};

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [editMode, setEditMode] = useState(false);

  const [screen, setScreen] = useState("cart");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Detect Card Type Automatically
  const [cardType, setCardType] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  /*Update Cart in Cart Page*/
  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (index: number) => {
    const updated = [...cartItems];
    updated[index].qty += 1;
    updateCart(updated);
  };

  const decreaseQty = (index: number) => {
    const updated = [...cartItems];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    } else {
      updated.splice(index, 1); // remove item if qty = 0
    }
    updateCart(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);

    updateCart(updated);
  };
  return (
    <>
      {/* CART SCREEN */}
      {screen === "cart" && (
        <div className="cart-page">
          <div className="cart-header">
            <ArrowLeftOutlined
              className="cart-back"
              onClick={() => navigate("/MyFood")}
            />

            <div className="cart-title-row">
              <h1>Cart ({cartItems.length})</h1>

              {cartItems.length > 0 && (
                <button
                  className="edit-btn"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? "DONE" : "EDIT ITEMS"}
                </button>
              )}
            </div>
          </div>
          {cartItems.length === 0 && (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>

              <h2>Your cart is empty</h2>

              <p>Add items from the menu to get started</p>

              <button
                className="browse-btn"
                onClick={() => navigate("/MyFood")}
              >
                BROWSE MENU
              </button>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="cart-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.img} />

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>{item.restaurant}</p>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="cart-qty">
                    <button onClick={() => decreaseQty(index)}>-</button>

                    <span>{item.qty}</span>

                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                  {editMode && (
                    <button
                      className="delete-btn"
                      onClick={() => removeItem(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="delivery-section">
              <div className="delivery-header">
                <h3>DELIVERY ADDRESS</h3>
                <span className="edit-address">EDIT</span>
              </div>

              <div className="address-box">
                📍 2118 Thornridge Cir. Syracuse
              </div>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <div className="total-row">
                <h2 className="cart-total">₹{total}</h2>

                <button className="breakdown-btn">Breakdown ›</button>
              </div>

              <button
                className="place-order-btn"
                onClick={() => setScreen("payment")}
              >
                PLACE ORDER
              </button>
            </div>
          )}{" "}
        </div>
      )}
      {/* PAYMENT SCREEN WILL COME HERE */}
      {screen === "payment" && (
        <div className="payment-page">
          <h1>Payment</h1>

          <div className="payment-options">
            <div
              className={`pay-option ${paymentMethod === "cash" ? "active" : ""}`}
              onClick={() => setPaymentMethod("cash")}
            >
              💵 Cash
            </div>

            <div
              className={`pay-option ${paymentMethod === "visa" ? "active" : ""}`}
              onClick={() => setPaymentMethod("visa")}
            >
              💳 Visa
            </div>

            <div
              className={`pay-option ${paymentMethod === "mastercard" ? "active" : ""}`}
              onClick={() => setPaymentMethod("mastercard")}
            >
              💳 Mastercard
            </div>

            <div
              className={`pay-option ${paymentMethod === "paypal" ? "active" : ""}`}
              onClick={() => setPaymentMethod("paypal")}
            >
              💳 PayPal
            </div>
          </div>

          <h2>Order Summary</h2>

          <div className="order-summary">
            {cartItems.map((item, index) => (
              <div key={index} className="summary-item">
                <img src={item.img} width="60" />

                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.size}" × {item.qty}
                  </p>
                </div>

                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <button
            className="add-new-button"
            onClick={() => setScreen("addCard")}
          >
            + ADD NEW CARD
          </button>

          <button className="pay-btn" onClick={() => setScreen("success")}>
            PAY & CONFIRM
          </button>
        </div>
      )}

      {/* Add Card Screen WILL COME HERE */}

      {screen === "addCard" && (
        <div className="add-card-page">
          <h1>Add Card</h1>

          <input placeholder="Full Name" type="text" />

          <input
            placeholder="Card Number"
            type="text"
            inputMode="numeric"
            maxLength={19}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");

              if (value.startsWith("4")) {
                setCardType("Visa");
              } else if (/^5[1-5]/.test(value)) {
                setCardType("Mastercard");
              } else {
                setCardType("");
              }

              value = value.replace(/(.{4})/g, "$1 ").trim();

              e.target.value = value;
            }}
          />

          {/* Show Card Type in UI */}

          {cardType && <p className="card-type">Detected: {cardType}</p>}

          <div className="card-row">
            <input
              placeholder="MM/YY"
              type="text"
              maxLength={5}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (value.length >= 1) {
                  let month = value.slice(0, 2);

                  if (parseInt(month) > 12) {
                    month = "12";
                  }

                  value = month + value.slice(2);
                }

                if (value.length >= 3) {
                  value = value.slice(0, 2) + "/" + value.slice(2, 4);
                }

                e.target.value = value;
              }}
            />

            <input
              placeholder="CVC"
              type="text"
              inputMode="numeric"
              maxLength={3}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
          </div>

          <button onClick={() => setScreen("success")}>
            ADD & MAKE PAYMENT
          </button>
        </div>
      )}

      {/* Success Screen WILL COME HERE */}

      {screen === "success" && (
        <div className="success-page">
          <h1>✅ Payment Successful</h1>

          <p>You successfully made a payment.</p>

          <button onClick={() => setScreen("track")}>TRACK ORDER</button>
        </div>
      )}

      {/* Track Order Screen WILL COME HERE */}
      {screen === "track" && (
        <div className="track-page">
          <h1>Tracking Order</h1>

          <div className="track-map">
            <svg viewBox="0 0 300 300" className="route-svg">
              {/* ROUTE */}
              <path
                d="M30 250 C80 200 110 180 150 140 C200 100 240 60 270 30"
                className="route-path"
              />

              {/* START PIN */}
              <text x="20" y="260" fontSize="26">
                📍
              </text>

              {/* DESTINATION DOT */}
              <circle cx="270" cy="30" r="10" className="end-circle" />
            </svg>
          </div>

          <div className="order-card">
            <h3>Uttora Coffee House</h3>

            <p>2x Burger</p>

            <p>4x Sandwich</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
