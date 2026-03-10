import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Freelancer.css";
type WorkStatus = "WAITING" | "INACTIVE" | "IN_PROGRESS";


interface OrganisationDetails {
  orgName: string;
  gstin: string;
  group: number;
}

interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  skills: string[];
  hourlyRate: number;
  image: string;
   status: WorkStatus; 
  // isActive: boolean;
   inactiveReason?: string;
  isEnrolled: boolean;
    tasksCompleted: number;        
  speciality?: string[];     
   certificates?: string[];    
 
  organisation?: OrganisationDetails;
  cuisineStyle?: "North" | "South";

}

const categories = [
  "All",
  "Chef",
  "Plumber",
  "Cleaner",
  "Electrician",
  "Washer",
];

const serviceProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    service: "Plumber",
    rating: 4.8,
    reviews: 156,
    skills: ["Pipe Fitting", "Drainage"],
    hourlyRate: 350,
        tasksCompleted: 6,
        status: "IN_PROGRESS",

  speciality: [ "Leak Fixing",
    "Bathroom Fittings",
    "Pipeline Repair",
    "Tap Installation",
    "Water Motor Repair",
    "Drain Cleaning",],
    image:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=600",
    // isActive: true,
    isEnrolled: true,
    certificates: ["Plumbing Level 1", "Safety Training"],

  },
  {
    id: "2",
    name: "Lakshmi Devi",
    service: "Cleaner",
    rating: 5.0,
    reviews: 203,
    inactiveReason: "Currently on medical leave",
    skills: ["Deep Cleaning", "Sanitization"],
    hourlyRate: 250,
     tasksCompleted: 18,
     status: "INACTIVE",
// inactiveReason: "Currently on medical leave",

     speciality: [
    "Deep Cleaning",
    "Kitchen Cleaning",
    "Bathroom Cleaning",
    "Sanitization",
    "Sofa Cleaning",
    "Office Cleaning",
  ],
  
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    // isActive: false,
    isEnrolled: true,
    certificates: ["Hygiene & Sanitization"],

  },
  {
    id: "3",
    name: "Suresh Reddy",
    service: "Electrician",
    rating: 4.7,
    reviews: 98,
    skills: ["Wiring", "Repair"],
    hourlyRate: 400,
    status: "WAITING",

    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
    // isActive: true,
    isEnrolled: true,
     tasksCompleted: 6,
  speciality: [   "Wiring",
    "Switch Repair",
    "Fan Installation",
    "Light Fixtures",
    "Inverter Setup",
    "MCB Repair",],
    // organisation: {
    //   orgName: "Sparkle Cleaning Pvt Ltd",
    //   gstin: "29ABCDE1234F1Z5",
    //   group: 10,
    // },
  },
  
  {
    id: "24",
    name: "Manish",
    service: "Chef",
    cuisineStyle: "South",
    rating: 4.9,
    reviews: 88,
    skills: ["Andhra Cuisine", "Meals"],
    hourlyRate: 500,
      tasksCompleted: 6,
      status: "WAITING",

  speciality: [
    "Andhra Meals",
    "Sambar",
    "Rasam",
    "Avakaya Pickle",
    "Vegetarian Thali",
    "Millet Dishes",
  ],
    image:
      "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=600",
    // isActive: true,
    isEnrolled: true,
    certificates: ["Food Safety Certification"],

  },
  {
    id: "25",
    name: "Sajid Khan",
    service: "Washer",
    cuisineStyle: "North",
    rating: 4.8,
    reviews: 112,
    status: "WAITING",

    skills: ["Tandoori", "Mughlai"],
    hourlyRate: 600,
        tasksCompleted: 16,
  speciality: [  "Dry Cleaning",
    "Steam Press",
    "Fabric Care",
    "Stain Removal",
    "Bulk Laundry",
    "Ironing",],
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600",
    // isActive: true,
    isEnrolled: true,
  },
    {
    id: "26",
    name: "Anjali Rao",
    service: "Chef",
    cuisineStyle: "South",
    rating: 4.6,
    reviews: 142,
    skills: ["South Indian", "Healthy Meals"],
    hourlyRate: 480,
    tasksCompleted: 22,
    status: "WAITING",
    speciality: [
       "Idli & Dosa",
    "Vegetarian Meals",
    "Sambar",
    "Rasam",
    "Home-style Cooking",
    "Millet Dishes",
    ],
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600",
    isEnrolled: true,
    certificates: ["Food Hygiene Certificate"],
  },

  {
    id: "27",
    name: "Vikram Singh",
    service: "Plumber",
    rating: 4.5,
    reviews: 97,
    skills: ["Leak Detection", "Bathroom Repair"],
    hourlyRate: 360,
    tasksCompleted: 14,
    status: "WAITING",
    speciality: [
      "Leak Fixing",
    "Tap Installation",
    "Pipeline Repair",
    "Drain Cleaning",
    "Bathroom Fittings",
    "Water Motor Repair",
    ],
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600",
    isEnrolled: true,
    certificates: ["Plumbing Safety Training"],
  },

  {
    id: "28",
    name: "Meena Joseph",
    service: "Cleaner",
    rating: 4.9,
    reviews: 211,
    skills: ["Home Cleaning", "Sanitization"],
    hourlyRate: 260,
    tasksCompleted: 31,
    status: "WAITING",
    speciality: [
      "Deep Cleaning",
    "Kitchen Cleaning",
    "Bathroom Cleaning",
    "Sanitization",
    "Sofa Cleaning",
    "Office Cleaning",
    ],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
    isEnrolled: true,
    certificates: ["Professional Cleaning Training"],
  },

  {
    id: "29",
    name: "Rohit Verma",
    service: "Electrician",
    rating: 4.4,
    reviews: 76,
    skills: ["Wiring", "Appliance Repair"],
    hourlyRate: 420,
    tasksCompleted: 12,
    status: "WAITING",
    speciality: [
     "Wiring",
    "Switch Repair",
    "Fan Installation",
    "Light Fixtures",
    "Inverter Setup",
    "MCB Repair",
    ],
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600",
    isEnrolled: true,
    certificates: ["Electrical Safety Certificate"],
  },

  {
    id: "30",
    name: "Aamir Khan",
    service: "Washer",
    rating: 4.7,
    reviews: 134,
    skills: ["Laundry", "Steam Press"],
    hourlyRate: 300,
    tasksCompleted: 19,
    status: "WAITING",
    speciality: [
      "Dry Cleaning",
    "Steam Press",
    "Fabric Care",
    "Stain Removal",
    "Bulk Laundry",
    "Ironing",
    ],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    isEnrolled: true,
    certificates: ["Laundry Operations Training"],
  },

];

const Freelancer: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [chefStyle, setChefStyle] = useState<"North" | "South">("South");

 const filteredProviders = serviceProviders.filter((p) => {
  const matchCategory =
    selectedCategory === "All" || p.service === selectedCategory;

  const matchChef =
    selectedCategory === "Chef" ? p.cuisineStyle === chefStyle : true;

  const matchSearch =
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.skills.some((s) =>
      s.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ✅ FILTER LOGIC (ACTIVE = WAITING)
  const matchActive = showOnlyActive ? p.status === "WAITING" : true;

  return (
    matchCategory &&
    matchChef &&
    matchSearch &&
    matchActive &&
    p.isEnrolled
  );
});


  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <ArrowLeft
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/landing")}
        />
        <h2>Freelancers</h2>
        <span />
      </header>

      {/* Search */}
      <div className="search-row">
        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Search services or names"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
         <button
  className={`filter-btn ${showOnlyActive ? "active" : ""}`}
  onClick={() => setShowOnlyActive((p) => !p)}
  title={
    showOnlyActive
      ? "Show all freelancers"
      : "Show active freelancers"
  }
>
  <Filter size={18} />
</button>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Chef Toggle */}
      {selectedCategory === "Chef" && (
        <div className="chef-toggle">
          <button
            className={chefStyle === "South" ? "active" : ""}
            onClick={() => setChefStyle("South")}
          >
            South Style
          </button>
          <button
            className={chefStyle === "North" ? "active" : ""}
            onClick={() => setChefStyle("North")}
          >
            North Style
          </button>
        </div>
      )}

      {/* Cards */}
      <div className="list">
        {filteredProviders.map((p) => (
          <div
  key={p.id}
className="card"


>

            <div className="card-image">
  <img src={p.image} alt={p.name} />
</div>


            <div className="card-body">
              <div className="card-header">
                <div>
                  <h3>{p.name}</h3>
                  <p className="service">
  Role: <strong>{p.service}</strong>
</p>


<div className={`status ${p.status.toLowerCase()}`}>
  <span />
  {p.status === "WAITING" && "Active (Looking for work)"}
  {p.status === "INACTIVE" && "Inactive (Not logged in)"}
  {p.status === "IN_PROGRESS" && "Work Assigned (In-Progress)"}
</div>
<div className="inactive-reason">
  {p.status === "INACTIVE" && p.inactiveReason ? (
    p.inactiveReason
  ) : (
    <span>&nbsp;</span>
  )}
</div>




                </div>

                <div className="rating">
                  <Star size={14} />
                  {p.rating} ({p.reviews})
                </div>
              </div>

              {p.organisation && (
                <div className="org">
                  <Building2 size={14} />
                  {p.organisation.orgName}
                </div>
              )}

              <div className="skills">
                {p.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
             <div className="meta">
  {p.tasksCompleted} tasks completed
</div>

{p.speciality && p.speciality.length > 0 && (
  <div className="speciality">
    <small>PRO AT</small>
    <div className="skills">
      {p.speciality.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  </div>
)}
<div className="certificates">
  {p.certificates?.length ? (
    <>
      <small>CERTIFICATES</small>
      <div className="skills">
        {p.certificates.map((cert) => (
          <span key={cert}>{cert}</span>
        ))}
      </div>
    </>
  ) : (
    <small>&nbsp;</small> 
  )}
</div>






              <div className="footer">
                <div>
                  <small>STARTING AT</small>
                  <strong>₹{p.hourlyRate}/hr</strong>
                </div>
                <button
  className={`primary ${
    p.status !== "WAITING" ? "disabled-btn" : ""
  }`}
  disabled={p.status !== "WAITING"}
>
  {p.status === "WAITING" ? "Book Now" : "Unavailable"}
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelancer;
