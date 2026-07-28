import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { ProductProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CategoryProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default AppProvider;