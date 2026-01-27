// // src/pages/landing/LandingPackers.tsx
// import React, { useState } from "react";
// import CommonHeader from "../../pages/landing/Header";
// import "../../index.css";
// import FooterSection from "../../pages/landing/FooterSection";
// import "../../pages/landing/FooterSection.css";
// import {
//   Card,
//   Button,
//   Form,
//   Input,
//   Modal,
//   Tabs,
//   Checkbox,
//   Row,
//   Col,
// } from "antd";
// import {
//   CheckCircleOutlined,
//   TruckOutlined,
//   SafetyCertificateOutlined,
//   DollarOutlined,
//   UserOutlined,
//   ClockCircleOutlined,
//   MailOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// // === IMAGE IMPORTS ===
// import heroPackers from "../../assets/landingimages/Packers.jpg";
// import packingServicesImg from "../../assets/landingimages/PackingServices .jpg";
// import localandlongdistance from "../../assets/landingimages/localandlongdistance.jpg";
// import residentialMovingImg from "../../assets/landingimages/residential-moving.jpg";
// import officeRelocationImg from "../../assets/landingimages/office-relocation.jpg";
// import vehicleTransportImg from "../../assets/landingimages/vehicle-transport.jpg";
// import Loadingtransport from "../../assets/landingimages/Loadingtransport.jpg";
// import insurance from "../../assets/landingimages/insurance.jpeg";
// // =====================

// // 🔹 JSON CONFIG IMPORT
// import educationData from "../../data/educationData.json";

// declare global {
//   interface Window {
//     openAuthModal?: (tab?: "login" | "register") => void;
//     closeAuthModal?: () => void;
//   }
// }

// const { TabPane } = Tabs;

// // 🔹 Types for config
// type PackersHeroConfig = {
//   title: string;
//   subtitle: string;
//   primaryButtonText: string;
//   secondaryButtonText: string;
//   backgroundImageKey: string;
// };

// type PackersServiceConfig = {
//   id: number;
//   imageKey: string;
//   iconKey: string;
//   title: string;
//   desc: string;
// };

// type PackersTypeConfig = {
//   id: number;
//   title: string;
//   price: string;
//   imageKey: string;
//   features: string[];
// };

// type PackersReasonConfig = {
//   iconKey: string;
//   title: string;
//   desc: string;
// };

// // 🔹 Hero background map
// const packersHeroBgMap: Record<string, string> = {
//   packersHero: heroPackers,
// };

// // 🔹 Image maps
// const packersImageMap: Record<string, string> = {
//   packingServices: packingServicesImg,
//   loadingTransport: Loadingtransport,
//   localLongDistance: localandlongdistance,
//   insurance: insurance,
//   residentialMoving: residentialMovingImg,
//   officeRelocation: officeRelocationImg,
//   vehicleTransport: vehicleTransportImg,
// };

// // 🔹 Icon maps (keep same colors & styles as your original UI)
// const packersServiceIconMap: Record<string, React.ReactNode> = {
//   checkCircle: <CheckCircleOutlined style={{ fontSize: 30, color: "#00aa33" }} />,
//   dollar: <DollarOutlined style={{ fontSize: 30, color: "#8b00ff" }} />,
//   truck: <TruckOutlined style={{ fontSize: 30, color: "#1677ff" }} />,
//   safety: (
//     <SafetyCertificateOutlined style={{ fontSize: 30, color: "#ff7a00" }} />
//   ),
// };

// const packersReasonIconMap: Record<string, React.ReactNode> = {
//   user: <UserOutlined style={{ fontSize: 30, color: "#00aa33" }} />,
//   clock: <ClockCircleOutlined style={{ fontSize: 30, color: "#1677ff" }} />,
//   safety: (
//     <SafetyCertificateOutlined style={{ fontSize: 30, color: "#ff7a00" }} />
//   ),
// };

// // 🔹 Read data from JSON with fallbacks
// const packersHero: PackersHeroConfig = (educationData as any).packersHero || {
//   title: "Stress-Free Relocation Services",
//   subtitle: "From packing to delivery, we make your move effortless.",
//   primaryButtonText: "Book Now",
//   secondaryButtonText: "Get Quote",
//   backgroundImageKey: "packersHero",
// };

// const heroBackgroundImage =
//   packersHeroBgMap[packersHero.backgroundImageKey] || heroPackers;

// const packersServicesConfig: PackersServiceConfig[] =
//   ((educationData as any).packersServices as PackersServiceConfig[]) || [];

// const services = packersServicesConfig.map((s) => ({
//   img: packersImageMap[s.imageKey] || packingServicesImg,
//   icon: packersServiceIconMap[s.iconKey] || null,
//   title: s.title,
//   desc: s.desc,
// }));

// const packersTypesConfig: PackersTypeConfig[] =
//   ((educationData as any).packersTypes as PackersTypeConfig[]) || [];

// const typesOfServices = packersTypesConfig.map((t) => ({
//   title: t.title,
//   price: t.price,
//   image: packersImageMap[t.imageKey] || residentialMovingImg,
//   features: t.features,
// }));

// const packersReasonsConfig: PackersReasonConfig[] =
//   ((educationData as any).packersReasons as PackersReasonConfig[]) || [];

// const reasons = packersReasonsConfig.map((r) => ({
//   icon: packersReasonIconMap[r.iconKey] || null,
//   title: r.title,
//   desc: r.desc,
// }));

// const LandingPackers: React.FC = () => {
//   const [authVisible, setAuthVisible] = useState(false);
//   const [loginForm] = Form.useForm();
//   const [registerForm] = Form.useForm();
//   const navigate = useNavigate();

//   const handleLogin = (values: any) => {
//     console.log("Login:", values);
//     setAuthVisible(false);
//     navigate("/app/dashboard");
//   };

//   const handleRegister = (values: any) => {
//     console.log("Register:", values);
//     setAuthVisible(false);
//     navigate("/app/dashboard");
//   };

//   const AuthModal = () => (
//     <Modal
//       open={authVisible}
//       onCancel={() => setAuthVisible(false)}
//       footer={null}
//       centered
//       width={550}
//       className="sw-lpm-classname-auth-modal"
//     >
//       <Tabs defaultActiveKey="login" centered>
//         <TabPane tab="Login" key="login">
//           <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
//             <Form.Item
//               label="Email / Phone"
//               name="identifier"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="john@example.com" />
//             </Form.Item>
//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true }]}
//             >
//               <Input.Password placeholder="Password" />
//             </Form.Item>
//             <Form.Item name="remember" valuePropName="checked">
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Login
//             </Button>
//           </Form>
//         </TabPane>

//         <TabPane tab="Register" key="register">
//           <Form form={registerForm} layout="vertical" onFinish={handleRegister}>
//             <Form.Item
//               label="Full Name"
//               name="fullName"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="John Doe" />
//             </Form.Item>
//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[{ required: true, type: "email" }]}
//             >
//               <Input placeholder="john@example.com" />
//             </Form.Item>
//             <Form.Item
//               label="Phone"
//               name="phone"
//               rules={[{ required: true }]}
//             >
//               <Input placeholder="+1 555 123 4567" />
//             </Form.Item>
//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true }]}
//             >
//               <Input.Password placeholder="Password" />
//             </Form.Item>
//             <Form.Item
//               label="Confirm Password"
//               name="confirm"
//               dependencies={["password"]}
//               rules={[
//                 { required: true },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     return !value || getFieldValue("password") === value
//                       ? Promise.resolve()
//                       : Promise.reject("Passwords do not match");
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password placeholder="Confirm Password" />
//             </Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Register
//             </Button>
//           </Form>
//         </TabPane>
//       </Tabs>
//     </Modal>
//   );

//   const handleRequestQuoteSubmit = (values: any) => {
//     if (typeof window !== "undefined" && (window as any).openAuthModal) {
//       (window as any).openAuthModal("register");
//     } else {
//       setAuthVisible(true);
//     }
//     console.log("Request Quote submitted (redirecting to signup):", values);
//   };

//   return (
//     <div className="sw-lpm-classname-packers-container">
//       <CommonHeader selectedKey="LandingPackers" />

//       <AuthModal />



      





//       {/* HERO SECTION */}
//       {/* <section
//         className="sw-lpm-classname-packes-hero"
//         style={{ backgroundImage: `url(${heroBackgroundImage})` }}
//       >
//         <div className="sw-lpm-classname-hero-overlay">
//           <h1>{packersHero.title}</h1>
//           <p>{packersHero.subtitle}</p>

//           <div className="sw-lpm-classname-hero-actions">
//             <Button
//               type="primary"
//               size="large"
//               onClick={() => {
//                 if (
//                   typeof window !== "undefined" &&
//                   (window as any).openAuthModal
//                 ) {
//                   (window as any).openAuthModal("register");
//                 } else {
//                   setAuthVisible(true);
//                 }
//               }}
//             >
//               {packersHero.primaryButtonText}
//             </Button>

//             <Button
//               size="large"
//               onClick={() => {
//                 if (
//                   typeof window !== "undefined" &&
//                   (window as any).openAuthModal
//                 ) {
//                   (window as any).openAuthModal("register");
//                 } else {
//                   setAuthVisible(true);
//                 }
//               }}
//             >
//               {packersHero.secondaryButtonText}
//             </Button>
//           </div>
//         </div>
//       </section> */}

//       {/* SERVICES */}
//       {/* <section className="sw-lpm-classname-packes-services">
//         <h2>Our Services</h2>
//         <div className="sw-lpm-classname-services-row">
//           {services.map((s, i) => (
//             <Card key={i} className="sw-lpm-classname-packes-card">
//               <img
//                 src={s.img}
//                 className="sw-lpm-classname-service-img"
//                 alt={s.title}
//               />
//               <div className="sw-lpm-classname-packes-icon">{s.icon}</div>
//               <h3>{s.title}</h3>
//               <p>{s.desc}</p>
//             </Card>
//           ))}
//         </div>
//       </section> */}

//       {/* TYPES OF SERVICES */}
//       {/* <section className="sw-lpm-classname-types-of-services">
//         <h2>Types of Moving Services</h2>
//         <div className="sw-lpm-classname-types-row">
//           {typesOfServices.map((t, i) => (
//             <Card
//               key={i}
//               className="sw-lpm-classname-service-card"
//               cover={
//                 <img
//                   src={t.image}
//                   className="sw-lpm-classname-service-img"
//                   alt={t.title}
//                 />
//               }
//             >
//               <h3>{t.title}</h3>
//               <p>Starting at {t.price}</p>
//               <ul>
//                 {t.features.map((f, idx) => (
//                   <li key={idx}>{f}</li>
//                 ))}
//               </ul>
//               <Button
//                 type="primary"
//                 onClick={() => {
//                   if (
//                     typeof window !== "undefined" &&
//                     (window as any).openAuthModal
//                   ) {
//                     (window as any).openAuthModal("register");
//                   } else {
//                     setAuthVisible(true);
//                   }
//                 }}
//               >
//                 Get Quote
//               </Button>
//             </Card>
//           ))}
//         </div>
//       </section> */}

//       {/* REQUEST QUOTE */}
//       {/* <section className="sw-lpm-classname-request-quote">
//         <h2>Request a Moving Quote</h2>

//         <div className="sw-lpm-classname-quote-form-wrap">
//           <div className="sw-lpm-classname-quote-form-container">
//             <Form
//               layout="vertical"
//               className="sw-lpm-classname-quote-form"
//               onFinish={handleRequestQuoteSubmit}
//             >
//               <Row gutter={[16, 12]}>
//                 <Col xs={24} md={12}>
//                   <Form.Item
//                     label="Full Name"
//                     name="fullName"
//                     rules={[{ required: true }]}
//                   >
//                     <Input placeholder="Your full name" />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24} md={12}>
//                   <Form.Item
//                     label="Email"
//                     name="email"
//                     rules={[{ required: true, type: "email" }]}
//                   >
//                     <Input
//                       placeholder="you@example.com"
//                       prefix={<MailOutlined />}
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24} md={12}>
//                   <Form.Item
//                     label="Phone Number"
//                     name="phoneNumber"
//                     rules={[{ required: true }]}
//                   >
//                     <Input placeholder="+1 555 123 4567" />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24} md={12}>
//                   <Form.Item label="Moving Date (optional)" name="moveDate">
//                     <Input placeholder="Preferred moving date" />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24}>
//                   <Form.Item
//                     label="Pickup Address"
//                     name="pickup"
//                     rules={[{ required: true }]}
//                   >
//                     <Input placeholder="Pickup address" />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24}>
//                   <Form.Item
//                     label="Delivery Address"
//                     name="delivery"
//                     rules={[{ required: true }]}
//                   >
//                     <Input placeholder="Delivery address" />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24}>
//                   <Form.Item label="Additional Details" name="details">
//                     <Input.TextArea
//                       rows={4}
//                       placeholder="Number of rooms, special items, stairs, parking, etc."
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24}>
//                   <Form.Item>
//                     <Button
//                       type="primary"
//                       htmlType="submit"
//                       block
//                       className="sw-lpm-classname-quote-submit-btn"
//                     >
//                       Submit
//                     </Button>
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </div>
//       </section> */}

//       {/* WHY CHOOSE US */}
//       {/* <section className="sw-lpm-classname-why-choose-us">
//         <h2>Why Choose Us</h2>
//         <div className="sw-lpm-classname-choose-us-wrapper">
//           {reasons.map((r, i) => (
//             <div key={i} className="sw-lpm-classname-choose-us-card">
//               <div className="sw-lpm-classname-choose-us-icon">{r.icon}</div>
//               <h3>{r.title}</h3>
//               <p>{r.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section> */}

//       {/* <FooterSection selectedKey="LandingPackers" /> */}
//     </div>
//   );
// };

// export default LandingPackers;



import React, { useState, useEffect } from "react";
import { Input, Layout, } from "antd";
import { AimOutlined, SearchOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import bike from "../../assets/JustRide/bike.jpg";
import scooty from "../../assets/JustRide/scooty.jpg";
import auto from "../../assets/JustRide/auto.jpg";
import car from "../../assets/JustRide/car.png";
import {
  HomeOutlined,
  BankOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

  
import CommonHeader from "./Header";
import { useNavigate } from "react-router-dom";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { Sider, Content } = Layout;

/* MAP FLYTO */
const SwJrFlyTo = ({ position }: any) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], 15);
  }, [position, map]);
  return null;
};

/* ROUTING */
const SwJrRouting = ({ pickup, destination }: any) => {
  const map = useMap();
  useEffect(() => {
    if (!pickup || !destination) return;
    const control = (L as any).Routing.control({
      waypoints: [L.latLng(pickup.lat, pickup.lng), L.latLng(destination.lat, destination.lng)],
      lineOptions: { styles: [{ color: "#2563eb", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () =>{
       map.removeControl(control);
    }
  }, [pickup, destination, map]);
  return null;
};

const JustRidePanel: React.FC = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [pickupText, setPickupText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>([]);
  const [availableRides, setAvailableRides] = useState<any[]>([]);
  // const [activeMode, setActiveMode] = useState<"all" | "ride" | "parcel" | "metro">("ride");
  const [recentPlaces, setRecentPlaces] = useState<any[]>([]);
  const [justSelectedPickup, setJustSelectedPickup] = useState(false);
const [justSelectedDestination, setJustSelectedDestination] = useState(false);


  const recentStaticPlaces = [
  {
    label: "Home",
    address: "DLF Phase 3, Gurgaon",
    icon: <HomeOutlined style={{ color: "#2563eb" }} />,
  },
  {
    label: "Office",
    address: "Cyber Hub, Gurgaon",
    icon: <BankOutlined style={{ color: "#16a34a" }} />,
  },
  {
    label: "Gym",
    address: "Sector 56, Gurgaon",
    icon: <ThunderboltOutlined style={{ color: "#f59e0b" }} />,
  },
  {
    label: "Railway Station",
    address: "Gurgaon Railway Station",
    icon: <EnvironmentOutlined style={{ color: "#dc2626" }} />,
  },
];

// LandingPackersPage.tsx








  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPickup({ lat, lng });

      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      setPickupText(data.display_name || "My Location");
      setPickupSuggestions([]);
    });
  };


//   const fetchPickupSuggestions = async (query: string) => {
//   if (!query) {
//     setPickupSuggestions([]);
//     return;
//   }
//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
//       query
//     )}&limit=10&countrycodes=IN`
//   );
//   const data = await res.json();
//   setPickupSuggestions(data);
// };

// const fetchDestinationSuggestions = async (query: string) => {
//   if (!query) {
//     setDestinationSuggestions([]);
//     return;
//   }
//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
//       query
//     )}&limit=10&countrycodes=IN`
//   );
//   const data = await res.json();
//   setDestinationSuggestions(data);
// };



// PICKUP
useEffect(() => {
  if (!pickupText || justSelectedPickup) return;

  const controller = new AbortController();
  const query = pickupText;

  const timer = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}&limit=10&countrycodes=IN`,
        { signal: controller.signal }
      );
      const data = await res.json();
      if (query === pickupText) setPickupSuggestions(data);
    } catch (err: any) {
      if (err.name !== "AbortError") console.error(err);
    }
  }, 300);

  return () => {
    clearTimeout(timer);
    controller.abort();
  };
}, [pickupText, justSelectedPickup]);












// DESTINATION
useEffect(() => {
  if (!destinationText || justSelectedDestination) return;

  const controller = new AbortController();
  const query = destinationText;

  const timer = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}&limit=10&countrycodes=IN`,
        { signal: controller.signal }
      );
      const data = await res.json();
      if (query === destinationText) setDestinationSuggestions(data);
    } catch (err: any) {
      if (err.name !== "AbortError") console.error(err);
    }
  }, 300);

  return () => {
    clearTimeout(timer);
    controller.abort();
  };
}, [destinationText, justSelectedDestination]);




const rideTypes = [
  { type: "Bike", icon: bike },
  { type: "Scooty", icon: scooty },
  { type: "Auto", icon: auto },
  { type: "Cab Non-AC", icon: car },
  { type: "Car", icon: car },
];

const generateNearbyRides = (pickup: any, count = 6) => {
  if (!pickup) return [];

  const rides = [];
  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) / 500;
    const lngOffset = (Math.random() - 0.5) / 500;

    const randomRide = rideTypes[Math.floor(Math.random() * rideTypes.length)];

    rides.push({
      id: i,
      type: randomRide.type,
      icon: randomRide.icon,
      lat: pickup.lat + latOffset,
      lng: pickup.lng + lngOffset,
      price: (Math.random() * 60 + 30).toFixed(0),
    });
  }

  return rides;
};


useEffect(() => {
  if (pickup && destination) {
    const rides = generateNearbyRides(pickup, 6);
    setAvailableRides(rides);
  } else {
    setAvailableRides([]);
  }
}, [pickup, destination]);







  return (
    <div className="sw-jr-container full-width" >

       <CommonHeader selectedKey="LandingPackers" />



      <Layout className="sw-jr-layout">
        <Sider width={420} className="sw-jr-left-panel">
<h1 className="sw-jr-title">
  Just Ride

</h1>



          <div className="sw-jr-modes">
  <div
    className={`sw-jr-mode-pill ${location.pathname === "/bookride" ? "sw-jr-mode-active" : ""}`}
    onClick={() => navigate("/bookride")}
  >
    Ride
  </div>

  <div
    className={`sw-jr-mode-pill ${location.pathname === "/swiftparcel" ? "sw-jr-mode-active" : ""}`}
    onClick={() => navigate("/swiftparcel", { state: { redirectTo: "/LandingPackers" } })}
  >
    Parcel
  </div>

  <div
    className={`sw-jr-mode-pill ${location.pathname === "/metrohub" ? "sw-jr-mode-active" : ""}`}
    onClick={() => navigate("/metrohub")}
  >
    Metro
  </div>

  <div
    className={`sw-jr-mode-pill ${location.pathname === "/allservices" ? "sw-jr-mode-active" : ""}`}
    onClick={() => navigate("/allservices")}
  >
    All
  </div>
</div>





          {/* Pickup Input */}

          <div className="sw-jr-location-block" style={{ position: "relative", marginBottom: 12 }}>
  <label className="sw-jr-label">Pickup location</label>
  <Input
    size="large"
    placeholder="Enter pickup location"
    value={pickupText}
    onChange={(e) => {
  if (justSelectedPickup) {
    setJustSelectedPickup(false); // reset flag, ignore this change
    return;
  }
  setPickupText(e.target.value);
  setPickupSuggestions([]); // clear previous suggestions
}}
 
    prefix={<SearchOutlined />}
    suffix={
      <AimOutlined
        style={{ cursor: "pointer" }}
        onClick={handleUseMyLocation}
      />
    }
  />

  {pickupSuggestions.length > 0 && (
    <div className="sw-jr-suggestions-list" style={{
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "white",
      border: "1px solid #ddd",
      maxHeight: 200,
      overflowY: "auto",
    }}>
      {/* Show each suggestion directly */}
      {pickupSuggestions.map((s) => (
        <div
          key={s.place_id}
          className="sw-jr-suggestion-item"
          onClick={() => {
            setPickup({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
            setPickupText(s.display_name);
            setPickupSuggestions([]);
            setJustSelectedPickup(true);
          }}
          style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #eee" }}
        >
          {s.display_name}
        </div>
      ))}
    </div>
  )}
</div>



{/* Dropoff Input */}

<div className="sw-jr-location-block" style={{ position: "relative" }}>
<div className="sw-jr-label-row">
  <label className="sw-jr-label">Dropoff location</label>
  <span
    className="sw-jr-add-stop-label"
    onClick={() => {
      console.log("Add more stop clicked");
      // later: add another stop input
    }}
  >
    + Add more stop
  </span>
</div>
<Input
  size="large"
  placeholder="Enter dropoff location"
  value={destinationText}
  onChange={(e) => {
  if (justSelectedDestination) {
    setJustSelectedDestination(false); // reset flag, ignore this change
    return;
  }
  setDestinationText(e.target.value);
  setDestinationSuggestions([]); // clear previous suggestions
}}
  prefix={<SearchOutlined />}
/>

{destinationSuggestions.length > 0 && (
  <div className="sw-jr-suggestions-list">
    {destinationSuggestions.map((s) => (
      <div
        key={s.place_id}
        className="sw-jr-suggestion-item"
        onClick={() => {
          const place = {
            name: s.display_name,
            lat: parseFloat(s.lat),
            lng: parseFloat(s.lon),
          };

          setDestination(place);
          setDestinationText(place.name);
          setDestinationSuggestions([]); // **clear suggestions immediately**
          setJustSelectedDestination(true);

              setRecentPlaces((prev) => {
    if (prev.some(p => p.name === place.name)) return prev; // avoid duplicates
    return [place, ...prev].slice(0, 5); // keep max 5 recent
  });
        }}
      >
        {s.display_name}
      </div>
    ))}
  </div>
)}



  
</div>

{!pickup && !destination && (
  <div className="sw-jr-pre-booking">

    <h3 className="sw-jr-section-title">Recent Destinations</h3>
    <div className="sw-jr-recent-items-main">
        {recentStaticPlaces.map((item, idx) => (
  <div
    key={idx}
    className="sw-jr-recent-item"
    onClick={() => setDestinationText(item.address)}
  >
    <div className="sw-jr-recent-icon">{item.icon}</div>
    <div>
      <div className="sw-jr-recent-title">{item.label}</div>
      <div className="sw-jr-recent-sub">{item.address}</div>
    </div>
  </div>
))}
    </div>

  




<div className="sw-jr-tip-box-main">
     <div className="sw-jr-tip-box">
      💡 Tip: Use the GPS icon to auto-set your pickup location.
    </div>
</div>
 

  </div>
)}



{/* Available Rides Section */}
{pickup && destination && availableRides.length > 0 && (
  <div className="sw-jr-available-rides">
    <h3 className="sw-jr-available-title">Available Rides Nearby</h3>

    {availableRides.map((ride) => (
      <div key={ride.id} className="sw-jr-ride-card">
        <div className="sw-jr-ride-left">
          <img
  src={ride.icon}
  alt={ride.type}
  className="sw-jr-ride-icon"
/>

          <div>
            <div className="sw-jr-ride-type">{ride.type}</div>
            <div className="sw-jr-ride-sub">Near you • 2 min away</div>
          </div>
        </div>

        <div className="sw-jr-ride-price">₹{ride.price}</div>
      </div>
    ))}
  </div>
)}


{recentPlaces.length > 0 && (
  <div className="sw-jr-recent">
    <h4 className="sw-jr-recent-title">Recent destinations</h4>
    {recentPlaces.map((p, i) => (
      <div
        key={i}
        className="sw-jr-recent-item"
        onClick={() => {
          setDestination({ lat: p.lat, lng: p.lng });
          setDestinationText(p.name);
        }}
      >
        <span>📍</span>
        <span>{p.name}</span>
      </div>
    ))}
  </div>
)}











        </Sider>

        {/* MAP */}
        <Content className="sw-jr-map-panel">
          <MapContainer center={[28.4595, 77.0266]} zoom={13} className="sw-jr-leaflet-map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
            {destination && <Marker position={[destination.lat, destination.lng]} />}
            {pickup && destination && <SwJrRouting pickup={pickup} destination={destination} />}
            {pickup && <SwJrFlyTo position={pickup} />}
            {availableRides.map((ride) => (
  <Marker
    key={ride.id}
    position={[ride.lat, ride.lng]}
    icon={new L.Icon({
  iconUrl: ride.icon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })}
  />
))}

          </MapContainer>

        </Content>
      </Layout>
    </div>
  );
};

export default JustRidePanel;
