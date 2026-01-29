import React, { useEffect, useMemo, useState } from "react";
import {
  MdArrowBack,
  // MdLocationOn,
  // MdMyLocation,
  // MdCalendarToday,
  // MdAccessTime,
  // MdAdd,
  // MdDelete,
  MdClose,
  // MdVerified,
  // MdStar,
  // MdWarningAmber,
  // MdErrorOutline,
  MdPhotoCamera,
  MdPhotoLibrary,
  MdShoppingBag,
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

// interface Professional {
//   id: string;
//   name: string;
//   role: string;
//   rating: string;
//   distance: string;
//   image?: string;
//   verified?: boolean;
//   mobileNumber: string;
// }


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
};

const ADDONS_BY_TYPE: Record<ServiceContext, Addon[]> = {
  home: [
    { id: "deep-kitchen", label: "Deep Kitchen Cleaning", price: 200 },
    { id: "balcony", label: "Balcony Cleaning", price: 150 },
    { id: "fridge", label: "Fridge Interior Cleaning", price: 120 },
  ],

  vehicle: [
    { id: "engine-bay", label: "Engine Bay Cleaning", price: 350 },
    { id: "dashboard-polish", label: "Dashboard Polishing", price: 180 },
    { id: "underbody", label: "Underbody Wash", price: 250 },
  ],

  commercial: [
    { id: "glass-polish", label: "Glass Polishing", price: 500 },
    { id: "restroom-sanitize", label: "Restroom Sanitization", price: 400 },
    { id: "machinery", label: "Machinery Cleaning", price: 700 },
  ],
   homeServices: [
    { id: "glass-polish", label: "Glass Polishing", price: 500 },
    { id: "restroom-sanitize", label: "Restroom Sanitization", price: 400 },
    { id: "machinery", label: "Machinery Cleaning", price: 700 },
  ],
};



/* ================= CONSTANTS ================= */
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
const extractPropertyType = (services: Service[]) => {
  if (!services.length) return "N/A";

  const title = services[0].title;
  console.log("Extracting property type from title:", title,extractPropertyType);

  // Vehicle Service - CAR (Standard Service)
  if (title.startsWith("Vehicle")) {
    const match = title.match(/-\s*(.*?)\s*\(/);
    return match ? match[1] : "Vehicle";
  }

  // Home / Commercial: Cleaning - 2BHK
  const parts = title.split("-");
  return parts.length > 1 ? parts[1].trim() : title;
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BASE_PRICE = 80;
//const ADDON_PRICE = 25;
const EXTRA_HOUR_PRICE = 30;
const FLOOR_AREA_RATE = 0.05;

/* ================= HELPERS ================= */
const formatMoney = (n: number) => `₹${n.toFixed(2)}`;

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
  /* ---------- SERVICES ---------- */
  const [services, setServices] = useState<Service[]>(() => {
  if (!selectedServices || selectedServices.length === 0) return [];

  // If already Service[]
  if (typeof selectedServices[0] === "object") {
  return (selectedServices as any[]).map((s) => ({
    id: s.id,
    title: s.title,
    price: s.price,
    category: "homeServices",
  }));
}


  // If string-based (Vehicle / Commercial)
  return (selectedServices as string[]).map((title, idx) => ({
    id: `custom-${idx}`,
    title,
    category: "Custom",
  }));
});


  const mainService = services[0];
  // const propertyType = extractPropertyType(services);
  // const addonServices = services.slice(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);


  const remainingServices = useMemo(
    () => ALL_SERVICES.filter((s) => !services.some((x) => x.id === s.id)),
    [services]
  );

  /* ---------- LOCATION ---------- */
  const [locationType, setLocationType] = useState<"default" | "other">("default");
  const [currentAddress, setCurrentAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) return;
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const addr = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude
        );
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
 const [allocationType, setAllocationType] = useState<
  "auto" | "manual" | null
>(
  serviceContext === "vehicle" ? null : "auto"
);


  // const [allocatedEmployee, setAllocatedEmployee] =
  //   useState<Professional | null>(null);

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
  const imageUrls = useMemo(
    () => images.map((f) => URL.createObjectURL(f)),
    [images]
  );
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
 const addonsCost = selectedAddons.reduce(
  (sum, a) => sum + a.price,
  0
);

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
    : BASE_PRICE +
      addonsCost +
      floorAreaCost +
      extraHoursCost +
      consultationCharge;

  /* ---------- ACTIONS ---------- */
  const addService = (id: string) => {
    const s = remainingServices.find((x) => x.id === id);
    if (s) setServices((prev) => [...prev, s]);
  };

  const removeService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };
  console.log("Selected Addons:", addService,removeService);

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

  const selectedEmployee =
  serviceContext === "vehicle" ? meta?.employee : null;

  const vehicleSubServices =
  serviceContext === "vehicle" ? meta?.subServices || [] : [];


  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const closeAll = () => {
  setShowPaymentModal(false); // close payment
  onClose();                 // close booking + everything above
};

  const buildBookingPayload = () => {
  return {
    module_id: serviceContext === "vehicle" ? 2 : 1,
    sub_module_id: 1,

    service_id: resolveServiceId(),
    // sub_service_id: selectedAddons[0]?.id
    //   ? Number(selectedAddons[0].id)
    //   : 0,
    sub_service_id: selectedAddons.length > 0 ? 1 : 0,

    full_name: customerName || "Guest User",
    email: "user@example.com",
   mobile:
  contactNumber && /^[6-9]\d{9}$/.test(contactNumber)
    ? contactNumber
    : "9876543210",


    address:
      locationType === "default" ? currentAddress : manualAddress,

    others_address: manualAddress || "",

    latitude: meta?.latitude || 0,
    longitude: meta?.longitude || 0,

    service_type_id:
      serviceContext === "vehicle" ? 2 : 1,

    issue_id: extraHours > 0 ? 1 : 0,
    problem_description: reason || "",

    property_size_sqft: floorArea || "",

    duration_id: extraHours||1,

    preferred_date: date,
    time_slot_id: time ? parseInt(time.replace(":", "")) : 0,

    payment_type_id: 1, // online
    service_price: totalPrice,
    payment_done: false,
  };
};

const createBooking = async () => {
  const payload = buildBookingPayload();
  const token = localStorage.getItem("accessToken");

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/master/home-service`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      throw new Error("Booking failed");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Booking Error:", err);
    throw err;
  }
};

  /* ================= RENDER ================= */
  return (
    <div className="bc_page">
      {/* HEADER */}
      <header className="bc_header">
        <button className="bc_iconBtn" onClick={closeAll}>
          <MdArrowBack size={22} />
        </button>
        <h1>Book Cleaning</h1>
      </header>

      <div className="bc_container">
        {/* LOCATION */}
        <p className="bc_label">Location</p>
        <select
          className="bc_select"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value as any)}
        >
          <option value="default">Default Location</option>
          <option value="other">Other Location</option>
        </select>

        {locationType === "default" && (
  <div className="bc_detectBox">
    {loadingLocation ? "Detecting..." : currentAddress}
  </div>
)}

{locationType === "other" && (
  <div className="bc_otherLocationFields">
    <p className="bc_label">Customer Name</p>
    <input
      className="bc_input"
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      placeholder="Enter full name"
    />

    <p className="bc_label">Contact Number</p>
    <input
      className="bc_input"
      value={contactNumber}
      onChange={(e) => setContactNumber(e.target.value)}
      placeholder="Enter mobile number"
    />
    <p className="bc_label">Location Details</p>
    <textarea
      className="bc_textarea"
      value={manualAddress}
      onChange={(e) => setManualAddress(e.target.value)}
      placeholder="Street, building, floor, landmark..."
    />
  </div>
)}



        {/* ALLOCATION */}
        {serviceContext !== "vehicle" && (
  <>
    <p className="bc_label">Allocation Type</p>
    <select
      className="bc_select"
      value={allocationType || "auto"}
      onChange={(e) =>
        setAllocationType(e.target.value as "auto" | "manual")
      }
    >
      <option value="auto">Auto Allocation</option>
      <option value="manual">Manual Allocation</option>
    </select>
  </>
)}

       {serviceContext === "vehicle" && selectedEmployee && (
  <>
    <p className="bc_label">Assigned Professional</p>
    <div className="bc_detectBox">
      {selectedEmployee.name} ⭐ {selectedEmployee.rating}
    </div>
  </>
)}


        {/* FLOOR AREA */}
       {serviceContext !== "vehicle" && serviceContext !== "homeServices" && (
  <>
    <p className="bc_label">Floor Area (sqft)</p>
    <input
      className="bc_input"
      value={floorArea}
      onChange={(e) => setFloorArea(e.target.value)}
      placeholder="1400"
    />
  </>
)}

        {/* ADDON SERVICES */}
{serviceContext !== "vehicle" && serviceContext !== "homeServices" && (
  <>
    <p className="bc_label">Additional Services</p>

    <div className="bc_addonList">
      {ADDONS_BY_TYPE[serviceContext].map((addon) => {
        const checked = selectedAddons.some((a) => a.id === addon.id);

        return (
          <label key={addon.id} className="bc_addonCheckbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleAddon(addon)}
            />
            <div className="bc_addonInfo">
              <span className="bc_addonLabel">{addon.label}</span>
              <span className="bc_addonPrice">₹{addon.price}</span>
            </div>
          </label>
        );
      })}
    </div>
  </>
)}




        {/* DATE & TIME */}
        <p className="bc_label">Date</p>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <p className="bc_label">Time</p>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        {/* EXTRA HOURS */}
        <p className="bc_label">Extra Working Hours</p>

<div className="bc_extraHours">
  <button onClick={() => setExtraHours((v) => Math.max(0, v - 1))}>-</button>
  <span>{extraHours} hour(s)</span>
  <button onClick={() => setExtraHours((v) => v + 1)}>+</button>
</div>


        {extraHours > 0 && (
          <textarea
            className={reasonError ? "bc_error" : ""}
            placeholder="Reason for extra hours"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setReasonError(false);
            }}
          />
        )}

        {/* PHOTOS */}
       {/* UPLOAD PHOTOS */}
<p className="bc_label">UPLOAD PHOTOS OF AREA</p>

<div className="bc_photoActions">
  {/* Take Photo */}
  <label className="bc_photoActionCard">
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

  {/* Gallery */}
  <label className="bc_photoActionCard">
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

{/* PREVIEW */}
{imageUrls.length > 0 && (
  <div className="bc_photoGrid">
    {imageUrls.map((src, i) => (
      <div key={i} className="bc_photoPreview">
        <img src={src} alt="Uploaded" />
        <button
          className="bc_removePhoto"
          onClick={() => removeImage(i)}
        >
          <MdClose size={14} />
        </button>
      </div>
    ))}
  </div>
)}


        <div className="bc_photoGrid">
          {imageUrls.map((src, i) => (
            <div key={i} className="bc_photoPreview">
              <img src={src} />
              <button onClick={() => removeImage(i)}>
                <MdClose />
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
       {/* SUMMARY */}
{/* ================= SERVICE SUMMARY ================= */}
<h3>Service Summary</h3>

{/* MAIN SERVICE */}
<p>
  Main Service: <strong>{mainService?.title}</strong>
</p>

{/* VEHICLE FLOW */}
{serviceContext === "vehicle" && (
  <>
    {vehicleSubServices.length > 0 && (
      <>
        <h4>Included Services</h4>
        {vehicleSubServices.map((s: any) => (
          <p key={s.id}>
            {s.name} – ₹{s.price}
          </p>
        ))}
      </>
    )}

    <p>
      Service Charges: <strong>{formatMoney(consultationCharge)}</strong>
    </p>

    <p style={{ marginTop: 8, fontSize: 16 }}>
      <strong>Total Payable: {formatMoney(totalPrice)}</strong>
    </p>
  </>
)}

{/* HOME / COMMERCIAL FLOW */}
{serviceContext !== "vehicle" && (
  <>
    {selectedAddons.map((a) => (
      <p key={a.id}>
        {a.label}: {formatMoney(a.price)}
      </p>
    ))}

    <p>Floor Area: {formatMoney(floorAreaCost)}</p>
    <p>Extra Hours: {formatMoney(extraHoursCost)}</p>
    <p>Consultation: {formatMoney(consultationCharge)}</p>

    <p style={{ marginTop: 8, fontSize: 16 }}>
      <strong>Total Payable: {formatMoney(totalPrice)}</strong>
    </p>
  </>
)}

 


      </div>
      

      {/* CTA */}
      <div className="bc_bottomBar">
        <button className="bc_ctaBtn" onClick={validateAndCheckout}>
          <MdShoppingBag /> Checkout
        </button>
      </div>

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
        totalAmount={totalPrice}
       // onClose={() => setShowPaymentModal(false)}
       onClose={closeAll}
        bookingDetails={{
          serviceName: mainService?.title,
          date,
          time,
          address:
            locationType === "default" ? currentAddress : manualAddress,
        }}
        allocatedEmployee={null}
      />
    </div>
  </div>
)}

    </div>
  );
};

export default BookCleaningScreenWeb;
