import "./ServiceDetailsPopup.css";
import { Modal } from "antd";

interface SubService {
  title: string;
  description: string;
  image: string;
  totalprice: string;
}

export default function ServiceDetailsPopup({
  open,
  onClose,
  mainTitle,
  subServices,
  onOpenForm,
}: {
  open: boolean;
  onClose: () => void;
  mainTitle: string;
  subServices: SubService[];
  onOpenForm: (service: SubService) => void;
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={820}
      centered
      className="sdp-modal"
    >
      <div className="sdp-wrapper">
        <h2 className="sdp-title">{mainTitle}</h2>
        <p className="sdp-subtitle">Select a service to view details</p>

        <div className="sdp-grid">
          {subServices.map((service, index) => (
            <div className="sdp-card" key={index}>
              <img src={service.image} className="sdp-img" alt={service.title} />

              <div className="sdp-content">
                <h4 className="sdp-card-title">{service.title}</h4>
                <p className="sdp-desc">{service.description}</p>

                <div className="sdp-footer">
                  <span className="sdp-price">{service.totalprice}</span>
                  <button
                    className="sdp-btn"
                    onClick={() => onOpenForm(service)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
