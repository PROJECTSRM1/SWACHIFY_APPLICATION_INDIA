import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Rate,
  Tag,
  // Space,
  Carousel,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './PropertyDetailsPage.css';

// Import images from assets folder (reuse the same ones as listings)
import apartment1Img from '../../../../assets/HomeRental/img.jpg';
import apartment2Img from '../../../../assets/HomeRental/apart.jpg';
import apartment3Img from '../../../../assets/HomeRental/threed.jpg';
import villa1Img from '../../../../assets/HomeRental/villa.jpg';
import villa2Img from '../../../../assets/HomeRental/bedroom.jpg';
import house1Img from '../../../../assets/HomeRental/threed.jpg';
import house2Img from '../../../../assets/HomeRental/bedroom.jpg';
import luxryvillaImg from '../../../../assets/HomeRental/luxrayVilla.jpg';
import commercialImg from '../../../../assets/HomeRental/beautifulkitchen.jpg';
import officeImg from '../../../../assets/HomeRental/moderndining.jpg';
import bathroomimg from "../../../../assets/HomeRental/modernbathroom.jpg";
import bedroomImg from "../../../../assets/HomeRental/classicbedroom.jpg"
import kitchenImg from "../../../../assets/HomeRental/classicbedroom.jpg"
import luxkitchenImg  from "../../../../assets/HomeRental/luxury-modern-white-kitchen.jpg";
import moderbathroomImg from "../../../../assets/HomeRental/smarthometechnology.jpg"
import modernBathroomImg from "../../../../assets/HomeRental/smarthometechnology.jpg"
import villaImg2 from "../../../../assets/HomeRental/VillaLuxury.jpg"

/*Commericial*/
// import opelPlotImg from "../assests/HomeRental/openplot.jpg"


import plot1Img from "../../../../assets/HomeRental/openplot3.jpg";
import plot2Img from "../../../../assets/HomeRental/openplot2.jpg";
import plot3Img from "../../../../assets/HomeRental/openplot3.jpg";
import plot4Img from "../../../../assets/HomeRental/openplot4.png";

import startup1Img from "../../../../assets/HomeRental/startup1.jpg";
import startup2Img from "../../../../assets/HomeRental/startup2.jpg";
import startup3Img from "../../../../assets/HomeRental/startup1.jpg";
import startup4Img from "../../../../assets/HomeRental/startup2.jpg";

import warehouseImg1 from "../../../../assets/HomeRental/warehouse2.jpg";
import warehouseImg2 from "../../../../assets/HomeRental/warehouse3.jpg";
import warehouseImg3 from "../../../../assets/HomeRental/WareHouse.jpg";
import warehouseImg4 from "../../../../assets/HomeRental/openplot3.jpg";


const { TextArea } = Input;
const { Option } = Select;

interface PropertyDetails {
  id: string;
  title: string;
  rating: number;
  location: string;
  beds?: number;
  baths?: number;
  sqft: number;
  furnishing: 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished' | 'Open Plot';
  amenities: string[];
  price: number;
  images: string[];
  description: string;
}

interface PropertyDetailsPageProps {
  propertyId?: string;
  onClose?: () => void;
}

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ propertyId, onClose }) => {
  const [form] = Form.useForm();

  // Details for each property (ids match ApartmentListingsPage)
  const propertiesById: Record<string, PropertyDetails> = {
    'apt-1': {
      id: 'apt-1',
      title: 'Luxury 2 BHK Apartment',
      rating: 4.8,
      location: 'Downtown, City Center',
      beds: 2,
      baths: 2,
      sqft: 1200,
      furnishing: 'Fully Furnished',
      amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Garden'],
      price: 1200,
      images: [apartment1Img, apartment2Img, apartment3Img, luxkitchenImg,moderbathroomImg],
      description: 'A beautiful luxury apartment in the heart of the city with modern amenities.',
    },
    'apt-2': {
      id: 'apt-2',
      title: 'Modern 1 BHK Studio',
      rating: 4.5,
      location: 'Tech Park Area',
      beds: 1,
      baths: 1,
      sqft: 650,
      furnishing: 'Semi Furnished',
      amenities: ['Gym', 'Parking', 'Security'],
      price: 800,
      images: [apartment2Img, apartment1Img,modernBathroomImg],
      description: 'Compact, stylish studio apartment ideal for young professionals.',
    },
    'apt-3': {
      id: 'apt-3',
      title: 'Spacious 3 BHK Penthouse',
      rating: 4.9,
      location: 'Riverside Heights',
      beds: 3,
      baths: 3,
      sqft: 2200,
      furnishing: 'Fully Furnished',
      amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Garden', 'Concierge'],
      price: 2500,
      images: [apartment3Img,bedroomImg,kitchenImg,bathroomimg],
      description: 'Penthouse with panoramic views and premium finishes.',
    },
       'apt-4': {
      id: 'apt-4',
      title: 'Luxury 4 BHK Apartment',
      rating: 4.8,
      location: 'Downtown, City Center',
      beds: 2,
      baths: 2,
      sqft: 1200,
      furnishing: 'Fully Furnished',
      amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Garden'],
      price: 1200,
      images: [apartment1Img, apartment2Img, apartment3Img, luxkitchenImg,moderbathroomImg],
      description: 'A beautiful luxury apartment in the heart of the city with modern amenities.',
    },
    'villa-1': {
      id: 'villa-1',
      title: 'Premium 4 BHK Villa',
      rating: 4.9,
      location: 'Lakeview Community',
      beds: 4,
      baths: 4,
      sqft: 3200,
      furnishing: 'Fully Furnished',
      amenities: ['Private Pool', 'Garden', 'Parking', 'Security'],
      price: 4200,
      images: [villa1Img, luxryvillaImg,commercialImg, apartment3Img],
      description: 'Luxury villa with private pool and lake views.',
    },

    'villa-2': {
      id: 'villa-2',
      title: 'Modern 3 BHK Villa',
      rating: 4.7,
      location: 'Hillside Enclave',
      beds: 3,
      baths: 3,
      sqft: 2600,
      furnishing: 'Semi Furnished',
      amenities: ['Garden', 'Parking', 'Security', 'Club House'],
      price: 3500,
      images: [villa1Img, villa2Img,luxryvillaImg],
      description: 'Contemporary villa in a premium gated community.',
    },
    
    'villa-3': {
      id: 'villa-3',
      title: 'Modern 4 BHK Villa',
      rating: 4.7,
      location: 'River Enclave',
      beds: 3,
      baths: 3,
      sqft: 2600,
      furnishing: 'Semi Furnished',
      amenities: ['Garden', 'Parking', 'Security', 'Club House'],
      price: 3500,
      images: [villa1Img, villa2Img,luxryvillaImg],
      description: 'Contemporary villa in a premium gated community.',
    },
     'villa-4': {
      id: 'villa-4',
      title: 'Modern 2 BHK Villa',
      rating: 4.7,
      location: 'Maldives  Enclave',
      beds: 3,
      baths: 3,
      sqft: 2600,
      furnishing: 'Semi Furnished',
      amenities: ['Garden', 'Parking', 'Security', 'Club House'],
      price: 3500,
      images: [villaImg2,luxryvillaImg,villa1Img],
      description: 'Contemporary villa in a premium gated community.',
    },

    /*Independenthouses*/

    'house-1': {
      id: 'house-1',
      title: ' 1 BHK Independent House',
      rating: 4.6,
      location: 'Green Valley Layout',
      beds: 3,
      baths: 3,
      sqft: 2100,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Garden', 'Security'],
      price: 2200,
      images: [house1Img,house2Img,commercialImg],
      description: 'Spacious independent house with private garden.',
    },
    'house-2': {
      id: 'house-2',
      title: '2 BHK Corner House',
      rating: 4.4,
      location: 'Suburban Residency',
      beds: 2,
      baths: 2,
      sqft: 1600,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Playground', 'Security'],
      price: 1800,
      images: [house2Img, house1Img, officeImg , bathroomimg],
      description: 'Cozy corner house perfect for small families.',
    },
    'house-3': {
      id: 'house-3',
      title: '3 BHK luxury House',
      rating: 4.4,
      location: ' Subbarayapillai Chathiram,Residency',
      beds: 2,
      baths: 2,
      sqft: 1600,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Playground', 'Security'],
      price: 1800,
      images: [house2Img, house1Img, officeImg , bathroomimg],
      description: 'Cozy corner house perfect for small families.',
    },
    // 'house-4': {
    //   id: 'house-4',
    //   title: '2 BHK Modern House',
    //   rating: 4.4,
    //   location: 'Suburban Residency',
    //   beds: 2,
    //   baths: 2,
    //   sqft: 1600,
    //   furnishing: 'Semi Furnished',
    //   amenities: ['Parking', 'Playground', 'Security'],
    //   price: 1800,
    //   images: [house2Img, house1Img, officeImg , bathroomimg],
    //   description: 'Cozy corner house perfect for small families.',
    // },

    // Commercial Properties
    'shop-1': {
      id: 'shop-1',
      title: 'Prime Roadside Shop',
      rating: 4.6,
      location: 'City Market Road',
      sqft: 450,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Storage Room'],
      price: 900,
      images: [startup1Img, startup2Img, startup3Img],
      description: 'Prime location shop perfect for retail business with good footfall.',
    },
    'shop-2': {
      id: 'shop-2',
      title: 'Luxury Retail Showroom',
      rating: 4.8,
      location: 'Mall Commercial Block',
      sqft: 900,
      furnishing: 'Fully Furnished',
      amenities: ['Security', 'AC', 'Parking'],
      price: 2000,
      images:[startup4Img, officeImg, startup3Img],
      description: 'Premium showroom space in a high-end shopping mall.',
    },
     'shop-3': {
      id: 'shop-3',
      title: 'Luxury Retail Showroom',
      rating: 4.8,
      location: 'Mall Commercial Block',
      sqft: 900,
      furnishing: 'Fully Furnished',
      amenities: ['Security', 'AC', 'Parking'],
      price: 2000,
      images: [startup3Img,startup4Img,startup3Img],
      description: 'Premium showroom space in a high-end shopping mall.',
    },
     'shop-4': {
      id: 'shop-4',
      title: 'Luxury Retail Showroom',
      rating: 4.8,
      location: 'Mall Commercial Block',
      sqft: 900,
      furnishing: 'Fully Furnished',
      amenities: ['Security', 'AC', 'Parking'],
      price: 2000,
      images: [startup1Img,startup2Img],
      description: 'Premium showroom space in a high-end shopping mall.',
    },

/*WareHouse*/

    'warehouse-1': {
      id: 'warehouse-1',
      title: 'Large Industrial Warehouse',
      rating: 4.5,
      location: 'Logistics Park Zone',
      sqft: 5000,
      furnishing: 'Unfurnished',
      amenities: ['Parking', 'Security'],
      price: 5000,
      images: [warehouseImg1,warehouseImg4,warehouseImg3],
      description: 'Spacious warehouse ideal for storage and logistics operations.',
    },
    'warehouse-2': {
      id: 'warehouse-2',
      title: 'Medium Storage Warehouse',
      rating: 4.3,
      location: 'City Outskirts',
      sqft: 3000,
      furnishing: 'Unfurnished',
      amenities: ['Loading Dock'],
      price: 3500,
      images: [warehouseImg1,warehouseImg2,warehouseImg3],
      description: 'Medium-sized warehouse with loading dock facilities.',
    },
     'warehouse-3': {
      id: 'warehouse-3',
      title: 'Medium Storage Warehouse',
      rating: 4.3,
      location: 'City Outskirts',
      sqft: 3000,
      furnishing: 'Unfurnished',
      amenities: ['Loading Dock'],
      price: 3500,
      images: [warehouseImg4,warehouseImg3],
      description: 'Medium-sized warehouse with loading dock facilities.',
    },
     'warehouse-4': {
      id: 'warehouse-4',
      title: 'Medium Storage Warehouse',
      rating: 4.3,
      location: 'City Outskirts',
      sqft: 3000,
      furnishing: 'Unfurnished',
      amenities: ['Loading Dock'],
      price: 3500,
      images: [warehouseImg2,warehouseImg1],
      description: 'Medium-sized warehouse with loading dock facilities.',


      /*OpenPlots*/
    },
    'plot-1': {
      id: 'plot-1',
      title: 'Prime Commercial Plot',
      rating: 4.7,
      location: 'Highway Commercial Zone',
      sqft: 10000,
      furnishing: 'Open Plot',
      amenities: ['Road Access', 'Water Connection', 'Electricity'],
      price: 15000,
      images: [plot1Img,plot2Img,plot3Img],
      description: 'Prime commercial plot with all utilities and excellent road connectivity.',
    },
    'plot-2': {
      id: 'plot-2',
      title: 'City Center Plot',
      rating: 4.6,
      location: 'Downtown Business District',
      sqft: 7500,
      furnishing: 'Open Plot',
      amenities: ['Main Road', 'Corner Plot', 'Approved'],
      price: 20000,
      images: [plot2Img,plot4Img],
      description: 'Corner plot in the heart of the business district with all approvals.',
    },
     'plot-3': {
      id: 'plot-3',
      title: 'Prime Commercial Plot',
      rating: 4.7,
      location: 'Highway Commercial Zone',
      sqft: 10000,
      furnishing: 'Open Plot',
      amenities: ['Road Access', 'Water Connection', 'Electricity'],
      price: 15000,
      images: [plot4Img,plot3Img,plot2Img],
      description: 'Prime commercial plot with all utilities and excellent road connectivity.',
    },
     'plot-4': {
      id: 'plot-4',
      title: 'Prime Commercial Plot',
      rating: 4.7,
      location: 'Highway Commercial Zone',
      sqft: 10000,
      furnishing: 'Open Plot',
      amenities: ['Road Access', 'Water Connection', 'Electricity'],
      price: 15000,
      images: [house1Img, house2Img, commercialImg],
      description: 'Prime commercial plot with all utilities and excellent road connectivity.',
    },
  };

  // Fallback to a default property if id is missing or incorrect
  const activePropertyId = propertyId || 'apt-1';
  const property: PropertyDetails =
    (activePropertyId && propertiesById[activePropertyId]) || propertiesById['apt-1'];
  
  // Determine property type for form selection
  const isResidential = property.id.startsWith('apt-') || property.id.startsWith('villa-') || property.id.startsWith('house-');
  const isCommercial = property.id.startsWith('shop-') || property.id.startsWith('warehouse-') || property.id.startsWith('startup-');
  const isOpenPlot = property.id.startsWith('plot-');
  
  const services = [
    {
      title: 'Property Verification',
      description: 'Complete legal and title verification',
    },
    {
      title: 'Move-in Assistance',
      description: 'Help with inspection and handover',
    },
    {
      title: 'Agreement Support',
      description: 'Professional rental agreement preparation',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support throughout tenancy',
    },
  ];

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Your inquiry has been submitted! Our team will contact you within 24 hours.');
    form.resetFields();
  };

  return (
    <div className="property-details-page">
      <div className="pd-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          className="back-btn"
        >
          Back to Listings
        </Button>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          <Card className="pd-details-card">
            <div className="pd-image-wrap">
              <Carousel autoplay dots className="pd-carousel">
                {property.images.map((imgSrc, idx) => (
                  <div key={`${property.id}-img-${idx}`} className="pd-slide">
                    <img src={imgSrc} alt={`${property.title} view ${idx + 1}`} className="pd-image" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="pd-info">
              <div className="pd-title-section">
                <h1 className="pd-title">{property.title}</h1>
                <div className="pd-rating">
                  <Rate disabled defaultValue={property.rating} allowHalf style={{ fontSize: 16 }} />
                  <span className="pd-rating-value">{property.rating}</span>
                </div>
              </div>

              <div className="pd-location">
                <EnvironmentOutlined /> {property.location}
              </div>

              <div className="pd-specs">
                {property.beds && <span>🛏️ {property.beds} Bedrooms</span>}
                {property.baths && <span>🚿 {property.baths} Bathrooms</span>}
                <span><HomeOutlined /> {property.sqft} sq.ft</span>
              </div>

              <div className="pd-furnishing">
                <Tag className={`furnishing-tag ${
                  property.furnishing === 'Fully Furnished' ? 'fully' : 
                  property.furnishing === 'Semi Furnished' ? 'semi' : 
                  property.furnishing === 'Unfurnished' ? 'unfurnished' : 'open-plot'
                }`}>
                  {property.furnishing}
                </Tag>
              </div>

              <div className="pd-amenities-section">
                <h3 className="pd-section-title">Features & Amenities</h3>
                <div className="pd-amenities">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-item">
                      <CheckCircleOutlined className="amenity-check" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pd-services-section">
                <h3 className="pd-section-title">What You Get</h3>
                <div className="pd-services">
                  {services.map((service, idx) => (
                    <div key={idx} className="service-item">
                      <CheckCircleOutlined className="service-check" />
                      <div>
                        <div className="service-title">{service.title}</div>
                        <div className="service-desc">{service.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card className="pd-booking-card">
            <div className="pd-price-display">
              <span className="pd-price">${property.price}</span>
              <span className="pd-price-unit">/month</span>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="booking-form"
            >
              {/* Common Fields */}
              <Form.Item
                name="fullName"
                label={isCommercial || isOpenPlot ? "Full Name / Business Name" : "Full Name"}
                rules={[
                  { required: true, message: 'Please enter your name' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                  { max: 50, message: 'Name must not exceed 50 characters' },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: 'Name can only contain letters and spaces',
                  },
                ]}
              >
                <Input placeholder={isCommercial || isOpenPlot ? "Enter name or business name" : "Enter your name"} size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email format (e.g., user@example.com)',
                  },
                ]}
              >
                <Input placeholder="your@email.com" size="large" type="email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  {
                    pattern: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
                    message: 'Please enter a valid phone number',
                  },
                ]}
              >
                <Input placeholder="+1 (555) 000-0000" size="large" />
              </Form.Item>

              {/* Residential Form Fields */}
              {isResidential && (
                <>
                  <Form.Item
                    name="moveInDate"
                    label="Preferred Move-in Date"
                    rules={[
                      { required: true, message: 'Please select a move-in date' },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve();
                          }
                          const today = dayjs().startOf('day');
                          const selectedDate = dayjs(value).startOf('day');
                          if (selectedDate.isBefore(today)) {
                            return Promise.reject(new Error('Move-in date cannot be in the past'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      size="large"
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      disabledDate={(current) => {
                        return current && current < dayjs().startOf('day');
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="leaseDuration"
                    label="Lease Duration"
                    rules={[
                      { required: true, message: 'Please select lease duration' },
                    ]}
                  >
                    <Select placeholder="Select duration" size="large">
                      <Option value="6">6 Months</Option>
                      <Option value="12">12 Months</Option>
                      <Option value="18">18 Months</Option>
                      <Option value="24">24 Months</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="occupants"
                    label="Number of Occupants"
                    rules={[
                      { required: true, message: 'Please select number of occupants' },
                    ]}
                  >
                    <Select placeholder="Select" size="large">
                      <Option value="1">1 Person</Option>
                      <Option value="2">2 People</Option>
                      <Option value="3">3 People</Option>
                      <Option value="4">4+ People</Option>
                    </Select>
                  </Form.Item>
                </>
              )}

              {/* Commercial Form Fields (Shops, Warehouses) */}
              {isCommercial && (
                <>
                  <Form.Item
                    name="businessType"
                    label="Business Type"
                    rules={[
                      { required: true, message: 'Please select business type' },
                    ]}
                  >
                    <Select placeholder="Select business type" size="large">
                      <Option value="retail">Retail</Option>
                      <Option value="wholesale">Wholesale</Option>
                      <Option value="restaurant">Restaurant/Cafe</Option>
                      <Option value="office">Office Space</Option>
                      <Option value="warehouse">Warehouse/Storage</Option>
                      <Option value="manufacturing">Manufacturing</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="expectedStartDate"
                    label="Expected Start Date"
                    rules={[
                      { required: true, message: 'Please select expected start date' },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve();
                          }
                          const today = dayjs().startOf('day');
                          const selectedDate = dayjs(value).startOf('day');
                          if (selectedDate.isBefore(today)) {
                            return Promise.reject(new Error('Start date cannot be in the past'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      size="large"
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      disabledDate={(current) => {
                        return current && current < dayjs().startOf('day');
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="leaseDuration"
                    label="Lease Duration"
                    rules={[
                      { required: true, message: 'Please select lease duration' },
                    ]}
                  >
                    <Select placeholder="Select duration" size="large">
                      <Option value="6">6 Months</Option>
                      <Option value="12">12 Months</Option>
                      <Option value="24">24 Months</Option>
                      <Option value="36">36 Months</Option>
                      <Option value="60">60 Months (5 Years)</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="businessLicense"
                    label="Business License Number (Optional)"
                    rules={[
                      { max: 50, message: 'License number must not exceed 50 characters' },
                    ]}
                  >
                    <Input placeholder="Enter business license number" size="large" />
                  </Form.Item>
                </>
              )}

              {/* Open Plots Form Fields */}
              {isOpenPlot && (
                <>
                  <Form.Item
                    name="intendedUse"
                    label="Intended Use"
                    rules={[
                      { required: true, message: 'Please select intended use' },
                    ]}
                  >
                    <Select placeholder="Select intended use" size="large">
                      <Option value="commercial-building">Commercial Building</Option>
                      <Option value="residential-complex">Residential Complex</Option>
                      <Option value="mixed-use">Mixed Use Development</Option>
                      <Option value="warehouse">Warehouse/Industrial</Option>
                      <Option value="retail-mall">Retail Mall</Option>
                      <Option value="office-complex">Office Complex</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="expectedPurchaseDate"
                    label="Expected Purchase Date"
                    rules={[
                      { required: true, message: 'Please select expected purchase date' },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve();
                          }
                          const today = dayjs().startOf('day');
                          const selectedDate = dayjs(value).startOf('day');
                          if (selectedDate.isBefore(today)) {
                            return Promise.reject(new Error('Purchase date cannot be in the past'));
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      size="large"
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      disabledDate={(current) => {
                        return current && current < dayjs().startOf('day');
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="budgetRange"
                    label="Budget Range"
                    rules={[
                      { required: true, message: 'Please select budget range' },
                    ]}
                  >
                    <Select placeholder="Select budget range" size="large">
                      <Option value="under-50k">Under $50,000</Option>
                      <Option value="50k-100k">$50,000 - $100,000</Option>
                      <Option value="100k-250k">$100,000 - $250,000</Option>
                      <Option value="250k-500k">$250,000 - $500,000</Option>
                      <Option value="500k-plus">$500,000+</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="developmentPlans"
                    label="Development Plans (Optional)"
                    rules={[
                      { max: 500, message: 'Development plans must not exceed 500 characters' },
                    ]}
                  >
                    <TextArea
                      placeholder="Describe your development plans..."
                      rows={3}
                      size="large"
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>
                </>
              )}

              {/* Common Message Field */}
              <Form.Item
                name="message"
                label="Message (Optional)"
                rules={[
                  { max: 500, message: 'Message must not exceed 500 characters' },
                ]}
              >
                <TextArea
                  placeholder="Any questions or special requirements..."
                  rows={4}
                  size="large"
                  showCount
                  maxLength={500}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="submit-btn"
                >
                  {isOpenPlot ? 'Submit Inquiry' : isCommercial ? 'Request Quote' : 'Schedule Viewing & Add to Cart'}
                </Button>
              </Form.Item>

              <p className="form-note">
                Our team will contact you within 24 hours
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyDetailsPage;