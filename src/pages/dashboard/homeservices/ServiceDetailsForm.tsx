import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./ServiceDetailsForm.css";




interface ServiceRequestFormProps {
  open: boolean;
  image: string;
  title: string;
  description: string;
  includedList: string[];
  issues: string[];
  price: string;
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export default function ServiceRequestForm({
  open,
  image,
  title,
  description,
  includedList,
  issues,
  price,
  onCancel,
  onSubmit,
}: ServiceRequestFormProps) {
  const [formData, setFormData] = useState({
    issueType: "",
    urgencyLevel: "",
    problemDescription: "",
    locationArea: "",
    preferredDate: "",
    preferredTime: "",
    serviceAddress: "",
  });

  const [errors, setErrors] = useState<any>({}); // <-- NEW

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Live validation
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.issueType) newErrors.issueType = "Please select an issue type.";
    if (!formData.urgencyLevel) newErrors.urgencyLevel = "Please select urgency level.";
    if (!formData.problemDescription) newErrors.problemDescription = "Description is required.";
    if (!formData.locationArea) newErrors.locationArea = "Location/area is required.";
    if (!formData.preferredDate) newErrors.preferredDate = "Select a date.";
    if (!formData.preferredTime) newErrors.preferredTime = "Select a time.";
    if (!formData.serviceAddress) newErrors.serviceAddress = "Service address is required.";
    

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  onSubmit(formData);  // ⬅ first close modal in parent

  setTimeout(() => {
    Modal.success({
      title: "Added to Cart",
      content: "Your service request has been successfully added to your cart.",
      centered: true,
    });
  }, 300); // ⬅ wait until modal is fully closed
};







  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={760} centered>
      <form className="service-form-modal" onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="service-header-section">
          <img src={image} alt={title} className="service-header-image" />

          <div className="service-header-details">
            <h2 className="service-title">{title}</h2>
            <p className="service-main-description">{description}</p>

            <ul className="service-included-list">
              {includedList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="service-price-box">{price}</div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="service-form-fields">

          {/* Issue + Urgency Side by Side */}
          <div className="service-two-column">
            <div>
              <label>Issue</label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
              >
                <option value="">Select issue</option>
                {issues.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.issueType && <p className="error-text">{errors.issueType}</p>}
            </div>

            <div>
              <label>Urgency Level</label>
              <select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
              >
                <option value="">Select urgency level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.urgencyLevel && (
                <p className="error-text">{errors.urgencyLevel}</p>
              )}
            </div>
          </div>

          <label>Problem Description</label>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            rows={3}
          />
          {errors.problemDescription && (
            <p className="error-text">{errors.problemDescription}</p>
          )}

          <label>Location/Area</label>
          <input
            type="text"
            name="locationArea"
            value={formData.locationArea}
            onChange={handleChange}
          />
          {errors.locationArea && <p className="error-text">{errors.locationArea}</p>}

          <div className="service-row">
            <div>
              <label>Preferred Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
              />
              {errors.preferredDate && (
                <p className="error-text">{errors.preferredDate}</p>
              )}
            </div>

            <div>
              <label>Preferred Time</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
              >
                <option value="">Select time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              {errors.preferredTime && (
                <p className="error-text">{errors.preferredTime}</p>
              )}
            </div>
          </div>

          <label>Service Address</label>
          <input
            type="text"
            name="serviceAddress"
            value={formData.serviceAddress}
            onChange={handleChange}
          />
          {errors.serviceAddress && (
            <p className="error-text">{errors.serviceAddress}</p>
          )}
        </div>

        <div className="service-buttons">
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add to Cart
          </Button>
        </div>
      </form>
    </Modal>
  );
}









