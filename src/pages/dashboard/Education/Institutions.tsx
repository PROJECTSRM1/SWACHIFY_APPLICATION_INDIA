import React, { useState, useRef } from "react";
import "../../dashboard/Education/InstitutionRegistration.css";
import InstitutionBranchConfig from "../../dashboard/Education/InstitutionBranchConfig";
import axios from "axios";

interface InstitutionsProps {
  onBack: () => void;
}

const API_BASE = "https://swachify-india-be-1-mcrb.onrender.com";

const Institutions: React.FC<InstitutionsProps> = ({ onBack }) => {
  const [step, setStep] = useState<"step1" | "step2">("step1");
  const [loading, setLoading] = useState(false);

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
  const [institutionId, setInstitutionId] = useState<number | null>(null);

  // 🔑 File input refs (THIS FIXES RE-UPLOAD ISSUE)
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Mobile number: digits only, max 10
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phone: value }));
  };

  /* ================= SUBMIT ================= */
// const fileToBase64 = (file: File): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = reject;
//   });

const handleContinue = async () => {
  setLoading(true);

  try {
    const payload = {
      institution_name: form.institutionName,
      institution_type_id: Number(form.institutionType),
      identity_type_id: Number(form.identityType),
      identity_number: form.registrationNumber,
      location: form.address,
      representative_name: form.contactPerson,
      email: form.email,
      phone_number: form.phone,
      institute_website: form.website,

      // ✅ STRING ONLY (NO BINARY)
      upload_id_proof: idProof ? idProof.name : "",
      upload_address_proof: addressProof ? addressProof.name : "",

      total_branches: 0,
      academic_year_start: "2026-01-30",
      academic_year_end: "2026-01-30",
      created_by: 1,
      is_active: true,
    };

  const res = await axios.post(
  `${API_BASE}/institution/student/register`,
  payload,
  { headers: { "Content-Type": "application/json" } }
);

console.log("REGISTER RESPONSE:", res.data);

// ✅ adjust based on response
const id =
  res.data.institution_id ??
  res.data.id ??
  res.data.data?.id;

if (!id) {
  throw new Error("Institution ID not returned from API");
}

setInstitutionId(id);
setStep("step2");


  } catch (err) {
    console.error(err);
    alert("Institution registration failed");
  } finally {
    setLoading(false);
  }
};



  /* ================= STEP 2 ================= */

if (step === "step2" && institutionId) {
  return (
    <InstitutionBranchConfig
      institutionId={institutionId}
      onBack={() => setStep("step1")}
    />
  );
}
if (step === "step2" && !institutionId) {
  return (
    <div style={{ padding: 40 }}>
      <h3>Creating institution…</h3>
      <p>Please wait</p>
    </div>
  );
}


  /* ================= UI ================= */

  return (
      <div className="inst-reg-wrapper">
    <div className="inst-reg-page">
      <div className="inst-reg-container">
        <div className="inst-reg-header">
          <button className="inst-reg-back" onClick={onBack}>←</button>
          <div>
            <h2>Institution Registration</h2>
            <span className="inst-reg-step-text">STEP 1 OF 3</span>
          </div>
        </div>

        <h1 className="inst-reg-title">Institution Profile & KYC</h1>

        {/* GENERAL INFO */}
        <div className="inst-reg-section">
          <h4>GENERAL INFORMATION</h4>
          <div className="inst-reg-grid-2">
            <input
              name="institutionName"
              placeholder="Institution name"
              value={form.institutionName}
              onChange={handleChange}
            />
            <select
              name="institutionType"
              value={form.institutionType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="1">University</option>
              <option value="2">College</option>
              <option value="3">Institute</option>
              <option value="4">Academy</option>
            </select>
          </div>
        </div>

        {/* KYC */}
        <div className="inst-reg-section">
          <h4>KYC VERIFICATION</h4>
          <div className="inst-reg-grid-2">
            <select
              name="identityType"
              value={form.identityType}
              onChange={handleChange}
            >
              <option value="">Select Identity</option>
              <option value="1">Registration Certificate</option>
              <option value="2">Government Approval</option>
            </select>
            <input
              name="registrationNumber"
              placeholder="Document number"
              value={form.registrationNumber}
              onChange={handleChange}
            />
          </div>

          {/* FILE UPLOADS */}
          <div className="inst-reg-grid-2">
          {/* ID PROOF */}
<div className="inst-reg-upload-wrap">
  <label className="inst-reg-upload">
    Upload ID Proof
    <input
      type="file"
      hidden
      ref={idInputRef}
      onChange={(e) => setIdProof(e.target.files?.[0] || null)}
    />
  </label>

  {idProof && (
    <div className="inst-reg-file">
      <span>{idProof.name}</span>
      <button
        type="button"
        onClick={() => {
          setIdProof(null);
          if (idInputRef.current) idInputRef.current.value = "";
        }}
      >
        ✕
      </button>
    </div>
  )}
</div>


{/* ADDRESS PROOF */}
<div className="inst-reg-upload-wrap">
  <label className="inst-reg-upload">
    Upload Address Proof
    <input
      type="file"
      hidden
      ref={addressInputRef}
      onChange={(e) => setAddressProof(e.target.files?.[0] || null)}
    />
  </label>

  {addressProof && (
    <div className="inst-reg-file">
      <span>{addressProof.name}</span>
      <button
        type="button"
        onClick={() => {
          setAddressProof(null);
          if (addressInputRef.current) addressInputRef.current.value = "";
        }}
      >
        ✕
      </button>
    </div>
  )}
</div>

          </div>
        </div>

        {/* LOCATION */}
        <div className="inst-reg-section">
          <h4>LOCATION</h4>
          <input
            name="address"
            placeholder="Full address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* CONTACT */}
        <div className="inst-reg-section">
          <h4>CONTACT DETAILS</h4>
          <div className="inst-reg-grid-2">
            <input
              name="contactPerson"
              placeholder="Representative name"
              value={form.contactPerson}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="10 digit mobile number"
              value={form.phone}
              onChange={handlePhoneChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="website"
              placeholder="Website"
              value={form.website}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="inst-reg-footer">
          <button
            className="inst-reg-submit"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Continue →"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Institutions;
