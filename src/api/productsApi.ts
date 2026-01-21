import { api } from './axiosInstance';

// Product interfaces
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
    description?: string;
    isFeatured?: boolean;
    isNew?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductFormData {
    companyName: string;
    productName: string;
    shopAddress: string;
    price: string;
    category: string;
    description: string;
    images?: File[];
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
    message?: string;
}

export interface ProductResponse {
    success: boolean;
    data: Product;
    message?: string;
}

// Products API Service
const productsApi = {
    // Get all products
    getAllProducts: async (params?: {
        category?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<ProductsResponse> => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get single product by ID
    getProductById: async (id: string): Promise<ProductResponse> => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    // Register new product
    registerProduct: async (productData: ProductFormData): Promise<ProductResponse> => {
        try {
            const formData = new FormData();

            // Append text fields
            formData.append('companyName', productData.companyName);
            formData.append('productName', productData.productName);
            formData.append('shopAddress', productData.shopAddress);
            formData.append('price', productData.price);
            formData.append('category', productData.category);
            formData.append('description', productData.description);

            // Append images if present
            if (productData.images && productData.images.length > 0) {
                productData.images.forEach((image) => {
                    formData.append(`images`, image);
                });
            }

            const response = await api.post('/products/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error registering product:', error);
            throw error;
        }
    },

    // Update product
    updateProduct: async (id: string, productData: Partial<ProductFormData>): Promise<ProductResponse> => {
        try {
            const formData = new FormData();

            // Append only provided fields
            Object.entries(productData).forEach(([key, value]) => {
                if (value !== undefined && key !== 'images') {
                    formData.append(key, value as string);
                }
            });

            // Append images if present
            if (productData.images && productData.images.length > 0) {
                productData.images.forEach((image) => {
                    formData.append('images', image);
                });
            }

            const response = await api.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id: string): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    // Get featured products
    getFeaturedProducts: async (): Promise<ProductsResponse> => {
        try {
            const response = await api.get('/products/featured');
            return response.data;
        } catch (error) {
            console.error('Error fetching featured products:', error);
            throw error;
        }
    },

    // Get products by category
    getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    // Search products
    searchProducts: async (query: string): Promise<ProductsResponse> => {
        try {
            const response = await api.get('/products/search', {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },
};

export default productsApi;
