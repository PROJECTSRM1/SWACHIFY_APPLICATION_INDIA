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
  //   const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [editMode, setEditMode] = useState(false);

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
    <div className="cart-page">
      <div className="cart-header">
        <ArrowLeftOutlined
          className="cart-back"
          onClick={() => navigate("/MyFood")}
        />

        <div className="cart-title-row">
          <h1>Cart ({cartItems.length})</h1>

          {cartItems.length > 0 && (
            <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
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

          <button className="browse-btn" onClick={() => navigate("/MyFood")}>
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

          <div className="address-box">📍 2118 Thornridge Cir. Syracuse</div>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="total-row">
            <h2 className="cart-total">₹{total}</h2>

            <button className="breakdown-btn">Breakdown ›</button>
          </div>

          <button className="place-order-btn">PLACE ORDER</button>
        </div>
      )}{" "}
    </div>
  );
};

export default Cart;
