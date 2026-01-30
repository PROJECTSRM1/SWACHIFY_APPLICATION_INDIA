import React, { useState } from "react";
import "../../dashboard/Education/InstitutionRegistration.css";
import InstitutionBranchConfig from "../../dashboard/Education/InstitutionBranchConfig";

interface InstitutionsProps {
  onBack: () => void;
}

const Institutions: React.FC<InstitutionsProps> = ({ onBack }) => {
  // ✅ STEP CONTROL (ADDED)
  const [step, setStep] = useState<"step1" | "step2">("step1");

  const [form, setForm] = useState({
    institutionName: "",
    institutionType: "",
    identityType: "",
    registrationNumber: "",
    address: "",
    contactPerson: "",
    phone: "",
    email: "",
    website: "",
  });

  const [idProof, setIdProof] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ CONTINUE → GO TO STEP 2
 const handleContinue = () => {
  const step1Payload = {
    ...form,
    idProof,
    addressProof,
  };

  console.log("Institution Step 1 Data:", step1Payload);

  setStep("step2");
};


  // ✅ STEP 2 RENDER
  if (step === "step2") {
    return (
      <InstitutionBranchConfig
        onBack={() => setStep("step1")}
      />
    );
  }

  // ✅ STEP 1 UI (UNCHANGED)
  return (
    <div className="inst-reg-page">
      <div className="inst-reg-container">
        {/* HEADER */}
        <div className="inst-reg-header">
          <button className="inst-reg-back" onClick={onBack}>
            ←
          </button>
          <div>
            <h2>Institution Registration</h2>
            <span className="inst-reg-step-text">STEP 1 OF 3</span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="inst-reg-progress">
          <div className="inst-reg-progress-fill" />
        </div>

        {/* TITLE */}
        <h1 className="inst-reg-title">Institution Profile & KYC</h1>
        <p className="inst-reg-subtitle">
          Provide foundational details and verify your identity.
        </p>

        {/* GENERAL INFO */}
        <div className="inst-reg-section">
          <h4>GENERAL INFORMATION</h4>
          <div className="inst-reg-grid-2">
            <input
              className="inst-reg-input"
              name="institutionName"
              placeholder="Enter full institution name"
              value={form.institutionName}
              onChange={handleChange}
            />

            <select
              className="inst-reg-select"
              name="institutionType"
              value={form.institutionType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option>University</option>
              <option>College</option>
              <option>Institute</option>
              <option>Academy</option>
            </select>
          </div>
        </div>

        {/* KYC */}
        <div className="inst-reg-section">
          <h4>KYC VERIFICATION</h4>
          <div className="inst-reg-grid-2">
            <select
              className="inst-reg-select"
              name="identityType"
              value={form.identityType}
              onChange={handleChange}
            >
              <option value="">Select Identity Type</option>
              <option>Registration Certificate</option>
              <option>Government Approval</option>
            </select>

            <input
              className="inst-reg-input"
              name="registrationNumber"
              placeholder="Enter number as per document"
              value={form.registrationNumber}
              onChange={handleChange}
            />
          </div>

          <div className="inst-reg-grid-2">
            <label className="inst-reg-upload">
              Upload ID Proof
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setIdProof(e.target.files?.[0] || null)
                }
              />
            </label>

            <label className="inst-reg-upload">
              Upload Address Proof
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setAddressProof(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>
        </div>

        {/* LOCATION */}
        <div className="inst-reg-section">
          <h4>LOCATION</h4>
          <input
            className="inst-reg-input"
            name="address"
            placeholder="Street, Building, City, State, Zip Code"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* CONTACT */}
        <div className="inst-reg-section">
          <h4>CONTACT DETAILS</h4>
          <div className="inst-reg-grid-2">
            <input
              className="inst-reg-input"
              name="contactPerson"
              placeholder="Full name of representative"
              value={form.contactPerson}
              onChange={handleChange}
            />
            <input
              className="inst-reg-input"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              className="inst-reg-input"
              name="email"
              placeholder="admin@institution.edu"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className="inst-reg-input"
              name="website"
              placeholder="https://www.institution.edu"
              value={form.website}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="inst-reg-footer">
          <button className="inst-reg-submit" onClick={handleContinue}>
            Verify & Continue →
          </button>
          <p className="inst-reg-terms">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Institutions;
