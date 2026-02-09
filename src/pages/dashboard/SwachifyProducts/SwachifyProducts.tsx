import React, { useState } from "react";
import "./SwachifyProducts.css";
import ProductsListing from "./ProductsListing";
import RegisterProduct from "./RegisterProduct";
import MyProducts from "./MyProducts";
import Orders from "./Orders";
import CommonHeader from "../../landing/Header";
import {
  ArrowLeftOutlined,
  ShoppingOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface CardItem {
  id: number;
  title: string;
  description: string;
  IconComponent: React.ReactNode;
  buttonText: string;
}

const cards: CardItem[] = [
  {
    id: 1,
    title: "Browse Products",
    description: "Explore sustainable products from local entrepreneurs",
    IconComponent: <ShoppingOutlined />,
    buttonText: "View",
  },
  {
    id: 2,
    title: "Register Product",
    description: "List your eco-friendly products on the marketplace",
    IconComponent: <AppstoreAddOutlined />,
    buttonText: "Add",
  },
  {
    id: 3,
    title: "My Products",
    description: "Manage your registered products and inventory",
    IconComponent: <DatabaseOutlined />,
    buttonText: "Manage",
  },
  {
    id: 4,
    title: "Orders",
    description: "Track your product orders and sales",
    IconComponent: <ShoppingCartOutlined />,
    buttonText: "Track",
  },
];

interface SwachifyProductsProps {
  searchQuery?: string;
}

const SwachifyProducts: React.FC<SwachifyProductsProps> = ({
  searchQuery = "",
}) => {
  const [page, setPage] = useState<"main" | "subpage">("main");
  const [activeCard, setActiveCard] = useState<
    "browse" | "register" | "myproducts" | "orders" | null
  >(null);

  const handleBack = () => {
    setPage("main");
    setActiveCard(null);
  };

  return (
    <>
      <CommonHeader />
      {/* GLOBAL BACK ARROW – OUTSIDE BLOCKS */}
      <button
        className="sw-products-global-back-btn"
        onClick={() => window.history.back()}
        aria-label="Go Back"
      >
        <ArrowLeftOutlined />
      </button>

      {page === "main" && (
        <div className="sw-products-dashboard-container">
          {/* HEADER */}
          <div className="sw-products-dashboard-header">
            <div>
              <h2>Swachify Products</h2>
              <p>{cards.length} services available</p>
            </div>
          </div>

          {/* CARDS */}
          <div className="sw-products-dashboard-grid">
            {cards.map((card) => (
              <div className="sw-products-dashboard-card" key={card.id}>
                <div className="sw-products-icon-box">{card.IconComponent}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>

                <button
                  className="sw-products-action-btn"
                  onClick={() => {
                    switch (card.id) {
                      case 1:
                        setActiveCard("browse");
                        break;
                      case 2:
                        setActiveCard("register");
                        break;
                      case 3:
                        setActiveCard("myproducts");
                        break;
                      case 4:
                        setActiveCard("orders");
                        break;
                    }
                    setPage("subpage");
                  }}
                >
                  {card.buttonText}
                  <span className="arrow">›</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "subpage" && (
        <div className="sw-products-fullscreen-page">
          {activeCard === "browse" && (
            <ProductsListing onBack={handleBack} searchQuery={searchQuery} />
          )}
          {activeCard === "register" && <RegisterProduct onBack={handleBack} />}
          {activeCard === "myproducts" && <MyProducts onBack={handleBack} />}
          {activeCard === "orders" && <Orders onBack={handleBack} />}
        </div>
      )}
    </>
  );
};

export default SwachifyProducts;
