import { useState } from "react";
import { Modal, message } from "antd";
// import "./Popup.css";
import ServiceRequestForm from "./ServiceDetailsForm";

interface SubService {
  title: string;
  description: string;
  image: string;
  price: string;
  includedList: string[];
  issues: string[];
}

export default function ServiceDetailsPopup({
  open,
  onClose,
  mainTitle,
  subServices,
}: {
  open: boolean;
  onClose: () => void;
  mainTitle: string;
  subServices: SubService[];
}) {
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [innerPopupOpen, setInnerPopupOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openInnerPopup = (service: SubService) => {
    setSelectedSubService(service);
    setInnerPopupOpen(true);
    setIsFormOpen(true);
  };

  const closeInnerPopup = () => {
    setInnerPopupOpen(false);
    setIsFormOpen(false);
    setSelectedSubService(null);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted", data);
    message.success("Your service request has been submitted!");
    closeInnerPopup();
  };

  return (
    <>
      <Modal open={open} onCancel={onClose} footer={null} width={850} centered>
        <div className="popup-container">

          {/* Title only (subtitles removed) */}
          <h2 className="popup-title">{mainTitle}</h2>

          {/* Removed: "Find your perfect service option" */}
          {/* Removed: "Choose the type of service you're looking for" */}

          <h3 className="popup-section-title">Select Service Type</h3>

          <div className="popup-card-grid">
            {subServices.map((service, index) => (
              <div className="popup-card" key={index}>
                <img src={service.image} alt={service.title} className="popup-card-image" />
                <div className="popup-card-content">
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <div className="popup-card-footer">
                    <span className="popup-price">{service.price || "$49"}</span>
                    <button
                      className="popup-view-btn"
                      onClick={() => openInnerPopup(service)}
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

      {selectedSubService && innerPopupOpen && (
        <ServiceRequestForm
          open={isFormOpen}
          onCancel={closeInnerPopup}
          onSubmit={handleFormSubmit}
          image={selectedSubService.image}
          title={selectedSubService.title}
          description={selectedSubService.description}
          includedList={selectedSubService.includedList}
          issues={selectedSubService.issues}
          price={selectedSubService.price || "Default Price"}
        />
      )}
    </>
  );
}
