import React, { useState } from 'react';
import { Row, Col, Modal } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import ServiceCard from '../components/ServiceCard';
import PropertyTypePage from './PropertyTypePage';
import CommercialPropertyTypePage from './CommercialPropertyTypePage';
import './ServicesPage.css';

// Import images from assets folder
import houseImg from '../../../../assets/HomeRental/commercial.jpg';
import img from "../../../../assets/HomeRental/House.jpg";
// For multiple images, you can use dynamic imports or create more image files
// For now, using the same image as placeholder - replace with actual images
const commercialImg = houseImg; // Replace with: import commercialImg from '../assets/commercial.jpg';

const ServicesPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'residential' | 'commercial' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <HomeOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className="hero-text">
            <h2>Home & Apartments Rental</h2>
            <p className="muted">2 services available</p>
          </div>
        </div>
      </section>

      <section className="services-grid1">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={12}>
            <ServiceCard
              title="House Rental"
              subtitle="Residential properties for rent"
              image={img}
              onBrowse={() => setActiveModal('residential')}
            />
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <ServiceCard
              title="Commercial Rental"
              subtitle="Commercial spaces for business"
              image={commercialImg}
              onBrowse={() => setActiveModal('commercial')}
            />
          </Col>
        </Row>
      </section>

      <Modal
        open={!!activeModal}
        onCancel={closeModal}
        footer={null}
        width={1000}
        centered
        destroyOnClose
        className="browse-modal"
      >
        {activeModal === 'residential' && <PropertyTypePage />}
        {activeModal === 'commercial' && <CommercialPropertyTypePage />}
      </Modal>
    </div>
  );
};

export default ServicesPage;





