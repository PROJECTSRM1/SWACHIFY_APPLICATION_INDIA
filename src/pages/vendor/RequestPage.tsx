import { Button, Tag, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";


type Request = {
  id: string;
  timeAgo: string;
  name: string;
  phone: string;
  service: string;
  carType: string;
  start: string;
  duration: string;
  pickup: string;
  amount: string;
};

const SAMPLE_REQUESTS: Request[] = [
  {
    id: "BK001234",
    timeAgo: "2 hours ago",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    service: "Self Drive",
    carType: "SUV",
    start: "Dec 12, 2025 - 10:00 AM",
    duration: "3 days",
    pickup: "Downtown Center",
    amount: "₹12450",
  },
  {
    id: "BK001235",
    timeAgo: "4 hours ago",
    name: "Priya Patel",
    phone: "+91 98765 43211",
    service: "With Driver",
    carType: "Sedan",
    start: "Dec 13, 2025 - 2:00 PM",
    duration: "2 days",
    pickup: "Airport Terminal",
    amount: "₹7800",
  },
  {
    id: "BK001236",
    timeAgo: "1 hour ago",
    name: "Amit Singh",
    phone: "+91 98765 43212",
    service: "Marriage Rental",
    carType: "Luxury",
    start: "Dec 15, 2025 - 9:00 AM",
    duration: "1 day",
    pickup: "City Mall",
    amount: "₹15000",
  },
  {
    id: "BK001237",
    timeAgo: "30 minutes ago",
    name: "Sneha Reddy",
    phone: "+91 98765 43213",
    service: "Self Drive",
    carType: "Hatchback",
    start: "Dec 14, 2025 - 8:00 AM",
    duration: "2 days",
    pickup: "Railway Station",
    amount: "₹4200",
  },
  {
    id: "BK001238",
    timeAgo: "15 minutes ago",
    name: "Vikram Kumar",
    phone: "+91 98765 43214",
    service: "Caravan Rental",
    carType: "Caravan",
    start: "Dec 18, 2025 - 6:00 AM",
    duration: "4 days",
    pickup: "Downtown Center",
    amount: "₹34000",
  },
];

const serviceTagColor = (service: string) => {
  if (service.includes("Self")) return "blue";
  if (service.includes("Driver")) return "geekblue";
  if (service.includes("Marriage")) return "purple";
  if (service.includes("Caravan")) return "cyan";
  return "default";
};

export default function RequestsPage()  {
  return (
    <div className="sw-vd-requests-page-container">
      <h1 className="sw-vd-title">Incoming Booking Requests</h1>
      <p className="sw-vd-sub">5 pending requests waiting for your action</p>

      <div className="sw-vd-req-table-wrap">
        <table className="sw-vd-req-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Service Type</th>
              <th>Car Type</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Pickup</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {SAMPLE_REQUESTS.map((r) => (
              <tr key={r.id} className="sw-vd-req-row">
                <td className="sw-vd-req-id-cell">
                  <div className="sw-vd-bid">{r.id}</div>
                  <div className="sw-vd-timeago">{r.timeAgo}</div>
                </td>

                <td className="sw-vd-customer-cell">
                  <div className="sw-vd-cust-name">{r.name}</div>
                  <div className="sw-vd-cust-phone">{r.phone}</div>
                </td>

                <td>
                  <Tag color={serviceTagColor(r.service)} className="sw-vd-service-tag">
                    {r.service}
                  </Tag>
                </td>

                <td>{r.carType}</td>
                <td>{r.start}</td>
                <td>{r.duration}</td>
                <td>{r.pickup}</td>

                <td className="sw-vd-amount-col">
                  <div className="sw-vd-amount">{r.amount}</div>
                </td>

                <td className="sw-vd-actions-col">
                  <div className="sw-vd-action-buttons">
                    <Tooltip title="Accept">
                      <Button shape="circle" className="sw-vd-accept-btn" icon={<CheckOutlined />} />
                    </Tooltip>

                    <Tooltip title="Reject">
                      <Button shape="circle" className="sw-vd-reject-btn" icon={<CloseOutlined />} />
                    </Tooltip>

                    <Tooltip title="View details">
                      <Button shape="circle" icon={<EyeOutlined />} />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
