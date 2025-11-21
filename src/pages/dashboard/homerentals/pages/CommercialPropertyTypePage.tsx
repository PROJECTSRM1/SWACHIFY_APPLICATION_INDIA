import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'antd';
import { ShopOutlined, HomeOutlined } from '@ant-design/icons';
import './CommercialPropertyTypePage.css';

// Import images from assets folder
import shopImg from '../../../../assets/HomeRental/startup1.jpg';
import warehouseImg from '../../../../assets/HomeRental/WareHouse.jpg';
import plotImg from '../../../../assets/HomeRental/openplot.jpg';

const CommercialPropertyTypePage: React.FC = () => {
  const navigate = useNavigate();

  const commercialPropertyTypes = [
    {
      id: 'Startup',
      title: 'StartUp',
      subtitle: 'Retail StartUp and Showrooms for your business',
      image: shopImg,
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
    <div className="commercial-property-type-page">
      <section className="property-type-section">
        <div className="section-header">
          <h1>Select Commercial Property Type</h1>
          <p className="section-subtitle">Choose the type of commercial property you're looking for</p>
        </div>

        <Row gutter={[24, 24]} className="property-cards">
          {commercialPropertyTypes.map((type) => (
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
                      onClick={() => navigate(`/commercial/${type.id}`)}
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

export default CommercialPropertyTypePage;
