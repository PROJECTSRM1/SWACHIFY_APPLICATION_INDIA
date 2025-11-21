import cleaning from "../../../assets/HomeServices/cleaningservicessubmodules/home cleaning.jpg"
import mattress from "../../../assets/HomeServices/cleaningservicessubmodules/mattress cleaning.jpg"
import kitchen from "../../../assets/HomeServices/cleaningservicessubmodules/kitchen cleaning.webp"
import bathroom from "../../../assets/HomeServices/cleaningservicessubmodules/bathroom cleaning.jpeg"
import pestcontroll from "../../../assets/HomeServices/cleaningservicessubmodules/Pest Control & Disinfection.webp"
import wiringlighting from "../../../assets/HomeServices/Electrical Services/wiring and lightning.jpg" 
import fanappliances from "../../../assets/HomeServices/Electrical Services/Fan and Appliance-repair.jpg" 
import circuitbreaker from "../../../assets/HomeServices/Electrical Services/CB and switchboard fixing.jpg" 
import smarthomedevice from "../../../assets/HomeServices/Electrical Services/smarthome and device installation.jpg" 
import leakrepair from "../../../assets/HomeServices/Plumbing Services/Leak repairs.jpg"
import pipefittings from "../../../assets/HomeServices/Plumbing Services/pipe fittings.jpeg"
import Geyserinstallation from "../../../assets/HomeServices/Plumbing Services/Geyser Installation.jpg"
import Bathroomfittings from "../../../assets/HomeServices/Plumbing Services/bathroom fittings.jpeg"
import Watertank from "../../../assets/HomeServices/Plumbing Services/Water Tank.jpg"
import Drincleaning from "../../../assets/HomeServices/Plumbing Services/Drain cleaning.jpg"
import acrepair from "../../../assets/HomeServices/Appliances Repair/Ac maintenance repair.jpg"
import refrigeratorrepair from "../../../assets/HomeServices/Appliances Repair/Refrigerator repair.jpg"
import washingrepair from "../../../assets/HomeServices/Appliances Repair/Washing machine  repair.jpg"
import microwave from "../../../assets/HomeServices/Appliances Repair/Microwave service repair.jpg"
import tvservice from "../../../assets/HomeServices/Appliances Repair/TV service repair.jpg"
import regularmaintance from "../../../assets/HomeServices/Appliances Repair/Regular Maintenance repair.jpg"
import sparepart from "../../../assets/HomeServices/Appliances Repair/Spare parts replacement repair.jpeg"
import customfurniture from "../../../assets/HomeServices/Carpentry&Furniture/Custom furniture making.jpeg"
import furniturerepair from "../../../assets/HomeServices/Carpentry&Furniture/furniture repairs.jpg"
import doorwindows from "../../../assets/HomeServices/Carpentry&Furniture/door&window fixnig.jpg"
import wardrob from "../../../assets/HomeServices/Carpentry&Furniture/wardrob and cabinet installation.jpg"
import interiorpainting from "../../../assets/HomeServices/Painting&Renovation/Interior Painting.webp"
import exteriorpainting from "../../../assets/HomeServices/Painting&Renovation/Exterior Painting.jpg"
import wallpaper from "../../../assets/HomeServices/Painting&Renovation/Wallpaper & Touch-Up Works.webp"
import waterproof from "../../../assets/HomeServices/Painting&Renovation/Waterproofing.webp"
import wallrepair from "../../../assets/HomeServices/Painting&Renovation/Wall Repair.jpg"
import acinstalla from "../../../assets/HomeServices/HVAC&Cooling/AC insallation.webp"
import acservice from "../../../assets/HomeServices/HVAC&Cooling/AC Servicing.webp"
import acduct from "../../../assets/HomeServices/HVAC&Cooling/AC duct cleaning.webp"
import acfilter from "../../../assets/HomeServices/HVAC&Cooling/AC filter replacement.webp"
import cooling from "../../../assets/HomeServices/HVAC&Cooling/Cooling System Maintenance.webp"
import lawnmaintaince from "../../../assets/HomeServices/Gardening&OutdoorServices/lawn maintanance.jpg"
import landscaping from "../../../assets/HomeServices/Gardening&OutdoorServices/landscaping.jpg"
import outdoorcleaning from "../../../assets/HomeServices/Gardening&OutdoorServices/out door cleaning.jpg"
import gardenpest from "../../../assets/HomeServices/Gardening&OutdoorServices/garden pest control and care.jpg"
import tvmounting from "../../../assets/HomeServices/HandymanRepair/tv mounting.jpg"
import shelfmounting from "../../../assets/HomeServices/HandymanRepair/shelf mounting.jpg"
import fixturerepair from "../../../assets/HomeServices/HandymanRepair/fixture repair.jpg"
import minorhome from "../../../assets/HomeServices/HandymanRepair/minor maintanance tasks.jpg"
import cctvinstallation from "../../../assets/HomeServices/HomeSecurityServices/CC TV instalation.webp"
import doorlock from "../../../assets/HomeServices/HomeSecurityServices/Door Lock installation.webp"
import alaramsystem from "../../../assets/HomeServices/HomeSecurityServices/Alarm System Installation.jpg";
import motioncensor from "../../../assets/HomeServices/HomeSecurityServices/Motion Sensor system.webp"
import smartsecuritydevicesetup from "../../../assets/HomeServices/HomeSecurityServices/Smart Security Setup.webp"





// ⭐ Reusable type for each sub-service
export type SubService = {
  title: string;
  description: string;
  image: string;
  price: string;
  includedList: string[];
  issues: string[];
};

// ⭐ Category type (Cleaning Services, Electrical Services, etc.)
export type PopupCategory = {
  mainTitle: string;
  subServices: SubService[];
};

// ⭐ Main type for all popup data
export type PopupDataType = Record<string, PopupCategory>;

// ⭐ Your popup data — now cleanly typed and error-free
export const popupData: PopupDataType = {
  "Cleaning Services": {
    mainTitle: "Cleaning Services",
    subServices: [
      {
        title: "Home Cleaning",
        description: "Full home cleaning service",
        image: cleaning,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Genuine Spare Parts",
          "Service warranty",  
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "Mattress Cleaning",
        description: "Deep mattress cleaning",
        image: mattress,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
           "Dust mites",
          "Bad odor",
          "Sweat stains",
         "Food or drink spills",
     
        ]
      },

       {
        title: "Kitchen Cleaning",
        description: "Deep kitchen cleaning",
        image: kitchen,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
            "Grease buildup",
  "Stains on countertop",
  "Dirty exhaust fan",
  "Oil stains near stove",
         
        ]
      },
        {
        title: "Bathroom Cleaning",
        description: "Deep kitchen cleaning",
        image: bathroom,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
           "Hard water stains",
  "Clogged drain",
  "Mold & mildew",
  "Deep cleaning required"
         
        ]
      },
        {
        title: "Pest Control & DisInfection",
        description: "Pest Control & DisInfection will be done",
        image: pestcontroll,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
           "Cockroach infestation",
  "Ant infestation",
  "Mosquito issue",
  "Bed bugs",
        ]
      },
    ]
  },




  "Electrical Services": {
    mainTitle: "Electrical Services",
    subServices: [
      {
        title: "Wiring & Lighting Install",
        description: "Wiring, lighting & setup",
        image: wiringlighting,
        price: "₹130",
        includedList: [
          "Certified technician",
          "Safety compliance",
          "Quality tools",
          "Post-service cleanup"
        ],
        issues: [
          "Wiring issue",
          "Bulb not working",
          "Short circuit",
          "Switch issue"
        ]
      },
      {
        title: "Fan Appliances Repair",
        description: "Repairing ceiling & wall fans",
        image: fanappliances,
        price: "₹199",
        includedList: [
          "Genuine spare parts",
          "Warranty included",
          "Expert electrician"
        ],
        issues: [
          "Fan not rotating",
          "Fan making noise",
          "Fan not starting",
          "Regulator issue"
        ]
      },
        {
        title: "Circuit Breaker Switchboard Fixing",
        description: "Repairing ceiling & wall fans",
        image: circuitbreaker,
        price: "₹199",
        includedList: [
          "Genuine spare parts",
          "Warranty included",
          "Expert electrician"
        ],
        issues: [
          "Fan not rotating",
          "Fan making noise",
          "Fan not starting",
          "Regulator issue"
        ]
      },
       {
        title: "smart Home Device Installation",
        description: "Smart device setup",
        image: smarthomedevice,
        price: "₹199",
        includedList: [
          "Genuine spare parts",
          "Warranty included",
          "Expert electrician"
        ],
        issues: [
  "Device not connecting",
  "App setup required",
  "Mounting installation",
  "Wi-Fi connectivity issue"
         
        ]
      },

    ]
  },

    "Plumbing Service": {
    mainTitle: "Plumbing Service",
    subServices: [
      {
        title: "Leak Repair",
        description: "Full home cleaning service",
        image: leakrepair,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "PipeFitting",
        description: "Deep mattress cleaning",
        image: pipefittings,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Geyser Installation",
        description: "Deep kitchen cleaning",
        image: Geyserinstallation,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Bathroom Fitting",
        description: "Deep kitchen cleaning",
        image: Bathroomfittings,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Water Tank",
        description: "Pest Control & DisInfection will be done",
        image: Watertank,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
         {
        title: "Drain Cleaning",
        description: "Pest Control & DisInfection will be done",
        image: Drincleaning,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
  },


    "Appliances Repair": {
    mainTitle: "Appliances Repair",
    subServices: [
      {
        title: "Ac Repair",
        description: "Full home cleaning service",
        image: acrepair,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "refrigerator Repair",
        description: "Deep mattress cleaning",
        image: refrigeratorrepair,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Washing Machine Repairs",
        description: "Deep kitchen cleaning",
        image: washingrepair,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Microwave Servicing",
        description: "Deep kitchen cleaning",
        image: microwave,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "TV Servicing",
        description: "Pest Control & DisInfection will be done",
        image: tvservice,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
         {
        title: "Regular Maintance",
        description: "Pest Control & DisInfection will be done",
        image: regularmaintance,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }, {
        
        title: "Spare Parts & Replacement",
        description: "Pest Control & DisInfection will be done",
        image: sparepart,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
  },


  
    "Carpentry & Furniture": {
    mainTitle: "Carpentry & Furniture",
    subServices: [
      {
        title: "Custom Furniture Making",
        description: "Full home cleaning service",
        image: customfurniture,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "Furnitu Rerepair",
        description: "Deep mattress cleaning",
        image: furniturerepair,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Doors And Windows Fixing",
        description: "Deep kitchen cleaning",
        image: doorwindows,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Wardrobe And Cabinet Installation",
        description: "Deep kitchen cleaning",
        image: wardrob,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
    },

     "Painting & Renovation": {
    mainTitle: "Painting & Renovation",
    subServices: [
      {
        title: "Interior Painting",
        description: "Full home cleaning service",
        image: interiorpainting,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "Exterior Painting",
        description: "Deep mattress cleaning",
        image: exteriorpainting,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Wallpaper And Touchup Works",
        description: "Deep kitchen cleaning",
        image: wallpaper,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Water Profing",
        description: "Deep kitchen cleaning",
        image:waterproof,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
      
        {
        title: "Wall Repair",
        description: "Deep kitchen cleaning",
        image:wallrepair,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
    },
    "HVAC & Cooling": {
    mainTitle: "HVAC & Cooling",
    subServices: [
      {
        title: "Ac Installation",
        description: "Full home cleaning service",
        image: acinstalla,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "Ac Service",
        description: "Deep mattress cleaning",
        image:acservice,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Ac Duct Cleaning",
        description: "Deep kitchen cleaning",
        image: acduct,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Ac Filter Replacement",
        description: "Deep kitchen cleaning",
        image:acfilter,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
         {
        title: "Cooling System Maintaince",
        description: "Deep kitchen cleaning",
        image:cooling,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
    },

    
  "Gardening & Outdoor Care": {
    mainTitle: "Gardening & Outdoor Care",
    subServices: [
      {
        
        title: "Lawn Maintanance",
        description: "Wiring, lighting & setup",
        image:lawnmaintaince,
        price: "₹130",
        includedList: [
          "Certified technician",
          "Safety compliance",
          "Quality tools",
          "Post-service cleanup"
        ],
        issues: [
          "Wiring issue",
          "Bulb not working",
          "Short circuit",
          "Switch issue"
        ]
      },
      {
        title: "land Scaping",
        description: "Repairing ceiling & wall fans",
        image: landscaping,
        price: "₹199",
        includedList: [
          "Genuine spare parts",
          "Warranty included",
          "Expert electrician"
        ],
        issues: [
          "Fan not rotating",
          "Fan making noise",
          "Fan not starting",
          "Regulator issue"
        ]
      },
        {
        title: "Outdoor Cleaning",
        description: "Repairing ceiling & wall fans",
        image: outdoorcleaning,
        price: "₹199",
        includedList: [
          "Genuine spare parts",
          "Warranty included",
          "Expert electrician"
        ],
        issues: [
          "Fan not rotating",
          "Fan making noise",
          "Fan not starting",
          "Regulator issue"
        ]
      },
       {
        title: "Garden Pest control And Care",
        description: "Repairing ceiling & wall fans",
        image:gardenpest,
        price: "₹199",
        includedList: [
          "Genuine spare parts",
          "Warranty included",
          "Expert electrician"
        ],
        issues: [
          "Fan not rotating",
          "Fan making noise",
          "Fan not starting",
          "Regulator issue"
        ]
      },

    ]
  },


  
     "Handyman / General Repair": {
    mainTitle: "Handyman / General Repair",
    subServices: [
      {
        title: "TV Mounting",
        description: "Full home cleaning service",
        image: tvmounting,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "Shelf Mounting",
        description: "Deep mattress cleaning",
        image: shelfmounting,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Fixture Repair",
        description: "Deep kitchen cleaning",
        image: fixturerepair,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Furniture Repair",
        description: "Deep kitchen cleaning",
        image:furniturerepair,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
      
        {
        title: "Minor Home Maintaince",
        description: "Deep kitchen cleaning",
        image:minorhome,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
    },

    
     "Home Security Services": {
    mainTitle: "Home Security Services",
    subServices: [
      {
        title: "CCTV Installation",
        description: "Full home cleaning service",
        image: cctvinstallation,
        price: "₹499",
        includedList: [
          "Certified technician",
          "Quality tools and equipment",
          "Service warranty",
          "Post-service cleanup"
        ],
        issues: [
          "Dust accumulation",
          "Stains on floor",
          "Deep cleaning needed",
          "General cleaning"
        ]
      },
      {
        title: "Door Lock Installation",
        description: "Deep mattress cleaning",
        image: doorlock,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },

       {
        title: "Alaram System",
        description: "Deep kitchen cleaning",
        image: alaramsystem,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
        {
        title: "Motion Censor Systems",
        description: "Deep kitchen cleaning",
        image:motioncensor,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      },
      
        {
        title: "Smart Security Device Setup",
        description: "Deep kitchen cleaning",
        image:smartsecuritydevicesetup,
        price: "₹299",
        includedList: [
          "Steam cleaning",
          "Dust mite removal",
          "Fabric-safe chemicals",
          "Deep sanitization"
        ],
        issues: [
          "Bad smell",
          "Dust mites",
          "Stains on mattress",
          "General cleaning"
        ]
      }
    ]
    }




};


