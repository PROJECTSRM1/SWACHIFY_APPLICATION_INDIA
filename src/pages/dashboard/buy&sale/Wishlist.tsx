import { useEffect, useState } from "react";
import "./Wishlist.css";
import { MdStar, MdLocationOn, MdDelete } from "react-icons/md";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    const syncWishlist = () => {
      const stored = JSON.parse(
        localStorage.getItem("marketplace_wishlist") || "[]"
      );
      setWishlistItems(stored);
    };

    // initial load
    syncWishlist();

    // 🔥 FORCE SYNC (NO REFRESH REQUIRED)
    const interval = setInterval(syncWishlist, 300);

    return () => clearInterval(interval);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlistItems.filter(
      (item: any) => item.id !== id
    );

    setWishlistItems(updated);
    localStorage.setItem(
      "marketplace_wishlist",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="wishlistPage">
      <h2>My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="emptyText">No items in wishlist ❤️</p>
      ) : (
        <div className="wishlistGrid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlistCard">
              <img src={item.image} alt={item.title} />

              <div className="wishlistBody">
                <h3>{item.title}</h3>
                <p className="price">{item.price}</p>

                <div className="meta">
                  <span>
                    <MdLocationOn /> {item.area}
                  </span>
                  <span>
                    <MdStar /> {item.rating}
                  </span>
                </div>
              </div>

              <button
                className="removeBtn"
                onClick={() => removeFromWishlist(item.id)}
              >
                <MdDelete /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
