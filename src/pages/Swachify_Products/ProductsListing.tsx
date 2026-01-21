import React, { useState, useEffect } from 'react';
import {
    Input,
    Button,
    Card,
    Tag,
    Rate,
    Badge,
    Spin,
    Empty,
    message
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EnvironmentOutlined,
    ShoppingCartOutlined,
    FilterOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../landing/Header';
import FooterSection from '../landing/FooterSection';
import './Products.css';

const { Search } = Input;

// Product interface based on mobile app structure
interface Product {
    id: string;
    name: string;
    company: string;
    category: 'Sustainable' | 'Recycled' | 'Cleaners' | 'Entrepreneur' | 'Company';
    image: string;
    rating: number;
    reviews: number;
    distance: string;
    price: number;
    isFeatured?: boolean;
    isNew?: boolean;
}

// Mock data - Replace with actual API call
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Handmade Lavender Soap',
        company: "Nature's Essence",
        category: 'Entrepreneur',
        image: '/products/lavender_soap.png',
        rating: 4.8,
        reviews: 53,
        distance: '2.5 km',
        price: 10000,
        isFeatured: true
    },
    {
        id: '2',
        name: 'Bamboo Toothbrush Set',
        company: 'EcoLife Co',
        category: 'Sustainable',
        image: '/products/bamboo_toothbrush.png',
        rating: 4.6,
        reviews: 95,
        distance: '1.2 km',
        price: 800,
        isNew: true
    },
    {
        id: '3',
        name: 'Glass Water Bottle',
        company: "MIVI's Handicrafted",
        category: 'Recycled',
        image: '/products/glass_bottle.png',
        rating: 4.1,
        reviews: 74,
        distance: '3.8 km',
        price: 1000,
    },
    {
        id: '4',
        name: 'Organic Cotton Tote',
        company: 'Green Ventures',
        category: 'Sustainable',
        image: '/products/cotton_tote.png',
        rating: 3.9,
        reviews: 17,
        distance: '0.9 km',
        price: 1500,
    },
    {
        id: '5',
        name: 'Eco-Friendly Cleaning Kit',
        company: 'Clean Earth',
        category: 'Cleaners',
        image: '/products/cleaning_kit.png',
        rating: 4.7,
        reviews: 128,
        distance: '1.8 km',
        price: 1200,
    },
    {
        id: '6',
        name: 'Reusable Beeswax Wraps',
        company: 'Bee Natural',
        category: 'Sustainable',
        image: '/products/beeswax_wraps.png',
        rating: 4.5,
        reviews: 89,
        distance: '2.1 km',
        price: 650,
        isFeatured: true
    },
    {
        id: '7',
        name: 'Recycled Paper Notebooks',
        company: 'EcoWrite',
        category: 'Recycled',
        image: '/products/paper_notebooks.png',
        rating: 4.3,
        reviews: 67,
        distance: '3.2 km',
        price: 450,
    },
    {
        id: '8',
        name: 'Organic Jute Shopping Bag',
        company: 'Natural Fibers Co',
        category: 'Entrepreneur',
        image: '/products/jute_bag.png',
        rating: 4.6,
        reviews: 142,
        distance: '1.5 km',
        price: 550,
        isNew: true
    },
];

const FEATURED_ENTREPRENEURS = [
    { id: '1', name: 'Sarah K', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Mark T', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Alicia M', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '4', name: 'James W', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: '5', name: 'Sarah L', avatar: 'https://i.pravatar.cc/150?img=9' },
];

const ProductsListing: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('All Products');

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [activeFilter, searchQuery, products]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call
            // const response = await productsApi.getAll();
            // setProducts(response.data);

            // Simulating API call
            setTimeout(() => {
                setProducts(MOCK_PRODUCTS);
                setLoading(false);
            }, 500);
        } catch (error) {
            message.error('Failed to fetch products');
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        // Apply category filter
        if (activeFilter !== 'All Products') {
            filtered = filtered.filter(p => p.category === activeFilter);
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    const handleRegisterProduct = () => {
        navigate('/products/register');
    };

    const handleProductClick = (productId: string) => {
        navigate(`/products/${productId}`);
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

    return (
        <div className="sw-products-page">
            <CommonHeader selectedKey="Swachifyproducts" />

            {/* Hero Section */}
            <section className="sw-products-hero">
                <div className="sw-products-hero-content">
                    <h1 className="sw-products-hero-title">Swachify <span className="sw-products-highlight">Market</span></h1>
                    <p className="sw-products-hero-subtitle">
                        Discover sustainable products from local entrepreneurs and eco-friendly companies
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="sw-products-container">
                {/* Search and Register Section */}
                <div className="sw-products-actions">
                    <Search
                        placeholder="Search products, services, brands..."
                        prefix={<SearchOutlined />}
                        size="large"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="sw-products-search"
                        allowClear
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={handleRegisterProduct}
                        className="sw-products-register-btn"
                    >
                        Register Product
                    </Button>
                </div>

                {/* Filter Tabs */}
                <div className="sw-products-filters">
                    <div className="sw-products-filter-tabs">
                        {['All Products', 'Sustainable', 'Recycled', 'Cleaners'].map((filter) => (
                            <button
                                key={filter}
                                className={`sw-products-filter-tab ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter === 'Sustainable' && <span className="filter-icon">🌱</span>}
                                {filter === 'Recycled' && <span className="filter-icon">♻️</span>}
                                {filter === 'Cleaners' && <span className="filter-icon">🧹</span>}
                                {filter}
                            </button>
                        ))}
                    </div>
                    <Button
                        icon={<FilterOutlined />}
                        className="sw-products-sort-btn"
                    >
                        Sort & Filter
                    </Button>
                </div>

                {/* Products Count */}
                <div className="sw-products-count">
                    <p>{filteredProducts.length} products found</p>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="sw-products-loading">
                        <Spin size="large" />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <Empty
                        description="No products found"
                        className="sw-products-empty"
                    />
                ) : (
                    <div className="sw-products-grid">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                hoverable
                                className="sw-product-card"
                                onClick={() => handleProductClick(product.id)}
                                cover={
                                    <div className="sw-product-image-wrapper">
                                        <img
                                            alt={product.name}
                                            src={product.image}
                                            className="sw-product-image"
                                        />
                                        {product.isNew && (
                                            <Badge.Ribbon text="NEW" color="red" className="sw-product-ribbon" />
                                        )}
                                        {product.isFeatured && (
                                            <div className="sw-product-featured-badge">Featured</div>
                                        )}
                                    </div>
                                }
                            >
                                <div className="sw-product-content">
                                    <div className="sw-product-header">
                                        <Tag color={getCategoryColor(product.category)} className="sw-product-category">
                                            {product.category}
                                        </Tag>
                                    </div>

                                    <h3 className="sw-product-name">{product.name}</h3>
                                    <p className="sw-product-company">{product.company}</p>

                                    <div className="sw-product-rating">
                                        <Rate disabled defaultValue={product.rating} allowHalf className="sw-product-stars" />
                                        <span className="sw-product-rating-text">{product.rating}</span>
                                        <span className="sw-product-reviews">({product.reviews})</span>
                                    </div>

                                    <div className="sw-product-footer">
                                        <div className="sw-product-location">
                                            <EnvironmentOutlined />
                                            <span>{product.distance}</span>
                                        </div>
                                        <div className="sw-product-price">₹{product.price.toLocaleString()}</div>
                                    </div>

                                    <Button
                                        type="primary"
                                        icon={<ShoppingCartOutlined />}
                                        block
                                        className="sw-product-cart-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            message.success('Added to cart!');
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Featured Entrepreneurs Section */}
                <section className="sw-products-entrepreneurs">
                    <h2 className="sw-products-section-title">Featured Entrepreneurs</h2>
                    <div className="sw-entrepreneurs-grid">
                        {FEATURED_ENTREPRENEURS.map((entrepreneur) => (
                            <div key={entrepreneur.id} className="sw-entrepreneur-card">
                                <img
                                    src={entrepreneur.avatar}
                                    alt={entrepreneur.name}
                                    className="sw-entrepreneur-avatar"
                                />
                                <p className="sw-entrepreneur-name">{entrepreneur.name}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <FooterSection selectedKey="Swachifyproducts" />
        </div>
    );
};

export default ProductsListing;
