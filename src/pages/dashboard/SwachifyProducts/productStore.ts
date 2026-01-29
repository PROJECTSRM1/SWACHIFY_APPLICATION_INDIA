// Product state management using localStorage
export interface Product {
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
    shopAddress?: string;
    description?: string;
    stock?: number;
}

const STORAGE_KEY = 'swachify_products';

// Get all products from localStorage
export const getProducts = (): Product[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading products from localStorage:', error);
        return [];
    }
};

// Save products to localStorage
export const saveProducts = (products: Product[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        console.error('Error saving products to localStorage:', error);
    }
};

// Add a new product
export interface NewProductInput {
    name: string;
    company: string;
    category: 'Sustainable' | 'Recycled' | 'Cleaners' | 'Entrepreneur' | 'Company';
    image: string;
    price: number;
    distance?: string;
    shopAddress?: string;
    description?: string;
}

export const addProduct = (productData: NewProductInput): Product => {
    const products = getProducts();
    const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        rating: 0,
        reviews: 0,
        distance: productData.distance || '0 km',
        isNew: true,
    };

    products.unshift(newProduct); // Add to beginning
    saveProducts(products);
    return newProduct;
};

// Update a product
export const updateProduct = (id: string, updates: Partial<Product>): void => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        saveProducts(products);
    }
};

// Delete a product
export const deleteProduct = (id: string): void => {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
};

// Initialize with mock data if empty
export const initializeMockData = (): void => {
    const existing = getProducts();

    if (existing.length === 0) {
        const mockProducts: Product[] = [
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
                isFeatured: true,
                shopAddress: '123 Green Street, Eco District',
                description: 'Handcrafted lavender soap made with organic ingredients'
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
                isNew: true,
                shopAddress: '456 Bamboo Avenue',
                description: 'Eco-friendly bamboo toothbrush set'
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
                shopAddress: '789 Recycled Road',
                description: 'Reusable glass water bottle'
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
                shopAddress: '321 Cotton Lane',
                description: 'Organic cotton tote bag'
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
                shopAddress: '555 Clean Street',
                description: 'Natural cleaning products kit'
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
                isFeatured: true,
                shopAddress: '888 Bee Hive Road',
                description: 'Reusable beeswax food wraps'
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
                shopAddress: '999 Paper Mill Lane',
                description: 'Notebooks made from recycled paper'
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
                isNew: true,
                shopAddress: '777 Jute Junction',
                description: 'Organic jute shopping bag'
            },
        ];

        saveProducts(mockProducts);
    }
};
