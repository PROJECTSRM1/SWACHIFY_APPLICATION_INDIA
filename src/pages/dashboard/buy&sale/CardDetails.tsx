import { useState } from "react";
import "./BuysaleProducts.css";
import {
  MdArrowBackIos,
  MdFavoriteBorder,
  MdStar,
  MdLocationOn,
  MdShoppingCart,
  MdCheckCircle,
} from "react-icons/md";

export default function BuyerPageWeb({ property, onBack }: any) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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

  return (
    <div className="buyerPage">
        
      {/* HEADER */}
      <header className="buyerHeader">
        <button className="buyerBackBtn" onClick={onBack}>
          <MdArrowBackIos />
        </button>
        <h2>Property Details</h2>
        <MdFavoriteBorder className="buyerFavIcon" />
      </header>

      {/* 🔑 SCROLLABLE CONTENT */}
      <div className="buyerContent">
        {/* IMAGE */}
        <div className="buyerImageSection">
          <img src={images[activeImage]} alt="property" />

          <div className="buyerBadges">
            <span
              className={
                property.listingType === "buy" ? "badgeSale" : "badgeRent"
              }
            >
              {property.listingType === "buy" ? "FOR SALE" : "FOR RENT"}
            </span>

            {property.itemCondition && (
              <span className="badgeCondition">
                {property.itemCondition === "New Item" ? "NEW" : "USED"}
              </span>
            )}
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

        {/* DETAILS */}
        <section className="buyerDetails">
          <div className="buyerTitleRow">
            <h1>{property.title}</h1>
            {property.rating && (
              <div className="buyerRating">
                <MdStar /> {property.rating}
              </div>
            )}
          </div>

          <div className="buyerPrice">{property.price}</div>

          {property.location && (
            <div className="buyerInfo">
              <MdLocationOn /> {property.location}
            </div>
          )}

          {property.area && <div className="buyerInfo">📍 {property.area}</div>}

          <div className="buyerSpecs">
            {property.sqft && (
              <div className="specBox">
                <strong>{property.sqft}</strong>
                <span>SQFT</span>
              </div>
            )}
            {property.bhk && (
              <div className="specBox">
                <strong>{property.bhk}</strong>
                <span>BHK</span>
              </div>
            )}
          </div>

          {property.description && (
            <>
              <h3>Description</h3>
              <p className="buyerDescription">{property.description}</p>
            </>
          )}

          {/* FORM */}
          <h3>Your Information</h3>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </section>
      </div>

      {/* BOTTOM BAR */}
      <footer className="buyerBottom">
        <div>
          <span>Total Amount</span>
          <strong>{property.price}</strong>
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
            <MdCheckCircle size={72} color="#10b981" />
            <h2>Booked Successfully</h2>
            <p>Owner will contact you shortly</p>
            <button onClick={() => setShowSuccess(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
