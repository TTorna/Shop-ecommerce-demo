import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // State for Modals and Sidebars
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data State with Local Storage Initialization
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('mozaiko_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('mozaiko_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Local Storage Sync
  useEffect(() => {
    localStorage.setItem('mozaiko_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('mozaiko_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Handlers
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === product.size);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        (item.id === product.id && item.size === product.size)
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems(cartItems.map(item => 
      (item.id === productId && item.size === size)
        ? { ...item, quantity }
        : item
    ));
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.size === size)));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (exists) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const value = {
    isCartOpen, openCart, closeCart,
    isWishlistOpen, openWishlist, closeWishlist,
    isUserModalOpen, openUserModal, closeUserModal,
    isMobileMenuOpen, openMobileMenu, closeMobileMenu,
    cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart,
    wishlistItems, toggleWishlist
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
