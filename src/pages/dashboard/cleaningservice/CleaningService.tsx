import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Modal,
  Form,
  Select,
  Input,
  // InputNumber,
  message,
} from "antd";
// import "./CleaningService.css";

import residentialImg from "../../../assets/CleaningServices/resi.png";
import commercialImg from "../../../assets/CleaningServices/office_cleaning.png";
import specializedImg from "../../../assets/CleaningServices/spec.png";
import postImg from "../../../assets/CleaningServices/const.jpg";
import industrialImg from "../../../assets/CleaningServices/indus.jpg";
import homeImg from "../../../assets/CleaningServices/residencial_cleaning.jpg";
import apartmentImg from "../../../assets/CleaningServices/1bhk.png";
import villaImg from "../../../assets/CleaningServices/luxury.jpg";
import officeImg from "../../../assets/CleaningServices/office.jpg";
import clinicImg from "../../../assets/CleaningServices/clinic_image.png";
import glassImg from "../../../assets/CleaningServices/glass.jpg";
import floorImg from "../../../assets/CleaningServices/floor.jpg";
import debrisImg from "../../../assets/CleaningServices/debris.png";
import paintImg from "../../../assets/CleaningServices/paintclean.webp";
import schoolImg from "../../../assets/CleaningServices/school.jpg";
import bedroomImg from "../../../assets/CleaningServices/bedroom.webp";
import kitchenImg from "../../../assets/CleaningServices/kitchen.webp";
import bathroomImg from "../../../assets/CleaningServices/bathroom.jpeg";
import assemblyImg from "../../../assets/CleaningServices/assembly.jpg";
import productionImg from "../../../assets/CleaningServices/production.jpg";
import wasteImg from "../../../assets/CleaningServices/waste.webp";
import studioImg from "../../../assets/CleaningServices/studio.jpg";
import bhkImg from "../../../assets/CleaningServices/1bhk.png";
import bhksImg from "../../../assets/CleaningServices/2bhk.jpg";
import svillaImg from "../../../assets/CleaningServices/svilla.jpg";
import duplexImg from "../../../assets/CleaningServices/duplex.png";
import luxuryImg from "../../../assets/CleaningServices/luxury.jpg";
import mallImg from "../../../assets/CleaningServices/mall.jpg";
import cabinImg from "../../../assets/CleaningServices/cabin.jpg";
import workstationImg from "../../../assets/CleaningServices/workstation.jpg";
import conferenceImg from "../../../assets/CleaningServices/conference.jpg";
import shopImg from "../../../assets/CleaningServices/shop.jpg";
import showroomImg from "../../../assets/CleaningServices/showroom.jpg";
import libraryImg from "../../../assets/CleaningServices/library.jpg";
import diagImg from "../../../assets/CleaningServices/diag.jpg";
import sofaImg from "../../../assets/CleaningServices/sofa_cleaning.png";
import chairImg from "../../../assets/CleaningServices/chair_cleaning.png";
import woodenImg from "../../../assets/CleaningServices/woodenfurniture_cleaning.png";
import marbleImg from "../../../assets/CleaningServices/marble_polishing.png";
import tileImg from "../../../assets/CleaningServices/tiles_cleaning.png";
import graniteImg from "../../../assets/CleaningServices/granite_cleaning.png";
import indoorImg from "../../../assets/CleaningServices/indoorglass_cleaning.png";
import outdoorImg from "../../../assets/CleaningServices/outdoorglass_cleaning.png";
import highImg from "../../../assets/CleaningServices/highrise_glass.png";
import hsanitizeImg from "../../../assets/CleaningServices/home_sanitization.png";
import osanitizeImg from "../../../assets/CleaningServices/office_sanitization.png";
import csanitizeImg from "../../../assets/CleaningServices/commercial_sanitization.png";
import wrackImg from "../../../assets/CleaningServices/warerack.png";
import wfloorImg from "../../../assets/CleaningServices/warefloor.png";
import idustImg from "../../../assets/CleaningServices/idust.webp";
import odustImg from "../../../assets/CleaningServices/odust.jpg";
import paintstainImg from "../../../assets/CleaningServices/paintstain.jpg";
import paintwindowImg from "../../../assets/CleaningServices/paintwindow.jpg";
import heavyImg from "../../../assets/CleaningServices/heavyec.png";
import precisionImg from "../../../assets/CleaningServices/precisiontc.png";
import solidImg from "../../../assets/CleaningServices/solidwh.png";
import disposalImg from "../../../assets/CleaningServices/chemicalwh.png";
import labImg from "../../../assets/CleaningServices/laboratory_cleaning.png";
import cliniImg from "../../../assets/CleaningServices/clinic_image.png";

import { useCart, type CartItem } from "../../../context/CartContext";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

type Module = {
  title: string;
  desc: string;
  price: string;
  image: string;
};

const SERVICE_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  deep: 1.4,
  move: 1.7,
  recurring: 0.85,
  sanitization: 1.3,
  grease: 1.5,
};

const ADDON_PRICES: Record<string, number> = {
  window: 100,
  balcony: 150,
  carpet: 200,
  oven: 300,
  kitchenDeepClean: 199,
  balconyWash: 149,
  sofaShampoo: 299,
};

const PRICE_PER_SQFT: Record<string, number> = {
  "living room cleaning": 1.5,
  "bedroom cleaning": 1.2,
  "kitchen cleaning": 2.5,
  "bathroom cleaning": 2.0,
  "studio apartment": 1.8,
  "1 bhk apartment": 1.75,
  "2 bhk / 3 bhk apartment": 1.65,
  "small villas": 2.8,
  "duplex villas": 3.0,
  "luxury villas": 3.5,
  "cabin cleaning": 2.5,
  "workstation cleaning": 2.2,
  "conference hall cleaning": 2.0,
  "classrooms": 1.7,
  "laboratory cleaning": 2.2,
  "library cleaning": 1.7,
  "shop cleaning": 2.5,
  "mall cleaning": 3.0,
  "showroom cleaning": 2.5,
  "marble polishing": 4.0,
  "granite polishing": 4.0,
  "indoor dust removal": 2.5,
  "outdoor dust removal": 2.5,
  "paint stain from tiles": 3.0,
  "paint stain from windows": 3.0,
  "assembly area cleaning": 3.5,
  "production line cleaning": 4.0,
  "warehouse rack cleaning": 2.0,
  "warehouse floor cleaning": 2.0,
};

const getPricePerSqft = (moduleTitle: string): number => {
  const key = moduleTitle.toLowerCase().trim();
  if (PRICE_PER_SQFT[key] != null) return PRICE_PER_SQFT[key];
  if (key.includes("living")) return 1.5;
  if (key.includes("bedroom")) return 1.2;
  if (key.includes("kitchen")) return 2.5;
  if (key.includes("bathroom")) return 2.0;
  if (key.includes("studio")) return 1.8;
  if (key.includes("1 bhk")) return 1.75;
  if (key.includes("2 bhk") || key.includes("3 bhk")) return 1.65;
  if (key.includes("villa")) return key.includes("luxury") ? 3.5 : 2.8;
  if (key.includes("office") || key.includes("cabin") || key.includes("workstation")) return 2.5;
  if (key.includes("class") || key.includes("school")) return 1.7;
  if (key.includes("marble") || key.includes("granite")) return 4.0;
  if (key.includes("dust") || key.includes("dust removal")) return 2.5;
  if (key.includes("paint")) return 3.0;
  if (key.includes("assembly") || key.includes("production")) return 3.5;
  if (key.includes("warehouse")) return 2.0;
  return 1.8;
};


const calculatePrice = (
  module: Module,
  sqft: number,
  serviceType: string,
  addons: string[]
) => {
  const perSqft = getPricePerSqft(module.title);
  const multiplier = SERVICE_MULTIPLIERS[serviceType] ?? 1.0;

  
  const basePrice = parseInt((module.price || "").toString().replace(/[₹,\s]/g, "")) || 0;

  const addonCost = (addons || []).reduce((s, a) => s + (ADDON_PRICES[a] || 0), 0);

  
  const sqftPart = Math.round(Math.max(0, sqft) * perSqft * multiplier);

 
  return Math.round(basePrice * multiplier) + sqftPart + addonCost;
};


const formatINR = (value: number | null) => {
  if (value == null || !isFinite(value) || value <= 0) return "—";
  return `₹ ${value.toLocaleString("en-IN")}`;
};

const CleaningService: React.FC = () => {
  const { addToCart } = useCart();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isModulesModalOpen, setIsModulesModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [selectedMainKey, setSelectedMainKey] = useState<string>("");
  const [selectedSubKey, setSelectedSubKey] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const [computedPrice, setComputedPrice] = useState<number | null>(null);


  const [serviceTypeKey, setServiceTypeKey] = useState<string>("standard");

  const [form] = Form.useForm();

  useEffect(() => {
    if (isDetailsModalOpen && selectedModule) {
      form.resetFields();
      form.setFieldsValue({  additional: [] });
      setComputedPrice(null);
      // setServiceTypeKey();
    }
  }, [isDetailsModalOpen, selectedModule, form]);

  const prevOverflowRef = useRef<string | null>(null);
  useEffect(() => {
    const anyOpen = isCategoryModalOpen || isModulesModalOpen || isDetailsModalOpen;
    if (anyOpen) {
      if (prevOverflowRef.current === null) prevOverflowRef.current = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
      return;
    }
    if (prevOverflowRef.current !== null) {
      document.body.style.overflow = prevOverflowRef.current;
      prevOverflowRef.current = null;
    }
    return;
  }, [isCategoryModalOpen, isModulesModalOpen, isDetailsModalOpen]);

  useEffect(() => {
    return () => {
      if (prevOverflowRef.current !== null) {
        document.body.style.overflow = prevOverflowRef.current;
        prevOverflowRef.current = null;
      }
    };
  }, []);


  const categories = [
    {
      key: "residential",
      title: "Residential Cleaning",
      desc: "Complete cleaning service solutions for homes, apartments, and villas",
      image: residentialImg,
      count: 13,
    },
    {
      key: "commercial",
      title: "Commercial Cleaning",
      desc: "Professional cleaning service for offices, schools, and commercial spaces",
      image: commercialImg,
      count: 11,
    },
    {
      key: "specialized",
      title: "Specialized Cleaning",
      desc: "Expert cleaning service for furniture, floors, windows, and sanitization",
      image: specializedImg,
      count: 12,
    },
    {
      key: "industrial",
      title: "Industrial Cleaning",
      desc: "Heavy-duty cleaning for factories, warehouses, and industrial facilities",
      image: industrialImg,
      count: 8,
    },
    {
      key: "post",
      title: "Post-Construction Cleaning",
      desc: "Complete cleanup after construction and renovation",
      image: postImg,
      count: 8,
    },
  ];

  const subservicesByMain: Record<string, { key: string; title: string; image: string }[]> = {
    residential: [
      { key: "homes", title: "Homes", image: homeImg },
      { key: "apartments", title: "Apartments", image: apartmentImg },
      { key: "villas", title: "Villas", image: villaImg },
    ],
    commercial: [
      { key: "offices", title: "Offices", image: officeImg },
      { key: "shops", title: "Shops & Malls", image: mallImg },
      { key: "clinics", title: "Clinics & Labs", image: clinicImg },
      { key: "schools", title: "Schools", image: schoolImg },
    ],
    specialized: [
      { key: "furniture", title: "Furniture Care", image: specializedImg },
      { key: "floors", title: "Floor & Polishing", image: floorImg },
      { key: "glass", title: "Glass & Windows", image: glassImg },
    ],
    post: [
      { key: "marble", title: "Marble & Granite", image: postImg },
      { key: "dustremoval", title: "Dust Removal", image: debrisImg },
      { key: "paintstain", title: "Paint Stain Removal", image: paintImg },
    ],
    industrial: [
      { key: "assembly", title: "Assembly Areas", image: assemblyImg },
      { key: "production", title: "Production Lines", image: productionImg },
      { key: "waste", title: "Waste Handling", image: wasteImg },
    ],
  };

  const modulesBySubKey: Record<string, Module[]> = {
    homes: [
      { title: "Living Room Cleaning", desc: "Deep cleaning of living room including furniture and floors", price: "₹49", image: residentialImg },
      { title: "Bedroom Cleaning", desc: "Thorough cleaning of bedrooms including mattress and wardrobes", price: "₹39", image: bedroomImg },
      { title: "Kitchen Cleaning", desc: "Complete kitchen cleaning with appliances and surfaces", price: "₹59", image: kitchenImg },
      { title: "Bathroom Cleaning", desc: "Sanitization and deep cleaning of bathrooms", price: "₹45", image: bathroomImg },
    ],
    apartments: [
      { title: "Studio Apartment", desc: "Complete cleaning for studio apartments", price: "₹69", image: studioImg },
      { title: "1 BHK Apartment", desc: "Professional cleaning for 1 bedroom apartments", price: "₹79", image: bhkImg },
      { title: "2 BHK / 3 BHK Apartment", desc: "Comprehensive cleaning for larger apartments", price: "₹129", image: bhksImg },
    ],
    villas: [
      { title: "Small Villas", desc: "Cleaning service for small villas", price: "₹149", image: svillaImg },
      { title: "Duplex Villas", desc: "Complete cleaning for duplex villas", price: "₹199", image: duplexImg },
      { title: "Luxury Villas", desc: "Premium  service for luxury villas", price: "₹299", image: luxuryImg },
    ],
    offices: [
      { title: "Cabin Cleaning", desc: "Individual cabin and office cleaning", price: "₹49", image: cabinImg },
      { title: "Workstation Cleaning", desc: "Open office workstation cleaning", price: "₹39", image: workstationImg },
      { title: "Conference Hall Cleaning", desc: "Meeting and conference room cleaning", price: "₹69", image: conferenceImg },
    ],
    schools: [
      { title: "Classrooms", desc: "Complete classroom cleaning and sanitization", price: "₹79", image: schoolImg },
      { title: "Laboratory Cleaning", desc: "Specialized cleaning for science and computer labs", price: "₹99", image: clinicImg },
      { title: "Library Cleaning", desc: "Quiet and thorough library cleaning service", price: "₹89", image: libraryImg },
    ],
    shops: [
      { title: "Shop Cleaning", desc: "Retail shop cleaning services", price: "₹59", image: shopImg },
      { title: "Mall Cleaning", desc: "Large-scale mall cleaning services", price: "₹399", image: mallImg },
      { title: "Showroom Cleaning", desc: "Premium cleaning for showrooms", price: "₹129", image: showroomImg },
    ],
    clinics: [
      { title: "Laboratory Cleaning", desc: "Specialized cleaning for labs", price: "₹99", image: labImg },
      { title: "Clinic Cleaning", desc: "Medical-grade cleaning for clinics", price: "₹149", image: cliniImg },
      { title: "Diagnostic Centers", desc: "Specialized cleaning for diagnostic facilities", price: "₹169", image: diagImg },
    ],
    furniture: [
      { title: "Sofa Cleaning", desc: "Deep cleaning for all types of sofas", price: "₹49", image: sofaImg },
      { title: "Chair Cleaning", desc: "Professional cleaning for chairs and recliners", price: "₹29", image: chairImg },
      { title: "Wooden Furniture Cleaning", desc: "Specialized care for wooden furniture", price: "₹39", image: woodenImg },
    ],
    floors: [
      { title: "Marble Polishing", desc: "Professional marble floor polishing", price: "₹89", image: marbleImg },
      { title: "Tile Cleaning", desc: "Complete tile and grout cleaning", price: "₹69", image: tileImg },
      { title: "Granite Polishing", desc: "Granite surface polishing and care", price: "₹99", image: graniteImg },
    ],
    glass: [
      { title: "Indoor Glass Cleaning", desc: "Crystal clear indoor glass and mirror cleaning", price: "₹39", image: indoorImg },
      { title: "Outdoor Glass Cleaning", desc: "Exterior window and glass cleaning", price: "₹59", image: outdoorImg },
      { title: "High-Rise Glass Cleaning", desc: "Professional high-rise window cleaning", price: "₹149", image: highImg },
      { title: "Home Sanitization", desc: "Complete home disinfection and sanitization", price: "₹99", image: hsanitizeImg },
      { title: "Office Sanitization", desc: "Workplace disinfection service", price: "₹149", image: osanitizeImg },
      { title: "Commercial Sanitization", desc: "Large-scale commercial sanitization", price: "₹299", image: csanitizeImg },
    ],
    marble: [
      { title: "Marble Polishing", desc: "Post-construction marble polishing", price: "₹129", image: marbleImg },
      { title: "Granite Polishing", desc: "Post-construction granite surface care", price: "₹139", image: graniteImg },
    ],
    dustremoval: [
      { title: "Indoor Dust Removal", desc: "Complete indoor dust and debris removal", price: "₹149", image: idustImg },
      { title: "Outdoor Dust Removal", desc: "Exterior area cleanup", price: "₹129", image: odustImg },
    ],
    paintstain: [
      { title: "Paint Stain from Tiles", desc: "Professional paint stain removal from tiles", price: "₹69", image: paintstainImg },
      { title: "Paint Stain from Windows", desc: "Window cleaning and paint removal", price: "₹79", image: paintwindowImg },
    ],
    assembly: [
      { title: "Assembly Area Cleaning", desc: "Cleaning for assembly and production areas", price: "₹299", image: assemblyImg },
      { title: "Production Line Cleaning", desc: "Specialized cleaning for production lines", price: "₹399", image: productionImg },
    ],
    production: [
      { title: "Warehouse Rack Cleaning", desc: "Cleaning and maintenance of warehouse racks", price: "₹199", image: wrackImg },
      { title: "Warehouse Floor Cleaning", desc: "Large-scale warehouse floor cleaning", price: "₹349", image: wfloorImg },
    ],
    waste: [
      { title: "Heavy Equipment Cleaning", desc: "Specialized cleaning for heavy machinery", price: "₹449", image: heavyImg },
      { title: "Precision Tools Cleaning", desc: "Careful cleaning of precision equipment", price: "₹249", image: precisionImg },
      { title: "Chemical Waste Handling", desc: "Safe disposal of chemical waste", price: "₹599", image: disposalImg },
      { title: "Solid Waste Handling", desc: "Industrial solid waste management", price: "₹399", image: solidImg },
    ],
  };

  const getFieldConfig = (title: string) => {
    const lower = title.toLowerCase();
    const config = {
      bedrooms: false,
      bathrooms: false,
      sqft: false,
      serviceType: true,
      preferredDate: true,
      instructions: true,
    };
    if (lower.includes("living room")) {
      config.sqft = true;
      return config;
    }
    if (lower.includes("bedroom")) {
      config.bedrooms = true;
      config.sqft = true;
      return config;
    }
    if (lower.includes("kitchen")) {
      config.sqft = true;
      return config;
    }
    if (lower.includes("bathroom")) {
      config.bathrooms = true;
      config.sqft = true;
      return config;
    }
    if (lower.includes("studio")) {
      config.sqft = true;
      return config;
    }
    if (lower.includes("1 bhk") || lower.includes("2 bhk") || lower.includes("3 bhk") || lower.includes("2 bhk / 3 bhk") || lower.includes("1 bhk apartment") || lower.match(/\b\d+\s*bhk/)) {
      config.bedrooms = true;
      config.sqft = true;
      return config;
    }
    if (lower.includes("villa")) {
      config.bedrooms = true;
      config.sqft = true;
      return config;
    }
    if (lower.includes("cab") || lower.includes("workstation") || lower.includes("conference") || lower.includes("shop") || lower.includes("mall") || lower.includes("warehouse") || lower.includes("assembly") || lower.includes("production")) {
      config.sqft = true;
      return config;
    }
    config.sqft = true;
    return config;
  };

  const openCategory = (mainKey: string) => {
    setSelectedMainKey(mainKey);
    setIsCategoryModalOpen(true);
  };

  const openSubservice = (subKey: string) => {
    setSelectedSubKey(subKey);
    setIsCategoryModalOpen(false);
    setIsModulesModalOpen(true);
  };

  const openModuleDetails = (m: Module) => {
    setSelectedModule(m);
    setIsModulesModalOpen(false);
    setIsDetailsModalOpen(true);
  };

 
const computeTotal = (values: any) => {
  if (!selectedModule) {
    setComputedPrice(null);
    return;
  }

  
  let st = values?.serviceType;
  if (!st) st = "standard";   
  setServiceTypeKey(st);

  const sqftRaw = values?.propertySize;
  let sqft = 0;
  if (typeof sqftRaw === "number") sqft = sqftRaw;
  else if (typeof sqftRaw === "string") sqft = parseFloat(sqftRaw || "0") || 0;

  const addons: string[] = values?.additional || [];

  
  if (sqft > 0) {
    const total = calculatePrice(selectedModule, sqft, st, addons);
    setComputedPrice(total);
    return;
  }

  
  const basePrice =
    parseInt((selectedModule.price || "").toString().replace(/[₹,\s]/g, "")) || 0;

  const mult = SERVICE_MULTIPLIERS[st] ?? 1;
  const display = Math.round(basePrice * mult);

  setComputedPrice(display);
};


 
const getDisplayPriceText = (): string => {
  if (computedPrice) return formatINR(computedPrice);

  if (!selectedModule) return "—";

 
  const basePriceNum =
    parseInt((selectedModule.price || "").toString().replace(/[₹,\s]/g, "")) || 0;

  
  const mult = SERVICE_MULTIPLIERS[serviceTypeKey] ?? 1;

  const displayNum = Math.round(basePriceNum * mult);

  if (displayNum > 0) return formatINR(displayNum);
  return selectedModule.price || "—";
};


  const onAddToCart = (values: any) => {
    if (!selectedModule) return;
    const cartItem: CartItem = {
      id: Date.now(),
      title: selectedModule.title,
      image: selectedModule.image,
      quantity: 1,
      price: selectedModule.price,
      totalPrice: computedPrice ?? Math.round((parseInt((selectedModule.price || "").replace(/[₹,\s]/g, "")) || 0) * (SERVICE_MULTIPLIERS[serviceTypeKey] ?? 1)),
      customerName: "",
      deliveryType: "",
      deliveryDate: "",
      contact: "",
      address: "",
      instructions: values?.instructions || "",
    };
    addToCart(cartItem);
    message.success(
      `${selectedModule.title} added to cart — ${formatINR(cartItem.totalPrice)}`
    );
    setIsDetailsModalOpen(false);
  };

  const handleDetailsCancel = () => {
    setIsDetailsModalOpen(false);
    if (selectedSubKey) setIsModulesModalOpen(true);
  };

  const visibleCategories = categories;
  const modulesForSelected = modulesBySubKey[selectedSubKey] || [];

  return (
    <div className="sw-cs-page-wrapper">
      <div className="sw-cs-cs-container">

        <div className="sw-cs-main-cards-grid" style={{ paddingRight: 12 }}>
          <div className="sw-cs-main-row">
            {visibleCategories.map((cat) => (
              <div className="sw-cs-main-col" key={cat.key}>
                <Card className="sw-cs-main-card" hoverable>
                  <div className="sw-cs-main-card-image-wrap">
                    <img src={cat.image} alt={cat.title} className="sw-cs-main-card-image" />
                  </div>

                  <div className="sw-cs-main-card-body">
                    <Title level={4} className="sw-cs-main-card-title">{cat.title}</Title>
                    <Paragraph className="sw-cs-main-card-desc">{cat.desc}</Paragraph>
                    <Button
                      size="middle"
                      type="primary"
                      className="sw-cs-black-btn"
                      onClick={() => openCategory(cat.key)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Modal
          title={<div className="sw-cs-modal-title-row"><div className="sw-cs-modal-title-text">{categories.find(c => c.key === selectedMainKey)?.title || "Category"}</div></div>}
          open={isCategoryModalOpen}
          onCancel={() => setIsCategoryModalOpen(false)}
          footer={null}
          width={920}
          centered
          wrapClassName="sw-cs-no-h-scroll-modal"
          closable
        >
          <div className="sw-cs-subservices-row">
            {(subservicesByMain[selectedMainKey] || []).map((s) => (
              <div className="sw-cs-subservices-col" key={s.key}>
                <Card
                  className="sw-cs-subservice-card"
                  hoverable
                  onClick={() => openSubservice(s.key)}
                >
                  <img src={s.image} alt={s.title} className="sw-cs-subservice-img" />
                  <div className="sw-cs-subservice-card-body">
                    <Title level={5} className="sw-cs-subservice-card-title">{s.title}</Title>

                    <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                      <Button
                        className="sw-cs-black-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openSubservice(s.key);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Modal>

        {/* MODULES MODAL */}
        <Modal
          title={<div className="sw-cs-modal-title-row"><div className="sw-cs-modal-title-text">{selectedSubKey ? `${selectedSubKey.charAt(0).toUpperCase() + selectedSubKey.slice(1)} Services` : "Services"}</div></div>}
          open={isModulesModalOpen}
          onCancel={() => { setIsModulesModalOpen(false); setIsCategoryModalOpen(true); }}
          footer={null}
          width={1000}
          centered
          wrapClassName="sw-cs-no-h-scroll-modal"
          closable
        >
          <div className={`sw-cs-modules-grid modules-count-${modulesForSelected.length}`} role="list">
            {modulesForSelected.length ? modulesForSelected.map((m) => (
              <Card key={m.title} className="sw-cs-module-card" hoverable role="listitem">
                <img src={m.image} className="sw-cs-module-img" alt={m.title} />
                <div className="sw-cs-module-content">
                  <div className="sw-cs-module-title-center">
                    <Title level={5} className="sw-cs-module-card-title">{m.title}</Title>
                  </div>

                  <Paragraph className="sw-cs-module-desc">{m.desc}</Paragraph>

                  <div className="sw-cs-module-footer">
                    <div className="sw-cs-module-price">{m.price}</div>
                    <Button size="small" type="primary" className="sw-cs-black-btn" onClick={(e) => { e.stopPropagation(); openModuleDetails(m); }}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            )) : (
              <div className="sw-cs-empty-services"><Paragraph>No services found.</Paragraph></div>
            )}
          </div>
        </Modal>

        {/* DETAILS MODAL */}
        <Modal
          title={<div className="sw-cs-details-modal-title-row"><div className="sw-cs-details-modal-title-text">{selectedModule?.title}</div></div>}
          open={isDetailsModalOpen}
          onCancel={handleDetailsCancel}
          footer={null}
          width={920}
          centered
          wrapClassName="sw-cs-no-h-scroll-modal"
          closable
        >
          <div className="sw-cs-details-modal-body">
            <div className="sw-cs-details-left">
              <img src={selectedModule?.image} alt={selectedModule?.title} className="sw-cs-details-image" />
              <Paragraph className="sw-cs-details-paragraph">{selectedModule?.desc}</Paragraph>

              <div className="sw-cs-includes-block">
                <div className="sw-cs-includes-title">What's Included</div>
                <div className="sw-cs-include-item">• Surface dusting & wiping</div>
                <div className="sw-cs-include-item">• Floor mopping / vacuum</div>
                <div className="sw-cs-include-item">• Window wiping</div>
              </div>

              <div className="sw-cs-price-card">
                <div className="sw-cs-price-card-label">Service Price</div>
                <div className="sw-cs-price-card-value">{getDisplayPriceText()}</div>
              </div>
            </div>

            <div className="sw-cs-details-right">
              <div className="sw-cs-details-section-title">Service Details</div>

            <Form
  form={form}
  layout="vertical"
  onFinish={onAddToCart}
  initialValues={{ additional: [] }}
  onValuesChange={(_changed, allValues) => computeTotal(allValues)}
>
<div className="sw-cs-form-row">
 
  <Form.Item
    name="fullName"
    label="Full Name"
    rules={[
      { required: true, message: "Enter full name" },
      {
        pattern: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
        message:
          "Enter valid full name"
      }
    ]}
    className="sw-cs-half-width"
  >
    <Input placeholder="John Doe" />
  </Form.Item>

  
  <Form.Item
    name="email"
    label="Email"
    rules={[
      { required: true, message: "Enter email" },
      { type: "email", message: "Enter valid email" },
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const allowedDomains = [
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com",
            "rediffmail.com",
            "protonmail.com",
            "icloud.com"
          ];

          const domain = value.split("@")[1];
          if (allowedDomains.includes(domain)) {
            return Promise.resolve();
          }
          return Promise.reject(
            "Email must be Gmail, Yahoo, Outlook "
          );
        }
      }
    ]}
    className="sw-cs-half-width"
  >
    <Input placeholder="example@gmail.com" />
  </Form.Item>
</div>

<div className="sw-cs-form-row">
  
  <Form.Item
    name="mobile"
    label="Mobile Number"
    rules={[
      { required: true, message: "Enter mobile number" },
      {
        pattern: /^[0-9]{10}$/,
        message: "Enter valid 10-digit Indian mobile number"
      }
    ]}
    className="sw-cs-half-width"
  >
    <Input maxLength={10} placeholder="+91 9876543210" />
  </Form.Item>

  
  <Form.Item
    name="address"
    label="Address"
    rules={[{ required: true, message: "Enter address" }]}
    className="sw-cs-half-width"
  >
    <Input placeholder="House No, Street, City" />
  </Form.Item>
</div>


  {selectedModule && (() => {
    const cfg = getFieldConfig(selectedModule.title);

    return (
      <>
        
        <div className="sw-cs-form-row">
          {cfg.serviceType && (
            <Form.Item
              name="serviceType"
              label="Service Type"
              rules={[{ required: true, message: "Choose service type" }]}
              className="sw-cs-half-width"
            >
              <Select
                placeholder="Select service type"
                onChange={() => computeTotal(form.getFieldsValue())}
                allowClear
              >
                {selectedModule.title.toLowerCase().includes("room") ||
                selectedModule.title.toLowerCase().includes("bedroom") ? (
                  <>
                    <Option value="standard">Regular Cleaning</Option>
                    <Option value="deep">Deep Cleaning</Option>
                    <Option value="move">Move-in / Move-out Cleaning</Option>
                  </>
                ) : selectedModule.title.toLowerCase().includes("kitchen") ? (
                  <>
                    <Option value="standard">Regular Cleaning</Option>
                    <Option value="deep">Deep Cleaning</Option>
                    <Option value="grease">Grease Removal</Option>
                  </>
                ) : selectedModule.title.toLowerCase().includes("bathroom") ? (
                  <>
                    <Option value="sanitization">Sanitization</Option>
                    <Option value="deep">Deep Bathroom Clean</Option>
                  </>
                ) : (
                  <>
                    <Option value="standard">Regular Cleaning</Option>
                    <Option value="deep">Deep Cleaning</Option>
                    <Option value="move">Move-in / Move-out Cleaning</Option>
                  </>
                )}
              </Select>
            </Form.Item>
          )}

          {cfg.sqft && (
            <Form.Item
              name="propertySize"
              label="Property Size (sq ft)"
              rules={[{ required: true, message: "Enter size" }]}
              className="sw-cs-half-width"
            >
              <Input
                placeholder="e.g., 1200"
                onChange={() => computeTotal(form.getFieldsValue())}
              />
            </Form.Item>
          )}
        </div>

        
        <div className="sw-cs-form-row">
          <Form.Item
            name="additional"
            label="Optional Add-ons"
            className={cfg.bedrooms ? "sw-cs-half-width" : "sw-cs-full-width"}
          >
            <Select
              mode="multiple"
              placeholder="Select optional add-ons"
              onChange={() => computeTotal(form.getFieldsValue())}
            >
              <Option value="kitchenDeepClean">Kitchen Deep Clean — ₹199</Option>
              <Option value="balconyWash">Balcony Wash — ₹149</Option>
              <Option value="sofaShampoo">Sofa Shampooing — ₹299</Option>
              <Option value="window">Window Cleaning — ₹100</Option>
              <Option value="balcony">Balcony Cleaning — ₹150</Option>
              <Option value="carpet">Carpet Shampooing — ₹200</Option>
              <Option value="oven">Oven Deep Clean — ₹300</Option>
            </Select>
          </Form.Item>

          {cfg.bedrooms && (
            <Form.Item
              name="bedrooms"
              label="Bedrooms"
              rules={[{ required: true }]}
              className="sw-cs-half-width"
            >
              <Select placeholder="Select">
                <Option value={0}>0</Option>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4+</Option>
              </Select>
            </Form.Item>
          )}
        </div>

      
        {cfg.bathrooms && (
          <div className="sw-cs-form-row">
            <Form.Item
              name="bathrooms"
              label="Bathrooms"
              rules={[{ required: true }]}
              className="sw-cs-half-width"
            >
              <Select placeholder="Select">
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3+</Option>
              </Select>
            </Form.Item>
          </div>
        )}
        <div className="sw-cs-form-row">
          {cfg.preferredDate && (
            <Form.Item
              name="preferredDate"
              label="Preferred Date"
              rules={[{ required: true, message: "Select a date" }]}
              className="sw-cs-half-width"
            >
              <input type="date" className="sw-cs-custom-date-input" />
            </Form.Item>
          )}

          <Form.Item
            name="timeSlot"
            label="Preferred Time Slot"
            rules={[{ required: true, message: "Select a time slot" }]}
            className="sw-cs-half-width"
          >
            <Select placeholder="Select time slot">
              <Option value="9am-11am">9:00 AM – 11:00 AM</Option>
              <Option value="11am-1pm">11:00 AM – 1:00 PM</Option>
              <Option value="1pm-3pm">1:00 PM – 3:00 PM</Option>
              <Option value="3pm-5pm">3:00 PM – 5:00 PM</Option>
              <Option value="5pm-7pm">5:00 PM – 7:00 PM</Option>
            </Select>
          </Form.Item>
        </div>

        {/* SPECIAL INSTRUCTIONS */}
        {cfg.instructions && (
          <Form.Item name="instructions" label="Special Instructions">
            <TextArea rows={3} placeholder="Any specific requirements..." />
          </Form.Item>
        )}

        {/* PAYMENT TYPE */}
        <Form.Item
          name="paymentType"
          label="Payment Type"
          rules={[{ required: true, message: "Select payment type" }]}
        >
          <Select placeholder="Choose payment option">
            <Option value="full">Full Payment</Option>
            <Option value="partial">Partial Payment (Advance)</Option>
          </Select>
        </Form.Item>
      </>
    );
  })()}

  {/* ACTION BUTTONS */}
  <div className="sw-cs-details-actions">
    <Button onClick={handleDetailsCancel}>Cancel</Button>
    <Button type="primary" htmlType="submit" className="sw-cs-black-btn">
      Add to Cart
    </Button>
  </div>
</Form>

            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CleaningService;
