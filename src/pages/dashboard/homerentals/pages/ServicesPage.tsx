import React, { useState } from 'react';
import { Row, Col, Modal } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import ServiceCard from './ServiceCard';
import PropertyTypePage from './PropertyTypePage';
import CommercialPropertyTypePage from './CommercialPropertyTypePage';
import ApartmentListingsPage from './ApartmentListingsPage';
import CommercialListingsPage from './CommercialListingsPage';
import PropertyDetailsPage from './PropertyDetailsPage';
import '../../../../index.css';
// Import images from assets folder
import houseImg from '../../../../assets/HomeRental/commercial.jpg';
import img from "../../../../assets/HomeRental/House.jpg";
// For multiple images, you can use dynamic imports or create more image files
// For now, using the same image as placeholder - replace with actual images
const commercialImg = houseImg; // Replace with: import commercialImg from '../assets/commercial.jpg';

type ServiceModalType = 'residential' | 'commercial' | null;

interface ListingContext {
  category: 'residential' | 'commercial';
  typeId: string;
}

const ServicesPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ServiceModalType>(null);
  const [listingContext, setListingContext] = useState<ListingContext | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const showTypeModal = !!activeModal && !listingContext;
  const showListingsModal = !!listingContext && !selectedPropertyId;
  const showDetailsModal = !!selectedPropertyId;

  const closeAllModals = () => {
    setSelectedPropertyId(null);
    setListingContext(null);
    setActiveModal(null);
  };

  const handleResidentialTypeSelect = (typeId: string) => {
    setListingContext({ category: 'residential', typeId });
  };

  const handleCommercialTypeSelect = (typeId: string) => {
    setListingContext({ category: 'commercial', typeId });
  };

  const handleBackToTypes = () => {
    setSelectedPropertyId(null);
    setListingContext(null);
  };

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  const selectedListingTypeId = listingContext?.typeId;

  return (
    <div className="sw-hr-services-page">
      <section className="sw-hr-services-hero">
        <div className="sw-hr-hero-content">
          <div className="sw-hr-hero-icon">
            <HomeOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className="sw-hr-hero-text">
            <h2>Home & Apartments Rental</h2>
            <p className="sw-hr-muted">2 services available</p>
          </div>
        </div>
      </section>

      <section className="sw-hr-services-grid">
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
        open={showTypeModal}
        onCancel={closeAllModals}
        footer={null}
        width={1000}
        centered
        destroyOnClose
        className="sw-hr-browse-modal"
      >
        {activeModal === 'residential' && (
          <PropertyTypePage onSelectType={handleResidentialTypeSelect} />
        )}
        {activeModal === 'commercial' && (
          <CommercialPropertyTypePage onSelectType={handleCommercialTypeSelect} />
        )}
      </Modal>

      <Modal
        open={showListingsModal}
        onCancel={closeAllModals}
        footer={null}
        width={1100}
        centered
        destroyOnClose
        className="sw-hr-browse-modal"
      >
        {listingContext?.category === 'residential' && selectedListingTypeId && (
          <ApartmentListingsPage
            selectedType={selectedListingTypeId}
            onBack={handleBackToTypes}
            onSelectProperty={handlePropertySelect}
          />
        )}
        {listingContext?.category === 'commercial' && selectedListingTypeId && (
          <CommercialListingsPage
            selectedType={selectedListingTypeId}
            onBack={handleBackToTypes}
            onSelectProperty={handlePropertySelect}
          />
        )}
      </Modal>

      <Modal
        open={showDetailsModal}
        onCancel={() => setSelectedPropertyId(null)}
        footer={null}
        width={1200}
        centered
        destroyOnClose
        className="sw-hr-browse-modal"
      >
        {selectedPropertyId && (
          <PropertyDetailsPage
            propertyId={selectedPropertyId}
            onClose={() => setSelectedPropertyId(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ServicesPage;





