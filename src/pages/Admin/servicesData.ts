// servicesData.ts

export interface SubService {
  id: string;
  name: string;
  description: string;
  imageFile?: any;     // ⭐ ADDED
}


export interface SubCategory {
  id: string;
  name: string;
  description: string;
  imageFile?: any;     // ⭐ ADDED
  services: SubService[];
}


export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  subcategories: SubCategory[];
}

export const ServiceCategories: Category[] = [
  {
    id: "CAT001",
    name: "Transport",
    description: "Passenger, logistics, rental and specialized transport services",
    subcategories: [
      {
        id: "TR001",
        name: "Passenger Transport",
        description: "Taxi, cab, shuttle and transfer services",
        services: [
          { id: "S001", name: "Local Taxi", description: "City ride services" },
          { id: "S002", name: "Carpooling", description: "Shared ride options" },
          { id: "S003", name: "Shuttle Service", description: "Airport shuttle" }
        ]
      },
      {
        id: "TR002",
        name: "Logistics & Cargo",
        description: "Goods delivery and cargo forwarding",
        services: [
          { id: "S004", name: "Goods Delivery", description: "Fast transport" },
          { id: "S005", name: "Intercity Transport", description: "Long routes" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // NEW: Home Cleaning & Services - ADDED LIKE TRANSPORT
  // ------------------------------------------------------------------
  {
    id: "CAT002",
    name: "Home & Cleaning Services",
    description: "Home maintenance & cleaning services",
    subcategories: [
      {
        id: "HC001",
        name: "Deep Cleaning",
        description: "Full home cleaning services",
        services: [
          { id: "HC_S001", name: "Bathroom Cleaning", description: "Tile scrubbing & sanitization" },
          { id: "HC_S002", name: "Kitchen Cleaning", description: "Oil removal & chimney cleaning" }
        ]
      },
      {
        id: "HC002",
        name: "Plumbing",
        description: "Leak repair and pipeline maintenance",
        services: [
          { id: "HC_S003", name: "Tap Repair", description: "Fix leaking taps" },
          { id: "HC_S004", name: "Pipe Fixing", description: "PVC & metal pipe service" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // NEW: Buy Sale Rentals
  // ------------------------------------------------------------------
  {
    id: "CAT003",
    name: "Buy/Sale/Rentals",
    description: "Buy or rent properties and vehicles",
    subcategories: [
      {
        id: "BS001",
        name: "Property Rental",
        description: "Home, shop & commercial rentals",
        services: [
          { id: "BS_S001", name: "Apartment Rent", description: "1BHK, 2BHK, 3BHK options" },
          { id: "BS_S002", name: "Commercial Rent", description: "Shops and offices" }
        ]
      },
      {
        id: "BS002",
        name: "Vehicle Sales",
        description: "Used car and bike sales",
        services: [
          { id: "BS_S003", name: "Used Cars", description: "Certified cars available" },
          { id: "BS_S004", name: "Used Bikes", description: "Budget friendly" }
        ]
      }
    ]
  },

  // ------------------------------------------------------------------
  // NEW: Construction Raw Materials
  // ------------------------------------------------------------------
  {
    id: "CAT004",
    name: "Construction Raw Materials",
    description: "Cement, steel & building materials",
    subcategories: [
      {
        id: "CR001",
        name: "Cement Supply",
        description: "Bulk cement delivery",
        services: [
          { id: "CR_S001", name: "OPC Cement", description: "High grade strength" },
          { id: "CR_S002", name: "PPC Cement", description: "Durable & crack resistant" }
        ]
      },
      {
        id: "CR002",
        name: "Steel Supply",
        description: "Premium quality rods & bars",
        services: [
          { id: "CR_S003", name: "TMT Bars", description: "Construction reinforcement" },
          { id: "CR_S004", name: "MS Sheets", description: "Industrial usage" }
        ]
      }
    ]
  }
];