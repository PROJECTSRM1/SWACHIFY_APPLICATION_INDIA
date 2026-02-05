import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  MdArrowBack,
  MdClose,
  MdPhotoCamera,
  MdPhotoLibrary,
  MdShoppingBag,
  MdLocationOn,
  MdPerson,
  MdPhone,
  MdCalendarToday,
  MdAccessTime,
  MdAdd,
  MdRemove,
  MdCheckCircle,
  MdStar,
  MdVerified,
  // MdCloudUpload,
} from "react-icons/md";
import "./BookCleaningScreenWeb.css";
import PaymentScreenWeb from "./PaymentScreenWeb";

/* ================= TYPES ================= */
interface Service {
  id: string;
  title: string;
  category: string;
  price?: number;
}

type ServiceContext = "home" | "vehicle" | "commercial" | "homeServices";

type Props = {
  selectedServices: string[] | Service[];
  consultationCharge: number;
  serviceContext: ServiceContext;
  meta?: any;
  onClose: () => void;
};

type Addon = {
  id: string;
  label: string;
  price: number;
  icon?: string;
};

const ADDONS_BY_TYPE: Record<ServiceContext, Addon[]> = {
  home: [
    { id: "deep-kitchen", label: "Deep Kitchen Cleaning", price: 200, icon: "🍳" },
    { id: "balcony", label: "Balcony Cleaning", price: 150, icon: "🌿" },
    { id: "fridge", label: "Fridge Interior Cleaning", price: 120, icon: "❄️" },
  ],
  vehicle: [
    { id: "engine-bay", label: "Engine Bay Cleaning", price: 350, icon: "⚙️" },
    { id: "dashboard-polish", label: "Dashboard Polishing", price: 180, icon: "✨" },
    { id: "underbody", label: "Underbody Wash", price: 250, icon: "🚿" },
  ],
  commercial: [
    { id: "glass-polish", label: "Glass Polishing", price: 500, icon: "🪟" },
    { id: "restroom-sanitize", label: "Restroom Sanitization", price: 400, icon: "🧴" },
    { id: "machinery", label: "Machinery Cleaning", price: 700, icon: "🔧" },
  ],
  homeServices: [
    { id: "glass-polish", label: "Glass Polishing", price: 500, icon: "🪟" },
    { id: "restroom-sanitize", label: "Restroom Sanitization", price: 400, icon: "🧴" },
    { id: "machinery", label: "Machinery Cleaning", price: 700, icon: "🔧" },
  ],
};

const ALL_SERVICES: Service[] = [
  { id: "1", title: "Plumbing", category: "Home" },
  { id: "2", title: "Painting", category: "Home" },
  { id: "3", title: "Electrician", category: "Home" },
  { id: "4", title: "Floor Cleaning", category: "Apartment" },
  { id: "5", title: "Kitchen Cleaning", category: "Apartment" },
  { id: "6", title: "Washroom Cleaning", category: "Apartment" },
  { id: "7", title: "Office Cleaning", category: "Commercial" },
  { id: "8", title: "Villa Cleaning", category: "Commercial" },
  { id: "9", title: "Pool Cleaning", category: "Commercial" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_PRICE = 80;
const EXTRA_HOUR_PRICE = 30;
const FLOOR_AREA_RATE = 0.05;

const formatMoney = (n: number) => `₹${n.toFixed(0)}`;

async function reverseGeocode(lat: number, lon: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    { headers: { "User-Agent": "BookCleaningWeb/1.0" } }
  );
  const data = await res.json();
  return data?.display_name || "Address not found";
}

/* ================= COMPONENT ================= */
const BookCleaningScreenWeb: React.FC<Props> = ({
  selectedServices,
  consultationCharge,
  serviceContext,
  meta,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 400);
  };

  /* ---------- SERVICES ---------- */
  const [services, setServices] = useState<Service[]>(() => {
    if (!selectedServices || selectedServices.length === 0) return [];
    if (typeof selectedServices[0] === "object") {
      return (selectedServices as any[]).map((s) => ({
        id: s.id,
        title: s.title,
        price: s.price,
        category: "homeServices",
      }));
    }
    return (selectedServices as string[]).map((title, idx) => ({
      id: `custom-${idx}`,
      title,
      category: "Custom",
    }));
  });

  const mainService = services[0];
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  const remainingServices = useMemo(
    () => ALL_SERVICES.filter((s) => !services.some((x) => x.id === s.id)),
    [services]
  );

  /* ---------- LOCATION ---------- */
  const [locationType, setLocationType] = useState<"default" | "other">("default");
  const [currentAddress, setCurrentAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
const [chosenProfessional, setChosenProfessional] = useState<any>(null);


  const getCurrentLocation = async () => {
    if (!navigator.geolocation) return;
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const addr = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        setCurrentAddress(addr);
        setLoadingLocation(false);
      },
      () => {
        setCurrentAddress("Unable to detect location");
        setLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    if (locationType === "default") getCurrentLocation();
  }, [locationType]);

  /* ---------- ALLOCATION ---------- */
  const [allocationType, setAllocationType] = useState<"auto" | "manual" | null>(
    serviceContext === "vehicle" ? null : "auto"
  );

  /* ---------- JOB DETAILS ---------- */
  const [floorArea, setFloorArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [extraHours, setExtraHours] = useState(0);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [manualAddress, setManualAddress] = useState("");

  /* ---------- IMAGES ---------- */
  const [images, setImages] = useState<File[]>([]);
  const imageUrls = useMemo(() => images.map((f) => URL.createObjectURL(f)), [images]);

  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handlePickImages = (files: FileList | null) => {
    if (!files) return;
    setImages((prev) => [...prev, ...Array.from(files)]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- PRICING ---------- */
  const floorAreaCost = floorArea ? Number(floorArea) * FLOOR_AREA_RATE : 0;
  const addonsCost = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const extraHoursCost = extraHours * EXTRA_HOUR_PRICE;

  const resolveServiceId = () => {
    if (serviceContext === "home") return 1;
    if (serviceContext === "vehicle") return 2;
    if (serviceContext === "commercial") return 3;
    if (serviceContext === "homeServices") return 4;
    return 0;
  };

  const totalPrice =
    serviceContext === "vehicle" || serviceContext === "homeServices"
      ? consultationCharge
      : BASE_PRICE + addonsCost + floorAreaCost + extraHoursCost + consultationCharge;

  const addService = (id: string) => {
    const s = remainingServices.find((x) => x.id === id);
    if (s) setServices((prev) => [...prev, s]);
  };

  const removeService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  console.log("Selected Addons:", addService, removeService);

  const validateAndCheckout = async () => {
    if (extraHours > 0 && !reason.trim()) {
      setReasonError(true);
      return;
    }
    try {
      await createBooking();
      setShowPaymentModal(true);
    } catch {
      alert("Failed to create booking. Try again.");
    }
  };
  console.log(validateAndCheckout)

  const selectedEmployee = serviceContext === "vehicle" ? meta?.employee : null;
  const vehicleSubServices = serviceContext === "vehicle" ? meta?.subServices || [] : [];

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const closeAll = () => {
    setShowPaymentModal(false);
    handleClose();
  };

  const buildBookingPayload = () => {
    return {
      module_id: serviceContext === "vehicle" ? 2 : 1,
      sub_module_id: 1,
      service_id: resolveServiceId(),
      sub_service_id: selectedAddons.length > 0 ? 1 : 0,
      full_name: customerName || "Guest User",
      email: "user@example.com",
      mobile:
        contactNumber && /^[6-9]\d{9}$/.test(contactNumber)
          ? contactNumber
          : "9876543210",
      address: locationType === "default" ? currentAddress : manualAddress,
      others_address: manualAddress || "",
      latitude: meta?.latitude || 0,
      longitude: meta?.longitude || 0,
      service_type_id: serviceContext === "vehicle" ? 2 : 1,
      issue_id: extraHours > 0 ? 1 : 0,
      problem_description: reason || "",
      property_size_sqft: floorArea || "",
      duration_id: extraHours || 1,
      preferred_date: date,
      time_slot_id: time ? parseInt(time.replace(":", "")) : 0,
      payment_type_id: 1,
      service_price: totalPrice,
      payment_done: false,
    };
  };

  const createBooking = async () => {
    const payload = buildBookingPayload();
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/master/home-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Booking failed");
      return await res.json();
    } catch (err) {
      console.error("Booking Error:", err);
      throw err;
    }
  };
const AVAILABLE_PROFESSIONALS = [
  {
    id: 1,
    name: "Ramesh Kumar",
    rating: 4.8,
    experience: "5 yrs",
  },
  {
    id: 2,
    name: "Suresh Patel",
    rating: 4.6,
    experience: "4 yrs",
  },
  {
    id: 3,
    name: "Anil Sharma",
    rating: 4.9,
    experience: "6 yrs",
  },
];

  /* ================= RENDER ================= */
  return (
    <div className={`uc_overlay ${isVisible ? "uc_overlay--visible" : ""} ${isClosing ? "uc_overlay--closing" : ""}`}>
      <div className={`uc_modal ${isVisible ? "uc_modal--visible" : ""} ${isClosing ? "uc_modal--closing" : ""}`} ref={containerRef}>
        {/* HEADER */}
        <header className="uc_header">
          <button className="uc_backBtn" onClick={handleClose}>
            <MdArrowBack size={20} />
          </button>
          <div className="uc_headerContent">
            <h1 className="uc_title">Book Service</h1>
            <p className="uc_subtitle">{mainService?.title || "Cleaning Service"}</p>
          </div>
          <button className="uc_closeBtn" onClick={handleClose}>
            <MdClose size={20} />
          </button>
        </header>

        {/* PROGRESS INDICATOR */}
        <div className="uc_progress">
          <div className="uc_progressBar">
            <div className="uc_progressFill" style={{ width: "33%" }}></div>
          </div>
          <span className="uc_progressText">Step 1 of 3</span>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="uc_content">
          {/* SERVICE CARD */}
          <div className="uc_serviceCard">
            <div className="uc_serviceIcon">
              {serviceContext === "vehicle" ? "🚗" : serviceContext === "commercial" ? "🏢" : "🏠"}
            </div>
            <div className="uc_serviceInfo">
              <h3>{mainService?.title}</h3>
              <div className="uc_serviceRating">
                <MdStar className="uc_starIcon" />
                <span>4.8</span>
                <span className="uc_ratingCount">(2.5k bookings)</span>
              </div>
            </div>
            <div className="uc_servicePrice">
              {formatMoney(totalPrice)}
            </div>
          </div>

          {/* LOCATION SECTION */}
          <section className="uc_section">
            <div className="uc_sectionHeader">
              <MdLocationOn className="uc_sectionIcon" />
              <h2>Service Location</h2>
            </div>

            <div className="uc_locationToggle">
              <button
                className={`uc_toggleBtn ${locationType === "default" ? "uc_toggleBtn--active" : ""}`}
                onClick={() => setLocationType("default")}
              >
                <MdLocationOn size={18} />
                Current Location
              </button>
              <button
                className={`uc_toggleBtn ${locationType === "other" ? "uc_toggleBtn--active" : ""}`}
                onClick={() => setLocationType("other")}
              >
                <MdAdd size={18} />
                Add New
              </button>
            </div>

            {locationType === "default" && (
              <div className="uc_locationCard">
                <div className="uc_locationPulse"></div>
                <p className="uc_locationText">
                  {loadingLocation ? "📍 Detecting your location..." : currentAddress}
                </p>
              </div>
            )}

            {locationType === "other" && (
              <div className="uc_formGroup uc_formGroup--stagger">
                <div className="uc_inputWrapper">
                  <MdPerson className="uc_inputIcon" />
                  <input
                    className="uc_input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>

                <div className="uc_inputWrapper">
                  <MdPhone className="uc_inputIcon" />
                  <input
                    className="uc_input"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Mobile Number"
                    type="tel"
                  />
                </div>

                <div className="uc_inputWrapper uc_inputWrapper--textarea">
                  <MdLocationOn className="uc_inputIcon" />
                  <textarea
                    className="uc_textarea"
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder="Complete Address (Building, Street, Landmark)"
                  />
                </div>
              </div>
            )}
          </section>

          {/* ALLOCATION SECTION */}
          {serviceContext !== "vehicle" && (
            <section className="uc_section">
              <div className="uc_sectionHeader">
                <MdPerson className="uc_sectionIcon" />
                <h2>Professional Assignment</h2>
              </div>

              <div className="uc_allocationCards">
                <div
                  className={`uc_allocationCard ${allocationType === "auto" ? "uc_allocationCard--selected" : ""}`}
                  onClick={() => setAllocationType("auto")}
                >
                  <div className="uc_allocationCheck">
                    {allocationType === "auto" && <MdCheckCircle />}
                  </div>
                  <div className="uc_allocationIcon">⚡</div>
                  <h4>Auto Assign</h4>
                  <p>We'll assign the best available professional</p>
                  <span className="uc_badge uc_badge--recommended">Recommended</span>
                </div>

               <div
  className={`uc_allocationCard ${allocationType === "manual" ? "uc_allocationCard--selected" : ""}`}
  onClick={() => {
    setAllocationType("manual");
    setShowProfessionalModal(true);
  }}
>

                  <div className="uc_allocationCheck">
                    {allocationType === "manual" && <MdCheckCircle />}
                  </div>
                  <div className="uc_allocationIcon">👤</div>
                  <h4>Choose Professional</h4>
                  <p>Select from available professionals</p>
                </div>
              </div>
            </section>
          )}

          {/* ASSIGNED PROFESSIONAL (VEHICLE) */}
          {serviceContext === "vehicle" && selectedEmployee && (
            <section className="uc_section">
              <div className="uc_sectionHeader">
                <MdVerified className="uc_sectionIcon" />
                <h2>Assigned Professional</h2>
              </div>
              <div className="uc_professionalCard">
                <div className="uc_professionalAvatar">
                  {selectedEmployee.name?.charAt(0) || "P"}
                </div>
                <div className="uc_professionalInfo">
                  <h4>{selectedEmployee.name}</h4>
                  <div className="uc_professionalRating">
                    <MdStar className="uc_starIcon" />
                    <span>{selectedEmployee.rating}</span>
                    <MdVerified className="uc_verifiedIcon" />
                    <span>Verified Pro</span>
                  </div>
                </div>
              </div>
            </section>
          )}
          {chosenProfessional && (
  <section className="uc_section">
    <div className="uc_sectionHeader">
      <MdVerified className="uc_sectionIcon" />
      <h2>Selected Professional</h2>
    </div>

    <div className="uc_professionalCard">
      <div className="uc_professionalAvatar">
        {chosenProfessional.name.charAt(0)}
      </div>

      <div className="uc_professionalInfo">
        <h4>{chosenProfessional.name}</h4>
        <div className="uc_professionalRating">
          <MdStar className="uc_starIcon" />
          <span>{chosenProfessional.rating}</span>
          <span> • {chosenProfessional.experience}</span>
        </div>
      </div>
    </div>
  </section>
)}

          {/* FLOOR AREA */}
          {serviceContext !== "vehicle" && serviceContext !== "homeServices" && (
            <section className="uc_section">
              <div className="uc_sectionHeader">
                <span className="uc_sectionEmoji">📐</span>
                <h2>Property Size</h2>
              </div>
              <div className="uc_inputWrapper">
                <input
                  className="uc_input uc_input--center"
                  value={floorArea}
                  onChange={(e) => setFloorArea(e.target.value)}
                  placeholder="Enter floor area"
                  type="number"
                />
                <span className="uc_inputSuffix">sq.ft</span>
              </div>
            </section>
          )}

          {/* ADDON SERVICES */}
          {serviceContext !== "vehicle" && serviceContext !== "homeServices" && (
            <section className="uc_section">
              <div className="uc_sectionHeader">
                <span className="uc_sectionEmoji">✨</span>
                <h2>Add Extra Services</h2>
              </div>

              <div className="uc_addonGrid">
                {ADDONS_BY_TYPE[serviceContext].map((addon, index) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      className={`uc_addonCard ${isChecked ? "uc_addonCard--selected" : ""}`}
                      onClick={() => toggleAddon(addon)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="uc_addonCheck">
                        {isChecked && <MdCheckCircle />}
                      </div>
                      <div className="uc_addonEmoji">{addon.icon}</div>
                      <h4>{addon.label}</h4>
                      <span className="uc_addonPrice">{formatMoney(addon.price)}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* DATE & TIME */}
          <section className="uc_section">
            <div className="uc_sectionHeader">
              <MdCalendarToday className="uc_sectionIcon" />
              <h2>Schedule Service</h2>
            </div>

            <div className="uc_dateTimeGrid">
              <div className="uc_inputWrapper uc_inputWrapper--icon">
                <MdCalendarToday className="uc_inputIcon" />
                <input
                  className="uc_input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="uc_inputWrapper uc_inputWrapper--icon">
                <MdAccessTime className="uc_inputIcon" />
                <input
                  className="uc_input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* EXTRA HOURS */}
          <section className="uc_section">
            <div className="uc_sectionHeader">
              <MdAccessTime className="uc_sectionIcon" />
              <h2>Extra Working Hours</h2>
            </div>

            <div className="uc_counterWrapper">
              <button
                className="uc_counterBtn uc_counterBtn--minus"
                onClick={() => setExtraHours((v) => Math.max(0, v - 1))}
              >
                <MdRemove />
              </button>
              <div className="uc_counterValue">
                <span className="uc_counterNumber">{extraHours}</span>
                <span className="uc_counterLabel">hour{extraHours !== 1 ? "s" : ""}</span>
              </div>
              <button
                className="uc_counterBtn uc_counterBtn--plus"
                onClick={() => setExtraHours((v) => v + 1)}
              >
                <MdAdd />
              </button>
            </div>

            {extraHours > 0 && (
              <div className="uc_inputWrapper uc_inputWrapper--textarea uc_fadeIn">
                <textarea
                  className={`uc_textarea ${reasonError ? "uc_textarea--error" : ""}`}
                  placeholder="Why do you need extra hours? (Required)"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setReasonError(false);
                  }}
                />
              </div>
            )}
          </section>

          {/* PHOTO UPLOAD */}
          <section className="uc_section">
            <div className="uc_sectionHeader">
              <MdPhotoCamera className="uc_sectionIcon" />
              <h2>Upload Photos</h2>
              <span className="uc_optional">Optional</span>
            </div>

            <div className="uc_uploadGrid">
              <label className="uc_uploadCard">
                <MdPhotoCamera size={28} />
                <span>Take Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={(e) => handlePickImages(e.target.files)}
                />
              </label>

              <label className="uc_uploadCard">
                <MdPhotoLibrary size={28} />
                <span>Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => handlePickImages(e.target.files)}
                />
              </label>
            </div>

            {imageUrls.length > 0 && (
              <div className="uc_photoPreviewGrid">
                {imageUrls.map((src, i) => (
                  <div key={i} className="uc_photoPreview">
                    <img src={src} alt="Uploaded" />
                    <button className="uc_photoRemove" onClick={() => removeImage(i)}>
                      <MdClose size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SUMMARY */}
          <section className="uc_section uc_summarySection">
            <div className="uc_sectionHeader">
              <MdShoppingBag className="uc_sectionIcon" />
              <h2>Booking Summary</h2>
            </div>

            <div className="uc_summaryCard">
              <div className="uc_summaryRow">
                <span>Main Service</span>
                <span className="uc_summaryService">{mainService?.title}</span>
              </div>

              {serviceContext === "vehicle" && vehicleSubServices.length > 0 && (
                <>
                  <div className="uc_summaryDivider"></div>
                  <p className="uc_summarySubtitle">Included Services</p>
                  {vehicleSubServices.map((s: any) => (
                    <div key={s.id} className="uc_summaryRow uc_summaryRow--sub">
                      <span>{s.name}</span>
                      <span>{formatMoney(s.price)}</span>
                    </div>
                  ))}
                </>
              )}

              {serviceContext !== "vehicle" && (
                <>
                  {selectedAddons.map((a) => (
                    <div key={a.id} className="uc_summaryRow uc_summaryRow--addon">
                      <span>{a.label}</span>
                      <span>{formatMoney(a.price)}</span>
                    </div>
                  ))}

                  {floorAreaCost > 0 && (
                    <div className="uc_summaryRow">
                      <span>Floor Area ({floorArea} sq.ft)</span>
                      <span>{formatMoney(floorAreaCost)}</span>
                    </div>
                  )}

                  {extraHoursCost > 0 && (
                    <div className="uc_summaryRow">
                      <span>Extra Hours ({extraHours}h)</span>
                      <span>{formatMoney(extraHoursCost)}</span>
                    </div>
                  )}

                  <div className="uc_summaryRow">
                    <span>Service Fee</span>
                    <span>{formatMoney(consultationCharge)}</span>
                  </div>
                </>
              )}

              <div className="uc_summaryDivider"></div>

              <div className="uc_summaryRow uc_summaryRow--total">
                <span>Total Amount</span>
                <span className="uc_totalPrice">{formatMoney(totalPrice)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM CTA */}
        <div className="uc_bottomBar">
          <div className="uc_bottomPrice">
            <span className="uc_bottomPriceLabel">Total</span>
            <span className="uc_bottomPriceValue">{formatMoney(totalPrice)}</span>
          </div>
          <button className="uc_ctaBtn" onClick={() => setShowPaymentModal(true)}>
            <MdShoppingBag />
            <span>Proceed to Pay</span>
          </button>
        </div>

        {/* PAYMENT MODAL */}
        {showPaymentModal && (
          <div className="uc_paymentOverlay" onClick={() => setShowPaymentModal(false)}>
            <div className="uc_paymentModal" onClick={(e) => e.stopPropagation()}>
              <PaymentScreenWeb
                totalAmount={totalPrice}
                onClose={closeAll}
                bookingDetails={{
                  serviceName: mainService?.title,
                  date,
                  time,
                  address: locationType === "default" ? currentAddress : manualAddress,
                }}
                allocatedEmployee={null}
              />
            </div>
          </div>
        )}
        {showProfessionalModal && (
  <div
    className="uc_paymentOverlay"
    onClick={() => setShowProfessionalModal(false)}
  >
    <div
      className="uc_paymentModal"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="uc_header">
        <h2>Select a Professional</h2>
        <button
          className="uc_closeBtn"
          onClick={() => setShowProfessionalModal(false)}
        >
          <MdClose />
        </button>
      </header>

      <div className="uc_professionalList">
        {AVAILABLE_PROFESSIONALS.map((pro) => (
          <div
            key={pro.id}
            className="uc_professionalCard uc_professionalSelectable"
            onClick={() => {
              setChosenProfessional(pro);
              setShowProfessionalModal(false);
            }}
          >
            <div className="uc_professionalAvatar">
              {pro.name.charAt(0)}
            </div>

            <div className="uc_professionalInfo">
              <h4>{pro.name}</h4>
              <div className="uc_professionalRating">
                <MdStar className="uc_starIcon" />
                <span>{pro.rating}</span>
                <span> • {pro.experience}</span>
              </div>
            </div>

            <MdCheckCircle className="uc_selectIcon" />
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default BookCleaningScreenWeb;
