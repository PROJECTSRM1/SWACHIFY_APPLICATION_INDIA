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
import type { ColumnsType } from "antd/es/table";

import "./Orders.css";

const { Option } = Select;
const { Search } = Input;

import { getOrders, type Order, type OrderItem } from "./orderStore";

interface OrdersProps {
  onBack: () => void;
}

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
      setOrders(getOrders());
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

  const columns: ColumnsType<Order> = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      responsive: ["xs", "sm", "md", "lg"],
      render: (orderNumber: string) => (
        <span className="orders-number">{orderNumber}</span>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      responsive: ["md", "lg"],
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
      responsive: ["xs", "sm", "md", "lg"],
      render: (amount: number) => (
        <span className="orders-amount">₹{amount.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      responsive: ["xs", "sm", "md", "lg"],
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      align: "center",
      responsive: ["md", "lg"],
      render: (status: string) => (
        <Tag color={getPaymentStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      responsive: ["md", "lg"],
      render: (date: string) => formatDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      responsive: ["xs", "sm", "md", "lg"],
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

        {/* Orders Table */}
        <Card
          className="orders-table-card"
          title="Orders List"
          extra={
            <Space size="middle" wrap>
              <Input
                placeholder="Search by order number, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                prefix={<SearchOutlined style={{ color: "#999" }} />}
                style={{ width: 260 }}
              />

              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 160 }}
              >
                <Option value="all">All Status</Option>
                <Option value="pending">Pending</Option>
                <Option value="processing">Processing</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="delivered">Delivered</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Space>
          }
        >
          {filteredOrders.length === 0 ? (
            <Empty description="No orders found" />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredOrders}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 900 }}
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
