import React from 'react';
import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface User {
    key: string;
    name: string;
    email: string;
    joinDate: string;
    status: 'Active' | 'Inactive';
}

const Users: React.FC = () => {
    const columns: ColumnsType<User> = [
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
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'red'} key={status} style={{ borderRadius: '10px', padding: '0 10px' }}>
                    {status}
                </Tag>
            ),
        },
    ];

    const data: User[] = [
        {
            key: '1',
            name: 'Rajesh Kumar',
            email: 'rajesh@email.com',
            joinDate: '2025-01-15',
            status: 'Active',
        },
        {
            key: '2',
            name: 'Priya Sharma',
            email: 'priya@email.com',
            joinDate: '2025-02-20',
            status: 'Active',
        },
        {
            key: '3',
            name: 'Amit Patel',
            email: 'amit@email.com',
            joinDate: '2025-03-10',
            status: 'Active',
        },
    ];

    return (
        <div className="sw-ad-view-container">
            <Title level={5} style={{ marginBottom: '20px', color: '#333' }}>All Users</Title>
            <Table columns={columns} dataSource={data} className="custom-table" scroll={{ x: 600 }} />
        </div>
    );
};

export default Users;
