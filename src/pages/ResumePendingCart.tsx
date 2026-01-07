import { useEffect } from "react";
import { message } from "antd";
import { useCart } from "../context/CartContext";
import { bookHomeService } from "../api/homeService";

const ResumePendingCart = () => {
  const { addToCart } = useCart();

  useEffect(() => {
    const waitForAuthAndResume = async () => {
      // ⏳ Wait until token is actually available
      let attempts = 0;
      let token = localStorage.getItem("accessToken");

      while (!token && attempts < 10) {
        await new Promise((r) => setTimeout(r, 300));
        token = localStorage.getItem("accessToken");
        attempts++;
      }

      if (!token) return;

      const pending = localStorage.getItem("pendingHomeServiceBooking");
      if (!pending) return;

      try {
        const {
          values,
          selectedModule,
          computedPrice,
          payload,
        } = JSON.parse(pending);

        // ✅ API call (token is now guaranteed)
        await bookHomeService(payload);

        // ✅ Add to cart
        addToCart({
          id: Date.now(),
          title: selectedModule.title,
          image: selectedModule.image,
          quantity: 1,
          price: selectedModule.price,
          totalPrice: computedPrice ?? 0,
          customerName: values.fullName,
          email: values.email,
          contact: values.mobile,
          address: values.address,
          deliveryDate: values.preferredDate,
          deliveryType: values.paymentType,
          deliveryTime:'',
          instructions: values.instructions || "",
        });
        console.log("RESUME PAYLOAD", payload);

        localStorage.removeItem("pendingHomeServiceBooking");
        message.success(`${selectedModule.title} added to cart`);
      } catch (err: any) {
        console.error("Resume failed:", err?.response || err);

        // ❗ DO NOT remove pending on failure
        message.error(
          err?.response?.data?.message ||
          "Failed to resume booking. Please retry."
        );
      }
    };

    waitForAuthAndResume();
  }, [addToCart]);

  return null;
};

export default ResumePendingCart;
