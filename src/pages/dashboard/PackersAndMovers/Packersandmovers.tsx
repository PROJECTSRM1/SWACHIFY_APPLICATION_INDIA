// Packersandmovers.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Button,
  Drawer,
  Menu,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Checkbox,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Packersandmovers.css";
// images (update paths as needed)
import carRentalsImg from "../../../assets/passenger/Car Rentals.jpg";
import cargoForwardingImg from "../../../assets/passenger/Cargo forwarding.jpg";
import carpoolingImg from "../../../assets/passenger/carpooling.jpg";
import goodsDeliveryImg from "../../../assets/passenger/Goods Delivery.jpg";
import GoodsDelivery from "../../../assets/passenger/GoodsDElivery.jpg";
import hazardousHandlingImg from "../../../assets/passenger/Hazardous handling.jpg";
import intercityTransportImg from "../../../assets/passenger/Intercity Transport.jpg";
import shuttleImg from "../../../assets/passenger/shuttle.jpg";
import taxiImg from "../../../assets/passenger/taxi.jpg";
import taxiCabServiceImg from "../../../assets/passenger/taxiCabServiceImg.jpg";
import tempControlledImg from "../../../assets/passenger/Temperature controlled.jpg";
import truckRentalsImg from "../../../assets/passenger/Truck Rentals.jpg";

// <-- ADDED: cart + navigation imports -->
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const { Option } = Select;
const { TextArea } = Input;

/* helper placeholder */
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

/* Form schema typing */
type FormField =
  | {
      name: string;
      label: string;
      type: "text" | "textarea" | "select" | "date" | "number" | "checkbox";
      required?: boolean;
      options?: { label: string; value: any }[];
      placeholder?: string;
    };

type CardImage = {
  src: string;
  title: string;
  subtitle?: string;
  price?: string;
  included?: string[];
  formSchema?: FormField[]; // per-submodule form
};
type CardItem = {
  filename: string;
  title: string;
  subtitle: string;
  color?: string;
  images?: CardImage[];
};

/* DATA (same as before) */
const cardsData: CardItem[] = [
  {
    filename: taxiCabServiceImg,
    title: "Passenger Transport",
    subtitle: "Reliable taxi, cab, and shuttle services",
    color: "#2b2b2b",
    images: [
      {
        src: taxiImg,
        title: "Local Taxi",
        subtitle: "Short trips within city",
        price: "$25",
        included: ["Driver", "Fuel", "Basic Insurance"],
        formSchema: [
          { name: "pickup", label: "Pickup Address", type: "text", required: true, placeholder: "Pickup address" },
          { name: "dropoff", label: "Drop-off Address", type: "text", required: true, placeholder: "Drop-off address" },
          { name: "dateTime", label: "Pickup Date & Time", type: "date", required: true },
          { name: "passengers", label: "Passengers", type: "number", required: true },
          { name: "luggage", label: "Luggage Count", type: "number" },
          { name: "needChildSeat", label: "Need Child Seat", type: "checkbox" },
        ],
      },
      {
        src: carpoolingImg,
        title: "Carpooling",
        subtitle: "Shared ride options",
        price: "$15",
        included: ["Seats", "Route Shared", "Basic Insurance"],
        formSchema: [
          { name: "from", label: "From", type: "text", required: true },
          { name: "to", label: "To", type: "text", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "seatsNeeded", label: "Seats Needed", type: "number", required: true },
        ],
      },
      {
        src: shuttleImg,
        title: "Shuttle Service",
        subtitle: "Group & airport shuttles",
        price: "$40",
        included: ["Large Vehicle", "Driver", "Luggage Help"],
        formSchema: [
          { name: "pickupPoint", label: "Pickup Point", type: "text", required: true },
          { name: "dropPoint", label: "Drop Point", type: "text", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "groupSize", label: "Group Size", type: "number" },
        ],
      },
    ],
  },
  {
    filename: goodsDeliveryImg,
    title: "Logistics & Cargo",
    subtitle: "Complete goods delivery and cargo forwarding solutions",
    color: "#2d6cdf",
    images: [
      {
        src: GoodsDelivery,
        title: "Goods Delivery",
        subtitle: "Local goods pickup & delivery",
        price: "$60",
        included: ["Loading/Unloading", "Transport", "Basic Insurance"],
        formSchema: [
          { name: "pickupAddress", label: "Pickup Address", type: "text", required: true },
          { name: "deliveryAddress", label: "Delivery Address", type: "text", required: true },
          { name: "weightKg", label: "Weight (kg)", type: "number", required: true },
          { name: "fragile", label: "Contains Fragile Items", type: "checkbox" },
          { name: "serviceDate", label: "Preferred Date", type: "date" },
        ],
      },
      {
        src: intercityTransportImg,
        title: "Intercity Transport",
        subtitle: "Long-distance load transport",
        price: "$250",
        included: ["Transit Insurance", "Tracking", "Driver"],
        formSchema: [
          { name: "origin", label: "Origin City", type: "text", required: true },
          { name: "destination", label: "Destination City", type: "text", required: true },
          { name: "volume", label: "Volume (cbm)", type: "number" },
          { name: "preferredDate", label: "Preferred Date", type: "date" },
        ],
      },
      {
        src: cargoForwardingImg,
        title: "Cargo Forwarding",
        subtitle: "Freight forwarding support",
        price: "$400",
        included: ["Freight Docs", "Handling", "Insurance Options"],
        formSchema: [
          { name: "shipmentType", label: "Shipment Type", type: "select", required: true, options: [{ label: "Air", value: "air" }, { label: "Sea", value: "sea" }, { label: "Road", value: "road" }] },
          { name: "weight", label: "Weight (kg)", type: "number", required: true },
          { name: "dimensions", label: "Dimensions (LxWxH)", type: "text" },
          { name: "pickupDate", label: "Pickup Date", type: "date" },
        ],
      },
    ],
  },
  {
    filename: carRentalsImg,
    title: "Rental Services",
    subtitle: "Car, truck, and van rentals for all your needs",
    color: "#2aa7b8",
    images: [
      {
        src: carRentalsImg,
        title: "Car Rentals",
        subtitle: "Self-drive or chauffeur",
        price: "$70/day",
        included: ["Vehicle", "Basic Insurance"],
        formSchema: [
          { name: "rentalType", label: "Rental Type", type: "select", options: [{ label: "Self Drive", value: "self" }, { label: "With Driver", value: "driver" }] },
          { name: "startDate", label: "Start Date", type: "date", required: true },
          { name: "endDate", label: "End Date", type: "date", required: true },
          { name: "vehicleModel", label: "Preferred Model", type: "text" },
        ],
      },
      {
        src: truckRentalsImg,
        title: "Van/Truck Rentals",
        subtitle: "Small to medium truck options",
        price: "$120/day",
        included: ["Driver", "Fuel extra", "Loading Help"],
        formSchema: [
          { name: "pickupLocation", label: "Pickup Location", type: "text", required: true },
          { name: "dropLocation", label: "Drop Location", type: "text", required: true },
          { name: "rentalDays", label: "Rental Days", type: "number", required: true },
          { name: "loadWeight", label: "Load Weight-- (kg)", type: "number" },
        ],
      },
    ],
  },
  {
    filename: tempControlledImg,
    title: "Specialized Transport",
    subtitle: "Temperature-controlled and hazardous material handling",
    color: "#b85a2a",
    images: [
      {
        src: tempControlledImg,
        title: "Temperature Controlled Truck",
        subtitle: "Refrigerated transport",
        price: "$350",
        included: ["Temperature Control", "Driver", "Monitoring"],
        formSchema: [
          { name: "pickup", label: "Pickup Address", type: "text", required: true },
          { name: "delivery", label: "Delivery Address", type: "text", required: true },
          { name: "temperature", label: "Required Temperature (°C)", type: "number", required: true },
          { name: "weight", label: "Weight (kg)", type: "number" },
          { name: "date", label: "Preferred Date", type: "date" },
        ],
      },
      {
        src: hazardousHandlingImg,
        title: "Hazardous Handling",
        subtitle: "Certified hazardous goods handling",
        price: "$500",
        included: ["Special Packing", "Trained Staff", "Compliance Docs"],
        formSchema: [
          { name: "hazardType", label: "Hazard Type", type: "select", required: true, options: [{ label: "Chemical", value: "chemical" }, { label: "Battery", value: "battery" }, { label: "Other", value: "other" }] },
          { name: "netWeight", label: "Net Weight (kg)", type: "number", required: true },
          { name: "pickupDate", label: "Pickup Date", type: "date" },
          { name: "complianceDocs", label: "Attach docs (URL)", type: "text" },
        ],
      },
    ],
  },
];

const Packersandmovers: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [groupIndex, setGroupIndex] = useState<number | null>(null);
  const groupOverlayRef = useRef<HTMLDivElement | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CardImage | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [bookingFormsData, setBookingFormsData] = useState<Record<string, any>>({});
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [form] = Form.useForm();

  // Confirmation popup state (top)
  const [showConfirmTop, setShowConfirmTop] = useState(false);
  const [confirmTextTop, setConfirmTextTop] = useState("");

  // <-- ADDED: cart + navigate hooks (keeps your context API unchanged) -->
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // open group modal
  const openGroupModal = (idx: number) => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setGroupIndex(idx);
    document.body.style.overflow = "hidden";
    setTimeout(() => groupOverlayRef.current?.focus(), 50);
  };
  const closeGroupModal = () => {
    setGroupIndex(null);
    document.body.style.overflow = "";
    previouslyFocused.current?.focus();
  };

  // open booking form for submodule with groupIndex
  const openBookingForm = (img: CardImage, grpIndex: number) => {
    const key = `${grpIndex}-${img.title}`;
    setSelectedKey(key);
    setSelectedImage(img);
    // load saved data if exists
    const saved = bookingFormsData[key];
    if (saved) {
      form.setFieldsValue(saved);
    } else {
      // build defaults from the schema (empty or false)
      const defaults: Record<string, any> = {};
      (img.formSchema || []).forEach((f) => {
        if (f.type === "checkbox") defaults[f.name] = false;
        else defaults[f.name] = undefined;
      });
      // include metadata
      defaults.serviceGroup = cardsData[grpIndex].title;
      defaults.serviceTitle = img.title;
      defaults.servicePrice = img.price;
      form.setFieldsValue(defaults);
    }
    // show booking form (group overlay will be hidden by render condition)
    setBookingOpen(true);
  };

  // Close booking form and reset fields
  const closeBookingForm = () => {
    // reset visible form fields whenever the booking modal is closed
    try {
      form.resetFields();
    } catch (e) {
      // ignore if form not yet mounted
    }
    setBookingOpen(false);
    setSelectedImage(null);
    setSelectedKey(null);
  };

  // ESC / click-outside behavior
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (bookingOpen) closeBookingForm();
        else if (groupIndex != null) closeGroupModal();
      }
    }
    function onDocClick(e: MouseEvent) {
      // keep group overlay click-outside behavior only when booking form is NOT open
      if (groupIndex == null || bookingOpen) return;
      if (!groupOverlayRef.current) return;
      const inner = groupOverlayRef.current.querySelector(".pm-fullscreen-inner");
      if (inner && e.target instanceof Node && !inner.contains(e.target)) closeGroupModal();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [groupIndex, bookingOpen]);

  // submit - save per-submodule (but clear draft so next open is empty)
  const onFinish = (values: any) => {
    if (!selectedKey || !selectedImage) return;
    const payload = {
      ...values,
      serviceTitle: values.serviceTitle || selectedImage.title,
      servicePrice: values.servicePrice || selectedImage.price,
      savedAt: new Date().toISOString(),
    };

    // If you want to persist bookings (api/localStorage), do it here.
    // We intentionally REMOVE the draft from bookingFormsData so the form opens blank next time.
    setBookingFormsData((prev) => {
      const copy = { ...prev };
      if (copy[selectedKey]) delete copy[selectedKey];
      return copy;
    });

    console.log("Saved booking (transient) for", selectedKey, payload);

    // ---------- ADDED: build cart item and add to cart using your existing addToCart ----------
    const cartId = Date.now(); // unique id for this booking instance
    const parsedPrice = (() => {
      const p = String(payload.servicePrice || selectedImage.price || "0");
      const n = parseFloat(p.replace(/[^0-9.-]+/g, ""));
      return isNaN(n) ? 0 : n;
    })();

    const cartItem = {
      id: cartId,
      title: payload.serviceTitle,
      image: selectedImage.src || "",
      quantity: 1,
      price: String(payload.servicePrice || selectedImage.price || "0"),
      totalPrice: parsedPrice * 1,

      customerName: payload.customerName || "",
      deliveryType: payload.deliveryType || payload.rentalType || "",
      deliveryDate: payload.date || payload.serviceDate || payload.deliveryDate || "",
      contact: payload.contact || "",
      address: payload.address || "",
      instructions: payload.instructions || "",
    };

    try {
      addToCart(cartItem); // uses your existing CartContext API
    } catch (e) {
      console.warn("addToCart failed", e);
    }
    // ---------- end addToCart ----------

    // show animated confirmation at top
    setConfirmTextTop(`${payload.serviceTitle} booked`);
    setShowConfirmTop(true);

    // immediately clear form UI
    try {
      form.resetFields();
    } catch (e) {}

    // hide after 3 seconds
    window.setTimeout(() => setShowConfirmTop(false), 3000);

    // close form after 1.5s
    window.setTimeout(() => closeBookingForm(), 1500);

    // navigate to cart after a short delay so user sees confirmation
    window.setTimeout(() => navigate("/cart"), 400);
  };

  // helper to render a field given its schema
  function renderField(field: FormField) {
    const name = field.name;
    const label = field.label;
    const rules = field.required ? [{ required: true, message: `${label} is required` }] : undefined;
    switch (field.type) {
      case "text":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <Input placeholder={field.placeholder || label} />
          </Form.Item>
        );
      case "textarea":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <TextArea placeholder={field.placeholder || label} rows={3} />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <Select placeholder={field.placeholder || label} getPopupContainer={() => document.body}>
              {(field.options || []).map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <DatePicker style={{ width: "100%" }} getPopupContainer={() => document.body} />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item name={name} label={label} rules={rules}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item name={name} valuePropName="checked" style={{ marginBottom: 8 }}>
            <Checkbox>{label}</Checkbox>
          </Form.Item>
        );
      default:
        return null;
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="pm-hero" aria-hidden={false}>
        <div className="pm-container pm-hero-inner">
          <div className="pm-hero-left">
            <h2 className="pm-hero-title">Packers &amp; Movers / Transport</h2>
            <p className="pm-hero-sub">{cardsData.length} services available</p>
          </div>
          <div className="pm-hero-right" />
        </div>
      </section>

      {/* CARDS GRID */}
      <main className="pm-main" role="main">
        <div className="pm-container pm-cards-wrapper">
          <Row gutter={[20, 20]} justify="center">
            {cardsData.map((c, idx) => (
              <Col key={idx} xs={24} sm={12} md={8} lg={6} style={{ display: "flex" }}>
                <Card
                  hoverable
                  className="pm-card"
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                  cover={
                    <img
                      src={c.filename}
                      alt={c.title}
                      className="pm-card-image"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).onerror = null;
                        (e.currentTarget as HTMLImageElement).src = makePlaceholder(c.title, c.color || "#cfcfcf");
                      }}
                    />
                  }
                >
                  <div className="pm-card-body">
                    <div>
                      <h3 className="pm-card-title">{c.title}</h3>
                      <p className="pm-card-sub">{c.subtitle}</p>
                    </div>
                    <div className="pm-card-footer">
                      <div className="pm-price" />
                      <Button className="pm-view-btn" size="small" onClick={() => openGroupModal(idx)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </main>

      {/* GROUP modal */}
      {groupIndex != null && !bookingOpen && (
        <div className="pm-fullscreen-overlay" role="dialog" aria-modal="true" ref={groupOverlayRef} tabIndex={-1}>
          <div className="pm-fullscreen-inner" role="document">
            <header className="pm-fullscreen-header">
              <h2 id="pm-fullscreen-title">{cardsData[groupIndex].title}</h2>
              <button className="pm-fullscreen-close" aria-label="Close" onClick={closeGroupModal}>
                <CloseOutlined />
              </button>
            </header>
            <div className="pm-fullscreen-body">
              <Row gutter={[20, 20]} justify="center" className="pm-fullscreen-images">
                {((cardsData[groupIndex].images && cardsData[groupIndex].images!.length > 0
                  ? cardsData[groupIndex].images!
                  : [{ src: cardsData[groupIndex].filename, title: cardsData[groupIndex].title }]) as CardImage[]).map((item, i) => {
                  const ph = makePlaceholder(item.title, cardsData[groupIndex].color);
                  return (
                    <Col key={i} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        hoverable
                        className="pm-fullscreen-card"
                        cover={
                          <img
                            src={item.src}
                            alt={item.title}
                            className="pm-fullscreen-card-image"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).onerror = null;
                              (e.currentTarget as HTMLImageElement).src = ph;
                            }}
                            onClick={() => openBookingForm(item, groupIndex)}
                            style={{ cursor: "pointer" }}
                          />
                        }
                      >
                        <div className="pm-fullscreen-card-body">
                          <div className="pm-fullscreen-card-title">{item.title}</div>
                          <div className="pm-fullscreen-card-sub">{item.subtitle}</div>
                          <div style={{ marginTop: 8, color: "#2b6cff", fontWeight: 700 }}>{item.price}</div>

                          <div className="pm-fullscreen-card-actions">
                            <Button className="pm-book-btn" onClick={() => openBookingForm(item, groupIndex)} size="middle" type="default">
                              Book Now
                            </Button>
                          </div>
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

      {/* Booking form modal */}
      {bookingOpen && selectedImage && (
        <div className="pm-form-overlay" role="dialog" aria-modal="true">
          <div className="pm-form-inner" role="region" aria-label={`${selectedImage.title} booking form`}>
            <header className="pm-form-header">
              <h3>{selectedImage.title}</h3>
              <button className="pm-fullscreen-close" onClick={closeBookingForm}>
                <CloseOutlined />
              </button>
            </header>
            <div className="pm-form-body">
              <div className="pm-form-left">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).onerror = null;
                    (e.currentTarget as HTMLImageElement).src = makePlaceholder(selectedImage.title);
                  }}
                  className="pm-form-image"
                />
                <p className="pm-form-desc">{selectedImage.subtitle}</p>
                <div className="pm-included">
                  <h4>What's Included</h4>
                  <ul>
                    {(selectedImage.included || []).map((inc, i) => (
                      <li key={i}>• {inc}</li>
                    ))}
                  </ul>
                </div>
                <div className="pm-price-box">
                  <div className="pm-price-label">Service Price</div>
                  <div className="pm-price-value">{selectedImage.price}</div>
                </div>
              </div>

              <div className="pm-form-right">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  {/* metadata */}
                  <Form.Item name="serviceGroup" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="serviceTitle" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="servicePrice" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>

                  {/* fields */}
                  {(selectedImage.formSchema || []).map((f) => (
                    <div key={f.name}>{renderField(f)}</div>
                  ))}

                  {/* actions */}
                  <div className="pm-form-actions">
                    <Button onClick={closeBookingForm} style={{ marginRight: 12 }}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className="pm-addcart-btn">
                      <ShoppingCartOutlined style={{ marginRight: 8 }} /> Book Service
                    </Button>
                  </div>
                </Form>
              </div>
            </div>

            {/* TOP confirmation popup */}
            <div
              role="status"
              aria-live="polite"
              aria-hidden={!showConfirmTop}
              className={`pm-confirm-top ${showConfirmTop ? "visible" : ""}`}
              onClick={() => navigate("/cart")} // <-- ADDED: click goes to cart
              style={{ cursor: "pointer" }}
            >
              <div className="pm-confirm-top-inner">
                <div className="pm-confirm-top-icon" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <circle cx="12" cy="12" r="12" fill="#14B878" />
                    <path d="M7 12.2L10 15.2L17 8.2" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="pm-confirm-top-text">{confirmTextTop}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
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
