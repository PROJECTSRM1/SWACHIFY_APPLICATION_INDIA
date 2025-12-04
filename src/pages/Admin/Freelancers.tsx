import { Avatar, Button, Card, List, Space, Statistic, Tag, Typography } from 'antd'
import { CheckOutlined, CloseOutlined, StarFilled } from '@ant-design/icons'
import { useMemo } from 'react'
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
  const filteredFreelancers = useMemo(
    () =>
      freelancers.filter((fr) => fr.status !== 'rejected'),
    [freelancers],
  )

  return (
    <div className="sw-ad-page-card">
      <Card title="Pending Requests" className="sw-ad-pending-card">
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
          dataSource={pendingFreelancers}
          locale={{ emptyText: 'No pending requests' }}
          renderItem={(freelancer) => (
            <List.Item>
              <Card className="sw-ad-freelancer-card">
                <Space align="center" size="large" wrap>
                  <Avatar size={48}>{freelancer.name.charAt(0)}</Avatar>
                  <div>
                    <Typography.Title level={4} className="sw-ad-freelancer-name">
                      {freelancer.name}
                    </Typography.Title>
                    <Typography.Text type="secondary">{freelancer.email}</Typography.Text>
                    <div>
                      <Tag>{freelancer.city}</Tag>
                    </div>
                  </div>
                </Space>
                <div className="sw-ad-freelancer-tag-group">
                  {freelancer.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
                <div className="sw-ad-freelancer-meta">
                  <Statistic title="Experience (yrs)" value={freelancer.age - 20} />
                  <Statistic title="Profile Age" value={freelancer.age} suffix="yrs" />
                </div>
                <Space wrap>
                  <Button icon={<CheckOutlined />} onClick={() => onApproveRequest(freelancer.id)}>
                    Approve
                  </Button>
                  <Button danger icon={<CloseOutlined />} onClick={() => onRejectRequest(freelancer.id)}>
                    Reject
                  </Button>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Typography.Title level={4}>Active Freelancers</Typography.Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
        dataSource={filteredFreelancers}
        renderItem={(freelancer) => (
          <List.Item>
            <Card className="sw-ad-freelancer-card">
              <Space align="center" size="large" wrap>
                <Avatar size={48}>{freelancer.name.charAt(0)}</Avatar>
                <div>
                  <Typography.Title level={4} className="sw-ad-freelancer-name">
                    {freelancer.name}
                  </Typography.Title>
                  <Space>
                    <Tag color={freelancerStatusColors[freelancer.status]}>{freelancer.status}</Tag>
                    <Tag icon={<StarFilled />} color="gold">
                      {freelancer.rating}
                    </Tag>
                  </Space>
                </div>
              </Space>
              <div className="sw-ad-freelancer-tag-group">
                {freelancer.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
              <div className="sw-ad-freelancer-meta">
                <Statistic title="Completed Jobs" value={freelancer.completed} />
                <Statistic title="Age" value={freelancer.age} suffix="yrs" />
              </div>
              <Space wrap>
                {freelancer.age <= 45 && (
                  <Button
                    
                    icon={<CheckOutlined />}
                    disabled={freelancer.status === 'approved'}
                    onClick={() => onStatusChange(freelancer.id, 'approved')}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  danger
                  icon={<CloseOutlined />}
                  disabled={freelancer.status === 'rejected'}
                  onClick={() => onStatusChange(freelancer.id, 'rejected')}
                >
                  Reject
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />

    </div>
  )
}

export default FreelancersPage

