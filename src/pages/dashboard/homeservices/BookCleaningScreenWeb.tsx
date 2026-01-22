import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdMoreHoriz,
  MdLocationOn,
  MdMyLocation,
  MdCalendarToday,
  MdAccessTime,
  MdAdd,
  MdDelete,
  MdClose,
  MdVerified,
  MdStar,
  MdWarningAmber,
  MdErrorOutline,
  MdPhotoCamera,
  MdPhotoLibrary,
  MdShoppingBag,
} from "react-icons/md";
import "./BookCleaningScreenWeb.css";

import PaymentScreenWeb from "./PaymentScreenWeb.tsx";

/* =======================
   TYPES
   ======================= */
interface Service {
  id: string;
  title: string;
  category: string;
}

interface Professional {
  id: string;
  name: string;
  role: string;
  rating: string;
  distance: string;
  image?: string; // url for web
  verified?: boolean;
  mobileNumber: string;
}

/* =======================
   CONSTANTS
   ======================= */
const ALL_SERVICES: Service[] = [
  // Home Services
  { id: "1", title: "Plumbing", category: "Home" },
  { id: "2", title: "Painting", category: "Home" },
  { id: "3", title: "Electrician", category: "Home" },

  // Apartment Cleaning
  { id: "4", title: "Floor Cleaning", category: "Apartment" },
  { id: "5", title: "Kitchen Cleaning", category: "Apartment" },
  { id: "6", title: "Washroom Cleaning", category: "Apartment" },

  // Commercial Cleaning
  { id: "7", title: "Office Cleaning", category: "Commercial" },
  { id: "8", title: "Villa Cleaning", category: "Commercial" },
  { id: "9", title: "Pool Cleaning", category: "Commercial" },

  // Vehicle Cleaning
  { id: "10", title: "Car Cleaning", category: "Vehicle" },
  { id: "11", title: "Bike Cleaning", category: "Vehicle" },
];

const BASE_PRICE = 80;
const ADDON_PRICE = 25;

/* =======================
   SMALL COMPONENTS
   ======================= */
const SummaryRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bc_summaryRow">
      <p className="bc_summaryRowText">{label}</p>
      <p className="bc_summaryRowText">{value}</p>
    </div>
  );
};

/* =======================
   HELPERS
   ======================= */
const formatMoney = (n: number) => `$${n.toFixed(2)}`;

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    {
      headers: {
        "User-Agent": "BookCleaningWeb/1.0",
      },
    }
  );

  const data = await res.json();
  return data?.display_name || "Address not found";
}

/* =======================
   SCREEN
   ======================= */
const BookCleaningScreenWeb: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // read data passed from previous screens
  const consultationCharge: number = Number(location.state?.consultationCharge || 0);

  const incomingSelectedServices = location.state?.selectedServices || [];

  const [locationType, setLocationType] = useState<"default" | "other">("default");
  const [allocationType, setAllocationType] = useState<"auto" | "manual">("auto");
const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [floorArea, setFloorArea] = useState("");
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [time, setTime] = useState(""); // HH:MM

  const [extraHours, setExtraHours] = useState(0);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [locationDetails, setLocationDetails] = useState("");

  // images (web)
  const [images, setImages] = useState<File[]>([]);
  const imageUrls = useMemo(() => images.map((f) => URL.createObjectURL(f)), [images]);

  const [selectedServices, setSelectedServices] = useState<Service[]>(() => {
    // CASE 1: already full objects
    if (incomingSelectedServices?.length && typeof incomingSelectedServices[0] === "object") {
      return incomingSelectedServices as Service[];
    }

    // CASE 2: titles only
    return (incomingSelectedServices as string[])
      .map((title) => ALL_SERVICES.find((s) => s.title === title))
      .filter(Boolean) as Service[];
  });

  const [showAddonPicker, setShowAddonPicker] = useState(false);
  const [selectedAddonId, setSelectedAddonId] = useState<string>("");

  const [currentAddress, setCurrentAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Employee allocation
  const [allocatedEmployee, setAllocatedEmployee] = useState<Professional | null>(
    (location.state?.allocatedEmployee as Professional) || null
  );
  const [showEmployeeModal, setShowEmployeeModal] = useState<boolean>(
    Boolean(location.state?.allocatedEmployee)
  );

  const mainService = selectedServices[0];
  const addonServices = selectedServices.slice(1);

  const remainingServices = useMemo(() => {
    return ALL_SERVICES.filter((service) => !selectedServices.some((s) => s.id === service.id));
  }, [selectedServices]);

 const EXTRA_HOUR_PRICE = 30;
const FLOOR_AREA_RATE = 0.05; // per sqft

const floorAreaCost = floorArea ? Number(floorArea) * FLOOR_AREA_RATE : 0;
const extraHoursCost = extraHours * EXTRA_HOUR_PRICE;

const servicePrice =
  (mainService ? BASE_PRICE : 0) +
  addonServices.length * ADDON_PRICE +
  extraHoursCost +
  floorAreaCost;

const totalPrice = servicePrice + consultationCharge;

  // cleanup object urls
  useEffect(() => {
    return () => {
      imageUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [imageUrls]);

  // auto fetch location on mount
  useEffect(() => {
    if (locationType === "default") {
      getCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      return;
    }

    setLoadingLocation(true);
    setCurrentAddress("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const address = await reverseGeocode(lat, lon);
          setCurrentAddress(address);
        } catch (e) {
          console.error(e);
          setCurrentAddress("Unable to fetch address. Please try again.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        console.error(err);
        setLoadingLocation(false);
        setCurrentAddress("Unable to detect location. Please allow location access.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  const addService = (serviceId: string) => {
    const serviceToAdd = remainingServices.find((s) => s.id === serviceId);
    if (!serviceToAdd) return;
    setSelectedServices((prev) => [...prev, serviceToAdd]);
  };

  const removeService = (id: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAllocationTypeChange = (value: "auto" | "manual") => {
    setAllocationType(value);

    // On web, you can navigate to an allocation screen or open a modal
    // For now we keep simple behavior like your app
    if (value === "manual") {
      navigate("/dashboard/employee-allocation", { state: { isAutoAllocation: false } });
    } else {
      setAllocatedEmployee(null);
      navigate("/dashboard/employee-allocation", { state: { isAutoAllocation: true } });
    }
  };

  const handlePickImages = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateAndCheckout = () => {
    if (extraHours > 0 && reason.trim().length === 0) {
      setReasonError(true);
      return;
    }

    // Navigate to payment page (web)
  
  setShowPaymentModal(true);
  };

  return (
    <div className="bc_page">
      {/* HEADER */}
      <header className="bc_header">
        <div className="bc_headerLeft">
          <button className="bc_iconBtn" onClick={() => navigate(-1)} type="button">
            <MdArrowBack size={22} color="#fff" />
          </button>

          <h1 className="bc_headerTitle">Book Cleaning</h1>
        </div>

        <button className="bc_iconBtn" type="button">
          <MdMoreHoriz size={24} color="#9CA3AF" />
        </button>
      </header>

      {/* CONTENT */}
      <div className="bc_container">
        <h2 className="bc_sectionTitle">Job Details</h2>

        {/* LOCATION */}
        <p className="bc_label">Location</p>
        <div className="bc_selectWrap">
          <select
            className="bc_select"
            value={locationType}
            onChange={(e) => {
              const value = e.target.value as "default" | "other";
              setLocationType(value);

              if (value === "default") {
                getCurrentLocation();
              } else {
                setCurrentAddress("");
              }
            }}
          >
            <option value="default">Default Location (Home)</option>
            <option value="other">Other Location</option>
          </select>
        </div>

        {locationType === "default" && (
          <div className="bc_detectBox">
            <p className="bc_label">Detected Location</p>

            <div className="bc_detectedLocationBox">
              {loadingLocation ? (
                <div className="bc_locationRow">
                  <MdMyLocation size={20} className="bc_locationIconActive" />
                  <p className="bc_detectText">Detecting your location...</p>
                </div>
              ) : currentAddress ? (
                <div className="bc_locationRow">
                  <MdLocationOn size={20} className="bc_locationIconActive" />
                  <p className="bc_detectText">{currentAddress}</p>
                </div>
              ) : (
                <button className="bc_locationRowBtn" onClick={getCurrentLocation} type="button">
                  <MdMyLocation size={20} className="bc_locationIcon" />
                  <p className="bc_detectPlaceholder">Tap to detect location</p>
                </button>
              )}
            </div>
          </div>
        )}

        {/* OTHER LOCATION */}
        {locationType === "other" && (
          <div className="bc_otherLocationFields">
            <p className="bc_label">Customer Full Name</p>
            <input
              className="bc_input"
              placeholder="Enter name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <p className="bc_label">Contact Number</p>
            <input
              className="bc_input"
              placeholder="+1 (555) 000-0000"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <p className="bc_label">Location Details</p>
            <textarea
              className="bc_textarea"
              placeholder="Street address, building, floor/apartment number..."
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
            />
          </div>
        )}

        {/* ALLOCATION TYPE */}
        <p className="bc_label">
          {allocationType === "auto" ? "Allocation Type (Auto)" : "Allocation Type (Manual)"}
        </p>

        <div className="bc_selectWrap">
          <select
            className="bc_select"
            value={allocationType}
            onChange={(e) => handleAllocationTypeChange(e.target.value as "auto" | "manual")}
          >
            <option value="auto">Auto-Allocation (Recommended)</option>
            <option value="manual">Manual Allocation</option>
          </select>
        </div>

        {/* ALLOCATED EMPLOYEE CARD */}
        {allocatedEmployee && (
          <div className="bc_allocatedCard">
            <div className="bc_allocatedHeader">
              <p className="bc_allocatedTitle">Allocated Professional</p>

              <button className="bc_smallIconBtn" type="button" onClick={() => setAllocatedEmployee(null)}>
                <MdClose size={18} />
              </button>
            </div>

            <div className="bc_allocatedBody">
              <div className="bc_allocatedLeft">
                <div className="bc_avatarWrap">
                  <img
                    src={allocatedEmployee.image || "https://i.pravatar.cc/150?img=12"}
                    className="bc_avatar"
                    alt="Professional"
                  />
                  {allocatedEmployee.verified && (
                    <span className="bc_verifiedBadge">
                      <MdVerified size={16} />
                    </span>
                  )}
                </div>

                <div>
                  <p className="bc_allocatedName">{allocatedEmployee.name}</p>
                  <p className="bc_allocatedRole">{allocatedEmployee.role}</p>

                  <div className="bc_allocatedMeta">
                    <MdStar size={16} className="bc_star" />
                    <span className="bc_metaText">{allocatedEmployee.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FLOOR AREA */}
        <div className="bc_sectionBlock">
          <p className="bc_label">FLOOR AREA (SQFT)</p>
          <div className="bc_floorInput">
            <input
              className="bc_floorField"
              placeholder="1400"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
              inputMode="numeric"
            />
            <span className="bc_suffix">SQFT</span>
          </div>
        </div>

        {/* DATE + TIME */}
        <div className="bc_dateTimeRow">
          <div className="bc_dateSection">
            <p className="bc_label">DATE</p>
            <div className="bc_iconInput">
              <MdCalendarToday size={18} className="bc_iconMuted" />
              <input
  className="bc_iconInputField"
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  min={new Date().toISOString().split("T")[0]}
  onFocus={(e) => e.currentTarget.showPicker?.()}
/>
            </div>
          </div>

          <div className="bc_timeSection">
            <p className="bc_label">START TIME</p>
            <div className="bc_iconInput">
              <MdAccessTime size={18} className="bc_iconMuted" />
             <input
  className="bc_iconInputField"
  type="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  onFocus={(e) => e.currentTarget.showPicker?.()}
/>

            </div>
          </div>
        </div>

        {/* EXTRA HOURS */}
        <div className="bc_extraHoursCard">
          <div className="bc_extraHeader">
            <div>
              <p className="bc_extraTitle">Extra Hours</p>
              <p className="bc_extraSub">Deep cleaning requirement</p>
            </div>

            <div className="bc_counter">
              <button
                type="button"
                className="bc_counterBtn"
                onClick={() => setExtraHours((v) => Math.max(0, v - 1))}
              >
                −
              </button>

              <span className="bc_counterText">+{extraHours} hr</span>

              <button
                type="button"
                className="bc_counterBtnPlus"
                onClick={() => setExtraHours((v) => v + 1)}
              >
                +
              </button>
            </div>
          </div>

          {extraHours > 0 && (
            <div className="bc_reasonSection">
              <div className="bc_reasonHeader">
                <MdWarningAmber size={16} className="bc_warn" />
                <p className="bc_reasonLabel">
                  Reason for Add-on Work <span className="bc_required">*</span>
                </p>
              </div>

              <textarea
                className={`bc_reasonTextarea ${reasonError ? "bc_textareaError" : ""}`}
                placeholder="Explain why additional hours are required"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setReasonError(false);
                }}
              />

              {reasonError && (
                <div className="bc_errorRow">
                  <MdErrorOutline size={18} className="bc_errorIcon" />
                  <p className="bc_errorText">This field is required when extra hours are added</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* UPLOAD PHOTOS */}
        <div className="bc_sectionBlock">
          <p className="bc_label">UPLOAD PHOTOS OF AREA</p>

          <div className="bc_photoGrid">
            {/* Camera / Gallery (same input in web) */}
            <label className="bc_photoBoxDashed">
              <MdPhotoCamera size={28} className="bc_photoIcon" />
              <span className="bc_photoText">Take Photo</span>
              <input
                className="bc_fileInput"
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={(e) => handlePickImages(e.target.files)}
              />
            </label>

            <label className="bc_photoBoxDashed">
              <MdPhotoLibrary size={28} className="bc_photoIcon" />
              <span className="bc_photoText">Gallery</span>
              <input
                className="bc_fileInput"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handlePickImages(e.target.files)}
              />
            </label>

            {imageUrls.map((src, index) => (
              <div key={index} className="bc_photoPreview">
                <img src={src} className="bc_photoImage" alt={`Upload ${index + 1}`} />
                <button className="bc_removePhoto" type="button" onClick={() => removeImage(index)}>
                  <MdClose size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="bc_divider" />

        {/* ADDONS */}
        <div className="bc_addonHeader">
          <h2 className="bc_sectionTitle">Addons</h2>

          <button
            className="bc_addBtn"
            type="button"
            onClick={() => setShowAddonPicker((v) => !v)}
            disabled={remainingServices.length === 0}
          >
            <MdAdd size={18} />
            <span>Add New</span>
          </button>
        </div>

        {showAddonPicker && remainingServices.length > 0 && (
          <div className="bc_selectWrap">
            <select
              className="bc_select"
              value={selectedAddonId}
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  addService(value);
                  setSelectedAddonId("");
                  setShowAddonPicker(false);
                }
              }}
            >
              <option value="">Select a service</option>
              {remainingServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {mainService && (
          <>
            <p className="bc_addonTitle">MAIN SERVICE</p>

            <div className="bc_addonCard">
              <div className="bc_addonAccent" />
              <div className="bc_addonContent">
                <p className="bc_addonSelectText">{mainService.title}</p>
              </div>
            </div>
          </>
        )}

        {addonServices.length > 0 && (
          <>
            <h2 className="bc_sectionTitle">Add-on Services</h2>

            {addonServices.map((addon, index) => (
              <div key={addon.id} className="bc_addonCard">
                <div className="bc_addonAccent" />
                <div className="bc_addonContent">
                  <div className="bc_addonCardHeader">
                    <p className="bc_addonTitle">ADD-ON SERVICE #{index + 1}</p>

                    <button className="bc_smallIconBtn" type="button" onClick={() => removeService(addon.id)}>
                      <MdDelete size={20} />
                    </button>
                  </div>

                  <p className="bc_addonSelectText">{addon.title}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* COST SUMMARY */}
        <div className="bc_summary">
         <SummaryRow
  label="Base Service"
  value={formatMoney(mainService ? BASE_PRICE : 0)}
/>

<SummaryRow
  label={`Add-ons (${addonServices.length})`}
  value={formatMoney(addonServices.length * ADDON_PRICE)}
/>

{extraHours > 0 && (
  <SummaryRow
    label={`Extra Hours (${extraHours} hr)`}
    value={formatMoney(extraHoursCost)}
  />
)}

{floorArea && (
  <SummaryRow
    label={`Floor Area (${floorArea} sqft)`}
    value={formatMoney(floorAreaCost)}
  />
)}

{consultationCharge > 0 && (
  <SummaryRow
    label="Consultation Charge"
    value={formatMoney(consultationCharge)}
  />
)}


          <div className="bc_summaryDivider" />

          <div className="bc_summaryTotal">
            <p className="bc_summaryTotalLabel">Estimated Cost</p>
            <p className="bc_summaryTotalValue">{formatMoney(totalPrice)}</p>
          </div>
         
        </div>
         <div className="bc_bottomBar">
        <button className="bc_ctaBtn" type="button" onClick={validateAndCheckout}>
          <MdShoppingBag size={22} />
          <span>Add to Cart and Checkout</span>
        </button>
      </div>

        <div className="bc_bottomSpace" />
      </div>

      {/* BOTTOM CTA */}
      {/* <div className="bc_bottomBar">
        <button className="bc_ctaBtn" type="button" onClick={validateAndCheckout}>
          <MdShoppingBag size={22} />
          <span>Add to Cart and Checkout</span>
        </button>
      </div> */}

      {/* EMPLOYEE MODAL */}
      {showEmployeeModal && allocatedEmployee && (
        <div className="bc_modalOverlay" onClick={() => setShowEmployeeModal(false)}>
          <div className="bc_modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="bc_modalAvatarWrap">
              <img
                src={allocatedEmployee.image || "https://i.pravatar.cc/150?img=12"}
                className="bc_modalAvatar"
                alt="Professional"
              />
              {allocatedEmployee.verified && (
                <span className="bc_modalVerified">
                  <MdVerified size={18} />
                </span>
              )}
            </div>

            <p className="bc_modalName">{allocatedEmployee.name}</p>
            <p className="bc_modalSubtitle">Professional Selected</p>

            <div className="bc_modalInfoGrid">
              <div className="bc_modalInfoRow">
                <span className="bc_modalInfoLabel">Ratings</span>
                <span className="bc_modalInfoValue">
                  <MdStar size={18} className="bc_star" /> {allocatedEmployee.rating}
                </span>
              </div>

              <div className="bc_modalInfoRow">
                <span className="bc_modalInfoLabel">Service</span>
                <span className="bc_modalInfoValue">{allocatedEmployee.role}</span>
              </div>

              <div className="bc_modalInfoRow">
                <span className="bc_modalInfoLabel">Mobile Number</span>
                <span className="bc_modalInfoValue">{allocatedEmployee.mobileNumber}</span>
              </div>
            </div>

            <button className="bc_modalBtn" type="button" onClick={() => setShowEmployeeModal(false)}>
              OK
            </button>
          </div>
        </div>
      )}
      {showPaymentModal && (
  <div
    className="bc_modalOverlay"
    onClick={() => setShowPaymentModal(false)}
  >
    <div
      className="bc_modalCard bc_paymentModal"
      onClick={(e) => e.stopPropagation()}
    >
      <PaymentScreenWeb
        onClose={() => setShowPaymentModal(false)}
        totalAmount={totalPrice}
        allocatedEmployee={allocatedEmployee}
        bookingDetails={{
          serviceName: selectedServices[0]?.title,
          date,
          time,
          address: currentAddress,
        }}
      />
    </div>
  </div>
)}

    </div>
  );
};

export default BookCleaningScreenWeb;