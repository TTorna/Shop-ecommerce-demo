import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { allProducts } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductCarousel.css';

const ProductCarousel = ({ title, category, type, excludeId }) => {
  const scrollContainerRef = useRef(null);

  // Filter products for more relevant recommendations
  let filteredProducts = allProducts;
  
  if (excludeId) {
    filteredProducts = filteredProducts.filter(p => p.id !== excludeId);
  }
  
  if (type) {
    const typeProducts = filteredProducts.filter(p => p.type === type);
    // If enough products of the exact same type exist, use them
    if (typeProducts.length >= 4) {
      filteredProducts = typeProducts;
    } else if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
  } else if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  // Shuffle array slightly for variation (optional) or just take first 6
  const products = filteredProducts.slice(0, 6);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const isWishlisted = (id) => wishlistItems.some(item => item.id === id);

  return (
    <section className="product-carousel-section">
      <div className="carousel-header container">
        <h2 className="text-h2">{title}</h2>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={() => scroll('left')}><ChevronLeft size={24} /></button>
          <button className="carousel-btn" onClick={() => scroll('right')}><ChevronRight size={24} /></button>
        </div>
      </div>
      
      <div className="carousel-container-wrapper container">
        <div className="carousel-container" ref={scrollContainerRef}>
          {products.map((product) => (
            <div key={product.id} className="carousel-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
