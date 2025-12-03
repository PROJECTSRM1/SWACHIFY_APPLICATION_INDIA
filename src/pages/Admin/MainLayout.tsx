import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Drawer } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    DashboardOutlined,
    FileTextOutlined,
    UserOutlined,
    TeamOutlined,
    ShopOutlined,
    MenuOutlined,
} from '@ant-design/icons';
//import '../index.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const menuItems = [
        { key: '/admin-dashboard/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '/admin-dashboard/tickets', icon: <FileTextOutlined />, label: 'All Tickets' },
        { key: '/admin-dashboard/users', icon: <UserOutlined />, label: 'Users' },
        { key: '/admin-dashboard/freelancers', icon: <TeamOutlined />, label: 'Freelancers' },
        { key: '/admin-dashboard/vendors', icon: <ShopOutlined />, label: 'Vendors' },
    ];

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
        setDrawerVisible(false); // Close drawer on menu click
    };

    return (
        <Layout className="sw-ad-main-layout">
            <Header className="sw-ad-header">
                <div className="sw-ad-header-left">
                    <div className="sw-ad-logo">
                        <Title level={5} style={{ color: '#ffffff', margin: 0, fontWeight: 600 }}>SWACHIFY INDIA - ADMIN</Title>
                        <Button
                            className="sw-ad-menu-toggle"
                            icon={<MenuOutlined />}
                            onClick={() => setDrawerVisible(true)}
                        />
                    </div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={handleMenuClick}
                        style={{ borderBottom: 'none', background: 'transparent', flex: 1 }}
                        className="sw-ad-custom-menu desktop-menu"
                    />
                </div>
                <div className="sw-ad-header-right">
                    <span className="sw-ad-admin-name">Admin: swachify1</span>
                    <Button type="primary" size="small">
                        Logout
                    </Button>
                </div>
            </Header>

            {/* Mobile Drawer Menu */}
            <Drawer
                title="Menu"
                placement="left"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                className="sw-ad-mobile-drawer"
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="sw-ad-drawer-menu"
                />
                <div className="sw-drawer-footer">
                    <div className="sw-ad-drawer-admin">Admin: swachify1</div>
                    <Button type="primary" danger block>
                        Logout
                    </Button>
                </div>
            </Drawer>

            <Content style={{ padding: '0 24px', marginTop: 56 }}>
                <div className="sw-ad-site-layout-content">
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
};

export default MainLayout;
