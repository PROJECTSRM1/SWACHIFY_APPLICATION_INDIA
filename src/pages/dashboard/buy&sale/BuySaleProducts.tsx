import React, { useState, useMemo, useCallback } from 'react';
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
    Alert
} from 'antd';
// Resolved type-only imports (error 1484)
import type { FormProps, UploadFile, UploadProps } from 'antd'; 

import {
    HomeOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    TruckOutlined,
    ArrowRightOutlined,
    RiseOutlined,
    EnvironmentOutlined,
    PlusOutlined,
    ArrowLeftOutlined,
    EyeOutlined,
    FileTextOutlined,
    DollarOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
} from '@ant-design/icons';
import './BuySaleProducts.css';
import BuySaleImage from "../../../assets/buyandsale/buySale-real-estate.png";
import RetailImage from '../../../assets/buyandsale/old_retail.png'; 
import OnlineImage from '../../../assets/buyandsale/onlineordering.png'; 
import WholesaleImage from '../../../assets/buyandsale/wholesale_buynear.png'; 
import SkyImage from '../../../assets/buyandsale/sky_scrapper.png'; 
import Vintagev from '../../../assets/buyandsale/Vintage_house.png'; 
import Modern from '../../../assets/buyandsale/modern_house.png'; 
import Land from '../../../assets/buyandsale/Land_For_sale.png'; 
import Lakehouse from '../../../assets/buyandsale/Lakehouse.png'; 
import CustomerRecords from '../../../assets/buyandsale/customerrecords.png'; 
// import DocumentVerification from '../../assets/buyandsale/documentverification.png'; 
// import PriceNegotiation from '../../assets/buyandsale/pricenegotiation.png'; 
import a from '../../../assets/buyandsale/A.png'; 
import b from '../../../assets/buyandsale/B.png'; 
import c from '../../../assets/buyandsale/C.png'; 
import d from '../../../assets/buyandsale/D.png'; 
import e from '../../../assets/buyandsale/E.png'; 
import f from '../../../assets/buyandsale/suppliercordination.png'; 



const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

// --- INTERFACE DEFINITIONS (UNCHANGED) ---

interface Subservice {
    key: string;
    title: string;
    contentComponent: React.FC<any>;
    imagePath: string;
}

interface Service {
    key: string;
    title: string;
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

// Simplified Props for components rendered inside Modals
interface PropertyListingViewProps {
    defaultListingType: 'sale' | 'purchase';
    onViewDetails: (property: PropertyListing) => void;
}

interface ContentComponentProps {
    defaultListingType?: 'sale' | 'purchase';
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

// UPDATED: new fields that match the new contact + negotiation form
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

// --- MOCK DATA (same as before, shortened for brevity) ---
const MOCK_PROPERTY_LISTINGS: PropertyListing[] = [
    {
        id: 1,
        title: 'Prime Commercial Plot - City Center',
        listingType: 'sale',
        price: 2500000,
        area: 5000,
        location: 'Business District, Manhattan',
        tags: ['Corner Plot', 'High Visibility', 'Metro Access', 'Utilities Ready'],
        roi: '15-18% per annum',
        imagePath: SkyImage,
        propertyType: 'Retail/Office',
        description:
            "A premium 5000 sqft commercial plot in the heart of Manhattan's Business District. Approved for high-rise commercial development. Excellent ROI potential.",
    },
    {
        id: 2,
        title: 'Industrial Plot - Warehouse Zone',
        listingType: 'sale',
        price: 1800000,
        area: 10000,
        location: 'Industrial Area, Queens',
        tags: ['Highway Access', 'Loading Docks', 'Large Space', 'Fenced'],
        roi: '12-15% per annum',
        imagePath: Land,
        propertyType: 'Warehouse/Industrial',
        description:
            '10,000 sqft of industrial land located near major highways. Ideal for building a large warehouse with multiple loading docks. Secure and fenced area.',
    },
    {
        id: 3,
        title: 'Office Complex Plot',
        listingType: 'sale',
        price: 4200000,
        area: 8000,
        location: 'Financial District, NYC',
        tags: ['Premium Location', 'High-rise Approved', 'Transit Hub', 'Featured'],
        roi: '20-25% per annum',
        imagePath: SkyImage,
        propertyType: 'Office',
        description:
            'An 8000 sqft land parcel with high-rise approval, perfect for a landmark corporate office complex in the bustling Financial District. Highest ROI potential.',
    },
    {
        id: 4,
        title: 'Shopping Complex Land',
        listingType: 'sale',
        price: 3500000,
        area: 15000,
        location: 'Suburban Area, Long Island',
        tags: ['Mall Approved', 'Parking Space', 'High Footfall'],
        roi: '18-22% per annum',
        imagePath: Land,
        propertyType: 'Retail',
        description:
            'Large 15,000 sqft plot in a high-growth suburban area, pre-approved for a shopping mall or retail complex. Excellent potential for high footfall.',
    },
    {
        id: 5,
        title: 'Boutique Hotel Development Land',
        listingType: 'purchase',
        price: 1500000,
        area: 5000,
        location: 'Miami Beach, FL',
        tags: ['High Traffic', 'Ocean View', 'Zoning Approved'],
        roi: '18-20% per annum',
        imagePath: Land,
        propertyType: 'Land/Commercial',
        description:
            'Seeking a 5000 sqft ocean-view plot in Miami Beach suitable for boutique hotel development. High traffic area with current zoning approvals preferred.',
    },
    {
        id: 6,
        title: 'Luxury Log Cabin on Lake',
        listingType: 'purchase',
        price: 950000,
        area: 3200,
        location: 'Aspen, CO',
        tags: ['Lakefront', 'Private Dock', 'Rental Income Ready'],
        roi: '10-14% per annum',
        imagePath: Lakehouse,
        propertyType: 'Residential/Holiday',
        description:
            'Looking to purchase a 3200 sqft luxury log cabin or lakehouse property in the Aspen area. Must be suitable for immediate rental income.',
    },
    {
        id: 7,
        title: 'Historic Victorian Home',
        listingType: 'purchase',
        price: 1200000,
        area: 4500,
        location: 'Brooklyn Heights, NY',
        tags: ['Vintage Style', 'Renovated', 'Garden Access'],
        roi: 'N/A (Personal Use)',
        imagePath: Vintagev,
        propertyType: 'Residential',
        description:
            'Seeking a classic, well-maintained 4500 sqft Victorian style home in Brooklyn Heights for personal residence. Garden access is a strong plus.',
    },
    {
        id: 8,
        title: 'Corporate Office Tower Floor',
        listingType: 'purchase',
        price: 3800000,
        area: 7500,
        location: 'Midtown, Manhattan',
        tags: ['High-rise', 'Metro Access', 'High Security'],
        roi: '16-19% per annum',
        imagePath: SkyImage,
        propertyType: 'Office',
        description:
            'Interest in purchasing an entire floor (approx 7500 sqft) in a modern corporate office tower in Midtown Manhattan. Must have high security and excellent transit access.',
    },
];

// --- PROPERTY CARD ---
const PropertyCard: React.FC<{ property: PropertyListing; onViewDetails: (property: PropertyListing) => void }> = ({
    property,
    onViewDetails,
}) => {
    const imagePath = property.imagePath;

    return (
        <Card
            hoverable
            className="service-card-main"
            cover={<div className="service-card-image" style={{ backgroundImage: `url(${imagePath})` }} />}
        >
            <Card.Meta
                title={<span className="service-card-title">{property.title}</span>}
                description={
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text type="secondary" className="text-with-icon-align">
                            <EnvironmentOutlined /> {property.location}
                        </Text>
                        <Title level={3} className="price-title">
                            {`$${(property.price / 1000000).toFixed(1)}M`}
                        </Title>
                        <Text type="secondary">{`${property.area} sqft • Zoning: ${property.propertyType}`}</Text>
                        <Space size={[0, 8]} wrap className="tags-space-top">
                            {property.tags.map((tag) => (
                                <Tag key={tag} color="default">
                                    {tag}
                                </Tag>
                            ))}
                        </Space>
                        <Text className="roi-text">
                            <RiseOutlined /> {property.roi}
                        </Text>
                        <Space className="button-group-space-top">
                            <Button type="primary" size="large" onClick={() => onViewDetails(property)}>
                                Contact Us / Negotiate
                            </Button>
                            <Button size="large" onClick={() => onViewDetails(property)}>
                                View Details
                            </Button>
                        </Space>
                    </Space>
                }
            />
        </Card>
    );
};

// --- DETAIL VIEW RIGHT SIDE: CONTACT + PRICE NEGOTIATION (UPDATED) ---
const PriceNegotiationContent: React.FC<ContentComponentProps & { currentPrice: number }> = ({ currentPrice }) => {
  const [form] = Form.useForm<PriceNegotiationFormValues>();

  // State for analysis results
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

  const onSubmit: FormProps<PriceNegotiationFormValues>['onFinish'] = (values) => {
    // Final re-analysis of offer on submit (in case user didn’t change after last calc)
    analyzeOffer(values);
    message.success('Your enquiry and offer have been submitted!');
    console.log('Contact & negotiation form submitted:', values);
  };

  // --- PRICE COMPARISON (market vs predicted) ---
  const handleCompareClick = async () => {
    try {
      // validate predicted price first
      await form.validateFields(['predictedMarketPrice']);
      const current = form.getFieldValue('currentMarketPrice') || currentPrice;
      const predicted = form.getFieldValue('predictedMarketPrice');

      if (!current || !predicted) return;

      // basic sanity: price must be positive
      if (predicted <= 0) {
        message.error('Predicted market price must be greater than zero.');
        return;
      }

      // sanity check: predicted shouldn’t be wildly off (> ±50%)
      const maxAllowed = current * 1.5;
      const minAllowed = current * 0.5;
      if (predicted > maxAllowed || predicted < minAllowed) {
        message.error(
          'Predicted market price is more than ±50% away from the current price. Please double-check your input.',
        );
        setPriceComparison(null);
        return;
      }

      const diff = predicted - current;
      const percentDiff = (diff / current) * 100;

      let messageText = '';
      let type: 'success' | 'warning' | 'error' | 'info' = 'info';

      const absPercent = Math.abs(percentDiff);

      if (absPercent < 5) {
        messageText = 'Predicted price is well aligned with the current market value (within ±5%).';
        type = 'success';
      } else if (absPercent < 15) {
        messageText =
          diff > 0
            ? 'Property looks moderately underpriced compared to your prediction (5–15% below).'
            : 'Property looks moderately overpriced compared to your prediction (5–15% above).';
        type = 'warning';
      } else {
        messageText =
          diff > 0
            ? 'Property appears significantly underpriced (more than 15% below your prediction). Please validate with more comps.'
            : 'Property appears significantly overpriced (more than 15% above your prediction). Consider negotiating harder or re-evaluating.';
        type = 'error';
      }

      setPriceComparison({
        diff,
        percentDiff,
        message: messageText,
        type,
      });

      message.success('Price comparison analysis completed.');
    } catch (err) {
      // validation error – do nothing, AntD already shows messages
    }
  };

  // --- OFFER vs ASKING (runs whenever offer changes or on submit) ---
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
      // below asking – typical negotiation range often 3–10% under
      if (absPercent <= 3) {
        messageText = `Your offer is about ${absPercent.toFixed(
          1,
        )}% below asking – a small, reasonable discount in many markets.`;
        type = 'success';
      } else if (absPercent <= 10) {
        messageText = `Your offer is ${absPercent.toFixed(
          1,
        )}% below asking – within a typical negotiation range. Expect a counter-offer.`;
        type = 'warning';
      } else {
        messageText = `Your offer is ${absPercent.toFixed(
          1,
        )}% below asking – this may be viewed as a strong/lowball offer unless the property is clearly overpriced.`;
        type = 'error';
      }
    } else {
      // above asking
      if (percentDiff <= 3) {
        messageText = `Your offer is ${percentDiff.toFixed(
          1,
        )}% above asking – this can help in competitive or hot markets.`;
        type = 'warning';
      } else {
        messageText = `Your offer is ${percentDiff.toFixed(
          1,
        )}% above asking – you may be overpaying unless competition is very strong.`;
        type = 'error';
      }
    }

    setOfferAnalysis({
      diff,
      percentDiff,
      message: messageText,
      type,
    });
  };

  return (
    <div className="detail-form-container">
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        className="form-content-spacing"
        initialValues={{
          currentMarketPrice: currentPrice,
          currentAskingPrice: currentPrice,
        }}
        onValuesChange={(_, allValues) => {
          // live analysis of offer on any change
          analyzeOffer(allValues as PriceNegotiationFormValues);
        }}
      >
        {/* CONTACT DETAILS */}
        <Title level={4}>
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
                { type: 'email', message: 'Please enter a valid email' },
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

        {/* PRICE COMPARISON TOOL */}
        <Title level={4}>
          <DollarOutlined /> Price Comparison Tool
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues> name="currentMarketPrice" label="Current Market Price ($)">
              <Input type="number" prefix="$" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues>
              name="predictedMarketPrice"
              label="Predicted Market Price ($)"
              rules={[
                { required: true, message: 'Please enter predicted market price' },
                {
                  validator: (_, value) => {
                    if (value == null || value === '') return Promise.resolve();
                    if (value <= 0) return Promise.reject('Predicted market price must be greater than zero.');
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" prefix="$" placeholder="e.g., 2600000" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Button type="default" onClick={handleCompareClick}>
              Analyze Comparison
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
                    <div style={{ marginTop: 4 }}>
                      Difference:{' '}
                      <b>
                        {priceComparison.diff >= 0 ? '+' : '-'}${Math.abs(priceComparison.diff).toLocaleString()}
                      </b>{' '}
                      (
                      {`${priceComparison.diff >= 0 ? '+' : '-'}${Math.abs(
                        priceComparison.percentDiff,
                      ).toFixed(2)}%`}{' '}
                      vs current market price)
                    </div>
                  </>
                }
              />
            </Col>
          )}
        </Row>

        <Divider />

        {/* NEGOTIATION OFFER */}
        <Title level={4}>
          <RiseOutlined /> Negotiation Offer
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues> name="currentAskingPrice" label="Current Asking Price ($)">
              <Input type="number" prefix="$" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item<PriceNegotiationFormValues>
              name="offerPrice"
              label="Your Offer ($)"
              rules={[{ required: true, message: 'Please enter your offer price' }]}
            >
              <Input type="number" prefix="$" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item<PriceNegotiationFormValues> name="negotiationMessage" label="Negotiation Message">
              <TextArea rows={3} placeholder="Share your terms, conditions, or questions..." />
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
                    <div style={{ marginTop: 4 }}>
                      Difference:{' '}
                      <b>
                        {offerAnalysis.diff >= 0 ? '+' : '-'}$
                        {Math.abs(offerAnalysis.diff).toLocaleString()}
                      </b>{' '}
                      (
                      {`${offerAnalysis.diff >= 0 ? '+' : '-'}${Math.abs(
                        offerAnalysis.percentDiff,
                      ).toFixed(2)}%`}{' '}
                      vs asking price)
                    </div>
                  </>
                }
              />
            </Col>
          )}
        </Row>

        <Button type="primary" htmlType="submit">
          Submit Offer
        </Button>
      </Form>
    </div>
  );
};


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
                    <Form.Item<DocumentationFormValues> name="verificationStatus" label="Status">
                        <Select placeholder="Select status">
                            <Option value="pending">Pending</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item name="documentFile" label="Upload File" rules={[{ required: true }]}>
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

// --- NEW PROPERTY DETAIL VIEW COMPONENT ---
const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ property, onOpenDocVerify }) => {
    return (
        <div className="detail-view-container">
            <Row gutter={[24, 24]}>
                {/* Left Column: Property Details & Image */}
                <Col xs={24} lg={10}>
                    <div
                        className="service-card-image"
                        style={{ backgroundImage: `url(${property.imagePath})`, height: 250, borderRadius: 8, marginBottom: 15 }}
                    />
                    <Title level={4} className="price-title">{`$${(property.price / 1000000).toFixed(2)}M`}</Title>
                    <Text type="secondary" className="text-with-icon-align">
                        <EnvironmentOutlined /> {property.location}
                    </Text>
                    <Text type="secondary" style={{ display: 'block' }}>{`${property.area} sqft • Type: ${
                        property.propertyType
                    }`}</Text>
                    <Text className="roi-text">
                        <RiseOutlined /> {property.roi}
                    </Text>
                    <Divider orientation="left">Description</Divider>
                    <Text>{property.description || 'No detailed description provided.'}</Text>

                    <Divider orientation="left">Actions</Divider>
                    <Button
                        type="default"
                        size="large"
                        icon={<FileTextOutlined />}
                        onClick={onOpenDocVerify}
                        style={{ marginBottom: 15 }}
                    >
                        Start Document Verification
                    </Button>
                </Col>

                {/* Right Column: Contact + Negotiation Form */}
                <Col xs={24} lg={14}>
                    <Divider orientation="left">
                        <EyeOutlined /> Price Negotiation & Comparison
                    </Divider>
                    <PriceNegotiationContent currentPrice={property.price} />
                </Col>
            </Row>
        </div>
    );
};

// --- PROPERTY LISTING VIEW (unchanged except for context) ---
const PropertyListingView: React.FC<PropertyListingViewProps> = ({ defaultListingType, onViewDetails }) => {
    const [listings, setListings] = useState<PropertyListing[]>(
        MOCK_PROPERTY_LISTINGS.filter((l) => l.listingType === defaultListingType),
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm<PropertyFormValues>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [newPropertyImage, setNewPropertyImage] = useState<string | null>(null);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleFileChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0 && newFileList[0].originFileObj) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewPropertyImage(reader.result as string);
            };
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
            tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()) : ['New Listing', 'User Added'],
            roi: values.roi || 'TBD',
            imagePath: newPropertyImage || (defaultListingType === 'sale' ? Modern : SkyImage),
            propertyType: values.propertyType,
            description: values.description,
        };

        setListings((prev) => [newListing, ...prev]);
        message.success(`${defaultListingType === 'sale' ? 'Sale' : 'Purchase'} listing added successfully!`);
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
        setNewPropertyImage(null);
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
        form.setFieldsValue({
            listingType: defaultListingType,
            title: '',
            price: undefined,
            area: undefined,
            location: '',
            tags: '',
            roi: '',
            image: [],
            propertyType: undefined,
            description: '',
        });
        setFileList([]);
        setNewPropertyImage(null);
    };

    return (
        <>
            <div className="listing-view-header">
                <span className="listing-view-header-title">{`Featured ${
                    defaultListingType === 'sale' ? 'Sale' : 'Purchase'
                } Listings`}</span>
                <Button type="primary" onClick={handleOpenModal}>
                    Add Property
                </Button>
            </div>

            <List
                grid={{ gutter: 20, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
                dataSource={listings}
                renderItem={(item) => (
                    <List.Item>
                        <PropertyCard property={item} onViewDetails={onViewDetails} />
                    </List.Item>
                )}
                locale={{ emptyText: <Text type="secondary">No listings found. Be the first to add one!</Text> }}
                className="form-content-spacing"
            />

            <Modal
                title={`Add Property Listing (${defaultListingType === 'sale' ? 'For Sale' : 'For Purchase'})`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose={true}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ listingType: defaultListingType }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item name="title" label="Property Title" rules={[{ required: true }]}>
                                <Input placeholder="Enter property title" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="propertyType" label="Property Type" rules={[{ required: true }]}>
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
                            <Form.Item name="listingType" label="Listing For" rules={[{ required: true }]}>
                                <Select disabled>
                                    <Option value="sale">For Sale</Option>
                                    <Option value="purchase">Want to Purchase</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="price" label="Price ($)" rules={[{ required: true }]}>
                                <Input type="number" prefix="$" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="area" label="Area (sqft)" rules={[{ required: true }]}>
                                <Input type="number" suffix="sqft" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                                <Input placeholder="e.g., City, State, or Address" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name="tags" label="Tags (comma-separated)">
                                <Input placeholder="e.g., Highway Access, Fenced, Corner Plot" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name="roi" label="Expected ROI (Optional)">
                                <Input placeholder="e.g., 15-18% per annum" />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                name="image"
                                label="Property Image (for banner)"
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
                            <Form.Item name="description" label="Description">
                                <TextArea rows={3} placeholder="Detailed description..." />
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

// Simple redirects
const PropertyListingSaleContent: React.FC<ContentComponentProps & { onViewDetails: (property: PropertyListing) => void }> =
    ({ onViewDetails }) =>
        <PropertyListingView defaultListingType="sale" onViewDetails={onViewDetails} />;

const PropertyListingPurchaseContent: React.FC<
    ContentComponentProps & { onViewDetails: (property: PropertyListing) => void }
> = ({ onViewDetails }) => <PropertyListingView defaultListingType="purchase" onViewDetails={onViewDetails} />;

// --- OTHER SUBSERVICE CONTENTS (unchanged) ---
const RetailInStoreContent: React.FC<ContentComponentProps> = () => (
    <Form layout="vertical" className="form-content-spacing" onFinish={() => message.success('Sale completed!')}>
        <Form.Item label="Sale Amount ($)">
            <Input placeholder="Enter sale amount" prefix="$" type="number" />
        </Form.Item>
        <Form.Item label="Item Details">
            <TextArea rows={2} placeholder="Description of items sold..." />
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Complete Sale
        </Button>
    </Form>
);

const RetailInventoryContent: React.FC<ContentComponentProps> = () => (
    <Form layout="vertical" className="form-content-spacing" onFinish={() => message.success('Inventory updated!')}>
        <Form.Item label="Product ID">
            <Input placeholder="Enter Product SKU" />
        </Form.Item>
        <Form.Item label="Stock Change">
            <Input type="number" placeholder="+ / - Amount" />
        </Form.Item>
        <Form.Item label="Customer ID">
            <Input placeholder="Enter Customer ID" />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="button-spacer-right">
            Update Stock
        </Button>
        <Button>Fetch Records</Button>
    </Form>
);

const OnlineCheckoutContent: React.FC<ContentComponentProps> = () => (
    <Input placeholder="Shipping Rate (flat fee)" className="width-100" />
);
const OnlineCatalogContent: React.FC<ContentComponentProps> = () => (
    <TextArea rows={3} placeholder="Product SEO Description" />
);
const OnlinePaymentContent: React.FC<ContentComponentProps> = () => <Input placeholder="Gateway API Key" />;
const OnlineDeliveryContent: React.FC<ContentComponentProps> = () => (
    <Select placeholder="Select Courier Service" className="width-100">
        <Option value="a">Local Express</Option>
    </Select>
);
const OnlineOffersContent: React.FC<ContentComponentProps> = () => (
    <Input placeholder="Coupon Code (e.g., SUMMER20)" />
);

const WholesaleBulkContent: React.FC<ContentComponentProps> = () => (
    <Form layout="vertical" className="form-content-spacing" onFinish={() => message.success('Bulk order submitted!')}>
        <Form.Item label="Product Name/SKU">
            <Input placeholder="Enter bulk product name" />
        </Form.Item>
        <Form.Item label="Order Quantity">
            <Input type="number" placeholder="Order Quantity (e.g., 500+)" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Submit Bulk Order
        </Button>
    </Form>
);
const WholesaleStockContent: React.FC<ContentComponentProps> = () => (
    <Form
        layout="vertical"
        className="form-content-spacing"
        onFinish={() => message.success('Supplier status checked.')}
    >
        <Form.Item label="Supplier Name">
            <Input placeholder="Supplier Contact Name" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Check Supplier Status
        </Button>
    </Form>
);

// --- SERVICE DATA (unchanged list, still no direct price-neg/doc subservices) ---
const SERVICES_DATA: Service[] = [
    {
        key: 'buySale',
        title: 'Buy & Sale Products',
        icon: <HomeOutlined />,
        imagePath: BuySaleImage,
        subservices: [
            {
                key: 'propListingSale',
                title: 'Property Listing for Sale',
                contentComponent: PropertyListingSaleContent as React.FC<any>,
                imagePath: Modern,
            },
            {
                key: 'propListingPurchase',
                title: 'Property Listing for Purchase',
                contentComponent: PropertyListingPurchaseContent as React.FC<any>,
                imagePath: SkyImage,
            },
        ],
    },
    {
        key: 'retail',
        title: 'Old Retail Sales',
        icon: <ShopOutlined />,
        imagePath: RetailImage,
        subservices: [
            {
                key: 'inStore',
                title: 'In-Store Sales',
                contentComponent: RetailInStoreContent,
                imagePath: CustomerRecords,
            },
            {
                key: 'inventory',
                title: 'Inventory & Customer Records',
                contentComponent: RetailInventoryContent,
                imagePath: WholesaleImage,
            },
        ],
    },
    {
        key: 'online',
        title: 'Online Ordering',
        icon: <ShoppingCartOutlined />,
        imagePath: OnlineImage,
        subservices: [
            { key: 'onlineOrder', title: 'Online Ordering & Checkout', contentComponent: OnlineCheckoutContent, imagePath: a },
            { key: 'digitalCat', title: 'Digital CatLog & Product Search', contentComponent: OnlineCatalogContent, imagePath: b },
            { key: 'onlinePay', title: 'Online Payments (UPI, Card)', contentComponent: OnlinePaymentContent, imagePath: c },
            { key: 'delivery', title: 'Home Delivery & Order Tracking', contentComponent: OnlineDeliveryContent, imagePath: d },
            { key: 'offers', title: 'Online Offers & Coupons', contentComponent: OnlineOffersContent, imagePath: e },
        ],
    },
    {
        key: 'wholesale',
        title: 'Wholesale Buy Near Distribution',
        icon: <TruckOutlined />,
        imagePath: WholesaleImage,
        subservices: [
            {
                key: 'bulkMgmt',
                title: 'Price comparison and bulk order management',
                contentComponent: WholesaleBulkContent,
                imagePath: WholesaleImage,
            },
            {
                key: 'supplierCoord',
                title: 'Supplier coordination and stock tracking',
                contentComponent: WholesaleStockContent,
                imagePath: f,
            },
        ],
    },
];

// --- MAIN COMPONENT ---
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
        if (currentService) {
            setSubserviceModalVisible(true);
        } else {
            handleBackToMain();
        }
    }, [currentService, handleBackToMain]);

    const handleClosePropertyDetail = useCallback(() => {
        setPropertyDetailModalVisible(false);
        setSelectedProperty(null);
        setDetailModalVisible(true);
        if (currentService && currentService.key === 'buySale') {
            setCurrentSubservice(
                currentService.subservices.find(
                    (s) => s.key === 'propListingSale' || s.key === 'propListingPurchase',
                ) || null,
            );
        }
    }, [currentService]);

    const handleOpenDocVerify = useCallback(() => {
        setDocVerifyModalVisible(true);
    }, []);

    const handleCloseDocVerify = useCallback(() => {
        setDocVerifyModalVisible(false);
    }, []);

    const DetailContentComponent = useMemo(() => currentSubservice?.contentComponent, [currentSubservice]);

    const renderMainServices = () => (
        <Row gutter={[24, 24]}>
            {SERVICES_DATA.map((service) => (
                <Col xs={24} sm={12} lg={6} key={service.key}>
                    <Card
                        hoverable
                        className="service-card-main"
                        cover={
                            <div
                                className="service-card-image"
                                style={{ backgroundImage: `url(${service.imagePath})` }}
                            />
                        }
                        onClick={() => handleServiceClick(service)}
                    >
                        <Card.Meta
                            title={
                                <Space size="small">
                                    {service.icon}{' '}
                                    <span className="service-card-title">{service.title}</span>
                                </Space>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const SubserviceModalTitle = (
        <Space className="navigation-title-bar card-title-align modal-header-space">
            <Button
                onClick={handleBackToMain}
                type="text"
                className="minimal-back-button back-button-style"
                icon={<ArrowLeftOutlined />}
            />
            <Title level={3} className="modal-title-no-margin">
                {currentService?.title + ' Subservices'}
            </Title>
        </Space>
    );

    const DetailModalTitle = (
        <Space className="navigation-title-bar card-title-align modal-header-space">
            <Button
                onClick={handleBackToSubservices}
                type="text"
                className="minimal-back-button back-button-style"
                icon={<ArrowLeftOutlined />}
            />
            <Title level={3} className="modal-title-no-margin">
                {currentSubservice?.title}
            </Title>
        </Space>
    );

    const PropertyDetailModalTitle = (
        <Space className="navigation-title-bar card-title-align modal-header-space">
            <Button
                onClick={handleClosePropertyDetail}
                type="text"
                className="minimal-back-button back-button-style"
                icon={<ArrowLeftOutlined />}
            />
            <Title level={3} className="modal-title-no-margin">
                {selectedProperty?.title || 'Property Details'}
            </Title>
        </Space>
    );

    const renderSubservicesModalContent = () => (
        <div className="subservice-list-container subservice-list-padding">
            <Row gutter={[24, 24]} justify="center">
                {currentService?.subservices.map((subservice) => (
                    <Col xs={24} sm={12} md={12} key={subservice.key}>
                        <Card
                            hoverable
                            className="subservice-card"
                            onClick={() => handleSubserviceClick(subservice)}
                            cover={
                                <div
                                    className="service-card-image"
                                    style={{ backgroundImage: `url(${subservice.imagePath})` }}
                                />
                            }
                        >
                            <Card.Meta title={subservice.title} />
                            <ArrowRightOutlined className="subservice-arrow" />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

    return (
        <div className="app-container">
            <div className="header-banner">
                <Title level={1} className="banner-title">
                    <HomeOutlined /> Buy/Sale Products Management
                </Title>
            </div>

            <div className="module-section">{renderMainServices()}</div>

            <Modal
                title={SubserviceModalTitle}
                open={subserviceModalVisible}
                onCancel={handleBackToMain}
                footer={null}
                width={1000}
                centered
            >
                {renderSubservicesModalContent()}
            </Modal>

            <Modal
                title={DetailModalTitle}
                open={detailModalVisible}
                onCancel={handleBackToSubservices}
                footer={null}
                width={1000}
                centered
                destroyOnClose={true}
                className="app-detail-modal"
            >
                {DetailContentComponent && (
                    <div className="detail-view-container">
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

            <Modal
                title={PropertyDetailModalTitle}
                open={propertyDetailModalVisible}
                onCancel={handleClosePropertyDetail}
                footer={null}
                width={1200}
                centered
                destroyOnClose={true}
                className="app-detail-modal"
            >
                {selectedProperty && (
                    <PropertyDetailView property={selectedProperty} onOpenDocVerify={handleOpenDocVerify} />
                )}
            </Modal>

            <Modal
                title="Document Verification Form"
                open={docVerifyModalVisible}
                onCancel={handleCloseDocVerify}
                footer={null}
                width={600}
                centered
                destroyOnClose={true}
            >
                <div className="detail-view-container">
                    <DocumentationContent />
                </div>
            </Modal>
        </div>
    );
}

export default BuySaleProducts;
