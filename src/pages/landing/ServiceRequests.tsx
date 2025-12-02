import { useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Tag,
  Space,
  Rate,
  Empty,
  Layout,
  Menu,
  Form,
  Tabs,
  Modal,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  FilterOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./ServiceRequests.css";

const { TabPane } = Tabs;
// const { Header } = Layout;

type Request = {
  id: number;
  title: string;
  desc: string;
  category: string;
  urgency: "high" | "medium" | "low";
  distanceKm: number;
  place: string;
  timeAgo: string;
  price: string;
  rating: number;
  urgentFlag?: boolean;
};

const initialData: Request[] = [
  {
    id: 1,
    title: "House Shifting - Packing",
    desc: "Need help packing and loading luggage for a 2BHK.",
    category: "Moving",
    urgency: "high",
    distanceKm: 2.5,
    place: "Gachibowli, Hyderabad",
    timeAgo: "10 min ago",
    price: "₹1200",
    rating: 4.8,
    urgentFlag: true,
  },
  {
    id: 2,
    title: "Deep Cleaning - Apartment",
    desc: "Deep cleaning required for 3BHK apartment.",
    category: "Cleaning",
    urgency: "medium",
    distanceKm: 3.8,
    place: "Banjara Hills, Hyderabad",
    timeAgo: "35 min ago",
    price: "₹1200",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Plumbing Repair",
    desc: "Fix leaking kitchen tap.",
    category: "Repair",
    urgency: "high",
    distanceKm: 1.2,
    place: "Madhapur, Hyderabad",
    timeAgo: "1 hour ago",
    price: "800",
    rating: 4.7,
    urgentFlag: true,
  },
];

const CATEGORIES = [
  "All",
  "Moving",
  "Cleaning",
  "Repair",
  "Installation",
  "Home Services",
  "Electrical",
  "Gardening",
];

const URGENCY = ["All", "high", "medium", "low"] as const;

const navItems = [
  { key: "home", label: <a href="/landing">Home</a> },
  { key: "cleaning", label: <a href="/cleaningservice">Cleaning</a> },
  { key: "packers", label: <a href="/LandingPackers">Packers & Movers</a> },
  { key: "home_services", label: <a href="/home_service">Home Services</a> },
  { key: "rentals", label: <a href="/rentals">Rentals</a> },
  { key: "commercial", label: <a href="/commercial-plots">Buy&Sale Properties</a> },
  { key: "materials", label: <a href="/ConstructionMaterials">Construction Materials</a> },
  { key: "freelancer", label: <a href="/Freelancer">Freelancer</a> },
];

export default function ServiceRequest() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeUrgency, setActiveUrgency] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  // Header / Auth modal states
  const navigate = useNavigate();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onLoginFinish = () => {
    message.success("Logged in (demo)");
    setAuthModalVisible(false);
  };

  const onRegisterFinish = () => {
    message.success("Registered (demo)");
    setAuthModalVisible(false);
  };

  const toggleCategory = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? "All" : cat));
  };

  const toggleUrgency = (urg: string) => {
    setActiveUrgency((prev) => (prev === urg ? "All" : urg));
  };

  const filtered = useMemo(() => {
    return initialData.filter((d) => {
      if (activeCategory !== "All" && d.category !== activeCategory) return false;
      if (activeUrgency !== "All" && d.urgency !== activeUrgency) return false;
      if (searchText.trim()) {
        const st = searchText.toLowerCase();
        if (
          !(
            d.title.toLowerCase().includes(st) ||
            d.desc.toLowerCase().includes(st) ||
            d.place.toLowerCase().includes(st)
          )
        )
          return false;
      }
      return true;
    });
  }, [activeCategory, activeUrgency, searchText]);

  // Align start when 1..3 cards present, otherwise center
  const rowJustify = filtered.length > 0 && filtered.length <= 3 ? "start" : "center";

  return (
    <Layout className="swf-layout">
      {/* Header */}
    
        <header className="hs-navbar">
        <div className="hs-navbar-logo">
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <Menu
          mode="horizontal"
          className="hs-navbar-menu"
          selectedKeys={["freelancer"]}
          items={navItems}
        />

        <Button
          type="primary"
          className="hs-contact-btn"
          onClick={() => {
            setActiveTab("login");
            setAuthModalVisible(true);
          }}
        >
          Sign Up
        </Button>
      </header>

      {/* Auth Modal */}
      <Modal
        centered
        open={authModalVisible}
        footer={null}
        onCancel={() => setAuthModalVisible(false)}
        width={420}
      >
        <Tabs activeKey={activeTab} onChange={(k) => setActiveTab(k)}>
          <TabPane tab="Login" key="login">
            <Form form={loginForm} layout="vertical" onFinish={onLoginFinish}>
              <Form.Item name="identifier" label="Email or Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form form={registerForm} layout="vertical" onFinish={onRegisterFinish}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>

      {/* Page content */}
      <div className="sr-page">
        <div className="sr-container">
          <div className="sr-header">
            <Row align="middle" justify="space-between">
              <Col>
                <h2 className="sr-title">
                  <span onClick={() => navigate("/freelancer")} className="back-arrow">←</span> Service Requests
                </h2>
              </Col>
            </Row>
          </div>

          <div className="sr-search-wrap">
            <div className="sr-search-inner">
              <Input
                placeholder="Search for services, locations..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                suffix={
                  <Button type="primary" className="sr-search-btn" icon={<SearchOutlined />} />
                }
                className="sr-search-input"
              />
              <Button
                className={`sr-filter-btn ${showFilters ? "active" : ""}`}
                icon={<FilterOutlined />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="sr-filters-panel">
                <Row gutter={[20, 14]}>
                  <Col xs={24} md={14}>
                    <div className="sr-filter-group">
                      <div className="sr-filter-heading">Category</div>
                      <Space wrap size={[6, 10]}>
                        {CATEGORIES.map((cat) => (
                          <Tag
                            key={cat}
                            className={`sr-chip ${activeCategory === cat ? "active-chip" : ""}`}
                            onClick={() => toggleCategory(cat)}
                          >
                            {cat}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Col>

                  <Col xs={24} md={10}>
                    <div className="sr-filter-group">
                      <div className="sr-filter-heading">Urgency</div>
                      <Space wrap size={[8, 12]}>
                        {URGENCY.map((u) => (
                          <Tag
                            key={u}
                            className={`sr-chip ${activeUrgency === u ? "active-chip" : ""}`}
                            onClick={() => toggleUrgency(u)}
                          >
                            {u === "All" ? "All" : u}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </div>

          <div className="sr-found">
            Found <span className="sr-count">{filtered.length}</span> service requests
          </div>

          <div className="sr-cards">
            {filtered.length === 0 ? (
              <div className="sr-no-requests centered-no-requests">
                <div className="sr-no-anim">
                  <Empty description={<span className="no-title">No requests found</span>} />
                  <div className="sr-no-sub">Try different filters or search</div>
                </div>
              </div>
            ) : (
              <Row gutter={[14, 14]} justify={rowJustify}>
                {filtered.map((r) => (
                  <Col key={r.id} xs={24} sm={12} md={8} lg={7}>
                    <Card className="sr-card compact" bordered={false}>
                      <div className="sr-card-header">
                        <Space size="small">
                          {r.urgentFlag && <Tag className="sr-urgent">🔥 Urgent</Tag>}
                          <Tag className="sr-distance">{r.distanceKm} km</Tag>
                        </Space>
                      </div>

                      <div className="sr-card-main">
                        <h3 className="sr-card-title">{r.title}</h3>
                        <p className="sr-card-desc">{r.desc}</p>
                      </div>

                      <div className="sr-meta-row compact">
                        <div className="sr-meta-left-group">
                          <div className="sr-meta-left">
                            <EnvironmentOutlined className="sr-meta-icon" />
                            <span className="sr-meta-text">{r.place}</span>
                          </div>

                          <div className="sr-meta-middle">
                            <ClockCircleOutlined className="sr-meta-icon" />
                            <span className="sr-meta-text">{r.timeAgo}</span>
                          </div>
                        </div>

                        <div className="sr-meta-right">
                          <Rate disabled defaultValue={Math.round(r.rating)} />
                          <span className="sr-rating">{r.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="sr-divider" />

                      <div className="sr-card-bottom compact">
                        <div className="sr-price">
                          <span className="sr-currency">$</span>
                          <span className="sr-amount">{r.price}</span>
                        </div>

                        <div className="sr-actions">
                          <Button className="sr-accept small" size="small">
                            Accept
                          </Button>
                          <Button onClick={() => navigate("/freelancerregistration")} className="sr-details small" size="small">
                            Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
