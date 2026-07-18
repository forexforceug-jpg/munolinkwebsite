// src/pages/Services.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Search, 
  Filter,
  Grid,
  List,
  MapPin,
  Shield,
  CreditCard,
  Headphones,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Clock,
  Building,
  User,
  Award,
  Phone,
  Mail,
  Globe,
  Calendar,
  Wifi,
  Coffee,
  Dumbbell,
  Car,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Home,
  Utensils,
  Bus,
  Users,
  ArrowRight,
  // Party removed - using Calendar instead
  // Party icon doesn't exist in lucide-react
} from 'lucide-react';
import Button from '../components/Button';

export default function Services() {
  const [viewMode, setViewMode] = useState('grid');
  const [providerType, setProviderType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('best-match');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Service provider data
  const providers = [
    {
      id: 1,
      name: 'Jinja Regional Hospital',
      category: 'Healthcare',
      type: 'institutional',
      description: 'Full-service hospital with emergency care, maternity, and specialist clinics.',
      location: 'Jinja, Uganda',
      rating: 4.8,
      reviews: 234,
      services: 12,
      isOpen: true,
      is24Hours: true,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop',
      icon: '🏥'
    },
    {
      id: 2,
      name: 'Jinja Grand Hotel',
      category: 'Hospitality',
      type: 'institutional',
      description: 'Luxury hotel with conference facilities, restaurant, and spa services.',
      location: 'Jinja, Uganda',
      rating: 4.7,
      reviews: 189,
      services: 8,
      isOpen: true,
      is24Hours: true,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      icon: '🏨'
    },
    {
      id: 3,
      name: 'Total Energies Jinja',
      category: 'Automotive',
      type: 'institutional',
      description: 'Fuel station with car wash, convenience store, and service bay.',
      location: 'Jinja, Uganda',
      rating: 4.5,
      reviews: 156,
      services: 4,
      isOpen: true,
      is24Hours: true,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
      icon: '⛽'
    },
    {
      id: 4,
      name: 'Jinja Central School',
      category: 'Education',
      type: 'institutional',
      description: 'Primary and secondary school with modern facilities and extracurricular programs.',
      location: 'Jinja, Uganda',
      rating: 4.6,
      reviews: 98,
      services: 5,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
      icon: '📚'
    },
    {
      id: 5,
      name: 'Power Fitness Gym',
      category: 'Fitness & Wellness',
      type: 'institutional',
      description: 'Modern gym with personal training, group classes, and nutrition advice.',
      location: 'Jinja, Uganda',
      rating: 4.8,
      reviews: 134,
      services: 6,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
      icon: '💪'
    },
    {
      id: 6,
      name: 'John\'s Plumbing Services',
      category: 'Home Services',
      type: 'individual',
      description: 'Professional plumbing services for residential and commercial properties.',
      location: 'Jinja, Uganda',
      rating: 4.9,
      reviews: 67,
      services: 3,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
      icon: '🔧'
    },
    {
      id: 7,
      name: 'Marriott Jinja',
      category: 'Hospitality',
      type: 'institutional',
      description: 'International hotel with premium rooms, rooftop restaurant, and event spaces.',
      location: 'Jinja, Uganda',
      rating: 4.9,
      reviews: 267,
      services: 10,
      isOpen: true,
      is24Hours: true,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89434ffe2?w=600&h=400&fit=crop',
      icon: '🏨'
    },
    {
      id: 8,
      name: 'Eco Car Wash & Detail',
      category: 'Automotive',
      type: 'individual',
      description: 'Eco-friendly car wash with interior detailing and paint protection services.',
      location: 'Jinja, Uganda',
      rating: 4.6,
      reviews: 89,
      services: 4,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop',
      icon: '🚗'
    },
    {
      id: 9,
      name: 'Jinja Events Center',
      category: 'Events',
      type: 'institutional',
      description: 'Versatile event space for weddings, conferences, concerts, and exhibitions.',
      location: 'Jinja, Uganda',
      rating: 4.4,
      reviews: 78,
      services: 7,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
      icon: '🎉'
    }
  ];

  // Categories
  const categories = [
    'All Services',
    'Healthcare',
    'Hospitality',
    'Education',
    'Automotive',
    'Home Services',
    'Fitness & Wellness',
    'Transport',
    'Events',
    'Business Services'
  ];

  // Filter providers
  const filteredProviders = providers.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesType = providerType === 'all' || p.type === providerType;
    return matchesCategory && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProviders.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const displayedProviders = filteredProviders.slice(startIndex, endIndex);

  // Trust cards
  const trustCards = [
    { icon: <Shield className="w-6 h-6 text-primary" />, title: 'Verified & Trusted', desc: 'All providers are verified' },
    { icon: <CreditCard className="w-6 h-6 text-primary" />, title: 'Secure Payments', desc: 'Protected transactions' },
    { icon: <Award className="w-6 h-6 text-primary" />, title: 'Quality Guarantee', desc: 'Satisfaction assured' },
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
            <Link to="/services" className="text-primary font-medium">Services</Link>
          </div>
        </div>
      </div>

      {/* ========== Hero Section ========== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Find trusted services <br />
                <span className="text-accent">right when you need them.</span>
              </h1>
              <p className="text-lg text-gray-600">
                Book verified professionals and institutions in your city. From healthcare to hospitality, we've got you covered.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search for services..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative w-full sm:w-48">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Jinja, Uganda</option>
                    <option>Kampala, Uganda</option>
                    <option>Entebbe, Uganda</option>
                  </select>
                </div>
                <Button>Search Services</Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" /> Verified Providers
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-blue-500" /> Secure Payments
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Headphones className="w-4 h-4 text-primary" /> 24/7 Support
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-orange-500" /> Best Prices
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop" 
                  alt="Jinja Regional Hospital"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Glassmorphism Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-primary">🔥 Popular right now</span>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>🏠 Home Cleaning</span>
                      <span>🚗 Car Wash</span>
                      <span>📚 Tutoring</span>
                      <span>🏨 Hotel Booking</span>
                    </div>
                  </div>
                  <Button size="small" className="flex-shrink-0">View all</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Category Browser ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-4 overflow-x-auto">
          <div className="flex gap-8 min-w-max">
            {[
              { icon: '🏥', label: 'Healthcare' },
              { icon: '🏨', label: 'Hospitality' },
              { icon: '📚', label: 'Education' },
              { icon: '🚗', label: 'Automotive' },
              { icon: '🏠', label: 'Home Services' },
              { icon: '💪', label: 'Fitness & Wellness' },
              { icon: '🚌', label: 'Transport' },
              { icon: '🎉', label: 'Events' },
              { icon: '💼', label: 'Business Services' },
              { icon: '➕', label: 'More' },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex flex-col items-center gap-1 transition group ${
                  selectedCategory === cat.label ? 'text-primary' : 'text-gray-500 hover:text-primary'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition ${
                  selectedCategory === cat.label 
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

      {/* ========== Provider Type Switch ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap items-center gap-4 border border-gray-100">
          <span className="text-sm font-semibold text-gray-700">Provider Type:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setProviderType('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                providerType === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setProviderType('individual')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                providerType === 'individual' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User className="w-4 h-4" /> Individuals
            </button>
            <button
              onClick={() => setProviderType('institutional')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                providerType === 'institutional' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Building className="w-4 h-4" /> Institutions
            </button>
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

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Jinja, Uganda</option>
                    <option>Kampala, Uganda</option>
                    <option>Entebbe, Uganda</option>
                  </select>
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Provider Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Provider Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Individual Professionals
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Institutions & Organizations
                  </label>
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Available Now
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Open 24/7
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Accepting Bookings
                  </label>
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
                    max="500000" 
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <Button className="w-full" onClick={() => setShowMobileFilters(false)}>
                Apply Filters
              </Button>

              {/* Support Card */}
              <div className="mt-4 p-4 bg-blue-50 rounded-xl text-center">
                <div className="text-3xl mb-2">💬</div>
                <h4 className="font-semibold text-gray-900 text-sm">Need help finding a provider?</h4>
                <p className="text-xs text-gray-500 mt-1">Chat with our support team</p>
                <Button size="small" className="mt-2 w-full" variant="outline">
                  Contact Support
                </Button>
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

          {/* ========== Providers Section ========== */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{displayedProviders.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{filteredProviders.length}</span> providers
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="best-match">Best Match</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
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

            {/* Providers Grid */}
            <div className={`
              grid gap-6
              ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}
            `}>
              {displayedProviders.map((provider) => (
                <div key={provider.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400/4A7DFF/FFFFFF?text=Service';
                      }}
                    />
                    {provider.isFeatured && (
                      <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                        ⭐ Featured
                      </div>
                    )}
                    {provider.type === 'individual' && (
                      <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                        👤 Professional
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium">
                      {provider.isOpen ? (
                        <span className="text-green-500">● Open</span>
                      ) : (
                        <span className="text-red-500">● Closed</span>
                      )}
                      {provider.is24Hours && (
                        <span className="text-primary ml-2">🕐 24/7</span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{provider.name}</h3>
                        <div className="text-sm text-gray-500 mt-0.5">{provider.category}</div>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">{provider.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{provider.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {provider.location}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{provider.services} services</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{provider.reviews} reviews</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="small">
                      View Services
                    </Button>
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

      {/* ========== Call to Action ========== */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4">Join Munolink as a Service Provider</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Grow your business, reach new customers, and manage bookings all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="large" variant="secondary" onClick={() => {}}>
              Become a Provider
            </Button>
            <Button size="large" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => {}}>
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}