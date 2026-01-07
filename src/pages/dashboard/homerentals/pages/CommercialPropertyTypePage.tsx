import React from 'react';
import { Row, Col, Card } from 'antd';
import { ShopOutlined, HomeOutlined } from '@ant-design/icons';
import '../../../../index.css';

// Import images from assets folder
import startUpImg from '../../../../assets/HomeRental/startup1.jpg';
import warehouseImg from '../../../../assets/HomeRental/WareHouse.jpg';
import plotImg from '../../../../assets/HomeRental/openplot.jpg';

interface CommercialPropertyTypePageProps {
  onSelectType?: (typeId: string) => void;
}

const CommercialPropertyTypePage: React.FC<CommercialPropertyTypePageProps> = ({ onSelectType }) => {

  const handleViewProperties = (typeId: string) => {
    if (onSelectType) {
      onSelectType(typeId);
      return;
    }
  };

  const commercialPropertyTypes = [
    {
      id: 'startups',
      title: 'StartUp',
      subtitle: 'Retail StartUp and Showrooms for your business',
      image: startUpImg,
      icon: <ShopOutlined />,
      color: '#3b82f6',
    },
    {
      id: 'warehouses',
      title: 'Warehouse',
      subtitle: 'Storage and industrial warehouse spaces',
      image: warehouseImg,
      icon: <HomeOutlined />,
      color: '#8b5cf6',
    },
    {
      id: 'open-plots',
      title: 'Open Plots',
      subtitle: 'Open plots for commercial development',
      image: plotImg,
      icon: <HomeOutlined />,
      color: '#10b981',
    },
  ];

  return (
    <div className="sw-hr-commercial-property-type-page">
      <section className="sw-hr-property-type-section">
        <div className="sw-hr-section-header">
          <h1>Select Commercial Property Type</h1>
          <p className="sw-hr-section-subtitle">Choose the type of commercial property you're looking for</p>
        </div>

        <Row gutter={[24, 24]} className="sw-hr-property-cards">
          {commercialPropertyTypes.map((type) => (
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

export default CommercialPropertyTypePage;
