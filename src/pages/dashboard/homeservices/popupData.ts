import cleaning from "../../../assets/HomeServices/cleaningservicessubmodules/home cleaning.jpg"
import mattress from "../../../assets/HomeServices/cleaningservicessubmodules/mattress cleaning.jpg"
import kitchen from "../../../assets/HomeServices/cleaningservicessubmodules/kitchen cleaning.jpg"
import bathroom from "../../../assets/HomeServices/cleaningservicessubmodules/bathroom cleaning.jpg"
import pestcontroll from "../../../assets/HomeServices/cleaningservicessubmodules/Pest Control & Disinfection.jpg"
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
export const popupData: PopupDataType =
 
{

  "Cleaning Services": {
  mainTitle: "Cleaning Services",
  subServices: [
    {
      title: "Home Cleaning",
      description: "Complete home cleaning with sanitation",
      image: cleaning,
      price: "₹799",
      includedList: [
        "Professional staff",
        "Eco-friendly products",
        "Floor & surface cleaning",
        "Kitchen & bathroom touch-up",
        "Post-service inspection"
      ],
      issues: [
        "Dust build-up",
        "Dirty floors",
        "Unclean surfaces",
        "Mild stains",
        "General cleaning needs"
      ]
    },

    {
      title: "Mattress Cleaning",
      description: "Deep mattress cleaning and sanitizing",
      image: mattress,
      price: "₹499",
      includedList: [
        "Deep vacuuming",
        "Dust mite removal",
        "Anti-bacterial treatment",
        "Spot stain cleaning",
        "Deep sanitization"
      ],
      issues: [
        "Bad odor",
        "Dust mites",
        "Sweat stains",
        "Allergy issues",
        "General dirt"
      ]
    },

    {
      title: "Kitchen Cleaning",
      description: "Deep kitchen cleaning and degreasing",
      image: kitchen,
      price: "₹649",
      includedList: [
        "Grease removal",
        "Cabinet exterior cleaning",
        "Appliance wipe-down",
        "Sink sanitation",
        "Floor scrubbing"
      ],
      issues: [
        "Grease build-up",
        "Dirty tiles",
        "Stove stains",
        "Unclean sink",
        "General kitchen dirt"
      ]
    },

    {
      title: "Bathroom Cleaning",
      description: "Deep bathroom cleaning and sanitizing",
      image: bathroom,
      price: "₹549",
      includedList: [
        "Tile scrubbing",
        "Hard water stain removal",
        "Toilet deep cleaning",
        "Glass cleaning",
        "Germicidal sanitization"
      ],
      issues: [
        "Hard water stains",
        "Dirty tiles",
        "Bad odor",
        "Soap scum",
        "General bathroom dirt"
      ]
    },

    {
      title: "Pest Control & Disinfection",
      description: "Pest removal with complete disinfection",
      image: pestcontroll,
      price: "₹899",
      includedList: [
        "Odorless chemicals",
        "Cockroach/ant control",
        "Gel & spray treatment",
        "Home disinfection",
        "Safety-compliant process"
      ],
      issues: [
        "Cockroach infestation",
        "Ants/insects",
        "Mosquito breeding",
        "Germs & bacteria",
        "General pest issues"
      ]
    }
  ]
},



"Electrical Services": {
  mainTitle: "Electrical Services",
  subServices: [
    {
      title: "Wiring & Lighting Install",
      description: "Professional wiring and lighting installation",
      image: wiringlighting,
      price: "₹130",
      includedList: [
        "Certified technician",
        "Safety compliance",
        "Quality tools",
        "Post-service cleanup",
        "Quick installation"
      ],
      issues: [
        "Wiring issue",
        "Bulb not working",
        "Short circuit",
        "Switch issue",
        "Loose connections"
      ]
    },

    {
      title: "Fan Appliances Repair",
      description: "Expert repair for all fans",
      image: fanappliances,
      price: "₹199",
      includedList: [
        "Genuine spare parts",
        "Warranty included",
        "Expert electrician",
        "Quick diagnosis",
        "Quality repair work"
      ],
      issues: [
        "Fan not rotating",
        "Fan making noise",
        "Fan not starting",
        "Regulator issue",
        "Low fan speed"
      ]
    },

    {
      title: "Circuit Breaker & Switchboard Fixing",
      description: "Circuit breaker and switchboard repair",
      image: circuitbreaker,
      price: "₹199",
      includedList: [
        "Genuine spare parts",
        "Warranty included",
        "Expert electrician",
        "Safety inspection",
        "Fast restoration"
      ],
      issues: [
        "Breaker tripping",
        "Overload issues",
        "Loose switches",
        "Socket not working",
        "Sparking problem"
      ]
    },

    {
      title: "Smart Home Device Installation",
      description: "Smart device setup and configuration",
      image: smarthomedevice,
      price: "₹199",
      includedList: [
        "Device configuration",
        "Warranty included",
        "Expert electrician",
        "App connectivity setup",
        "Testing & verification"
      ],
      issues: [
        "Device not pairing",
        "Connectivity issues",
        "Incorrect setup",
        "App integration problems",
        "Power supply issues"
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
      price: "₹499",
      includedList: [
        "Certified technician",
        "Quality tools and equipment",
        "Leak source detection",
        "Service warranty",
        "Post-service cleanup"
      ],
      issues: [
        "Tap leakage",
        "Pipe leakage",
        "Water dripping",
        "Joint loose",
        "Moisture patches"
      ]
    },

    {
      title: "Pipe Fitting",
      description: "Professional installation of new pipes",
      image: pipefittings,
      price: "₹299",
      includedList: [
        "Quality fittings used",
        "Skilled plumber",
        "Accurate measurements",
        "Secure sealing",
        "Post-installation testing"
      ],
      issues: [
        "Loose pipe joints",
        "Pipe replacement needed",
        "Low water flow",
        "Pipe cracks",
        "Improper fitting"
      ]
    },

    {
      title: "Geyser Installation",
      description: "Safe and secure geyser installation",
      image: Geyserinstallation,
      price: "₹299",
      includedList: [
        "Secure wall mounting",
        "Pipe and valve setup",
        "Safety checkup",
        "Electrical connection check",
        "Installation warranty"
      ],
      issues: [
        "Geyser not heating",
        "Water leakage",
        "Incorrect installation",
        "Pipe fitting issue",
        "Pressure problems"
      ]
    },

    {
      title: "Bathroom Fitting",
      description: "Complete bathroom fixtures installation",
      image: Bathroomfittings,
      price: "₹299",
      includedList: [
        "Tap installation",
        "Shower setup",
        "Washbasin fitting",
        "Leak testing",
        "Quality hardware used"
      ],
      issues: [
        "Tap loose",
        "Shower leakage",
        "Broken fittings",
        "Low water pressure",
        "Improper installation"
      ]
    },

    {
      title: "Water Tank",
      description: "Water tank cleaning and maintenance",
      image: Watertank,
      price: "₹299",
      includedList: [
        "Tank scrubbing",
        "Sludge removal",
        "Water disinfectant",
        "Inlet/outlet cleaning",
        "Complete drying"
      ],
      issues: [
        "Dirty water",
        "Foul smell",
        "Algae build-up",
        "Sediment accumulation",
        "Overflow issues"
      ]
    },

    {
      title: "Drain Cleaning",
      description: "Clogged drain clearing and cleaning",
      image: Drincleaning,
      price: "₹299",
      includedList: [
        "Clog inspection",
        "Drain snaking",
        "Blockage removal",
        "Odor treatment",
        "Flow testing"
      ],
      issues: [
        "Drain blockage",
        "Slow water flow",
        "Bad drain smell",
        "Grease buildup",
        "Hair clogging"
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
      price: "₹499",
      includedList: [
        "Certified technician",
        "Cooling efficiency check",
        "Gas level inspection",
        "Electrical safety check",
        "Post-service cleanup"
      ],
      issues: [
        "AC not cooling",
        "Water leakage",
        "Bad smell",
        "Low airflow",
        "Compressor issue"
      ]
    },

    {
      title: "Refrigerator Repair",
      description: "Reliable fridge repair and servicing",
      image: refrigeratorrepair,
      price: "₹299",
      includedList: [
        "Thermostat check",
        "Cooling issue diagnosis",
        "Genuine spare parts",
        "Expert technician",
        "Post-repair testing"
      ],
      issues: [
        "Not cooling",
        "Water leakage",
        "Freezer over-icing",
        "Noise from compressor",
        "Door not sealing"
      ]
    },

    {
      title: "Washing Machine Repairs",
      description: "Complete washing machine repair service",
      image: washingrepair,
      price: "₹299",
      includedList: [
        "Drum inspection",
        "Motor check",
        "Spin cycle testing",
        "Genuine spare parts",
        "Service warranty"
      ],
      issues: [
        "Machine not spinning",
        "Water not draining",
        "Motor noise",
        "Vibration issues",
        "Door not locking"
      ]
    },

    {
      title: "Microwave Servicing",
      description: "Microwave heating and repair service",
      image: microwave,
      price: "₹299",
      includedList: [
        "Heating coil check",
        "Door sensor testing",
        "Internal cleaning",
        "High-voltage inspection",
        "Service warranty"
      ],
      issues: [
        "Not heating",
        "Plate not rotating",
        "Sparking inside",
        "Burning smell",
        "Button malfunction"
      ]
    },

    {
      title: "TV Servicing",
      description: "Expert LED and LCD servicing",
      image: tvservice,
      price: "₹299",
      includedList: [
        "Screen inspection",
        "Motherboard testing",
        "Sound issue diagnosis",
        "Port checkup",
        "Service warranty"
      ],
      issues: [
        "No display",
        "No sound",
        "Lines on screen",
        "Port not working",
        "Remote not responding"
      ]
    },

    {
      title: "Regular Maintenance",
      description: "Routine appliance check and servicing",
      image: regularmaintance,
      price: "₹299",
      includedList: [
        "Full appliance inspection",
        "Cleaning and lubrication",
        "Performance testing",
        "Safety check",
        "Maintenance report"
      ],
      issues: [
        "Low performance",
        "Overheating issues",
        "Noise from appliance",
        "Irregular functioning",
        "Wear and tear"
      ]
    },

    {
      title: "Spare Parts & Replacement",
      description: "Genuine spare parts with installation",
      image: sparepart,
      price: "₹299",
      includedList: [
        "Original spare parts",
        "Expert fitting",
        "Safety testing",
        "Warranty included",
        "Post-installation check"
      ],
      issues: [
        "Broken components",
        "Damaged wiring",
        "Worn-out parts",
        "Non-functional buttons",
        "Motor or compressor faults"
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
      price: "₹499",
      includedList: [
        "Skilled carpenter",
        "Custom design support",
        "Quality wood materials",
        "Precision cutting",
        "Smooth finishing"
      ],
      issues: [
        "New furniture requirement",
        "Custom size needed",
        "Design modification",
        "Material selection help",
        "Loose structure concerns"
      ]
    },

    {
      title: "Furniture Repair",
      description: "Reliable repair for damaged furniture",
      image: furniturerepair,
      price: "₹299",
      includedList: [
        "Joint tightening",
        "Surface polishing",
        "Wood repair materials",
        "Hardware replacement",
        "Service warranty"
      ],
      issues: [
        "Broken furniture",
        "Loose joints",
        "Scratches & dents",
        "Damaged hinges",
        "Cracked wood"
      ]
    },

    {
      title: "Doors And Windows Fixing",
      description: "Repairing wooden doors and windows",
      image: doorwindows,
      price: "₹299",
      includedList: [
        "Hinge adjustment",
        "Lock repair",
        "Frame alignment",
        "Smooth door movement",
        "Noise reduction"
      ],
      issues: [
        "Door not closing",
        "Window jammed",
        "Loose hinges",
        "Lock not working",
        "Frame misalignment"
      ]
    },

    {
      title: "Wardrobe And Cabinet Installation",
      description: "Professional wardrobe and cabinet setup",
      image: wardrob,
      price: "₹299",
      includedList: [
        "Accurate measurement",
        "Wall anchoring",
        "Hardware installation",
        "Smooth sliding setup",
        "Post-installation testing"
      ],
      issues: [
        "Cabinet misalignment",
        "Broken hinges",
        "Loose shelves",
        "Sliding not smooth",
        "New installation required"
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
      price: "₹499",
      includedList: [
        "Wall sanding",
        "Primer application",
        "Quality paint materials",
        "Furniture covering",
        "Post-paint cleanup"
      ],
      issues: [
        "Wall discoloration",
        "Peeling paint",
        "Cracks on wall",
        "Faded colors",
        "Moisture patches"
      ]
    },

    {
      title: "Exterior Painting",
      description: "Durable exterior wall painting",
      image: exteriorpainting,
      price: "₹299",
      includedList: [
        "Weatherproof paint",
        "Surface washing",
        "Crack sealing",
        "Primer coating",
        "Professional painters"
      ],
      issues: [
        "Paint fading",
        "Exterior cracks",
        "Water damage marks",
        "Wall roughness",
        "Peeling layers"
      ]
    },

    {
      title: "Wallpaper And Touch-Up Works",
      description: "Stylish wallpaper and touchups",
      image: wallpaper,
      price: "₹299",
      includedList: [
        "Wallpaper installation",
        "Bubble removal",
        "Wall smoothening",
        "Design alignment",
        "Minor paint touchups"
      ],
      issues: [
        "Wallpaper peeling",
        "Wall bubbles",
        "Misalignment issues",
        "Minor cracks",
        "Paint scratches"
      ]
    },

    {
      title: "Water Proofing",
      description: "Effective leakage and seepage protection",
      image: waterproof,
      price: "₹299",
      includedList: [
        "Crack filling",
        "Waterproof coating",
        "Chemical treatment",
        "Leak prevention",
        "Moisture inspection"
      ],
      issues: [
        "Wall seepage",
        "Water leakage",
        "Damp patches",
        "Ceiling moisture",
        "Crack water flow"
      ]
    },

    {
      title: "Wall Repair",
      description: "Professional wall crack repairs",
      image: wallrepair,
      price: "₹299",
      includedList: [
        "Crack filling",
        "Hole patching",
        "Surface leveling",
        "Primer coat",
        "Finish sanding"
      ],
      issues: [
        "Wall cracks",
        "Holes in wall",
        "Uneven surface",
        "Chipped plaster",
        "Damaged corners"
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
      price: "₹499",
      includedList: [
        "Proper wall mounting",
        "Pipe connection setup",
        "Gas level check",
        "Electrical safety check",
        "Post-install testing"
      ],
      issues: [
        "Water leakage",
        "Improper cooling",
        "Vibration issues",
        "Loose mounting",
        "High noise"
      ]
    },

    {
      title: "AC Service",
      description: "Complete AC cleaning service",
      image: acservice,
      price: "₹299",
      includedList: [
        "Filter wash",
        "Cooling coil cleaning",
        "Drain pipe cleaning",
        "Gas pressure check",
        "Outer panel cleaning"
      ],
      issues: [
        "Low cooling",
        "Bad smell",
        "Water dripping",
        "Dirty filters",
        "High power usage"
      ]
    },

    {
      title: "AC Duct Cleaning",
      description: "Deep duct airflow cleaning",
      image: acduct,
      price: "₹299",
      includedList: [
        "Dust removal",
        "Duct sanitization",
        "Blower cleaning",
        "Vent inspection",
        "Airflow improvement"
      ],
      issues: [
        "Dust in vents",
        "Low airflow",
        "Bad odor",
        "Allergy triggers",
        "Clogged ducts"
      ]
    },

    {
      title: "AC Filter Replacement",
      description: "Quick filter replacement service",
      image: acfilter,
      price: "₹299",
      includedList: [
        "New filter installation",
        "Filter quality check",
        "Unit inspection",
        "Safety verification",
        "Cooling test"
      ],
      issues: [
        "Dirty filters",
        "Weak cooling",
        "Bad airflow",
        "High noise",
        "Odor issues"
      ]
    },

    {
      title: "Cooling System Maintenance",
      description: "Complete cooling system checkup",
      image: cooling,
      price: "₹299",
      includedList: [
        "Compressor check",
        "Thermostat testing",
        "Cooling efficiency check",
        "Gas pressure inspection",
        "Electrical connection check"
      ],
      issues: [
        "Frequent breakdowns",
        "Cooling delay",
        "Thermostat issues",
        "Gas leakage",
        "Overheating"
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
      price: "₹130",
      includedList: [
        "Grass trimming",
        "Weed removal",
        "Edge shaping",
        "Leaf clearing",
        "Waste disposal"
      ],
      issues: [
        "Overgrown grass",
        "Weed spread",
        "Uneven edges",
        "Dry patches",
        "Insect damage"
      ]
    },

    {
      title: "Landscaping",
      description: "Complete garden design service",
      image: landscaping,
      price: "₹199",
      includedList: [
        "Garden planning",
        "Plant selection",
        "Soil preparation",
        "Installation support",
        "Finishing touches"
      ],
      issues: [
        "Poor layout",
        "Unhealthy plants",
        "Soil imbalance",
        "Patchy design",
        "Water drainage issue"
      ]
    },

    {
      title: "Outdoor Cleaning",
      description: "Thorough outdoor area cleaning",
      image: outdoorcleaning,
      price: "₹199",
      includedList: [
        "Surface washing",
        "Debris removal",
        "Pressure cleaning",
        "Moss cleanup",
        "Walkway clearing"
      ],
      issues: [
        "Dirty pathways",
        "Excess leaves",
        "Moss buildup",
        "Outdoor stains",
        "Garbage accumulation"
      ]
    },

    {
      title: "Garden Pest Control & Care",
      description: "Garden pest removal treatment",
      image: gardenpest,
      price: "₹199",
      includedList: [
        "Safe chemicals",
        "Plant protection",
        "Complete inspection",
        "Pest elimination",
        "Aftercare tips"
      ],
      issues: [
        "Plant pests",
        "Leaf damage",
        "Soil insects",
        "Fungal infection",
        "Plant wilting"
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
      price: "₹499",
      includedList: [
        "Accurate wall measurement",
        "Sturdy mounting brackets",
        "Cable management",
        "Safety check",
        "Quick installation"
      ],
      issues: [
        "Loose TV mount",
        "Tilt not working",
        "Wall alignment issue",
        "Bracket replacement needed",
        "Drilling support required"
      ]
    },

    {
      title: "Shelf Mounting",
      description: "Wall shelf installation help",
      image: shelfmounting,
      price: "₹299",
      includedList: [
        "Proper level alignment",
        "Strong fasteners",
        "Drilling and fitting",
        "Load testing",
        "Cleanup after work"
      ],
      issues: [
        "Shelf not level",
        "Loose screws",
        "Wall cracks",
        "Incorrect placement",
        "Heavy load concerns"
      ]
    },

    {
      title: "Fixture Repair",
      description: "Minor home fixture repair",
      image: fixturerepair,
      price: "₹299",
      includedList: [
        "Inspection of fixture",
        "Minor adjustments",
        "Replacement parts (if needed)",
        "Secure fitting",
        "Functionality testing"
      ],
      issues: [
        "Loose handles",
        "Broken hinges",
        "Damaged fixtures",
        "Misalignment",
        "Wear and tear"
      ]
    },

    {
      title: "Furniture Repair",
      description: "Basic furniture fixing service",
      image: furniturerepair,
      price: "₹299",
      includedList: [
        "Minor wood repair",
        "Loose joint fixing",
        "Hardware replacement",
        "Alignment correction",
        "Finishing touches"
      ],
      issues: [
        "Loose joints",
        "Wobbling chair",
        "Broken drawer",
        "Cracked wood",
        "Damaged hinges"
      ]
    },

    {
      title: "Minor Home Maintenance",
      description: "Small home fixes service",
      image: minorhome,
      price: "₹299",
      includedList: [
        "General inspections",
        "Minor repairs",
        "Hardware tightening",
        "Basic replacements",
        "Quick handyman support"
      ],
      issues: [
        "Loose fittings",
        "Wall damage",
        "Small cracks",
        "Stuck doors",
        "Minor wear issues"
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
      price: "₹499",
      includedList: [
        "HD camera setup",
        "Cable routing & fixing",
        "Mobile app configuration",
        "DVR/NVR setup",
        "System testing"
      ],
      issues: [
        "Camera not recording",
        "Blurry video feed",
        "App not connecting",
        "Cable damage",
        "DVR storage issues"
      ]
    },

    {
      title: "Door Lock Installation",
      description: "Secure lock fitting service",
      image: doorlock,
      price: "₹299",
      includedList: [
        "Lock alignment",
        "Door drilling (if needed)",
        "Hardware installation",
        "Key functionality check",
        "Secure fitting"
      ],
      issues: [
        "Loose lock",
        "Key not turning",
        "Broken latch",
        "Door misalignment",
        "Lock replacement needed"
      ]
    },

    {
      title: "Alarm System Setup",
      description: "House alarm installation service",
      image: alaramsystem,
      price: "₹299",
      includedList: [
        "Sensor placement",
        "Control panel setup",
        "App connectivity",
        "Alert testing",
        "Safety configuration"
      ],
      issues: [
        "No alarm sound",
        "Sensor not detecting",
        "Mobile alerts not working",
        "Wiring fault",
        "Low battery issue"
      ]
    },

    {
      title: "Motion Sensor Systems",
      description: "Motion sensor setup service",
      image: motioncensor,
      price: "₹299",
      includedList: [
        "Sensor positioning",
        "Range calibration",
        "Wiring or WiFi setup",
        "Sensitivity adjustment",
        "Testing & verification"
      ],
      issues: [
        "Sensor not triggering",
        "False alerts",
        "Low range",
        "Connectivity issues",
        "Power supply fault"
      ]
    },

    {
      title: "Smart Security Device Setup",
      description: "Smart device installation service",
      image: smartsecuritydevicesetup,
      price: "₹299",
      includedList: [
        "Smart hub connection",
        "WiFi pairing setup",
        "Device configuration",
        "App integration",
        "Functionality testing"
      ],
      issues: [
        "Device not pairing",
        "App-sync issues",
        "Smart hub offline",
        "Voice assistant errors",
        "Battery or power issue"
      ]
    }
  ]
}

};

