// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Heart, 
  Search, 
  Shield,
  CreditCard,
  Tag,
  Headphones,
  Truck,
  Lock,
  Check,
  Users,
  Store,
  Wrench,
  Gift,
  Clock,
  MapPin,
  Bell,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
  TrendingUp,
  Zap,
  Package,
  Building,
  User,
  Briefcase,
  Home as HomeIcon,
  Coffee,
  Utensils,
  Car,
  Hotel,
  Scissors,
  GraduationCap,
  Stethoscope,
  Dumbbell
} from 'lucide-react';
import Button from '../components/Button';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  // Hero Slider Data
  const heroSlides = [
    {
      id: 1,
      title: 'Super Deals on Electronics',
      subtitle: 'Up to 50% off on smartphones, laptops & more',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop',
      cta: 'Shop Now',
      link: '/marketplace?category=electronics',
      color: 'from-blue-600 to-primary'
    },
    {
      id: 2,
      title: 'Premium Services at Your Doorstep',
      subtitle: 'Book trusted plumbers, electricians & cleaners',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=400&fit=crop',
      cta: 'Explore Services',
      link: '/services',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Fresh Groceries Delivered',
      subtitle: 'Shop daily essentials from local supermarkets',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
      cta: 'Shop Groceries',
      link: '/marketplace?category=groceries',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Flash Deals (Limited Time Offers)
  const flashDeals = [
    {
      id: 1,
      name: 'Samsung Galaxy S24',
      price: 3200000,
      originalPrice: 4200000,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',
      timeLeft: '2h 15m'
    },
    {
      id: 2,
      name: 'LG Refrigerator 200L',
      price: 1650000,
      originalPrice: 2100000,
      discount: 21,
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd54?w=300&h=300&fit=crop',
      timeLeft: '4h 30m'
    },
    {
      id: 3,
      name: 'Sony 55" Smart TV',
      price: 2500000,
      originalPrice: 3200000,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
      timeLeft: '6h 45m'
    },
    {
      id: 4,
      name: 'Dell XPS 15 Laptop',
      price: 4000000,
      originalPrice: 5200000,
      discount: 23,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop',
      timeLeft: '8h 20m'
    },
    {
      id: 5,
      name: 'TECNO Camon 20 Pro',
      price: 750000,
      originalPrice: 950000,
      discount: 21,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop',
      timeLeft: '3h 10m'
    }
  ];

  // Product Categories (AliExpress style)
  const categories = [
    { icon: '📱', label: 'Electronics', color: 'bg-blue-100 text-blue-600' },
    { icon: '👗', label: 'Fashion', color: 'bg-pink-100 text-pink-600' },
    { icon: '🛒', label: 'Groceries', color: 'bg-green-100 text-green-600' },
    { icon: '🏠', label: 'Home & Living', color: 'bg-yellow-100 text-yellow-600' },
    { icon: '💄', label: 'Beauty', color: 'bg-purple-100 text-purple-600' },
    { icon: '🏥', label: 'Healthcare', color: 'bg-red-100 text-red-600' },
    { icon: '🚗', label: 'Automotive', color: 'bg-orange-100 text-orange-600' },
    { icon: '🏨', label: 'Hotels', color: 'bg-indigo-100 text-indigo-600' },
    { icon: '🔧', label: 'Home Services', color: 'bg-teal-100 text-teal-600' },
    { icon: '📚', label: 'Education', color: 'bg-cyan-100 text-cyan-600' },
    { icon: '💪', label: 'Fitness', color: 'bg-emerald-100 text-emerald-600' },
    { icon: '🎉', label: 'Events', color: 'bg-rose-100 text-rose-600' },
  ];

  // Featured Products (Infinite scroll style)
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Organic Coffee Beans',
      shop: 'FreshMart Grocery',
      price: 45000,
      originalPrice: 55000,
      discount: 18,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Wireless Noise Cancelling Headphones',
      shop: 'Audio Store',
      price: 350000,
      originalPrice: 450000,
      discount: 22,
      rating: 4.8,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Designer Leather Handbag',
      shop: 'Fashion Avenue',
      price: 250000,
      originalPrice: 320000,
      discount: 22,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Smart LED TV 55"',
      shop: 'Electronics World',
      price: 2800000,
      originalPrice: 3200000,
      discount: 12,
      rating: 4.6,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Natural Honey 500g',
      shop: 'FreshMart Grocery',
      price: 15000,
      originalPrice: 20000,
      discount: 25,
      rating: 4.7,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Running Shoes - Premium',
      shop: 'Fashion Avenue',
      price: 180000,
      originalPrice: 220000,
      discount: 18,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'
    }
  ];

  // Service Providers (Individual & Institutional)
  const serviceProviders = [
    {
      id: 1,
      name: 'CleanPro Services',
      type: 'Individual',
      category: 'Home Cleaning',
      rating: 4.7,
      reviews: 89,
      price: 50000,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop',
      isVerified: true
    },
    {
      id: 2,
      name: 'Jinja Regional Hospital',
      type: 'Institutional',
      category: 'Healthcare',
      rating: 4.8,
      reviews: 234,
      price: 'Varies',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=200&h=200&fit=crop',
      isVerified: true
    },
    {
      id: 3,
      name: 'Jinja Grand Hotel',
      type: 'Institutional',
      category: 'Hospitality',
      rating: 4.7,
      reviews: 189,
      price: 'From 150k',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop',
      isVerified: true
    },
    {
      id: 4,
      name: 'John\'s Plumbing',
      type: 'Individual',
      category: 'Home Services',
      rating: 4.9,
      reviews: 67,
      price: 75000,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=200&fit=crop',
      isVerified: true
    },
    {
      id: 5,
      name: 'Power Fitness Gym',
      type: 'Institutional',
      category: 'Fitness',
      rating: 4.8,
      reviews: 134,
      price: '60k/month',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
      isVerified: true
    }
  ];

  // Hot Recommendations
  const recommendations = [
    {
      id: 1,
      name: 'Cooking Oil 2L',
      price: 18000,
      originalPrice: 22000,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Fresh Eggs (30 pieces)',
      price: 15000,
      originalPrice: 18000,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Brown Sugar 1kg',
      price: 8000,
      originalPrice: 10000,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Fresh Bananas (1kg)',
      price: 5000,
      originalPrice: 6000,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&h=200&fit=crop'
    }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HERO SLIDER (AliExpress Style) ========== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[320px] md:h-[420px] lg:h-[480px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-85`}></div>
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 mb-6">
                      {slide.subtitle}
                    </p>
                    <Link to={slide.link}>
                      <Button size="large" className="bg-white text-primary hover:bg-gray-100">
                        {slide.cta} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FLASH DEALS (AliExpress Style Red Banner) ========== */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Zap className="w-6 h-6 text-white fill-white" />
              <span className="text-white font-bold text-lg whitespace-nowrap">FLASH DEALS</span>
              <span className="text-white/80 text-sm hidden sm:inline">| Limited Time Offers</span>
            </div>
            <div className="flex gap-4">
              {flashDeals.map((deal) => (
                <Link key={deal.id} to={`/product/${deal.id}`} className="flex-shrink-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 flex items-center gap-3 hover:bg-white/20 transition">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="text-white">
                      <div className="text-xs font-medium line-clamp-1 max-w-[100px]">{deal.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">UGX {deal.price.toLocaleString()}</span>
                        <span className="text-xs line-through text-white/50">{deal.originalPrice.toLocaleString()}</span>
                        <span className="bg-yellow-400 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          -{deal.discount}%
                        </span>
                      </div>
                      <div className="text-[10px] text-white/70">⏱️ {deal.timeLeft}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUICK CATEGORIES (AliExpress Style Grid) ========== */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/marketplace?category=${cat.label.toLowerCase()}`}
                className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition group"
              >
                <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition`}>
                  {cat.icon}
                </div>
                <span className="text-[10px] text-gray-600 text-center group-hover:text-primary transition">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED PRODUCTS ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🔥 Featured Products</h2>
              <p className="text-sm text-gray-500">Popular items from top-rated shops</p>
            </div>
            <Link to="/marketplace" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      -{product.discount}%
                    </div>
                    <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-50 transition">
                      <Heart className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</h3>
                    <div className="text-xs text-gray-400 line-clamp-1">{product.shop}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm font-bold text-primary">UGX {product.price.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 line-through">{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICE PROVIDERS (Individual + Institutional) ========== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">👥 Trusted Service Providers</h2>
              <p className="text-sm text-gray-500">Individual professionals & verified institutions</p>
            </div>
            <Link to="/services" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceProviders.map((provider) => (
              <Link key={provider.id} to={`/business/${provider.id}`} className="group">
                <div className="bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {provider.isVerified && (
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                          <Shield className="w-3 h-3" /> Verified
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        provider.type === 'Individual' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-purple-500 text-white'
                      }`}>
                        {provider.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{provider.name}</h3>
                    <div className="text-xs text-gray-500">{provider.category}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{provider.rating}</span>
                        <span className="text-[10px] text-gray-400">({provider.reviews})</span>
                      </div>
                      <span className="text-xs font-bold text-primary">UGX {typeof provider.price === 'string' ? provider.price : provider.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SHOP BY CATEGORY (AliExpress Style) ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛍️ Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: 'Electronics', icon: '📱', bg: 'bg-blue-50', products: 1200 },
              { name: 'Fashion', icon: '👗', bg: 'bg-pink-50', products: 850 },
              { name: 'Groceries', icon: '🛒', bg: 'bg-green-50', products: 2300 },
              { name: 'Home & Living', icon: '🏠', bg: 'bg-yellow-50', products: 650 },
              { name: 'Beauty', icon: '💄', bg: 'bg-purple-50', products: 420 },
              { name: 'Healthcare', icon: '🏥', bg: 'bg-red-50', products: 180 },
              { name: 'Automotive', icon: '🚗', bg: 'bg-orange-50', products: 320 },
              { name: 'Hotels', icon: '🏨', bg: 'bg-indigo-50', products: 95 },
            ].map((cat, i) => (
              <Link key={i} to={`/marketplace?category=${cat.name.toLowerCase()}`} className="group">
                <div className={`${cat.bg} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.products} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BEST SELLERS ========== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">⭐ Best Sellers</h2>
              <p className="text-sm text-gray-500">Most popular items this week</p>
            </div>
            <Link to="/marketplace?sort=best-selling" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendations.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group">
                <div className="bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      -{item.discount}%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm font-bold text-primary">UGX {item.price.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 line-through">{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TOP RATED BUSINESSES (Grid) ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🏆 Top Rated Businesses</h2>
              <p className="text-sm text-gray-500">Highest rated shops and services</p>
            </div>
            <Link to="/businesses" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'FreshMart Supermarket', category: 'Retail', rating: 4.8, image: 'https://images.unsplash.com/photo-1534723452862-4c874018d3d4?w=200&h=200&fit=crop' },
              { name: 'Tech Zone Electronics', category: 'Electronics', rating: 4.7, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop' },
              { name: 'Jinja Grand Hotel', category: 'Hospitality', rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop' },
              { name: 'Power Fitness Gym', category: 'Fitness', rating: 4.8, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop' },
              { name: 'Glow Beauty Salon', category: 'Beauty', rating: 4.9, image: 'https://images.unsplash.com/photo-1560066984-0c7c9b7d9d4a?w=200&h=200&fit=crop' },
            ].map((biz, i) => (
              <Link key={i} to={`/business/${i + 1}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <img src={biz.image} alt={biz.name} className="w-full h-28 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{biz.name}</h4>
                    <div className="text-xs text-gray-500">{biz.category}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{biz.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY MUNOLINK (Feature Strip) ========== */}
      <section className="py-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">Trusted & Verified</span>
              <span className="text-xs text-white/70">All businesses verified</span>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">Secure Payments</span>
              <span className="text-xs text-white/70">Bank-grade security</span>
            </div>
            <div className="flex flex-col items-center">
              <Tag className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">Best Prices</span>
              <span className="text-xs text-white/70">Automatic discounts</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">Fast Delivery</span>
              <span className="text-xs text-white/70">Local & reliable</span>
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">24/7 Support</span>
              <span className="text-xs text-white/70">We're here to help</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How Munolink Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🔍', title: 'Discover', desc: 'Find products & services' },
              { icon: '🛒', title: 'Choose', desc: 'Select & add to cart/book' },
              { icon: '🔒', title: 'Pay Securely', desc: 'Safe & easy checkout' },
              { icon: '📦', title: 'Enjoy', desc: 'Get delivered or serviced' },
            ].map((step, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-gray-50">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}