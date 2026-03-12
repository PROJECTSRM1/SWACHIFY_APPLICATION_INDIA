import React, { useState } from "react";
import "./SwachifyProducts.css";
import ProductsListing from "./ProductsListing";
import RegisterProduct from "./RegisterProduct";
import MyProducts from "./MyProducts";
import Orders from "./Orders";

interface SwachifyProductsProps {
  searchQuery?: string;
}

const SwachifyProducts: React.FC<SwachifyProductsProps> = ({
  searchQuery = "",
}) => {
  const [activeView, setActiveView] = useState<
    "browse" | "register" | "myproducts" | "orders"
  >("browse");

  return (
    <div className="sw-products-app-wrapper">
      {activeView === "browse" && (
        <ProductsListing 
          searchQuery={searchQuery} 
          onRegister={() => setActiveView("register")}
        />
      )}
      {activeView === "register" && (
        <RegisterProduct onBack={() => setActiveView("browse")} />
      )}
      {activeView === "myproducts" && (
        <MyProducts onBack={() => setActiveView("browse")} />
      )}
      {activeView === "orders" && (
        <Orders onBack={() => setActiveView("browse")} />
      )}
    </div>
  );
};

export default SwachifyProducts;
