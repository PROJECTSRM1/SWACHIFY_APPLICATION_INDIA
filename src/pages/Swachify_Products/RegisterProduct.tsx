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
import { useNavigate } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';
import './Products.css';

const { TextArea } = Input;
const { Option } = Select;

interface ProductFormData {
    companyName: string;
    productName: string;
    shopAddress: string;
    price: string;
    category: string;
    description: string;
    images: UploadFile[];
}

const RegisterProduct: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = async (values: ProductFormData) => {
        setLoading(true);
        try {
            // TODO: Implement actual API call
            console.log('Form values:', values);
            console.log('Images:', fileList);

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            message.success('Product registered successfully!');
            navigate('/products');
        } catch (error) {
            message.error('Failed to register product');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndAddAnother = async () => {
        try {
            const values = await form.validateFields();
            await handleSubmit(values);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div className="sw-register-upload-placeholder">
            <CameraOutlined className="sw-register-upload-icon" />
            <div className="sw-register-upload-text">Add Photos</div>
            <div className="sw-register-upload-hint">PNG, JPG up to 10MB</div>
        </div>
    );

    return (
        <div className="sw-register-page">
            {/* Header */}
            <div className="sw-register-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/products')}
                    className="sw-register-back-btn"
                />
                <h1 className="sw-register-title">Register Product</h1>
            </div>

            {/* Content */}
            <div className="sw-register-container">
                <Card className="sw-register-card">
                    <div className="sw-register-intro">
                        <h2 className="sw-register-heading">Product Registration</h2>
                        <p className="sw-register-description">
                            Enter the details of your Swachify product below to list it on platform.
                        </p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="sw-register-form"
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
                                className="sw-register-input"
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
                                className="sw-register-input"
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
                                className="sw-register-textarea"
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
                                className="sw-register-input"
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
                            <div className="sw-register-category-buttons">
                                <Form.Item name="category" noStyle>
                                    <Select
                                        placeholder="Select category"
                                        size="large"
                                        className="sw-register-select-hidden"
                                    >
                                        <Option value="Sustainable">Sustainable</Option>
                                        <Option value="Recycled">Recycled</Option>
                                        <Option value="Cleaners">Cleaners</Option>
                                    </Select>
                                </Form.Item>

                                <div className="sw-register-category-chips">
                                    {['Sustainable', 'Recycled', 'Cleaners'].map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={`sw-register-category-chip ${form.getFieldValue('category') === cat ? 'active' : ''
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
                                className="sw-register-textarea"
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
                                className="sw-register-upload"
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                            <p className="sw-register-upload-note">PNG, JPG up to 10MB</p>
                        </Form.Item>

                        {/* Action Buttons */}
                        <div className="sw-register-actions">
                            <Button
                                size="large"
                                onClick={handleSaveAndAddAnother}
                                loading={loading}
                                className="sw-register-btn-secondary"
                                icon={<PlusOutlined />}
                            >
                                Save & Add Another
                            </Button>

                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={loading}
                                className="sw-register-btn-primary"
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
