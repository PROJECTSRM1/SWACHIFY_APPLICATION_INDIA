import "../../../index.css";
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
      className="sw-hs-sdp-modal"
    >
      <div className="sw-hs-sdp-wrapper">
        <h2 className="sw-hs-sdp-title">{mainTitle}</h2>
        <p className="sw-hs-sdp-subtitle">Select a service to view details</p>

        <div className="sw-hs-sdp-grid">
          {subServices.map((service, index) => (
            <div className="sw-hs-sdp-card" key={index}>
              <img src={service.image} className="sw-hs-sdp-img" alt={service.title} />

              <div className="sw-hs-sdp-content">
                <h4 className="sw-hs-sdp-card-title">{service.title}</h4>
                <p className="sw-hs-sdp-desc">{service.description}</p>

                <div className="sw-hs-sdp-footer">
                  <span className="sw-hs-sdp-price">{service.totalprice}</span>
                  <button
                    className="sw-hs-sdp-btn"
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
