// src/pages/landing/SwachifyProducts.tsx
import React from "react";
import CommonHeader from "../../pages/landing/Header";
import FooterSection from "../../pages/landing/FooterSection";

import { Row, Col, Card, Button, Tag } from "antd";
import {
  ShoppingCartOutlined,
  AppleOutlined,
  CrownOutlined,
  FireOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "../../index.css";
import "./Swachifyproducts.css";

type ProductCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  items: string[];
};

type ComboPack = {
  name: string;
  tag?: string;
  price: string;
  forWhom: string;
  points: string[];
};

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "vegetables",
    title: "Fresh Vegetables",
    description:
      "Leafy greens and seasonal vegetables harvested directly from farms.",
    icon: <AppleOutlined />,
    badge: "Daily Harvest",
    items: ["Tomato", "Onion", "Potato", "Leafy Greens", "Okra", "Brinjal",],
  },
  {
    id: "fruits",
    title: "Fruits & Orchard Produce",
    description: "Naturally ripened fruits packed with nutrition and taste, carefully graded and sourced directly from farms for maximum freshness.",
    icon: <CrownOutlined />,
    items: ["Banana", "Mango", "Papaya", "Apple", "Pomegranate", "Dragonfruit",],
  },
  {
    id: "grains",
    title: "Grains, Rice & Wheat",
    description:
      "Staple grains cleaned and packed for homes, hotels and bulk buyers, with consistent quality.",
    icon: <ShoppingCartOutlined />,
    badge: "Best Selling",
    items: ["Raw Rice", "Boiled Rice", "Wheat", "Ragi", "Millets", "Pulses"],
  },
  {
    id: "eggs",
    title: "Eggs & Dairy Basics",
    description:
      "Farm eggs and essential dairy items for daily household needs.",
    icon: <FireOutlined />,
    items: ["Country Eggs", "White Eggs", "Paneer", "Ghee (bulk / retail)"],
  },
  {
    id: "farm-inputs",
    title: "Seeds & Farm Inputs",
    description: "Quality seeds and basic farm inputs to support farmers.",
    icon: <ShoppingCartOutlined />,
    items: ["Vegetable Seeds", "Paddy Seeds", "Bio Fertilizers", "Organic Manure"],
  },
  {
    id: "packs",
    title: "Retail & Wholesale Packs",
    description: "Pre-packed combos ready for shops, hostels and institutions.",
    icon: <CrownOutlined />,
    items: ["Mixed Veg Pack", "Family Grain Pack", "Hostel Combo Pack","Canteen Supply Pack"],
  },
];

const COMBO_PACKS: ComboPack[] = [
  {
    name: "Family Essentials Pack",
    tag: "Most Popular",
    price: "₹1,499",
    forWhom: "Ideal for 4–5 member families",
    points: [
      "Weekly mix of seasonal vegetables",
      "Rice / wheat combo + pulses",
      "Optional add-on: fruits & eggs",
    ],
  },
  {
    name: "Retailer Starter Pack",
    tag: "Best for Shops",
    price: "₹4,999",
    forWhom: "Small supermarkets & kirana stores",
    points: [
      "Assorted vegetables in crates",
      "Pre-packed grain & pulse pouches",
      "Attractive margins & steady supply",
    ],
  },
  {
    name: "Bulk Buyer / Hostel Pack",
    price: "Custom Quote",
    forWhom: "Hostels, canteens and catering units",
    points: [
      "Bulk rice, wheat and pulses",
      "Regular supply of cut / whole vegetables",
      "Delivery schedule as per requirement",
    ],
  },
];

const SwachifyProducts: React.FC = () => {
  return (
    <div className="sw-sp-page">
      <CommonHeader selectedKey="Swachifyproducts" />

      {/* HERO */}
      <section className="sw-sp-hero">
        <div className="sw-sp-hero-overlay">
          <div className="sw-sp-hero-inner">
            <h1 className="sw-sp-hero-title">Swachify Farming Products</h1>
            <p className="sw-sp-hero-sub">
              Fresh vegetables, fruits, grains, rice, wheat, eggs and essential
              farming products – everything you need, all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="sw-sp-container">
        {/* PRODUCT CATEGORIES */}
        <section className="sw-sp-section">
          <h2 className="sw-sp-section-title">Explore Our Farming Categories</h2>
          <p className="sw-sp-section-sub">
            Choose the category that fits your need – home kitchen, retail shop
            or bulk requirement.
          </p>

          <Row gutter={[24, 24]}>
            {PRODUCT_CATEGORIES.map((cat) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                key={cat.id}
                className="sw-sp-category-col"
              >
                <Card hoverable className="sw-sp-category-card">
                  {/* body area that grows */}
                  <div className="sw-sp-category-body">
                    <div className="sw-sp-category-header">
                      <div className="sw-sp-category-icon">{cat.icon}</div>
                      <div className="sw-sp-category-text">
                        <h3>{cat.title}</h3>
                        <p>{cat.description}</p>
                      </div>
                      {cat.badge && (
                        <Tag color="green" className="sw-sp-category-badge">
                          {cat.badge}
                        </Tag>
                      )}
                    </div>

                    <ul className="sw-sp-category-list">
                      {cat.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* footer fixed to bottom */}
                  <div className="sw-sp-card-actions">
                    <Button type="primary" block>
                      View Products
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* COMBO PACKS */}
        <section className="sw-sp-section sw-sp-section-packs">
          <h2 className="sw-sp-section-title">Ready Farming Packs</h2>
          <p className="sw-sp-section-sub">
            Simple packs designed for families, retailers and bulk buyers – so
            ordering becomes easy.
          </p>

          <Row gutter={[24, 24]} justify="center">
            {COMBO_PACKS.map((pack) => (
              <Col xs={24} sm={12} md={8} key={pack.name}>
                <div className="sw-sp-pack-card">
                  {pack.tag && (
                    <div className="sw-sp-pack-badge">{pack.tag}</div>
                  )}
                  <h3 className="sw-sp-pack-title">{pack.name}</h3>
                  <div className="sw-sp-pack-price">{pack.price}</div>
                  <div className="sw-sp-pack-for">{pack.forWhom}</div>

                  <ul className="sw-sp-pack-points">
                    {pack.points.map((p) => (
                      <li key={p}>
                        <CheckCircleOutlined className="sw-sp-pack-icon" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="sw-sp-pack-btn" type="primary" block>
                    Get Quote
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* WHY SWACHIFY FARMING */}
        <section className="sw-sp-section sw-sp-why">
          <div className="sw-sp-why-inner">
            <h2 className="sw-sp-section-title">
              Why Buy Farming Products from Swachify?
            </h2>
            <p className="sw-sp-section-sub">
              We connect genuine farmers with homes, retailers and bulk buyers.
            </p>

            <div className="sw-sp-why-grid">
              <div className="sw-sp-why-item">
                <h3>Direct from Farms</h3>
                <p>
                  Products are procured directly from farmers and FPOs, reducing
                  middle men and giving better rates to both sides.
                </p>
              </div>
              <div className="sw-sp-why-item">
                <h3>Quality & Grading</h3>
                <p>
                  Proper sorting, cleaning and grading for grains and
                  vegetables – so you receive consistent quality every time.
                </p>
              </div>
              <div className="sw-sp-why-item">
                <h3>Flexible Quantities</h3>
                <p>
                  From small home packs to bulk bags and crates – choose the
                  quantity that matches your requirement.
                </p>
              </div>
              <div className="sw-sp-why-item">
                <h3>Single Point Ordering</h3>
                <p>
                  Place one order and manage vegetables, fruits, grains and eggs
                  from a single Swachify cart.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection selectedKey="Swachifyproducts" />
    </div>
  );
};

export default SwachifyProducts;
