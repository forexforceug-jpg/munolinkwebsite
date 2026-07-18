// src/pages/Marketplace.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Heart, 
  Search, 
  Filter,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Grid,
  List,
  MapPin,
  Bell,
  User,
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  Check  // ← ADDED Check
} from 'lucide-react';
import Button from '../components/Button';

export default function Marketplace() {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('best-match');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Organic Coffee Beans',
      shop: 'FreshMart Grocery',
      price: 45000,
      originalPrice: 55000,
      discount: 18,
      rating: 4.8,
      sales: 234,
      category: 'Groceries',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      shop: 'Tech Hub Jinja',
      price: 3800000,
      originalPrice: 4200000,
      discount: 9,
      rating: 4.9,
      sales: 145,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Designer Leather Handbag',
      shop: 'Fashion Avenue',
      price: 250000,
      originalPrice: 320000,
      discount: 22,
      rating: 4.7,
      sales: 89,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Smart LED TV 55"',
      shop: 'Electronics World',
      price: 2800000,
      originalPrice: 3200000,
      discount: 12,
      rating: 4.6,
      sales: 67,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Luxury Perfume Gift Set',
      shop: 'Beauty Parlor',
      price: 180000,
      originalPrice: 230000,
      discount: 22,
      rating: 4.9,
      sales: 312,
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Modern Office Desk',
      shop: 'Home & Living',
      price: 750000,
      originalPrice: 900000,
      discount: 16,
      rating: 4.5,
      sales: 45,
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Wireless Noise Cancelling Headphones',
      shop: 'Audio Store',
      price: 350000,
      originalPrice: 450000,
      discount: 22,
      rating: 4.8,
      sales: 178,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Natural Honey 500g',
      shop: 'FreshMart Grocery',
      price: 15000,
      originalPrice: 20000,
      discount: 25,
      rating: 4.7,
      sales: 456,
      category: 'Groceries',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Running Shoes - Premium',
      shop: 'Fashion Avenue',
      price: 180000,
      originalPrice: 220000,
      discount: 18,
      rating: 4.6,
      sales: 234,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Dell XPS 15 Laptop',
      shop: 'Tech Hub Jinja',
      price: 4500000,
      originalPrice: 5200000,
      discount: 13,
      rating: 4.9,
      sales: 56,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop'
    },
    {
      id: 11,
      name: 'Organic Cooking Oil 2L',
      shop: 'FreshMart Grocery',
      price: 25000,
      originalPrice: 32000,
      discount: 22,
      rating: 4.5,
      sales: 567,
      category: 'Groceries',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Designer Sunglasses',
      shop: 'Fashion Avenue',
      price: 120000,
      originalPrice: 160000,
      discount: 25,
      rating: 4.7,
      sales: 123,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop'
    }
  ];

  // Filter categories
  const categories = [
    'All Products',
    'Groceries',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Beauty',
    'Health',
    'Transport',
    'Hotels'
  ];

  // Pagination
  const totalPages = Math.ceil(products.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Trust cards
  const trustCards = [
    { icon: <Shield className="w-6 h-6 text-primary" />, title: 'Secure Payments', desc: 'Protected transactions' },
    { icon: <Truck className="w-6 h-6 text-primary" />, title: 'Fast Delivery', desc: 'Quick doorstep delivery' },
    { icon: <Check className="w-6 h-6 text-primary" />, title: 'Verified Businesses', desc: 'Trusted local shops' },
    { icon: <Headphones className="w-6 h-6 text-primary" />, title: '24/7 Support', desc: 'Always here to help' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== Breadcrumb ========== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/marketplace" className="text-primary font-medium">Shop</Link>
          </div>
        </div>
      </div>

      {/* ========== Page Header ========== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Shop Top Products</h1>
              <p className="text-gray-500 mt-2">Discover trusted products from verified local businesses</p>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-blue-50 to-primary/5 rounded-2xl p-4 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-bold text-primary bg-white/80 px-3 py-1 rounded-full inline-block">Deal</span>
                  <h3 className="text-lg font-bold text-primary mt-2">Get up to 30% OFF</h3>
                  <Button size="small" className="mt-2" onClick={() => {}}>Explore Deals</Button>
                </div>
                <div className="absolute right-0 top-0 text-6xl opacity-10">🎯</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Category Icons ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 overflow-x-auto">
          <div className="flex gap-8 min-w-max">
            {[
              { icon: '🛒', label: 'Groceries' },
              { icon: '👗', label: 'Fashion' },
              { icon: '📱', label: 'Electronics' },
              { icon: '🏠', label: 'Home & Living' },
              { icon: '💄', label: 'Beauty' },
              { icon: '🏥', label: 'Health' },
              { icon: '🚗', label: 'Transport' },
              { icon: '🏨', label: 'Hotels' },
              { icon: '➕', label: 'More' },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.label.toLowerCase())}
                className={`flex flex-col items-center gap-1 transition group ${
                  selectedCategory === cat.label.toLowerCase() ? 'text-primary' : 'text-gray-500 hover:text-primary'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition ${
                  selectedCategory === cat.label.toLowerCase() 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-50 group-hover:bg-primary/10'
                }`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Main Content ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* ========== Filters Sidebar ========== */}
          <div className={`
            ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
            lg:block lg:relative lg:inset-auto lg:bg-transparent lg:p-0 lg:overflow-visible lg:w-72 lg:flex-shrink-0
          `}>
            {/* Mobile Close Button */}
            {showMobileFilters && (
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filters
              </h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedCategory === cat.toLowerCase()}
                        onChange={() => setSelectedCategory(selectedCategory === cat.toLowerCase() ? 'all' : cat.toLowerCase())}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {cat}
                      <span className="text-xs text-gray-400 ml-auto">({Math.floor(Math.random() * 50) + 5})</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

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
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Jinja, Uganda</option>
                    <option>Kampala, Uganda</option>
                    <option>Entebbe, Uganda</option>
                    <option>Nairobi, Kenya</option>
                  </select>
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
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 ml-auto">({Math.floor(Math.random() * 100) + 10})</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    In Stock Only
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Fast Delivery
                  </label>
                </div>
              </div>

              <Button className="w-full" onClick={() => setShowMobileFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-24 right-4 z-40 bg-primary text-white p-4 rounded-full shadow-lg"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* ========== Products Section ========== */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{displayedProducts.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{products.length}</span> products
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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

            {/* Products Grid */}
            <div className={`
              grid gap-6
              ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}
            `}>
              {displayedProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`w-full object-cover group-hover:scale-105 transition duration-300 ${
                        viewMode === 'grid' ? 'h-48' : 'h-48 sm:h-56'
                      }`}
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x300/4A7DFF/FFFFFF?text=Product';
                      }}
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                        -{product.discount}%
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition">
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
                      <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition shadow-md hover:shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
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
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition ${
                      currentPage === i + 1
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-xl border border-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== Trust Cards ========== */}
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

      {/* ========== Newsletter ========== */}
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