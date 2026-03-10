import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";


import "./JustRide.css";


const { Option } = Select;



const services = [
  {
    name: "Metro Ticket",
    price: "$2.75",
    info: "3 tickets available nearby",
    icon: "🚇",
    km: "0.5 km",
    category: "commute",
  },
  {
    name: "Parcel",
    price: "From $5",
    info: "12 couriers nearby",
    icon: "📦",
    km: "Instant pick",
    category: "delivery",
  },
  {
    name: "Scooty",
    price: "$3.20",
    info: "8 available nearby",
    icon: "🛵",
    km: "1.2 km",
    category: "commute",
  },
  {
    name: "Bike",
    price: "$2.50",
    info: "15 available nearby",
    icon: "🏍️",
    km: "0.8 km",
    category: "commute",
  },
  {
    name: "Cab Non AC",
    price: "$8.00",
    info: "5 available nearby",
    icon: "🚕",
    km: "2.1 km",
    category: "commute",
  },
  {
    name: "Auto",
    price: "$4.50",
    info: "2 available nearby",
    icon: "🛺",
    km: "0.3 km",
    category: "commute",
  },
  {
    name: "Cab Premium",
    price: "$15.50",
    info: "4 available nearby",
    icon: "🚘",
    km: "1.5 km",
    category: "luxury",
  },
  {
    name: "Auto Seat Share",
    price: "$1.20",
    info: "Ready to go",
    icon: "👥",
    km: "0.2 km",
    category: "commute",
  },
  {
    name: "Bike Lite",
    price: "$0.90",
    info: "20+ available",
    icon: "🚲",
    km: "0.1 km",
    category: "commute",
  },
  {
    name: "Shared Auto",
    price: "$1.00",
    info: "Frequent availability",
    icon: "🧑‍🤝‍🧑",
    km: "Multiple",
    category: "commute",
  },
  {
    name: "Cab Priority",
    price: "$22.00",
    info: "1 available nearby",
    icon: "⭐",
    km: "3 mins",
    category: "luxury",
  },
  {
    name: "Travel",
    price: "Custom",
    info: "Inter-city bookings",
    icon: "✈️",
    km: "Plan trip",
    category: "luxury",
  },
];



const AllServices: React.FC = () => {
  const navigate = useNavigate(); 
  const [pickupType, setPickupType] = useState<"myself" | "others">("myself");
const [pickupValue, setPickupValue] = useState("");
const [dropValue, setDropValue] = useState("");
const [searchQuery, setSearchQuery] = useState("");
const [activeTab, setActiveTab] = useState("all");


const getCurrentLocation = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await res.json();

    setPickupValue(data.display_name || "My Location");
  });
};


useEffect(() => {
  if (pickupType === "myself") {
    getCurrentLocation();
  } else {
    setPickupValue("");
  }
}, [pickupType]);


const filteredServices = services.filter((service) => {
  const matchSearch = service.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  const matchCategory =
    activeTab === "all" ? true : service.category === activeTab;

  return matchSearch && matchCategory;
});








  return (
    <div className="sw-js-as-wrap">
  <Row justify="center">
   <Col xs={24} sm={24} md={20} lg={18} xl={16}>

      <Card className="sw-js-as-card">

       <div className="sw-js-as-header">
  <button
    className="sw-js-as-back-btn"
    onClick={() => navigate(-1)}
    aria-label="Go back"
  >
    <LeftOutlined />
  </button>

  <h2 className="sw-js-as-header-title">All Services</h2>
</div>



        {/* LOCATIONS */}

        <div className="sw-js-as-loc-row">
  <span className="sw-js-as-dot blue" />

  <Input
    className="sw-js-as-input"
    placeholder="Enter pickup location"
    value={pickupValue}
    onChange={(e) => setPickupValue(e.target.value)}
    disabled={pickupType === "myself"}
  />

  <Select
    value={pickupType}
    onChange={(val) => setPickupType(val)}
    className="sw-js-as-pickup-type"
  >
    <Option value="myself">Myself</Option>
    <Option value="others">Others</Option>
  </Select>
</div>



<div className="sw-js-as-loc-row">
  <span className="sw-js-as-dot green" />
  <Input
    className="sw-js-as-input"
    placeholder="Enter drop location"
    value={dropValue}
    onChange={(e) => setDropValue(e.target.value)}
  />
</div>

{/* SEARCH BAR */}
<Input
  placeholder="Search services..."
  className="sw-js-as-input"
  style={{ marginTop: "12px", marginBottom: "16px" }}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
/>



        {/* TABS */}
        <div className="sw-js-as-tabs">
  <button
    className={`sw-js-as-tab ${activeTab === "all" ? "active" : ""}`}
    onClick={() => setActiveTab("all")}
  >
    All Services
  </button>

  <button
    className={`sw-js-as-tab ${activeTab === "commute" ? "active" : ""}`}
    onClick={() => setActiveTab("commute")}
  >
    Commute
  </button>

  <button
    className={`sw-js-as-tab ${activeTab === "delivery" ? "active" : ""}`}
    onClick={() => setActiveTab("delivery")}
  >
    Delivery
  </button>

  <button
    className={`sw-js-as-tab ${activeTab === "luxury" ? "active" : ""}`}
    onClick={() => setActiveTab("luxury")}
  >
    Luxury
  </button>
</div>


      <div
  className="sw-js-as-title"
  style={{ display: "flex", justifyContent: "space-between" }}
>
  <span>AVAILABLE TRANSPORT & DELIVERY</span>

  <span
    style={{
      background: "#eef2ff",
      color: "#6366f1",
      padding: "2px 10px",
      borderRadius: "12px",
      fontWeight: "600",
    }}
  >
    {filteredServices.length}
  </span>
</div>

        {/* LIST */}
        <div className="sw-js-as-list">
          {filteredServices.map((s, i) => (
            <div key={i} className="sw-js-as-row">
              <div className="sw-js-as-left">
                <div className="sw-js-as-icon">{s.icon}</div>
                <div>
                  <strong className="sw-js-as-name">{s.name}</strong>
                  <p className="sw-js-as-sub">{s.info}</p>
                </div>
              </div>

              <div className="sw-js-as-right">
                <span className="sw-js-as-price">{s.price}</span>
                <span className="sw-js-as-km">{s.km}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
<div className="sw-js-as-cta-wrap">
  <button className="sw-js-as-cta-btn">
    Review Selection  <span className="sw-js-as-cta-arrow">→</span>
  </button>
</div>


      </Card>
    </Col>
  </Row>
</div>

  );
};

export default AllServices;
