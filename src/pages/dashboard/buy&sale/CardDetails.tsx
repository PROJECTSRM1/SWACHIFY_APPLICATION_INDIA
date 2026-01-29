import { useState, useEffect } from "react";
import "./BuysaleProducts.css";
import {
  MdArrowBackIos,
  MdStar,
  MdLocationOn,
  MdShoppingCart,
  MdCheckCircle,
} from "react-icons/md";
import { MdCall } from "react-icons/md";



export default function BuyerPageWeb({ property, onBack }: any) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [docPopup, setDocPopup] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const isLand = property.category === "land";
  const isHostel = property.category === "hostel";
  const isHouse =
  property.category === "house" || property.category === "apartment";

const isVehicle = property.category === "vehicle";


  const extractNumber = (value?: string) => {
  if (!value) return 0;
  const numeric = value.replace(/[^0-9]/g, "");
  return numeric ? Number(numeric) : 0;
};
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

const handleAlphaValidated =
  (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/[^a-zA-Z\s]/.test(value)) {
      setFieldError(field, "Only alphabets are allowed");
      return;
    }

    clearFieldError(field);
    setter(value);
  };

  const handleMobileValidated = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, "");

  if (value.length > 10) {
    setFieldError("mobile", "Mobile number must be 10 digits");
    return;
  }

  clearFieldError("mobile");
  setMobile(value);
};


  const Amenity = ({ icon, label }: { icon: string; label: string }) => (
    <div className="amenityCard">
      <span className="amenityIcon">{icon}</span>
      <span>{label}</span>
    </div>
  );

  

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "remove";
  } | null>(null);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("marketplace_wishlist") || "[]"
    );
    setIsWishlisted(stored.some((item: any) => item.id === property.id));
  }, [property.id]);

  const images =
    property.images?.length > 0
      ? property.images
      : [
          property.image ||
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        ];

  const handleBuy = () => {
    if (!fullName || mobile.length < 10 || !address) {
      alert("Please fill all required fields");
      return;
    }
    setShowSuccess(true);
  };

  const toggleWishlist = () => {
    const stored = JSON.parse(
      localStorage.getItem("marketplace_wishlist") || "[]"
    );

    const exists = stored.some((item: any) => item.id === property.id);
    const updated = exists
      ? stored.filter((item: any) => item.id !== property.id)
      : [...stored, property];

    setIsWishlisted(!exists);
    localStorage.setItem("marketplace_wishlist", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("wishlist-change"));
    setTimeout(() => setToast(null), 2000);
  };

  

  return (
    <div className="buyerOverlay">
      <div className="buyerPage web">
        {/* HEADER */}
        <header className="buyerHeader">
          <button className="buyerBackBtn" onClick={onBack}>
            <MdArrowBackIos />
          </button>
          <h2>Property Details</h2>

          <button
            className={`buyerFavIcon ${isWishlisted ? "active" : ""}`}
            onClick={toggleWishlist}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </header>

        {/* CONTENT */}
        <div className="buyerContent invisible-scroll buyerSplit">
          {/* LEFT */}
          <div className="buyerLeft imageSide">
            {/* IMAGE */}
            <div className="buyerImageSection">
              <img src={images[activeImage]} alt="property" />

              <div className="buyerBadges">
                <span
                  className={
                    property.listingType === "buy"
                      ? "badgeSale"
                      : "badgeRent"
                  }
                >
                  {property.listingType === "buy" ? "FOR SALE" : "FOR RENT"}
                </span>
              </div>

              <div className="buyerDots">
                {images.map((_: any, i: number) => (
                  <span
                    key={i}
                    className={i === activeImage ? "dot active" : "dot"}
                    onClick={() => setActiveImage(i)}
                  />
                ))}
              </div>
            </div>
            <h1 className="imageTitle imageTitleBelow">
  {property.title}
</h1>

            {/* ✅ PRICE MOVED HERE — IMAGE DOWN */}
            <div className="priceRow imagePriceBlock">              
              <span className="imagePrice">₹{extractNumber(property.price).toLocaleString("en-IN")}

</span>
              {property.rating && (
                <span className="imageRating">
                  <MdStar /> {property.rating}
                </span>
              )}
            </div>

            {!isVehicle && property.area && (
  <div className="buyerInfo">
    <MdLocationOn /> {property.area}
  </div>
)}
            {/* IMAGE INFO */}
            <div className="imageInfo">
              {isHostel && (
                <div className="hostelBadge">
                  🏢 {property.hostelType} Hostel
                </div>
              )}
{(isLand || isHouse) && (
  <div className="landSummaryGrid">
    {property.sqft && (
      <div className="landSummaryCard">
        <div className="landIcon">📐</div>
        <strong>{property.sqft}</strong>
        <span>Sq. Ft.</span>
      </div>
    )}

    {isLand && property.landType && (
      <div className="landSummaryCard">
        <div className="landIcon">⛰</div>
        <strong>{property.landType}</strong>
      </div>
    )}

    {isHouse && property.bhk && (
      <div className="landSummaryCard">
        <div className="landIcon">🛏</div>
        <strong>{property.bhk}</strong>
      </div>
    )}
   
  </div>
  
)}

{/* 🚗 VEHICLE OWNER CONTACT CARD */}
{isVehicle && (
  <div className="vehicleContactHeader">
    {/* LEFT SIDE */}
    <div className="vehicleContactLeft">
      <div className="vehicleContactAvatar">
        <MdCall size={20} />
      </div>

      <div className="vehicleContactText">
        <strong>{property.ownerName || "Vanamala"}</strong>
      </div>
    </div>

    {/* RIGHT SIDE CALL ICON */}
    {property.ownerPhone && (
      <a
        href={`tel:${property.ownerPhone}`}
        className="vehicleContactCall"
      >
        <MdCall size={22} />
      </a>
    )}
  </div>
)}




{/* OWNER DETAILS – MOBILE CARD */}
{isLand && property.ownerName && (
  <div className="ownerMobileCard">
    <div className="ownerAvatarMobile">👤</div>

    <div className="ownerTextMobile">
      <strong>{property.ownerName}</strong>
    </div>

    <button className="ownerCallBtn">📞</button>
  </div>
)}
{/* LAND DOCUMENTS */}
{isLand && property.documents?.length > 0 && (
  <div className="landDocsSection">
    <h3>Land Documents</h3>

    <div className="landDocsGrid">
      {property.documents.map((doc: string, i: number) => (
        <img
          key={i}
          src={doc}
          className="landDocThumb"
          onClick={() => setDocPopup(doc)}
        />
      ))}
    </div>
  </div>
)}


              {property.category === "hostel" && (
                <>
                  <div className="hostelStatsGrid">
                    <div className="hostelStatCard">
                      <strong>{property.totalRooms}</strong>
                      <p>Total Rooms</p>
                    </div>

                    <div className="hostelStatCard">
                      <strong>{property.availableRooms}</strong>
                      <p>Available</p>
                    </div>

                    <div className="hostelStatCard">
                      <strong>{property.foodIncluded}</strong>
                      <p>Food</p>
                    </div>

                    <div className="hostelStatCard">
                      <strong>New</strong>
                      <p>Condition</p>
                    </div>
                  </div>

                  <h3 className="sectionTitle">Amenities & Services</h3>

                  <div className="amenitiesGrid">
                    {property.hasAC && <Amenity icon="❄️" label="AC" />}
                    {property.hasWifi && <Amenity icon="📶" label="WiFi" />}
                    {property.hasLaundry && <Amenity icon="🧺" label="Laundry" />}
                    {property.hasParking && <Amenity icon="🅿️" label="Parking" />}
                    {property.hasSecurity && (
                      <Amenity icon="🛡️" label="Security" />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="buyerRight formSide">
  <h3>Your Information</h3>

  <input
    placeholder="Full Name"
    value={fullName}
    onChange={handleAlphaValidated(setFullName, "fullName")}
  />
  {errors.fullName && (
    <p className="errorText">{errors.fullName}</p>
  )}

  <input
    placeholder="Mobile Number"
    inputMode="numeric"
    value={mobile}
    onChange={handleMobileValidated}
  />
  {errors.mobile && (
    <p className="errorText">{errors.mobile}</p>
  )}

  <textarea
    placeholder="Delivery Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />

  {/* LAND DETAILS ONLY FOR LAND */}
  {isLand && (
    <div className="infoCard landDetailsRight">
      <h3 className="cardTitle">Land Details</h3>

      <div className="detailRow">
        <span>Land Type</span>
        <strong>{property.landType}</strong>
      </div>

      <div className="detailRow">
        <span>Registration</span>
        <strong>{property.registrationStatus}</strong>
      </div>

      {property.registrationValue && (
        <div className="detailRow">
          <span>Registration Value</span>
          <strong>₹{property.registrationValue}</strong>
        </div>
      )}

      {property.marketValue && (
        <div className="detailRow">
          <span>Market Value</span>
          <strong>₹{property.marketValue}</strong>
        </div>
      )}

      {property.description && (
        <p className="descriptionText">{property.description}</p>
      )}
    </div>
  )}
</div>


        </div>

        {/* BOTTOM BAR */}
        <footer className="buyerBottom">
          <div>
            <span>Total Amount</span>
            <strong>
  ₹{extractNumber(property.price).toLocaleString("en-IN")}

              {isHostel && " / month"}
            </strong>
          </div>

          <button onClick={handleBuy}>
            <MdShoppingCart />
            {property.listingType === "buy" ? "Buy Property" : "Book Property"}
          </button>
        </footer>

        {/* SUCCESS MODAL */}
        {showSuccess && (
          <div className="buyerModalOverlay">
            <div className="buyerSuccessModal">
              <MdCheckCircle size={72} color="#22c55e" />
              <h2>Booked Successfully</h2>
              <p>Owner will contact you shortly</p>
              <button onClick={() => setShowSuccess(false)}>Done</button>
            </div>
          </div>
        )}

        {docPopup && (
          <div
            className="imagePopupOverlay"
            onClick={() => setDocPopup(null)}
          >
            <img
              src={docPopup}
              className="imagePopup"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>

      {toast && (
        <div className={`wishlistToast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}
