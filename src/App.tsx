import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { ComparePage } from './pages/ComparePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { MagazinePage } from './pages/MagazinePage';
import { ContactPage } from './pages/ContactPage';

const ToastBanner: React.FC = () => {
  const { toastMessage } = useStore();
  if (!toastMessage) return null;
  return (
    <div className="fixed bottom-5 left-5 z-50 rounded-full bg-[#6D1344] px-5 py-3 text-xs font-bold text-white shadow-glass">
      {toastMessage}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/advisor" element={<AdvisorPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/magazine" element={<MagazinePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastBanner />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
