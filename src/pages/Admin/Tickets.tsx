

import { Badge, Button, Descriptions, Input, Modal, Select, Space, Table, Tag, message } from 'antd'
import { EyeOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import type { Ticket, TicketStatus, Freelancer } from './types'
import { statusColors, paymentStatusColors, indianCities, initialFreelancers } from './data'


type Props = {
  tickets: Ticket[]
  onStatusChange: (ticketId: string, status: TicketStatus) => void
  onAssign: (ticketId: string, assignee: string) => void
}


const TicketsPage = ({ tickets, onAssign }: Props) => {
  const [filters, setFilters] = useState({ search: '', status: 'all', sort: 'recent' })
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null)
  const [assignState, setAssignState] = useState<{ ticket: Ticket | null; assignee: string; location: string; selectedEmployee: Freelancer | null; services: string[] }>({
    ticket: null,
    assignee: '',
    location: '',
    selectedEmployee: null,
    services: [],
  })
  const [viewSkillsEmployee, setViewSkillsEmployee] = useState<Freelancer | null>(null)

  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        const matchesSearch =
          filters.search === '' ||
          ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.service.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.id.toLowerCase().includes(filters.search.toLowerCase())
        const matchesStatus = filters.status === 'all' || ticket.serviceStatus === filters.status
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        if (filters.sort === 'recent') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        if (filters.sort === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        }
        const priorityRank: Record<Ticket['priority'], number> = { high: 1, medium: 2, low: 3 }
        return priorityRank[a.priority] - priorityRank[b.priority]
      })
  }, [tickets, filters])

  return (
    <div className="sw-ad-page-card">
      <div className="sw-ad-filters-bar">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search by ID, customer, or service"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
        <Select
          value={filters.status}
          onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
          options={[
            { value: 'all', label: 'All Status' },
            ...Object.keys(statusColors).map((status) => ({ value: status, label: status })),
          ]}
        />
        <Select
          value={filters.sort}
          onChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))}
          options={[
            { value: 'recent', label: 'Most Recent' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'priority', label: 'Priority' },
          ]}
        />
        <Button icon={<FilterOutlined />}>Advanced Filters</Button>
      </div>

      <div className="sw-ad-table-wrapper">
        <Table
          rowKey="id"
          dataSource={filteredTickets}
          pagination={{ pageSize: 5, responsive: true }}
          columns={[
            { title: 'Ticket ID', dataIndex: 'id' },
            { title: 'Customer', dataIndex: 'customer' },
            { title: 'Service', dataIndex: 'service' },
            { title: 'Date', dataIndex: 'date' },
            {
              title: 'Service Status',
              render: (_, record) => <Tag color={statusColors[record.serviceStatus]}>{record.serviceStatus}</Tag>,
            },
            {
              title: 'Payment Status',
              render: (_, record) => <Tag color={paymentStatusColors[record.paymentStatus]}>{record.paymentStatus}</Tag>,
            },
            {
              title: 'Location',
              dataIndex: 'location',
            },
            {
              title: 'Priority',
              dataIndex: 'priority',
              render: (priority: Ticket['priority']) => (
                <Badge
                  color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'blue'}
                  text={priority}
                />
              ),
            },
            {
              title: 'Assigned To',
              render: (_, record) =>
                record.assignedTo ? record.assignedTo : <Tag color="default">Unassigned</Tag>,
            },
            {
              title: 'Actions',
              render: (_, record) => (
                <Space wrap>
                  <Button icon={<EyeOutlined />} onClick={() => setViewTicket(record)}>
                    View
                  </Button>
                  <Button
                    onClick={() =>
                      setAssignState({ ticket: record, assignee: record.assignedTo, location: record.location, selectedEmployee: null, services: [record.service] })
                    }
                  >
                    Assign
                  </Button>
          
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Modal
        open={!!viewTicket}
        title={`Ticket ${viewTicket?.id}`}
        onCancel={() => setViewTicket(null)}
        footer={<Button onClick={() => setViewTicket(null)}>Close</Button>}
      >
        {viewTicket && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Customer">{viewTicket.customer}</Descriptions.Item>
            <Descriptions.Item label="Service">{viewTicket.service}</Descriptions.Item>
            <Descriptions.Item label="Date">{viewTicket.date}</Descriptions.Item>
            <Descriptions.Item label="Service Status">
              <Tag color={statusColors[viewTicket.serviceStatus]}>{viewTicket.serviceStatus}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag color={paymentStatusColors[viewTicket.paymentStatus]}>{viewTicket.paymentStatus}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Assigned To">
              {viewTicket.assignedTo || 'Not assigned'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        open={!!assignState.ticket}
        title="Assign Ticket"
        onCancel={() => setAssignState({ ticket: null, assignee: '', location: '', selectedEmployee: null, services: [] })}
        onOk={() => {
          if (assignState.ticket && assignState.selectedEmployee) {
            onAssign(assignState.ticket.id, assignState.selectedEmployee.name)
            setAssignState({ ticket: null, assignee: '', location: '', selectedEmployee: null, services: [] })
          } else {
            message.warning('Please select an employee from the table')
          }
        }}
        width={800}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Location</label>
            <Select
              style={{ width: '100%' }}
              placeholder="Select city to view employees"
              value={assignState.location}
              onChange={(value) => setAssignState((prev) => ({ ...prev, location: value, selectedEmployee: null }))}
              options={indianCities.map((city) => ({ value: city, label: city }))}
              showSearch
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Services</label>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <Space wrap>
                {assignState.services.map((service, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => {
                      const newServices = assignState.services.filter((_, i) => i !== index)
                      setAssignState((prev) => ({ ...prev, services: newServices }))
                    }}
                    color="blue"
                  >
                    {service}
                  </Tag>
                ))}
              </Space>
              <Input
                placeholder="Enter service name"
                onPressEnter={(e) => {
                  const value = e.currentTarget.value.trim()
                  if (value && !assignState.services.includes(value)) {
                    setAssignState((prev) => ({ ...prev, services: [...prev.services, value] }))
                    e.currentTarget.value = ''
                  }
                }}
                suffix={
                  <Button
                    type="link"
                    size="small"
                    onClick={(e) => {
                      const input = (e.currentTarget.parentElement?.parentElement as HTMLInputElement)
                      const value = input?.value.trim()
                      if (value && !assignState.services.includes(value)) {
                        setAssignState((prev) => ({ ...prev, services: [...prev.services, value] }))
                        input.value = ''
                      }
                    }}
                  >
                    Add More Service
                  </Button>
                }
              />
            </Space>
          </div>

          {assignState.location && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                Available Employees in {assignState.location}
              </label>
              <Table
                rowKey="id"
                dataSource={initialFreelancers.filter(
                  (freelancer) => freelancer.city === assignState.location && freelancer.status === 'approved'
                )}
                pagination={false}
                size="small"
                scroll={{ y: 300 }}
                rowClassName={(record) =>
                  assignState.selectedEmployee?.id === record.id ? 'ant-table-row-selected' : ''
                }
                onRow={(record) => ({
                  onClick: () => {
                    setAssignState((prev) => ({
                      ...prev,
                      selectedEmployee: record,
                      assignee: record.name,
                    }))
                  },
                  style: { cursor: 'pointer' },
                })}
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    width: 150,
                  },
                  {
                    title: 'Email',
                    dataIndex: 'email',
                    width: 200,
                  },
                  {
                    title: 'Skills',
                    dataIndex: 'skills',
                    render: (skills: string[], record: Freelancer) => {
                      const maxVisible = 2
                      const visibleSkills = skills.slice(0, maxVisible)
                      const hasMore = skills.length > maxVisible

                      return (
                        <Space wrap size="small">
                          {visibleSkills.map((skill) => (
                            <Tag key={skill} color="blue">{skill}</Tag>
                          ))}
                          {hasMore && (
                            <>
                              <span>...</span>
                              <Button
                                type="link"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setViewSkillsEmployee(record)
                                }}
                                style={{ padding: 0, height: 'auto' }}
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
                    title: 'Rating',
                    dataIndex: 'rating',
                    width: 80,
                    render: (rating: number) => (
                      <Badge
                        color={rating >= 4.5 ? 'green' : 'orange'}
                        text={rating.toFixed(1)}
                      />
                    ),
                  },
                  {
                    title: 'Completed',
                    dataIndex: 'completed',
                    width: 100,
                  },
                ]}
              />
              {assignState.selectedEmployee && (
                <div style={{ marginTop: '12px', padding: '8px', background: '#e6f7ff', borderRadius: '4px' }}>
                  <strong>Selected:</strong> {assignState.selectedEmployee.name}
                </div>
              )}
            </div>
          )}
        </Space>
      </Modal>

      <Modal
        open={!!viewSkillsEmployee}
        title={`Skills - ${viewSkillsEmployee?.name}`}
        onCancel={() => setViewSkillsEmployee(null)}
        footer={<Button onClick={() => setViewSkillsEmployee(null)}>Close</Button>}
        width={500}
      >
        {viewSkillsEmployee && (
          <Space wrap size="small">
            {viewSkillsEmployee.skills.map((skill) => (
              <Tag key={skill} color="blue">{skill}</Tag>
            ))}
          </Space>
        )}
      </Modal>
    </div>
  )
}

export default TicketsPage



