import { useMemo, useState, useEffect } from "react";
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
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  FilterOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Loader from "../landing/Loader";
// import "./ServiceRequests.css";

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
  name: string;
  urgentFlag?: boolean;
};

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

export default function ServiceRequest() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeUrgency, setActiveUrgency] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const toggleExpand = (id: number) => {
  setExpandedCards((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};


  


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://swachify-india-be-1-mcrb.onrender.com/api/home-service"
        );
        const data = await res.json();
        const mapped: Request[] = Array.isArray(data)
          ? data.map((item: any, index: number) => ({
              id: item.id ?? index,
              name: item.full_name ?? "Customer",
              title: "Cleaning Request",
              desc: `Property size: ${item.property_size_sqft} sqft`,
              category: "Cleaning",
              urgency: "medium",
              distanceKm: 2.5,
              place: item.address ?? "Nearby",
              timeAgo: new Date(item.preferred_date).toLocaleDateString(),
              price: "Price on visit",
              rating: 4.5,
              urgentFlag: false,
            }))
          : [];

        setRequests(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const toggleCategory = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? "All" : cat));
  };

  const toggleUrgency = (urg: string) => {
    setActiveUrgency((prev) => (prev === urg ? "All" : urg));
  };

  const filtered = useMemo(() => {
    return requests.filter((d) => {
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
  }, [requests, activeCategory, activeUrgency, searchText]);

  const rowJustify = filtered.length > 0 && filtered.length <= 3 ? "start" : "center";

  // Show loader while fetching data
  if (loading) {
    return <Loader fullScreen message="Loading service requests..." />;
  }

  return (
    <Layout className="sw-fr-sr-layout">
      <div className="sw-fr-sr-page">
        <div className="sw-fr-sr-container">
          <div className="sw-fr-sr-header">
            <Row align="middle" justify="space-between">
              <Col>
                <h2 className="sw-fr-sr-title">
                  <span onClick={() => navigate("/freelancer")} className="sw-fr-back-arrow">←</span> Service Requests
                </h2>
              </Col>
            </Row>
          </div>

          <div className="sw-fr-sr-search-wrap">
            <div className="sw-fr-sr-search-inner">
              <Input
                placeholder="Search for services, locations..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                suffix={
                  <Button type="primary" className="sw-fr-sr-search-btn" icon={<SearchOutlined />} />
                }
                className="sw-fr-sr-search-input"
              />
              <Button
                className={`sw-fr-sr-filter-btn ${showFilters ? "active" : ""}`}
                icon={<FilterOutlined />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="sw-fr-sr-filters-panel">
                <Row gutter={[20, 14]}>
                  <Col xs={24} md={14}>
                    <div className="sw-fr-sr-filter-group">
                      <div className="sw-fr-sr-filter-heading">Category</div>
                      <Space wrap size={[6, 10]}>
                        {CATEGORIES.map((cat) => (
                          <Tag
                            key={cat}
                            className={`sw-fr-sr-chip ${activeCategory === cat ? "active-chip" : ""}`}
                            onClick={() => toggleCategory(cat)}
                          >
                            {cat}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Col>

                  <Col xs={24} md={10}>
                    <div className="sw-fr-sr-filter-group">
                      <div className="sw-fr-sr-filter-heading">Urgency</div>
                      <Space wrap size={[8, 12]}>
                        {URGENCY.map((u) => (
                          <Tag
                            key={u}
                            className={`sw-fr-sr-chip ${activeUrgency === u ? "active-chip" : ""}`}
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

          <div className="sw-fr-sr-found">
            Found <span className="sw-fr-sr-count">{filtered.length}</span> service requests
          </div>

          <div className="sw-fr-sr-cards">
            {filtered.length === 0 ? (
              <div className="sw-fr-sr-no-requests centered-no-requests">
                <div className="sw-fr-sr-no-anim">
                  <Empty description={<span className="sw-fr-no-title">No requests found</span>} />
                  <div className="sw-fr-sr-no-sub">Try different filters or search</div>
                </div>
              </div>
            ) : (
              <Row gutter={[14, 14]} justify={rowJustify}>
                {filtered.map((r) => (
                  <Col key={r.id} xs={24} sm={12} md={8} lg={7}>
                    <Card className="sw-fr-sr-card" bordered={false}>

  {/* HEADER */}
  <div className="sw-fr-sr-card-header">
    <Space size="small">
      {r.urgentFlag && <Tag className="sw-fr-sr-urgent">🔥 Urgent</Tag>}
      <Tag className="sw-fr-sr-distance">{r.distanceKm} km</Tag>
    </Space>
  </div>

  {/* CONTENT (THIS MUST GROW) */}
  <div className="sw-fr-sr-card-content">
    <h3 className="sw-fr-sr-card-title">{r.title}</h3>

    <div className="sw-fr-sr-line">👤 {r.name}</div>

    <div className="sw-fr-sr-line">
      Property size: {r.desc.replace("Property size: ", "")}
    </div>

    <div className="sw-fr-sr-line">
      <EnvironmentOutlined />
      <span
        className={`sw-fr-sr-address ${
          expandedCards[r.id] ? "expanded" : ""
        }`}
      >
        {r.place}
      </span>
    </div>

    {r.place.length > 60 && (
      <span
        className="sw-fr-sr-view-more"
        onClick={() => toggleExpand(r.id)}
      >
        {expandedCards[r.id] ? "View less" : "View more"}
      </span>
    )}

    <div className="sw-fr-sr-line">
      <ClockCircleOutlined /> {r.timeAgo}
    </div>

    <div className="sw-fr-sr-rating-row">
      <Rate disabled value={Math.round(r.rating)} />
      <span>{r.rating.toFixed(1)}</span>
    </div>
  </div>

  {/* FOOTER (MUST STAY AT BOTTOM) */}
  <div className="sw-fr-sr-card-footer">
    <div className="sw-fr-sr-price">$ {r.price}</div>

    <div className="sw-fr-sr-actions">
      <Button className="sw-fr-sr-accept">Accept</Button>
      <Button className="sw-fr-sr-details">Details</Button>
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