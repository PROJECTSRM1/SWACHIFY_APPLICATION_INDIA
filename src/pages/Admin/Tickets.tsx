
// import { Badge, Button, Descriptions, Input, Modal, Select, Space, Table, Tag, message } from 'antd'
// import {  EyeOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
// import { useMemo, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import type { Ticket, TicketStatus, Freelancer } from './types'
// import { statusColors, paymentStatusColors, indianCities, initialFreelancers } from './data'


// type Props = {
//   tickets: Ticket[]
//   onStatusChange: (ticketId: string, status: TicketStatus) => void
//   onAssign: (ticketId: string, assignee: string) => void
// }


// const TicketsPage = ({ tickets,  onAssign }: Props) => {
//   const [searchParams] = useSearchParams()

//   // Initialize filter state with URL parameter value to avoid setState in useEffect
//   const [filters, setFilters] = useState(() => {
//     const statusParam = searchParams.get('status')
//     const initialStatus = statusParam && ['active', 'pending', 'accepted', 'in-progress', 'completed', 'cancelled'].includes(statusParam)
//       ? statusParam
//       : 'all'
//     return { search: '', status: initialStatus, sort: 'recent' }
//   })

//   const [viewTicket, setViewTicket] = useState<Ticket | null>(null)
//   const [assignState, setAssignState] = useState<{ ticket: Ticket | null; assignee: string; location: string; selectedEmployee: Freelancer | null; services: string[] }>({
//     ticket: null,
//     assignee: '',
//     location: '',
//     selectedEmployee: null,
//     services: [],
//   })
//   const [viewSkillsEmployee, setViewSkillsEmployee] = useState<Freelancer | null>(null)

//   const filteredTickets = useMemo(() => {
//     return tickets
//       .filter((ticket) => {
//         const matchesSearch =
//           filters.search === '' ||
//           ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
//           ticket.service.toLowerCase().includes(filters.search.toLowerCase()) ||
//           ticket.id.toLowerCase().includes(filters.search.toLowerCase())

//         // Handle 'active' status as all non-completed tickets
//         let matchesStatus = false
//         if (filters.status === 'all') {
//           matchesStatus = true
//         } else if (filters.status === 'active') {
//           matchesStatus = ticket.serviceStatus !== 'completed' && ticket.serviceStatus !== 'cancelled'
//         } else {
//           matchesStatus = ticket.serviceStatus === filters.status
//         }

//         return matchesSearch && matchesStatus
//       })
//       .sort((a, b) => {
//         if (filters.sort === 'recent') {
//           return new Date(b.date).getTime() - new Date(a.date).getTime()
//         }
//         if (filters.sort === 'oldest') {
//           return new Date(a.date).getTime() - new Date(b.date).getTime()
//         }
//         const priorityRank: Record<Ticket['priority'], number> = { high: 1, medium: 2, low: 3 }
//         return priorityRank[a.priority] - priorityRank[b.priority]
//       })
//   }, [tickets, filters])

//   return (
//     <div className="sw-ad-page-card">
//       <div className="sw-ad-filters-bar">
//         <Input
//           allowClear
//           prefix={<SearchOutlined />}
//           placeholder="Search by ID, customer, or service"
//           value={filters.search}
//           onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
//         />
//         <Select
//           value={filters.status}
//           onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
//           options={[
//             { value: 'all', label: 'All Status' },
//             ...Object.keys(statusColors).map((status) => ({ value: status, label: status })),
//           ]}
//         />
//         <Select
//           value={filters.sort}
//           onChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))}
//           options={[
//             { value: 'recent', label: 'Most Recent' },
//             { value: 'oldest', label: 'Oldest' },
//             { value: 'priority', label: 'Priority' },
//           ]}
//         />
//         <Button icon={<FilterOutlined />}>Advanced Filters</Button>
//       </div>

//       <div className="sw-ad-table-wrapper">
//         <Table
//           rowKey="id"
//           dataSource={filteredTickets}
//           pagination={{ pageSize: 5, responsive: true }}
//           columns={[
//             { title: 'Ticket ID', dataIndex: 'id' },
//             { title: 'Customer', dataIndex: 'customer' },
//             { title: 'Service', dataIndex: 'service' },
//             { title: 'Date', dataIndex: 'date' },
//             {
//               title: 'Service Status',
//               render: (_, record) => <Tag color={statusColors[record.serviceStatus]}>{record.serviceStatus}</Tag>,
//             },
//             {
//               title: 'Payment Status',
//               render: (_, record) => <Tag color={paymentStatusColors[record.paymentStatus]}>{record.paymentStatus}</Tag>,
//             },
//             {
//               title: 'Location',
//               dataIndex: 'location',
//             },
//             {
//               title: 'Priority',
//               dataIndex: 'priority',
//               render: (priority: Ticket['priority']) => (
//                 <Badge
//                   color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'blue'}
//                   text={priority}
//                 />
//               ),
//             },
//             {
//               title: 'Assigned To',
//               render: (_, record) =>
//                 record.assignedTo ? record.assignedTo : <Tag color="default">Unassigned</Tag>,
//             },
//             {
//               title: 'Actions',
//               render: (_, record) => (
//                 <Space wrap>
//                   <Button icon={<EyeOutlined />} onClick={() => setViewTicket(record)}>
//                     View
//                   </Button>
//                   <Button
//                     onClick={() =>
//                       setAssignState({ ticket: record, assignee: record.assignedTo, location: record.location, selectedEmployee: null, services: [record.service] })
//                     }
//                   >
//                     Assign
//                   </Button>
                 
//                 </Space>
//               ),
//             },
//           ]}
//         />
//       </div>

//       <Modal
//         open={!!viewTicket}
//         title={`Ticket ${viewTicket?.id}`}
//         onCancel={() => setViewTicket(null)}
//         footer={<Button onClick={() => setViewTicket(null)}>Close</Button>}
//       >
//         {viewTicket && (
//           <Descriptions bordered column={1} size="small">
//             <Descriptions.Item label="Customer">{viewTicket.customer}</Descriptions.Item>
//             <Descriptions.Item label="Service">{viewTicket.service}</Descriptions.Item>
//             <Descriptions.Item label="Date">{viewTicket.date}</Descriptions.Item>
//             <Descriptions.Item label="Service Status">
//               <Tag color={statusColors[viewTicket.serviceStatus]}>{viewTicket.serviceStatus}</Tag>
//             </Descriptions.Item>
//             <Descriptions.Item label="Payment Status">
//               <Tag color={paymentStatusColors[viewTicket.paymentStatus]}>{viewTicket.paymentStatus}</Tag>
//             </Descriptions.Item>
//             <Descriptions.Item label="Assigned To">
//               {viewTicket.assignedTo || 'Not assigned'}
//             </Descriptions.Item>
//           </Descriptions>
//         )}
//       </Modal>

//       <Modal
//         open={!!assignState.ticket}
//         title="Assign Ticket"
//         onCancel={() => setAssignState({ ticket: null, assignee: '', location: '', selectedEmployee: null, services: [] })}
//         onOk={() => {
//           if (assignState.ticket && assignState.selectedEmployee) {
//             onAssign(assignState.ticket.id, assignState.selectedEmployee.name)
//             setAssignState({ ticket: null, assignee: '', location: '', selectedEmployee: null, services: [] })
//           } else {
//             message.warning('Please select an employee from the table')
//           }
//         }}
//         width={800}
//       >
//         <Space direction="vertical" style={{ width: '100%' }} size="middle">
//           <div>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Location</label>
//             <Select
//               style={{ width: '100%' }}
//               placeholder="Select city to view employees"
//               value={assignState.location}
//               onChange={(value) => setAssignState((prev) => ({ ...prev, location: value, selectedEmployee: null }))}
//               options={indianCities.map((city) => ({ value: city, label: city }))}
//               showSearch
//             />
//           </div>

//           <div>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Services</label>
//             <Space direction="vertical" style={{ width: '100%' }} size="small">
//               <Space wrap>
//                 {assignState.services.map((service, index) => (
//                   <Tag
//                     key={index}
//                     closable
//                     onClose={() => {
//                       const newServices = assignState.services.filter((_, i) => i !== index)
//                       setAssignState((prev) => ({ ...prev, services: newServices }))
//                     }}
//                     color="blue"
//                   >
//                     {service}
//                   </Tag>
//                 ))}
//               </Space>
//               <Input
//                 placeholder="Enter service name"
//                 onPressEnter={(e) => {
//                   const value = e.currentTarget.value.trim()
//                   if (value && !assignState.services.includes(value)) {
//                     setAssignState((prev) => ({ ...prev, services: [...prev.services, value] }))
//                     e.currentTarget.value = ''
//                   }
//                 }}
//                 suffix={
//                   <Button
//                     type="link"
//                     size="small"
//                     onClick={(e) => {
//                       const input = (e.currentTarget.parentElement?.parentElement as HTMLInputElement)
//                       const value = input?.value.trim()
//                       if (value && !assignState.services.includes(value)) {
//                         setAssignState((prev) => ({ ...prev, services: [...prev.services, value] }))
//                         input.value = ''
//                       }
//                     }}
//                   >
//                     Add More Service
//                   </Button>
//                 }
//               />
//             </Space>
//           </div>

//           {assignState.location && (
//             <div>
//               <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
//                 Available Employees in {assignState.location}
//               </label>
//               <Table
//                 rowKey="id"
//                 dataSource={initialFreelancers.filter(
//                   (freelancer) => freelancer.city === assignState.location && freelancer.status === 'approved'
//                 )}
//                 pagination={false}
//                 size="small"
//                 scroll={{ y: 300, x: 'max-content' }}
//                 rowClassName={(record) =>
//                   assignState.selectedEmployee?.id === record.id ? 'ant-table-row-selected' : ''
//                 }
//                 onRow={(record) => ({
//                   onClick: () => {
//                     setAssignState((prev) => ({
//                       ...prev,
//                       selectedEmployee: record,
//                       assignee: record.name,
//                     }))
//                   },
//                   style: { cursor: 'pointer' },
//                 })}
//                 columns={[
//                   {
//                     title: 'Name',
//                     dataIndex: 'name',
//                     width: 150,
//                   },
//                   {
//                     title: 'Email',
//                     dataIndex: 'email',
//                     width: 200,
//                   },
//                   {
//                     title: 'Skills',
//                     dataIndex: 'skills',
//                     render: (skills: string[], record: Freelancer) => {
//                       const maxVisible = 1
//                       const visibleSkills = skills.slice(0, maxVisible)
//                       const hasMore = skills.length > maxVisible

//                       return (
//                         <Space wrap size="small">
//                           {visibleSkills.map((skill) => (
//                             <Tag key={skill} color="blue">{skill}</Tag>
//                           ))}
//                           {hasMore && (
//                             <>
//                               <span>...</span>
//                               <Button
//                                 type="link"
//                                 size="small"
//                                 onClick={(e) => {
//                                   e.stopPropagation()
//                                   setViewSkillsEmployee(record)
//                                 }}
//                                 style={{ padding: 0, height: 'auto' }}
//                               >
//                                 View More
//                               </Button>
//                             </>
//                           )}
//                         </Space>
//                       )
//                     },
//                   },
//                   {
//                     title: 'Rating',
//                     dataIndex: 'rating',
//                     width: 80,
//                     render: (rating: number) => (
//                       <Badge
//                         color={rating >= 4.5 ? 'green' : 'orange'}
//                         text={rating.toFixed(1)}
//                       />
//                     ),
//                   },
//                   {
//                     title: 'Completed',
//                     dataIndex: 'completed',
//                     width: 100,
//                   },
//                 ]}
//               />
//               {assignState.selectedEmployee && (
//                 <div style={{ marginTop: '12px', padding: '8px', background: '#e6f7ff', borderRadius: '4px' }}>
//                   <strong>Selected:</strong> {assignState.selectedEmployee.name}
//                 </div>
//               )}
//             </div>
//           )}
//         </Space>
//       </Modal>

//       <Modal
//         open={!!viewSkillsEmployee}
//         title={`Skills - ${viewSkillsEmployee?.name}`}
//         onCancel={() => setViewSkillsEmployee(null)}
//         footer={<Button onClick={() => setViewSkillsEmployee(null)}>Close</Button>}
//         width={500}
//       >
//         {viewSkillsEmployee && (
//           <Space wrap size="small">
//             {viewSkillsEmployee.skills.map((skill) => (
//               <Tag key={skill} color="blue">{skill}</Tag>
//             ))}
//           </Space>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default TicketsPage














import { Badge, Button, Descriptions, Input, Modal, Select, Space, Table, Tag, message } from 'antd'
import {  EyeOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Ticket, TicketStatus, Freelancer } from './types'
import { statusColors, paymentStatusColors, indianCities, initialFreelancers } from './data'


type Props = {
  tickets: Ticket[]
  onStatusChange: (ticketId: string, status: TicketStatus) => void
  onAssign: (ticketId: string, assignee: string) => void
}


const TicketsPage = ({ tickets,  onAssign }: Props) => {
  const [searchParams] = useSearchParams()

  // Initialize filter state with URL parameter value to avoid setState in useEffect
  const [filters, setFilters] = useState(() => {
    const statusParam = searchParams.get('status')
    const initialStatus = statusParam && ['active', 'pending', 'accepted', 'in-progress', 'completed', 'cancelled'].includes(statusParam)
      ? statusParam
      : 'all'
    return { search: '', status: initialStatus, sort: 'recent' }
  })

  // Advanced Filters State
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState({
    priority: 'all',
    paymentStatus: 'all',
    location: 'all'
  })

  const [viewTicket, setViewTicket] = useState<Ticket | null>(null)
  const [assignState, setAssignState] = useState<{ ticket: Ticket | null; assignee: string; location: string; selectedEmployee: Freelancer | null; services: string[] }>({
    ticket: null,
    assignee: '',
    location: '',
    selectedEmployee: null,
    services: [],
  })
  const [viewSkillsEmployee, setViewSkillsEmployee] = useState<Freelancer | null>(null)
  const [showAllEmployees, setShowAllEmployees] = useState(false)
  const [serviceSearch, setServiceSearch] = useState('')

  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        const matchesSearch =
          filters.search === '' ||
          ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.service.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.id.toLowerCase().includes(filters.search.toLowerCase())

        // Handle 'active' status as all non-completed tickets
        let matchesStatus = false
        if (filters.status === 'all') {
          matchesStatus = true
        } else if (filters.status === 'active') {
          matchesStatus = ticket.serviceStatus !== 'completed' && ticket.serviceStatus !== 'cancelled'
        } else {
          matchesStatus = ticket.serviceStatus === filters.status
        }

        // Advanced Filters
        const matchesPriority = advancedFilters.priority === 'all' || ticket.priority === advancedFilters.priority
        const matchesPayment = advancedFilters.paymentStatus === 'all' || ticket.paymentStatus === advancedFilters.paymentStatus
        const matchesLocation = advancedFilters.location === 'all' || ticket.location === advancedFilters.location

        return matchesSearch && matchesStatus && matchesPriority && matchesPayment && matchesLocation
      })
      .sort((a, b) => {
        if (filters.sort === 'recent') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        if (filters.sort === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        }
        if (filters.sort === 'rating') {
          const getRating = (ticket: Ticket) => {
            if (!ticket.assignedTo) return -1
            const freelancer = initialFreelancers.find(f => ticket.assignedTo.includes(f.name))
            return freelancer ? freelancer.rating : -1
          }
          return getRating(b) - getRating(a)
        }
        if (filters.sort === 'customer') {
          return a.customer.localeCompare(b.customer)
        }
        const priorityRank: Record<Ticket['priority'], number> = { high: 1, medium: 2, low: 3 }
        return priorityRank[a.priority] - priorityRank[b.priority]
      })
  }, [tickets, filters, advancedFilters])

  // Filter employees based on location and service tags
  const filteredEmployees = useMemo(() => {
    if (!assignState.location) return []

    return initialFreelancers.filter((freelancer) => {
      const isCityMatch = freelancer.city === assignState.location
      const isStatusApproved = freelancer.status === 'approved'

      // Check for skill match if services are selected
      const hasMatchingSkill = assignState.services.length === 0 || assignState.services.some(service =>
        freelancer.skills.some(skill =>
          service.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(service.toLowerCase())
        )
      )

      return isCityMatch && isStatusApproved && hasMatchingSkill
    }).sort((a, b) => b.rating - a.rating)
  }, [assignState.location, assignState.services])

  // Pagination logic for modal: default show 5, View More shows all
  const displayedEmployees = showAllEmployees ? filteredEmployees : filteredEmployees.slice(0, 5)

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
            { value: 'rating', label: 'Rating (High-Low)' },
            { value: 'customer', label: 'Customer' },
          ]}
        />
        <Button
          icon={<FilterOutlined />}
          type={showAdvancedFilters ? 'primary' : 'default'}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          Advanced Filters
        </Button>
      </div>

      {showAdvancedFilters && (
        <div className="sw-ad-filters-bar" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
          <Select
            placeholder="Priority"
            style={{ width: 150 }}
            value={advancedFilters.priority}
            onChange={(val) => setAdvancedFilters(prev => ({ ...prev, priority: val }))}
            options={[
              { value: 'all', label: 'All Priorities' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
          <Select
            placeholder="Payment Status"
            style={{ width: 150 }}
            value={advancedFilters.paymentStatus}
            onChange={(val) => setAdvancedFilters(prev => ({ ...prev, paymentStatus: val }))}
            options={[
              { value: 'all', label: 'All Payments' },
              ...Object.keys(paymentStatusColors).map(status => ({ value: status, label: status.charAt(0).toUpperCase() + status.slice(1) }))
            ]}
          />
          <Select
            placeholder="Location"
            style={{ width: 150 }}
            value={advancedFilters.location}
            onChange={(val) => setAdvancedFilters(prev => ({ ...prev, location: val }))}
            options={[
              { value: 'all', label: 'All Locations' },
              ...indianCities.map(city => ({ value: city, label: city }))
            ]}
            showSearch
          />
          <Button
            type="link"
            onClick={() => setAdvancedFilters({ priority: 'all', paymentStatus: 'all', location: 'all' })}
          >
            Clear Filters
          </Button>
        </div>
      )}

      <div className="sw-ad-table-wrapper">
        <Table
          rowKey="id"
          dataSource={filteredTickets}
          pagination={{ pageSize: 5, responsive: true }}
          columns={[
            { title: 'Ticket ID', dataIndex: 'id' },
            { title: 'Customer', dataIndex: 'customer' },
            { title: 'Service', dataIndex: 'service' },
            {
              title: 'Date',
              dataIndex: 'date',
              width: 120,
              render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
            },
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
              title: 'Rating',
              render: (_, record) => {
                if (!record.assignedTo) return '-'
                // Using name matching as a heuristic since assignedTo is a string in this dataset
                const freelancer = initialFreelancers.find(f => record.assignedTo.includes(f.name))
                if (freelancer) {
                  return (
                    <Badge
                      color={freelancer.rating >= 4.5 ? 'green' : 'orange'}
                      text={freelancer.rating.toFixed(1)}
                    />
                  )
                }
                return <span style={{ color: '#ccc' }}>-</span>
              }
            },
            {
              title: 'Actions',
              width: 180,
              render: (_, record) => (
                <div className="sw-ad-horizontal-actions">
                  <Button icon={<EyeOutlined />} onClick={() => setViewTicket(record)}>
                    View
                  </Button>
                  <Button
                    onClick={() => {
                      // Initialize assign state with ticket service as a filter
                      setAssignState({
                        ticket: record,
                        assignee: record.assignedTo,
                        location: record.location,
                        selectedEmployee: null,
                        services: [record.service]
                      })
                      setShowAllEmployees(false)
                    }}
                  >
                    Assign
                  </Button>
                </div>
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
            <Descriptions.Item label="Rating">
              {(() => {
                if (!viewTicket.assignedTo) return '-'
                const freelancer = initialFreelancers.find(f => viewTicket.assignedTo.includes(f.name))
                if (freelancer) {
                  return (
                    <Badge
                      color={freelancer.rating >= 4.5 ? 'green' : 'orange'}
                      text={freelancer.rating.toFixed(1)}
                    />
                  )
                }
                return '-'
              })()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        open={!!assignState.ticket}
        title="Assign Ticket"
        onCancel={() => {
          setAssignState({ ticket: null, assignee: '', location: '', selectedEmployee: null, services: [] })
          setShowAllEmployees(false)
        }}
        onOk={() => {
          if (assignState.ticket && assignState.selectedEmployee) {
            onAssign(assignState.ticket.id, assignState.selectedEmployee.name)
            setAssignState({ ticket: null, assignee: '', location: '', selectedEmployee: null, services: [] })
            setShowAllEmployees(false)
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
              onChange={(value) => {
                setAssignState((prev) => ({ ...prev, location: value, selectedEmployee: null }))
                setShowAllEmployees(false) // Reset view more on location change
              }}
              options={indianCities.map((city) => ({ value: city, label: city }))}
              showSearch
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Services (Filter)</label>
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
                placeholder="Enter service to filter"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                onPressEnter={() => {
                  const value = serviceSearch.trim()
                  if (value && !assignState.services.includes(value)) {
                    setAssignState((prev) => ({ ...prev, services: [...prev.services, value] }))
                    setServiceSearch('')
                  }
                }}
                suffix={
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      const value = serviceSearch.trim()
                      if (value && !assignState.services.includes(value)) {
                        setAssignState((prev) => ({ ...prev, services: [...prev.services, value] }))
                        setServiceSearch('')
                      }
                    }}
                  >
                    Add Filter
                  </Button>
                }
              />
            </Space>
          </div>


          {assignState.location && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ display: 'block', fontWeight: 500, margin: 0 }}>
                  Available Employees in {assignState.location} {assignState.services.length > 0 ? '(Filtered by Service)' : ''}
                </label>
                <Tag color="cyan">Total: {filteredEmployees.length}</Tag>
              </div>
              <Table
                rowKey="id"
                dataSource={displayedEmployees}
                pagination={false}
                size="small"
                scroll={{ y: 300, x: 'max-content' }}
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
                            <Tag key={skill} color="blue">
                              {skill.length > 10 ? `${skill.slice(0, 10)}...` : skill}
                            </Tag>
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

              {!showAllEmployees && filteredEmployees.length > 5 ? (
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <Button onClick={() => setShowAllEmployees(true)}>
                    View More Employees ({filteredEmployees.length - 5} hidden)
                  </Button>
                </div>
              ) : null}

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
        title={`Remaining Skills - ${viewSkillsEmployee?.name}`}
        onCancel={() => setViewSkillsEmployee(null)}
        footer={<Button onClick={() => setViewSkillsEmployee(null)}>Close</Button>}
        width={500}
      >
        {viewSkillsEmployee && (
          <Space wrap size="small">
            {viewSkillsEmployee.skills.slice(2).map((skill) => (
              <Tag key={skill} color="blue">{skill}</Tag>
            ))}
          </Space>
        )}
      </Modal>
    </div>
  )
}

export default TicketsPage
