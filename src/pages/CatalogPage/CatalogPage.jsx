import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ShoppingBag, SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { allProducts } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogPage.css';

const FilterAccordion = ({ title, options, selectedList, toggleHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="filter-accordion">
      <div className="filter-accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && (
        <div className="filter-accordion-content">
          {options.map(opt => (
            <label key={opt} className="filter-checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedList.includes(opt)}
                onChange={() => toggleHandler(opt)}
              /> 
              <span className="checkbox-custom"></span>
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const PriceRangeFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-accordion">
      <div className="filter-accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>Rango de Precio</h4>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && (
        <div className="filter-accordion-content">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input 
              type="number" 
              placeholder="Mín" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-gray-200)', borderRadius: '4px' }}
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Máx" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid var(--color-gray-200)', borderRadius: '4px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const CatalogPage = () => {
  const { addToCart, toggleWishlist, wishlistItems } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [showFilters, setShowFilters] = useState(window.innerWidth >= 992);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFits, setSelectedFits] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Sync state from URL on mount and URL changes
  useEffect(() => {
    const cat = searchParams.get('categoria');
    const type = searchParams.get('tipo');
    const fit = searchParams.get('calce');
    const col = searchParams.get('coleccion');
    const q = searchParams.get('q');
    const minP = searchParams.get('minP');
    const maxP = searchParams.get('maxP');

    setSelectedCategories(cat ? [cat] : []);
    setSelectedTypes(type ? [type] : []);
    setSelectedFits(fit ? [fit.replace(/\+/g, ' ')] : []);
    setSelectedCollections(col ? [col.replace(/\+/g, ' ')] : []);
    setSearchQuery(q ? q.toLowerCase() : '');
    setMinPrice(minP || '');
    setMaxPrice(maxP || '');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const isWishlisted = (id) => wishlistItems.some(item => item.id === id);

  const toggleFilter = (value, list, setList, paramName) => {
    let newList;
    if (list.includes(value)) {
      newList = list.filter(item => item !== value);
    } else {
      newList = [...list, value];
    }
    setList(newList);
    
    // Update URL logic (simplified for single active filter per category for now to match typical simple URL usage)
    const newParams = new URLSearchParams(searchParams);
    if (newList.length > 0) {
      newParams.set(paramName, newList[0]); // Only setting the first one in URL for simplicity here
    } else {
      newParams.delete(paramName);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedFits([]);
    setSelectedCollections([]);
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  const sortOptions = [
    'Más Relevante',
    'Fecha De Release',
    'Descuento',
    'Mayor Precio',
    'Menor Precio'
  ];

  const [sortBy, setSortBy] = useState('Más Relevante');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Check search query
      if (searchQuery) {
        const titleMatch = product.title.toLowerCase().includes(searchQuery);
        const catMatch = product.category.toLowerCase().includes(searchQuery);
        const typeMatch = product.type.toLowerCase().includes(searchQuery);
        if (!titleMatch && !catMatch && !typeMatch) return false;
      }

      const numericPrice = parseInt(product.price.replace(/\D/g, ''), 10);
      const minP = parseInt(minPrice, 10);
      const maxP = parseInt(maxPrice, 10);

      const priceMatch = 
        (isNaN(minP) || numericPrice >= minP) && 
        (isNaN(maxP) || numericPrice <= maxP);

      const cMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const tMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const fMatch = selectedFits.length === 0 || selectedFits.includes(product.fit);
      const colMatch = selectedCollections.length === 0 || selectedCollections.includes(product.collection) || (selectedCollections.includes('SALE') && product.badge === 'SALE') || (selectedCollections.includes('Nuevos') && product.badge === 'Lo Nuevo');
      
      return priceMatch && cMatch && tMatch && fMatch && colMatch;
    });
  }, [selectedCategories, selectedTypes, selectedFits, selectedCollections, searchQuery, minPrice, maxPrice]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sortBy === 'Menor Precio') {
      sorted.sort((a, b) => parseInt(a.price.replace(/\D/g, ''), 10) - parseInt(b.price.replace(/\D/g, ''), 10));
    } else if (sortBy === 'Mayor Precio') {
      sorted.sort((a, b) => parseInt(b.price.replace(/\D/g, ''), 10) - parseInt(a.price.replace(/\D/g, ''), 10));
    } else if (sortBy === 'Fecha De Release') {
      sorted.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.id - a.id;
      });
    } else if (sortBy === 'Descuento') {
      sorted.sort((a, b) => {
        if (a.badge === 'SALE' && b.badge !== 'SALE') return -1;
        if (a.badge !== 'SALE' && b.badge === 'SALE') return 1;
        return 0;
      });
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  // Derived titles for Breadcrumbs
  let mainTitle = 'Catálogo Mayorista';
  if (searchQuery) {
    mainTitle = `Resultados para "${searchParams.get('q')}"`;
  } else if (selectedCategories.length > 0) {
    mainTitle = selectedCategories[0];
  } else if (selectedCollections.length > 0) {
    mainTitle = selectedCollections[0];
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.custom-sort-container')) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="catalog-container container">
      <div className={`catalog-layout ${!showFilters ? 'filters-hidden' : ''}`}>
        
        {showFilters && (
          <aside className="catalog-sidebar-island">
            <div className="catalog-top-area-inside">
              <div className="breadcrumbs">
                Home / {searchQuery ? 'Búsqueda' : (selectedCategories.length > 0 ? selectedCategories[0] : 'Todos')} {selectedTypes.length > 0 && `/ ${selectedTypes[0]}`} {selectedFits.length > 0 && `/ ${selectedFits[0]}`}
              </div>
              <h1 className="text-h1 catalog-main-title">{mainTitle}</h1>
              <button className="hide-filters-btn" onClick={() => setShowFilters(false)}>
                Ocultar Filtros <SlidersHorizontal size={20} />
              </button>
            </div>

            <div className="sidebar-filters-content">
              <div className="sidebar-nike-header">
                <h3>Filtros</h3>
                <button className="clear-filters-btn" onClick={clearFilters}>Limpiar</button>
              </div>
              
              <PriceRangeFilter 
                minPrice={minPrice} 
                maxPrice={maxPrice} 
                setMinPrice={(val) => { setMinPrice(val); searchParams.set('minP', val); setSearchParams(searchParams); }}
                setMaxPrice={(val) => { setMaxPrice(val); searchParams.set('maxP', val); setSearchParams(searchParams); }}
              />

              <FilterAccordion 
                title="Categoría" 
                options={['Hombre', 'Mujer', 'Unisex']} 
                selectedList={selectedCategories} 
                toggleHandler={(val) => toggleFilter(val, selectedCategories, setSelectedCategories, 'categoria')} 
              />
              
              <FilterAccordion 
                title="Tipo De Producto" 
                options={['Jeans', 'Chaquetas', 'Shorts', 'Faldas', 'Chalecos', 'Camisas']} 
                selectedList={selectedTypes} 
                toggleHandler={(val) => toggleFilter(val, selectedTypes, setSelectedTypes, 'tipo')} 
              />
              
              <FilterAccordion 
                title="Calces (Fits)" 
                options={['Slim Fit', 'Clásico Recto', 'Cargo', 'Skinny', 'Mom Fit', 'Wide Leg', 'Relaxed Fit', 'Slouchy', 'Oversize']} 
                selectedList={selectedFits} 
                toggleHandler={(val) => toggleFilter(val, selectedFits, setSelectedFits, 'calce')} 
              />
              
              <FilterAccordion 
                title="Colecciones" 
                options={['Nuevos', 'Esenciales', 'Denim Black', 'Vintage', 'SALE', 'Mas Vendidos']} 
                selectedList={selectedCollections} 
                toggleHandler={(val) => toggleFilter(val, selectedCollections, setSelectedCollections, 'coleccion')} 
              />
            </div>
          </aside>
        )}
        
        <div className="catalog-main-content">
          {!showFilters && (
            <div className="catalog-top-area-collapsed">
              <div className="breadcrumbs">
                Home / {searchQuery ? 'Búsqueda' : (selectedCategories.length > 0 ? selectedCategories[0] : 'Todos')} {selectedTypes.length > 0 && `/ ${selectedTypes[0]}`} {selectedFits.length > 0 && `/ ${selectedFits[0]}`}
              </div>
              <div className="catalog-header-flex">
                <h1 className="text-h1 catalog-main-title">{mainTitle}</h1>
                <button className="hide-filters-btn" onClick={() => setShowFilters(true)}>
                  Mostrar Filtros <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="product-count-bar">
            <span>{sortedProducts.length} Productos</span>
            <div className="custom-sort-container">
              <div className="custom-sort-trigger" onClick={() => setIsSortOpen(!isSortOpen)}>
                <span className="sort-label">Ordenar Por</span>
                <span className="sort-value">{sortBy}</span>
                {isSortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              
              {isSortOpen && (
                <div className="custom-sort-dropdown">
                  {sortOptions.map(option => (
                    <div 
                      key={option} 
                      className={`custom-sort-option ${sortBy === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className={`catalog-grid-nike ${!showFilters ? 'expanded' : ''}`}>
            {sortedProducts.length === 0 ? (
              <div className="no-products-msg">
                <h3>No se encontraron productos con esos filtros.</h3>
                <button className="btn-primary" style={{ marginTop: '24px' }} onClick={clearFilters}>Limpiar Filtros</button>
              </div>
            ) : (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
