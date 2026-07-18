// src/pages/Businesses.jsx
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
  Building,
  User,
  Award,
  Calendar,
  Users,
  ArrowRight,
  Store,
  Briefcase,
  TrendingUp,
  Sparkles,
  Clock,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu
} from 'lucide-react';
import Button from '../components/Button';

export default function Businesses() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Featured Businesses Data
  const featuredBusinesses = [
    {
      id: 1,
      name: 'FreshMart Supermarket',
      category: 'Retail & Shops',
      description: 'Premium grocery store with fresh produce, imported goods, and local products.',
      location: 'Jinja, Uganda',
      rating: 4.8,
      reviews: 234,
      isOpen: true,
      is24Hours: false,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1534723452862-4c874018d3d4?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Jinja Grand Hotel',
      category: 'Hotels',
      description: 'Luxury hotel with conference facilities, restaurant, spa, and premium rooms.',
      location: 'Jinja, Uganda',
      rating: 4.7,
      reviews: 189,
      isOpen: true,
      is24Hours: true,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Tech Zone Electronics',
      category: 'Retail & Shops',
      description: 'Leading electronics retailer offering the latest gadgets and tech accessories.',
      location: 'Jinja, Uganda',
      rating: 4.6,
      reviews: 156,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Total Energies Jinja',
      category: 'Petrol Stations',
      description: 'Full-service fuel station with car wash, convenience store, and service bay.',
      location: 'Jinja, Uganda',
      rating: 4.5,
      reviews: 98,
      isOpen: true,
      is24Hours: true,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Jinja Central School',
      category: 'Education',
      description: 'Primary and secondary school with modern facilities and extracurricular programs.',
      location: 'Jinja, Uganda',
      rating: 4.6,
      reviews: 67,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Power Fitness Gym',
      category: 'Gyms & Fitness',
      description: 'Modern gym with personal training, group classes, and nutrition advice.',
      location: 'Jinja, Uganda',
      rating: 4.8,
      reviews: 134,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'
    }
  ];

  // All Businesses (for grid display)
  const allBusinesses = [
    ...featuredBusinesses,
    {
      id: 7,
      name: 'Glow Beauty Salon',
      category: 'Beauty & Spa',
      description: 'Premium beauty salon offering hair, makeup, and spa services.',
      location: 'Jinja, Uganda',
      rating: 4.9,
      reviews: 203,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1560066984-0c7c9b7d9d4a?w=600&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Auto Care Garage',
      category: 'Automotive',
      description: 'Professional auto repair and maintenance services.',
      location: 'Jinja, Uganda',
      rating: 4.4,
      reviews: 78,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop'
    },
    {
      id: 9,
      name: 'Jinja Real Estate',
      category: 'Real Estate',
      description: 'Property sales, rentals, and real estate management services.',
      location: 'Jinja, Uganda',
      rating: 4.5,
      reviews: 112,
      isOpen: true,
      is24Hours: false,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop'
    }
  ];

  // Categories
  const categories = [
    { icon: '🍽️', label: 'Restaurants' },
    { icon: '🏨', label: 'Hotels' },
    { icon: '🏥', label: 'Healthcare' },
    { icon: '📚', label: 'Education' },
    { icon: '🚗', label: 'Automotive' },
    { icon: '🏠', label: 'Real Estate' },
    { icon: '🛍️', label: 'Retail & Shops' },
    { icon: '⛽', label: 'Petrol Stations' },
    { icon: '💪', label: 'Gyms & Fitness' },
    { icon: '💄', label: 'Beauty & Spa' },
    { icon: '➕', label: 'More' },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Nantongo',
      business: 'FreshMart Supermarket',
      quote: 'Munolink has transformed our business. We\'ve seen a 40% increase in foot traffic since joining.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'John Muwonge',
      business: 'Power Fitness Gym',
      quote: 'We\'ve gained over 200 new members through Munolink. The platform is a game-changer for local businesses.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Grace Auma',
      business: 'Jinja Grand Hotel',
      quote: 'Bookings have increased significantly. Our occupancy rate is up by 35% since joining Munolink.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  ];

  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'How to Grow Your Business with Munolink',
      excerpt: 'Learn proven strategies to attract more customers and increase sales on the platform.',
      category: 'Business Growth',
      date: 'Dec 15, 2026',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Secure Payment Practices for Online Businesses',
      excerpt: 'Best practices for ensuring safe and secure transactions with your customers.',
      category: 'Payments',
      date: 'Dec 12, 2026',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Managing Customer Orders Effectively',
      excerpt: 'Tips and tools for streamlining your order management process.',
      category: 'Operations',
      date: 'Dec 10, 2026',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f2f7?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== Breadcrumb ========== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/businesses" className="text-primary font-medium">Businesses</Link>
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
                Discover great businesses <br />
                <span className="text-accent">in your city.</span>
              </h1>
              <p className="text-lg text-gray-600">
                Connect with trusted local businesses across Uganda. From restaurants to hotels, find what you need.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search for businesses..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="relative w-full sm:w-40">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Jinja</option>
                    <option>Kampala</option>
                    <option>Entebbe</option>
                  </select>
                </div>
                <div className="relative w-full sm:w-40">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.label}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <Button>Search</Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" /> Verified Businesses
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-orange-500" /> Best Prices
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-blue-500" /> Secure Payments
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Headphones className="w-4 h-4 text-primary" /> 24/7 Support
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop" 
                  alt="Jinja Nile Bridge"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stats Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">2,560+</div>
                    <div className="text-xs text-gray-500">Verified Businesses</div>
                  </div>
                  <Button size="small" className="flex-shrink-0">
                    Join as a business
                  </Button>
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
            {categories.map((cat, i) => (
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

      {/* ========== Featured Businesses ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">⭐ Featured Businesses</h2>
              <p className="text-gray-500 text-sm">Handpicked top-rated businesses</p>
            </div>
            <Link to="/businesses/all" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {featuredBusinesses.slice(0, 6).map((business) => (
              <div key={business.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x200/4A7DFF/FFFFFF?text=Business';
                    }}
                  />
                  {business.isFeatured && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      ⭐ Featured
                    </div>
                  )}
                  <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-50 transition">
                    <Heart className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 transition" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-medium">
                    {business.isOpen ? (
                      <span className="text-green-500">● Open</span>
                    ) : (
                      <span className="text-red-500">● Closed</span>
                    )}
                    {business.is24Hours && (
                      <span className="text-primary ml-1">🕐 24/7</span>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{business.name}</h4>
                  <div className="text-xs text-gray-500">{business.category}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{business.rating}</span>
                    <span className="text-xs text-gray-400">({business.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Promotional Cards ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* List Your Business */}
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-gray-900">List Your Business</h3>
              <p className="text-gray-500 text-sm mt-2">Reach thousands of customers in your community.</p>
              <Button className="mt-4">List Your Business</Button>
            </div>

            {/* Exclusive Deals */}
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-gray-900">Exclusive Deals</h3>
              <p className="text-gray-500 text-sm mt-2">Discover special offers from trusted businesses.</p>
              <Button className="mt-4" variant="success">Explore Deals</Button>
            </div>

            {/* Munolink for Business */}
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900">Munolink for Business</h3>
              <p className="text-gray-500 text-sm mt-2">Manage customers, orders, and grow your business.</p>
              <Button className="mt-4" variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== How It Works ========== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">How to Get Started</h2>
            <p className="text-gray-500 mt-2">Five simple steps to grow your business with Munolink</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: '📝', title: 'Create Account', desc: 'Sign up as a business owner' },
              { icon: '✅', title: 'Get Verified', desc: 'Submit your business documents' },
              { icon: '📋', title: 'List Services', desc: 'Add your products and services' },
              { icon: '🔍', title: 'Get Discovered', desc: 'Customers find your business' },
              { icon: '📈', title: 'Grow Business', desc: 'Manage and expand your reach' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-gray-900">{step.title}</div>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                {i < 4 && (
                  <div className="hidden lg:block relative">
                    <div className="absolute top-0 left-full w-full h-0.5 bg-gray-200">
                      <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Testimonials ========== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">What Business Owners Say</h2>
            <p className="text-gray-500 mt-2">Real stories from real businesses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/48x48/4A7DFF/FFFFFF?text=' + testimonial.name[0];
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="text-xs text-gray-500">{testimonial.business}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Blog Section ========== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest from our Blog</h2>
              <p className="text-gray-500 mt-1">Tips and insights for business owners</p>
            </div>
            <Link to="/blog" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300/4A7DFF/FFFFFF?text=Blog';
                    }}
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="bg-blue-50 text-primary px-2.5 py-1 rounded-full font-medium">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mt-2 group-hover:text-primary transition text-lg">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Newsletter ========== */}
      <section className="py-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-white/80 mb-6">Subscribe for exclusive business tips and updates</p>
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