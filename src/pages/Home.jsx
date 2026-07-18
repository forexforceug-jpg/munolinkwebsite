// src/pages/Home.jsx
import { useState } from 'react';
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
  X
} from 'lucide-react';
import Button from '../components/Button';

// Hero Images
const HERO_IMAGE = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=800&fit=crop';
const PHONE_MOCKUP = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=600&fit=crop';

export default function Home() {
  const navigate = useNavigate();

  // Product data
  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      shop: 'Tech Hub Jinja',
      price: 3800000,
      originalPrice: 4200000,
      discount: 9,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'LG Refrigerator 200L',
      shop: 'Home Appliance Center',
      price: 1850000,
      originalPrice: 2100000,
      discount: 12,
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd54?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'TECNO Camon 20 Pro',
      shop: 'Mobile World',
      price: 850000,
      originalPrice: 950000,
      discount: 10,
      rating: 4.5,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Dell XPS 15 Laptop',
      shop: 'Computer Zone',
      price: 4500000,
      originalPrice: 5200000,
      discount: 13,
      rating: 4.9,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Sony 55" Smart TV',
      shop: 'Electronics Store',
      price: 2800000,
      originalPrice: 3200000,
      discount: 12,
      rating: 4.7,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
    }
  ];

  // Services data
  const services = [
    {
      id: 1,
      name: 'Home Cleaning',
      provider: 'CleanPro Services',
      price: 50000,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Electrical Repairs',
      provider: 'Jinja Electricians',
      price: 75000,
      rating: 4.8,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Car Wash & Detailing',
      provider: 'Auto Spa Jinja',
      price: 30000,
      rating: 4.5,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Tutoring Services',
      provider: 'Education Hub',
      price: 45000,
      rating: 4.6,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop'
    }
  ];

  // Features
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: 'Trusted & Verified',
      description: 'All businesses are verified and vetted for your safety.'
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary" />,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-grade security.'
    },
    {
      icon: <Tag className="w-10 h-10 text-primary" />,
      title: 'Automatic Discounts',
      description: 'Get instant discounts on eligible purchases.'
    },
    {
      icon: <Headphones className="w-10 h-10 text-primary" />,
      title: '24/7 Support',
      description: 'Our team is always here to help you.'
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: 'Local & Reliable',
      description: 'Support local businesses in your community.'
    }
  ];

  // Steps
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: 'Discover',
      description: 'Browse products and services from local businesses.'
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      title: 'Choose',
      description: 'Select what you need and add to cart or book.'
    },
    {
      icon: <Lock className="w-8 h-8 text-white" />,
      title: 'Pay Securely',
      description: 'Complete your transaction safely and securely.'
    },
    {
      icon: <Check className="w-8 h-8 text-white" />,
      title: 'Enjoy',
      description: 'Get your products delivered or service completed.'
    }
  ];

  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Local Businesses in Jinja',
      excerpt: 'Discover the best local businesses in Jinja that are making a difference in the community.',
      category: 'Local Business',
      date: 'Dec 15, 2026',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'How to Save Money Shopping Online',
      excerpt: 'Practical tips and strategies to maximize your savings when shopping on Munolink.',
      category: 'Money Saving',
      date: 'Dec 12, 2026',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Why You Should Support Local Shops',
      excerpt: 'Learn about the positive impact of shopping locally and how it strengthens our communities.',
      category: 'Community',
      date: 'Dec 10, 2026',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f2f7?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12 lg:py-20">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Jinja's Trusted Marketplace
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Everything you need <br />
                <span className="text-accent">in one place.</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 max-w-lg">
                Discover, shop, and connect with verified local businesses and service providers across Uganda.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" /> Secure Payments
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-orange-500" /> Best Prices
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-500" /> Verified Businesses
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="large" onClick={() => navigate('/marketplace')}>
                  Start Shopping
                </Button>
                <Button size="large" variant="outline" onClick={() => navigate('/services')}>
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={HERO_IMAGE} 
                  alt="Jinja Nile Bridge"
                  className="w-full h-auto object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent opacity-20"></div>
              </div>

              {/* Phone Mockup Overlay */}
              <div className="absolute -bottom-12 -right-12 w-48 sm:w-56 lg:w-64">
                <img 
                  src={PHONE_MOCKUP} 
                  alt="Munolink Mobile App"
                  className="w-full h-auto drop-shadow-2xl rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Statistics Panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/20">
            {[
              { icon: <Users className="w-6 h-6 text-primary" />, label: 'Happy Customers', value: '10,000+' },
              { icon: <Store className="w-6 h-6 text-primary" />, label: 'Verified Businesses', value: '500+' },
              { icon: <Wrench className="w-6 h-6 text-primary" />, label: 'Service Providers', value: '200+' },
              { icon: <Lock className="w-6 h-6 text-primary" />, label: 'Secure Transactions', value: '50,000+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CATEGORY NAVIGATION ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-4 overflow-x-auto">
          <div className="flex gap-6 min-w-max">
            {[
              { icon: '🛒', label: 'Groceries' },
              { icon: '👗', label: 'Fashion' },
              { icon: '📱', label: 'Electronics' },
              { icon: '🏠', label: 'Home & Living' },
              { icon: '💄', label: 'Beauty' },
              { icon: '🏥', label: 'Health' },
              { icon: '🚗', label: 'Transport' },
              { icon: '🏨', label: 'Hotels' },
              { icon: '🎉', label: 'Events' },
              { icon: '➕', label: 'More' },
            ].map((cat, i) => (
              <Link
                key={i}
                to={`/marketplace?category=${cat.label.toLowerCase()}`}
                className="flex flex-col items-center gap-1 hover:text-primary transition group"
              >
                <span className="text-2xl group-hover:scale-110 transition">{cat.icon}</span>
                <span className="text-xs font-medium text-gray-600 group-hover:text-primary">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Munolink?</h2>
            <p className="mt-2 text-gray-500">Experience the best of local commerce</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MARKETPLACE SECTION ========== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
              <p className="text-gray-500 mt-1">Trending items from local shops</p>
            </div>
            <Link to="/marketplace" className="text-primary hover:underline flex items-center gap-1 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Grid - 2 columns */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full">
                      -{product.discount}%
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <span className="text-xs">{product.shop}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">
                        UGX {product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        UGX {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-400">({product.reviews})</span>
                      </div>
                      <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition shadow-md hover:shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Services Sidebar */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Services</h3>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{service.name}</h4>
                      <p className="text-sm text-gray-500 truncate">{service.provider}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold text-primary">UGX {service.price.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-500">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/services" className="block text-center text-primary hover:underline mt-4 text-sm font-medium">
                Browse all services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROMO BANNERS ========== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exclusive Offers */}
            <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full inline-block">Exclusive</span>
                <h3 className="text-2xl font-bold mt-4">Get 20% Off</h3>
                <p className="text-white/80 mt-2">Your first order on Munolink</p>
                <Button className="mt-6" variant="secondary" onClick={() => navigate('/marketplace')}>
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/5 rounded-full -mr-8 -mb-8"></div>
              <div className="absolute right-12 bottom-12 text-7xl opacity-10">🎁</div>
            </div>

            {/* Get the App */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    QR
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Get the Munolink App</h3>
                  <p className="text-gray-500 text-sm mt-1">Shop on the go. Download now.</p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition shadow-md">
                      <span className="text-lg">📱</span> App Store
                    </button>
                    <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition shadow-md">
                      <span className="text-lg">▶️</span> Google Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How Munolink Works</h2>
            <p className="mt-2 text-gray-500">Four simple steps to get started</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">{step.title}</div>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200">
                    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNER STRIP ========== */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['MTN Uganda', 'Airtel', 'Flutterwave', 'UCC', 'National ID'].map((partner, i) => (
              <div key={i} className="text-gray-400 font-bold text-lg hover:text-gray-600 transition cursor-default">
                {partner}
              </div>
            ))}
            <div className="text-center border-l pl-8 border-gray-200">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-xs text-gray-500">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TOP RATED BUSINESSES ========== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Top Rated Businesses</h2>
              <p className="text-gray-500 mt-1">Highest rated shops and services</p>
            </div>
            <Link to="/businesses" className="text-primary hover:underline flex items-center gap-1 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'FreshMart Supermarket', category: 'Grocery', rating: 4.8, image: 'https://images.unsplash.com/photo-1534723452862-4c874018d3d4?w=200&h=200&fit=crop', isOpen: true },
              { name: 'Tech Zone Electronics', category: 'Electronics', rating: 4.7, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop', isOpen: true },
              { name: 'Glow Beauty Salon', category: 'Beauty', rating: 4.9, image: 'https://images.unsplash.com/photo-1560066984-0c7c9b7d9d4a?w=200&h=200&fit=crop', isOpen: false },
              { name: 'Auto Care Garage', category: 'Automotive', rating: 4.6, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop', isOpen: true },
              { name: 'Jinja Grand Hotel', category: 'Hospitality', rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop', isOpen: true },
            ].map((biz, i) => (
              <div key={i} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                <div className="relative">
                  <img src={biz.image} alt={biz.name} className="w-full h-36 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full">
                    {biz.isOpen ? (
                      <span className="text-green-500">● Open</span>
                    ) : (
                      <span className="text-red-500">● Closed</span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-medium text-primary bg-blue-50 px-2 py-1 rounded-full inline-block">
                    {biz.category}
                  </div>
                  <h4 className="font-semibold text-gray-900 mt-2">{biz.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{biz.rating}</span>
                      <span className="text-sm text-gray-400">(1.2k)</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOG SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest from our Blog</h2>
              <p className="text-gray-500 mt-1">Stay informed with our latest articles</p>
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
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
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
    </div>
  );
}