import React, { useMemo, useState, useEffect } from "react";
import "./healthcare.css";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  rating: number;
  availability: string;
  price: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    speciality: "CARDIOLOGIST",
    rating: 4.9,
    availability: "2:00 PM",
    price: "$120/hr",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Dr. Marcus Chen",
    speciality: "DERMATOLOGIST",
    rating: 4.8,
    availability: "4:30 PM",
    price: "$95/hr",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    speciality: "GENERAL PRACTITIONER",
    rating: 5.0,
    availability: "Available Now",
    price: "$110/hr",
    image: "https://i.pravatar.cc/150?img=32",
  },
];

type Specialist = {
  id: number;
  name: string;
  experience: string;
  rating: number;
  availableAt: string;
  image: string;
};

const specialistByType: Record<string, Specialist> = {
  "General Practitioner": {
    id: 1,
    name: "Dr. David Park",
    experience: "9 years experience",
    rating: 4.8,
    availableAt: "Available at 1:30 PM",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1200&auto=format&fit=crop",
  },
  Cardiologist: {
    id: 2,
    name: "Dr. Sarah Miles",
    experience: "12 years experience",
    rating: 4.9,
    availableAt: "Available at 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
  },
  Dermatologist: {
    id: 3,
    name: "Dr. Marcus Lee",
    experience: "7 years experience",
    rating: 4.7,
    availableAt: "Available at 5:15 PM",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop",
  },
  Neurologist: {
    id: 4,
    name: "Dr. Elena Carter",
    experience: "10 years experience",
    rating: 4.8,
    availableAt: "Available at 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop",
  },
};
const pharmacies = [
  {
    id: 1,
    distance: "0.8 km away",
    name: "Wellness Plus Pharmacy",
    type: "RETAIL PHARMACY",
    medicines: "Amoxicillin, Paracetamol, ...",
    rating: 4.9,
    eta: "25 - 40 mins",
    buttonText: "Order Now",
  },
  {
    id: 2,
    distance: "1.5 km away",
    name: "CarePoint Medical Store",
    type: "RETAIL PHARMACY",
    medicines: "Paracetamol, Vitamin C, ...",
    rating: 4.7,
    eta: "30 - 45 mins",
    buttonText: "Order Now",
  },
  {
    id: 3,
    distance: "2.2 km away",
    name: "Apollo Pharmacy",
    type: "CHAIN PHARMACY",
    medicines: "Amoxicillin, Cough Syrup, ...",
    rating: 4.8,
    eta: "20 - 35 mins",
    buttonText: "Order Now",
  },
  {
    id: 4,
    distance: "3.0 km away",
    name: "MediCare Pharmacy",
    type: "RETAIL PHARMACY",
    medicines: "Pain relief, Cold meds, ...",
    rating: 4.6,
    eta: "35 - 55 mins",
    buttonText: "Order Now",
  },
];
const labs = [
  {
    id: 1,
    distance: "1.2 km away",
    name: "City Diagnostic Center",
    type: "DIAGNOSTIC CENTER",
    tests: "CBC, MRI, X-Ray, Thyroid",
    rating: 4.8,
    slot: "Today, 04:30 PM",
    buttonText: "Book Test",
  },
  {
    id: 2,
    distance: "0.5 km away",
    name: "Precision Labs",
    type: "PATHOLOGY LAB",
    tests: "Blood Tests, Glucose, Urine",
    rating: 4.6,
    slot: "Today, 05:15 PM",
    buttonText: "Book Test",
  },
  {
    id: 3,
    distance: "2.8 km away",
    name: "HealthCare Diagnostics",
    type: "DIAGNOSTIC CENTER",
    tests: "Thyroid, CBC, ECG",
    rating: 4.7,
    slot: "Tomorrow, 10:00 AM",
    buttonText: "Book Test",
  },
  {
    id: 4,
    distance: "3.4 km away",
    name: "ThyroCare Lab",
    type: "PATHOLOGY LAB",
    tests: "Thyroid Profile, Vitamin D",
    rating: 4.5,
    slot: "Tomorrow, 11:45 AM",
    buttonText: "Book Test",
  },
];

const HealthCare: React.FC = () => {
  const [openConsultation, setOpenConsultation] = useState<boolean>(false);

  // form states
  const [doctorSpecialized, setDoctorSpecialized] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [insurance, setInsurance] = useState<"yes" | "no" | "">("");

  const selectedSpecialist = specialistByType[doctorSpecialized];

  // select doctor card
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  // payment popup
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  // confirmed screen
  const [openConfirmedScreen, setOpenConfirmedScreen] =
    useState<boolean>(false);

  // success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  // timer (1 minute)
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const canJoinLive = secondsLeft === 0;


  const [openLiveScreen, setOpenLiveScreen] = useState(false);

  const [openPrescription, setOpenPrescription] = useState(false);

  const [openNearbyPharmacies, setOpenNearbyPharmacies] = useState(false);
  const [openNearbyLabs, setOpenNearbyLabs] = useState(false);






  const isFormCompleted = useMemo(() => {
    return (
      doctorSpecialized.trim() !== "" &&
      description.trim() !== "" &&
      days.trim() !== "" &&
      Number(days) > 0 &&
      insurance !== ""
    );
  }, [doctorSpecialized, description, days, insurance]);

  const canBookAppointment = isFormCompleted && selectedDoctorId !== null;

  useEffect(() => {
    setSelectedDoctorId(null);
  }, [doctorSpecialized, description, days, insurance]);

  const [openLabTest, setOpenLabTest] = useState(false);


  useEffect(() => {
    if (!openConfirmedScreen) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [openConfirmedScreen]);

  useEffect(() => {
    if (!openConfirmedScreen) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [openConfirmedScreen]);
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };




  return (
    <div className="healthcare-wrapper">
      {/* Banner */}
      <div className="healthcare-banner">
        <div className="healthcare-banner-content">
          <h2>Feeling unwell?</h2>
          <p>Describe your symptoms for a quick recommendation.</p>

          <button
            type="button"
            className="healthcare-btn"
            onClick={() => setOpenConsultation(true)}
          >
            Submit your Health Condition
          </button>
        </div>

        <div className="healthcare-banner-icon">
          <span>➕</span>
        </div>
      </div>

      {/* Search */}
      <div className="healthcare-search">
        <input
          type="text"
          placeholder="Search doctor, specialty, or condition"
        />
      </div>

      {/* Categories */}
      <div className="healthcare-cards">
        <div className="healthcare-card">
          <span>❤️</span>
          <p>Heart</p>
        </div>

        <div className="healthcare-card">
          <span>🩹</span>
          <p>Skin</p>
        </div>

        <div className="healthcare-card">
          <span>🧠</span>
          <p>Mental</p>
        </div>

        <div className="healthcare-card">
          <span>👁️</span>
          <p>Eyes</p>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="available-doctors-header">
        <h3>Available Doctors</h3>
        <span className="see-all">See all</span>
      </div>

      <div className="doctor-list">
        {doctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <img src={doc.image} alt={doc.name} />

            <div className="doctor-info">
              <div className="doctor-name-rating">
                <h4>{doc.name}</h4>
                <span className="rating">⭐ {doc.rating}</span>
              </div>

              <p className="speciality">{doc.speciality}</p>

              <p className="availability">
                Next available: <span>{doc.availability}</span>
              </p>

              <div className="doctor-footer">
                <span className="price">{doc.price}</span>
                <button type="button" className="book-btn">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN OVERLAY */}
      {openConsultation && (
        <div className="consult-overlay">
          {/* Header */}
          <div className="consult-header">
            <button
              type="button"
              className="consult-back-btn"
              onClick={() => {
                setOpenConsultation(false);
                setOpenPaymentPopup(false);
                setOpenConfirmedScreen(false);
              }}
            >
              ←
            </button>

            <h2 className="consult-title">Consultation Request</h2>

            <button type="button" className="consult-info-btn">
              i
            </button>
          </div>

          {/* Body */}
          <div className="consult-body">
            {/* Doctor Specialized */}
            <div className="consult-field">
              <label className="consult-label">DOCTOR SPECIALIZED</label>
              <select
                className="consult-select"
                value={doctorSpecialized}
                onChange={(e) => setDoctorSpecialized(e.target.value)}
              >
                <option value="">Select Doctor</option>
                <option value="General Practitioner">General Practitioner</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>

            {/* Description */}
            <div className="consult-field">
              <label className="consult-label">DESCRIPTION</label>
              <textarea
                className="consult-textarea"
                placeholder="Describe your symptoms or health concerns in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Days */}
            <div className="consult-field">
              <label className="consult-label">
                HOW MANY DAYS ARE YOU SUFFERING?
              </label>
              <input
                type="number"
                className="consult-input"
                placeholder="Enter number of days (e.g., 3)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>

            {/* Insurance */}
            <div className="consult-field">
              <label className="consult-label">
                DO YOU HAVE HEALTH INSURANCE?
              </label>

              <div className="consult-radio-row">
                <button
                  type="button"
                  className={`insurance-btn ${insurance === "yes" ? "active" : ""
                    }`}
                  onClick={() => setInsurance("yes")}
                >
                  <span className="radio-dot" />
                  Yes
                </button>

                <button
                  type="button"
                  className={`insurance-btn ${insurance === "no" ? "active" : ""
                    }`}
                  onClick={() => setInsurance("no")}
                >
                  <span className="radio-dot" />
                  No
                </button>
              </div>
            </div>

            {/* Specialist card */}
            {isFormCompleted && selectedSpecialist && (
              <>
                <div className="specialists-header">
                  <h3>Specialists</h3>
                  <span className="nearby-pill">1 Nearby</span>
                </div>

                <div
                  className="specialist-card"
                  onClick={() => setSelectedDoctorId(selectedSpecialist.id)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedDoctorId === selectedSpecialist.id
                        ? "2px solid #2f6f6d"
                        : "none",
                  }}
                >
                  <div className="specialist-img-wrap">
                    <img
                      src={selectedSpecialist.image}
                      alt={selectedSpecialist.name}
                    />

                    <div className="specialist-rating-badge">
                      <span className="star">★</span>
                      <span>{selectedSpecialist.rating}</span>
                    </div>
                  </div>

                  <div className="specialist-content">
                    <h4>{selectedSpecialist.name}</h4>
                    <p className="exp">{selectedSpecialist.experience}</p>

                    <p className="time">
                      <span className="clock">🕒</span>
                      {selectedSpecialist.availableAt}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer fixed bottom */}
          <div className="consult-footer">
            <button
              type="button"
              className={`consult-book-btn ${canBookAppointment ? "enabled" : ""
                }`}
              disabled={!canBookAppointment}
              onClick={() => setOpenPaymentPopup(true)}
            >
              Book Appointment
            </button>
          </div>

          {/* Payment popup */}
          {openPaymentPopup && (
            <div
              className="payment-overlay"
              onClick={() => setOpenPaymentPopup(false)}
            >
              <div
                className="payment-popup"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="payment-title">Payment Required</h2>
                <p className="payment-subtitle">
                  Proceed to PhonePe for payment?
                </p>

                <div className="payment-actions">
                  <button
                    type="button"
                    className="payment-cancel"
                    onClick={() => setOpenPaymentPopup(false)}
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    className="payment-pay"
                    onClick={() => {
                      setOpenPaymentPopup(false);

                      setOpenConfirmedScreen(true); // open confirmed screen
                      setShowSuccessPopup(true);    // open success popup also
                      setSecondsLeft(60);           // reset timer to 1 minute
                    }}

                  >
                    PAY NOW
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* Confirmed Screen overlay (MUST be inside consultation overlay) */}
          {openConfirmedScreen && (
            <div className="confirmed-overlay">
              <div className="confirmed-header">
                <button
                  type="button"
                  className="confirmed-back-btn"
                  onClick={() => setOpenConfirmedScreen(false)}
                >
                  ←
                </button>

                <h2 className="confirmed-title">Appointment Confirmed</h2>

                <div style={{ width: 42 }} />
              </div>

              <div className="confirmed-body">
                <div className="confirmed-card">
                  <div className="confirmed-check">✓</div>

                  <h1 className="confirmed-main-title">Appointment Booked!</h1>
                  <p className="confirmed-subtitle">
                    Payment completed successfully
                  </p>

                  <div className="confirmed-doctor-box">
                    <img
                      src={selectedSpecialist?.image}
                      alt={selectedSpecialist?.name}
                      className="confirmed-doctor-img"
                    />

                    <div>
                      <h3 className="confirmed-doctor-name">
                        {selectedSpecialist?.name}
                      </h3>
                      <p className="confirmed-doctor-spec">{doctorSpecialized}</p>
                      <p className="confirmed-doctor-time">
                        🕒 Scheduled at{" "}
                        {selectedSpecialist?.availableAt?.replace(
                          "Available at ",
                          ""
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="confirmed-line" />

                  <p className="confirmed-wait-text">
                    Your consultation will start in:
                  </p>

                  <div className="confirmed-timer">{formatTime(secondsLeft)}</div>

                  <p className="confirmed-footer-text">
                    Please wait while we prepare your session
                  </p>
                </div>
              </div>

              <div className="confirmed-bottom">
                <button
                  type="button"
                  className={`confirmed-wait-btn ${canJoinLive ? "enabled" : ""}`}
                  disabled={!canJoinLive}
                  onClick={() => {
                    if (!canJoinLive) return;
                    setOpenLiveScreen(true);
                  }}
                >
                  {canJoinLive ? "Connect Online Now" : "Please Wait..."}
                </button>
              </div>

              {showSuccessPopup && (
                <div className="success-overlay">
                  <div className="success-popup">
                    <h2 className="success-title">Success</h2>
                    <p className="success-text">
                      Payment completed! Your appointment is booked.
                    </p>

                    <button
                      type="button"
                      className="success-ok"
                      onClick={() => setShowSuccessPopup(false)}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}

            </div>

          )}

          {openLiveScreen && (
            <div className="live-overlay">
              <div className="live-header">
                <button
                  type="button"
                  className="live-back-btn"
                  onClick={() => setOpenLiveScreen(false)}
                >
                  ←
                </button>

                <div className="live-title-wrap">
                  <h2 className="live-title">{selectedSpecialist?.name}</h2>
                  <p className="live-subtitle">
                    <span className="live-dot" /> LIVE CONSULTATION
                  </p>
                </div>

                <div style={{ width: 42 }} />
              </div>

              <div className="live-body">
                <div className="live-video-card">
                  <img
                    className="live-main-img"
                    src={selectedSpecialist?.image}
                    alt="Doctor"
                  />

                  <div className="live-small-preview">
                    <img
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80"
                      alt="User"
                    />
                  </div>

                  <div className="live-controls">
                    <button className="live-control-btn">🎤</button>
                    <button className="live-end-btn">●</button>
                    <button className="live-control-btn">📹</button>
                  </div>
                </div>

                <div className="live-documents">
                  <h2>Medical Documents</h2>
                  <p>View and download your digital records</p>

                  <div
                    className="live-doc-card"
                    onClick={() => setOpenPrescription(!openPrescription)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="live-doc-left">
                      <div className="live-doc-icon">📋</div>
                      <div>
                        <h3>Digital Prescription</h3>
                        <p>2 Medicines prescribed</p>
                      </div>
                    </div>
                    <button className="live-download-btn">⬇</button>
                  </div>

                  {openPrescription && (
                    <div className="prescription-expand">
                      <div className="prescription-title">
                        <span className="prescription-file">📄</span>
                        <h4>OFFICIAL MEDICINE LIST</h4>
                      </div>

                      <div className="medicine-item">
                        <h3>Amoxicillin</h3>
                        <p>500mg - Twice daily</p>
                      </div>

                      <div className="medicine-item">
                        <h3>Paracetamol</h3>
                        <p>650mg - As needed</p>
                      </div>

                      <button
                        className="order-medicine-btn"
                        onClick={() => {
                          setOpenNearbyPharmacies(true); // FULL SCREEN pharmacies
                        }}
                      >
                        👜 Order Medicines Now
                      </button>

                    </div>
                  )}


                  <div
                    className="live-doc-card"
                    onClick={() => setOpenLabTest((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="live-doc-left">
                      <div className="live-doc-icon">🔬</div>
                      <div>
                        <h3>Lab Test Requisition</h3>
                        <p>2 Tests required</p>
                      </div>
                    </div>

                    <button
                      className="live-download-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ⬇
                    </button>
                  </div>

                  {openLabTest && (
                    <div className="lab-expand">
                      <div className="lab-title">
                        <span className="lab-file">📄</span>
                        <h4>REQUIRED LAB PROCEDURES</h4>
                      </div>

                      <div className="lab-item">
                        <h3>Complete Blood Count (CBC)</h3>
                      </div>

                      <div className="lab-item">
                        <h3>Thyroid Profile</h3>
                      </div>

                      <button
                        className="lab-btn"
                        onClick={() => {
                          setOpenNearbyLabs(true); // FULL SCREEN labs
                        }}
                      >
                        📍 Find Nearby Labs
                      </button>

                    </div>
                  )}

                </div>
              </div>
            </div>

          )}
          {openNearbyPharmacies && (
            <div className="nearby-overlay">
              <div className="nearby-header">
                <button
                  type="button"
                  className="nearby-back-btn"
                  onClick={() => setOpenNearbyPharmacies(false)}
                >
                  ←
                </button>
                <h2 className="nearby-title">Nearby Facilities</h2>
                <div style={{ width: 42 }} />
              </div>

              <div className="nearby-tabs">
                <button className="nearby-tab">Nearby Labs</button>
                <button className="nearby-tab active">Pharmacies</button>
              </div>

              <div className="nearby-card">
                <h3>Prescribed Medicines</h3>
                <div className="nearby-medicine-pills">
                  <span>Amoxicillin</span>
                  <span>Paracetamol</span>
                </div>
                <p className="nearby-subtext">Showing facilities matching your results</p>
              </div>

              <div className="nearby-filters">
                <button className="filter-pill active">All</button>
                <button className="filter-pill">Nearby</button>
                <button className="filter-pill">Ratings 4.5+</button>
                <button className="filter-pill">Home Collect</button>
              </div>

              <div className="nearby-search">
                <input placeholder="Search in pharmacies..." />
              </div>

              <div className="nearby-list">
                <div className="nearby-list">
                  {pharmacies.map((item) => (
                    <div key={item.id} className="nearby-item">
                      <p className="distance">📍 {item.distance}</p>

                      <div className="nearby-item-row">
                        <div>
                          <h3>{item.name}</h3>
                          <p className="type">{item.type}</p>
                          <p className="desc">{item.medicines}</p>
                        </div>

                        <div className="rating-badge">⭐ {item.rating}</div>
                      </div>

                      <div className="nearby-bottom-row">
                        <div>
                          <p className="est">ESTIMATED DELIVERY</p>
                          <h4>{item.eta}</h4>
                        </div>

                        <button className="order-btn">{item.buttonText}</button>
                      </div>
                    </div>
                  ))}

                  <button className="map-btn">🗺 View on Map</button>
                </div>
              </div>
            </div>
          )}
          {openNearbyLabs && (
            <div className="nearby-overlay">
              <div className="nearby-header">
                <button
                  type="button"
                  className="nearby-back-btn"
                  onClick={() => setOpenNearbyLabs(false)}
                >
                  ←
                </button>

                <h2 className="nearby-title">Nearby Facilities</h2>
                <div style={{ width: 42 }} />
              </div>

              <div className="nearby-tabs">
                <button className="nearby-tab active">Nearby Labs</button>
                <button className="nearby-tab">Pharmacies</button>
              </div>

              <div className="nearby-card">
                <h3>Required Lab Procedures</h3>

                <div className="nearby-medicine-pills">
                  <span>Complete Blood Count (CBC)</span>
                  <span>Thyroid Profile</span>
                </div>

                <p className="nearby-subtext">Showing facilities matching your results</p>
              </div>

              <div className="nearby-search">
                <input placeholder="Search in labs..." />
              </div>

              <div className="nearby-list">
                {labs.map((item) => (
                  <div key={item.id} className="nearby-item">
                    <p className="distance">📍 {item.distance}</p>

                    <div className="nearby-item-row">
                      <div>
                        <h3>{item.name}</h3>
                        <p className="type">{item.type}</p>
                        <p className="desc">{item.tests}</p>
                      </div>

                      <div className="rating-badge">⭐ {item.rating}</div>
                    </div>

                    <div className="nearby-bottom-row">
                      <div>
                        <p className="est">NEXT AVAILABLE SLOT</p>
                        <h4>{item.slot}</h4>
                      </div>

                      <button className="order-btn">{item.buttonText}</button>
                    </div>
                  </div>
                ))}

                <button className="map-btn">🗺 View on Map</button>
              </div>
            </div>
          )}




        </div>
      )
      }

    </div >

  );
};

export default HealthCare;
