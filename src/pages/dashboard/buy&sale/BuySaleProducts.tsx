import React, { useState, useMemo, useCallback } from 'react';
import { useCart } from '../../../context/CartContext';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  message,
  List,
  Space,
  Modal,
  Tag,
  Upload,
  Divider,
  Alert,
} from 'antd';
import type { FormProps, UploadFile, UploadProps } from 'antd';

import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  RiseOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  EyeOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';

// import './BuySaleProducts.css';
import Lakehouse from '../../../assets/buyandsale/Lakehouse.png';
import Vintagev from '../../../assets/buyandsale/Vintage_house.png';
import BuySaleImage from '../../../assets/buyandsale/buySale-real-estate.png';
import RetailImage from '../../../assets/buyandsale/old_retail.png';
import OnlineImage from '../../../assets/buyandsale/onlineordering.png';
import WholesaleImage from '../../../assets/buyandsale/wholesale_buynear.png';
import SkyImage from '../../../assets/buyandsale/sky_scrapper.png';
import Modern from '../../../assets/buyandsale/modern_house.png';
import Land from '../../../assets/buyandsale/Land_For_sale.png';
import CustomerRecords from '../../../assets/buyandsale/customerrecords.png';
import a from '../../../assets/buyandsale/A.png';
import b from '../../../assets/buyandsale/B.png';
import c from '../../../assets/buyandsale/C.png';
import d from '../../../assets/buyandsale/D.png';
import e from '../../../assets/buyandsale/E.png';
import f from '../../../assets/buyandsale/suppliercordination.png';
import ServicesPage from '../homerentals/pages/ServicesPage';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

/* ---------- helpers ---------- */

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

/* ---------- types ---------- */

interface Subservice {
  key: string;
  title: string;
  description: string;
  contentComponent: React.FC<any>;
  imagePath: string;
}

interface Service {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imagePath: string;
  subservices: Subservice[];
}

interface PropertyListing {
  id: number;
  title: string;
  listingType: 'sale' | 'purchase';
  price: number;
  area: number;
  location: string;
  tags: string[];
  roi: string;
  imagePath: string;
  propertyType: string;
  description?: string;
}

interface PropertyListingViewProps {
  defaultListingType: 'sale' | 'purchase';
  onViewDetails: (property: PropertyListing) => void;
}

interface ContentComponentProps {
  defaultListingType?: 'sale' | 'purchase';
  onViewDetails?: (property: PropertyListing) => void;
}

interface PropertyDetailViewProps {
  property: PropertyListing;
  onOpenDocVerify: () => void;
}


interface PropertyFormValues {
  propertyType: string;
  listingType: 'sale' | 'purchase';
  title: string;
  price: number;
  area: number;
  location: string;
  description: string;
  tags?: string;
  roi?: string;
  image: UploadFile[];
}

interface PriceNegotiationFormValues {
  name?: string;
  email?: string;
  phone?: string;
  currentMarketPrice?: number;
  predictedMarketPrice?: number;
  currentAskingPrice?: number;
  offerPrice?: number;
  negotiationMessage?: string;
}

interface DocumentationFormValues {
  docType?: string;
  docNumber?: string;
  verificationStatus?: string;
  notes?: string;
}

/* ---------- mock data (amounts now interpreted as INR) ---------- */

const MOCK_PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: 1,
    title: 'Prime Commercial Plot - City Center',
    listingType: 'sale',
    price: 25000000, // ₹2.5 Cr
    area: 5000,
    location: 'Business District, Mumbai',
    tags: ['Corner Plot', 'High Visibility', 'Metro Access', 'Utilities Ready'],
    roi: '15–18% per annum',
    imagePath: SkyImage,
    propertyType: 'Retail/Office',
    description:
      'Premium 5,000 sq.ft. commercial plot at the heart of the business district. Ideal for high-street retail or multi-storey office development.',
  },
  {
    id: 2,
    title: 'Industrial Plot - Warehouse Zone',
    listingType: 'sale',
    price: 18000000, // ₹1.8 Cr
    area: 10000,
    location: 'Industrial Area, Pune',
    tags: ['Highway Access', 'Loading Docks', 'Large Space', 'Fenced'],
    roi: '12–15% per annum',
    imagePath: Land,
    propertyType: 'Warehouse/Industrial',
    description:
      '10,000 sq.ft. industrial land with excellent highway connectivity. Perfect for large warehousing and logistics hubs with overall fencing.',
  },
  {
    id: 3,
    title: 'Office Complex Plot',
    listingType: 'sale',
    price: 42000000, // ₹4.2 Cr
    area: 8000,
    location: 'Financial District, Bengaluru',
    tags: ['Premium Location', 'High-rise Approved', 'Transit Hub', 'Featured'],
    roi: '20–25% per annum',
    imagePath: SkyImage,
    propertyType: 'Office',
    description:
      '8,000 sq.ft. office plot in a prime financial corridor, with approvals for high-rise corporate development and strong rental demand.',
  },
  {
    id: 5,
    title: 'Boutique Hotel Development Land',
    listingType: 'purchase',
    price: 15000000,
    area: 5000,
    location: 'Beachfront Area, Goa',
    tags: ['High Tourist Footfall', 'Sea Facing'],
    roi: '18–20% per annum',
    imagePath: Land,
    propertyType: 'Land/Commercial',
    description:
      'Requirement for a 5,000 sq.ft. sea-facing commercial plot in Goa suitable for boutique hotel development.',
  },
  {
    id: 6,
    title: 'Luxury Hillside Villa',
    listingType: 'purchase',
    price: 9500000,
    area: 3200,
    location: 'Hillside, Lonavala',
    tags: ['Scenic View', 'Private Pool', 'Rental Ready'],
    roi: '10–14% per annum',
    imagePath: Lakehouse,
    propertyType: 'Residential/Holiday',
    description:
      'Looking for a fully furnished 3,200 sq.ft. luxury villa with pool and valley view for both self-use and short-stay rental.',
  },
  {
    id: 7,
    title: 'Heritage Bungalow',
    listingType: 'purchase',
    price: 12000000,
    area: 4500,
    location: 'Central, Chennai',
    tags: ['Heritage Charm', 'Renovated', 'Garden'],
    roi: 'N/A (Self Use)',
    imagePath: Vintagev,
    propertyType: 'Residential',
    description:
      'Buyer requirement for a renovated 4,500 sq.ft. heritage bungalow with garden in a well-connected central location.',
  },
  {
    id: 8,
    title: 'Corporate Office Tower Floor',
    listingType: 'purchase',
    price: 38000000,
    area: 7500,
    location: 'IT Park, Gurugram',
    tags: ['Grade-A Tower', 'Metro Access', 'High Security'],
    roi: '16–19% per annum',
    imagePath: SkyImage,
    propertyType: 'Office',
    description:
      'Corporate client seeking a full floor (approx. 7,500 sq.ft.) in a Grade-A IT tower with excellent connectivity.',
  },
];

/* ---------- property card ---------- */

const PropertyCard: React.FC<{
  property: PropertyListing;
  onViewDetails: (property: PropertyListing) => void;
}> = ({ property, onViewDetails }) => {
  const imagePath = property.imagePath;

  return (
    <Card
      hoverable
      className="swc-bs-service-card-main swc-bs-property-card"
      cover={
        <div
          className="swc-bs-service-card-image"
          style={{ backgroundImage: `url(${imagePath})` }}
        />
      }
    >
      <Card.Meta
        title={<span className="swc-bs-service-card-title">{property.title}</span>}
        description={
          <Space direction="vertical" style={{ width: '100%' }}>
            <div className="swc-bs-property-card-content-wrapper">
              <Text type="secondary" className="swc-bs-text-with-icon-align">
                <EnvironmentOutlined /> {property.location}
              </Text>
              <Title level={4} className="swc-bs-price-title">
                {formatINR(property.price)}
              </Title>
              <Text type="secondary">
                {property.area} sq.ft • Type: {property.propertyType}
              </Text>
              <Space size={[0, 8]} wrap className="swc-bs-tags-space-top">
                {property.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
              <Text className="swc-bs-roi-text">
                <RiseOutlined /> {property.roi}
              </Text>
              <Text className="swc-bs-property-card-description">
                {property.description}
              </Text>
            </div>

            <Space className="swc-bs-button-group-space-top" wrap>
              <Button
                size="middle"
                className="swc-bs-buy_sale_view_btn"
                onClick={() => onViewDetails(property)}
              >
                View Details
              </Button>
            </Space>
          </Space>
        }
      />
    </Card>
  );
};



/* ---------- price negotiation (INR) ---------- */

const PriceNegotiationContent: React.FC<ContentComponentProps & { currentPrice: number; property: PropertyListing  }> = ({
  currentPrice,
  property,
}) => {
  const [form] = Form.useForm<PriceNegotiationFormValues>();

   const { addToCart } = useCart();

  const handleAddToCart = () => {
  addToCart({
    id: property.id,
    title: property.title,
    price: property.price,
    quantity: 1,
    image: property.imagePath,

    totalPrice: Number(property.price),   // or computed

    customerName: "",
    deliveryType: "",
    deliveryDate: "",
    contact: "",
    address: "",
    instructions: "",
  });

  message.success('Property added to cart');
};


  const [priceComparison, setPriceComparison] = useState<{
    diff: number;
    percentDiff: number;
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
  } | null>(null);

  const [offerAnalysis, setOfferAnalysis] = useState<{
    diff: number;
    percentDiff: number;
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
  } | null>(null);

  const analyzeOffer = (values: PriceNegotiationFormValues) => {
    const asking = values.currentAskingPrice || currentPrice;
    const offer = values.offerPrice;

    if (!asking || !offer) {
      setOfferAnalysis(null);
      return;
    }

    const diff = offer - asking;
    const percentDiff = (diff / asking) * 100;
    const absPercent = Math.abs(percentDiff);

    let messageText = '';
    let type: 'success' | 'warning' | 'error' | 'info' = 'info';

    if (percentDiff === 0) {
      messageText = 'Your offer matches the asking price exactly.';
      type = 'info';
    } else if (percentDiff < 0) {
      if (absPercent <= 3) {
        messageText = `Your offer is about ${absPercent.toFixed(
          1,
        )}% below asking – a small, reasonable discount.`;
        type = 'success';
      } else if (absPercent <= 10) {
        messageText = `Your offer is ${absPercent.toFixed(
          1,
        )}% below asking – within a typical negotiation band. Expect a counter-offer.`;
        type = 'warning';
      } else {
        messageText = `Your offer is ${absPercent.toFixed(
          1,
        )}% below asking – this may be treated as a very aggressive offer unless the property is clearly overpriced.`;
        type = 'error';
      }
    } else {
      if (percentDiff <= 3) {
        messageText = `Your offer is ${percentDiff.toFixed(
          1,
        )}% above asking – useful in highly competitive markets.`;
        type = 'warning';
      } else {
        messageText = `Your offer is ${percentDiff.toFixed(
          1,
        )}% above asking – double-check that you are not overpaying.`;
        type = 'error';
      }
    }

    setOfferAnalysis({ diff, percentDiff, message: messageText, type });
  };

  const handleCompareClick = async () => {
    try {
      await form.validateFields(['predictedMarketPrice']);
      const current = form.getFieldValue('currentMarketPrice') || currentPrice;
      const predicted = form.getFieldValue('predictedMarketPrice');

      if (!current || !predicted) return;

      if (predicted <= 0) {
        message.error('Predicted market price must be greater than zero.');
        return;
      }

      const maxAllowed = current * 1.5;
      const minAllowed = current * 0.5;
      if (predicted > maxAllowed || predicted < minAllowed) {
        message.error(
          'Predicted price is more than ±50% away from current price. Please re-check the number.',
        );
        setPriceComparison(null);
        return;
      }

      const diff = predicted - current;
      const percentDiff = (diff / current) * 100;
      const absPercent = Math.abs(percentDiff);

      let messageText = '';
      let type: 'success' | 'warning' | 'error' | 'info' = 'info';

      if (absPercent < 5) {
        messageText = 'Predicted price is well aligned with current market value (within ±5%).';
        type = 'success';
      } else if (absPercent < 15) {
        messageText =
          diff > 0
            ? 'Property looks moderately under-priced (5–15% below your prediction).'
            : 'Property looks moderately over-priced (5–15% above your prediction).';
        type = 'warning';
      } else {
        messageText =
          diff > 0
            ? 'Property appears significantly under-priced (>15% below). Validate with more comps.'
            : 'Property appears significantly over-priced (>15% above). Negotiate strongly or reassess.';
        type = 'error';
      }

      setPriceComparison({ diff, percentDiff, message: messageText, type });
      message.success('Price comparison completed.');
    } catch {
      /* AntD validation already shows errors */
    }
  };

  const onSubmit: FormProps<PriceNegotiationFormValues>['onFinish'] = (values) => {
    analyzeOffer(values);
    message.success('Your enquiry and offer have been submitted!');
    console.log('Contact & negotiation form submitted:', values);
  };

  return (
    <div className="swc-bs-detail-form-container">
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        className="swc-bs-form-content-spacing"
        initialValues={{
          currentMarketPrice: currentPrice,
          currentAskingPrice: currentPrice,
        }}
        onValuesChange={(_, allValues) =>
          analyzeOffer(allValues as PriceNegotiationFormValues)
        }
      >
        {/* contact details */}
        <Title level={4} className="swc-bs-detail-section-title">
          <UserOutlined /> Contact Details
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item<PriceNegotiationFormValues>
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item<PriceNegotiationFormValues>
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input placeholder="Enter your email address" prefix={<MailOutlined />} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item<PriceNegotiationFormValues>
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input placeholder="Enter your phone number" prefix={<PhoneOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {/* price comparison */}
        <Title level={4} className="swc-bs-detail-section-title">
          <DollarOutlined /> Price Comparison Tool
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues>
              name="currentMarketPrice"
              label="Current Market Price (₹)"
            >
              <Input type="number" prefix="₹" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues>
              name="predictedMarketPrice"
              label="Predicted Market Price (₹)"
              rules={[
                { required: true, message: 'Please enter predicted market price' },
                {
                  validator: (_, value) => {
                    if (value == null || value === '') return Promise.resolve();
                    if (value <= 0)
                      return Promise.reject(
                        new Error('Predicted market price must be greater than zero.'),
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" prefix="₹" placeholder="e.g. 26000000" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Button type="default" onClick={handleCompareClick}>
              Analyse Comparison
            </Button>
          </Col>
          {priceComparison && (
            <Col xs={24}>
              <Alert
                showIcon
                type={priceComparison.type}
                message={
                  <>
                    <div>{priceComparison.message}</div>
                    <div className="swc-bs-alert-extra-line">
                      Difference:{' '}
                      <b>
                        {priceComparison.diff >= 0 ? '+' : '-'}
                        {formatINR(Math.abs(priceComparison.diff))}
                      </b>{' '}
                      (
                      {`${priceComparison.diff >= 0 ? '+' : '-'}${Math.abs(
                        priceComparison.percentDiff,
                      ).toFixed(2)}%`}{' '}
                      vs. current price)
                    </div>
                  </>
                }
              />
            </Col>
          )}
        </Row>

        <Divider />

        {/* negotiation offer */}
        <Title level={4} className="swc-bs-detail-section-title">
          <RiseOutlined /> Negotiation Offer
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues>
              name="currentAskingPrice"
              label="Current Asking Price (₹)"
            >
              <Input type="number" prefix="₹" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues>
              name="offerPrice"
              label="Your Offer (₹)"
              rules={[{ required: true, message: 'Please enter your offer price' }]}
            >
              <Input type="number" prefix="₹" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item<PriceNegotiationFormValues>
              name="negotiationMessage"
              label="Negotiation Message"
            >
              <TextArea
                rows={3}
                placeholder="Share your expectations, payment timeline, or any conditions…"
              />
            </Form.Item>
          </Col>
          {offerAnalysis && (
            <Col xs={24}>
              <Alert
                showIcon
                type={offerAnalysis.type}
                message={
                  <>
                    <div>{offerAnalysis.message}</div>
                    <div className="swc-bs-alert-extra-line">
                      Difference:{' '}
                      <b>
                        {offerAnalysis.diff >= 0 ? '+' : '-'}
                        {formatINR(Math.abs(offerAnalysis.diff))}
                      </b>{' '}
                      (
                      {`${offerAnalysis.diff >= 0 ? '+' : '-'}${Math.abs(
                        offerAnalysis.percentDiff,
                      ).toFixed(2)}%`}{' '}
                      vs. asking price)
                    </div>
                  </>
                }
              />
            </Col>
          )}
        </Row>

        <Button size="middle" onClick={handleAddToCart}>
                Add to Cart
              </Button>
      </Form>
    </div>
  );
};

/* ---------- document verification ---------- */

const DocumentationContent: React.FC<ContentComponentProps> = () => {
  const onUpload: FormProps<DocumentationFormValues>['onFinish'] = () => {
    message.success('Document uploaded for verification!');
  };

  return (
    <Form layout="vertical" onFinish={onUpload}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item<DocumentationFormValues>
            name="docType"
            label="Document Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Option value="deed">Title Deed</Option>
              <Option value="survey">Survey Report</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item<DocumentationFormValues>
            name="verificationStatus"
            label="Status"
          >
            <Select placeholder="Select status">
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="documentFile"
            label="Upload File"
            rules={[{ required: true }]}
          >
            <Input type="file" />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit">
        Upload Document
      </Button>
    </Form>
  );
};

/* ---------- property detail view ---------- */

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onOpenDocVerify,
}) => {
  return (
    <div className="swc-bs-detail-view-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <div
            className="swc-bs-service-card-image swc-bs-property-detail-image"
            style={{ backgroundImage: `url(${property.imagePath})` }}
          />
          <Title level={4} className="swc-bs-price-title">
            {formatINR(property.price)}
          </Title>
          <Text type="secondary" className="swc-bs-text-with-icon-align">
            <EnvironmentOutlined /> {property.location}
          </Text>
          <Text type="secondary" className="swc-bs-detail-meta-line">
            {property.area} sq.ft • Type: {property.propertyType}
          </Text>
          <Text className="swc-bs-roi-text">
            <RiseOutlined /> {property.roi}
          </Text>

          <Divider orientation="left">Description</Divider>
          <Text className="swc-bs-detail-description">
            {property.description || 'No detailed description provided.'}
          </Text>

          <Divider orientation="left">Next Steps</Divider>
          <Button
            type="default"
            size="middle"
            icon={<FileTextOutlined />}
            onClick={onOpenDocVerify}
          >
            Start Document Verification
          </Button>
        </Col>

        <Col xs={24} lg={14}>
          <Divider orientation="left">
  <EyeOutlined /> Price Analysis & Negotiation
</Divider>
<PriceNegotiationContent currentPrice={property.price} property={property} />

        </Col>
      </Row>
    </div>
  );
};

/* ---------- property listing view ---------- */

const PropertyListingView: React.FC<PropertyListingViewProps> = ({
  defaultListingType,
  onViewDetails,
}) => {
  const [listings, setListings] = useState<PropertyListing[]>(
    MOCK_PROPERTY_LISTINGS.filter((l) => l.listingType === defaultListingType),
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm<PropertyFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [newPropertyImage, setNewPropertyImage] = useState<string | null>(null);

  const normFile = (e: any) => (Array.isArray(e) ? e : e && e.fileList);

  const handleFileChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const reader = new FileReader();
      reader.onload = () => setNewPropertyImage(reader.result as string);
      reader.readAsDataURL(newFileList[0].originFileObj as File);
    } else {
      setNewPropertyImage(null);
    }
  };

  const onFinish: FormProps<PropertyFormValues>['onFinish'] = (values) => {
    const newListing: PropertyListing = {
      id: Date.now(),
      title: values.title,
      listingType: values.listingType,
      price: values.price,
      area: values.area,
      location: values.location,
      tags: values.tags
        ? values.tags.split(',').map((tag) => tag.trim())
        : ['New Listing', 'User Added'],
      roi: values.roi || 'TBD',
      imagePath:
        newPropertyImage || (defaultListingType === 'sale' ? Modern : SkyImage),
      propertyType: values.propertyType,
      description: values.description,
    };

    setListings((prev) => [newListing, ...prev]);
    message.success(
      `${defaultListingType === 'sale' ? 'Sale' : 'Purchase'} listing added successfully!`,
    );
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
    setNewPropertyImage(null);
  };

  // const handleOpenModal = () => {
  //   setIsModalVisible(true);
  //   form.setFieldsValue({
  //     listingType: defaultListingType,
  //     title: '',
  //     price: undefined,
  //     area: undefined,
  //     location: '',
  //     tags: '',
  //     roi: '',
  //     image: [],
  //     propertyType: undefined,
  //     description: '',
  //   });
  //   setFileList([]);
  //   setNewPropertyImage(null);
  // };

  return (
    <>
      <div className="swc-bs-listing-view-header">
        <span className="swc-bs-listing-view-header-title">
          {defaultListingType === 'sale'
            ? 'Featured Properties for Sale'
            : 'Buyer Requirements (Purchase)'}
        </span>
        {/* <Button type="primary" onClick={handleOpenModal}>
          Add Property
        </Button> */}
      </div>

      <List
        grid={{ gutter: 20, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
        dataSource={listings}
        renderItem={(item) => (
          <List.Item>
            <PropertyCard property={item} onViewDetails={onViewDetails} />
          </List.Item>
        )}
        locale={{
          emptyText: (
            <Text type="secondary">
              No listings found. Be the first to add one!
            </Text>
          ),
        }}
        className="swc-bs-form-content-spacing"
      />

      <Modal
        title={`Add Property Listing (${defaultListingType === 'sale' ? 'For Sale' : 'For Purchase'})`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ listingType: defaultListingType }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item name="title" label="Property Title" rules={[{ required: true }]}>
                <Input placeholder="Enter property title" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="propertyType"
                label="Property Type"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select type">
                  <Option value="Retail/Office">Retail/Office</Option>
                  <Option value="Warehouse/Industrial">Warehouse/Industrial</Option>
                  <Option value="Office">Office</Option>
                  <Option value="Retail">Retail</Option>
                  <Option value="land">Land</Option>
                  <Option value="house">House</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="listingType"
                label="Listing For"
                rules={[{ required: true }]}
              >
                <Select disabled>
                  <Option value="sale">For Sale</Option>
                  <Option value="purchase">Want to Purchase</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="price" label="Price (₹)" rules={[{ required: true }]}>
                <Input type="number" prefix="₹" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="area"
                label="Area (sq.ft)"
                rules={[{ required: true }]}
              >
                <Input type="number" suffix="sq.ft" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true }]}
              >
                <Input placeholder="e.g., City, State, or Locality" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="tags" label="Tags (comma-separated)">
                <Input placeholder="e.g., Corner Plot, Near Metro, Parking" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="roi" label="Expected ROI (Optional)">
                <Input placeholder="e.g., 15–18% per annum" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="image"
                label="Property Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".png,.jpg,.jpeg"
                >
                  {fileList.length < 1 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="description" label="Short Description">
                <TextArea
                  rows={3}
                  placeholder="Summarise highlights, connectivity, approvals, etc."
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit Listing
          </Button>
        </Form>
      </Modal>
    </>
  );
};

/* ---------- other subservice content ---------- */

const PropertyListingSaleContent: React.FC<
  ContentComponentProps & { onViewDetails: (property: PropertyListing) => void }
> = ({ onViewDetails }) => (
  <PropertyListingView defaultListingType="sale" onViewDetails={onViewDetails} />
);

const PropertyListingPurchaseContent: React.FC<
  ContentComponentProps & { onViewDetails: (property: PropertyListing) => void }
> = ({ onViewDetails }) => (
  <PropertyListingView defaultListingType="purchase" onViewDetails={onViewDetails} />
);

const RetailInStoreContent: React.FC<ContentComponentProps> = () => (
  <Form
    layout="vertical"
    className="swc-bs-form-content-spacing"
    onFinish={() => message.success('Sale recorded successfully!')}
  >
    <Form.Item label="Bill Amount (₹)">
      <Input placeholder="Enter sale amount" prefix="₹" type="number" />
    </Form.Item>
    <Form.Item label="Item Details">
      <TextArea rows={2} placeholder="Description of items sold…" />
    </Form.Item>
    <Button type="primary" htmlType="submit">
      Complete Sale
    </Button>
  </Form>
);

const RetailInventoryContent: React.FC<ContentComponentProps> = () => (
  <Form
    layout="vertical"
    className="swc-bs-form-content-spacing"
    onFinish={() => message.success('Inventory updated!')}
  >
    <Form.Item label="Product SKU">
      <Input placeholder="Enter product SKU" />
    </Form.Item>
    <Form.Item label="Stock Change">
      <Input type="number" placeholder="+ / − quantity" />
    </Form.Item>
    <Form.Item label="Customer ID (optional)">
      <Input placeholder="If linked to a customer" />
    </Form.Item>
    <Button type="primary" htmlType="submit" className="swc-bs-button-spacer-right">
      Update Stock
    </Button>
    <Button>Fetch Purchase History</Button>
  </Form>
);

const OnlineCheckoutContent: React.FC<ContentComponentProps> = () => (
  <Input placeholder="Default shipping rate (₹) – flat fee" className="swc-bs-width-100" />
);

const OnlineCatalogContent: React.FC<ContentComponentProps> = () => (
  <TextArea
    rows={3}
    placeholder="Product SEO description, keywords and highlights…"
  />
);

const OnlinePaymentContent: React.FC<ContentComponentProps> = () => (
  <Input placeholder="Payment gateway API key" />
);

const OnlineDeliveryContent: React.FC<ContentComponentProps> = () => (
  <Select placeholder="Select courier / delivery partner" className="swc-bs-width-100">
    <Option value="local">Local Express</Option>
    <Option value="national">National Courier</Option>
  </Select>
);

const OnlineOffersContent: React.FC<ContentComponentProps> = () => (
  <Input placeholder="Coupon Code (e.g., FESTIVE10)" />
);

const WholesaleBulkContent: React.FC<ContentComponentProps> = () => (
  <Form
    layout="vertical"
    className="swc-bs-form-content-spacing"
    onFinish={() => message.success('Bulk order captured!')}
  >
    <Form.Item label="Item / SKU">
      <Input placeholder="Bulk item SKU or description" />
    </Form.Item>
    <Form.Item label="Order Quantity">
      <Input type="number" placeholder="e.g. 500" />
    </Form.Item>
    <Button type="primary" htmlType="submit">
      Submit Bulk Order
    </Button>
  </Form>
);

const WholesaleStockContent: React.FC<ContentComponentProps> = () => (
  <Form
    layout="vertical"
    className="swc-bs-form-content-spacing"
    onFinish={() => message.success('Supplier status checked.')}
  >
    <Form.Item label="Supplier Name">
      <Input placeholder="Supplier / distributor name" />
    </Form.Item>
    <Button type="primary" htmlType="submit">
      Check Supplier Status
    </Button>
  </Form>
);

/* ---------- services & subservices with descriptions ---------- */

const SERVICES_DATA: Service[] = [
  {
    key: 'buySale',
    title: 'Buy & Sale Products',
    description: 'Manage commercial and residential property listings for sale and purchase.',
    icon: <HomeOutlined />,
    imagePath: BuySaleImage,
    subservices: [
      {
        key: 'propListingSale',
        title: 'Property Listing for Sale',
        description: '',
        contentComponent: PropertyListingSaleContent as React.FC<any>,
        imagePath: Modern,
      },
      {
        key: 'propListingPurchase',
        title: 'Property Listing for Purchase',
        description: '',
        contentComponent: PropertyListingPurchaseContent as React.FC<any>,
        imagePath: SkyImage,
      },
    ],
  },
  {
    key: 'retail',
    title: 'Old Retail Sales',
    description: 'Traditional in-store billing, stock updates and customer history.',
    icon: <ShopOutlined />,
    imagePath: RetailImage,
    subservices: [
      {
        key: 'inStore',
        title: 'In-Store Billing',
        description: '',
        contentComponent: RetailInStoreContent,
        imagePath: CustomerRecords,
      },
      {
        key: 'inventory',
        title: 'Inventory & Customer Records',
        description: '',
        contentComponent: RetailInventoryContent,
        imagePath: WholesaleImage,
      },
    ],
  },
  {
    key: 'online',
    title: 'Online Ordering',
    description: 'Set up digital catalogue, payments, delivery and offers.',
    icon: <ShoppingCartOutlined />,
    imagePath: OnlineImage,
    subservices: [
      {
        key: 'onlineOrder',
        title: 'Online Ordering & Checkout',
        description: '',
        contentComponent: OnlineCheckoutContent,
        imagePath: b,
      },
      {
        key: 'digitalCat',
        title: 'Digital Catalog & Product Search',
        description: '',
        contentComponent: OnlineCatalogContent,
        imagePath: a,
      },
      {
        key: 'onlinePay',
        title: 'Online Payments (UPI / Card)',
        description: '',
        contentComponent: OnlinePaymentContent,
        imagePath: c,
      },
      {
        key: 'delivery',
        title: 'Home Delivery & Tracking',
        description: '',
        contentComponent: OnlineDeliveryContent,
        imagePath: d,
      },
      {
        key: 'offers',
        title: 'Online Offers & Coupons',
        description: '',
        contentComponent: OnlineOffersContent,
        imagePath: e,
      },
    ],
  },
  {
    key: 'wholesale',
    title: 'Wholesale Buy Near Distribution',
    description: 'Handle bulk orders, price comparison and supplier coordination',
    icon: <TruckOutlined />,
    imagePath: WholesaleImage,
    subservices: [
      {
        key: 'bulkMgmt',
        title: 'Price Comparison & Bulk Orders',
        description: '',
        contentComponent: WholesaleBulkContent,
        imagePath: WholesaleImage,
      },
      {
        key: 'supplierCoord',
        title: 'Supplier Coordination & Stock Tracking',
        description: '',
        contentComponent: WholesaleStockContent,
        imagePath: f,
      },
    ],
  },
];


/* ---------- main component & modals ---------- */

export function BuySaleProducts() {
  const [subserviceModalVisible, setSubserviceModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [propertyDetailModalVisible, setPropertyDetailModalVisible] = useState(false);
  const [docVerifyModalVisible, setDocVerifyModalVisible] = useState(false);

  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [currentSubservice, setCurrentSubservice] = useState<Subservice | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  const handleServiceClick = useCallback((service: Service) => {
    setCurrentService(service);
    setSubserviceModalVisible(true);
    setDetailModalVisible(false);
    setPropertyDetailModalVisible(false);
  }, []);

  const handleSubserviceClick = useCallback((subservice: Subservice) => {
    setCurrentSubservice(subservice);
    setSubserviceModalVisible(false);
    setDetailModalVisible(true);
  }, []);

  const handleViewDetails = useCallback((property: PropertyListing) => {
    setSelectedProperty(property);
    setSubserviceModalVisible(false);
    setDetailModalVisible(false);
    setPropertyDetailModalVisible(true);
  }, []);

  const handleBackToMain = useCallback(() => {
    setSubserviceModalVisible(false);
    setCurrentService(null);
  }, []);

  const handleBackToSubservices = useCallback(() => {
    setDetailModalVisible(false);
    setCurrentSubservice(null);
    if (currentService) setSubserviceModalVisible(true);
    else handleBackToMain();
  }, [currentService, handleBackToMain]);

  const handleClosePropertyDetail = useCallback(() => {
    setPropertyDetailModalVisible(false);
    setSelectedProperty(null);
    setDetailModalVisible(true);
  }, []);

  const handleOpenDocVerify = useCallback(() => setDocVerifyModalVisible(true), []);
  const handleCloseDocVerify = useCallback(() => setDocVerifyModalVisible(false), []);

  const DetailContentComponent = useMemo(
    () => currentSubservice?.contentComponent,
    [currentSubservice],
  );

const renderMainServices = () => (
  <Row gutter={[24, 24]}>
    {SERVICES_DATA.map((service) => (
      <Col xs={24} sm={12} lg={6} key={service.key}>
        <Card
          hoverable
          className="swc-bs-service-card-main"
          cover={
            <div
              className="swc-bs-service-card-image"
              style={{ backgroundImage: `url(${service.imagePath})` }}
            />
          }
        >
          <Space
            direction="vertical"
            size={8}
            className="swc-bs-service-card-content"
          >
            <Space size="small">
              {service.icon}
              <span className="swc-bs-service-card-title">{service.title}</span>
            </Space>

            <Text type="secondary" className="swc-bs-service-card-description">
              {service.description}
            </Text>

            {/* New button – same idea as Cleaning Services cards */}
            <Button
              block
              className="swc-bs-service-view-btn"
              onClick={() => handleServiceClick(service)}
            >
              View Details
            </Button>
          </Space>
        </Card>
      </Col>
    ))}
    <ServicesPage/>
  </Row>
);


  const SubserviceModalTitle = (
    <Space className="swc-bs-navigation-title-bar card-title-align swc-bs-modal-header-space">
      <Button
        onClick={handleBackToMain}
        type="text"
        className="swc-bs-minimal-back-button swc-bs-back-button-style"
        // icon={<ArrowLeftOutlined />}
      />
      <Title level={3} className="swc-bs-modal-title-no-margin">
        {currentService?.title} 
      </Title>
    </Space>
  );

  const DetailModalTitle = (
    <Space className="swc-bs-navigation-title-bar card-title-align swc-bs-modal-header-space">
      <Button
        onClick={handleBackToSubservices}
        type="text"
        className="swc-bs-minimal-back-button swc-bs-back-button-style"
        // icon={<ArrowLeftOutlined />}
      />
      <Title level={3} className="swc-bs-modal-title-no-margin">
        {currentSubservice?.title}
      </Title>
    </Space>
  );

  const PropertyDetailModalTitle = (
    <Space className="swc-bs-navigation-title-bar card-title-align swc-bs-modal-header-space">
      <Button
        onClick={handleClosePropertyDetail}
        type="text"
        className="swc-bs-minimal-back-button swc-bs-back-button-style"
        // icon={<ArrowLeftOutlined />}
      />
      <Title level={3} className="swc-bs-modal-title-no-margin">
        {selectedProperty?.title || 'Property Details'}
      </Title>
    </Space>
  );

const renderSubservicesModalContent = () => (
  <div className="swc-bs-subservice-list-container swc-bs-subservice-list-padding">
    <div className="swc-bs-subservice-list-surface">
      <Row gutter={[24, 24]} justify="center">
        {currentService?.subservices.map((subservice) => (
          <Col xs={24} sm={12} md={8} key={subservice.key}>
            <Card
              hoverable
              className="swc-bs-subservice-card"
              onClick={() => handleSubserviceClick(subservice)}
              cover={
                <div
                  className="swc-bs-service-card-image swc-bs-subservice-card-image"
                  style={{ backgroundImage: `url(${subservice.imagePath})` }}
                />
              }
            >
              <Card.Meta
                title={subservice.title}
                description={
                  <Text type="secondary" className="swc-bs-subservice-card-description">
                    {subservice.description}
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
);


  return (
    <div className="swc-bs-app-container">
      <div className="swc-bs-header-banner">
        <Title level={1} className="swc-bs-banner-title">
          <HomeOutlined /> Buy/Sale/Rentals 
        </Title>
        <Text className="swc-bs-banner-subtitle">
          Available Services 
        </Text>
      </div>

      <div className="swc-bs-module-section">
        {/* <Title level={2} className="swc-bs-section-title">
          Select a Service
        </Title> */}
        <div className="swc-bs-section-title-underline" />
        {renderMainServices()}
      </div>

      {/* Subservice modal */}
     <Modal
  title={SubserviceModalTitle}
  open={subserviceModalVisible}
  onCancel={handleBackToMain}
  footer={null}
  width={1000}
  centered
  className="swc-bs-subservice-modal"
>
  {renderSubservicesModalContent()}
</Modal>


      {/* Detail modal (listing / forms) */}
      <Modal
        title={DetailModalTitle}
        open={detailModalVisible}
        onCancel={handleBackToSubservices}
        footer={null}
        width={1000}
        centered
        destroyOnClose
        className="swc-bs-app-detail-modal"
      >
        {DetailContentComponent && (
          <div className="swc-bs-detail-view-container">
            {currentSubservice?.key === 'propListingSale' ||
            currentSubservice?.key === 'propListingPurchase' ? (
              <DetailContentComponent
                defaultListingType={
                  currentSubservice.key === 'propListingSale' ? 'sale' : 'purchase'
                }
                onViewDetails={handleViewDetails}
              />
            ) : (
              <DetailContentComponent />
            )}
          </div>
        )}
      </Modal>

      {/* Property detail + negotiation */}
      <Modal
        title={PropertyDetailModalTitle}
        open={propertyDetailModalVisible}
        onCancel={handleClosePropertyDetail}
        footer={null}
        width={1200}
        centered
        destroyOnClose
        className="swc-bs-app-detail-modal"
      >
        {selectedProperty && (
          <PropertyDetailView
            property={selectedProperty}
            onOpenDocVerify={handleOpenDocVerify}
          />
        )}
      </Modal>

      {/* document verification */}
      <Modal
        title="Document Verification"
        open={docVerifyModalVisible}
        onCancel={handleCloseDocVerify}
        footer={null}
        width={600}
        centered
        destroyOnClose
      >
        <div className="swc-bs-detail-view-container">
          <DocumentationContent />
        </div>
      </Modal>
    </div>
  );
}

export default BuySaleProducts;