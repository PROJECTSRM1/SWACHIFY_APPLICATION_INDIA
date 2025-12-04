import { Button, Descriptions, Input, Modal, Select, Space, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import type { Vendor } from './types'
import { vendorStatusColors } from './data'


type Props = {
  vendors: Vendor[]
  onStatusToggle: (vendorId: string) => void
}

const VendorsPage = ({ vendors, onStatusToggle }: Props) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [vendorModal, setVendorModal] = useState<Vendor | null>(null)

  const filteredVendors = useMemo(
    () =>
      vendors.filter((vendor) => {
        const matches =
          vendor.name.toLowerCase().includes(search.toLowerCase()) ||
          vendor.service.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter
        return matches && matchesStatus
      }),
    [vendors, search, statusFilter],
  )

  return (
    <div className="sw-ad-page-card">
      <div className="sw-ad-filters-bar">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search vendors or services"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />
      </div>
      <div className="sw-ad-table-wrapper">
        <Table
          rowKey="id"
          dataSource={filteredVendors}
          pagination={{ pageSize: 4, responsive: true }}
          columns={[
            { title: 'Name', dataIndex: 'name' },
            { title: 'Email', dataIndex: 'email' },
            { title: 'Service', dataIndex: 'service' },
            { title: 'PAN', dataIndex: 'pan' },
            {
              title: 'Status',
              render: (_, record) => <Tag color={vendorStatusColors[record.status]}>{record.status}</Tag>,
            },
            { title: 'Total Orders', dataIndex: 'totalOrders' },
            {
              title: 'Actions',
              render: (_, record) => (
                <Space>
                  <Button onClick={() => setVendorModal(record)}>Details</Button>
                  <Button onClick={() => onStatusToggle(record.id)}>
                    {record.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Modal
        open={!!vendorModal}
        title="Vendor Details"
        onCancel={() => setVendorModal(null)}
        footer={<Button onClick={() => setVendorModal(null)}>Close</Button>}
      >
        {vendorModal && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{vendorModal.name}</Descriptions.Item>
            <Descriptions.Item label="Service">{vendorModal.service}</Descriptions.Item>
            <Descriptions.Item label="PAN">{vendorModal.pan}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={vendorStatusColors[vendorModal.status]}>{vendorModal.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total Orders">{vendorModal.totalOrders}</Descriptions.Item>
            <Descriptions.Item label="Contact">{vendorModal.contact}</Descriptions.Item>
            <Descriptions.Item label="Location">{vendorModal.location}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default VendorsPage

