import "./Dashboard.css";
import { useEffect } from "react";


import ConstructionServices from "../building/building";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";
import BuySaleProducts from "./buy&sale/BuySaleProducts";
import HomeServices from "./homeservices/HomeServices";
import ServicesPage from "./homerentals/pages/ServicesPage";

import Education from "./Education/Education";


import { useSearchParams, useLocation, Outlet } from "react-router-dom";




const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();

const userServiceIds: number[] = (JSON.parse(localStorage.getItem("service_ids") || "[]") as (string | number)[])
  .map(id => Number(id))
  .filter(id => !isNaN(id));


  const serviceIdToName: Record<number, string> = {
  1: "Home Services",
  2: "Packers and Movers / Transport",
  // 3: "House & Commercial Rentals",
    3: "Buy & Sale Products", 
  4: "Building & Construction Raw Materials",
  5: "Education",
  // 6: "Buy & Sale Products",
};



  const searchQuery = searchParams.get("q") || "";
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [searchQuery]);


  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");



  /* 🔹 MAIN SERVICES + SUBSERVICE KEYWORDS */
  const servicesList = [
    {
      name: "Packers and Movers / Transport",
     keywords: [
  // passenger transport
  "passenger transport",
  "taxi",
  "local",
  "local taxi",
  "carpol",
  "carpooling",
  "shuttle",
  "shuttle service",

  // logistics & cargo
  "logistics and cargo",
  "goods",
  "goods delivery",
  "intercity transport",
  "delivery",
  "cargo",

  // rentals
  "rental services",
  "car rental",
  "truck rental",
  "van rental",

  // special
  "specialized transport",
  "hazardous",
  "temperature controlled",
],

      component: (
  <Packersandmovers
    searchQuery={searchQuery}
    // clearSearch={() => navigate("/app/dashboard")}

  />
),

    },
  {
  name: "Home Services",
  keywords: [
    //main services
    "cleaning services",
    "residential cleaning",
    "commercial cleaning",
    "specialized cleaning",
    "post",
    "industrial cleaning",
   
 //residential cleaning
    // Homes 
       "homes","home cleaning","home services",
              "living room",
              "bedroom",
              "kitchen",
              "bathroom",
              "all services", 
    // apartments
       "apartment services","appartment","apartments","apartment cleaning",
           "studio",
           "1bhk",
           "2bhk",
           "3bhk",
    // villas
       "villa services","villas","villa cleaning",
           "small villas", 
           "duplex villas",
           "luxury villas",
    // commercial cleaning 
    // offices  
        "office","offices services","office cleaning",
            "cabin",
            "workstation",
            "conference hall",
    // shops and malls        
        "shop cleaning","shop services","shops",
        "mall cleaning","malls", "mall services",
             "shop cleaning",
             "mall cleaning",
             "showroom",
    // clinics and labs
        "clinic cleaning","clinics","clinic services",
        "lab cleaning","labs","lab services",
              "clinic cleaning",
              "laboratory",
              "diagnostic",   
    // schools
        "school cleaning","schools","school services",
             "classroom",
             "school laboratory",
              "library",
    // specialized cleaning
        // furniture cleaning
        "furniture cleaning","furniture",
                "sofa",
                "chair",
                "wooden furniture",
       // floor cleaning
        "floor cleaning","floors",
                "marble",
                "tile",
                "granite",
       // glass cleaning
        "glass cleaning","window cleaning",
                "outdoor glass",
                "high rise glass",
                "indoor glass",
                "home sanitization",
                "office sanitization",
                "commercial sanitization",
    //industrial cleaning
        //assembaly area
            "assembly services","assembly areas",
            "production line",

        // production services
           "production services",
           "warehouse rack",
           "warehouse floor",
        //Waste handling
          "waste handling","waste services",
            "heavy equipment",
            "precision tools",
            "chemical waste",
            "solid waste",
    //post construction
        //marble and granite 
          "pmarble","pgranite",
         
        //dust removal
          "dust",
          "indoor dust",
          "outdoor dust",
        // paint stain removal
          "paint stain tiles",
          "paint stain windows",

             
  
  // plumbing
    "plumbing services",
    "leak",
    "pipe",
    "geyser installation",
    "bathroom fitting",
    "water tank",
    "drain cleaning",

    // electrical
    "electrical services",
    "wiring",
    "fan",
    "circuit",
    "switchboard",
    "smart home",

    // appliances
    "ac service",
    "washing machine",
    "microwave servicing",
    "tv servicing",
    "refrigerator",
    "appliances repair",
  ],
  component: (
    <HomeServices
      searchQuery={searchQuery}
      // clearSearch={() => navigate("/app/dashboard")}
    />
  ),
},


    {
      name: "Building & Construction Raw Materials",
      keywords: [
        "material supply",
        "cement",
        "steel",
        "marble",
        "Transportation",
        "machinery rental",
        "construction transport",
        "sand",  
        "Bricks",
        "pipes",
        "Tiles",
        "bulk procurement",
      ],
      component: (
    <ConstructionServices
      searchQuery={searchQuery}
        // clearSearch={() => navigate("/app/dashboard")}

    />
  ),
    },
    {
  name: "Buy & Sale Products",
  keywords: [
    // buy & sale
    "buy & sale products",
    "Property Listing for sale",
    "Property listing for Purchase",
    "Prime commercial plot",
    //"Industrial plot",
    "Office complex",
    "Boutique hotel development land",
    "luxury Hillside villa",
    "heritage bungalow",
    "Corporate office Tower Floor",


   // "Old retail sales",
   "old retail sales",
   "Instore billing",
   "Inventory and customer records",

   
    //"online ordering",
    "online ordering",
    "online ordering and checkout",
    "Digital catalog and product search",
    "Online payments(UPI/card)",
    "Home delivery and tracking",
    "online offers and coupons",



    //"wholesale Buy near distribution",
    "Wholesale buy near distribution",
    "Price comparison and bulk orders",
    "Supplier coordination and stock tracking",

    
  ],
  component: (
    <BuySaleProducts
      searchQuery={searchQuery}
        // clearSearch={() => navigate("/app/dashboard")}

    />
  ),
},
{
  name: "House & Commercial Rentals",
  keywords: [
    // residential
    "house rental",
    //"apartment",
    //"apartments",
    "independent house",
    "independent",
    "flat",
    //"r1bhk",
    //"r2bhk",
    //"r3bhk",
    //"rvilla",

    // commercial
    "commercial",
   // "office",
    "warehouse",
    "startup",
    "open plot",
  ],
  component: (
    <ServicesPage
      searchQuery={searchQuery}
      // clearSearch={() => navigate("/app/dashboard")}

    />
  ),
},


  ];

  /* 🔹 FILTER LOGIC (MAIN FIX) */
 const filteredServices = servicesList
  .map((service) => {
    if (!searchQuery) {
      return {
        service,
        matchScore: 0,
      };
    }

    const normalizedQuery = normalize(searchQuery);

    const serviceMatch = normalize(service.name).includes(normalizedQuery);
    const keywordMatch = service.keywords.some((k) =>
      normalize(k).includes(normalizedQuery)
    );

    return {
      service,
      matchScore: serviceMatch ? 2 : keywordMatch ? 1 : -1,
    };
  })
  .filter((item) => item.matchScore >= 0)
  .sort((a, b) => b.matchScore - a.matchScore)
  .map((item) => item.service);

  // Only keep services the user is allowed to access
const allowedServices = filteredServices.filter((service) =>
  userServiceIds.some((id) => serviceIdToName[id] === service.name)
);




const location = useLocation();
const isRootDashboard = location.pathname === "/app/dashboard";

return (
  <div className="dashboard-container">
    {isRootDashboard ? (
      <>
        <div className="services-section">
          <h1 className="services-title">Our Services</h1>
        </div>

        {/* Home Services */}
        {allowedServices.find(
          (s) => s.name === "Home Services"
        )?.component}

        {/* Education */}
        {userServiceIds.includes(5) && <Education />}

       

        {/* Construction */}
        {allowedServices.find(
          (s) => s.name === "Building & Construction Raw Materials"
        )?.component}

        {/* Remaining services */}
        {allowedServices
          .filter(
            (s) =>
              s.name !== "Home Services" &&
              s.name !== "Building & Construction Raw Materials" &&
              s.name !== "House & Commercial Rentals"
          )
          .map((service) => (
            <div key={service.name}>
              {service.component}
            </div>
          ))}
      </>
    ) : (
      <Outlet />
    )}
  </div>
);



};

export default Dashboard;
