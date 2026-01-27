import React, { useMemo, useState } from "react";
import {
  MdArrowBack,
  MdDirectionsCar,
  MdTwoWheeler,
  MdLocalShipping,
  MdStar,
  MdClose,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import "./VehicleSubWeb.css";

/* ================= TYPES ================= */

type VehicleType = "car" | "bike" | "truck";

type SubService = {
  id: string;
  name: string;
  price: number;
  selected: boolean;
};

type GaragePackage = {
  id: string;
  name: string;
  garageName: string;
  address: string;
  rating: string;
  basePrice: number;
};

type Employee = {
  id: string;
  name: string;
  rating: string;
  image: string;
};

type Props = {
  onClose: () => void;
  onContinue: (payload: {
    selectedServices: string[];
    consultationCharge: number;
    meta: any;
  }) => void;
};

/* ================= DATA ================= */

const VEHICLE_DATA: Record<VehicleType, any> = {
  car: {
    icon: <MdDirectionsCar />,
    brands: ["Maruti", "Hyundai", "Tata"],
    fuel: ["Petrol", "Diesel", "EV"],
  },
  bike: {
    icon: <MdTwoWheeler />,
    brands: ["Hero", "Honda", "Royal Enfield"],
    fuel: ["Petrol", "Electric"],
  },
  truck: {
    icon: <MdLocalShipping />,
    brands: ["Tata", "Ashok Leyland"],
    fuel: ["Diesel", "CNG"],
  },
};

const SUB_SERVICES: Record<VehicleType, SubService[]> = {
  car: [
    { id: "c1", name: "Engine Oil Replacement", price: 1500, selected: true },
    { id: "c2", name: "Oil Filter Change", price: 450, selected: true },
    { id: "c3", name: "AC Filter Cleaning", price: 600, selected: false },
  ],
  bike: [
    { id: "b1", name: "Chain Lubrication", price: 150, selected: true },
    { id: "b2", name: "Spark Plug Cleaning", price: 100, selected: true },
  ],
  truck: [
    { id: "t1", name: "Hydraulic Check", price: 2500, selected: true },
    { id: "t2", name: "Heavy Oil Change", price: 4500, selected: true },
  ],
};

const EMPLOYEES: Employee[] = [
  {
    id: "e1",
    name: "Rahul M.",
    rating: "4.8",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "e2",
    name: "Suresh K.",
    rating: "4.9",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

/* ================= COMPONENT ================= */

const VehicleSubWeb: React.FC<Props> = ({ onClose, onContinue }) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");
  const [brand, setBrand] = useState(VEHICLE_DATA.car.brands[0]);
  const [fuel, setFuel] = useState(VEHICLE_DATA.car.fuel[0]);

  const [selectedPackage, setSelectedPackage] =
    useState<GaragePackage | null>(null);

  const [services, setServices] = useState<SubService[]>(SUB_SERVICES.car);
  const [description, setDescription] = useState("");
  const [selectedEmp, setSelectedEmp] = useState<Employee>(EMPLOYEES[0]);

  const packages: GaragePackage[] = [
    {
      id: "p1",
      name: "Standard Service",
      garageName: "Supreme Car Care",
      address: "Rajkot",
      rating: "4.8",
      basePrice: 1200,
    },
    {
      id: "p2",
      name: "Comprehensive Care",
      garageName: "Apex Auto Garage",
      address: "GIDC Rajkot",
      rating: "4.9",
      basePrice: 2500,
    },
  ];

  const totalPrice = useMemo(() => {
    const servicesTotal = services.reduce(
      (sum, s) => (s.selected ? sum + s.price : sum),
      0
    );
    return servicesTotal + (selectedPackage?.basePrice || 0);
  }, [services, selectedPackage]);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, selected: !s.selected } : s
      )
    );
  };

  const handleVehicleChange = (type: VehicleType) => {
    setVehicleType(type);
    setBrand(VEHICLE_DATA[type].brands[0]);
    setFuel(VEHICLE_DATA[type].fuel[0]);
    setServices(SUB_SERVICES[type]);
  };

  /* ================= RENDER ================= */

  return (
    <div className="vs_page">
      <header className="vs_header">
        <button onClick={onClose}>
          <MdArrowBack size={22} />
        </button>
        <h1>Vehicle Services</h1>
        <div />
      </header>

      <main className="vs_main">
        {/* VEHICLE TYPE */}
        <div className="vs_typeRow">
          {(Object.keys(VEHICLE_DATA) as VehicleType[]).map((type) => (
            <button
              key={type}
              className={`vs_typeBtn ${
                vehicleType === type ? "active" : ""
              }`}
              onClick={() => handleVehicleChange(type)}
            >
              {VEHICLE_DATA[type].icon}
              <span>{type.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* BRAND & FUEL */}
        <div className="vs_row">
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            {VEHICLE_DATA[vehicleType].brands.map((b: string) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
            {VEHICLE_DATA[vehicleType].fuel.map((f: string) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* GARAGES */}
        <h3>Available Garages</h3>
        <div className="vs_garageGrid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="vs_garageCard">
              <h4>{pkg.garageName}</h4>
              <p>{pkg.address}</p>
              <p>
                <MdStar /> {pkg.rating}
              </p>
              <button onClick={() => setSelectedPackage(pkg)}>
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedPackage && (
          <div className="vs_modal">
            <div className="vs_modalCard">
              <button
                className="vs_close"
                onClick={() => setSelectedPackage(null)}
              >
                <MdClose />
              </button>

              <h2>{selectedPackage.name}</h2>

              {services.map((s) => (
                <div
                  key={s.id}
                  className="vs_checkRow"
                  onClick={() => toggleService(s.id)}
                >
                  {s.selected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                  <span>{s.name}</span>
                  <strong>₹{s.price}</strong>
                </div>
              ))}

              <textarea
                placeholder="Problem description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <h4>Allocate Professional</h4>
              <div className="vs_empRow">
                {EMPLOYEES.map((emp) => (
                  <button
                    key={emp.id}
                    className={`vs_emp ${
                      emp.id === selectedEmp.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedEmp(emp)}
                  >
                    <img src={emp.image} />
                    <span>{emp.name}</span>
                    <small>⭐ {emp.rating}</small>
                  </button>
                ))}
              </div>

              {/* ✅ BOOK NOW → OPENS BookCleaning */}
              <div className="vs_footer">
                <strong>₹ {totalPrice}</strong>
                <button
                  onClick={() =>
                    onContinue({
                      selectedServices: [
                        `Vehicle Service - ${vehicleType.toUpperCase()} (${selectedPackage.name})`,
                      ],
                      consultationCharge: totalPrice,
                      meta: {
                        vehicleType,
                        brand,
                        fuel,
                        package: selectedPackage,
                        services: services.filter((s) => s.selected),
                        employee: selectedEmp,
                        description,
                      },
                    })
                  }
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VehicleSubWeb;
