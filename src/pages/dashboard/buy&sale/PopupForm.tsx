import { useState } from "react";
import type { ChangeEvent } from "react";
import "./BuysaleProducts.css";

interface SellItemWebProps {
  onClose?: () => void;
}

export default function SellItemWeb({ onClose }: SellItemWebProps) {
  const [listingType, setListingType] = useState<"sell" | "rent">("sell");
  const [propertyType, setPropertyType] = useState<string>("Apartment");
  const [itemCondition, setItemCondition] = useState<string>("New Item");
  const [price, setPrice] = useState<string>("");

  /* ================= HOUSE ================= */
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("1 BHK");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [furnishingType, setFurnishingType] = useState<
    "No Furn" | "Semi" | "Full"
  >("No Furn");

  /* ================= VEHICLE ================= */
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [distance, setDistance] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  /* ================= LAND ================= */
  const [landSqft, setLandSqft] = useState("");
  const [landType, setLandType] = useState("Agriculture");
  const [landLocation, setLandLocation] = useState("");
  const [landArea, setLandArea] = useState("");
  const [registeredOwner, setRegisteredOwner] = useState("");
  /* ================= COMMERCIAL (BASIC) ================= */
const [commercialSqft, setCommercialSqft] = useState("");
const [commercialLocation, setCommercialLocation] = useState("");
const [commercialArea, setCommercialArea] = useState("");


  /* ================= COMMON ================= */
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const isHouse = ["Apartment", "Villa", "Independent House"].includes(propertyType);
  const isVehicle = ["Bike", "Car", "Lorry", "Auto", "Bus"].includes(propertyType);
  const isLand = propertyType === "Land";
  const isCommercial =
  propertyType === "Office" ||
  propertyType === "Hospital" ||
  propertyType === "Commercial Space";


  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;

  /* ================= IMAGE UPLOAD ================= */
  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!price) {
      alert("Please enter price");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (isHouse && (!sqft || !location || !area)) {
      alert("Please fill all house details");
      return;
    }

    if (
      isVehicle &&
      (!brand || !model || !year || !distance || !ownerName || !mobileNumber)
    ) {
      alert("Please fill all vehicle details");
      return;
    }

    if (isLand && (!landSqft || !landLocation || !landArea || !registeredOwner)) {
      alert("Please fill all land details");
      return;
    }

    const listing = {
      id: Date.now(),
      listingType,
      propertyType,
      itemCondition,
      price,

      // house
      sqft,
      bhk,
      location,
      area,
      furnishingType,

      // vehicle
      brand,
      model,
      year,
      distance,
      ownerName,
      mobileNumber,

      // land
      landSqft,
      landType,
      landLocation,
      landArea,
      registeredOwner,

      description,
      images,
      createdAt: new Date().toISOString(),
    };

    const existing: typeof listing[] = JSON.parse(
      localStorage.getItem("marketplace_listings") || "[]"
    );

    localStorage.setItem(
      "marketplace_listings",
      JSON.stringify([...existing, listing])
    );

    alert("Listing posted successfully!");
    onClose?.();
  };

  return (
    <div className="sellModalOverlay">
      <div className="sellModalContainer">
        <div className="sellForm">
          {/* HEADER */}
          <header className="sellFormHeader">
            <button onClick={onClose}>←</button>
            <h2>Sell Item Form</h2>
            <span />
          </header>

          {/* BODY */}
          <div className="sellFormBody">
            {/* LISTING TYPE */}
            <label>LISTING TYPE</label>
            <div className="sellToggle">
              <button
                className={listingType === "sell" ? "active" : ""}
                onClick={() => setListingType("sell")}
              >
                Direct Sell
              </button>
              <button
                className={listingType === "rent" ? "active" : ""}
                onClick={() => setListingType("rent")}
              >
                For Rent
              </button>
            </div>

            {/* PHOTOS */}
            <div className="sellRowBetween">
              <h4>Add Photos</h4>
              <span>UP TO 10 PHOTOS</span>
            </div>

            <div className="sellPhotoRow">
              <label className="sellUploadBox">
                📷
                <span>UPLOAD</span>
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                />
              </label>

              {images.map((img, i) => (
                <div className="sellImageBox" key={i}>
                  <img src={img} alt="preview" />
                  <button onClick={() => removeImage(i)}>✕</button>
                </div>
              ))}
            </div>

            {/* PROPERTY TYPE */}
            <label>PROPERTY TYPE</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option>Apartment</option>
              <option>Villa</option>
              <option>Independent House</option>
              <option>Land</option>
              <option>Bike</option>
              <option>Car</option>
              <option>Lorry</option>
              <option>Auto</option>
              <option>Bus</option>
              <option>Office</option>
              <option>Hospital</option>
              <option>Commercial Space</option>
            </select>

            {/* CONDITION */}
            <label>ITEM CONDITION</label>
            <select
              value={itemCondition}
              onChange={(e) => setItemCondition(e.target.value)}
            >
              <option>New Item</option>
              <option>Old Item</option>
            </select>

            {/* PRICE */}
            <label>PRICE (₹)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />

            {/* ============ COMMERCIAL BASIC FIELDS (AFTER PRICE) ============ */}
{isCommercial && (
  <>
    <label>SQFT</label>
    <input
      placeholder="Enter SQFT"
      value={commercialSqft}
      onChange={(e) => setCommercialSqft(e.target.value)}
    />

    <label>LOCATION</label>
    <input
      placeholder="Full Address"
      value={commercialLocation}
      onChange={(e) => setCommercialLocation(e.target.value)}
    />

    <label>AREA</label>
    <input
      placeholder="Business District"
      value={commercialArea}
      onChange={(e) => setCommercialArea(e.target.value)}
    />
  </>
)}


            {/* ============ LAND FIELDS (AFTER PRICE) ============ */}
            {isLand && (
              <>
                <div className="sellRow">
                  <div>
                    <label>SQFT</label>
                    <input
                      placeholder="5000"
                      value={landSqft}
                      onChange={(e) => setLandSqft(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>LAND TYPE</label>
                    <select
                      value={landType}
                      onChange={(e) => setLandType(e.target.value)}
                    >
                      <option>Agriculture</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                </div>

                <label>LOCATION</label>
                <input
                  placeholder="City or Village"
                  value={landLocation}
                  onChange={(e) => setLandLocation(e.target.value)}
                />

                <label>AREA</label>
                <input
                  placeholder="Industrial Hub"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                />

                <label>REGISTERED OWNER NAME</label>
                <input
                  placeholder="John Doe"
                  value={registeredOwner}
                  onChange={(e) => setRegisteredOwner(e.target.value)}
                />
              </>
            )}

            {/* VEHICLE FIELDS */}
            {isVehicle && (
              <>
                <div className="sellRow">
                  <div>
                    <label>BRAND</label>
                    <input
                      placeholder="Brand Name"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>MODEL</label>
                    <input
                      placeholder="Model Name"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sellRow">
                  <div>
                    <label>YEAR</label>
                    <input
                      placeholder="2024"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>DISTANCE (KM)</label>
                    <input
                      placeholder="10000"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </div>
                </div>

                <label>VEHICLE OWNER NAME</label>
                <input
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />

                <label>MOBILE NUMBER</label>
                <input
                  placeholder="+91 98765 43210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </>
            )}

            {/* HOUSE FIELDS */}
            {isHouse && (
              <>
                <div className="sellRow">
                  <div>
                    <label>SQFT</label>
                    <input
                      placeholder="Enter SQFT"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>BHK</label>
                    <select value={bhk} onChange={(e) => setBhk(e.target.value)}>
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4 BHK</option>
                      <option>5 BHK</option>
                    </select>
                  </div>
                </div>

                <label>LOCATION</label>
                <input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <label>AREA</label>
                <input
                  placeholder="Downtown / Suburb"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />

                <label>FURNISHING TYPE</label>
                <div className="sellToggle">
                  <button
                    className={furnishingType === "No Furn" ? "active" : ""}
                    onClick={() => setFurnishingType("No Furn")}
                  >
                    NO FURN.
                  </button>
                  <button
                    className={furnishingType === "Semi" ? "active" : ""}
                    onClick={() => setFurnishingType("Semi")}
                  >
                    SEMI
                  </button>
                  <button
                    className={furnishingType === "Full" ? "active" : ""}
                    onClick={() => setFurnishingType("Full")}
                  >
                    FULL
                  </button>
                </div>
              </>
            )}

            {/* DESCRIPTION */}
            <label>DESCRIPTION (MAX 250 WORDS)</label>
            <textarea
              value={description}
              onChange={(e) =>
                wordCount <= 250 && setDescription(e.target.value)
              }
              placeholder="Share more details..."
            />
            <small>{wordCount} / 250 words</small>
          </div>

          {/* FOOTER */}
          <footer className="sellFormFooter">
            <button className="sellPrimaryBtn" onClick={handleSubmit}>
              Post for {listingType === "sell" ? "Sale" : "Rent"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
