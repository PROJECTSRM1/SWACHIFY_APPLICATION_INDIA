import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from 'antd';
import {
  SearchOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  FilterOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import './ApartmentListingsPage.css';

// Import images from assets folder
// Apartments
import apartment1Img from '../../../../assets/HomeRental/img.jpg';
import apartment2Img from '../../../../assets/HomeRental/apart.jpg';
import apartment3Img from '../../../../assets/HomeRental/threed.jpg';
// Villas
import villa1Img from '../../../../assets/HomeRental/villa.jpg';
import villa2Img from '../../../../assets/HomeRental/threed.jpg';
import villaImg2 from '../../../../assets/HomeRental/VillaLuxury.jpg';
import villaImg3 from '../../../../assets/HomeRental/villaModern.jpg';
// Independent houses
import house1Img from '../../../../assets/HomeRental/threed.jpg';
import house2Img from '../../../../assets/HomeRental/apart.jpg';
import houseImg3 from '../../../../assets/HomeRental/livingroom.jpg';
import houseImg4 from '../../../../assets/HomeRental/modernapartment.jpg';
const { Search } = Input;
const { Option } = Select;

interface Property {
  id: string;
  title: string;
  rating: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  furnishing: 'Fully Furnished' | 'Semi Furnished';
  amenities: string[];
  price: number;
  image: string;
}

const ApartmentListingsPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  // Apartments data
  const apartmentProperties: Property[] = [
    {
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
      image: apartment1Img,
    },
    {
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
      image: apartment2Img,
    },
    {
      id: 'apt-3',
      title: 'Luxury 3 BHK Penthouse',
      rating: 4.9,
      location: 'Riverside Heights',
      beds: 3,
      baths: 3,
      sqft: 2200,
      furnishing: 'Fully Furnished',
      amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Garden', 'Concierge'],
      price: 2500,
      image: apartment3Img,
    },
      {
      id: 'apt-4',
      title: 'Spacious 3 BHK Penthouse',
      rating: 4.9,
      location: 'Riverside Heights',
      beds: 3,
      baths: 3,
      sqft: 2200,
      furnishing: 'Fully Furnished',
      amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Garden', 'Concierge'],
      price: 2500,
      image: apartment3Img,
    },
  ];

  // Villas data
  const villaProperties: Property[] = [
    {
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
      image: villa1Img,
    },
    {
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
      image: villa2Img,
    },
    {
      id: 'villa-3',
      title: 'Luxury 2 BHK Villa',
      rating: 4.7,
      location: 'Hyderabad Enclave',
      beds: 3,
      baths: 3,
      sqft: 2600,
      furnishing: 'Semi Furnished',
      amenities: ['Garden', 'Parking', 'Security', 'Club House'],
      price: 3500,
      image: villaImg3,
    },
    {
      id: 'villa-4',
      title: 'Semi-Modern 3 BHK Villa',
      rating: 4.7,
      location: 'Hillside Enclave',
      beds: 3,
      baths: 3,
      sqft: 2600,
      furnishing: 'Semi Furnished',
      amenities: ['Garden', 'Parking', 'Security', 'Club House'],
      price: 3500,
      image: villaImg2,
    },
  ];

  // Independent house data
  const independentHouseProperties: Property[] = [
    {
      id: 'house-1',
      title: '3 BHK Independent House',
      rating: 4.6,
      location: 'Green Valley Layout',
      beds: 3,
      baths: 3,
      sqft: 2100,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Garden', 'Security'],
      price: 2200,
      image: house1Img,
    },
    {
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
      image: house2Img,
    },
      {
      id: 'house-3',
      title: '3 BHK Luxury House',
      rating: 4.4,
      location: 'Suburban Residency',
      beds: 2,
      baths: 2,
      sqft: 1600,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Playground', 'Security'],
      price: 1800,
      image: houseImg3,
    },
      {
      id: 'house-4',
      title: '2 BHK Modern House',
      rating: 4.4,
      location: 'Suburban Residency',
      beds: 2,
      baths: 2,
      sqft: 1600,
      furnishing: 'Semi Furnished',
      amenities: ['Parking', 'Playground', 'Security'],
      price: 1800,
      image: houseImg4,
    },
  ];

  const propertyTypeName =
    type === 'villas'
      ? 'Villas'
      : type === 'independent-house'
      ? 'Independent House'
      : 'Apartments';

  // Choose properties based on selected type
  const allProperties: Property[] =
    type === 'villas'
      ? villaProperties
      : type === 'independent-house'
      ? independentHouseProperties
      : apartmentProperties;

  // Filter properties based on search and price
  const filteredProperties = allProperties.filter((property) => {
    // Search filter - matches title or location (case-insensitive)
    const matchesSearch = searchQuery.trim() === '' || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Price filter
    let matchesPrice = true;
    if (priceFilter === 'low') {
      matchesPrice = property.price < 1000;
    } else if (priceFilter === 'mid') {
      matchesPrice = property.price >= 1000 && property.price <= 2000;
    } else if (priceFilter === 'high') {
      matchesPrice = property.price > 2000;
    }

    return matchesSearch && matchesPrice;
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handlePriceFilterChange = (value: string) => {
    setPriceFilter(value);
  };

  return (
    <div className="listings-page">
      <div className="listings-header">
        <div className="listings-nav">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/property-types')}
            className="back-btn"
          >
            {propertyTypeName}
          </Button>
          <span className="nav-text">{propertyTypeName} - {filteredProperties.length} properties available</span>
        </div>
        <div className="listings-search-bar">
          <Search
            placeholder="Search by location or property name..."
            prefix={<SearchOutlined />}
            size="large"
            className="search-input"
            allowClear
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
          />
          <Space>
            <Button icon={<FilterOutlined />} size="large">Filter</Button>
            <Select 
              value={priceFilter}
              onChange={handlePriceFilterChange}
              size="large" 
              style={{ width: 150 }}
            >
              <Option value="all">All Prices</Option>
              <Option value="low">Under $1000</Option>
              <Option value="mid">$1000 - $2000</Option>
              <Option value="high">Over $2000</Option>
            </Select>
          </Space>
        </div>
      </div>

      <div className="listings-content">
        {filteredProperties.length === 0 ? (
          <div className="no-results">
            <p>No properties found matching your criteria.</p>
            <Button onClick={() => { setSearchQuery(''); setPriceFilter('all'); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredProperties.map((property) => (
            <Col xs={24} sm={12} lg={12} key={property.id}>
              <Card
                hoverable
                className="property-card"
                cover={
                  <div className="pc-image-wrap">
                    <img src={property.image} alt={property.title} className="pc-image" />
                    <Tag
                      className={`pc-furnishing-tag ${property.furnishing === 'Fully Furnished' ? 'fully' : 'semi'}`}
                    >
                      {property.furnishing}
                    </Tag>
                    <Button
                      type="text"
                      icon={<HeartOutlined />}
                      className="pc-favorite-btn"
                    />
                  </div>
                }
              >
                <div className="pc-body">
                  <div className="pc-header">
                    <h3 className="pc-title">{property.title}</h3>
                    <div className="pc-rating">
                      <Rate disabled defaultValue={property.rating} allowHalf style={{ fontSize: 14 }} />
                      <span className="pc-rating-value">{property.rating}</span>
                    </div>
                  </div>

                  <div className="pc-location">
                    <EnvironmentOutlined /> {property.location}
                  </div>

                  <div className="pc-specs">
                    <span>🛏️ {property.beds} Beds</span>
                    <span>🚿 {property.baths} Baths</span>
                    <span><HomeOutlined /> {property.sqft} sq.ft</span>
                  </div>

                  <div className="pc-amenities">
                    {property.amenities.slice(0, 4).map((amenity, idx) => (
                      <Tag key={idx} className="amenity-tag">{amenity}</Tag>
                    ))}
                    {property.amenities.length > 4 && (
                      <Tag className="amenity-tag more">+{property.amenities.length - 4} more</Tag>
                    )}
                  </div>

                  <div className="pc-footer">
                    <div className="pc-price">${property.price}/mo</div>
                    <Button
                      type="primary"
                      onClick={() => navigate(`/property/${property.id}`)}
                      className="pc-view-btn"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default ApartmentListingsPage;

