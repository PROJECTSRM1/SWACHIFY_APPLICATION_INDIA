
import { Badge, Button,  Modal, Space, Table, Tag, Tooltip,  } from 'antd'

import { CheckOutlined, CloseOutlined, EyeOutlined, StarFilled, UserOutlined } from '@ant-design/icons'
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
  const [viewSkillsFreelancer, setViewSkillsFreelancer] = useState<Freelancer | null>(null)

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
              render: (skills: string[], record: Freelancer) => {
                const maxVisible = 2
                const visibleSkills = skills.slice(0, maxVisible)
                const hasMore = skills.length > maxVisible
                const maxSkillLength = 10

                const truncateSkill = (skill: string) => {
                  if (skill.length > maxSkillLength) {
                    return skill.substring(0, maxSkillLength) + '...'
                  }
                  return skill
                }

                return (
                  <Space wrap size="small" className="sw-ad-skills-cell">
                    {visibleSkills.map((skill) => {
                      const isTruncated = skill.length > maxSkillLength
                      const displayText = truncateSkill(skill)

                      return isTruncated ? (
                        <Tooltip key={skill} title={skill} placement="top">
                          <Tag className="sw-ad-skill-tag">{displayText}</Tag>
                        </Tooltip>
                      ) : (
                        <Tag key={skill} className="sw-ad-skill-tag">{displayText}</Tag>
                      )
                    })}
                    {hasMore && (
                      <>
                        <span className="sw-ad-skills-ellipsis">...</span>
                        <Button
                          type="link"
                          size="small"
                          onClick={() => setViewSkillsFreelancer(record)}
                          className="sw-ad-view-more-btn"
                        >
                          View More
                        </Button>
                      </>
                    )}
                  </Space>
                )
              },
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
                  <span className="sw-ad-rating-na">N/A</span>
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
          <>
            <div className="sw-ad-profile-header">
              <div className="sw-ad-profile-img-placeholder">
                <UserOutlined />
              </div>
              <div className="sw-ad-profile-basic-info">
                <h3 className="sw-ad-profile-name">{viewFreelancer.name}</h3>
                <div className="sw-ad-profile-meta-row">
                  <span className="sw-ad-detail-value" style={{ fontWeight: 400 }}>{viewFreelancer.id}</span>
                  <span style={{ color: '#d9d9d9' }}>|</span>
                  <span className="sw-ad-detail-value" style={{ fontWeight: 400 }}>{viewFreelancer.email}</span>
                </div>
                <div className="sw-ad-profile-meta-row">
                  <span className="sw-ad-detail-value" style={{ fontWeight: 400 }}>{viewFreelancer.city}</span>
                  <span style={{ color: '#d9d9d9' }}>|</span>
                  <span className="sw-ad-detail-value" style={{ fontWeight: 400 }}>{viewFreelancer.age} Years Old</span>
                </div>
                <div className="sw-ad-profile-meta-row" style={{ marginTop: 4 }}>
                  <Tag color={freelancerStatusColors[viewFreelancer.status]} style={{ margin: 0, borderRadius: 12, padding: '0 12px' }}>
                    {viewFreelancer.status.toUpperCase()}
                  </Tag>
                </div>
              </div>
            </div>

            <div className="sw-ad-info-card">
              <div className="sw-ad-section-title">Personal Information</div>
              <div className="sw-ad-details-grid">
                <div className="sw-ad-detail-item">
                  <span className="sw-ad-detail-label">Aadhaar Number</span>
                  <span className="sw-ad-detail-value">{viewFreelancer.aadhaar || 'N/A'}</span>
                </div>
                <div className="sw-ad-detail-item">
                  <span className="sw-ad-detail-label">PAN Number</span>
                  <span className="sw-ad-detail-value">{viewFreelancer.pan || 'N/A'}</span>
                </div>
                <div className="sw-ad-detail-item">
                  <span className="sw-ad-detail-label">Completed Jobs</span>
                  <span className="sw-ad-detail-value">{viewFreelancer.completed}</span>
                </div>
                <div className="sw-ad-detail-item">
                  <span className="sw-ad-detail-label">Experience</span>
                  <span className="sw-ad-detail-value">{viewFreelancer.age - 20} years</span>
                </div>
                <div className="sw-ad-detail-item">
                  <span className="sw-ad-detail-label">Rating</span>
                  {viewFreelancer.rating > 0 ? (
                    <Space size={4} align="center">
                      <StarFilled className="sw-ad-rating-star" />
                      <span className="sw-ad-detail-value">{viewFreelancer.rating}</span>
                    </Space>
                  ) : (
                    <span className="sw-ad-rating-na">N/A</span>
                  )}
                </div>
              </div>
            </div>

            <div className="sw-ad-section-title" style={{ marginBottom: 16, paddingLeft: 0, borderLeft: 'none' }}>Skills</div>
            <div className="sw-ad-skills-container-modal">
              {viewFreelancer.skills.map((skill) => (
                <Tag key={skill} bordered={false} style={{ fontSize: '13px', padding: '6px 16px', borderRadius: '20px', background: '#f5f5f5', color: '#595959', margin: 0 }}>
                  {skill}
                </Tag>
              ))}
            </div>


          </>
        )}
      </Modal>

      {/* Skills Modal */}
      <Modal
        open={!!viewSkillsFreelancer}
        title={`Skills - ${viewSkillsFreelancer?.name}`}
        onCancel={() => setViewSkillsFreelancer(null)}
        footer={<Button onClick={() => setViewSkillsFreelancer(null)}>Close</Button>}
        width={500}
        className="sw-ad-skills-modal"
      >
        {viewSkillsFreelancer && (
          <Space wrap size="small" className="sw-ad-skills-list">
            {viewSkillsFreelancer.skills.slice(2).map((skill) => (
              <Tag key={skill} className="sw-ad-skill-tag-modal">{skill}</Tag>
            ))}
          </Space>
        )}
      </Modal>
    </div >
  )
}

export default FreelancersPage
