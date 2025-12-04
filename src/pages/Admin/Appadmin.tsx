
import { App as AntApp, Badge, Button, Space, Typography, message, notification } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import DashboardPage from './Dashboard'
import TicketsPage from './Tickets'
import UsersPage from './Users'
import FreelancersPage from './Freelancers'
import VendorsPage from './Vendors'
import './appadmin.css'

import {
    initialFreelancers,
    initialPendingFreelancers,
    initialTickets,
    initialUsers,
    initialVendors,
    tabItems,
} from './data'


import type { FreelancerStatus, TabKey, TicketStatus } from './types'

function App() {
    return (
       
            <AdminShell />
        
    )
}

const tabPaths: Record<TabKey, string> = {
    dashboard: 'dashboard',
    tickets: 'tickets',
    users: 'users',
    freelancers: 'freelancers',
    vendors: 'vendors',
}

function getTabFromPath(pathname: string): TabKey {
    if (pathname.startsWith('/tickets')) return 'tickets'
    if (pathname.startsWith('/users')) return 'users'
    if (pathname.startsWith('/freelancers')) return 'freelancers'
    if (pathname.startsWith('/vendors')) return 'vendors'
    return 'dashboard'
}

const AdminShell = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const activeTab = getTabFromPath(location.pathname as string)

    const [tickets, setTickets] = useState(initialTickets)
    const [users, setUsers] = useState(initialUsers)
    const [vendors, setVendors] = useState(initialVendors)
    const [freelancers, setFreelancers] = useState(initialFreelancers)
    const [pendingFreelancers, setPendingFreelancers] = useState(initialPendingFreelancers)

    const handleTicketStatusUpdate = (ticketId: string, status: TicketStatus) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, status } : ticket
            ),
        )
        message.success(`Ticket ${ticketId} marked as ${status}`)
    }

    const handleTicketAssignment = (ticketId: string, assignee: string) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === ticketId
                    ? {
                          ...ticket,
                          assignedTo: assignee,
                          status: ticket.status === 'pending' ? 'accepted' : ticket.status,
                      }
                    : ticket,
            ),
        )
        message.success(`Ticket ${ticketId} assigned to ${assignee}`)
    }

    const handleUserStatusToggle = (userId: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId
                    ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
                    : user,
            ),
        )
        message.success('User status updated')
    }

    const handleVendorStatusToggle = (vendorId: string) => {
        setVendors((prev) =>
            prev.map((vendor) =>
                vendor.id === vendorId
                    ? { ...vendor, status: vendor.status === 'active' ? 'inactive' : 'active' }
                    : vendor,
            ),
        )
        message.info('Vendor status placeholder updated')
    }

    const handleFreelancerStatus = (freelancerId: string, status: FreelancerStatus) => {
        setFreelancers((prev) =>
            prev.map((freelancer) =>
                freelancer.id === freelancerId ? { ...freelancer, status } : freelancer
            ),
        )
        message.success(`Freelancer marked as ${status}`)
    }

    const handleApprovePendingFreelancer = (freelancerId: string) => {
        setPendingFreelancers((prev) => {
            const target = prev.find((f) => f.id === freelancerId)
            if (!target) return prev

            setFreelancers((main) => [
                { ...target, status: 'approved', completed: 0, rating: 4.5 },
                ...main,
            ])

            message.success(`${target.name} approved and moved to employees`)

            return prev.filter((f) => f.id !== freelancerId)
        })
    }

    const handleRejectPendingFreelancer = (freelancerId: string) => {
        setPendingFreelancers((prev) =>
            prev.filter((freelancer) => freelancer.id !== freelancerId),
        )
        message.info('Request rejected')
    }

    // ✅ TypeScript-safe Logout
    const handleLogout = () => {
        notification.success({
            message: "Logout Successful",
            description: "You have been logged out."
        })
        navigate("/landing", { replace: true }) // Redirect to landing page
    }

    return (
        <AntApp>
            <div className="sw-ad-app-shell">
                <header className="sw-ad-top-bar">
                    <div>
                        <Typography.Title level={3} className="sw-ad-brand">
                            SWACHIFY INDIA - ADMIN
                        </Typography.Title>
                        <Typography.Text className="sw-ad-subtitle">
                            Operations Command Center
                        </Typography.Text>
                    </div>

                    <Space className="sw-ad-profile-block">
                        <div className="sw-ad-admin-badge">
                            <Typography.Text strong>Admin:</Typography.Text>
                            <Typography.Text> swachify1</Typography.Text>
                        </div>

                        <Badge count={4}>
                            <Button shape="circle" icon={<BellIcon />} />
                        </Badge>

                        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Space>
                </header>

                <nav className="sw-ad-tab-nav">
                    {tabItems.map((tab) => (
                        <button
                            key={tab.key}
                            className={`sw-ad-tab-btn ${
                                activeTab === tab.key ? 'sw-ad-tab-btn--active' : ''
                            }`}
                            onClick={() => navigate(tabPaths[tab.key])}
                        >
                            <span className="sw-ad-tab-icon">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <main className="sw-ad-content">
                    <Routes>
    <Route path="/" element={<Navigate to="dashboard" replace />} />

    <Route path="dashboard" element={<DashboardPage tickets={tickets} />} />

    <Route
        path="tickets"
        element={
            <TicketsPage
                tickets={tickets}
                onStatusChange={handleTicketStatusUpdate}
                onAssign={handleTicketAssignment}
            />
        }
    />

    <Route
        path="users"
        element={<UsersPage users={users} onStatusToggle={handleUserStatusToggle} />}
    />

    <Route
        path="freelancers"
        element={
            <FreelancersPage
                freelancers={freelancers}
                pendingFreelancers={pendingFreelancers}
                onStatusChange={handleFreelancerStatus}
                onApproveRequest={handleApprovePendingFreelancer}
                onRejectRequest={handleRejectPendingFreelancer}
            />
        }
    />

    <Route
        path="vendors"
        element={
            <VendorsPage vendors={vendors} onStatusToggle={handleVendorStatusToggle} />
        }
    />

    <Route path="*" element={<Navigate to="dashboard" replace />} />
</Routes>

                </main>
            </div>
        </AntApp>
    )
}

const BellIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
)

export default App
