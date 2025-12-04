
// import cleaning from "../../../assets/HomeServices/cleaningservicessubmodules/home cleaning.jpg"
// import mattress from "../../../assets/HomeServices/cleaningservicessubmodules/mattress cleaning.jpg"
// import kitchen from "../../../assets/HomeServices/cleaningservicessubmodules/kitchen cleaning.jpg"
// import bathroom from "../../../assets/HomeServices/cleaningservicessubmodules/bathroom cleaning.jpg"
// import pestcontroll from "../../../assets/HomeServices/cleaningservicessubmodules/Pest Control & Disinfection.jpg"
import wiringlighting from "../../../assets/HomeServices/Electrical Services/wiring and lightning.jpg" 
import fanappliances from "../../../assets/HomeServices/Electrical Services/Fan and Appliance-repair.jpg" 
import circuitbreaker from "../../../assets/HomeServices/Electrical Services/CB and switchboard fixing.jpg" 
import smarthomedevice from "../../../assets/HomeServices/Electrical Services/smarthome and device installation.jpg" 
import leakrepair from "../../../assets/HomeServices/Plumbing Services/Leak repairs.jpg"
import pipefittings from "../../../assets/HomeServices/Plumbing Services/pipe fittings.jpg"
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
import customfurniture from "../../../assets/HomeServices/Carpentry&Furniture/Custom furniture making.jpg"
import furniturerepair from "../../../assets/HomeServices/Carpentry&Furniture/furniture repairs.jpg"
import doorwindows from "../../../assets/HomeServices/Carpentry&Furniture/door&window fixnig.jpg"
import wardrob from "../../../assets/HomeServices/Carpentry&Furniture/wardrob and cabinet installation.jpg"
import interiorpainting from "../../../assets/HomeServices/Painting&Renovation/Interior Painting.jpg"
import exteriorpainting from "../../../assets/HomeServices/Painting&Renovation/Exterior Painting.jpg"
import wallpaper from "../../../assets/HomeServices/Painting&Renovation/Wallpaper & Touch-Up Works.webp"
import waterproof from "../../../assets/HomeServices/Painting&Renovation/Waterproofing.jpg"
import wallrepair from "../../../assets/HomeServices/Painting&Renovation/Wall Repair.jpg"
import acinstalla from "../../../assets/HomeServices/HVAC&Cooling/AC insallation.webp"
import acservice from "../../../assets/HomeServices/HVAC&Cooling/AC Servicing.webp"
import acduct from "../../../assets/HomeServices/HVAC&Cooling/AC duct cleaning.jpg"
import acfilter from "../../../assets/HomeServices/HVAC&Cooling/AC filter replacement.webp"
import cooling from "../../../assets/HomeServices/HVAC&Cooling/Cooling System Maintenance.webp"
import lawnmaintaince from "../../../assets/HomeServices/Gardening&OutdoorServices/lawn maintanance.jpg"
import landscaping from "../../../assets/HomeServices/Gardening&OutdoorServices/landscaping.jpg"
import outdoorcleaning from "../../../assets/HomeServices/Gardening&OutdoorServices/out door cleaning.jpg"
import gardenpest from "../../../assets/HomeServices/Gardening&OutdoorServices/garden pest control and care.jpg"
import tvmounting from "../../../assets/HomeServices/HandymanRepair/tv mounting.jpg"
import shelfmounting from "../../../assets/HomeServices/HandymanRepair/shelf mounting.jpg"
import fixturerepair from "../../../assets/HomeServices/HandymanRepair/furniture repair.jpg"
import minorhome from "../../../assets/HomeServices/HandymanRepair/minor maintanance tasks.jpg"
import cctvinstallation from "../../../assets/HomeServices/HomeSecurityServices/CC TV instalation.jpg"
import doorlock from "../../../assets/HomeServices/HomeSecurityServices/Door Lock installation.jpg"
import alaramsystem from "../../../assets/HomeServices/HomeSecurityServices/Alarm System Installation.jpg";
import motioncensor from "../../../assets/HomeServices/HomeSecurityServices/Motion Sensor system.jpg"
import smartsecuritydevicesetup from "../../../assets/HomeServices/HomeSecurityServices/Smart Security Setup.jpg"







// ⭐ Reusable type for each sub-service
// Add this new type
export type IssueOption = {
  label: string;
  price: number;
};

export type SubService = {
  title: string;
  description: string;
  image: string;
  totalprice: string;
  includedList: string[];
  issues: IssueOption[];   // ⬅ changed from string[] to IssueOption[]
};

// ⭐ Category type (Cleaning Services, Electrical Services, etc.)
export type PopupCategory = {
  mainTitle: string;
  subServices: SubService[];
};

// ⭐ Main type for all popup data
export type PopupDataType = Record<string, PopupCategory>;


// ⭐ Your popup data — now cleanly typed and error-free
export const popupData: PopupDataType =
 
{

//   "Cleaning Services": {
//   mainTitle: "Cleaning Services",
//   subServices: [
//     {
//       title: "Home Cleaning",
//       description: "Complete home cleaning with sanitation",
//       image: cleaning,
//       totalprice: "₹799",
//       includedList: [
//         "Professional staff",
//         "Eco-friendly products",
//         "Floor & surface cleaning",
//         "Kitchen & bathroom touch-up",
//         "Post-service inspection"
//       ],
//       issues: [
//         "Dust build-up",
//         "Dirty floors",
//         "Unclean surfaces",
//         "Mild stains",
//         "General cleaning needs"
//       ]
//     },

//     {
//       title: "Mattress Cleaning",
//       description: "Deep mattress cleaning and sanitizing",
//       image: mattress,
//       totalprice: "₹499",
//       includedList: [
//         "Deep vacuuming",
//         "Dust mite removal",
//         "Anti-bacterial treatment",
//         "Spot stain cleaning",
//         "Deep sanitization"
//       ],
//       issues: [
//         "Bad odor",
//         "Dust mites",
//         "Sweat stains",
//         "Allergy issues",
//         "General dirt"
//       ]
//     },

//     {
//       title: "Kitchen Cleaning",
//       description: "Deep kitchen cleaning and degreasing",
//       image: kitchen,
//       totalprice: "₹649",
//       includedList: [
//         "Grease removal",
//         "Cabinet exterior cleaning",
//         "Appliance wipe-down",
//         "Sink sanitation",
//         "Floor scrubbing"
//       ],
//       issues: [
//         "Grease build-up",
//         "Dirty tiles",
//         "Stove stains",
//         "Unclean sink",
//         "General kitchen dirt"
//       ]
//     },

//     {
//       title: "Bathroom Cleaning",
//       description: "Deep bathroom cleaning and sanitizing",
//       image: bathroom,
//       totalprice: "₹549",
//       includedList: [
//         "Tile scrubbing",
//         "Hard water stain removal",
//         "Toilet deep cleaning",
//         "Glass cleaning",
//         "Germicidal sanitization"
//       ],
//       issues: [
//         "Hard water stains",
//         "Dirty tiles",
//         "Bad odor",
//         "Soap scum",
//         "General bathroom dirt"
//       ]
//     },

//     {
//       title: "Pest Control & Disinfection",
//       description: "Pest removal with complete disinfection",
//       image: pestcontroll,
//       totalprice: "₹899",
//       includedList: [
//         "Odorless chemicals",
//         "Cockroach/ant control",
//         "Gel & spray treatment",
//         "Home disinfection",
//         "Safety-compliant process"
//       ],
//       issues: [
//         "Cockroach infestation",
//         "Ants/insects",
//         "Mosquito breeding",
//         "Germs & bacteria",
//         "General pest issues"
//       ]
//     }
//   ]
// },


"Electrical Services": {
  mainTitle: "Electrical Services",
  subServices: [
    {
      title: "Wiring & Lighting Install",
      description: "Professional wiring and lighting installation",
      image: wiringlighting,
      totalprice: "₹130",
      includedList: [
        "Certified technician",
        "Safety compliance",
        "Quality tools",
        "Post-service cleanup",
        "Quick installation"
      ],
      issues: [
        { label: "Wiring issue", price: 50 },
        { label: "Bulb not working", price: 30 },
        { label: "Short circuit", price: 80 },
        { label: "Switch issue", price: 40 },
        { label: "Loose connections", price: 20 }
      ]
    },

    {
      title: "Fan Appliances Repair",
      description: "Expert repair for all fans",
      image: fanappliances,
      totalprice: "₹199",
      includedList: [
        "Genuine spare parts",
        "Warranty included",
        "Expert electrician",
        "Quick diagnosis",
        "Quality repair work"
      ],
      issues: [
        { label: "Fan not rotating", price: 50 },
        { label: "Fan making noise", price: 80 },
        { label: "Fan not starting", price: 90 },
        { label: "Regulator issue", price: 30 },
        { label: "Low fan speed", price: 40 }
      ]
    },

    {
      title: "Circuit Breaker & Switchboard Fixing",
      description: "Circuit breaker and switchboard repair",
      image: circuitbreaker,
      totalprice: "₹199",
      includedList: [
        "Genuine spare parts",
        "Warranty included",
        "Expert electrician",
        "Safety inspection",
        "Fast restoration"
      ],
      issues: [
        { label: "Breaker tripping", price: 30 },
        { label: "Overload issues", price: 20 },
        { label: "Loose switches", price: 10 },
        { label: "Socket not working", price: 50 },
        { label: "Sparking problem", price: 60 }
      ]
    },

    {
      title: "Smart Home Device Installation",
      description: "Smart device setup and configuration",
      image: smarthomedevice,
      totalprice: "₹199",
      includedList: [
        "Device configuration",
        "Warranty included",
        "Expert electrician",
        "App connectivity setup",
        "Testing & verification"
      ],
      issues: [
        { label: "Device not pairing", price: 30 },
        { label: "Connectivity issues", price: 40 },
        { label: "Incorrect setup", price: 50 },
        { label: "App integration problems", price: 70 },
        { label: "Power supply issues", price: 90 }
      ]
    }
  ]
},

"Plumbing Service": {
  mainTitle: "Plumbing Service",
  subServices: [
    {
      title: "Leak Repair",
      description: "Quick and reliable leak fixing",
      image: leakrepair,
      totalprice: "₹499",
      includedList: [
        "Certified technician",
        "Quality tools and equipment",
        "Leak source detection",
        "Service warranty",
        "Post-service cleanup"
      ],
      issues: [
        { label: "Tap leakage", price: 50 },
        { label: "Pipe leakage", price: 80 },
        { label: "Water dripping", price: 70 },
        { label: "Joint loose", price: 20 },
        { label: "Moisture patches", price: 90 }
      ]
    },

    {
      title: "Pipe Fitting",
      description: "Professional installation of new pipes",
      image: pipefittings,
      totalprice: "₹299",
      includedList: [
        "Quality fittings used",
        "Skilled plumber",
        "Accurate measurements",
        "Secure sealing",
        "Post-installation testing"
      ],
      issues: [
        { label: "Loose pipe joints", price: 30 },
        { label: "Pipe replacement needed", price: 50 },
        { label: "Low water flow", price: 80 },
        { label: "Pipe cracks", price: 90 },
        { label: "Improper fitting", price: 50 }
      ]
    },

    {
      title: "Geyser Installation",
      description: "Safe and secure geyser installation",
      image: Geyserinstallation,
      totalprice: "₹299",
      includedList: [
        "Secure wall mounting",
        "Pipe and valve setup",
        "Safety checkup",
        "Electrical connection check",
        "Installation warranty"
      ],
      issues: [
        { label: "Geyser not heating", price: 40 },
        { label: "Water leakage", price: 50 },
        { label: "Incorrect installation", price: 80 },
        { label: "Pipe fitting issue", price: 20 },
        { label: "Pressure problems", price: 60 }
      ]
    },

    {
      title: "Bathroom Fitting",
      description: "Complete bathroom fixtures installation",
      image: Bathroomfittings,
      totalprice: "₹299",
      includedList: [
        "Tap installation",
        "Shower setup",
        "Washbasin fitting",
        "Leak testing",
        "Quality hardware used"
      ],
      issues: [
        { label: "Tap loose", price: 80 },
        { label: "Shower leakage", price: 50 },
        { label: "Broken fittings", price: 40 },
        { label: "Low water pressure", price: 70 },
        { label: "Improper installation", price: 20 }
      ]
    },

    {
      title: "Water Tank",
      description: "Water tank cleaning and maintenance",
      image: Watertank,
      totalprice: "₹299",
      includedList: [
        "Tank scrubbing",
        "Sludge removal",
        "Water disinfectant",
        "Inlet/outlet cleaning",
        "Complete drying"
      ],
      issues: [
        { label: "Dirty water", price: 50 },
        { label: "Foul smell", price: 50 },
        { label: "Algae build-up", price: 50 },
        { label: "Sediment accumulation", price: 50 },
        { label: "Overflow issues", price: 50 }
      ]
    },

    {
      title: "Drain Cleaning",
      description: "Clogged drain clearing and cleaning",
      image: Drincleaning,
      totalprice: "₹299",
      includedList: [
        "Clog inspection",
        "Drain snaking",
        "Blockage removal",
        "Odor treatment",
        "Flow testing"
      ],
      issues: [
        { label: "Drain blockage", price: 221 },
        { label: "Slow water flow", price: 30},
        { label: "Bad drain smell", price: 70 },
        { label: "Grease buildup", price: 115 },
        { label: "Hair clogging", price: 20 }
      ]
    }
  ]
},

"Appliances Repair": {
  mainTitle: "Appliances Repair",
  subServices: [
    {
      title: "AC Repair",
      description: "Professional AC inspection and repair",
      image: acrepair,
      totalprice: "₹499",
      includedList: [
        "Certified technician",
        "Cooling efficiency check",
        "Gas level inspection",
        "Electrical safety check",
        "Post-service cleanup"
      ],
      issues: [
        { label: "AC not cooling", price: 110 },
        { label: "Water leakage", price: 210 },
        { label: "Bad smell", price: 70 },
        { label: "Low airflow", price: 60 },
        { label: "Compressor issue", price: 50 }
      ]
    },

    {
      title: "Refrigerator Repair",
      description: "Reliable fridge repair and servicing",
      image: refrigeratorrepair,
      totalprice: "₹299",
      includedList: [
        "Thermostat check",
        "Cooling issue diagnosis",
        "Genuine spare parts",
        "Expert technician",
        "Post-repair testing"
      ],
      issues: [
        { label: "Not cooling", price: 70 },
        { label: "Water leakage", price: 80 },
        { label: "Freezer over-icing", price: 20 },
        { label: "Noise from compressor", price: 110 },
        { label: "Door not sealing", price: 130 }
      ]
    },

    {
      title: "Washing Machine Repairs",
      description: "Complete washing machine repair service",
      image: washingrepair,
      totalprice: "₹299",
      includedList: [
        "Drum inspection",
        "Motor check",
        "Spin cycle testing",
        "Genuine spare parts",
        "Service warranty"
      ],
      issues: [
        { label: "Machine not spinning", price: 205 },
        { label: "Water not draining", price: 115 },
        { label: "Motor noise", price: 50 },
        { label: "Vibration issues", price: 70 },
        { label: "Door not locking", price: 50 }
      ]
    },

    {
      title: "Microwave Servicing",
      description: "Microwave heating and repair service",
      image: microwave,
      totalprice: "₹299",
      includedList: [
        "Heating coil check",
        "Door sensor testing",
        "Internal cleaning",
        "High-voltage inspection",
        "Service warranty"
      ],
      issues: [
        { label: "Not heating", price: 7 },
        { label: "Plate not rotating", price: 50 },
        { label: "Sparking inside", price: 80 },
        { label: "Burning smell", price: 50 },
        { label: "Button malfunction", price: 220 }
      ]
    },

    {
      title: "TV Servicing",
      description: "Expert LED and LCD servicing",
      image: tvservice,
      totalprice: "₹299",
      includedList: [
        "Screen inspection",
        "Motherboard testing",
        "Sound issue diagnosis",
        "Port checkup",
        "Service warranty"
      ],
      issues: [
        { label: "No display", price: 80 },
        { label: "No sound", price: 90 },
        { label: "Lines on screen", price: 70 },
        { label: "Port not working", price: 80 },
        { label: "Remote not responding", price: 50 }
      ]
    },

    {
      title: "Regular Maintenance",
      description: "Routine appliance check and servicing",
      image: regularmaintance,
      totalprice: "₹299",
      includedList: [
        "Full appliance inspection",
        "Cleaning and lubrication",
        "Performance testing",
        "Safety check",
        "Maintenance report"
      ],
      issues: [
        { label: "Low performance", price: 50 },
        { label: "Overheating issues", price: 45 },
        { label: "Noise from appliance", price: 110 },
        { label: "Irregular functioning", price: 50 },
        { label: "Wear and tear", price: 250 }
      ]
    },

    {
      title: "Spare Parts & Replacement",
      description: "Genuine spare parts with installation",
      image: sparepart,
      totalprice: "₹299",
      includedList: [
        "Original spare parts",
        "Expert fitting",
        "Safety testing",
        "Warranty included",
        "Post-installation check"
      ],
      issues: [
        { label: "Broken components", price: 120 },
        { label: "Damaged wiring", price: 50 },
        { label: "Worn-out parts", price: 80 },
        { label: "Non-functional buttons", price: 50 },
        { label: "Motor or compressor faults", price: 70}
      ]
    }
  ]
},

"Carpentry & Furniture": {
  mainTitle: "Carpentry & Furniture",
  subServices: [
    {
      title: "Custom Furniture Making",
      description: "Beautiful custom furniture built professionally",
      image: customfurniture,
      totalprice: "₹499",
      includedList: [
        "Skilled carpenter",
        "Custom design support",
        "Quality wood materials",
        "Precision cutting",
        "Smooth finishing"
      ],
      issues: [
        { label: "New furniture requirement", price: 50 },
        { label: "Custom size needed", price: 50 },
        { label: "Design modification", price: 50 },
        { label: "Material selection help", price: 50 },
        { label: "Loose structure concerns", price: 50 }
      ]
    },

    {
      title: "Furniture Repair",
      description: "Reliable repair for damaged furniture",
      image: furniturerepair,
      totalprice: "₹299",
      includedList: [
        "Joint tightening",
        "Surface polishing",
        "Wood repair materials",
        "Hardware replacement",
        "Service warranty"
      ],
      issues: [
        { label: "Broken furniture", price: 50 },
        { label: "Loose joints", price: 50 },
        { label: "Scratches & dents", price: 50 },
        { label: "Damaged hinges", price: 50 },
        { label: "Cracked wood", price: 50 }
      ]
    },

    {
      title: "Doors And Windows Fixing",
      description: "Repairing wooden doors and windows",
      image: doorwindows,
      totalprice: "₹299",
      includedList: [
        "Hinge adjustment",
        "Lock repair",
        "Frame alignment",
        "Smooth door movement",
        "Noise reduction"
      ],
      issues: [
        { label: "Door not closing", price: 50 },
        { label: "Window jammed", price: 50 },
        { label: "Loose hinges", price: 50 },
        { label: "Lock not working", price: 50 },
        { label: "Frame misalignment", price: 50 }
      ]
    },

    {
      title: "Wardrobe And Cabinet Installation",
      description: "Professional wardrobe and cabinet setup",
      image: wardrob,
      totalprice: "₹299",
      includedList: [
        "Accurate measurement",
        "Wall anchoring",
        "Hardware installation",
        "Smooth sliding setup",
        "Post-installation testing"
      ],
      issues: [
        { label: "Cabinet misalignment", price: 50 },
        { label: "Broken hinges", price: 50 },
        { label: "Loose shelves", price: 50 },
        { label: "Sliding not smooth", price: 50 },
        { label: "New installation required", price: 50 }
      ]
    }
  ]
},

"Painting & Renovation": {
  mainTitle: "Painting & Renovation",
  subServices: [
    {
      title: "Interior Painting",
      description: "Smooth interior home painting",
      image: interiorpainting,
      totalprice: "₹499",
      includedList: [
        "Wall sanding",
        "Primer application",
        "Quality paint materials",
        "Furniture covering",
        "Post-paint cleanup"
      ],
      issues: [
        { label: "Wall discoloration", price: 50 },
        { label: "Peeling paint", price: 50 },
        { label: "Cracks on wall", price: 50 },
        { label: "Faded colors", price: 50 },
        { label: "Moisture patches", price: 50 }
      ]
    },

    {
      title: "Exterior Painting",
      description: "Durable exterior wall painting",
      image: exteriorpainting,
      totalprice: "₹299",
      includedList: [
        "Weatherproof paint",
        "Surface washing",
        "Crack sealing",
        "Primer coating",
        "Professional painters"
      ],
      issues: [
        { label: "Paint fading", price: 50 },
        { label: "Exterior cracks", price: 50 },
        { label: "Water damage marks", price: 50 },
        { label: "Wall roughness", price: 50 },
        { label: "Peeling layers", price: 50 }
      ]
    },

    {
      title: "Wallpaper And Touch-Up Works",
      description: "Stylish wallpaper and touchups",
      image: wallpaper,
      totalprice: "₹299",
      includedList: [
        "Wallpaper installation",
        "Bubble removal",
        "Wall smoothening",
        "Design alignment",
        "Minor paint touchups"
      ],
      issues: [
        { label: "Wallpaper peeling", price: 50 },
        { label: "Wall bubbles", price: 50 },
        { label: "Misalignment issues", price: 50 },
        { label: "Minor cracks", price: 50 },
        { label: "Paint scratches", price: 50 }
      ]
    },

    {
      title: "Water Proofing",
      description: "Effective leakage and seepage protection",
      image: waterproof,
      totalprice: "₹299",
      includedList: [
        "Crack filling",
        "Waterproof coating",
        "Chemical treatment",
        "Leak prevention",
        "Moisture inspection"
      ],
      issues: [
        { label: "Wall seepage", price: 50 },
        { label: "Water leakage", price: 50 },
        { label: "Damp patches", price: 50 },
        { label: "Ceiling moisture", price: 50 },
        { label: "Crack water flow", price: 50 }
      ]
    },

    {
      title: "Wall Repair",
      description: "Professional wall crack repairs",
      image: wallrepair,
      totalprice: "₹299",
      includedList: [
        "Crack filling",
        "Hole patching",
        "Surface leveling",
        "Primer coat",
        "Finish sanding"
      ],
      issues: [
        { label: "Wall cracks", price: 50 },
        { label: "Holes in wall", price: 50 },
        { label: "Uneven surface", price: 50 },
        { label: "Chipped plaster", price: 50 },
        { label: "Damaged corners", price: 50 }
      ]
    }
  ]
},

"HVAC & Cooling": {
  mainTitle: "HVAC & Cooling",
  subServices: [
    {
      title: "AC Installation",
      description: "Professional AC unit installation",
      image: acinstalla,
      totalprice: "₹499",
      includedList: [
        "Proper wall mounting",
        "Pipe connection setup",
        "Gas level check",
        "Electrical safety check",
        "Post-install testing"
      ],
      issues: [
        { label: "Water leakage", price: 50 },
        { label: "Improper cooling", price: 50 },
        { label: "Vibration issues", price: 50 },
        { label: "Loose mounting", price: 50 },
        { label: "High noise", price: 50 }
      ]
    },

    {
      title: "AC Service",
      description: "Complete AC cleaning service",
      image: acservice,
      totalprice: "₹299",
      includedList: [
        "Filter wash",
        "Cooling coil cleaning",
        "Drain pipe cleaning",
        "Gas pressure check",
        "Outer panel cleaning"
      ],
      issues: [
        { label: "Low cooling", price: 50 },
        { label: "Bad smell", price: 50 },
        { label: "Water dripping", price: 50 },
        { label: "Dirty filters", price: 50 },
        { label: "High power usage", price: 50 }
      ]
    },

    {
      title: "AC Duct Cleaning",
      description: "Deep duct airflow cleaning",
      image: acduct,
      totalprice: "₹299",
      includedList: [
        "Dust removal",
        "Duct sanitization",
        "Blower cleaning",
        "Vent inspection",
        "Airflow improvement"
      ],
      issues: [
        { label: "Dust in vents", price: 50 },
        { label: "Low airflow", price: 50 },
        { label: "Bad odor", price: 50 },
        { label: "Allergy triggers", price: 50 },
        { label: "Clogged ducts", price: 50 }
      ]
    },

    {
      title: "AC Filter Replacement",
      description: "Quick filter replacement service",
      image: acfilter,
      totalprice: "₹299",
      includedList: [
        "New filter installation",
        "Filter quality check",
        "Unit inspection",
        "Safety verification",
        "Cooling test"
      ],
      issues: [
        { label: "Dirty filters", price: 50 },
        { label: "Weak cooling", price: 50 },
        { label: "Bad airflow", price: 50 },
        { label: "High noise", price: 50 },
        { label: "Odor issues", price: 50 }
      ]
    },

    {
      title: "Cooling System Maintenance",
      description: "Complete cooling system checkup",
      image: cooling,
      totalprice: "₹299",
      includedList: [
        "Compressor check",
        "Thermostat testing",
        "Cooling efficiency check",
        "Gas pressure inspection",
        "Electrical connection check"
      ],
      issues: [
        { label: "Frequent breakdowns", price: 50 },
        { label: "Cooling delay", price: 50 },
        { label: "Thermostat issues", price: 50 },
        { label: "Gas leakage", price: 50 },
        { label: "Overheating", price: 50 }
      ]
    }
  ]
},

"Gardening & Outdoor Care": {
  mainTitle: "Gardening & Outdoor Care",
  subServices: [
    {
      title: "Lawn Maintenance",
      description: "Regular lawn grooming and care",
      image: lawnmaintaince,
      totalprice: "₹130",
      includedList: [
        "Grass trimming",
        "Weed removal",
        "Edge shaping",
        "Leaf clearing",
        "Waste disposal"
      ],
      issues: [
        { label: "Overgrown grass", price: 50 },
        { label: "Weed spread", price: 50 },
        { label: "Uneven edges", price: 50 },
        { label: "Dry patches", price: 50 },
        { label: "Insect damage", price: 50 }
      ]
    },

    {
      title: "Landscaping",
      description: "Complete garden design service",
      image: landscaping,
      totalprice: "₹199",
      includedList: [
        "Garden planning",
        "Plant selection",
        "Soil preparation",
        "Installation support",
        "Finishing touches"
      ],
      issues: [
        { label: "Poor layout", price: 50 },
        { label: "Unhealthy plants", price: 50 },
        { label: "Soil imbalance", price: 50 },
        { label: "Patchy design", price: 50 },
        { label: "Water drainage issue", price: 50 }
      ]
    },

    {
      title: "Outdoor Cleaning",
      description: "Thorough outdoor area cleaning",
      image: outdoorcleaning,
      totalprice: "₹199",
      includedList: [
        "Surface washing",
        "Debris removal",
        "Pressure cleaning",
        "Moss cleanup",
        "Walkway clearing"
      ],
      issues: [
        { label: "Dirty pathways", price: 50 },
        { label: "Excess leaves", price: 50 },
        { label: "Moss buildup", price: 50 },
        { label: "Outdoor stains", price: 50 },
        { label: "Garbage accumulation", price: 50 }
      ]
    },

    {
      title: "Garden Pest Control & Care",
      description: "Garden pest removal treatment",
      image: gardenpest,
      totalprice: "₹199",
      includedList: [
        "Safe chemicals",
        "Plant protection",
        "Complete inspection",
        "Pest elimination",
        "Aftercare tips"
      ],
      issues: [
        { label: "Plant pests", price: 50 },
        { label: "Leaf damage", price: 50 },
        { label: "Soil insects", price: 50 },
        { label: "Fungal infection", price: 50 },
        { label: "Plant wilting", price: 50 }
      ]
    }
  ]
},

"Handyman / General Repair": {
  mainTitle: "Handyman / General Repair",
  subServices: [
    {
      title: "TV Mounting",
      description: "Secure TV wall installation",
      image: tvmounting,
      totalprice: "₹499",
      includedList: [
        "Accurate wall measurement",
        "Sturdy mounting brackets",
        "Cable management",
        "Safety check",
        "Quick installation"
      ],
      issues: [
        { label: "Loose TV mount", price: 50 },
        { label: "Tilt not working", price: 50 },
        { label: "Wall alignment issue", price: 50 },
        { label: "Bracket replacement needed", price: 50 },
        { label: "Drilling support required", price: 50 }
      ]
    },

    {
      title: "Shelf Mounting",
      description: "Wall shelf installation help",
      image: shelfmounting,
      totalprice: "₹299",
      includedList: [
        "Proper level alignment",
        "Strong fasteners",
        "Drilling and fitting",
        "Load testing",
        "Cleanup after work"
      ],
      issues: [
        { label: "Shelf not level", price: 50 },
        { label: "Loose screws", price: 50 },
        { label: "Wall cracks", price: 50 },
        { label: "Incorrect placement", price: 50 },
        { label: "Heavy load concerns", price: 50 }
      ]
    },

    {
      title: "Fixture Repair",
      description: "Minor home fixture repair",
      image: fixturerepair,
      totalprice: "₹299",
      includedList: [
        "Inspection of fixture",
        "Minor adjustments",
        "Replacement parts (if needed)",
        "Secure fitting",
        "Functionality testing"
      ],
      issues: [
        { label: "Loose handles", price: 50 },
        { label: "Broken hinges", price: 50 },
        { label: "Damaged fixtures", price: 50 },
        { label: "Misalignment", price: 50 },
        { label: "Wear and tear", price: 50 }
      ]
    },

    {
      title: "Furniture Repair",
      description: "Basic furniture fixing service",
      image: furniturerepair,
      totalprice: "₹299",
      includedList: [
        "Minor wood repair",
        "Loose joint fixing",
        "Hardware replacement",
        "Alignment correction",
        "Finishing touches"
      ],
      issues: [
        { label: "Loose joints", price: 50 },
        { label: "Wobbling chair", price: 50 },
        { label: "Broken drawer", price: 50 },
        { label: "Cracked wood", price: 50 },
        { label: "Damaged hinges", price: 50 }
      ]
    },

    {
      title: "Minor Home Maintenance",
      description: "Small home fixes service",
      image: minorhome,
      totalprice: "₹299",
      includedList: [
        "General inspections",
        "Minor repairs",
        "Hardware tightening",
        "Basic replacements",
        "Quick handyman support"
      ],
      issues: [
        { label: "Loose fittings", price: 50 },
        { label: "Wall damage", price: 50 },
        { label: "Small cracks", price: 50 },
        { label: "Stuck doors", price: 50 },
        { label: "Minor wear issues", price: 50 }
      ]
    }
  ]
},

"Home Security Services": {
  mainTitle: "Home Security Services",
  subServices: [
    {
      title: "CCTV Installation",
      description: "Professional CCTV setup service",
      image: cctvinstallation,
      totalprice: "₹499",
      includedList: [
        "HD camera setup",
        "Cable routing & fixing",
        "Mobile app configuration",
        "DVR/NVR setup",
        "System testing"
      ],
      issues: [
        { label: "Camera not recording", price: 50 },
        { label: "Blurry video feed", price: 50 },
        { label: "App not connecting", price: 50 },
        { label: "Cable damage", price: 50 },
        { label: "DVR storage issues", price: 50 }
      ]
    },

    {
      title: "Door Lock Installation",
      description: "Secure lock fitting service",
      image: doorlock,
      totalprice: "₹299",
      includedList: [
        "Lock alignment",
        "Door drilling (if needed)",
        "Hardware installation",
        "Key functionality check",
        "Secure fitting"
      ],
      issues: [
        { label: "Loose lock", price: 50 },
        { label: "Key not turning", price: 50 },
        { label: "Broken latch", price: 50 },
        { label: "Door misalignment", price: 50 },
        { label: "Lock replacement needed", price: 50 }
      ]
    },

    {
      title: "Alarm System Setup",
      description: "House alarm installation service",
      image: alaramsystem,
      totalprice: "₹299",
      includedList: [
        "Sensor placement",
        "Control panel setup",
        "App connectivity",
        "Alert testing",
        "Safety configuration"
      ],
      issues: [
        { label: "No alarm sound", price: 50 },
        { label: "Sensor not detecting", price: 50 },
        { label: "Mobile alerts not working", price: 50 },
        { label: "Wiring fault", price: 50 },
        { label: "Low battery issue", price: 50 }
      ]
    },

    {
      title: "Motion Sensor Systems",
      description: "Motion sensor setup service",
      image: motioncensor,
      totalprice: "₹299",
      includedList: [
        "Sensor positioning",
        "Range calibration",
        "Wiring or WiFi setup",
        "Sensitivity adjustment",
        "Testing & verification"
      ],
      issues: [
        { label: "Sensor not triggering", price: 50 },
        { label: "False alerts", price: 50 },
        { label: "Low range", price: 50 },
        { label: "Connectivity issues", price: 50 },
        { label: "Power supply fault", price: 50 }
      ]
    },

    {
      title: "Smart Security Device Setup",
      description: "Smart device installation service",
      image: smartsecuritydevicesetup,
      totalprice: "₹299",
      includedList: [
        "Smart hub connection",
        "WiFi pairing setup",
        "Device configuration",
        "App integration",
        "Functionality testing"
      ],
      issues: [
        { label: "Device not pairing", price: 40 },
        { label: "App-sync issues", price: 90 },
        { label: "Smart hub offline", price: 100 },
        { label: "Voice assistant errors", price: 70 },
        { label: "Battery or power issue", price: 60 }
      ]
    }
  ]
}

};