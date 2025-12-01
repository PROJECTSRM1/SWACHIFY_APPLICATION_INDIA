import React, { useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Rate,
  Tag,
  Button,
  Space,
} from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  FilterOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import '../../../../index.css';

// Import Images
import startup1Img from "../../../../assets/HomeRental/startup1.jpg";
import startup2Img from "../../../../assets/HomeRental/startup2.jpg";
import startup3Img from "../../../../assets/HomeRental/startup2.jpg";
import startup4Img from "../../../../assets/HomeRental/office.jpg";


import warehouse1Img from "../../../../assets/HomeRental/WareHouse.jpg";
import warehouse2Img from "../../../../assets/HomeRental/warehouse2.jpg";
import warehouse3Img from "../../../../assets/HomeRental/warehouse3.jpg";
import warehouse4Img from "../../../../assets/HomeRental/warehouse3.jpg";

import plot1Img from "../../../../assets/HomeRental/openplot3.jpg";
import plot2Img from "../../../../assets/HomeRental/openplot2.jpg";
import plot3Img from "../../../../assets/HomeRental/openplot3.jpg";
import plot4Img from "../../../../assets/HomeRental/openplot4.png";

const { Search } = Input;
const { Option } = Select;

interface Property {
  id: string;
  title: string;
  rating: number;
  location: string;
  sqft: number;
  furnishing: string;
  amenities: string[];
  price: number;
  image: string;
}

interface CommercialListingsPageProps {
  selectedType?: string;
  onBack?: () => void;
  onSelectProperty?: (propertyId: string) => void;
}

const CommercialListingsPage: React.FC<CommercialListingsPageProps> = ({
  selectedType,
  onBack,
  onSelectProperty,
}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // -----------------------------
  // COMMERCIAL PROPERTIES
  // -----------------------------

const shopListings: Property[] = [
  {
    id: "shop-1",
    title: "Premium StartUp",
    rating: 4.6,
    location: "City Market Road",
    sqft: 450,
    furnishing: "Semi Furnished",
    amenities: ["Parking", "Storage Room"],
    price: 900,
    image: startup1Img,
  },
  {
    id: "shop-2",
    title: "Budget Showroom",
    rating: 4.8,
    location: "Mall Commercial Block",
    sqft: 900,
    furnishing: "Fully Furnished",
    amenities: ["Security", "AC", "Parking"],
    price: 2000,
    image: startup2Img,
  },
  {
    id: "shop-3",
    title: "Semi-modern Showroom",
    rating: 4.8,
    location: "Mall Commercial Block",
    sqft: 900,
    furnishing: "Fully Furnished",
    amenities: ["Security", "AC", "Parking"],
    price: 2000,
    image: startup3Img,
  },
  {
    id: "shop-4",
    title: "Premium Showroom",
    rating: 4.8,
    location: "Mall Commercial Block",
    sqft: 900,
    furnishing: "Fully Furnished",
    amenities: ["Security", "AC", "Parking"],
    price: 2000,
    image: startup4Img,
  },
];

/*Startup*/
  const startupListings: Property[] = [
    {
      id: "startup-1",
      title: "Premium Co-working Office",
      rating: 4.7,
      location: "TechCity Tower",
      sqft: 1200,
      furnishing: "Fully Furnished",
      amenities: ["Meeting Rooms", "Cafeteria", "Security"],
      price: 3500,
      image: startup1Img,
    },
    {
      id: "startup-2",
      title: "Budget Startup Space",
      rating: 4.2,
      location: "Innovation Hub",
      sqft: 650,
      furnishing: "Semi Furnished",
      amenities: ["WiFi", "Power Backup"],
      price: 1200,
      image: startup2Img,
    },
     {
      id: "startup-3",
      title: "semi-modern Startup Space",
      rating: 4.2,
      location: "Innovation Hub",
      sqft: 650,
      furnishing: "Semi Furnished",
      amenities: ["WiFi", "Power Backup"],
      price: 1200,
      image: startup3Img,
    },
     {
      id: "startup-4",
      title: "premium Startup Space",
      rating: 4.2,
      location: "Innovation Hub",
      sqft: 650,
      furnishing: "Semi Furnished",
      amenities: ["WiFi", "Power Backup"],
      price: 1200,
      image: startup4Img,
    },
  ];

  const warehouseListings: Property[] = [
    {
      id: "warehouse-1",
      title: "Large Industrial Warehouse",
      rating: 4.5,
      location: "Logistics Park Zone",
      sqft: 5000,
      furnishing: "Unfurnished",
      amenities: ["Parking", "Security"],
      price: 5000,
      image: warehouse1Img,
    },
    {
      id: "warehouse-2",
      title: "Medium Storage Warehouse",
      rating: 4.3,
      location: "City Outskirts",
      sqft: 3000,
      furnishing: "Unfurnished",
      amenities: ["Loading Dock"],
      price: 3500,
      image: warehouse2Img,
    },
      {
      id: "warehouse-3",
      title: "Large Storage Warehouse",
      rating: 4.3,
      location: "City Outskirts",
      sqft: 3000,
      furnishing: "Unfurnished",
      amenities: ["Loading Dock"],
      price: 3500,
      image: warehouse3Img,
    },
      {
      id: "warehouse-4",
      title: "Semi Storage Warehouse",
      rating: 4.3,
      location: "City Outskirts",
      sqft: 3000,
      furnishing: "Unfurnished",
      amenities: ["Loading Dock"],
      price: 3500,
      image: warehouse4Img,
    },
  ];



  const openPlotsListings: Property[] = [
    {
      id: "plot-1",
      title: "Prime Commercial Plot",
      rating: 4.7,
      location: "Highway Commercial Zone",
      sqft: 10000,
      furnishing: "Open Plot",
      amenities: ["Road Access", "Water Connection", "Electricity"],
      price: 15000,
      image: plot1Img,
    },
    {
      id: "plot-2",
      title: "City Center Plot",
      rating: 4.6,
      location: "Downtown Business District",
      sqft: 7500,
      furnishing: "Open Plot",
      amenities: ["Main Road", "Corner Plot", "Approved"],
      price: 20000,
      image: plot2Img,
    },
     {
      id: "plot-3",
      title: "City OutSide Plot",
      rating: 4.6,
      location: " Business District",
      sqft: 7500,
      furnishing: "Open Plot",
      amenities: ["Main Road", "Corner Plot", "Approved"],
      price: 20000,
      image: plot3Img,
    },
     {
      id: "plot-4",
      title: "Resdentional Plot",
      rating: 4.6,
      location: "kokapeta Business District",
      sqft: 7500,
      furnishing: "Open Plot",
      amenities: ["Main Road", "Corner Plot", "Approved"],
      price: 20000,
      image: plot4Img,
    },
  ];

  // SELECT LISTING TYPE
  const resolvedType = selectedType || "shops";

  const selectedCategory = useMemo(() => {
    switch (resolvedType) {
      case "shops":
        return "Shops";
      case "startups":
        return "Startups";
      case "warehouses":
        return "Warehouses";
      case "open-plots":
        return "Open Plots";
      default:
        return "Commercial";
    }
  }, [resolvedType]);

  const listingData =
    resolvedType === "shops"
      ? shopListings
      : resolvedType === "startups"
      ? startupListings
      : resolvedType === "warehouses"
      ? warehouseListings
      : resolvedType === "open-plots"
      ? openPlotsListings
      : [];

  // SEARCH & PRICE FILTERS
  const filteredProperties = listingData.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === "low") matchesPrice = p.price < 1000;
    else if (priceFilter === "mid") matchesPrice = p.price >= 1000 && p.price <= 3000;
    else if (priceFilter === "high") matchesPrice = p.price > 3000;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="sw-hr-listings-page">
      {/* HEADER */}
      <div className="sw-hr-listings-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            if (onBack) {
              onBack();
            }
          }}
          className="sw-hr-back-btn"
        >
          {selectedCategory}
        </Button>

        <div className="sw-hr-listings-search-bar">
          <Search
            placeholder="Search by location or property name..."
            prefix={<SearchOutlined />}
            size="large"
            className="sw-hr-search-input"
            allowClear
            onSearch={setSearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />

          <Space>
            <Select
              value={priceFilter}
              onChange={setPriceFilter}
              size="small"
              style={{ width: 150 }}
            >
              <Option value="all">All Prices</Option>
              <Option value="low">Under $1000</Option>
              <Option value="mid">$1000 - $3000</Option>
              <Option value="high">Over $3000</Option>
            </Select>
          </Space>
        </div>
      </div>

      {/* LISTINGS */}
      <Row gutter={[24, 24]}>
        {filteredProperties.map((property) => (
          <Col xs={24} sm={12} lg={12} key={property.id}>
            <Card
              hoverable
              className="sw-hr-property-card"
              cover={
                <div className="sw-hr-pc-image-wrap">
                  <img src={property.image} alt={property.title} className="sw-hr-pc-image" />
                  <Tag className="sw-hr-pc-furnishing-tag">{property.furnishing}</Tag>

                  <Button type="text" icon={<HeartOutlined />} className="sw-hr-pc-favorite-btn" />
                </div>
              }
            >
              <div className="sw-hr-pc-body">
                <div className="sw-hr-pc-header">
                  <h3 className="sw-hr-pc-title">{property.title}</h3>

                  <div className="sw-hr-pc-rating">
                    <Rate disabled defaultValue={property.rating} allowHalf style={{ fontSize: 14 }} />
                    <span className="sw-hr-pc-rating-value">{property.rating}</span>
                  </div>
                </div>

                <div className="sw-hr-pc-location">
                  <EnvironmentOutlined /> {property.location}
                </div>

                <div className="sw-hr-pc-specs">
                  <span>
                    <HomeOutlined /> {property.sqft} sq.ft
                  </span>
                </div>

                <div className="sw-hr-pc-amenities">
                  {property.amenities.map((a, idx) => (
                    <Tag key={idx} className="sw-hr-amenity-tag">
                      {a}
                    </Tag>
                  ))}
                </div>

                <div className="sw-hr-pc-footer">
                  <div className="sw-hr-pc-price">${property.price}/mo</div>

                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      if (onSelectProperty) {
                        onSelectProperty(property.id);
                      }
                    }}
                    className="sw-hr-pc-view-btn"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CommercialListingsPage;
