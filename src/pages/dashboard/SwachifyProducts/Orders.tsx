import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Table,
  Tag,
  Space,
  Modal,
  Descriptions,
  Timeline,
  Empty,
  Select,
  Input,
} from "antd";
import {
  ArrowLeftOutlined,
  EyeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./Orders.css";

const { Option } = Select;
const { Search } = Input;

interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
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

interface OrdersProps {
  onBack: () => void;
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

const Orders: React.FC<OrdersProps> = ({ onBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, searchQuery, orders]);

  const loadOrders = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 500);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredOrders(filtered);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewModalVisible(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "orange",
      processing: "blue",
      shipped: "cyan",
      delivered: "green",
      cancelled: "red",
    };
    return colors[status] || "default";
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: "green",
      pending: "orange",
      failed: "red",
    };
    return colors[status] || "default";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (orderNumber: string) => (
        <span className="orders-number">{orderNumber}</span>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      render: (record: Order) => (
        <div>
          <div className="orders-customer-name">{record.customerName}</div>
          <div className="orders-customer-email">{record.customerEmail}</div>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: OrderItem[]) => (
        <span>
          {items.length} item{items.length > 1 ? "s" : ""}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => (
        <span className="orders-amount">₹{amount.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <Tag color={getPaymentStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Order) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewOrder(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="orders-back-btn"
        >
          {/* Back */}
        </Button>
        <h1 className="orders-title">Orders</h1>
      </div>

      {/* Content */}
      <div className="orders-container">
        {/* Stats */}
        <div className="orders-stats">
          <div className="orders-stat">
            <ShoppingCartOutlined className="stat-icon" />
            <div className="stat-value">{orderStats.total}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="orders-stat">
            <ClockCircleOutlined className="stat-icon" />
            <div className="stat-value">
              {orderStats.pending + orderStats.processing}
            </div>
            <div className="stat-label">Active Orders</div>
          </div>
          <div className="orders-stat">
            <CheckCircleOutlined className="stat-icon" />
            <div className="stat-value">{orderStats.delivered}</div>
            <div className="stat-label">Delivered</div>
          </div>
        </div>

        {/* Filters */}
        <Card className="orders-filters-card">
          <Space size="middle" wrap>
            <Search
              placeholder="Search by order number, customer..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
            >
              <Option value="all">All Status</Option>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Space>
        </Card>

        {/* Orders Table */}
        <Card className="orders-table-card">
          {filteredOrders.length === 0 ? (
            <Empty description="No orders found" />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredOrders}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          )}
        </Card>
      </div>

      {/* View Order Modal */}
      <Modal
        title={`Order Details - ${selectedOrder?.orderNumber}`}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedOrder && (
          <div className="order-details">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Order Number" span={2}>
                {selectedOrder.orderNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Customer Name">
                {selectedOrder.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedOrder.customerEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedOrder.customerPhone}
              </Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {formatDate(selectedOrder.orderDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <Tag color={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                  {selectedOrder.paymentStatus.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Address" span={2}>
                {selectedOrder.deliveryAddress}
              </Descriptions.Item>
              {selectedOrder.trackingNumber && (
                <Descriptions.Item label="Tracking Number" span={2}>
                  {selectedOrder.trackingNumber}
                </Descriptions.Item>
              )}
            </Descriptions>

            <div className="order-items-section">
              <h3>Order Items</h3>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.productImage} alt={item.productName} />
                  <div className="order-item-details">
                    <div className="order-item-name">{item.productName}</div>
                    <div className="order-item-quantity">
                      Quantity: {item.quantity}
                    </div>
                    <div className="order-item-price">
                      ₹{item.price.toLocaleString()} each
                    </div>
                  </div>
                  <div className="order-item-total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="order-total">
                <strong>Total Amount:</strong>
                <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="order-timeline-section">
              <h3>Order Timeline</h3>
              <Timeline>
                <Timeline.Item color="green">
                  Order Placed - {formatDate(selectedOrder.orderDate)}
                </Timeline.Item>
                {selectedOrder.status !== "pending" && (
                  <Timeline.Item color="blue">Order Processing</Timeline.Item>
                )}
                {(selectedOrder.status === "shipped" ||
                  selectedOrder.status === "delivered") && (
                  <Timeline.Item color="cyan">Order Shipped</Timeline.Item>
                )}
                {selectedOrder.status === "delivered" && (
                  <Timeline.Item color="green">Order Delivered</Timeline.Item>
                )}
              </Timeline>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
