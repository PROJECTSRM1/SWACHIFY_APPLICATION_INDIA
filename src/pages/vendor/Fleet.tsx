
import { Button, Tag, Tooltip } from "antd";
import {
  EditOutlined,
  ToolOutlined,
  CheckOutlined,
  CarOutlined,
} from "@ant-design/icons";
import Toyota from "../../assets/VendorPage/Toyota.jpg"
import honda from "../../assets/VendorPage/Honda.jpg"
import Marutiswift from "../../assets/VendorPage/Maruti Swift.jpg"
import MercedesEClass from "../../assets/VendorPage/Mercedes E-Class.jpg"
import HyundaiCreta from "../../assets/VendorPage/Hyundai Creta.jpg"
import LuxuryCaravan from "../../assets/VendorPage/Luxury Caravan.jpg"

type Car = {
  id: string;
  name: string;
  subtitle?: string;
  daily: string;
  type: string;
  plate: string;
  status: "Available" | "On Trip" | "Maintenance";
  statusNote?: string;
  insurance: string;
  odometer: string;
  lastService: string;
  image?: string;
};

const SAMPLE_CARS: Car[] = [
  {
    id: "C001",
    name: "Toyota Fortuner",
    subtitle: "",
    daily: "₹3500/day",
    type: "SUV",
    plate: "MH-02-AB-1234",
    status: "Available",
    insurance: "Mar 15, 2026",
    odometer: "45,234 km",
    lastService: "Dec 1, 2025",
    image: Toyota,
  },
  {
    id: "C002",
    name: "Honda City",
    daily: "₹2200/day",
    type: "Sedan",
    plate: "MH-02-CD-5678",
    status: "On Trip",
    statusNote: "Return: Dec 15, 2025",
    insurance: "Jan 20, 2026",
    odometer: "32,567 km",
    lastService: "Nov 28, 2025",
    image: honda
  },
  {
    id: "C003",
    name: "Maruti Swift",
    daily: "₹1800/day",
    type: "Hatchback",
    plate: "MH-02-EF-9012",
    status: "Available",
    insurance: "Feb 10, 2026",
    odometer: "28,945 km",
    lastService: "Dec 6, 2025",
    image: Marutiswift ,
     
  },
  {
    id: "C004",
    name: "Mercedes E-Class",
    daily: "₹6500/day",
    type: "Luxury",
    plate: "MH-02-GH-3456",
    status: "On Trip",
    statusNote: "Return: Dec 13, 2025",
    insurance: "Apr 5, 2026",
    odometer: "18,234 km",
    lastService: "Dec 7, 2025",
    image: MercedesEClass,
  },
  {
    id: "C005",
    name: "Hyundai Creta",
    daily: "₹2800/day",
    type: "SUV",
    plate: "MH-02-IJ-7890",
    status: "Maintenance",
    statusNote: "Scheduled oil change",
    insurance: "May 18, 2026",
    odometer: "38,123 km",
    lastService: "Dec 1, 2025",
    image: HyundaiCreta,
  },
  {
    id: "C006",
    name: "Luxury Caravan",
    daily: "₹8500/day",
    type: "Caravan",
    plate: "MH-02-KL-2345",
    status: "Available",
    insurance: "Jun 25, 2026",
    odometer: "12,456 km",
    lastService: "Dec 8, 2025",
    image: LuxuryCaravan,
  },
];

export default function FleetPage() {
  const totals = {
    total: SAMPLE_CARS.length,
    available: SAMPLE_CARS.filter((c) => c.status === "Available").length,
    onTrip: SAMPLE_CARS.filter((c) => c.status === "On Trip").length,
    maintenance: SAMPLE_CARS.filter((c) => c.status === "Maintenance").length,
  };

  return (
    <div className="sw-vd-fleet-page">
      <div className="sw-vd-page-header">
        <div>
          <h1 className="sw-vd-title">Fleet Management</h1>
          <p className="sw-vd-sub">Manage your vehicle fleet</p>
        </div>

        <div>
          <Button type="primary" className="sw-vd-add-btn">+ Add New Car</Button>
        </div>
      </div>

      <div className="sw-vd-stats-grid small">
        <div className="sw-vd-stat-card sw-vd-stat-card-lite">
          <div>
            <div className="sw-vd-stat-number">{totals.total}</div>
            <div className="sw-vd-stat-label">Total Cars</div>
          </div>
        </div>

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-available">
          <div>
            <div className="sw-vd-stat-number">{totals.available}</div>
            <div className="sw-vd-stat-label">Available</div>
          </div>
        </div>

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-ontrip">
          <div>
            <div className="sw-vd-stat-number">{totals.onTrip}</div>
            <div className="sw-vd-stat-label">On Trip</div>
          </div>
        </div>

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-maint">
          <div>
            <div className="sw-vd-stat-number">{totals.maintenance}</div>
            <div className="sw-vd-stat-label">Maintenance</div>
          </div>
        </div>
      </div>

      <div className="sw-vd-fleet-table-wrap">
        <table className="sw-vd-fleet-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Type</th>
              <th>License Plate</th>
              <th>Status</th>
              <th>Insurance Expiry</th>
              <th>Odometer</th>
              <th>Last Service</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {SAMPLE_CARS.map((car) => (
              <tr key={car.id}>
                <td className="sw-vd-td-car">
                  <div className="sw-vd-car-media">
                    <img src={car.image} alt={car.name} className="sw-vd-car-img" />
                    <div className="sw-vd-car-meta">
                      <div className="sw-vd-car-name">{car.name}</div>
                      <div className="sw-vd-car-daily">{car.daily}</div>
                    </div>
                  </div>
                </td>

                <td>{car.type}</td>

                <td>{car.plate}</td>

                <td>
                  <div className="sw-vd-status-col">
                    {car.status === "Available" && <Tag color="success" className="sw-vd-tag-available">Available</Tag>}
                    {car.status === "On Trip" && (
                      <div className="sw-vd-ontrip">
                        <Tag color="blue">On Trip</Tag>
                        {car.statusNote && <div className="sw-vd-ontrip-note">{car.statusNote}</div>}
                      </div>
                    )}
                    {car.status === "Maintenance" && <Tag color="orange">Maintenance</Tag>}
                  </div>
                </td>

                <td>{car.insurance}</td>
                <td>{car.odometer}</td>
                <td>{car.lastService}</td>

                <td className="sw-vd-actions">
                  <Tooltip title="Edit">
                    <Button shape="circle" icon={<EditOutlined />} />
                  </Tooltip>

                  {car.status === "Maintenance" ? (
                    <Tooltip title="Mark Available">
                      <Button className="sw-vd-btn-available">Mark Available</Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Maintenance">
                      <Button className="sw-vd-btn-mainten"><ToolOutlined /></Button>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
