import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Table,
    Tag,
    Space,
    Modal,
    Form,
    Input,
    Select,
    Upload,
    message,
    Popconfirm,
    Empty
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    CameraOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { getProducts, updateProduct, deleteProduct, type Product } from './productStore';
import './MyProducts.css';

const { TextArea } = Input;
const { Option } = Select;

interface MyProductsProps {
    onBack: () => void;
}

const MyProducts: React.FC<MyProductsProps> = ({ onBack }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoading(true);
        try {
            const allProducts = getProducts();
            setProducts(allProducts);
        } catch (error) {
            message.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        form.setFieldsValue({
            companyName: product.company,
            productName: product.name,
            shopAddress: product.shopAddress || '',
            price: product.price.toString(),
            category: product.category,
            description: product.description || '',
        });
        setEditModalVisible(true);
    };

    const handleView = (product: Product) => {
        setSelectedProduct(product);
        setViewModalVisible(true);
    };

    const handleDelete = (productId: string) => {
        try {
            deleteProduct(productId);
            message.success('Product deleted successfully');
            loadProducts();
        } catch (error) {
            message.error('Failed to delete product');
        }
    };

    const handleEditSubmit = async (values: any) => {
        if (!selectedProduct) return;

        try {
            const imageUrl = fileList.length > 0 && fileList[0].thumbUrl
                ? fileList[0].thumbUrl
                : selectedProduct.image;

            updateProduct(selectedProduct.id, {
                name: values.productName,
                company: values.companyName,
                category: values.category,
                image: imageUrl,
                price: parseFloat(values.price),
                shopAddress: values.shopAddress,
                description: values.description,
            });

            message.success('Product updated successfully');
            setEditModalVisible(false);
            form.resetFields();
            setFileList([]);
            loadProducts();
        } catch (error) {
            message.error('Failed to update product');
        }
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Sustainable': 'green',
            'Recycled': 'blue',
            'Cleaners': 'orange',
            'Entrepreneur': 'cyan',
            'Company': 'purple'
        };
        return colors[category] || 'default';
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 80,
            render: (image: string) => (
                <img src={image} alt="Product" className="my-products-table-image" />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: Product) => (
                <div>
                    <div className="my-products-name">{name}</div>
                    <div className="my-products-company">{record.company}</div>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => (
                <Tag color={getCategoryColor(category)}>{category}</Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `₹${price.toLocaleString()}`,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number, record: Product) => (
                <div>
                    <span className="my-products-rating">⭐ {rating.toFixed(1)}</span>
                    <span className="my-products-reviews">({record.reviews})</span>
                </div>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (record: Product) => (
                <Space>
                    {record.isNew && <Tag color="red">NEW</Tag>}
                    {record.isFeatured && <Tag color="gold">FEATURED</Tag>}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: Product) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                    >
                        View
                    </Button>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete Product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="my-products-page">
            {/* Header */}
            <div className="my-products-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={onBack}
                    className="my-products-back-btn"
                >
                    Back
                </Button>
                <h1 className="my-products-title">My Products</h1>
            </div>

            {/* Content */}
            <div className="my-products-container">
                <Card className="my-products-card">
                    <div className="my-products-stats">
                        <div className="my-products-stat">
                            <div className="stat-value">{products.length}</div>
                            <div className="stat-label">Total Products</div>
                        </div>
                        <div className="my-products-stat">
                            <div className="stat-value">{products.filter(p => p.isNew).length}</div>
                            <div className="stat-label">New Products</div>
                        </div>
                        <div className="my-products-stat">
                            <div className="stat-value">{products.filter(p => p.isFeatured).length}</div>
                            <div className="stat-label">Featured</div>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <Empty
                            description="No products found"
                            className="my-products-empty"
                        >
                            <Button type="primary" onClick={onBack}>
                                Register Your First Product
                            </Button>
                        </Empty>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={products}
                            rowKey="id"
                            loading={loading}
                            pagination={{ pageSize: 10 }}
                            className="my-products-table"
                        />
                    )}
                </Card>
            </div>

            {/* Edit Modal */}
            <Modal
                title="Edit Product"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    form.resetFields();
                    setFileList([]);
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEditSubmit}
                >
                    <Form.Item
                        label="Company / Entrepreneur Name"
                        name="companyName"
                        rules={[{ required: true, message: 'Please enter company name' }]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Product Name"
                        name="productName"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Shop Address"
                        name="shopAddress"
                    >
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter price' }]}
                    >
                        <Input size="large" prefix="₹" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select category' }]}
                    >
                        <Select size="large">
                            <Option value="Sustainable">Sustainable</Option>
                            <Option value="Recycled">Recycled</Option>
                            <Option value="Cleaners">Cleaners</Option>
                            <Option value="Entrepreneur">Entrepreneur</Option>
                            <Option value="Company">Company</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Product Image">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            {fileList.length === 0 && (
                                <div>
                                    <CameraOutlined />
                                    <div>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" size="large">
                                Update Product
                            </Button>
                            <Button onClick={() => setEditModalVisible(false)} size="large">
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* View Modal */}
            <Modal
                title="Product Details"
                open={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setViewModalVisible(false)}>
                        Close
                    </Button>
                ]}
                width={600}
            >
                {selectedProduct && (
                    <div className="product-view-details">
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="product-view-image"
                        />
                        <div className="product-view-info">
                            <h2>{selectedProduct.name}</h2>
                            <p className="product-view-company">{selectedProduct.company}</p>
                            <Tag color={getCategoryColor(selectedProduct.category)}>
                                {selectedProduct.category}
                            </Tag>
                            <div className="product-view-price">₹{selectedProduct.price.toLocaleString()}</div>
                            <div className="product-view-rating">
                                ⭐ {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviews} reviews)
                            </div>
                            {selectedProduct.shopAddress && (
                                <div className="product-view-address">
                                    <strong>Address:</strong> {selectedProduct.shopAddress}
                                </div>
                            )}
                            {selectedProduct.description && (
                                <div className="product-view-description">
                                    <strong>Description:</strong>
                                    <p>{selectedProduct.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyProducts;
