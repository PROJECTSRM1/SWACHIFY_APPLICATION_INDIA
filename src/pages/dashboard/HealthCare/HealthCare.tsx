import "./healthcare.css";

/* =========================
   Doctor Static Data
   ========================= */
const doctors = [
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

const HealthCare = () => {
  return (
    <div className="healthcare-wrapper">

      {/* =========================
          Top Banner
         ========================= */}
      <div className="healthcare-banner">
        <div className="healthcare-banner-content">
          <h2>Feeling unwell?</h2>
          <p>Describe your symptoms for a quick recommendation.</p>

          <button className="healthcare-btn">
            Submit your Health Condition
          </button>
        </div>

        <div className="healthcare-banner-icon">
          <span>➕</span>
        </div>
      </div>

      {/* =========================
          Search Bar
         ========================= */}
      <div className="healthcare-search">
        <input
          type="text"
          placeholder="Search doctor, specialty, or condition"
        />
      </div>

      {/* =========================
          Categories
         ========================= */}
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

      {/* =========================
          Available Doctors Header
         ========================= */}
      <div className="available-doctors-header">
        <h3>Available Doctors</h3>
        <span className="see-all">See all</span>
      </div>

      {/* =========================
          Doctor List
         ========================= */}
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
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HealthCare;
