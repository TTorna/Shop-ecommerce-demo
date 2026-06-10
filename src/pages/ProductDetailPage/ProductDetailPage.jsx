import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ChevronRight, Info, ZoomIn, ZoomOut, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { allProducts } from '../../data/products';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlistItems } = useAppContext();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentImageIndex(0); // Reset on product change
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>Cargando producto...</div>;
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  // Build a mock array of 4 images if hoverImage exists, otherwise just the main image
  const galleryImages = product.hoverImage 
    ? [product.image, product.hoverImage, product.image, product.hoverImage] 
    : [product.image];

  const handleNextImage = (e) => {
    e.stopPropagation(); // prevent zooming
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const packOptions = [
    { label: 'Curva Completa (S-XXL)', type: 'pack' },
    { label: 'Talles Chicos (S-M)', type: 'pack' },
    { label: 'Talles Grandes (L-XXL)', type: 'pack' }
  ];

  const unitOptions = [
    { label: 'S', type: 'unit' },
    { label: 'M', type: 'unit' },
    { label: 'L', type: 'unit' },
    { label: 'XL', type: 'unit' },
    { label: 'XXL', type: 'unit', outOfStock: true }
  ];

  return (
    <div className="product-detail-container container">
      <div className="product-detail-layout">
        
        {/* Gallery Section */}
        <div className="product-gallery-adidas">
          <div className="thumbnails-column">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={img} alt={`${product.title} vista ${index + 1}`} />
              </div>
            ))}
          </div>
          <div 
            className="main-image-container" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => setIsZoomed(false)}
          >
            <button className="zoom-btn" onClick={() => setIsZoomed(!isZoomed)}>
              {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </button>
            <img 
              src={galleryImages[currentImageIndex]} 
              alt={product.title} 
              className={`detail-main-image ${isZoomed ? 'zoomed' : ''}`} 
              style={isZoomed ? zoomStyle : {}}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            {!isZoomed && galleryImages.length > 1 && (
              <div className="gallery-nav-btns">
                <button className="gallery-nav-btn" onClick={handlePrevImage}><ChevronLeft size={24} /></button>
                <button className="gallery-nav-btn" onClick={handleNextImage}><ChevronRight size={24} /></button>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="product-info-adidas">
          <div className="breadcrumb-adidas">
            <Link to={`/catalogo?categoria=${product.category}`}>{product.category}</Link> • <span>{product.type}</span>
          </div>

          {(product.badge || product.isNew) && (
            <div className="badge-inline-adidas">{product.badge || 'Nuevo'}</div>
          )}

          <h1 className="product-title-adidas">{product.title}</h1>
          <div className="product-price-adidas">{product.price}</div>

          {/* Sizes Section */}
          <div className="sizes-section-adidas">
            <h3 className="section-title-adidas">Selección de Variante</h3>
            
            <h4 className="subsection-title-adidas">Packs Mayoristas</h4>
            <div className="sizes-grid-adidas wholesale-grid">
              {packOptions.map(option => (
                <button 
                  key={option.label}
                  className={`size-btn-adidas ${selectedSize === option.label ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(option.label)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <h4 className="subsection-title-adidas" style={{marginTop: '24px'}}>Talles Individuales</h4>
            <div className="sizes-grid-adidas">
              {unitOptions.map(option => (
                <button 
                  key={option.label}
                  className={`size-btn-adidas ${selectedSize === option.label ? 'selected' : ''} ${option.outOfStock ? 'out-of-stock' : ''}`}
                  onClick={() => !option.outOfStock && setSelectedSize(option.label)}
                  disabled={option.outOfStock}
                >
                  {option.label}
                  {option.outOfStock && (
                    <span className="notify-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="notify-bell-icon">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
            {!selectedSize && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '4px' }}>Por favor, selecciona una variante para continuar.</p>}
          </div>

          {/* Info Box */}
          <div className="info-box-adidas">
            <Info size={20} className="info-icon" />
            <span><strong>Talle real.</strong> Te recomendamos pedir tu talle habitual.</span>
          </div>

          {/* Quantity & Actions */}
          <div className="actions-section-adidas">
            <div className="quantity-selector-adidas">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div className="action-buttons-adidas">
              <div className="btn-add-cart-wrapper">
                <button 
                  className="btn-add-cart-adidas" 
                  onClick={() => {
                    if(selectedSize) {
                      addToCart({...product, quantity, selectedVariant: selectedSize});
                    } else {
                      alert('Por favor selecciona una variante');
                    }
                  }}
                >
                  Añadir al carrito <ShoppingBag size={20} className="bag-icon" />
                </button>
              </div>
              <button 
                className={`btn-wishlist-adidas ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={24} fill={isWishlisted ? 'var(--color-brand)' : 'none'} color={isWishlisted ? 'var(--color-brand)' : 'var(--color-black)'} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div style={{ marginTop: '80px' }}>
        <ProductCarousel 
          title="TE PODRÍA INTERESAR" 
          category={product.category} 
          type={product.type} 
          excludeId={product.id} 
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
