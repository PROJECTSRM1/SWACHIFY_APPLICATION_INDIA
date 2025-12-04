import { Badge, Button, Descriptions, Input, Modal, Select, Space, Table, Tag, message } from 'antd'
import { CheckOutlined, EyeOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import type { Ticket, TicketStatus } from './types'
import { statusColors } from './data'


type Props = {
  tickets: Ticket[]
  onStatusChange: (ticketId: string, status: TicketStatus) => void
  onAssign: (ticketId: string, assignee: string) => void
}

const assigneeOptions = [
  { value: 'John Doe (Freelancer)', label: 'John Doe (Freelancer)' },
  { value: 'Suresh Kumar (Freelancer)', label: 'Suresh Kumar (Freelancer)' },
  { value: 'ABC Suppliers (Vendor)', label: 'ABC Suppliers (Vendor)' },
  { value: 'XYZ Materials (Vendor)', label: 'XYZ Materials (Vendor)' },
]

const TicketsPage = ({ tickets, onStatusChange, onAssign }: Props) => {
  const [filters, setFilters] = useState({ search: '', status: 'all', sort: 'recent' })
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null)
  const [assignState, setAssignState] = useState<{ ticket: Ticket | null; assignee: string }>({
    ticket: null,
    assignee: '',
  })

  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        const matchesSearch =
          filters.search === '' ||
          ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.service.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.id.toLowerCase().includes(filters.search.toLowerCase())
        const matchesStatus = filters.status === 'all' || ticket.status === filters.status
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
              title: 'Status',
              render: (_, record) => <Tag color={statusColors[record.status]}>{record.status}</Tag>,
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
                    onClick={() => setAssignState({ ticket: record, assignee: record.assignedTo })}
                  >
                    Assign
                  </Button>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    disabled={record.status === 'completed'}
                    onClick={() => onStatusChange(record.id, 'completed')}
                  >
                    Mark Done
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
            <Descriptions.Item label="Status">
              <Tag color={statusColors[viewTicket.status]}>{viewTicket.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Assigned To">
              {viewTicket.assignedTo || 'Not assigned'}
            </Descriptions.Item>
            <Descriptions.Item label="Channel">{viewTicket.channel}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        open={!!assignState.ticket}
        title="Assign Ticket"
        onCancel={() => setAssignState({ ticket: null, assignee: '' })}
        onOk={() => {
          if (assignState.ticket && assignState.assignee) {
            onAssign(assignState.ticket.id, assignState.assignee)
            setAssignState({ ticket: null, assignee: '' })
          } else {
            message.warning('Please select an assignee')
          }
        }}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Select assignee"
          value={assignState.assignee}
          onChange={(value) => setAssignState((prev) => ({ ...prev, assignee: value }))}
          options={assigneeOptions}
        />
      </Modal>
    </div>
  )
}

export default TicketsPage

