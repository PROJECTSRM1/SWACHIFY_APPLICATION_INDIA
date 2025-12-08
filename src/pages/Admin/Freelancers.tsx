

import { Badge, Button, Descriptions, Modal, Space, Table, Tag } from 'antd'
import { CheckOutlined, CloseOutlined, EyeOutlined, StarFilled } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import type { Freelancer, FreelancerStatus } from './types'
import { freelancerStatusColors } from './data'


type Props = {
  freelancers: Freelancer[]
  pendingFreelancers: Freelancer[]
  onStatusChange: (freelancerId: string, status: FreelancerStatus) => void
  onApproveRequest: (freelancerId: string) => void
  onRejectRequest: (freelancerId: string) => void
}

const FreelancersPage = ({
  freelancers,
  pendingFreelancers,
  onStatusChange,
  onApproveRequest,
  onRejectRequest,
}: Props) => {
  const [viewFreelancer, setViewFreelancer] = useState<Freelancer | null>(null)

  // Combine all freelancers (pending and active)
  const allFreelancers = useMemo(
    () => [...pendingFreelancers, ...freelancers.filter((fr) => fr.status !== 'rejected')],
    [freelancers, pendingFreelancers],
  )

  return (
    <div className="sw-ad-page-card">
      <div className="sw-ad-table-wrapper">
        <Table
          rowKey="id"
          dataSource={allFreelancers}
          pagination={{ pageSize: 10, responsive: true }}
          scroll={{ x: 'max-content' }}
          columns={[
            { title: 'ID', dataIndex: 'id', width: 100 },
            { title: 'Name', dataIndex: 'name' },
            { title: 'Email', dataIndex: 'email' },
            {
              title: 'City',
              dataIndex: 'city',
            },
            {
              title: 'Skills',
              dataIndex: 'skills',
              render: (skills: string[]) => (
                <>
                  {skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </>
              ),
            },
            {
              title: 'Status',
              render: (_, record) => (
                <Tag color={freelancerStatusColors[record.status]}>{record.status}</Tag>
              ),
            },
            {
              title: 'Rating',
              dataIndex: 'rating',
              render: (rating: number) =>
                rating > 0 ? (
                  <Badge count={rating} showZero color="gold" />
                ) : (
                  <span style={{ color: '#999' }}>N/A</span>
                ),
            },
            {
              title: 'Completed Jobs',
              dataIndex: 'completed',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              render: (age: number) => `${age} yrs`,
            },
            {
              title: 'Actions',
              render: (_, record) => (
                <Space wrap>
                  <Button icon={<EyeOutlined />} onClick={() => setViewFreelancer(record)}>
                    View
                  </Button>
                  {record.status === 'pending' && pendingFreelancers.includes(record) ? (
                    <>
                      <Button icon={<CheckOutlined />} onClick={() => onApproveRequest(record.id)}>
                        Approve
                      </Button>
                      <Button danger icon={<CloseOutlined />} onClick={() => onRejectRequest(record.id)}>
                        Reject
                      </Button>
                    </>
                  ) : record.status === 'pending' ? (
                    <>
                      <Button
                        icon={<CheckOutlined />}
                        onClick={() => onStatusChange(record.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => onStatusChange(record.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <>
                      {record.age <= 45 && (
                        <Button
                          icon={<CheckOutlined />}
                          disabled={record.status === 'approved'}
                          onClick={() => onStatusChange(record.id, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        danger
                        icon={<CloseOutlined />}
                        disabled={record.status === 'rejected'}
                        onClick={() => onStatusChange(record.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Modal
        open={!!viewFreelancer}
        title={`Freelancer Details - ${viewFreelancer?.name}`}
        onCancel={() => setViewFreelancer(null)}
        footer={<Button onClick={() => setViewFreelancer(null)}>Close</Button>}
        width={700}
      >
        {viewFreelancer && (
          <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }} size="small">
            <Descriptions.Item label="ID" span={2}>
              {viewFreelancer.id}
            </Descriptions.Item>
            <Descriptions.Item label="Name">{viewFreelancer.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{viewFreelancer.email}</Descriptions.Item>
            <Descriptions.Item label="City">{viewFreelancer.city}</Descriptions.Item>
            <Descriptions.Item label="Age">{viewFreelancer.age} years</Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              <Tag color={freelancerStatusColors[viewFreelancer.status]}>{viewFreelancer.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Skills" span={2}>
              {viewFreelancer.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Completed Jobs">{viewFreelancer.completed}</Descriptions.Item>
            <Descriptions.Item label="Rating">
              {viewFreelancer.rating > 0 ? (
                <Space>
                  <StarFilled style={{ color: '#faad14' }} />
                  {viewFreelancer.rating}
                </Space>
              ) : (
                'N/A'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Experience" span={2}>
              {viewFreelancer.age - 20} years (calculated)
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default FreelancersPage
