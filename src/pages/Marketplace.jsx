// src/pages/Marketplace.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Heart, 
  Search, 
  Filter,
  Grid,
  List,
  MapPin,
  Truck,
  Shield,
  Headphones,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

export default function Marketplace() {
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('best-match');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [filterSubCategories, setFilterSubCategories] = useState([]);
  const [filterAttributes, setFilterAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [availableCategories, setAvailableCategories] = useState([]);
  const [activeCategoryName, setActiveCategoryName] = useState('');
  
  const itemsPerPage = 8;

  // Fallback products
  const fallbackProducts = [
    { id: 1, name: 'Premium Organic Coffee Beans', shop: 'FreshMart Grocery', price: 45000, originalPrice: 55000, discount: 18, rating: 4.8, sales: 234, category: 'Groceries', image: '/images/products/coffee.jpg' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', shop: 'Tech Hub Jinja', price: 3800000, originalPrice: 4200000, discount: 9, rating: 4.9, sales: 145, category: 'Electronics', image: '/images/products/phone.jpg' },
    { id: 3, name: 'Designer Leather Handbag', shop: 'Fashion Avenue', price: 250000, originalPrice: 320000, discount: 22, rating: 4.7, sales: 89, category: 'Fashion', image: '/images/products/handbag.jpg' },
    { id: 4, name: 'Smart LED TV 55"', shop: 'Electronics World', price: 2800000, originalPrice: 3200000, discount: 12, rating: 4.6, sales: 67, category: 'Electronics', image: '/images/products/tv.jpg' },
    { id: 5, name: 'Wireless Headphones', shop: 'Audio Store', price: 350000, originalPrice: 450000, discount: 22, rating: 4.8, sales: 178, category: 'Electronics', image: '/images/products/headphones.jpg' },
    { id: 6, name: 'Natural Honey 500g', shop: 'FreshMart Grocery', price: 15000, originalPrice: 20000, discount: 25, rating: 4.7, sales: 456, category: 'Groceries', image: '/images/products/honey.jpg' },
    { id: 7, name: 'Running Shoes', shop: 'Fashion Avenue', price: 180000, originalPrice: 220000, discount: 18, rating: 4.6, sales: 234, category: 'Fashion', image: '/images/products/shoes.jpg' },
    { id: 8, name: 'Dell XPS 15 Laptop', shop: 'Tech Hub Jinja', price: 4500000, originalPrice: 5200000, discount: 13, rating: 4.9, sales: 56, category: 'Electronics', image: '/images/products/laptop.jpg' }
  ];

  // Fallback sub-categories for each major category
  const fallbackSubCategories = {
    'electronics': [
      { id: 'sub1', name: 'Phones & Tablets', slug: 'phones-tablets', icon: '📱' },
      { id: 'sub2', name: 'Computers', slug: 'computers', icon: '💻' },
      { id: 'sub3', name: 'Audio', slug: 'audio', icon: '🎧' },
      { id: 'sub4', name: 'TVs', slug: 'tvs', icon: '📺' },
    ],
    'fashion': [
      { id: 'sub5', name: 'Mens', slug: 'mens', icon: '👔' },
      { id: 'sub6', name: 'Womens', slug: 'womens', icon: '👗' },
      { id: 'sub7', name: 'Footwear', slug: 'footwear', icon: '👟' },
    ],
    'groceries': [
      { id: 'sub8', name: 'Fresh Produce', slug: 'fresh-produce', icon: '🥬' },
      { id: 'sub9', name: 'Packaged Foods', slug: 'packaged-foods', icon: '🥫' },
      { id: 'sub10', name: 'Beverages', slug: 'beverages', icon: '🥤' },
    ],
    'home-living': [
      { id: 'sub11', name: 'Furniture', slug: 'furniture', icon: '🪑' },
      { id: 'sub12', name: 'Kitchen', slug: 'kitchen', icon: '🍽️' },
      { id: 'sub13', name: 'Decor', slug: 'decor', icon: '🖼️' },
    ],
    'beauty-health': [
      { id: 'sub14', name: 'Skincare', slug: 'skincare', icon: '🧴' },
      { id: 'sub15', name: 'Haircare', slug: 'haircare', icon: '💇' },
      { id: 'sub16', name: 'Makeup', slug: 'makeup', icon: '💄' },
    ],
    'automotive': [
      { id: 'sub17', name: 'Car Parts', slug: 'car-parts', icon: '🔧' },
      { id: 'sub18', name: 'Accessories', slug: 'auto-accessories', icon: '🧰' },
    ],
    'hardware': [
      { id: 'sub19', name: 'Building Materials', slug: 'building-materials', icon: '🧱' },
      { id: 'sub20', name: 'Tools', slug: 'tools', icon: '🔨' },
    ],
    'books-stationery': [
      { id: 'sub21', name: 'Books', slug: 'books', icon: '📖' },
      { id: 'sub22', name: 'Stationery', slug: 'stationery', icon: '✏️' },
    ]
  };

  // Attribute fallbacks
  const fallbackAttributes = {
    'electronics': [
      { id: 'attr1', attribute_name: 'Brand', attribute_key: 'brand', attribute_type: 'select', options: '["Samsung", "Apple", "Tecno", "Itel", "Nokia", "Xiaomi", "Huawei"]' },
      { id: 'attr2', attribute_name: 'Price Range', attribute_key: 'price_range', attribute_type: 'select', options: '["Under 100k", "100k-500k", "500k-1M", "1M-5M", "5M+"]' },
    ],
    'fashion': [
      { id: 'attr3', attribute_name: 'Size', attribute_key: 'size', attribute_type: 'select', options: '["S", "M", "L", "XL", "XXL"]' },
      { id: 'attr4', attribute_name: 'Color', attribute_key: 'color', attribute_type: 'select', options: '["Black", "White", "Blue", "Red", "Green", "Navy", "Grey"]' },
    ],
    'groceries': [
      { id: 'attr5', attribute_name: 'Weight', attribute_key: 'weight', attribute_type: 'select', options: '["250g", "500g", "1kg", "2kg", "5kg"]' },
      { id: 'attr6', attribute_name: 'Organic', attribute_key: 'organic', attribute_type: 'select', options: '["Yes", "No"]' },
    ],
    'home-living': [
      { id: 'attr7', attribute_name: 'Material', attribute_key: 'material', attribute_type: 'select', options: '["Wood", "Metal", "Plastic", "Glass", "Fabric"]' },
      { id: 'attr8', attribute_name: 'Color', attribute_key: 'color', attribute_type: 'select', options: '["Black", "White", "Brown", "Grey", "Natural"]' },
    ],
    'beauty-health': [
      { id: 'attr9', attribute_name: 'Skin Type', attribute_key: 'skin_type', attribute_type: 'select', options: '["All", "Dry", "Oily", "Combination", "Sensitive"]' },
      { id: 'attr10', attribute_name: 'Brand', attribute_key: 'brand', attribute_type: 'select', options: '["Nivea", "Olay", "Loreal", "Garnier", "Cetaphil"]' },
    ],
    'automotive': [
      { id: 'attr11', attribute_name: 'Vehicle Type', attribute_key: 'vehicle_type', attribute_type: 'select', options: '["Car", "Motorcycle", "Truck", "SUV"]' },
      { id: 'attr12', attribute_name: 'Brand', attribute_key: 'brand', attribute_type: 'select', options: '["Toyota", "Honda", "Ford", "Nissan", "Mercedes"]' },
    ],
    'hardware': [
      { id: 'attr13', attribute_name: 'Material', attribute_key: 'material', attribute_type: 'select', options: '["Steel", "Iron", "Aluminum", "Copper", "Plastic"]' },
      { id: 'attr14', attribute_name: 'Size', attribute_key: 'size', attribute_type: 'select', options: '["Small", "Medium", "Large", "Extra Large"]' },
    ]
  };

  // Get category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      const formatted = category.charAt(0).toUpperCase() + category.slice(1);
      setSelectedCategory(formatted);
      setActiveCategoryName(formatted);
      loadSubCategories(category);
      loadAttributes(category);
    }
  }, [location]);

  // Load sub-categories
  const loadSubCategories = async (categorySlug) => {
    try {
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (catData) {
        const { data } = await supabase
          .from('categories')
          .select('*')
          .eq('parent_id', catData.id)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setSubCategories(data);
          setFilterSubCategories(data);
          return;
        }
      }
      const fallback = fallbackSubCategories[categorySlug] || [];
      setSubCategories(fallback);
      setFilterSubCategories(fallback);
    } catch (err) {
      const fallback = fallbackSubCategories[categorySlug] || [];
      setSubCategories(fallback);
      setFilterSubCategories(fallback);
    }
  };

  // Load attributes for filter panel
  const loadAttributes = async (categorySlug) => {
    try {
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (catData) {
        const { data } = await supabase
          .from('category_attributes')
          .select('*')
          .eq('category_id', catData.id)
          .eq('is_filterable', true)
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setFilterAttributes(data);
          return;
        }
      }
      setFilterAttributes(fallbackAttributes[categorySlug] || []);
    } catch (err) {
      setFilterAttributes(fallbackAttributes[categorySlug] || []);
    }
  };

  // Load products
  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedSubCategory, sortBy, searchQuery]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('catalog')
        .select('id, name, category, images')
        .eq('is_active', true);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data: catalogData, error } = await query;

      if (error || !catalogData || catalogData.length === 0) {
        let fallback = [...fallbackProducts];
        if (selectedCategory !== 'all') {
          fallback = fallback.filter(p => p.category === selectedCategory);
        }
        if (searchQuery) {
          fallback = fallback.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(fallback);
        setAvailableCategories([...new Set(fallback.map(p => p.category))]);
        applyFilters(fallback);
        setLoading(false);
        return;
      }

      const catalogIds = catalogData.map(c => c.id);
      const catalogMap = {};
      catalogData.forEach(c => { catalogMap[c.id] = c; });

      const { data: productData } = await supabase
        .from('shop_products')
        .select('id, regular_price, shop_id, catalog_id')
        .eq('in_stock', true)
        .in('catalog_id', catalogIds);

      if (!productData || productData.length === 0) {
        setProducts([]);
        setAvailableCategories([]);
        applyFilters([]);
        setLoading(false);
        return;
      }

      const shopIds = [...new Set(productData.map(p => p.shop_id))];
      const { data: shopData } = await supabase
        .from('shops')
        .select('id, name, rating, review_count, discount_percentage')
        .in('id', shopIds);

      const shopMap = {};
      shopData?.forEach(s => { shopMap[s.id] = s; });

      const formatted = productData.map(item => {
        const catalog = catalogMap[item.catalog_id] || {};
        const shop = shopMap[item.shop_id] || {};
        return {
          id: item.id,
          name: catalog.name || 'Product',
          shop: shop.name || 'Shop',
          price: item.regular_price,
          originalPrice: Math.round(item.regular_price * 1.2),
          discount: shop.discount_percentage || 0,
          rating: shop.rating || 0,
          sales: Math.floor(Math.random() * 200) + 10,
          category: catalog.category || 'Uncategorized',
          image: catalog.images?.[0] || '/images/products/placeholder.jpg',
          catalogId: item.catalog_id,
          shopId: item.shop_id
        };
      });

      setProducts(formatted);
      const uniqueCats = [...new Set(formatted.map(p => p.category).filter(Boolean))];
      setAvailableCategories(uniqueCats);
      applyFilters(formatted);

    } catch (err) {
      console.error('Error:', err);
      let fallback = [...fallbackProducts];
      if (selectedCategory !== 'all') {
        fallback = fallback.filter(p => p.category === selectedCategory);
      }
      setProducts(fallback);
      setAvailableCategories([...new Set(fallback.map(p => p.category))]);
      applyFilters(fallback);
    }
    setLoading(false);
  };

  // Apply all filters
  const applyFilters = (productList = products) => {
    let filtered = [...productList];

    // Category filter (major category)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sub-category filter
    if (selectedSubCategory !== 'all') {
      const subCat = filterSubCategories.find(sc => sc.id === selectedSubCategory);
      if (subCat) {
        filtered = filtered.filter(p => p.category === subCat.name);
      }
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(p => p.rating >= selectedRating);
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Attribute filters (for fallback, we'll just pass through)
    // In production, this would filter by actual product attributes

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
    
    // Paginate
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedProducts(filtered.slice(start, end));
  };

  // Re-apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSubCategory, selectedRating, priceRange, selectedAttributes, sortBy, currentPage]);

  // Handle attribute selection
  const toggleAttribute = (key, value) => {
    setSelectedAttributes(prev => {
      const current = prev[key];
      if (current === value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('all');
    setCurrentPage(1);
    
    // Load sub-categories and attributes for this category
    const slug = category.toLowerCase();
    const fallback = fallbackSubCategories[slug] || [];
    setFilterSubCategories(fallback);
    setFilterAttributes(fallbackAttributes[slug] || []);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedRating(0);
    setPriceRange([0, 5000000]);
    setSelectedAttributes({});
    setSearchQuery('');
    setCurrentPage(1);
    setFilterSubCategories([]);
    setFilterAttributes([]);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const trustCards = [
    { icon: <Shield className="w-6 h-6 text-primary" />, title: 'Secure Payments', desc: 'Protected transactions' },
    { icon: <Truck className="w-6 h-6 text-primary" />, title: 'Fast Delivery', desc: 'Quick doorstep delivery' },
    { icon: <Check className="w-6 h-6 text-primary" />, title: 'Verified Businesses', desc: 'Trusted local shops' },
    { icon: <Headphones className="w-6 h-6 text-primary" />, title: '24/7 Support', desc: 'Always here to help' },
  ];

  const categoryDisplayName = selectedCategory === 'all' ? 'All Products' : selectedCategory;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/marketplace" className="text-primary font-medium">Shop</Link>
            {selectedCategory !== 'all' && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-gray-700">{categoryDisplayName}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {categoryDisplayName}
              </h1>
              <p className="text-gray-500 mt-2">
                {selectedCategory === 'all' 
                  ? 'Discover trusted products from verified local businesses'
                  : `Browse ${categoryDisplayName} from verified local shops`
                }
              </p>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-blue-50 to-primary/5 rounded-2xl p-4 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-bold text-primary bg-white/80 px-3 py-1 rounded-full inline-block">Deal</span>
                  <h3 className="text-lg font-bold text-primary mt-2">Get up to 30% OFF</h3>
                  <Button size="small" className="mt-2">Explore Deals</Button>
                </div>
                <div className="absolute right-0 top-0 text-6xl opacity-10">🎯</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Sub-Categories (Horizontal Bar) */}
      {subCategories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 overflow-x-auto border border-gray-100">
            <div className="flex gap-6 min-w-max">
              <button
                onClick={() => {
                  setSelectedSubCategory('all');
                  setCurrentPage(1);
                }}
                className={`flex flex-col items-center gap-1 transition ${
                  selectedSubCategory === 'all' ? 'text-primary' : 'text-gray-500 hover:text-primary'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition ${
                  selectedSubCategory === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-50 group-hover:bg-primary/10'
                }`}>
                  📦
                </div>
                <span className="text-xs font-medium">All</span>
              </button>
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubCategory(sub.id);
                    setCurrentPage(1);
                  }}
                  className={`flex flex-col items-center gap-1 transition ${
                    selectedSubCategory === sub.id ? 'text-primary' : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition ${
                    selectedSubCategory === sub.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-50 group-hover:bg-primary/10'
                  }`}>
                    {sub.icon || '📦'}
                  </div>
                  <span className="text-xs font-medium">{sub.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`
            ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
            lg:block lg:relative lg:inset-auto lg:bg-transparent lg:p-0 lg:overflow-visible lg:w-72 lg:flex-shrink-0
          `}>
            {showMobileFilters && (
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Categories - Major Categories for browsing */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => {
                        setSelectedCategory('all');
                        setSelectedSubCategory('all');
                        setCurrentPage(1);
                        setFilterSubCategories([]);
                        setFilterAttributes([]);
                      }}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    All Products
                    <span className="text-xs text-gray-400 ml-auto">({products.length})</span>
                  </label>
                  {availableCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      {cat}
                      <span className="text-xs text-gray-400 ml-auto">
                        ({products.filter(p => p.category === cat).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Sub-Categories Filter */}
              {filterSubCategories.length > 0 && (
                <>
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Sub-Categories</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                        <input 
                          type="radio" 
                          name="subcategory"
                          checked={selectedSubCategory === 'all'}
                          onChange={() => {
                            setSelectedSubCategory('all');
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        All Sub-Categories
                      </label>
                      {filterSubCategories.map((sub) => (
                        <label key={sub.id} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                          <input 
                            type="radio" 
                            name="subcategory"
                            checked={selectedSubCategory === sub.id}
                            onChange={() => {
                              setSelectedSubCategory(sub.id);
                              setCurrentPage(1);
                            }}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          {sub.icon || '📦'} {sub.name}
                          <span className="text-xs text-gray-400 ml-auto">
                            ({products.filter(p => p.category === sub.name).length})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <hr className="border-gray-100 my-4" />
                </>
              )}

              {/* Attributes Filter */}
              {filterAttributes.length > 0 && (
                <>
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Product Attributes</h3>
                    {filterAttributes.map((attr) => (
                      <div key={attr.id} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">{attr.attribute_name}</h4>
                        {attr.attribute_type === 'select' && attr.options && (
                          <div className="flex flex-wrap gap-2">
                            {JSON.parse(attr.options).map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  toggleAttribute(attr.attribute_key, option);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                                  selectedAttributes[attr.attribute_key] === option
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <hr className="border-gray-100 my-4" />
                </>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>UGX {priceRange[0].toLocaleString()}</span>
                    <span>UGX {priceRange[1].toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5000000" 
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([0, parseInt(e.target.value)]);
                      setCurrentPage(1);
                    }}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Ratings */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => {
                          setSelectedRating(rating);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 ml-auto">
                        ({products.filter(p => p.rating >= rating).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-24 right-4 z-40 bg-primary text-white p-4 rounded-full shadow-lg"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Products Section */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="text-sm text-gray-500">
                {loading ? (
                  'Loading products...'
                ) : (
                  <>
                    Showing <span className="font-semibold text-gray-900">{displayedProducts.length}</span> of{' '}
                    <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="best-match">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
                }`}>
                  {displayedProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.catalogId || product.id}`}
                      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className={`w-full object-cover group-hover:scale-105 transition duration-300 ${
                            viewMode === 'grid' ? 'h-48' : 'h-48 sm:h-56'
                          }`}
                          onError={(e) => {
                            e.target.src = '/images/products/placeholder.jpg';
                          }}
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                            -{product.discount}%
                          </div>
                        )}
                        <button 
                          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-400 mb-1">{product.category}</div>
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                        <div className="text-sm text-gray-500 mb-2">{product.shop}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-primary">
                            UGX {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through">
                              UGX {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-400">({product.sales} sold)</span>
                          </div>
                          <button 
                            className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition shadow-md hover:shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-xl border border-gray-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-xl font-medium transition ${
                            currentPage === pageNum
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-400">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`w-10 h-10 rounded-xl font-medium transition hover:bg-gray-100 text-gray-600`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-xl border border-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Trust Cards */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustCards.map((card, i) => (
              <div key={i} className="text-center p-4 rounded-xl hover:shadow-lg transition">
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h4 className="font-semibold text-gray-900">{card.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-white/80 mb-6">Subscribe for exclusive offers and updates</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Button variant="secondary" className="flex-shrink-0">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}