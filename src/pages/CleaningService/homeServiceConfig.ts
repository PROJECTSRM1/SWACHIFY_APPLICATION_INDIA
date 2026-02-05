export type HomeServiceConfig = {
  category: string;
  title: string;
  rating: string;
  bookings: string;
  video: string;
  services: {
    id: string;
    title: string;
    price: number;
    duration: string;
    description: string;
  }[];
};

export const HOME_SERVICE_CONFIG: Record<string, HomeServiceConfig> = {
  "pipe-leakage": {
    category: "Plumbing",
    title: "Pipe Leakage Repair",
    rating: "4.8",
    bookings: "1.2M bookings",
    video: "https://assets.mixkit.co/videos/preview/mixkit-plumber-fixing-a-sink-1616-large.mp4",
    services: [
      {
        id: "inspection",
        title: "Leak Inspection",
        price: 199,
        duration: "30 mins",
        description: "Leak detection & diagnosis",
      },
      {
        id: "repair",
        title: "Pipe Repair",
        price: 499,
        duration: "60 mins",
        description: "Fixing leaks & pipe joints",
      },
    ],
  },

  "tap-fixing": {
    category: "Plumbing",
    title: "Tap Fixing",
    rating: "4.7",
    bookings: "900K bookings",
    video: "https://assets.mixkit.co/videos/preview/mixkit-plumber-installing-a-faucet-1617-large.mp4",
    services: [
      {
        id: "basic",
        title: "Tap Fixing",
        price: 299,
        duration: "30 mins",
        description: "Fix leakage & loose taps",
      },
    ],
  },

  "wiring": {
    category: "Electrician",
    title: "Electrical Wiring",
    rating: "4.9",
    bookings: "800K bookings",
    video: "https://assets.mixkit.co/videos/preview/mixkit-electrician-working-on-a-circuit-board-4822-large.mp4",
    services: [
      {
        id: "inspection",
        title: "Wiring Inspection",
        price: 249,
        duration: "30 mins",
        description: "Check wiring & safety",
      },
      {
        id: "repair",
        title: "Wiring Repair",
        price: 699,
        duration: "90 mins",
        description: "Replace & fix faulty wiring",
      },
      
    ],
  },
  "interior": {
  category: "Painting",
  title: "Interior Painting",
  rating: "4.8",
  bookings: "1M bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-painter-painting-a-wall-3976-large.mp4",
  services: [
    {
      id: "1bhk",
      title: "1 BHK Interior Painting",
      price: 4999,
      duration: "1 day",
      description: "Premium interior paint for 1 BHK",
    },
    {
      id: "2bhk",
      title: "2 BHK Interior Painting",
      price: 7999,
      duration: "2 days",
      description: "Complete interior painting for 2 BHK",
    },
  ],
},

"exterior": {
  category: "Painting",
  title: "Exterior Painting",
  rating: "4.7",
  bookings: "750K bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-painting-a-house-exterior-4069-large.mp4",
  services: [
    {
      id: "basic",
      title: "Exterior Painting",
      price: 9999,
      duration: "3 days",
      description: "Weather-resistant exterior paint",
    },
  ],
},
"gas-refill": {
  category: "AC Repair",
  title: "AC Gas Refill",
  rating: "4.7",
  bookings: "1.1M bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-ac-technician-refilling-gas-4371-large.mp4",
  services: [
    {
      id: "partial",
      title: "Partial Gas Refill",
      price: 2499,
      duration: "60 mins",
      description: "Top-up gas for cooling issues",
    },
    {
      id: "full",
      title: "Full Gas Refill",
      price: 3499,
      duration: "90 mins",
      description: "Complete gas refill with leak check",
    },
  ],
},
"general-service": {
  category: "AC Repair",
  title: "AC General Service",
  rating: "4.9",
  bookings: "2.2M bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-technician-cleaning-ac-filters-4372-large.mp4",
  services: [
    {
      id: "basic",
      title: "General AC Service",
      price: 599,
      duration: "45 mins",
      description: "Filter cleaning & performance check",
    },
  ],
},
"home-cooking": {
  category: "Chef",
  title: "Home Cooking",
  rating: "4.8",
  bookings: "650K bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-at-home-4320-large.mp4",
  services: [
    {
      id: "daily",
      title: "Daily Home Cooking",
      price: 799,
      duration: "2 hrs",
      description: "Fresh daily meals prepared at your home",
    },
  ],
},

"party-catering": {
  category: "Chef",
  title: "Party Catering",
  rating: "4.9",
  bookings: "420K bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-chef-serving-food-at-event-4321-large.mp4",
  services: [
    {
      id: "basic",
      title: "Small Party Catering",
      price: 4999,
      duration: "1 day",
      description: "Catering for small gatherings",
    },
  ],
},

"weekly-meal-plan": {
  category: "Chef",
  title: "Weekly Meal Plan",
  rating: "4.7",
  bookings: "300K bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-meal-prep-in-kitchen-4322-large.mp4",
  services: [
    {
      id: "veg",
      title: "Vegetarian Weekly Plan",
      price: 2499,
      duration: "7 days",
      description: "Healthy veg meals for a week",
    },
  ],
},

"festival-cooking": {
  category: "Chef",
  title: "Festival Cooking",
  rating: "4.9",
  bookings: "180K bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-festival-cooking-4323-large.mp4",
  services: [
    {
      id: "festive",
      title: "Festival Special Cooking",
      price: 3499,
      duration: "1 day",
      description: "Traditional festive dishes",
    },
  ],
},



"installation": {
  category: "AC Repair",
  title: "AC Installation",
  rating: "4.8",
  bookings: "1.4M bookings",
  video: "https://assets.mixkit.co/videos/preview/mixkit-technician-installing-an-air-conditioner-4370-large.mp4",
  services: [
    {
      id: "split-install",
      title: "Split AC Installation",
      price: 1499,
      duration: "90 mins",
      description: "Professional split AC installation",
    },
    {
      id: "window-install",
      title: "Window AC Installation",
      price: 999,
      duration: "60 mins",
      description: "Quick window AC installation",
    },
  ],
  
},

};
