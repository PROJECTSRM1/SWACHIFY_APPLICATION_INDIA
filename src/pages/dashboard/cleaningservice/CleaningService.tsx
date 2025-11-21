
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Modal,
  Form,
  Select,
  Input,
  InputNumber,
 // Checkbox,
  DatePicker,
  message,
} from "antd";
// import { ThunderboltFilled } from "@ant-design/icons";
import "./CleaningService.css";

import residentialImg from "../../../assets/CleaningServices/resi.png";
import commercialImg from "../../../assets/CleaningServices/office_cleaning.png";
import specializedImg from "../../../assets/CleaningServices/spec.png";
// import residentialImg from "../../../assets/CleaningServices/resi.png";
import postImg from "../../../assets/CleaningServices/const.jpg";
import industrialImg from "../../../assets/CleaningServices/indus.jpg";
import homeImg from "../../../assets/CleaningServices/homecleaning.jpg";
import apartmentImg from "../../../assets/CleaningServices/apartmentcleaning.jpg";
import villaImg from "../../../assets/CleaningServices/villacleaning.jpg";
import officeImg from "../../../assets/CleaningServices/office.jpg";
import clinicImg from "../../../assets/CleaningServices/clinic.jpg";
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
  moduleTitle: string,
  sqft: number,
  serviceType: string,
  addons: string[]
) => {
  const perSqft = getPricePerSqft(moduleTitle);
  const multiplier = SERVICE_MULTIPLIERS[serviceType] ?? 1.0;
  const addonCost = (addons || []).reduce((s, a) => s + (ADDON_PRICES[a] || 0), 0);
  const total = Math.round(Math.max(0, sqft) * perSqft * multiplier + addonCost);
  return total;
};

const formatINR = (value: number | null) => {
  if (value == null || !isFinite(value) || value <= 0) return "—";
  return `₹ ${value.toLocaleString("en-IN")}`;
};

/* ------------------------------------------------ */

const CleaningService: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isModulesModalOpen, setIsModulesModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [selectedMainKey, setSelectedMainKey] = useState<string>("");
  const [selectedSubKey, setSelectedSubKey] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const [computedPrice, setComputedPrice] = useState<number | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
   
    if (isDetailsModalOpen && selectedModule) {
      form.resetFields();
      form.setFieldsValue({ serviceType: "standard", additional: [] });
      setComputedPrice(null);
    }
    
  }, [isDetailsModalOpen, selectedModule]);

  const categories = [
    {
      key: "residential",
      title: "Residential Cleaning",
      desc: "Complete cleaning solutions for homes, apartments, and villas",
      image: residentialImg,
      count: 13,
    },
    {
      key: "commercial",
      title: "Commercial Cleaning",
      desc: "Professional cleaning for offices, schools, and commercial spaces",
      image: commercialImg,
      count: 11,
    },
    {
      key: "specialized",
      title: "Specialized Cleaning",
      desc: "Expert cleaning for furniture, floors, windows, and sanitization",
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
      //config.bathrooms = true;
      config.sqft = true;
      return config;
    }

    if (lower.includes("villa")) {
      config.bedrooms = true;
     // config.bathrooms = true;
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

    const sqftValRaw = values?.propertySize;
    let sqft = 0;
    if (typeof sqftValRaw === "number") sqft = sqftValRaw;
    else if (typeof sqftValRaw === "string") sqft = parseFloat(sqftValRaw || "0") || 0;

    if (!sqft || sqft <= 0) {
      
      setComputedPrice(null);
      return;
    }

    const serviceTypeKey = (values?.serviceType as string) || "standard";
    const addons: string[] = values?.additional || [];

    const total = calculatePrice(selectedModule.title, sqft, serviceTypeKey, addons);
    setComputedPrice(total);
  };

  const onAddToCart = (values: any) => {
    const payload = {
      module: selectedModule,
      form: values,
      totalPrice: computedPrice ?? 0,
    };
    console.log("Add to cart:", payload);
    message.success(`${selectedModule?.title} added to cart — ${formatINR(computedPrice || 0)}`);
    setIsDetailsModalOpen(false);
  };

  const handleDetailsCancel = () => {
    setIsDetailsModalOpen(false);
    if (selectedSubKey) {
      setIsModulesModalOpen(true);
    }
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 4);
  const modulesForSelected = modulesBySubKey[selectedSubKey] || [];

  return (
    <div className="page-wrapper">
    <div className="cs-container">
    
      <div className="cs-header">
        <div className="cs-header-left">
          {/* <div className="cs-icon">
            <ThunderboltFilled className="cs-icon-inner" />
          </div> */}
          <div>
            <Title level={3} className="cs-header-title">Cleaning Services</Title>
            <p className="cs-header-sub">{categories.length} services available</p>
          </div>
        </div>

        <Button className="cs-top-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? "View Less" : "View All Services"}
        </Button>
      </div>

      <div className="main-cards-grid">
        <div className="main-row">
          {visibleCategories.map((cat) => (
            <div className="main-col" key={cat.key}>
              <Card className="main-card" hoverable>

                <div className="main-card-image-wrap">
                  <img src={cat.image} alt={cat.title} className="main-card-image" />
                </div>

                <div className="main-card-body">
                  <Title level={4} className="main-card-title">{cat.title}</Title>
                  <Paragraph className="main-card-desc">{cat.desc}</Paragraph>
                      <Button 
        size="middle"
        type="primary"
         className="black-btn"
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
        title={<div className="modal-title-row"><div className="modal-title-text">{categories.find(c => c.key === selectedMainKey)?.title || "Category"}</div></div>}
        open={isCategoryModalOpen}
        onCancel={() => setIsCategoryModalOpen(false)}
        footer={null}
        width={920}
        centered
        wrapClassName="no-h-scroll-modal"
      >

        <div className="subservices-row">
          {(subservicesByMain[selectedMainKey] || []).map((s) => (
            <div className="subservices-col" key={s.key}>
              <Card className="subservice-card" hoverable onClick={() => openSubservice(s.key)}>
                <img src={s.image} alt={s.title} className="subservice-img" />
                <div className="subservice-card-body">
                  <Title level={5} className="subservice-card-title">{s.title}</Title>
                  <Paragraph className="subservice-card-desc">Click to view {s.title.toLowerCase()} services</Paragraph>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Modal>

     
      <Modal
        title={<div className="modal-title-row"><div className="modal-title-text">{selectedSubKey ? `${selectedSubKey.charAt(0).toUpperCase() + selectedSubKey.slice(1)} Services` : "Services"}</div></div>}
        open={isModulesModalOpen}
        onCancel={() => {
          setIsModulesModalOpen(false);
          setIsCategoryModalOpen(true);
        }}
        footer={null}
        width={1000}
        centered
        wrapClassName="no-h-scroll-modal"
      >
        <div className={`modules-grid modules-count-${modulesForSelected.length}`} role="list">
          {modulesForSelected.length ? modulesForSelected.map((m) => (
            <Card
              key={m.title}
              className="module-card"
              hoverable
              //onClick={() => openModuleDetails(m)}
              role="listitem"
            >
              <img src={m.image} className="module-img" alt={m.title} />
              <div className="module-content">
                <div className="module-title-center">
                  <Title level={5} className="module-card-title">{m.title}</Title>
                </div>

                <Paragraph className="module-desc">{m.desc}</Paragraph>

                <div className="module-footer">
                  <div className="module-price">{m.price}</div>
                  <Button size="small" type="primary" className="black-btn" onClick={(e) => { e.stopPropagation(); openModuleDetails(m); }}>
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          )) : (
            <div className="empty-services">
              <Paragraph>No services found.</Paragraph>
            </div>
          )}
        </div>
      </Modal>

     
      <Modal
        title={<div className="details-modal-title-row"><div className="details-modal-title-text">{selectedModule?.title}</div></div>}
        open={isDetailsModalOpen}
        onCancel={handleDetailsCancel}
        footer={null}
        width={920}
        centered
        wrapClassName="no-h-scroll-modal"
      >
        <div className="details-modal-body">
          <div className="details-left">
            <img src={selectedModule?.image} alt={selectedModule?.title} className="details-image" />
            <Paragraph className="details-paragraph">{selectedModule?.desc}</Paragraph>

            <div className="includes-block">
              <div className="includes-title">What's Included</div>
              <div className="include-item">• Surface dusting & wiping</div>
              <div className="include-item">• Floor mopping / vacuum</div>
              <div className="include-item">• Window wiping</div>
            </div>

            <div className="price-card">
              <div className="price-card-label">Service Price</div>
              <div className="price-card-value">{computedPrice ? formatINR(computedPrice) : (selectedModule?.price || "—")}</div>
            </div>
          </div>

          <div className="details-right">
            <div className="details-section-title">Service Details</div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onAddToCart}
              initialValues={{ additional: [], serviceType: "standard" }}
              onValuesChange={(_changed, allValues) => computeTotal(allValues)}
            >
              {selectedModule && (() => {
                const cfg = getFieldConfig(selectedModule.title);

                return (
                  <>
                    {cfg.serviceType && (
                      <Form.Item name="serviceType" label="Service Type" rules={[{ required: true, message: "Choose service type" }]}>
                        <Select placeholder="Select service type" className="full-width-select">
                          {selectedModule.title.toLowerCase().includes("room") || selectedModule.title.toLowerCase().includes("bedroom") ? (
                            <>
                              <Option value="standard">Regular cleaning</Option>
                              <Option value="deep">Deep Cleaning</Option>
                              <Option value="mattress">Move-in/Move-out Cleaning</Option>
                            </>
                          ) : selectedModule.title.toLowerCase().includes("kitchen") ? (
                            <>
                              <Option value="standard">Regular Cleaning</Option>
                              <Option value="deep">Deep  Cleaning</Option>
                              <Option value="grease">Move-in/Move-out</Option>
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
                              {/* <Option value="recurring">Recurring</Option>
                              <Option value="sanitization">Sanitization</Option> */}
                            </>
                          )}
                        </Select>
                      </Form.Item>
                    )}

                    {cfg.sqft && (
                      <Form.Item name="propertySize" label="Property Size (sq ft)" rules={[{ required: true, message: "Enter size" }]}>
                        <Input placeholder="e.g., 1200" />
                      </Form.Item>
                    )}

                    {(cfg.bedrooms || cfg.bathrooms) && (
                      <div className="form-row">
                        {cfg.bedrooms && (
                          <Form.Item name="bedrooms" label="Number of Bedrooms" rules={[{ required: true }]}>
                            <Select placeholder="Select">
                              <Option value={0}>0</Option>
                              <Option value={1}>1</Option>
                              <Option value={2}>2</Option>
                              <Option value={3}>3</Option>
                              <Option value={4}>4+</Option>
                            </Select>
                          </Form.Item>
                        )}

                        {cfg.bathrooms && (
                          <Form.Item name="bathrooms" label="Number of Bathrooms" rules={[{ required: true }]}>
                            <Select placeholder="Select">
                              <Option value={1}>1</Option>
                              <Option value={2}>2</Option>
                              <Option value={3}>3+</Option>
                            </Select>
                          </Form.Item>
                        )}
                      </div>
                    )}

                    {/* <Form.Item name="additional" label="Additional Services">
                      <Checkbox.Group>
                        <div className="checkbox-grid">
                          <Checkbox value="window">Window Cleaning (₹100)</Checkbox>
                          <Checkbox value="balcony">Balcony Cleaning (₹150)</Checkbox>
                          <Checkbox value="carpet">Carpet Cleaning (₹200)</Checkbox>
                          {selectedModule.title.toLowerCase().includes("kitchen") && <Checkbox value="oven">Oven Cleaning (₹300)</Checkbox>}
                        </div>
                      </Checkbox.Group>
                    </Form.Item> */}

                    <div className="form-row">
                      {cfg.preferredDate && (
                        <Form.Item name="preferredDate" label="Preferred Date">
                          <DatePicker className="full-width-datepicker" />
                        </Form.Item>
                      )}

                      <Form.Item name="hours" label="Estimated Hours (optional)">
                        <InputNumber min={1} className="full-width-inputnumber" />
                      </Form.Item>
                    </div>

                    {cfg.instructions && (
                      <Form.Item name="instructions" label="Special Instructions">
                        <TextArea rows={3} placeholder="Any specific requirements..." />
                      </Form.Item>
                    )}
                  </>
                );
              })()}

              <div className="details-actions">
                <Button onClick={handleDetailsCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="black-btn">
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
