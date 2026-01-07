import React from 'react';
import { Row, Col, Card,  } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import '../../../../index.css';

// Import images from assets folder (you can replace these with your own files)
import apartmentImg from '../../../../assets/HomeRental/modernapartment.jpg';
import villaImg from '../../../../assets/HomeRental/villa.jpg';
import houseImg from '../../../../assets/HomeRental/independent.jpg';
// import servicedImg from '../assests/apart.jpg';
// import gardenHouseImg from '../assests/threed.jpg';
// import officeImg from '../assests/office.jpg';

interface PropertyTypePageProps {
  onSelectType?: (typeId: string) => void;
}

const PropertyTypePage: React.FC<PropertyTypePageProps> = ({ onSelectType }) => {
  const handleViewProperties = (typeId: string) => {
    if (onSelectType) {
      onSelectType(typeId);
      return;
    }
  };

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
    <div className="sw-hr-property-type-page">
      <section className="sw-hr-property-type-section">
        <div className="sw-hr-section-header">
          <h1>Select Property Type</h1>
          {/* <p className="sw-hr-section-subtitle">Choose the type of property you're looking for</p> */}
        </div>

        <Row gutter={[24, 24]} className="sw-hr-property-cards">
          {propertyTypes.map((type) => (
            <Col xs={24} sm={12} lg={8} key={type.id}>
              <Card
                hoverable
                className="sw-hr-property-type-card"
                cover={
                  <div className="sw-hr-ptc-image-wrap">
                    <img src={type.image} alt={type.title} className="sw-hr-ptc-image" />
                    <div className="sw-hr-ptc-overlay">
                      <div className="sw-hr-ptc-icon" style={{ backgroundColor: type.color }}>
                        {type.icon}
                      </div>
                    </div>
                    {/* <Button
                      className="sw-hr-ptc-view-btn"
                      onClick={() => handleViewProperties(type.id)}
                    >
                      View Properties
                    </Button> */}
                     <button
                      className="sw-hr-ptc-view-btn"
                      onClick={() => handleViewProperties(type.id)}
                        aria-label={`View ${type.title} properties`}
                    >
                      View Properties
                    </button>
                  </div>
                }
              >
                <div className="sw-hr-ptc-content">
                  <h3 className="sw-hr-ptc-title">{type.title}</h3>
                  <p className="sw-hr-ptc-subtitle">{type.subtitle}</p>
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
