import React from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Vendor {
    key: string;
    name: string;
    email: string;
    service: string;
    pan: string;
    totalOrders: number;
}

const Vendors: React.FC = () => {
    const columns: ColumnsType<Vendor> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'PAN',
            dataIndex: 'pan',
            key: 'pan',
        },
        {
            title: 'Total Orders',
            dataIndex: 'totalOrders',
            key: 'totalOrders',
        },
    ];

    const data: Vendor[] = [
        {
            key: '1',
            name: 'ABC Suppliers',
            email: 'abc@email.com',
            service: 'Construction Materials',
            pan: 'ABCDE1234F',
            totalOrders: 123,
        },
        {
            key: '2',
            name: 'XYZ Materials',
            email: 'xyz@email.com',
            service: 'Construction Materials',
            pan: 'XYZAB5678G',
            totalOrders: 89,
        },
    ];

    return (
        <div className="sw-ad-view-container">
            <Title level={5} style={{ marginBottom: '20px', color: '#333' }}>All Vendors</Title>
            <Table columns={columns} dataSource={data} className="custom-table" scroll={{ x: 800 }} />
        </div>
    );
};

export default Vendors;
