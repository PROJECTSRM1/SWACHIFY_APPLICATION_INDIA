import React from 'react';
import { Table, Typography, Tag, Button, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Freelancer {
    key: string;
    name: string;
    email: string;
    skills: string;
    completedJobs: number;
    rating: number;
    status: 'active' | 'offline' | 'busy' | 'new';
    action?: 'approve' | 'reject';
}

const Freelancers: React.FC = () => {

    const handleApprove = (name: string) => {
        message.success(`${name} approved`);
    };

    const handleReject = (name: string) => {
        message.error(`${name} rejected`);
    };

    const columns: ColumnsType<Freelancer> = [
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
            title: 'Skills',
            dataIndex: 'skills',
            key: 'skills',
        },
        {
            title: 'Completed Jobs',
            dataIndex: 'completedJobs',
            key: 'completedJobs',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <span>
                    <span style={{ color: '#faad14', marginRight: 4 }}>★</span>
                    {rating}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                if (status === 'active') color = 'green';
                if (status === 'offline') color = 'red';
                if (status === 'busy') color = 'orange';
                if (status === 'new') color = 'blue';

                return (
                    <Tag
                        color={color}
                        style={{ borderRadius: '10px', padding: '0 10px', textTransform: 'capitalize' }}
                    >
                        {status}
                    </Tag>
                );
            },
        },

    //     // ⭐ ACTION COLUMN
{
    title: 'Action',
    key: 'action',
    render: (_, record) => {
        const showApprove = record.completedJobs < 45; // ✅ Condition

        return (
            <Space>
                {showApprove && (
                    <Button
                        type="primary"
                        size="small"
                        style={{ backgroundColor: 'green', borderColor: 'green' }}
                        onClick={() => handleApprove(record.name)}
                    >
                        Approve
                    </Button>
                )}

                <Button
                    danger
                    size="small"
                    onClick={() => handleReject(record.name)}
                >
                    Reject
                </Button>
            </Space>
        );
    },
},
    ]
    const data: Freelancer[] = [
        {
            key: '1',
            name: 'John Doe',
            email: 'john@email.com',
            skills: 'Plumbing, Electrical',
            completedJobs: 45,
            rating: 4.8,
            status: 'active',
        },
        {
            key: '2',
            name: 'Suresh Kumar',
            email: 'suresh@email.com',
            skills: 'Cleaning, Home Services',
            completedJobs: 67,
            rating: 4.9,
            status: 'busy',
        },
        {
            key: '3',
            name: 'Ravi Singh',
            email: 'ravi@email.com',
            skills: 'Carpentry, Painting',
            completedJobs: 0,
            rating: 4.6,
            status: 'offline',
        },
        {
            key: '4',
            name: 'Arun Verma',
            email: 'arun@email.com',
            skills: 'Painting, Carpentry',
            completedJobs: 0,
            rating: 4.2,
            status: 'new',
        },
    ];

    return (
        <div className="sw-ad-view-container">
            <Title level={5} style={{ marginBottom: '20px', color: '#333' }}>
                All Freelancers
            </Title>

            <Table
                columns={columns}
                dataSource={data}
                className="custom-table"
                scroll={{ x: 900 }}
            />
        </div>
    );
};

export default Freelancers;
