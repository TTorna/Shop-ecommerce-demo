import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/CartSidebar/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar/WishlistSidebar';
import UserModal from './components/UserModal/UserModal';
import MobileMenu from './components/MobileMenu/MobileMenu';

import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

const AppContent = () => {
  const { 
    isCartOpen, closeCart, cartItems, removeFromCart,
    isWishlistOpen, closeWishlist, wishlistItems, toggleWishlist,
    isUserModalOpen, closeUserModal, openUserModal,
    isMobileMenuOpen, closeMobileMenu, openLogin, openWishlist, openCart
  } = useAppContext();

  return (
    <div className="app-container">
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      
      <Footer openUserModal={openUserModal} />

      {/* Interactive Overlays */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={closeCart} 
      />
      
      <WishlistSidebar 
        isOpen={isWishlistOpen} 
        onClose={closeWishlist} 
        wishlistItems={wishlistItems}
        removeFromWishlist={(id) => toggleWishlist({ id })} // Simulating removal by id
      />
      
      <UserModal 
        isOpen={isUserModalOpen} 
        onClose={closeUserModal} 
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
        openLogin={openUserModal}
        openWishlist={openWishlist}
        openCart={openCart}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
