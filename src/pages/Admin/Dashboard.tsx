import React from 'react';
import { Card, Col, Row, Table, Tag, Typography } from 'antd';
import {
    UsergroupAddOutlined,
    SolutionOutlined,
    ShopOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
//import '../index.css';

const { Title } = Typography;

interface Ticket {
    key: string;
    ticketId: string;
    service: string;
    status: 'pending' | 'accepted' | 'completed' | 'in-progress';
    assignedTo: string;
}

const Dashboard: React.FC = () => {
    const stats = [
        { title: 'Total Users', value: 1247, icon: <UsergroupAddOutlined />, color: '#1890ff' },
        { title: 'Total Freelancers', value: 342, icon: <SolutionOutlined />, color: '#722ed1' },
        { title: 'Total Vendors', value: 89, icon: <ShopOutlined />, color: '#fa8c16' },
        { title: 'Active Tickets', value: 156, icon: <ClockCircleOutlined />, color: '#1890ff' },
        { title: 'Completed Tickets', value: 2341, icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />, color: '#52c41a' },
        { title: 'Pending Tickets', value: 67, icon: <ArrowUpOutlined style={{ color: '#f5222d' }} />, color: '#f5222d' },
    ];

    const columns: ColumnsType<Ticket> = [
        {
            title: 'Ticket ID',
            dataIndex: 'ticketId',
            key: 'ticketId',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                if (status === 'pending') color = 'gold';
                if (status === 'accepted') color = 'blue';
                if (status === 'completed') color = 'green';
                if (status === 'in-progress') color = 'purple';
                return (
                    <Tag color={color} key={status} style={{ borderRadius: '10px', padding: '0 10px' }}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
        },
    ];

    const data: Ticket[] = [
        {
            key: '1',
            ticketId: 'TKT001',
            service: 'Cleaning',
            status: 'pending',
            assignedTo: '-',
        },
        {
            key: '2',
            ticketId: 'TKT002',
            service: 'Construction Materials',
            status: 'accepted',
            assignedTo: 'ABC Suppliers (Vendor)',
        },
    ];

    return (
        <div className="sw-ad-dashboard-container">
            <Title level={5} style={{ marginBottom: '20px', color: '#333' }}>Dashboard Overview</Title>

            <Row gutter={[24, 24]}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <Card bordered={false} className="stat-card">
                            <div className="stat-content">
                                <div>
                                    <div className="stat-title">{stat.title}</div>
                                    <div className="stat-value">{stat.value}</div>
                                </div>
                                <div className="stat-icon" style={{ color: stat.color }}>
                                    {stat.icon}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="sw-ad-recent-tickets-section">
                <Title level={5} style={{ marginBottom: '20px', marginTop: '40px', color: '#333' }}>Recent Tickets</Title>
                <Table columns={columns} dataSource={data} pagination={false} className="custom-table" />
            </div>
        </div>
    );
};

export default Dashboard;
