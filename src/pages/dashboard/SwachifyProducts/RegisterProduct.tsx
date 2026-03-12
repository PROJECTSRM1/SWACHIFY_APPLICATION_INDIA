import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import {
    CloseOutlined,
    PlusOutlined,
    CheckOutlined,
    CameraOutlined
} from '@ant-design/icons';
import './RegisterProduct.css';
import { addProduct } from './productStore';

const { TextArea } = Input;

interface RegisterProductProps {
    onBack: () => void;
    hideHeader?: boolean;
}

const RegisterProduct: React.FC<RegisterProductProps> = ({ onBack, hideHeader = false }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('Sustainable');

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            addProduct({
                name: values.productName,
                company: values.companyName,
                category: selectedCategory as any,
                image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=3087&auto=format&fit=crop',
                price: parseFloat(values.price),
                distance: '0 km',
                shopAddress: values.shopAddress,
            });

            message.success(`Product "${values.productName}" registered successfully!`);
            form.resetFields();
            setTimeout(onBack, 1000);
        } catch (error) {
            message.error('Failed to register product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sw-register-product-page">
            {/* Header */}
            {!hideHeader && (
                <header className="sw-register-header">
                    <button className="sw-close-btn" onClick={onBack} aria-label="Close">
                        <CloseOutlined />
                    </button>
                    <div className="sw-register-title">Register Product</div>
                </header>
            )}

            <div className="sw-register-container">
                <div className="sw-register-content">
                    {/* Header Details */}
                    <div className="sw-form-intro">
                        <h1 className="sw-form-section-title">Product Details</h1>
                        <p className="sw-form-section-subtitle">
                            List your sustainable products on Swachify Market. All fields with * are required.
                        </p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="sw-dark-form"
                        requiredMark={false}
                    >
                        {/* Company Name */}
                        <Form.Item
                            label="Company / Entrepreneur Name *"
                            name="companyName"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="e.g. EcoLife Solutions" className="sw-dark-input" />
                        </Form.Item>

                        {/* Product Name */}
                        <Form.Item
                            label="Product Name *"
                            name="productName"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="e.g. Bamboo Toothbrush" className="sw-dark-input" />
                        </Form.Item>

                        {/* Shop Address */}
                        <Form.Item
                            label="Shop Address *"
                            name="shopAddress"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <TextArea
                                placeholder="Full address of the shop/business"
                                rows={4}
                                className="sw-dark-input sw-dark-textarea"
                            />
                        </Form.Item>

                        {/* Price */}
                        <Form.Item
                            label="Price (₹) *"
                            name="price"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="0.00" className="sw-dark-input" />
                        </Form.Item>

                        {/* Category Selector */}
                        <div className="sw-category-label">Category</div>
                        <div className="sw-category-scroll-container">
                            <div className="sw-category-chips-row">
                                {['Sustainable', 'Recycled', 'Cleaners'].map((cat) => (
                                    <div
                                        key={cat}
                                        className={`sw-category-chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <Form.Item
                            label="Description * (min 10 chars)"
                            name="description"
                            rules={[{ required: true, min: 10, message: 'Min 10 chars required' }]}
                        >
                            <TextArea
                                placeholder="What makes this product special?"
                                rows={4}
                                className="sw-dark-input sw-dark-textarea"
                            />
                        </Form.Item>

                        {/* Product Imagery */}
                        <div className="sw-imagery-label">Product Imagery (At least 1) *</div>
                        <div className="sw-imagery-upload-box">
                            <div className="sw-upload-icon-wrapper">
                                <CameraOutlined />
                            </div>
                            <div className="sw-upload-main-text">Add Product Photos</div>
                            <div className="sw-upload-sub-text">Captured: 0 / 5</div>
                        </div>

                        {/* Actions */}
                        <div className="sw-form-fixed-actions">
                            <button type="button" className="sw-btn-save-another">
                                <div className="sw-icon-circle"><PlusOutlined /></div> Save & Add Another
                            </button>
                            <button type="submit" className="sw-btn-register-submit" disabled={loading}>
                                <CheckOutlined /> {loading ? 'Registering...' : 'Register Product'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegisterProduct;
