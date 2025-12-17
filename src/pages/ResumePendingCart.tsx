import { useEffect } from "react";
import { message } from "antd";
import { useCart } from "../context/CartContext";

const ResumePendingCart = () => {
  const { addToCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const pending = localStorage.getItem("pendingCartItem");

    if (!token || !pending) return;

    try {
      const { module, values, computedPrice } = JSON.parse(pending);

      addToCart({
        id: Date.now(),
        title: module.title,
        image: module.image,
        quantity: 1,
        price: module.price,
        totalPrice: computedPrice,
        customerName: values?.fullName || "",
        contact: values?.mobile || "",
        address: values?.address || "",
        deliveryDate: values?.preferredDate || "",
        deliveryType: values?.paymentType || "",
        instructions: values?.instructions || "",
      });

      localStorage.removeItem("pendingCartItem");

      message.success(`${module.title} added to cart`);
    } catch (e) {
      console.error("Failed to resume cart", e);
    }
  }, []);

  return null;
};

export default ResumePendingCart;
