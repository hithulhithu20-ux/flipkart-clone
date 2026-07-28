import { createContext, useContext, useState } from "react";

const WishlistContext =
  createContext();

export const WishlistProvider = ({
  children,
}) => {
  const [wishlist, setWishlist] =
    useState([]);

  const addWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      setWishlist([
        ...wishlist,
        product,
      ]);
    }
  };

  const removeWishlist = (id) => {
    setWishlist(
      wishlist.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);