import React, { useMemo, useState } from "react";
import "./ServiceDetailsScreenWeb.css";
import watertank from "../../../assets/wtc.jpg"
import pipe from "../../../assets/pl.jpg"
import bathroom from "../../../assets/bf.jpg"
import tap from "../../../assets/tf.jpg"
import ep from "../../../assets/ep.jpg"
import ip from "../../../assets/ip.jpg"
import rp from "../../../assets/rp.jpg"
import wt from "../../../assets/wt.jpg"
import fan from "../../../assets/fan.jpg"
import wire from "../../../assets/wire.jpg"
import light from "../../../assets/li.jpg"
import power from "../../../assets/pbs.jpg"
import ai from "../../../assets/ai.jpg"
import agr from "../../../assets/agr.jpg"
import ags from "../../../assets/ags.jpg"
import au from "../../../assets/au.jpg"
import hc from "../../../assets/hc.jpg"
import fc from "../../../assets/fc.jpg"
import pc from "../../../assets/pc.jpg"
import wmp from "../../../assets/wmp.jpg"
// import BookCleaningScreenWeb from "./BookCleaningScreenWeb";

/* ---------------- CONSTANTS ---------------- */

const PROPERTY_TYPES = [
  { label: "1 BHK", value: "1bhk", floors: 1 },
  { label: "2 BHK", value: "2bhk", floors: 1 },
  { label: "3 BHK", value: "3bhk", floors: 2 },
  { label: "4 BHK", value: "4bhk", floors: 2 },
  { label: "Villa", value: "villa", floors: 3 },
  { label: "Duplex", value: "duplex", floors: 2 },
  { label: "Studio Apartment", value: "studio", floors: 1 },
];

const INTERNAL_SERVICES: Record<string, any[]> = {
  Plumbing: [
    { id: "p1", title: "Pipe Leakage", image: pipe, needsFloorInfo: true },
    { id: "p2", title: "Tap Fixing", image: tap },
    { id: "p3", title: "Bathroom Fitting", image: bathroom, needsFloorInfo: true },
    { id: "p4", title: "Water Tank Cleaning", image: watertank },
  ],

  Painting: [
    { id: "pa1", title: "Interior Painting", image: ip, needsFloorInfo: true },
    { id: "pa2", title: "Exterior Painting", image: ep, needsFloorInfo: true },
    { id: "pa3", title: "Wall Texture", image: wt, needsFloorInfo: true },
    { id: "pa4", title: "Repainting", image: rp, needsFloorInfo: true },
  ],

  Electrician: [
    { id: "e1", title: "Wiring", image: wire, needsFloorInfo: true },
    { id: "e2", title: "Fan Repair", image: fan},
    { id: "e3", title: "Light Installation", image: light },
    { id: "e4", title: "Power Backup Setup", image: power },
  ],

  // Kitchen: [
  //   { id: "k1", title: "Kitchen Cleaning", image: "https://images.unsplash.com/photo-1581579186988-ef1c93c9d5f1" },
  //   { id: "k2", title: "Chimney Service", image: "https://images.unsplash.com/photo-1600585153837-1f8e3e06d3f3" },
  //   { id: "k3", title: "Gas Stove Repair", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a" },
  //   { id: "k4", title: "Sink Installation", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b" },
  // ],

  "AC Repair": [
    { id: "a1", title: "AC Installation", image: ai, needsFloorInfo: true },
    { id: "a2", title: "AC Gas Refill", image: agr },
    { id: "a3", title: "AC General Service", image: ags },
    { id: "a4", title: "AC Uninstallation", image: au, needsFloorInfo: true },
  ],

  Chef: [
    { id: "c1", title: "Home Cooking", image: hc },
    { id: "c2", title: "Party Catering", image: pc },
    { id: "c3", title: "Weekly Meal Plan", image: wmp },
    { id: "c4", title: "Festival Cooking", image: fc },
  ],
};


const CONSULTATION_CHARGE = 50;

/* ---------------- COMPONENT ---------------- */

const ServiceDetailsScreenWeb: React.FC<{
  serviceTitle: string;
  onBack: () => void;
  onProceed: (data: {
    selectedServices: any[];
    consultationCharge: number;
  }) => void;
}> = ({ serviceTitle, onBack, onProceed }) => {

  const data = INTERNAL_SERVICES[serviceTitle] || [];

  const [propertyType, setPropertyType] = useState("2bhk");
  const [selected, setSelected] = useState<any[]>([]);
  const [floors, setFloors] = useState<Record<string, number>>({});
//  const [showBookingPopup, setShowBookingPopup] = useState(false);
// const [bookingPayload, setBookingPayload] = useState<{
//   selectedServices: any[];
//   consultationCharge: number;
// } | null>(null);


  const currentProperty = useMemo(
    () => PROPERTY_TYPES.find((p) => p.value === propertyType),
    [propertyType]
  );

  const maxFloors = currentProperty?.floors ?? 1;

  const toggleService = (item: any) => {
    const exists = selected.find((s) => s.id === item.id);
    if (exists) {
      setSelected(selected.filter((s) => s.id !== item.id));
      const copy = { ...floors };
      delete copy[item.id];
      setFloors(copy);
    } else {
      setSelected([...selected, item]);
      if (item.needsFloorInfo) {
        setFloors({ ...floors, [item.id]: 1 });
      }
    }
  };

  const updateFloor = (id: string, value: number) => {
    setFloors((f) => ({ ...f, [id]: value }));
  };

  const needsConsultation = selected.length > 1;

  return (
    <div className="sdw_root">
      {/* HEADER */}
      <header className="sdw_header">
        <button className="sdw_back" onClick={onBack}>←</button>
        <h1>{serviceTitle}</h1>
        <span />
      </header>

      {/* BODY */}
      <div className="sdw_body">
        <div className="sdw_section">
          <label>PROPERTY TYPE</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            {PROPERTY_TYPES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <p className="sdw_info">
            {currentProperty?.label} • {maxFloors} Floor(s)
          </p>
        </div>

        <h2>Select services for {serviceTitle}</h2>
        <p className="sdw_hint">(Select multiple for complete service package)</p>

        <div className="sdw_grid">
          {data.map((item) => {
            const isSelected = selected.some((s) => s.id === item.id);
            const floor = floors[item.id] || 1;

            return (
              <div key={item.id} className="sdw_cardWrap">
                <div
                  className={`sdw_card ${isSelected ? "active" : ""}`}
                  onClick={() => toggleService(item)}
                >
                  {isSelected && <span className="sdw_check">✓</span>}
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                  {item.needsFloorInfo && <span className="sdw_floorTag">Floor required</span>}
                </div>

                {isSelected && item.needsFloorInfo && (
                  <div className="sdw_floorCounter">
                    <button onClick={() => updateFloor(item.id, Math.max(1, floor - 1))}>−</button>
                    <span>Floor {floor}</span>
                    <button onClick={() => updateFloor(item.id, Math.min(maxFloors, floor + 1))}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="sdw_bottom">
        {needsConsultation && (
          <div className="sdw_warning">
            +${CONSULTATION_CHARGE} consultation charge for multiple services
          </div>
        )}

        <div className="sdw_footerRow">
          <div>
            <strong>{selected.length} Service(s) Selected</strong>
            <p>
              {selected.length <= 1
                ? "No consultation fee"
                : `Includes $${CONSULTATION_CHARGE} consultation`}
            </p>
          </div>

<button
  className={`sdw_proceed ${selected.length === 0 ? "disabled" : ""}`}
  disabled={selected.length === 0}
  onClick={() =>
    onProceed({
      selectedServices: selected,
      consultationCharge: needsConsultation ? CONSULTATION_CHARGE : 0,
    })
  }
>
  Proceed →
</button>



        </div>
      </footer>
      {/* {showBookingPopup && bookingPayload && (
  <div
    className="bc_modalOverlay"
    onClick={() => setShowBookingPopup(false)}
  >
    <div
      className="bc_modalCard bc_bookingModal"
      onClick={(e) => e.stopPropagation()}
    >
      <BookCleaningScreenWeb
        selectedServices={bookingPayload.selectedServices}
        consultationCharge={bookingPayload.consultationCharge}
        onClose={() => setShowBookingPopup(false)}
      />
    </div>
  </div>
)} */}

    </div>
  );
};

export default ServiceDetailsScreenWeb;
