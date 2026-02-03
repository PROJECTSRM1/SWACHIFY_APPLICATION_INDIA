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
};
