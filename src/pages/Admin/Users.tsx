// import { Button, Descriptions, Input, Modal, Select, Space, Table, Tag } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
// import { useMemo, useState } from 'react'
// import type { User } from './types'
// import { userStatusColors } from './data'


// type Props = {
//   users: User[]
//   onStatusToggle: (userId: string) => void
// }

// const UsersPage = ({ users, onStatusToggle }: Props) => {
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all')
//   const [selectedUser, setSelectedUser] = useState<User | null>(null)

//   const filteredUsers = useMemo(
//     () =>
//       users.filter((user) => {
//         const matches =
//           user.name.toLowerCase().includes(search.toLowerCase()) ||
//           user.email.toLowerCase().includes(search.toLowerCase())
//         const matchesStatus = statusFilter === 'all' || user.status === statusFilter
//         return matches && matchesStatus
//       }),
//     [users, search, statusFilter],
//   )

//   return (
//     <div className="sw-ad-page-card">
//       <div className="sw-ad-filters-bar">
//         <Input
//           prefix={<SearchOutlined />}
//           placeholder="Search users by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Select
//           value={statusFilter}
//           onChange={(value) => setStatusFilter(value)}
//           options={[
//             { value: 'all', label: 'All Status' },
//             { value: 'active', label: 'Active' },
//             { value: 'blocked', label: 'Blocked' },
//           ]}
//         />
//       </div>
//       <div className="sw-ad-table-wrapper">
//         <Table
//           rowKey="id"
//           dataSource={filteredUsers}
//           pagination={{ pageSize: 5, responsive: true }}
//           columns={[
//             { title: 'Name', dataIndex: 'name' },
//             { title: 'Email', dataIndex: 'email' },
//             { title: 'Join Date', dataIndex: 'joinDate' },
//             { title: 'Plan', dataIndex: 'plan' },
//             {
//               title: 'Status',
//               render: (_, record) => <Tag color={userStatusColors[record.status]}>{record.status}</Tag>,
//             },
//             {
//               title: 'Actions',
//               render: (_, record) => (
//                 <Space>
//                   <Button onClick={() => setSelectedUser(record)}>View</Button>
//                   <Button
//                     danger={record.status === 'active'}
//                     type={record.status === 'active' ? 'default' : 'primary'}
//                     onClick={() => onStatusToggle(record.id)}
//                   >
//                     {record.status === 'active' ? 'Block' : 'Unblock'}
//                   </Button>
//                 </Space>
//               ),
//             },
//           ]}
//         />
//       </div>

//       <Modal
//         open={!!selectedUser}
//         title="User Details"
//         onCancel={() => setSelectedUser(null)}
//         footer={<Button onClick={() => setSelectedUser(null)}>Close</Button>}
//       >
//         {selectedUser && (
//           <Descriptions column={1} bordered size="small">
//             <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
//             <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
//             <Descriptions.Item label="Status">
//               <Tag color={userStatusColors[selectedUser.status]}>{selectedUser.status}</Tag>
//             </Descriptions.Item>
//             <Descriptions.Item label="Plan">{selectedUser.plan}</Descriptions.Item>
//             <Descriptions.Item label="Location">{selectedUser.location}</Descriptions.Item>
//           </Descriptions>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default UsersPage

















import { Button, Descriptions, Input, Modal, Select, Space, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import type { User, Ticket } from './types'
import { userStatusColors } from './data'


type Props = {
  users: User[]
  tickets: Ticket[]
  onStatusToggle: (userId: string) => void
}

const UsersPage = ({ users, tickets, onStatusToggle }: Props) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const matches =
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter
        return matches && matchesStatus
      }),
    [users, search, statusFilter],
  )

  const getOrderCount = (userName: string) => {
    return tickets.filter(t => t.customer === userName).length
  }

  return (
    <div className="sw-ad-page-card">
      <div className="sw-ad-filters-bar">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search users by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'blocked', label: 'Blocked' },
          ]}
        />
      </div>
      <div className="sw-ad-table-wrapper">
        <Table
          rowKey="id"
          dataSource={filteredUsers}
          pagination={{ pageSize: 5, responsive: true }}
          columns={[
            { title: 'Name', dataIndex: 'name' },
            { title: 'Email', dataIndex: 'email' },
            { title: 'Join Date', dataIndex: 'joinDate' },
            { title: 'Plan', dataIndex: 'plan' },
            {
              title: 'Status',
              render: (_, record) => <Tag color={userStatusColors[record.status]}>{record.status}</Tag>,
            },
            {
              title: 'Actions',
              render: (_, record) => (
                <Space>
                  <Button onClick={() => setSelectedUser(record)}>View</Button>
                  <Button
                    danger={record.status === 'active'}
                    type={record.status === 'active' ? 'default' : 'primary'}
                    onClick={() => onStatusToggle(record.id)}
                  >
                    {record.status === 'active' ? 'Block' : 'Unblock'}
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </div>

      <Modal
        open={!!selectedUser}
        title="User Details"
        onCancel={() => setSelectedUser(null)}
        footer={<Button onClick={() => setSelectedUser(null)}>Close</Button>}
      >
        {selectedUser && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={userStatusColors[selectedUser.status]}>{selectedUser.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Orders">{getOrderCount(selectedUser.name)}</Descriptions.Item>
            <Descriptions.Item label="Location">{selectedUser.location}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

export default UsersPage

