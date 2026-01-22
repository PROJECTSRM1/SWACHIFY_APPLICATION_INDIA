import React, { useMemo, useState, useEffect } from "react";
import "./healthcare.css";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  category: string;          // NEW
  conditions: string[];      // NEW
  rating: number;
  availability: string;
  price: string;
  image: string;
};


const doctors: Doctor[] = [
  // ================= HEART (Cardiologists) =================
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    speciality: "CARDIOLOGIST",
    category: "Heart",
    conditions: ["heart pain", "bp", "cholesterol"],
    rating: 4.9,
    availability: "2:00 PM",
    price: "$120/hr",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Dr. Kevin Moore",
    speciality: "CARDIOLOGIST",
    category: "Heart",
    conditions: ["chest pain", "angioplasty"],
    rating: 4.8,
    availability: "5:00 PM",
    price: "$140/hr",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Dr. Neha Sharma",
    speciality: "CARDIOLOGIST",
    category: "Heart",
    conditions: ["ECG", "high bp", "heart checkup"],
    rating: 4.7,
    availability: "7:15 PM",
    price: "$110/hr",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Dr. Arvind Mehta",
    speciality: "CARDIOLOGIST",
    category: "Heart",
    conditions: ["pulse issues", "bp", "cholesterol"],
    rating: 4.6,
    availability: "Tomorrow 10:30 AM",
    price: "$115/hr",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Dr. Priya Reddy",
    speciality: "CARDIOLOGIST",
    category: "Heart",
    conditions: ["heart burn", "chest pressure", "ECG"],
    rating: 4.8,
    availability: "Today 8:00 PM",
    price: "$125/hr",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80",
  },

  // ================= SKIN (Dermatologists) =================
  {
    id: 6,
    name: "Dr. Marcus Chen",
    speciality: "DERMATOLOGIST",
    category: "Skin",
    conditions: ["acne", "eczema", "rash"],
    rating: 4.8,
    availability: "4:30 PM",
    price: "$95/hr",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Dr. Priya Nair",
    speciality: "DERMATOLOGIST",
    category: "Skin",
    conditions: ["hair fall", "pigmentation"],
    rating: 4.7,
    availability: "1:00 PM",
    price: "$100/hr",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Dr. Ananya Rao",
    speciality: "DERMATOLOGIST",
    category: "Skin",
    conditions: ["skin rash", "itching", "dark spots"],
    rating: 4.8,
    availability: "Tomorrow 3:30 PM",
    price: "$92/hr",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Dr. Arjun Reddy",
    speciality: "DERMATOLOGIST",
    category: "Skin",
    conditions: ["fungal infection", "allergy", "psoriasis"],
    rating: 4.6,
    availability: "Today 8:30 PM",
    price: "$90/hr",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Dr. Meera Iyer",
    speciality: "DERMATOLOGIST",
    category: "Skin",
    conditions: ["eczema", "skin peeling", "redness"],
    rating: 4.7,
    availability: "Tomorrow 1:15 PM",
    price: "$98/hr",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=800&q=80",
  },

  // ================= MENTAL (Mental Health) =================
  {
    id: 11,
    name: "Dr. Aaron Patel",
    speciality: "PSYCHIATRIST",
    category: "Mental",
    conditions: ["anxiety", "depression"],
    rating: 4.7,
    availability: "6:00 PM",
    price: "$130/hr",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Dr. Aisha Khan",
    speciality: "PSYCHOLOGIST",
    category: "Mental",
    conditions: ["stress", "panic attack", "sleep issues"],
    rating: 4.8,
    availability: "Tomorrow 10:00 AM",
    price: "$125/hr",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    name: "Dr. Pooja Kulkarni",
    speciality: "PSYCHIATRIST",
    category: "Mental",
    conditions: ["depression", "anxiety", "mood swings"],
    rating: 4.9,
    availability: "Tomorrow 7:15 PM",
    price: "$135/hr",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    name: "Dr. Olivia Green",
    speciality: "PSYCHOLOGIST",
    category: "Mental",
    conditions: ["therapy", "stress", "anger"],
    rating: 4.7,
    availability: "Today 9:00 PM",
    price: "$120/hr",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    name: "Dr. Daniel Thomas",
    speciality: "PSYCHIATRIST",
    category: "Mental",
    conditions: ["sleep issues", "panic", "mental health"],
    rating: 4.6,
    availability: "Tomorrow 4:45 PM",
    price: "$128/hr",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
  },

  // ================= EYES (Ophthalmologists) =================
  {
    id: 16,
    name: "Dr. Sophia Lee",
    speciality: "OPHTHALMOLOGIST",
    category: "Eyes",
    conditions: ["vision", "eye pain"],
    rating: 4.6,
    availability: "Tomorrow",
    price: "$100/hr",
    image: "https://images.unsplash.com/photo-1579154203451-0d2d83d2f4a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 17,
    name: "Dr. Varun Mehta",
    speciality: "OPHTHALMOLOGIST",
    category: "Eyes",
    conditions: ["eye dryness", "blur vision", "eye redness"],
    rating: 4.7,
    availability: "Today 6:15 PM",
    price: "$105/hr",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    name: "Dr. Kavita Singh",
    speciality: "OPHTHALMOLOGIST",
    category: "Eyes",
    conditions: ["glasses", "eye infection", "eye pain"],
    rating: 4.8,
    availability: "Today 5:45 PM",
    price: "$98/hr",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  },

  // ================= BONES (Orthopedics) =================
  {
    id: 21,
    name: "Dr. John Williams",
    speciality: "ORTHOPEDIC",
    category: "Bones",
    conditions: ["joint pain", "fracture"],
    rating: 4.8,
    availability: "3:00 PM",
    price: "$150/hr",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 22,
    name: "Dr. Kavya Iyer",
    speciality: "ORTHOPEDIC",
    category: "Bones",
    conditions: ["back pain", "knee pain", "sports injury"],
    rating: 4.9,
    availability: "Tomorrow 12:30 PM",
    price: "$155/hr",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },

  // ================= CHILD (Pediatricians) =================
  {
    id: 26,
    name: "Dr. Emma Wilson",
    speciality: "PEDIATRICIAN",
    category: "Child",
    conditions: ["child fever", "vaccination"],
    rating: 4.9,
    availability: "11:00 AM",
    price: "$90/hr",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 27,
    name: "Dr. Rahul Verma",
    speciality: "PEDIATRICIAN",
    category: "Child",
    conditions: ["cold", "fever", "stomach pain"],
    rating: 4.8,
    availability: "Today 4:00 PM",
    price: "$95/hr",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  },

  // ================= DENTAL (Dentists) =================
  {
    id: 31,
    name: "Dr. Robert Brown",
    speciality: "DENTIST",
    category: "Dental",
    conditions: ["tooth pain", "gum bleeding"],
    rating: 4.6,
    availability: "1:00 PM",
    price: "$80/hr",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 35,
    name: "Dr. Aditya Menon",
    speciality: "DENTIST",
    category: "Dental",
    conditions: ["root canal", "cavity", "gum swelling"],
    rating: 4.9,
    availability: "Today 8:40 PM",
    price: "$92/hr",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
  },

  Cardiologist: {
    id: 2,
    name: "Dr. Sarah Miles",
    experience: "12 years experience",
    rating: 4.9,
    availableAt: "Available at 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },

  Dermatologist: {
    id: 3,
    name: "Dr. Marcus Lee",
    experience: "7 years experience",
    rating: 4.7,
    availableAt: "Available at 5:15 PM",
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f2d1?auto=format&fit=crop&w=1200&q=80",
  },

  Neurologist: {
    id: 4,
    name: "Dr. Elena Carter",
    experience: "10 years experience",
    rating: 4.8,
    availableAt: "Available at 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1582719478185-2f7b6a7a52c0?auto=format&fit=crop&w=1200&q=80",
  },

  Orthopedic: {
    id: 5,
    name: "Dr. Jason Reed",
    experience: "11 years experience",
    rating: 4.9,
    availableAt: "Available at 4:10 PM",
    image:
      "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?auto=format&fit=crop&w=1200&q=80",
  },

  Pediatrician: {
    id: 6,
    name: "Dr. Emma Wilson",
    experience: "8 years experience",
    rating: 4.8,
    availableAt: "Available at 12:45 PM",
    image:
      "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1200&q=80",
  },

  Dentist: {
    id: 7,
    name: "Dr. Ryan Cooper",
    experience: "6 years experience",
    rating: 4.7,
    availableAt: "Available at 2:20 PM",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  },

  Psychologist: {
    id: 8,
    name: "Dr. Olivia Green",
    experience: "9 years experience",
    rating: 4.8,
    availableAt: "Available at 7:30 PM",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=1200&q=80",
  },

  // ✅ EXTRA SPECIALISTS (MORE LIST)
  ENT: {
    id: 9,
    name: "Dr. Rahul Mehta",
    experience: "10 years experience",
    rating: 4.7,
    availableAt: "Available at 11:10 AM",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
  },

  Gynecologist: {
    id: 10,
    name: "Dr. Ananya Rao",
    experience: "13 years experience",
    rating: 4.9,
    availableAt: "Available at 2:50 PM",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
  },

  Diabetologist: {
    id: 11,
    name: "Dr. Suresh Naidu",
    experience: "8 years experience",
    rating: 4.6,
    availableAt: "Available at 6:40 PM",
    image:
      "https://images.unsplash.com/photo-1584467735871-0b1d5f9b6d42?auto=format&fit=crop&w=1200&q=80",
  },

  Gastroenterologist: {
    id: 12,
    name: "Dr. Vikram Singh",
    experience: "14 years experience",
    rating: 4.8,
    availableAt: "Available at 5:05 PM",
    image:
      "https://images.unsplash.com/photo-1579154203451-0d2d83d2f4a2?auto=format&fit=crop&w=1200&q=80",
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
const ambulanceHospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    type: "MULTI-SPECIALITY",
    location: "Jubilee Hills, Hyderabad",
    distance: "2.3 km away • 8 mins arrival",
    available: "3 ambulances available",
    phone: "+91-40-23607777",
  },
  {
    id: 2,
    name: "Care Hospital",
    type: "MULTI-SPECIALITY",
    location: "Banjara Hills, Hyderabad",
    distance: "3.1 km away • 12 mins arrival",
    available: "2 ambulances available",
    phone: "+91-40-61656565",
  },
  {
    id: 3,
    name: "Yashoda Hospitals",
    type: "MULTI-SPECIALITY",
    location: "Somajiguda, Hyderabad",
    distance: "4.4 km away • 15 mins arrival",
    available: "4 ambulances available",
    phone: "+91-40-45674567",
  },
  {
    id: 4,
    name: "KIMS Hospital",
    type: "MULTI-SPECIALITY",
    location: "Secunderabad, Hyderabad",
    distance: "5.2 km away • 18 mins arrival",
    available: "2 ambulances available",
    phone: "+91-40-44885000",
  },
];


const HealthCare: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [openConsultation, setOpenConsultation] = useState<boolean>(false);

  // form states
  const [doctorSpecialized, setDoctorSpecialized] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [insurance, setInsurance] = useState<"yes" | "no" | "">("");

  const [openDoctorProfile, setOpenDoctorProfile] = useState(false);

  const [openAmbulancePopup, setOpenAmbulancePopup] = useState(false);

  const [openAmbulanceScreen, setOpenAmbulanceScreen] = useState(false);



  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Sarah Jenkins",
    speciality: "CARDIOLOGIST",
    hospital: "City Heart Care",
    experience: "12 Years",
    contact: "+91 98765 43210",
    opTime: "10:00 AM - 01:00 PM",
  });

  const [editOpTime, setEditOpTime] = useState(false);
  const [newOpTime, setNewOpTime] = useState(doctorProfile.opTime);


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

  const filteredDoctors = useMemo(() => {
    const q = searchText.toLowerCase();

    return doctors.filter((doc) => {
      const matchesCategory =
        activeCategory === "All" || doc.category === activeCategory;

      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.conditions.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchText, activeCategory]);



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
          {/* Profile Icon */}
          <button
            type="button"
            className="banner-profile-btn"
            onClick={() => setOpenDoctorProfile(true)}
          >
            👤
          </button>

          {/* Plus Icon */}
          <button type="button" className="banner-plus-btn">
            ➕
          </button>
        </div>



      </div>

      {/* Search */}
      <div className="healthcare-search">
        <input
          type="text"
          placeholder="Search doctor, specialty, or condition"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

      </div>

      {/* Categories */}
      <div className="healthcare-cards">
        {/* SEE ALL CARD */}
        <div
          className={`healthcare-card ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => setActiveCategory("All")}
        >
          <span>📌</span>
          <p>See All</p>
        </div>

        {[
          { label: "Heart", icon: "❤️" },
          { label: "Skin", icon: "🩹" },
          { label: "Mental", icon: "🧠" },
          { label: "Eyes", icon: "👁️" },
          { label: "Bones", icon: "🦴" },
          { label: "Child", icon: "👶" },
          { label: "Dental", icon: "🦷" },
        ].map((c) => (
          <div
            key={c.label}
            className={`healthcare-card ${activeCategory === c.label ? "active" : ""}`}
            onClick={() => setActiveCategory(c.label)}
          >
            <span>{c.icon}</span>
            <p>{c.label}</p>
          </div>
        ))}
      </div>
      {/* Categories */}
      <div className="healthcare-cards"> ... </div>

      {/* ✅ Emergency Ambulance Card (ADD THIS) */}
      <div className="emergency-card">
        <div className="emergency-left">
          <div className="emergency-icon-wrap">
            <div className="emergency-icon">✚</div>
          </div>

          <div className="emergency-text">
            <h4>Emergency</h4>
            <h3>Ambulance</h3>
            <p>Available 24/7 for urgent care</p>
          </div>
        </div>

        <button
          type="button"
          className="emergency-btn"
          onClick={() => setOpenAmbulanceScreen(true)}
        >
          Book Now →
        </button>

      </div>



      {/* Available Doctors */}
      <div className="available-doctors-header">
        <h3>Available Doctors</h3>
        <span className="see-all" onClick={() => setActiveCategory("All")}>
          See all
        </span>

      </div>

      <div className="doctor-list grid-view">
        {filteredDoctors.map((doc) => (
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

                {/* ✅ NEW SPECIALISTS */}
                <option value="Orthopedic">Orthopedic</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dentist">Dentist</option>
                <option value="Psychologist">Psychologist</option>
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
      {openDoctorProfile && (
        <div
          className="profile-overlay"
          onClick={() => setOpenDoctorProfile(false)}
        >
          <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header">
              <h2>Doctor Profile</h2>
              <button
                className="profile-close"
                onClick={() => setOpenDoctorProfile(false)}
              >
                ✖
              </button>
            </div>

            <div className="profile-body">
              <p><b>Name:</b> {doctorProfile.name}</p>
              <p><b>Speciality:</b> {doctorProfile.speciality}</p>
              <p><b>Hospital:</b> {doctorProfile.hospital}</p>
              <p><b>Experience:</b> {doctorProfile.experience}</p>
              <p><b>Contact:</b> {doctorProfile.contact}</p>

              <div className="op-time-box">
                <p><b>OP Time:</b></p>

                {!editOpTime ? (
                  <div className="op-time-row">
                    <span className="op-time">{doctorProfile.opTime}</span>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditOpTime(true);
                        setNewOpTime(doctorProfile.opTime);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="op-time-edit">
                    <input
                      type="text"
                      value={newOpTime}
                      onChange={(e) => setNewOpTime(e.target.value)}
                      placeholder="Ex: 10:00 AM - 01:00 PM"
                    />

                    <div className="op-time-actions">
                      <button
                        className="cancel-btn"
                        onClick={() => setEditOpTime(false)}
                      >
                        Cancel
                      </button>

                      <button
                        className="save-btn"
                        onClick={() => {
                          setDoctorProfile((prev) => ({ ...prev, opTime: newOpTime }));
                          setEditOpTime(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {openAmbulancePopup && (
        <div
          className="ambulance-overlay"
          onClick={() => setOpenAmbulancePopup(false)}
        >
          <div className="ambulance-popup" onClick={(e) => e.stopPropagation()}>
            <h2 className="ambulance-title">🚑 Ambulance Booking</h2>
            <p className="ambulance-subtitle">
              Emergency ambulance will reach you within <b>10-15 mins</b>.
            </p>

            <div className="ambulance-actions">
              <button
                className="ambulance-cancel"
                onClick={() => setOpenAmbulancePopup(false)}
              >
                Cancel
              </button>

              <button
                className="ambulance-confirm"
                onClick={() => {
                  setOpenAmbulancePopup(false);
                  alert("✅ Ambulance booked successfully!");
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
      {openAmbulanceScreen && (
        <div className="ambulance-screen">
          {/* Header */}
          <div className="ambulance-header">
            <button
              className="ambulance-back-btn"
              onClick={() => setOpenAmbulanceScreen(false)}
            >
              ←
            </button>
            <h2 className="ambulance-header-title">Book Ambulance</h2>
            <div style={{ width: 42 }} />
          </div>

          {/* Body */}
          <div className="ambulance-body">
            {/* Warning */}
            <div className="ambulance-warning">
              <span className="ambulance-warning-icon">⚠</span>
              <p>
                <b>For life-threatening emergencies, call 108 immediately</b>
              </p>
            </div>

            {/* Hospitals Found */}
            <h3 className="ambulance-found-title">8 hospitals found within 30 km</h3>

            <p className="ambulance-location">📍 Hyderabad, Telangana</p>

            {/* Hospital Cards */}
            <div className="ambulance-hospital-list">
              {ambulanceHospitals.map((h) => (
                <div key={h.id} className="ambulance-hospital-card">
                  <div className="ambulance-hospital-top">
                    <div className="ambulance-hospital-icon-wrap">
                      <div className="ambulance-hospital-icon">✚</div>
                    </div>

                    <div className="ambulance-hospital-info">
                      <h2>{h.name}</h2>
                      <p className="ambulance-hospital-type">{h.type}</p>
                    </div>
                  </div>

                  <div className="ambulance-details">
                    <p>📍 {h.location}</p>
                    <p>🚑 {h.distance}</p>
                    <p>🚐 {h.available}</p>
                    <p>📞 {h.phone}</p>
                  </div>

                  <div className="ambulance-actions-row">
                    <button
                      className="ambulance-call-btn"
                      onClick={() => window.open(`tel:${h.phone.replace(/[^0-9+]/g, "")}`)}
                    >
                      📞 Call
                    </button>

                    <button
                      className="ambulance-book-btn"
                      onClick={() => alert(`✅ Ambulance booked from ${h.name}`)}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



    </div >


  );

};


export default HealthCare;
