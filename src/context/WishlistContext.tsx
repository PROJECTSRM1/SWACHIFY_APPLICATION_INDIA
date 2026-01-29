import { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
    id: string;
    name: string;
    image: string;
    price: number;
    company: string;
    category: string;
    rating: number;
    reviews: number;
    distance: string;
    isNew?: boolean;
    isFeatured?: boolean;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: any) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        // Load wishlist from localStorage on initialization
        const savedWishlist = localStorage.getItem("swachify_wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("swachify_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist((prev) => {
            // Check if item already exists
            if (prev.some((w) => w.id === item.id)) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    const isInWishlist = (id: string) => {
        return wishlist.some((item) => item.id === id);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
    return ctx;
};
