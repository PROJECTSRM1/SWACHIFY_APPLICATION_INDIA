interface Props {
  searchQuery?: string;
  clearSearch?: () => void;
}

import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, Layout, Modal, Radio, Select,  } from "antd";
import { AimOutlined, BankOutlined, DownOutlined, EnvironmentOutlined, HomeOutlined, SearchOutlined, ThunderboltOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import bike from "../../../assets/JustRide/bike.jpg"
import scooty from "../../../assets/JustRide/scooty.jpg";
import auto from "../../../assets/JustRide/auto.jpg";
import car from "../../../assets/JustRide/car.png";
  ;

import { useNavigate } from "react-router-dom";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { Sider, Content } = Layout;

/* MAP FLYTO */
const SwJrFlyTo = ({ position }: any) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], 15);
  }, [position, map]);
  return null;
};

/* ROUTING */
const SwJrRouting = ({ pickup, destination }: any) => {
  const map = useMap();
  useEffect(() => {
    if (!pickup || !destination) return;
    const control = (L as any).Routing.control({
      waypoints: [L.latLng(pickup.lat, pickup.lng), L.latLng(destination.lat, destination.lng)],
      lineOptions: { styles: [{ color: "#2563eb", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(control);
  }
  }, [pickup, destination, map]);
  return null;
};

const Packersandmovers: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [pickupText, setPickupText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>([]);
  const [availableRides, setAvailableRides] = useState<any[]>([]);
  // const [activeMode, setActiveMode] = useState<"all" | "ride" | "parcel" | "metro">("ride");
  const [recentPlaces, setRecentPlaces] = useState<any[]>([]);
    const [justSelectedPickup, setJustSelectedPickup] = useState(false);
  const [justSelectedDestination, setJustSelectedDestination] = useState(false);
  const [isRiderModalVisible, setIsRiderModalVisible] = useState(false);
  const [isNewRiderModalVisible, setIsNewRiderModalVisible] = useState(false);
  const [selectedRider, setSelectedRider] = useState("Me");
  
  // Dynamic list of riders
  const [riders, setRiders] = useState([
    { id: 'me', name: 'Me', phone: '', isMe: true }
  ]);
  
  // Form state for adding a new rider
  const [newRiderForm, setNewRiderForm] = useState({ firstName: '', lastName: '', phone: '' });


  const handleAddNewRider = () => {
  if (newRiderForm.firstName && newRiderForm.phone) {
    const fullName = `${newRiderForm.firstName} ${newRiderForm.lastName}`.trim();
    const newUser = {
      id: Date.now().toString(),
      name: fullName,
      phone: newRiderForm.phone,
      isMe: false
    };
    
    setRiders([...riders, newUser]); // Add new rider to list
    setSelectedRider(fullName);      // Set them as the active choice
    setIsNewRiderModalVisible(false); // Close form
    setNewRiderForm({ firstName: '', lastName: '', phone: '' }); // Reset form
  }
};

    const recentStaticPlaces = [
    {
      label: "Home",
      address: "DLF Phase 3, Gurgaon",
      icon: <HomeOutlined style={{ color: "#2563eb" }} />,
    },
    {
      label: "Office",
      address: "Cyber Hub, Gurgaon",
      icon: <BankOutlined style={{ color: "#16a34a" }} />,
    },
    {
      label: "Gym",
      address: "Sector 56, Gurgaon",
      icon: <ThunderboltOutlined style={{ color: "#f59e0b" }} />,
    },
    {
      label: "Railway Station",
      address: "Gurgaon Railway Station",
      icon: <EnvironmentOutlined style={{ color: "#dc2626" }} />,
    },
  ];




  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPickup({ lat, lng });

      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      setPickupText(data.display_name || "My Location");
      setPickupSuggestions([]);
    });
  };


  
  // PICKUP
  useEffect(() => {
    if (!pickupText || justSelectedPickup) return;
  
    const controller = new AbortController();
    const query = pickupText;
  
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}&limit=10&countrycodes=IN`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (query === pickupText) setPickupSuggestions(data);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      }
    }, 300);
  
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [pickupText, justSelectedPickup]);
  
  
  
  
  // DESTINATION
  useEffect(() => {
    if (!destinationText || justSelectedDestination) return;
  
    const controller = new AbortController();
    const query = destinationText;
  
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}&limit=10&countrycodes=IN`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (query === destinationText) setDestinationSuggestions(data);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      }
    }, 300);
  
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [destinationText, justSelectedDestination]);
  
  
  






const rideTypes = [
  { type: "Bike", icon: bike },
  { type: "Scooty", icon: scooty },
  { type: "Auto", icon: auto },
  { type: "Cab Non-AC", icon: car },
  { type: "Car", icon: car },
];

const generateNearbyRides = (pickup: any, count = 6) => {
  if (!pickup) return [];

  const rides = [];
  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) / 500;
    const lngOffset = (Math.random() - 0.5) / 500;

    const randomRide = rideTypes[Math.floor(Math.random() * rideTypes.length)];

    rides.push({
      id: i,
      type: randomRide.type,
      icon: randomRide.icon,
      lat: pickup.lat + latOffset,
      lng: pickup.lng + lngOffset,
      price: (Math.random() * 60 + 30).toFixed(0),
    });
  }

  return rides;
};


useEffect(() => {
  if (pickup && destination) {
    const rides = generateNearbyRides(pickup, 6);
    setAvailableRides(rides);
  } else {
    setAvailableRides([]);
  }
}, [pickup, destination]);









  return (
    <>
   
      <section className="sw-pm-hero" aria-hidden={false} >
        <div className="sw-pm-container sw-pm-hero-inner" style={{height:"110px"}}>
          <div className="sw-pm-hero-left">
            {/* <h2 className="sw-pm-hero-title">Packers &amp; Movers / Transport</h2> */}
             <h2 className="sw-pm-hero-title">Just Ride</h2>
            {/* <p className="sw-pm-hero-sub">{cardsData.length} services available</p> */}
          </div>
          <div className="sw-pm-hero-right" />
        </div>
      </section>





 
    <div className="sw-jr-container centered" > 


      
      
           <Layout className="sw-jr-layout">
                  <Sider width={420} className="sw-jr-left-panel">
          <h1 className="sw-jr-title">
         Just Ride
          
          </h1>
          
          
          
                    <div className="sw-jr-modes">
            <div
              className={`sw-jr-mode-pill ${location.pathname === "/bookride" ? "sw-jr-mode-active" : ""}`}
              onClick={() => navigate("/bookride")}
            >
              Ride
            </div>
          
            <div
              className={`sw-jr-mode-pill ${location.pathname === "/swiftparcel" ? "sw-jr-mode-active" : ""}`}
              onClick={() => navigate("/swiftparcel")}
            >
              Parcel
            </div>
          
            <div
              className={`sw-jr-mode-pill ${location.pathname === "/metrohub" ? "sw-jr-mode-active" : ""}`}
              onClick={() => navigate("/metrohub")}
            >
              Metro
            </div>
          
            <div
              className={`sw-jr-mode-pill ${location.pathname === "/allservices" ? "sw-jr-mode-active" : ""}`}
              onClick={() => navigate("/allservices")}
            >
              All
            </div>
          </div>
          
          
          
          
          
                    {/* Pickup Input */}
          
                    <div className="sw-jr-location-block" style={{ position: "relative", marginBottom: 12 }}>
            <label className="sw-jr-label">Pickup location</label>
            <Input
              size="large"
              placeholder="Enter pickup location"
              value={pickupText}
      
             onChange={(e) => {
  if (justSelectedPickup) {
    setJustSelectedPickup(false); // reset flag, ignore this change
    return;
  }
  setPickupText(e.target.value);
  setPickupSuggestions([]); // clear previous suggestions
           }}
              prefix={<SearchOutlined />}
              suffix={
                <AimOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleUseMyLocation}
                />
              }
            />
          
            {pickupSuggestions.length > 0 && (
              <div className="sw-jr-suggestions-list" style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1000,
                background: "white",
                border: "1px solid #ddd",
                maxHeight: 200,
                overflowY: "auto",
              }}>
                {/* Show each suggestion directly */}
                {pickupSuggestions.map((s) => (
                  <div
                    key={s.place_id}
                    className="sw-jr-suggestion-item"
                    onClick={() => {
                      setPickup({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
                      setPickupText(s.display_name);
                      setPickupSuggestions([]);
                      setJustSelectedPickup(true); 
                    }}
                    style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                  >
                    {s.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          
          
          {/* Dropoff Input */}
          
          <div className="sw-jr-location-block" style={{ position: "relative" }}>
          <div className="sw-jr-label-row">
            <label className="sw-jr-label">Dropoff location</label>
            <span
              className="sw-jr-add-stop-label"
              onClick={() => {
                console.log("Add more stop clicked");
                // later: add another stop input
              }}
            >
              + Add more stop
            </span>
          </div>
          <Input
            size="large"
            placeholder="Enter dropoff location"
            value={destinationText}
         onChange={(e) => {
  if (justSelectedDestination) {
    setJustSelectedDestination(false); // reset flag, ignore this change
    return;
  }
  setDestinationText(e.target.value);
  setDestinationSuggestions([]); // clear previous suggestions
}}
            prefix={<SearchOutlined />}
          />
          
            {destinationSuggestions.length > 0 && (
              <div className="sw-jr-suggestions-list" style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1000,
                background: "white",
                border: "1px solid #ddd",
                maxHeight: 200,
                overflowY: "auto",
              }}>
                {destinationSuggestions.map((s) => (
                  <div
                    key={s.place_id}
                    className="sw-jr-suggestion-item"
          
                    onClick={() => {
            const place = {
              name: s.display_name,
              lat: parseFloat(s.lat),
              lng: parseFloat(s.lon),
            };
          
            setDestination(place);
            setDestinationText(place.name);
            setDestinationSuggestions([]);
            setJustSelectedDestination(true); 
          
            setRecentPlaces((prev) => {
              const updated = [place, ...prev.filter(p => p.name !== place.name)];
              return updated.slice(0, 5); // keep last 5
            });
          }}
          
                  
                    style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                  >
                    {s.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>


          
{/* THE "FOR ME" TRIGGER PILL */}
<div style={{ marginTop: '16px', marginBottom: '16px' }}>
  <div 
    className="sw-jr-rider-pill"
    onClick={() => setIsRiderModalVisible(true)}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      backgroundColor: '#f3f3f3',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      gap: '8px',
      border: '1px solid #e8e8e8'
    }}
  >
    <UserOutlined />
    <span>{selectedRider === "Me" ? "For me" : selectedRider}</span>
    <DownOutlined style={{ fontSize: '10px' }} />
  </div>
</div>




          
          {!pickup && !destination && (
            <div className="sw-jr-pre-booking">
          
              <h3 className="sw-jr-section-title">Recent Destinations</h3>
              <div className="sw-jr-recent-items-main">
                  {recentStaticPlaces.map((item, idx) => (
            <div
              key={idx}
              className="sw-jr-recent-item"
              onClick={() => setDestinationText(item.address)}
            >
              <div className="sw-jr-recent-icon">{item.icon}</div>
              <div>
                <div className="sw-jr-recent-title">{item.label}</div>
                <div className="sw-jr-recent-sub">{item.address}</div>
              </div>
            </div>
          ))}
              </div>
          
            
          
          
          
          
          <div className="sw-jr-tip-box-main">
               <div className="sw-jr-tip-box">
                💡 Tip: Use the GPS icon to auto-set your pickup location.
              </div>
          </div>
           
          
            </div>
          )}
          
          
          
          {/* Available Rides Section */}
          {pickup && destination && availableRides.length > 0 && (
            <div className="sw-jr-available-rides">
              <h3 className="sw-jr-available-title">Available Rides Nearby</h3>
          
              {availableRides.map((ride) => (
                <div key={ride.id} className="sw-jr-ride-card">
                  <div className="sw-jr-ride-left">
                    <img
            src={ride.icon}
            alt={ride.type}
            className="sw-jr-ride-icon"
          />
          
                    <div>
                      <div className="sw-jr-ride-type">{ride.type}</div>
                      <div className="sw-jr-ride-sub">Near you • 2 min away</div>
                    </div>
                  </div>
          
                  <div className="sw-jr-ride-price">₹{ride.price}</div>
                </div>
              ))}
            </div>
          )}
          
          
          {recentPlaces.length > 0 && (
            <div className="sw-jr-recent">
              <h4 className="sw-jr-recent-title">Recent destinations</h4>
              {recentPlaces.map((p, i) => (
                <div
                  key={i}
                  className="sw-jr-recent-item"
                  onClick={() => {
                    setDestination({ lat: p.lat, lng: p.lng });
                    setDestinationText(p.name);
                    
                  }}
                >
                  <span>📍</span>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          )}
          
          
          
          
          
          
          
          
          
          
          
                  </Sider>
          
                  {/* MAP */}
                  <Content className="sw-jr-map-panel">
                    <MapContainer center={[28.4595, 77.0266]} zoom={13} className="sw-jr-leaflet-map">
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
                      {destination && <Marker position={[destination.lat, destination.lng]} />}
                      {pickup && destination && <SwJrRouting pickup={pickup} destination={destination} />}
                      {pickup && <SwJrFlyTo position={pickup} />}
                      {availableRides.map((ride) => (
            <Marker
              key={ride.id}
              position={[ride.lat, ride.lng]}
              icon={new L.Icon({
            iconUrl: ride.icon,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            />
          ))}
          
                    </MapContainer>
          
                  </Content>
                </Layout>


                      {/* MODAL 1: CHOOSE A RIDER */}
                <Modal
                  title={null}
                  open={isRiderModalVisible}
                  onCancel={() => setIsRiderModalVisible(false)}
                  footer={[
                    <div key="footer" style={{ padding: '0 24px 24px 24px' }}>
                      <Button 
                        className="sw-jr-done-btn" 
                        block 
                        onClick={() => setIsRiderModalVisible(false)}
                      >
                        Done
                      </Button>
                    </div>
                  ]}
                  width={500} // Matches the wider look in image_3e8e75.png
                  centered
                  className="sw-jr-rider-selector-modal"
                  closeIcon={<span style={{ fontSize: '20px', color: '#000' }}>✕</span>}
                >
                  <div style={{ padding: '24px 0 0 0' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', padding: '0 24px', marginBottom: '20px' }}>
                      Choose a rider
                    </h2>
                
                    <Radio.Group 
                      onChange={(e) => setSelectedRider(e.target.value)} 
                      value={selectedRider} 
                      style={{ width: '100%' }}
                      className="sw-jr-premium-radio-group"
                    >
                      {riders.map((r) => (
                        <div key={r.id} className="sw-jr-rider-selection-row" onClick={() => setSelectedRider(r.name)}>
                          <div className="sw-jr-rider-avatar-container">
                             <Avatar 
                               size={44} 
                               className={r.isMe ? "sw-jr-avatar-black" : "sw-jr-avatar-grey"}
                             >
                               {r.isMe ? "M" : r.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                             </Avatar>
                          </div>
                          <div className="sw-jr-rider-details">
                            <div className="sw-jr-rider-main-name">{r.name}</div>
                            {r.phone && <div className="sw-jr-rider-sub-phone">{r.phone}</div>}
                          </div>
                          <div className="sw-jr-rider-radio-wrapper">
                            <Radio value={r.name} />
                          </div>
                        </div>
                      ))}
                
                      {/* Trigger for Modal 2 */}
                      <div 
                        className="sw-jr-rider-selection-row add-rider-row" 
                        onClick={() => {
                          setIsRiderModalVisible(false);
                          setIsNewRiderModalVisible(true);
                        }}
                      >
                        <div className="sw-jr-rider-avatar-container">
                          <div className="sw-jr-add-rider-icon-bg">
                            <UserAddOutlined style={{ fontSize: '20px' }} />
                          </div>
                        </div>
                        <div className="sw-jr-rider-details">
                          <div className="sw-jr-rider-main-name">Order ride for someone else</div>
                        </div>
                      </div>
                    </Radio.Group>
                  </div>
                </Modal>
                
                {/* MODAL 2: NEW RIDER FORM */}
                <Modal
                  title={<div style={{ fontSize: '22px', fontWeight: 'bold'}}>New rider</div>}
                  open={isNewRiderModalVisible}
                  onCancel={() => {
                    setIsNewRiderModalVisible(false); // Close New Rider
                    setIsRiderModalVisible(true);     // Open Choose Rider
                  }}
                  footer={null}
                  width={550} // Increased width to match reference
                  centered
                  className="sw-jr-details-modal"
                >
                  <div style={{ padding: '0 4px' }}>
                    <p style={{ color: '#000', fontSize: '18px', marginBottom: '20px' }}>
                      Drivers will see this name.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>First name</label>
                        <Input 
                          placeholder="First name" 
                          className="premium-input"
                          value={newRiderForm.firstName}
                          onChange={e => setNewRiderForm({...newRiderForm, firstName: e.target.value})} 
                        />
                      </div>
                
                      <div>
                        <label style={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>Last name</label>
                        <Input 
                          placeholder="Last name" 
                          className="sw-jr-premium-input"
                          value={newRiderForm.lastName}
                          onChange={e => setNewRiderForm({...newRiderForm, lastName: e.target.value})} 
                        />
                      </div>
                
                      <div>
                        <label style={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>Phone number</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {/* Country Selector - matches image_3e257b.png */}
                          <Select
                            defaultValue="IN"
                            style={{ width: 100, height: '48px' }}
                            className="sw-jrpremium-select"
                            suffixIcon={<DownOutlined />}
                          >
                            <Select.Option value="IN">IN +91</Select.Option>
                            {/* <Select.Option value="US">US +1</Select.Option> */}
                          </Select>
                          <Input 
                            placeholder="Phone number" 
                            className="sw-jr-premium-input"
                            style={{ flex: 1 }}
                            value={newRiderForm.phone}
                            onChange={e => setNewRiderForm({...newRiderForm, phone: e.target.value})} 
                          />
                        </div>
                      </div>
                      
                      {/* THE ADDITIONAL TEXT (Legal/Disclaimer) */}
                      <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginTop: '10px' }}>
                        <p>JustRide won't share this phone number with drivers.</p>
                        <p style={{ marginTop: '15px' }}>
                          By tapping "Add rider", you confirm that your friend agreed to share 
                          their contact information with JustRide and to receive SMS about this trip.
                        </p>
                      </div>
                
                      <Button 
                        type="primary" 
                        block 
                        className="sw-jr-details-button"
                        disabled={!newRiderForm.firstName || !newRiderForm.phone}
                        onClick={() => {
                          handleAddNewRider();
                          setIsNewRiderModalVisible(false);
                          setIsRiderModalVisible(true); // Return to list after adding
                          
                        }}
                      >
                        Add rider
                      </Button>
                    </div>
                  </div>
                </Modal>



      

    </div>
  


    
    
    </>
  );
};
export default Packersandmovers;
