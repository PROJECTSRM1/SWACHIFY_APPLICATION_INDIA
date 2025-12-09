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
// import "./Swachifyproducts.css";

// 🔹 NEW: import shared JSON (same as EducationPage)
import appData from "../../data/educationData.json";

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

// 🔹 NEW: icon map for JSON iconKey -> actual Ant icons
const iconMap: Record<string, React.ReactNode> = {
  apple: <AppleOutlined />,
  crown: <CrownOutlined />,
  cart: <ShoppingCartOutlined />,
  fire: <FireOutlined />,
};

// 🔹 NEW: safely read Swachify data from JSON
const swachifyProducts = (appData as any).swachifyProducts || {
  categories: [],
  comboPacks: [],
};

// 🔹 NEW: build categories array exactly like your old constant
const PRODUCT_CATEGORIES: ProductCategory[] =
  swachifyProducts.categories.map((cat: any): ProductCategory => {
    const { iconKey, ...rest } = cat;
    return {
      ...rest,
      icon: iconMap[iconKey] || <ShoppingCartOutlined />,
    };
  });

// 🔹 NEW: combo packs directly from JSON
const COMBO_PACKS: ComboPack[] = (swachifyProducts.comboPacks || []) as ComboPack[];

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
