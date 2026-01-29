
export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: OrderItem[];
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    paymentStatus: "paid" | "pending" | "failed";
    orderDate: string;
    deliveryAddress: string;
    trackingNumber?: string;
}

// Mock orders data
const MOCK_ORDERS: Order[] = [
    {
        id: "1",
        orderNumber: "ORD-2026-001",
        customerName: "Rajesh Kumar",
        customerEmail: "rajesh@example.com",
        customerPhone: "+91 98765 43210",
        items: [
            {
                productId: "1",
                productName: "Handmade Lavender Soap",
                productImage: "/products/lavender_soap.png",
                quantity: 2,
                price: 10000,
            },
        ],
        totalAmount: 20000,
        status: "delivered",
        paymentStatus: "paid",
        orderDate: "2026-01-15T10:30:00",
        deliveryAddress: "123 Green Street, Eco District, Mumbai - 400001",
        trackingNumber: "TRK123456789",
    },
    {
        id: "2",
        orderNumber: "ORD-2026-002",
        customerName: "Priya Sharma",
        customerEmail: "priya@example.com",
        customerPhone: "+91 87654 32109",
        items: [
            {
                productId: "2",
                productName: "Bamboo Toothbrush Set",
                productImage: "/products/bamboo_toothbrush.png",
                quantity: 3,
                price: 800,
            },
            {
                productId: "6",
                productName: "Reusable Beeswax Wraps",
                productImage: "/products/beeswax_wraps.png",
                quantity: 1,
                price: 650,
            },
        ],
        totalAmount: 3050,
        status: "shipped",
        paymentStatus: "paid",
        orderDate: "2026-01-18T14:20:00",
        deliveryAddress: "456 Bamboo Avenue, Delhi - 110001",
        trackingNumber: "TRK987654321",
    },
    {
        id: "3",
        orderNumber: "ORD-2026-003",
        customerName: "Amit Patel",
        customerEmail: "amit@example.com",
        customerPhone: "+91 76543 21098",
        items: [
            {
                productId: "5",
                productName: "Eco-Friendly Cleaning Kit",
                productImage: "/products/cleaning_kit.png",
                quantity: 1,
                price: 1200,
            },
        ],
        totalAmount: 1200,
        status: "processing",
        paymentStatus: "paid",
        orderDate: "2026-01-20T09:15:00",
        deliveryAddress: "789 Clean Street, Bangalore - 560001",
    },
    {
        id: "4",
        orderNumber: "ORD-2026-004",
        customerName: "Sneha Reddy",
        customerEmail: "sneha@example.com",
        customerPhone: "+91 65432 10987",
        items: [
            {
                productId: "8",
                productName: "Organic Jute Shopping Bag",
                productImage: "/products/jute_bag.png",
                quantity: 5,
                price: 550,
            },
        ],
        totalAmount: 2750,
        status: "pending",
        paymentStatus: "pending",
        orderDate: "2026-01-21T11:00:00",
        deliveryAddress: "321 Jute Junction, Hyderabad - 500001",
    },
];

export const getOrders = (): Order[] => {
    // In a real app, this would fetch from an API or localStorage
    return MOCK_ORDERS;
};
