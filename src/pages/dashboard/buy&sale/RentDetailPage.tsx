import { useState } from "react";
import "./RentDetailPage.css";

type Property = {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  build: number;
  parking: string;
  status: string;
  description: string;
  agent: {
    name: string;
    role: string;
    image: string;
  };
};

export default function RentDetailPage({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {

  const [activeImage, setActiveImage] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const [showBooking, setShowBooking] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [cardAdded, setCardAdded] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tax = 10;
  const monthly = parseFloat(property.price.replace(/[^0-9.]/g, ""));
  const total = monthly + tax;

  return (
    <div className="rdpage-wrapper">

      {/* HEADER */}

      <div className="rdpage-header">
        <button onClick={onClose}>←</button>
        <h2>Details</h2>

        <div className="rdpage-header-actions">
          <button>🔗</button>

          <button onClick={() => setFavorite(!favorite)}>
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      {/* IMAGE */}

      <div className="rdpage-carousel">

        <img
          src={property.images[activeImage]}
          className="rdpage-main-img"
        />

        <div className="rdpage-dots">
          {property.images.map((_, i) => (

            <span
              key={i}
              className={`rdpage-dot ${i === activeImage ? "active" : ""}`}
              onClick={() => setActiveImage(i)}
            />

          ))}
        </div>

      </div>

      {/* PROPERTY INFO */}

      <div className="rdpage-info">

        <div className="rdpage-title-row">

          <div>
            <h2 className="rdpage-title">{property.name}</h2>
            <p className="rdpage-location">📍 {property.location}</p>
          </div>

          <div className="rdpage-price">{property.price}</div>

        </div>

     
      </div>


      {/* PROPERTY DETAILS */}

      <div className="rdpage-details">

        <h3>Property Details</h3>

        <div className="rdpage-details-grid">

          <div className="rdpage-details-item">
            <span>Bedrooms</span>
            <h4>{property.bedrooms}</h4>
          </div>

          <div className="rdpage-details-item">
            <span>Bathub</span>
            <h4>{property.bathrooms}</h4>
          </div>

          <div className="rdpage-details-item">
            <span>Area</span>
            <h4>{property.area} sqft</h4>
          </div>

          <div className="rdpage-details-item">
            <span>Build</span>
            <h4>{property.build}</h4>
          </div>

          <div className="rdpage-details-item">
            <span>Parking</span>
            <h4>{property.parking}</h4>
          </div>

          <div className="rdpage-details-item">
            <span>Status</span>
            <h4>{property.status}</h4>
          </div>

        </div>

      </div>


      {/* DESCRIPTION */}

      <div className="rdpage-description">

        <h3>Description</h3>

        <p>{property.description}</p>

      </div>


      {/* AGENT */}

      <div className="rdpage-agent-card">

        <img src={property.agent.image} />

        <div className="rdpage-agent-info">

          <h4>{property.agent.name}</h4>

          <p>{property.agent.role}</p>

        </div>

        <div className="rdpage-agent-btn">

          <button>📞</button>

          <button>💬</button>

        </div>

      </div>


      {/* MAP */}

      <div className="rdpage-map-section">

        <h3>Location & Public Facilities</h3>

        <div className="rdpage-map-box">

          Map Preview

        </div>

      </div>


      {/* REVIEWS */}

      <div className="rdpage-reviews">

        <div className="rdpage-review-header">

          <h3>Reviews 152</h3>

          <span>See all</span>

        </div>

        <div className="rdpage-review-card">

          <h4>Theresa Webb</h4>

          <p>⭐⭐⭐⭐</p>

          <p>
            Amazing property with great facilities.
            The host was very responsive.
          </p>

        </div>

      </div>

      {/* RENT BUTTON */}

      <div className="rdpage-bottom-bar">

        <button
          className="rdpage-rent-btn"
          onClick={() => setShowBooking(true)}
        >
          Rent now
        </button>

      </div>

      {/* BOOKING MODAL */}

      {showBooking && !bookingSuccess && (

        <div className="rdpage-booking-overlay">

          <div className="rdpage-booking-modal">

            <div className="rdpage-booking-card">

              <img src={property.images[0]} />

              <div>
                <h3>{property.name}</h3>
                <p>{property.location}</p>
                <strong>{property.price}</strong>
              </div>

            </div>

            {/* DATE PICKER */}

            <h3>Period</h3>

            <div className="rdpage-date-row">

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

            </div>

            {/* PAYMENT */}

            <h3>Payments</h3>

            <div
              className="rdpage-payment-option"
              onClick={() => setShowCardForm(true)}
            >
              💳 Credit / Debit Card {cardAdded && "✅"}
            </div>

            <div className="rdpage-payment-option">
              🅿 PayPal
            </div>

            {/* PRICE DETAILS */}

            <h3 style={{ marginTop: "20px" }}>Price Details</h3>

            <p>Monthly payment: ${monthly}</p>

            <p>Tax: ${tax}</p>

            <h3>Total: ${total}</h3>

            {cardAdded && (

              <button
                className="rdpage-confirm-btn"
                onClick={() => setBookingSuccess(true)}
              >
                Confirm and Pay
              </button>

            )}

          </div>

        </div>

      )}

      {/* ADD CARD SCREEN */}

      {showCardForm && (

        <div className="rdpage-booking-overlay">

          <div className="rdpage-card-page">

            <div className="rdpage-card-header">

              <button onClick={() => setShowCardForm(false)}>←</button>

              <h2>Add Card</h2>

            </div>

            {/* CARD UI */}

            <div className="credit-card-ui">

              <div className="credit-card">

                <div className="card-type">Credit Card</div>

                <div className="card-number">
                  1234 5678 9101 1121
                </div>

                <div className="card-bottom">

                  <span>brooklynsimmons</span>

                  <span>06/21</span>

                </div>

              </div>

            </div>

            {/* FORM */}

            <div className="card-form">

              <label>Name</label>

              <input placeholder="Brooklyn Simmons" />

              <label>Card Number</label>

              <input placeholder="1234 5678 9101 1121" />

              <div className="card-form-row">

                <div>

                  <label>Expired</label>

                  <input placeholder="06/21" />

                </div>

                <div>

                  <label>CVV</label>

                  <input placeholder="••••" />

                </div>

              </div>

              <button
                className="add-card-btn"
                onClick={() => {

                  setCardAdded(true)
                  setShowCardForm(false)

                }}
              >

                Add card

              </button>

            </div>

          </div>

        </div>

      )}

      {/* SUCCESS SCREEN */}

      {bookingSuccess && (

        <div className="rdpage-booking-overlay">

          <div className="rdpage-success">

            <h1>✔</h1>

            <h2>Yey, your booking success</h2>

            <p>
              you have successfully booked a property,
              enjoy your property
            </p>

            <button
              className="rdpage-confirm-btn"
              onClick={() => {

                setBookingSuccess(false)
                setShowBooking(false)

              }}
            >
              Explore more
            </button>

          </div>

        </div>

      )}

    </div>
  );
}