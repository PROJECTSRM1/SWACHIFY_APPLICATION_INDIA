import React, { useState } from "react";
import "./SwachifyProducts.css";
import ProductsListing from "./ProductsListing";
import RegisterProduct from "./RegisterProduct";
import MyProducts from "./MyProducts";
import Orders from "./Orders";

interface CardItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    isDummy?: boolean;
}

const cards: CardItem[] = [
    {
        id: 1,
        title: "Browse Products",
        description: "Explore sustainable products from local entrepreneurs",
        icon: "🛍️",
    },
    {
        id: 2,
        title: "Register Product",
        description: "List your eco-friendly products on the marketplace",
        icon: "📦",
    },
    {
        id: 3,
        title: "My Products",
        description: "Manage your registered products and inventory",
        icon: "📋",
    },
    {
        id: 4,
        title: "Orders",
        description: "Track your product orders and sales",
        icon: "🛒",
    },
];

interface SwachifyProductsProps {
    searchQuery?: string;
}

const SwachifyProducts: React.FC<SwachifyProductsProps> = ({ searchQuery = "" }) => {
    const [showAll, setShowAll] = useState(false);
    const [page, setPage] = useState<"main" | "subpage">("main");
    const [activeCard, setActiveCard] = useState<"browse" | "register" | "myproducts" | "orders" | null>(null);

    const handleBack = () => {
        setPage("main");
        setActiveCard(null);
    };

    return (
        <>
            {page === "main" && (
                <div className="sw-products-dashboard-container">
                    {/* HEADER */}
                    <div className="sw-products-dashboard-header">
                        <div>
                            <h2>Swachify Products</h2>
                            <p>{showAll ? cards.length : 2} services available</p>
                        </div>

                        <button
                            className="sw-products-view-all-btn"
                            onClick={() => setShowAll(prev => !prev)}
                        >
                            {showAll ? "Show Less" : "View All Services"}
                        </button>
                    </div>

                    {/* CARDS */}
                    <div className="sw-products-dashboard-grid">
                        {cards
                            .filter((card, index) => showAll || index < 2)
                            .map(card => (
                                <div className="sw-products-dashboard-card" key={card.id}>
                                    <div className="sw-products-icon-box">{card.icon}</div>
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>

                                    <button
                                        className="sw-products-details-btn"
                                        onClick={() => {
                                            if (card.title === "Browse Products") {
                                                setActiveCard("browse");
                                                setPage("subpage");
                                            }

                                            if (card.title === "Register Product") {
                                                setActiveCard("register");
                                                setPage("subpage");
                                            }

                                            if (card.title === "My Products") {
                                                setActiveCard("myproducts");
                                                setPage("subpage");
                                            }

                                            if (card.title === "Orders") {
                                                setActiveCard("orders");
                                                setPage("subpage");
                                            }
                                        }}
                                    >
                                        View Details
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

                    {activeCard === "register" && (
                        <RegisterProduct onBack={handleBack} />
                    )}

                    {activeCard === "myproducts" && (
                        <MyProducts onBack={handleBack} />
                    )}

                    {activeCard === "orders" && (
                        <Orders onBack={handleBack} />
                    )}
                </div>
            )}
        </>
    );
};

export default SwachifyProducts;
