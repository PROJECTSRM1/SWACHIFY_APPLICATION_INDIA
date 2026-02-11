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
  const [errors, setErrors] = useState<Record<string, string>>({});


  /* ================= HOUSE ================= */
  const formatIndianNumber = (value: string) => {
  // remove anything that is not a digit
  const numeric = value.replace(/[^0-9]/g, "");

  // add Indian commas
  return numeric.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
};
const handleNumericChange =
  (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIndianNumber(e.target.value);
    setter(formatted);
  };

  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("1 BHK");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [furnishingType, setFurnishingType] = useState<
    "No Furn" | "Semi" | "Full"
  >("No Furn");
  const validateNumeric = (value: string) => /^[0-9,]*$/.test(value);
const validateAlpha = (value: string) => /^[a-zA-Z\s]*$/.test(value);

const setFieldError = (field: string, message: string) => {
  setErrors((prev) => ({ ...prev, [field]: message }));
};

const clearFieldError = (field: string) => {
  setErrors((prev) => {
    const copy = { ...prev };
    delete copy[field];
    return copy;
  });
};


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

  const [registrationStatus, setRegistrationStatus] =
  useState<"Registered" | "Non-Registered">("Registered"); 
  const [registrationValue, setRegistrationValue] = useState("");
  const [marketValue, setMarketValue] = useState("");
  const [landDocuments, setLandDocuments] = useState<string[]>([]);

  /* ================= COMMERCIAL (BASIC) ================= */
const [commercialLocation, setCommercialLocation] = useState("");
const [commercialArea, setCommercialArea] = useState("");
const [rating, setRating] = useState<string>("");



  /* ================= COMMON ================= */
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  // const cleanPrice = price.replace(/,/g, "");

  /* ================= HOSTEL ================= */
const [hostelType, setHostelType] = useState("Boys");
const [totalRooms, setTotalRooms] = useState("");
const [availableRooms, setAvailableRooms] = useState("");
const [foodIncluded, setFoodIncluded] = useState("Yes");

const [hasAC, setHasAC] = useState(false);
const [hasWifi, setHasWifi] = useState(false);
const [hasLaundry, setHasLaundry] = useState(false);
const [hasParking, setHasParking] = useState(false);
const [hasSecurity, setHasSecurity] = useState(false);
const [hasTV, setHasTV] = useState(false);


  const [numberOfFloors, setNumberOfFloors] = useState("");
const [roomsPerFloor, setRoomsPerFloor] = useState("");
const [bedsPerRoom, setBedsPerRoom] = useState("");
const [defaultSharing, setDefaultSharing] = useState("4-Sharing");

const [oneSharingPrice, setOneSharingPrice] = useState("");
const [twoSharingPrice, setTwoSharingPrice] = useState("");
const [threeSharingPrice, setThreeSharingPrice] = useState("");
const [fourSharingPrice, setFourSharingPrice] = useState("");

const [currentBillExcluded, setCurrentBillExcluded] = useState("Yes");

const [hostelLocation, setHostelLocation] = useState("");
const [hostelArea, setHostelArea] = useState("");


  

  const isHouse = ["Apartment", "Villa", "Independent House"].includes(propertyType);
  const isVehicle = ["Bike", "Car", "Lorry", "Auto", "Bus"].includes(propertyType);
  const isLand = propertyType === "Land";

  const isCommercial =
  propertyType === "Office" ||
  propertyType === "Hospital" ||
  propertyType === "Commercial Space";
    const isHostel = propertyType === "Hostel";



  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
  const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
// const formatIndianPrice = (value: string) => {
//   const numeric = value.replace(/[^0-9]/g, "");

//   return numeric.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
// };
const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  // allow empty
  if (value === "") {
    setRating("");
    clearFieldError("rating");
    return;
  }

  const num = Number(value);

  if (isNaN(num) || num < 1 || num > 5) {
    setFieldError("rating", "Rating must be between 1.0 and 5.0");
    return;
  }

  clearFieldError("rating");
  setRating(value);
};


  /* ================= IMAGE UPLOAD ================= */
 const handleImages = async (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  if (images.length + files.length > 10) {
    alert("Maximum 10 images allowed");
    return;
  }

  const base64Images = await Promise.all(
    files.map((file) => fileToBase64(file))
  );

  setImages((prev) => [...prev, ...base64Images]);
};
const handleLandDocs = async (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);
  const base64Docs = await Promise.all(
    files.map((file) => fileToBase64(file))
  );

  setLandDocuments((prev) => [...prev, ...base64Docs]);
};


  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
const unformatNumber = (value: string) => value.replace(/,/g, "");

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
  if (!price || images.length === 0) {
    alert("Please upload images and enter price");
    return;
  }

  const listing = {

rating,
numberOfFloors,
roomsPerFloor,
bedsPerRoom,
defaultSharing,

oneSharingPrice: unformatNumber(oneSharingPrice),
twoSharingPrice: unformatNumber(twoSharingPrice),
threeSharingPrice: unformatNumber(threeSharingPrice),
fourSharingPrice: unformatNumber(fourSharingPrice),

currentBillExcluded,
hostelLocation,
hostelArea,


  id: Date.now(),
  listingType,
  propertyType,
  itemCondition,
  

  price: unformatNumber(price),
    ownerName,
  ownerPhone: mobileNumber,
  sqft: unformatNumber(sqft),
    landSqft: unformatNumber(landSqft),
  registrationValue: unformatNumber(registrationValue),
  marketValue: unformatNumber(marketValue),
  distance: unformatNumber(distance),
  category: ["Bike", "Car", "Lorry", "Auto", "Bus"].includes(propertyType)
    ? "vehicle"
    : "property",

  bhk,
  location,
  area,
  description,
  images,

  landType,
  landLocation,
  landArea,
  registeredOwner,
  documents: landDocuments,
  hostelType,
totalRooms,
availableRooms,
foodIncluded,
hasAC,
hasWifi,
hasLaundry,
hasParking,
hasSecurity,
hasTV,

  createdAt: new Date().toISOString(),
};


  const existing = JSON.parse(
    localStorage.getItem("marketplace_listings") || "[]"
  );

  localStorage.setItem(
    "marketplace_listings",
    JSON.stringify([...existing, listing])
  );

  // ✅ THIS IS THE FIX
  window.dispatchEvent(new Event("listing-added"));

  alert("Listing posted successfully!");
  onClose?.();
};
const handleNumericValidated =
  (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!validateNumeric(value)) {
      setFieldError(field, "Only numbers are allowed");
      return;
    }

    clearFieldError(field);
    setter(formatIndianNumber(value));
  };
const handleAlphaValidated =
  (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!validateAlpha(value)) {
      setFieldError(field, "Only alphabets are allowed");
      return;
    }

    clearFieldError(field);
    setter(value);
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
              <option>Hostel</option>

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


<label>RATING (1.0 – 5.0)<span className="required">*</span></label>

<input
  type="number"
  step="0.1"
  min="1"
  max="5"
  placeholder="e.g. 4.5"
  value={rating}
  onChange={handleRatingChange}
  style={{
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
  }}
/>

<p
  style={{
    marginTop: "4px",
    fontSize: "13px",
    fontWeight: 400,
    color: "#6b7280",
    lineHeight: "1.4",
  }}
>
Enter a rating between 1.0 and 5.0 (e.g. 4.5)
</p>

{errors.rating && (
  <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
    {errors.rating}
  </p>
)}



            {/* ============ COMMERCIAL BASIC FIELDS (AFTER PRICE) ============ */}
{isCommercial && (
  <>
    <label>SQFT</label>
    <input
  inputMode="numeric"
  value={sqft}
  onChange={handleNumericChange(setSqft)}
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
    <label>REGISTRATION STATUS</label>
    <div className="sellToggle">
      <button
        className={registrationStatus === "Registered" ? "active" : ""}
        onClick={() => setRegistrationStatus("Registered")}
      >
        Registered Land
      </button>
      <button
  className={registrationStatus === "Non-Registered" ? "active" : ""}
  onClick={() => {
    setRegistrationStatus("Non-Registered");
    setRegistrationValue(""); // 🔥 clear value
  }}
>
  Non-Registered
</button>

    </div>

    <div className="sellRow">
      <div>
        <label>SQFT</label>
        <input
  inputMode="numeric"
  value={landSqft}
  onChange={handleNumericChange(setLandSqft)}
/>

      </div>

      <div>
        <label>LAND TYPE</label>
        <select value={landType} onChange={(e) => setLandType(e.target.value)}>
          <option>Agriculture</option>
          <option>Commercial</option>
        </select>
      </div>
    </div>

    <label>REGISTRATION VALUE (₹)</label>
<input
  inputMode="numeric"
  value={registrationValue}
  onChange={handleNumericValidated(setRegistrationValue, "registrationValue")}
  disabled={registrationStatus === "Non-Registered"}
/>
{errors.registrationValue && (
  <p className="errorText">{errors.registrationValue}</p>
)}




    <label>MARKET VALUE (₹)</label>
    <input
  inputMode="numeric"
  value={marketValue}
  onChange={handleNumericChange(setMarketValue)}
/>

    <label>LOCATION</label>
    <input
  value={landLocation}
  onChange={handleAlphaValidated(setLandLocation, "landLocation")}
/>
{errors.landLocation && (
  <p className="errorText">{errors.landLocation}</p>
)}


    <label>AREA</label>
    <input
  value={landArea}
  onChange={handleAlphaValidated(setLandArea, "landArea")}
/>
{errors.landArea && (
  <p className="errorText">{errors.landArea}</p>
)}


    <label>REGISTERED OWNER NAME</label>
    <input
  value={registeredOwner}
  onChange={handleAlphaValidated(setRegisteredOwner, "registeredOwner")}
/>
{errors.registeredOwner && (
  <p className="errorText">{errors.registeredOwner}</p>
)}


    <label>UPLOAD LAND DOCUMENTS</label>
    <input type="file" multiple accept="image/*" onChange={handleLandDocs} />
  </>
)}


            {/* VEHICLE FIELDS */}
            {isVehicle && (
              <>
                <div className="sellRow">
                  <div>
                    <label>BRAND</label>
                    <input
  value={brand}
  onChange={handleAlphaValidated(setBrand, "brand")}
/>
{errors.brand && <p className="errorText">{errors.brand}</p>}

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
  inputMode="numeric"
  value={distance}
  onChange={handleNumericChange(setDistance)}
/>

                  </div>
                </div>

                <label>VEHICLE OWNER NAME</label>
                <input
  placeholder="Owner Name"
  value={ownerName}
  onChange={handleAlphaValidated(setOwnerName, "ownerName")}
/>
{errors.ownerName && <p className="errorText">{errors.ownerName}</p>}


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
  value={location}
  onChange={handleAlphaValidated(setLocation, "location")}
/>
{errors.location && <p className="errorText">{errors.location}</p>}


                <label>AREA</label>
                <input
  value={area}
  onChange={handleAlphaValidated(setArea, "area")}
/>
{errors.area && <p className="errorText">{errors.area}</p>}


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
            {/* ================= HOSTEL FIELDS ================= */}
{isHostel && (
  <>
    <label>HOSTEL TYPE</label>
    <select value={hostelType} onChange={(e) => setHostelType(e.target.value)}>
      <option>Boys</option>
      <option>Girls</option>
      <option>Co-living</option>
    </select>
   <label>
  NUMBER OF FLOORS <span className="required">*</span>
</label>

<input
  inputMode="numeric"
  placeholder="e.g., 3"
  value={numberOfFloors}
  onChange={handleNumericValidated(setNumberOfFloors, "numberOfFloors")}
/>

<div className="sellRow">
  <div>
    <label>
      TOTAL ROOMS <span className="required">*</span>
    </label>
    <input
      inputMode="numeric"
      placeholder="60"
      value={totalRooms}
      onChange={handleNumericValidated(setTotalRooms, "totalRooms")}
    />
  </div>

  <div>
    <label>
      AVAILABLE ROOMS <span className="required">*</span>
    </label>
    <input
      inputMode="numeric"
      placeholder="15"
      value={availableRooms}
      onChange={handleNumericValidated(setAvailableRooms, "availableRooms")}
    />
  </div>
</div>


<div className="sellRow">
  <div>
    <label>
      ROOMS PER FLOOR <span className="required">*</span>
    </label>
    <input
      inputMode="numeric"
      placeholder="20"
      value={roomsPerFloor}
      onChange={handleNumericValidated(setRoomsPerFloor, "roomsPerFloor")}
    />
  </div>

  <div>
    <label>
      BEDS PER ROOM <span className="required">*</span>
    </label>
    <input
      inputMode="numeric"
      placeholder="4"
      value={bedsPerRoom}
      onChange={handleNumericValidated(setBedsPerRoom, "bedsPerRoom")}
    />
  </div>
</div>

<label>DEFAULT SHARING TYPE (Display)</label>
<select
  value={defaultSharing}
  onChange={(e) => setDefaultSharing(e.target.value)}
>
  <option>1-Sharing</option>
  <option>2-Sharing</option>
  <option>3-Sharing</option>
  <option>4-Sharing</option>
</select>
<div className="pricingCard">
  <div className="pricingHeader">
    <h4>Pricing Per Sharing Type</h4>
    <p>Enter monthly rent for each sharing option</p>
  </div>

  <div className="sellRow">
    <div>
      <label>1-Sharing (₹/month) <span className="required">*</span></label>
      <input
        inputMode="numeric"
        placeholder="12000"
        value={oneSharingPrice}
        onChange={handleNumericValidated(setOneSharingPrice, "oneSharingPrice")}
      />
    </div>

    <div>
      <label>2-Sharing (₹/month) <span className="required">*</span></label>
      <input
        inputMode="numeric"
        placeholder="8000"
        value={twoSharingPrice}
        onChange={handleNumericValidated(setTwoSharingPrice, "twoSharingPrice")}
      />
    </div>
  </div>

  <div className="sellRow">
    <div>
      <label>3-Sharing (₹/month) <span className="required">*</span></label>
      <input
        inputMode="numeric"
        placeholder="6000"
        value={threeSharingPrice}
        onChange={handleNumericValidated(setThreeSharingPrice, "threeSharingPrice")}
      />
    </div>

    <div>
      <label>4-Sharing (₹/month) <span className="required">*</span></label>
      <input
        inputMode="numeric"
        placeholder="5000"
        value={fourSharingPrice}
        onChange={handleNumericValidated(setFourSharingPrice, "fourSharingPrice")}
      />
    </div>
  </div>
</div>

   <label>FOOD INCLUDED</label>
    <select
      value={foodIncluded}
      onChange={(e) => setFoodIncluded(e.target.value)}
    >
      <option>Yes</option>
      <option>No</option>
    </select>
<label>CURRENT BILL EXCLUDED</label>
<select
  value={currentBillExcluded}
  onChange={(e) => setCurrentBillExcluded(e.target.value)}
>
  <option>Yes</option>
  <option>No</option>
</select>
<label>LOCATION</label>
<input
  value={hostelLocation}
  onChange={(e) => setHostelLocation(e.target.value)}
  placeholder="Full Address"
/>

<label>AREA</label>
<input
  value={hostelArea}
  onChange={(e) => setHostelArea(e.target.value)}
  placeholder="Downtown / Suburb"
/>


  

 

    <label>SERVICES & AMENITIES</label>

<div className="amenitiesGrid sellAmenities">

  <div
    className={`amenityCard ${hasAC ? "active" : ""}`}
    onClick={() => setHasAC(!hasAC)}
  >
      {hasAC && <div className="tickMark">✓</div>}
    <span className="amenityIcon">❄️</span>
    <span>AC</span>
  </div>

  <div
    className={`amenityCard ${hasWifi ? "active" : ""}`}
    onClick={() => setHasWifi(!hasWifi)}
  >
    {hasWifi && <div className="tickMark">✓</div>}

    <span className="amenityIcon">📶</span>
    <span>WiFi</span>
  </div>

  <div
    className={`amenityCard ${hasLaundry ? "active" : ""}`}
    onClick={() => setHasLaundry(!hasLaundry)}
  >
    {hasLaundry && <div className="tickMark">✓</div>}

    <span className="amenityIcon">🧺</span>
    <span>Laundry</span>
  </div>

  <div
    className={`amenityCard ${hasParking ? "active" : ""}`}
    onClick={() => setHasParking(!hasParking)}
  >
    {hasParking && <div className="tickMark">✓</div>}

    <span className="amenityIcon">🅿️</span>
    <span>Parking</span>
  </div>

  {/* ✅ NEW TV CARD */}
  <div
    className={`amenityCard ${hasTV ? "active" : ""}`}
    onClick={() => setHasTV(!hasTV)}
  >
    {hasTV && <div className="tickMark">✓</div>}

    <span className="amenityIcon">📺</span>
    <span>TV</span>
  </div>

  <div
    className={`amenityCard ${hasSecurity ? "active" : ""}`}
    onClick={() => setHasSecurity(!hasSecurity)}
  >
    {hasSecurity && <div className="tickMark">✓</div>}

    <span className="amenityIcon">🛡️</span>
    <span>Security</span>
  </div>

</div>

  </>
)}
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
