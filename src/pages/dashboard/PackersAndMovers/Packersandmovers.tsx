// src/pages/whatever/Packersandmovers.tsx
import React, { useEffect, useRef, useState } from "react";
import { Row, Col,  Button, Drawer, Menu, Card } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
 // MenuOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Packersandmovers.css";
/**
 * IMPORTANT:
 * The imports below match the filenames shown in your VSCode screenshot,
 * located at: src/assets/passenger/
 *
 * If any import fails, double-check file names / casing and update accordingly.
 */
// Passenger images (you showed these in the screenshot)
import carRentalsImg from "../../../assets/passenger/Car Rentals.jpg";
import cargoForwardingImg from "../../../assets/passenger/Cargo forwarding.jpg";
import carpoolingImg from "../../../assets/passenger/carpooling.jpg";
import goodsDeliveryImg from "../../../assets/passenger/Goods Delivery.jpg";
import hazardousHandlingImg from "../../../assets/passenger/Hazardous handling.jpg";
import intercityTransportImg from "../../../assets/passenger/Intercity Transport.jpg";
import shuttleImg from "../../../assets/passenger/shuttle.jpg";
import taxiImg from "../../../assets/passenger/taxi.jpg";
import taxiCabServiceImg from "../../../assets/passenger/taxiCabServiceImg.jpg";
import tempControlledImg from "../../../assets/passenger/Temperature controlled.jpg";
import truckRentalsImg from "../../../assets/passenger/Truck Rentals.jpg";
/* Utility: make SVG placeholder (fallback) */
function makePlaceholder(text: string, bg = "#cfcfcf") {
  const w = 1000;
  const h = 600;
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <rect width='100%' height='100%' fill='${bg}' rx='8' />
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='Arial, Helvetica, sans-serif' font-size='32' fill='#fff' opacity='0.95'>
        ${text}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
type CardItem = {
  filename: string;
  title: string;
  subtitle: string;
  color?: string;
  images?: string[]; // images to show inside the modal
};
/* Build dataset using the imported images */
const cardsData: CardItem[] = [
  {
    // Passenger Transport group
    filename: taxiCabServiceImg,
    title: "Passenger Transport",
    subtitle: "Reliable taxi, cab, and shuttle services",
    color: "#2b2b2b",
    images: [taxiImg, carpoolingImg, shuttleImg],
  },
  {
    // Logistics & Cargo group
    filename: goodsDeliveryImg,
    title: "Logistics & Cargo",
    subtitle: "Complete goods delivery and cargo forwarding solutions",
    color: "#2d6cdf",
    images: [goodsDeliveryImg, intercityTransportImg, cargoForwardingImg],
  },
  {
    // Rental Services group
    filename: carRentalsImg,
    title: "Rental Services",
    subtitle: "Car, truck, and van rentals for all your needs",
    color: "#2aa7b8",
    images: [carRentalsImg, truckRentalsImg, taxiImg],
  },
  {
    // Specialized Transport group
    filename: tempControlledImg,
    title: "Specialized Transport",
    subtitle: "Temperature-controlled and hazardous material handling",
    color: "#b85a2a",
    images: [tempControlledImg, hazardousHandlingImg],
  },
];
const Packersandmovers: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  // Open full-screen modal for a specific card group
  const openModal = (idx: number) => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setModalIndex(idx);
    document.body.style.overflow = "hidden";
    setTimeout(() => overlayRef.current?.focus(), 50);
  };
  const closeModal = () => {
    setModalIndex(null);
    document.body.style.overflow = "";
    previouslyFocused.current?.focus();
  };
  // close on ESC or click outside
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    function onDocClick(e: MouseEvent) {
      if (!overlayRef.current || modalIndex == null) return;
      const inner = overlayRef.current.querySelector(".pm-fullscreen-inner");
      if (inner && e.target instanceof Node && !inner.contains(e.target)) {
        closeModal();
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [modalIndex]);
  return (
    <>
      {/* NAVBAR REMOVED - keeping everything else unchanged */}

      {/* HERO */}
      <section className="pm-hero" aria-hidden={false}>
        <div className="pm-container pm-hero-inner">
          <div className="pm-hero-left">
            <h2 className="pm-hero-title">Packers &amp; Movers / Transport</h2>
            <p className="pm-hero-sub">{cardsData.length} services available</p>
          </div>
          <div className="pm-hero-right">
            <button className="pm-hero-expand" aria-label="expand">
              <DownOutlined />
            </button>
          </div>
        </div>
      </section>
      {/* CARDS GRID */}
      <main className="pm-main" role="main">
        <div className="pm-container pm-cards-wrapper">
          <Row gutter={[24, 24]} justify="center">
            {cardsData.map((c, idx) => {
              return (
                <Col key={idx} xs={24} sm={12} md={12} lg={6}>
                  <Card
                    hoverable
                    className="pm-card"
                    cover={
                      <img
                        src={c.filename}
                        alt={c.title}
                        className="pm-card-image"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).onerror = null;
                          (e.currentTarget as HTMLImageElement).src = makePlaceholder(
                            c.title,
                            c.color || "#cfcfcf"
                          );
                        }}
                      />
                    }
                    role="article"
                  >
                    <div className="pm-card-body">
                      <h3 className="pm-card-title">{c.title}</h3>
                      <p className="pm-card-sub">{c.subtitle}</p>
                      <div className="pm-card-footer">
                        <span className="pm-price" />
                        {/* ONLY this button opens the full-screen modal */}
                        <Button
                          className="pm-view-btn"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(idx);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </main>
      {/* FULL-SCREEN MODAL (shows images for selected group) */}
      {modalIndex != null && (
        <div
          className="pm-fullscreen-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pm-fullscreen-title"
          ref={overlayRef}
          tabIndex={-1}
        >
          <div className="pm-fullscreen-inner" role="document">
            <header className="pm-fullscreen-header">
              <h2 id="pm-fullscreen-title">{cardsData[modalIndex].title}</h2>
              <button className="pm-fullscreen-close" aria-label="Close" onClick={closeModal}>
                <CloseOutlined />
              </button>
            </header>
            <div className="pm-fullscreen-body">
              <Row gutter={[20, 20]} justify="center" className="pm-fullscreen-images">
                {(cardsData[modalIndex].images && cardsData[modalIndex].images!.length > 0
                  ? cardsData[modalIndex].images!
                  : [cardsData[modalIndex].filename]
                ).map((img, i) => {
                  const ph = makePlaceholder(`${cardsData[modalIndex].title} ${i + 1}`, cardsData[modalIndex].color);
                  return (
                    <Col key={i} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        hoverable
                        className="pm-fullscreen-card"
                        cover={
                          <img
                            src={img}
                            alt={`${cardsData[modalIndex].title} ${i + 1}`}
                            className="pm-fullscreen-card-image"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).onerror = null;
                              (e.currentTarget as HTMLImageElement).src = ph;
                            }}
                          />
                        }
                      >
                        <div className="pm-fullscreen-card-body">
                          <div className="pm-fullscreen-card-title">{`${cardsData[modalIndex].title} ${i + 1}`}</div>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      )}
      {/* Drawer for mobile menu (left in place; it can still be triggered if you wire a button elsewhere) */}
      <Drawer placement="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Menu mode="vertical" selectable={false}>
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            Cart
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};
export default Packersandmovers;