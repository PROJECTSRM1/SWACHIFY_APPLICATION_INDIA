import React from 'react';
import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Ticket {
    key: string;
    ticketId: string;
    customer: string;
    service: string;
    date: string;
    status: 'pending' | 'accepted' | 'completed' | 'in-progress';
    assignedTo: string;
}

const AllTickets: React.FC = () => {
    const columns: ColumnsType<Ticket> = [
        {
            title: 'Ticket ID',
            dataIndex: 'ticketId',
            key: 'ticketId',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
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
            customer: 'Rajesh Kumar',
            service: 'Cleaning - Deep Cleaning',
            date: '2025-11-28',
            status: 'pending',
            assignedTo: '-',
        },
        {
            key: '2',
            ticketId: 'TKT002',
            customer: 'Rahul Verma',
            service: 'Construction Materials - Cement',
            date: '2025-11-27',
            status: 'accepted',
            assignedTo: 'ABC Suppliers (Vendor)',
        },
        {
            key: '3',
            ticketId: 'TKT003',
            customer: 'Vikram Singh',
            service: 'Home Services - Plumbing',
            date: '2025-11-25',
            status: 'completed',
            assignedTo: 'John Doe (Freelancer)',
        },
        {
            key: '4',
            ticketId: 'TKT004',
            customer: 'Priya Sharma',
            service: 'Home Services - Plumbing',
            date: '2025-11-29',
            status: 'in-progress',
            assignedTo: 'Suresh Kumar (Freelancer)',
        },
    ];

    return (
        <div className="sw-ad-view-container">
            <Title level={5} style={{ marginBottom: '20px', color: '#333' }}>All Tickets</Title>
            <Table columns={columns} dataSource={data} className="custom-table" scroll={{ x: 800 }} />
        </div>
    );
};

export default AllTickets;
