import React from 'react';
import Hero from '../../components/Hero/Hero';
import B2BBenefits from '../../components/B2BBenefits/B2BBenefits';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import WholesaleBanner from '../../components/WholesaleBanner/WholesaleBanner';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <B2BBenefits />
      <CategoryGrid />
      <ProductCarousel title="NOVEDADES" />
      <ProductCarousel title="LOS MÁS VENDIDOS" />
      <WholesaleBanner />
    </main>
  );
};

export default HomePage;
