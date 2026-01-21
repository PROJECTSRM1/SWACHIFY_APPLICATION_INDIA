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
  const [sqft, setSqft] = useState<string>("");
  const [bhk, setBhk] = useState<string>("1 BHK");
  const [location, setLocation] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const isHouse = ["Apartment", "Villa", "Independent House"].includes(propertyType);
  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;

  /* ==========================
     IMAGE UPLOAD
  ========================== */
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

  /* ==========================
     SUBMIT
  ========================== */
  const handleSubmit = () => {
    if (!price || images.length === 0) {
      alert("Please upload images and enter price");
      return;
    }

    const listing = {
      id: Date.now(),
      listingType,
      propertyType,
      itemCondition,
      price,
      sqft,
      bhk,
      location,
      area,
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

            {/* HOUSE FIELDS */}
            {isHouse && (
              <>
                <div className="sellRow">
                  <input
                    placeholder="SQFT"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                  />
                  <select value={bhk} onChange={(e) => setBhk(e.target.value)}>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                  </select>
                </div>

                <input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input
                  placeholder="Area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
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
