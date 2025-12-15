import { Button, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DruversCar from "../../assets/VendorPage/DruversCar.jpg"


type Driver = {
  id: string;
  name: string;
  phone: string;
  license: string;
  rating: number;
  trips: number;
  assignedCar?: string | null;
  availability: "Available" | "On Trip" | "Not assigned";
  availabilityNote?: string;
  experience: string;
  avatar?: string;
};

const SAMPLE_DRIVERS: Driver[] = [
  { id: "D001", name: "Raj Kumar", phone: "+91 98765 43210", license: "DL-1234567890", rating: 4.8, trips: 342, assignedCar: "Toyota Fortuner", availability: "Available", experience: "8 years exp", avatar: DruversCar },
  { id: "D002", name: "Amit Singh", phone: "+91 98765 43211", license: "DL-0987654321", rating: 4.9, trips: 489, assignedCar: "Honda City", availability: "On Trip", availabilityNote: "Return: Dec 15, 2025", experience: "12 years exp", avatar: DruversCar },
  { id: "D003", name: "Suresh Patel", phone: "+91 98765 43212", license: "DL-5678901234", rating: 4.7, trips: 256, assignedCar: null, availability: "Available", experience: "6 years exp", avatar: DruversCar },
  { id: "D004", name: "Vikram Reddy", phone: "+91 98765 43213", license: "DL-2345678901", rating: 4.6, trips: 198, assignedCar: "Maruti Swift", availability: "Available", experience: "5 years exp", avatar: DruversCar },
  { id: "D005", name: "Mohan Kumar", phone: "+91 98765 43214", license: "DL-6789012345", rating: 4.9, trips: 523, assignedCar: "Mercedes E-Class", availability: "On Trip", availabilityNote: "Return: Dec 13, 2025", experience: "15 years exp", avatar:DruversCar },
];

export default function DriversPage() {
  const totals = {
    total: SAMPLE_DRIVERS.length,
    available: SAMPLE_DRIVERS.filter((d) => d.availability === "Available").length,
    onTrip: SAMPLE_DRIVERS.filter((d) => d.availability === "On Trip").length,
    avgRating:
      (SAMPLE_DRIVERS.reduce((sum, d) => sum + d.rating, 0) / SAMPLE_DRIVERS.length).toFixed(1),
  };

  return (
    <div className="sw-vd-drivers-page">
      <div className="sw-vd-page-header">
        <div>
          <h1 className="sw-vd-title">Driver Management</h1>
          <p className="sw-vd-sub">Manage your driver team</p>
        </div>

        <div>
          <Button type="primary" className="sw-vd-add-btn">+ Add New Driver</Button>
        </div>
      </div>

      <div className="sw-vd-stats-grid small">
        <div className="sw-vd-stat-card sw-vd-stat-card-lite">
          <div>
            <div className="sw-vd-stat-number">{totals.total}</div>
            <div className="sw-vd-stat-label">Total Drivers</div>
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

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-rating">
          <div>
            <div className="sw-vd-stat-number">★ {totals.avgRating}</div>
            <div className="sw-vd-stat-label">Avg Rating</div>
          </div>
        </div>
      </div>

      <div className="sw-vd-fleet-table-wrap">
        <table className="sw-vd-fleet-table sw-vd-drivers-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Phone</th>
              <th>License No</th>
              <th>Rating</th>
              <th>Trips</th>
              <th>Assigned Car</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {SAMPLE_DRIVERS.map((d) => (
              <tr key={d.id}>
                <td className="sw-vd-td-driver">
                  <div className="sw-vd-car-media">
                    <img src={d.avatar} alt={d.name} className="sw-vd-car-img" />
                    <div className="sw-vd-car-meta">
                      <div className="sw-vd-car-name">{d.name}</div>
                      <div className="sw-vd-car-daily">{d.experience}</div>
                    </div>
                  </div>
                </td>

                <td>{d.phone}</td>
                <td>{d.license}</td>
                <td>★ {d.rating}</td>
                <td>{d.trips}</td>
                <td>{d.assignedCar ?? "Not assigned"}</td>

                <td>
                  {d.availability === "Available" && <Tag color="success">Available</Tag>}
                  {d.availability === "On Trip" && (
                    <div>
                      <Tag color="blue">On Trip</Tag>
                      {d.availabilityNote && <div className="sw-vd-ontrip-note">{d.availabilityNote}</div>}
                    </div>
                  )}
                  {d.availability === "Not assigned" && <Tag>Not assigned</Tag>}
                </td>

                <td className="sw-vd-actions">
                  <Tooltip title="Edit">
                    <Button shape="circle" icon={<EditOutlined />} />
                  </Tooltip>

                  <Tooltip title="Delete">
                    <Button shape="circle" danger icon={<DeleteOutlined />} />
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
