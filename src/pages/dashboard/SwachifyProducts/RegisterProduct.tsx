import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    message,
    Card
} from 'antd';
import {
    ArrowLeftOutlined,
    CameraOutlined,
    PlusOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import './RegisterProduct.css';
import { addProduct } from './productStore';

const { TextArea } = Input;
const { Option } = Select;

interface ProductFormData {
    companyName: string;
    productName: string;
    shopAddress: string;
    distance: string;
    price: string;
    category: 'Sustainable' | 'Recycled' | 'Cleaners' | 'Entrepreneur' | 'Company';
    description: string;
    images: UploadFile[];
}

interface RegisterProductProps {
    onBack: () => void;
}

const RegisterProduct: React.FC<RegisterProductProps> = ({ onBack }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = async (values: ProductFormData) => {
        setLoading(true);
        try {
            // Get the first image URL or use a default placeholder
            const imageUrl = fileList.length > 0 && fileList[0].thumbUrl
                ? fileList[0].thumbUrl
                : '/products/lavender_soap.png'; // Default image

            // Add product to store
            const newProduct = addProduct({
                name: values.productName,
                company: values.companyName,
                category: values.category,
                image: imageUrl,
                price: parseFloat(values.price),
                distance: values.distance ? `${values.distance} km` : '0 km',
                shopAddress: values.shopAddress,
                description: values.description,
            });

            message.success(`Product "${newProduct.name}" registered successfully!`);

            // Reset form
            form.resetFields();
            setFileList([]);

            // Go back to listing after a short delay
            setTimeout(() => {
                onBack();
            }, 1500);
        } catch (error) {
            console.error('Error registering product:', error);
            message.error('Failed to register product');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndAddAnother = async () => {
        try {
            const values = await form.validateFields();
            await handleSubmit(values);
            // Form is already reset in handleSubmit, just show message
            message.info('You can add another product now');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div className="sw-register-dashboard-upload-placeholder">
            <CameraOutlined className="sw-register-dashboard-upload-icon" />
            <div className="sw-register-dashboard-upload-text">Add Photos</div>
            <div className="sw-register-dashboard-upload-hint">PNG, JPG up to 10MB</div>
        </div>
    );

    return (
        <div className="sw-register-dashboard-page">
            {/* Header */}
            <div className="sw-register-dashboard-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={onBack}
                    className="sw-register-dashboard-back-btn"
                >
                    Back
                </Button>
                <h1 className="sw-register-dashboard-title">Register Product</h1>
            </div>

            {/* Content */}
            <div className="sw-register-dashboard-container">
                <Card className="sw-register-dashboard-card">
                    <div className="sw-register-dashboard-intro">
                        <h2 className="sw-register-dashboard-heading">Product Registration</h2>
                        <p className="sw-register-dashboard-description">
                            Enter the details of your Swachify product below to list it on platform.
                        </p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="sw-register-dashboard-form"
                        requiredMark="optional"
                    >
                        {/* Company/Entrepreneur Name */}
                        <Form.Item
                            label="Company / Entrepreneur Name"
                            name="companyName"
                            rules={[
                                { required: true, message: 'Please enter company/entrepreneur name' }
                            ]}
                        >
                            <Input
                                placeholder="e.g. Swachify Corp"
                                size="large"
                                className="sw-register-dashboard-input"
                            />
                        </Form.Item>

                        {/* Product Name */}
                        <Form.Item
                            label="Product Name"
                            name="productName"
                            rules={[
                                { required: true, message: 'Please enter product name' }
                            ]}
                        >
                            <Input
                                placeholder="e.g. Eco-Bin Pro"
                                size="large"
                                className="sw-register-dashboard-input"
                            />
                        </Form.Item>

                        {/* Shop Address */}
                        <Form.Item
                            label="Shop Address"
                            name="shopAddress"
                            rules={[
                                { required: true, message: 'Please enter shop address' }
                            ]}
                        >
                            <TextArea
                                placeholder="Enter your shop/business address with landmark"
                                rows={3}
                                className="sw-register-dashboard-textarea"
                            />
                        </Form.Item>

                        {/* Distance */}
                        <Form.Item
                            label="Distance from City Center"
                            name="distance"
                            rules={[
                                { required: true, message: 'Please enter distance' },
                                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid distance' }
                            ]}
                        >
                            <Input
                                placeholder="e.g. 2.5"
                                size="large"
                                suffix="km"
                                className="sw-register-dashboard-input"
                            />
                        </Form.Item>

                        {/* Price */}
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                { required: true, message: 'Please enter price' },
                                { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid price' }
                            ]}
                        >
                            <Input
                                placeholder="e.g. 1499.99"
                                size="large"
                                prefix="₹"
                                className="sw-register-dashboard-input"
                            />
                        </Form.Item>

                        {/* Category */}
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                { required: true, message: 'Please select a category' }
                            ]}
                        >
                            <div className="sw-register-dashboard-category-buttons">
                                <Form.Item name="category" noStyle>
                                    <Select
                                        placeholder="Select category"
                                        size="large"
                                        className="sw-register-dashboard-select-hidden"
                                    >
                                        <Option value="Sustainable">Sustainable</Option>
                                        <Option value="Recycled">Recycled</Option>
                                        <Option value="Cleaners">Cleaners</Option>
                                    </Select>
                                </Form.Item>

                                <div className="sw-register-dashboard-category-chips">
                                    {['Sustainable', 'Recycled', 'Cleaners'].map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={`sw-register-dashboard-category-chip ${form.getFieldValue('category') === cat ? 'active' : ''
                                                }`}
                                            onClick={() => form.setFieldsValue({ category: cat })}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Form.Item>

                        {/* Description */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                { required: true, message: 'Please enter product description' }
                            ]}
                        >
                            <TextArea
                                placeholder="Describe the key features and sustainability impact of your product..."
                                rows={4}
                                className="sw-register-dashboard-textarea"
                            />
                        </Form.Item>

                        {/* Product Imagery */}
                        <Form.Item
                            label="Product Imagery"
                            name="images"
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={() => false}
                                maxCount={5}
                                className="sw-register-dashboard-upload"
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                            <p className="sw-register-dashboard-upload-note">PNG, JPG up to 10MB</p>
                        </Form.Item>

                        {/* Action Buttons */}
                        <div className="sw-register-dashboard-actions">
                            <Button
                                size="large"
                                onClick={handleSaveAndAddAnother}
                                loading={loading}
                                className="sw-register-dashboard-btn-secondary"
                                icon={<PlusOutlined />}
                            >
                                Save & Add Another
                            </Button>

                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={loading}
                                className="sw-register-dashboard-btn-primary"
                            >
                                Register Product
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterProduct;
