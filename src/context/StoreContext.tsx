import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, UserProfile } from '../types';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  compareIds: string[];
  searchQuery: string;
  user: UserProfile | null;
  toastMessage: string | null;
  setSearchQuery: (q: string) => void;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  loginUser: (profile: UserProfile) => void;
  logoutUser: () => void;
  showToast: (msg: string) => void;
  totalItems: number;
  subtotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('poostyar_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('poostyar_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareIds, setCompareIds] = useState<string[]>([
    'cerave-hydrating-cleanser',
    'vichy-mineral-89',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('poostyar_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('poostyar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('poostyar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) localStorage.setItem('poostyar_user', JSON.stringify(user));
    else localStorage.removeItem('poostyar_user');
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`«${product.name}» به سبد خرید اضافه شد`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const toggleCompare = (productId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        showToast('از لیست مقایسه حذف شد');
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        showToast('حداکثر ۴ محصول قابل مقایسه است');
        return prev;
      }
      showToast('به لیست مقایسه اضافه شد');
      return [...prev, productId];
    });
  };

  const loginUser = (profile: UserProfile) => {
    setUser(profile);
    showToast(`خوش آمدید، ${profile.name}`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('از حساب کاربری خارج شدید');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compareIds,
        searchQuery,
        user,
        toastMessage,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        toggleCompare,
        loginUser,
        logoutUser,
        showToast,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};
