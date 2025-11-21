import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './PropertyTypePage.css';

// Import images from assets folder (you can replace these with your own files)
import apartmentImg from '../../../../assets/HomeRental/modernapartment.jpg';
import villaImg from '../../../../assets/HomeRental/villa.jpg';
import houseImg from '../../../../assets/HomeRental/independent.jpg';
// import servicedImg from '../assests/apart.jpg';
// import gardenHouseImg from '../assests/threed.jpg';
// import officeImg from '../assests/office.jpg';

const PropertyTypePage: React.FC = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    {
      id: 'apartments',
      title: 'Apartments',
      subtitle: 'Modern apartments with premium amenities',
      image: apartmentImg,
      icon: <HomeOutlined />,
      color: '#3b82f6',
    },
    {
      id: 'villas',
      title: 'Villas',
      subtitle: 'Luxurious villas with spacious layouts',
      image: villaImg,
      icon: <HomeOutlined />,
      color: '#8b5cf6',
    },
    {
      id: 'independent-house',
      title: 'Independent House',
      subtitle: 'Standalone houses with privacy and space',
      image: houseImg,
      icon: <HomeOutlined />,
      color: '#10b981',
    },
  ];

  return (
    <div className="property-type-page">
      <section className="property-type-section">
        <div className="section-header">
          <h1>Select Property Type</h1>
          {/* <p className="section-subtitle">Choose the type of property you're looking for</p> */}
        </div>

        <Row gutter={[24, 24]} className="property-cards">
          {propertyTypes.map((type) => (
            <Col xs={24} sm={12} lg={8} key={type.id}>
              <Card
                hoverable
                className="property-type-card"
                cover={
                  <div className="ptc-image-wrap">
                    <img src={type.image} alt={type.title} className="ptc-image" />
                    <div className="ptc-overlay">
                      <div className="ptc-icon" style={{ backgroundColor: type.color }}>
                        {type.icon}
                      </div>
                    </div>
                    <Button
                      className="ptc-view-btn"
                      onClick={() => navigate(`/listings/${type.id}`)}
                    >
                      View Properties
                    </Button>
                  </div>
                }
              >
                <div className="ptc-content">
                  <h3 className="ptc-title">{type.title}</h3>
                  <p className="ptc-subtitle">{type.subtitle}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

    </div>
  );
};

export default PropertyTypePage;
