// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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
  Dumbbell,
  Eye
} from 'lucide-react';
import Button from '../components/Button';

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flashDeals, setFlashDeals] = useState([]);
  const [majorCategories, setMajorCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [providerType, setProviderType] = useState('all');
  
  // Featured Products states
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  
  // Service Providers states
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 15,
    seconds: 30
  });

  // ========== FALLBACK DATA ==========
  const fallbackProducts = [
    { id: 1, name: 'Premium Organic Coffee Beans', shop: 'FreshMart Grocery', price: 45000, originalPrice: 55000, discount: 18, rating: 4.8, reviews: 234, category: 'Groceries', image: '/images/products/coffee.jpg', inStock: true },
    { id: 2, name: 'Wireless Noise Cancelling Headphones', shop: 'Audio Store', price: 350000, originalPrice: 450000, discount: 22, rating: 4.8, reviews: 178, category: 'Electronics', image: '/images/products/headphones.jpg', inStock: true },
    { id: 3, name: 'Designer Leather Handbag', shop: 'Fashion Avenue', price: 250000, originalPrice: 320000, discount: 22, rating: 4.7, reviews: 89, category: 'Fashion', image: '/images/products/handbag.jpg', inStock: true },
    { id: 4, name: 'Smart LED TV 55"', shop: 'Electronics World', price: 2800000, originalPrice: 3200000, discount: 12, rating: 4.6, reviews: 67, category: 'Electronics', image: '/images/products/tv.jpg', inStock: true },
    { id: 5, name: 'Natural Honey 500g', shop: 'FreshMart Grocery', price: 15000, originalPrice: 20000, discount: 25, rating: 4.7, reviews: 456, category: 'Groceries', image: '/images/products/honey.jpg', inStock: true },
    { id: 6, name: 'Running Shoes - Premium', shop: 'Fashion Avenue', price: 180000, originalPrice: 220000, discount: 18, rating: 4.6, reviews: 234, category: 'Fashion', image: '/images/products/shoes.jpg', inStock: true },
    { id: 7, name: 'Cooking Oil 2L', shop: 'FreshMart Grocery', price: 18000, originalPrice: 22000, discount: 18, rating: 4.5, reviews: 567, category: 'Groceries', image: '/images/products/oil.jpg', inStock: true },
    { id: 8, name: 'Fresh Eggs (30 pieces)', shop: 'FreshMart Grocery', price: 15000, originalPrice: 18000, discount: 16, rating: 4.5, reviews: 567, category: 'Groceries', image: '/images/products/eggs.jpg', inStock: true },
    { id: 9, name: 'Brown Sugar 1kg', shop: 'FreshMart Grocery', price: 8000, originalPrice: 10000, discount: 20, rating: 4.5, reviews: 567, category: 'Groceries', image: '/images/products/sugar.jpg', inStock: true },
    { id: 10, name: 'Fresh Bananas (1kg)', shop: 'FreshMart Grocery', price: 5000, originalPrice: 6000, discount: 16, rating: 4.5, reviews: 567, category: 'Groceries', image: '/images/products/bananas.jpg', inStock: true },
    { id: 11, name: 'Dell XPS 15 Laptop', shop: 'Tech Hub Jinja', price: 4500000, originalPrice: 5200000, discount: 13, rating: 4.9, reviews: 56, category: 'Electronics', image: '/images/products/laptop.jpg', inStock: true },
    { id: 12, name: 'Sony 55" Smart TV', shop: 'Electronics Store', price: 2800000, originalPrice: 3200000, discount: 12, rating: 4.7, reviews: 45, category: 'Electronics', image: '/images/products/tv.jpg', inStock: true }
  ];

  const fallbackProviders = [
    { id: 1, name: 'CleanPro Services', type: 'Individual', category: 'Home Cleaning', rating: 4.7, reviews: 89, price: 50000, priceDisplay: 'UGX 50,000', isVerified: true, image: '/images/services/cleaning.jpg', serviceName: 'Professional Home Cleaning', serviceId: 's1' },
    { id: 2, name: 'Jinja Regional Hospital', type: 'Institutional', category: 'Healthcare', rating: 4.8, reviews: 234, price: 0, priceDisplay: 'Varies', isVerified: true, image: '/images/services/hospital.jpg', serviceName: 'Full Medical Services', serviceId: 's2' },
    { id: 3, name: 'Jinja Grand Hotel', type: 'Institutional', category: 'Hospitality', rating: 4.7, reviews: 189, price: 0, priceDisplay: 'From 150k', isVerified: true, image: '/images/services/hotel.jpg', serviceName: 'Luxury Accommodation', serviceId: 's3' },
    { id: 4, name: 'John\'s Plumbing', type: 'Individual', category: 'Home Services', rating: 4.9, reviews: 67, price: 75000, priceDisplay: 'UGX 75,000', isVerified: true, image: '/images/services/plumbing.jpg', serviceName: 'Emergency Plumbing', serviceId: 's4' },
    { id: 5, name: 'Power Fitness Gym', type: 'Institutional', category: 'Fitness', rating: 4.8, reviews: 134, price: 0, priceDisplay: '60k/month', isVerified: true, image: '/images/services/gym.jpg', serviceName: 'Full Gym Membership', serviceId: 's5' },
    { id: 6, name: 'Eco Car Wash', type: 'Institutional', category: 'Automotive', rating: 4.6, reviews: 89, price: 30000, priceDisplay: 'UGX 30,000', isVerified: true, image: '/images/services/carwash.jpg', serviceName: 'Premium Car Wash', serviceId: 's6' },
    { id: 7, name: 'Tutoring Services', type: 'Individual', category: 'Education', rating: 4.6, reviews: 34, price: 45000, priceDisplay: 'UGX 45,000', isVerified: true, image: '/images/services/tutoring.jpg', serviceName: 'Private Tutoring', serviceId: 's7' },
    { id: 8, name: 'Glow Beauty Salon', type: 'Institutional', category: 'Beauty', rating: 4.9, reviews: 203, price: 0, priceDisplay: 'Varies', isVerified: true, image: '/images/services/salon.jpg', serviceName: 'Full Beauty Services', serviceId: 's8' },
    { id: 9, name: 'Auto Care Garage', type: 'Institutional', category: 'Automotive', rating: 4.4, reviews: 78, price: 0, priceDisplay: 'Contact for price', isVerified: true, image: '/images/services/garage.jpg', serviceName: 'Auto Repair Services', serviceId: 's9' },
    { id: 10, name: 'Electrician Services', type: 'Individual', category: 'Home Services', rating: 4.7, reviews: 45, price: 60000, priceDisplay: 'UGX 60,000', isVerified: true, image: '/images/services/electrical.jpg', serviceName: 'Electrical Repairs', serviceId: 's10' }
  ];

  const fallbackSlides = [
    {
      id: 1,
      title: 'Welcome to Munolink',
      subtitle: 'Your trusted local marketplace',
      cta_text: 'Get Started',
      cta_link: '/register',
      image_url: '/images/hero/slide-1.jpg',
      bg_color: 'from-blue-600 to-primary'
    },
    {
      id: 2,
      title: 'Shop Local',
      subtitle: 'Discover amazing products from local shops',
      cta_text: 'Shop Now',
      cta_link: '/marketplace',
      image_url: '/images/hero/slide-2.jpg',
      bg_color: 'from-green-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Book Services',
      subtitle: 'Find trusted professionals in your city',
      cta_text: 'Explore Services',
      cta_link: '/services',
      image_url: '/images/hero/slide-3.jpg',
      bg_color: 'from-orange-500 to-red-500'
    }
  ];

  const fallbackCategories = [
    { id: 1, name: 'Electronics', slug: 'electronics', icon: '📱' },
    { id: 2, name: 'Fashion', slug: 'fashion', icon: '👗' },
    { id: 3, name: 'Groceries', slug: 'groceries', icon: '🛒' },
    { id: 4, name: 'Home & Living', slug: 'home-living', icon: '🏠' },
    { id: 5, name: 'Beauty & Health', slug: 'beauty-health', icon: '💄' },
    { id: 6, name: 'Automotive', slug: 'automotive', icon: '🚗' },
    { id: 7, name: 'Hardware', slug: 'hardware', icon: '🔨' },
    { id: 8, name: 'Books & Stationery', slug: 'books-stationery', icon: '📚' },
  ];

  // ========== FETCH MAJOR CATEGORIES ==========
  useEffect(() => {
    fetchMajorCategories();
  }, []);

  const fetchMajorCategories = async () => {
    setLoadingCategories(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_major_category', true)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        setMajorCategories(fallbackCategories);
      } else {
        setMajorCategories(data);
      }
    } catch (err) {
      setMajorCategories(fallbackCategories);
    }
    setLoadingCategories(false);
  };

  // ========== FETCH HERO SLIDES ==========
  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const fetchHeroSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error || !data || data.length === 0) {
        setHeroSlides(fallbackSlides);
      } else {
        setHeroSlides(data);
      }
    } catch (err) {
      setHeroSlides(fallbackSlides);
    }
  };

  // ========== FETCH FLASH DEALS ==========
  useEffect(() => {
    fetchFlashDeals();
  }, []);

  const fetchFlashDeals = async () => {
    try {
      const { data: products, error } = await supabase
        .from('shop_products')
        .select(`
          regular_price,
          catalog_id,
          shop_id,
          in_stock
        `)
        .eq('in_stock', true)
        .limit(5);

      let deals = [];

      if (!error && products && products.length > 0) {
        for (const p of products) {
          const { data: catalog } = await supabase
            .from('catalog')
            .select('id, name, category, images')
            .eq('id', p.catalog_id)
            .single();
            
          const { data: shop } = await supabase
            .from('shops')
            .select('id, name, discount_percentage, area')
            .eq('id', p.shop_id)
            .single();

          if (catalog && shop) {
            const discount = shop.discount_percentage || 10;
            deals.push({
              deal_type: 'product',
              title: catalog.name,
              original_price: p.regular_price,
              deal_price: Math.round(p.regular_price * (1 - discount / 100)),
              discount_percentage: discount,
              provider_name: shop.name,
              image_url: catalog.images?.[0] || '/images/products/placeholder.jpg',
              item_link: `/product/${catalog.id}`,
              provider_link: `/shop/${shop.id}`,
              location: shop.area || 'Near you',
              rating: 4.5,
              review_count: 0
            });
          }
        }
      }

      setFlashDeals(deals.length > 0 ? deals : []);
    } catch (err) {
      setFlashDeals([]);
    }
  };

  // ========== FETCH FEATURED PRODUCTS ==========
  useEffect(() => {
    setFeaturedProducts(fallbackProducts);
    setLoadingFeatured(false);
    
    const fetchProducts = async () => {
      try {
        const { data: productData, error } = await supabase
          .from('shop_products')
          .select('id, regular_price, shop_id, catalog_id, in_stock')
          .eq('in_stock', true)
          .order('created_at', { ascending: false })
          .limit(12);

        if (error || !productData || productData.length === 0) {
          return;
        }

        const catalogIds = productData.map(p => p.catalog_id).filter(Boolean);
        let catalogMap = {};
        if (catalogIds.length > 0) {
          const { data: catalogData } = await supabase
            .from('catalog')
            .select('id, name, category, images')
            .in('id', catalogIds);
          if (catalogData) {
            catalogData.forEach(c => { catalogMap[c.id] = c; });
          }
        }

        const shopIds = productData.map(p => p.shop_id).filter(Boolean);
        let shopMap = {};
        if (shopIds.length > 0) {
          const { data: shopData } = await supabase
            .from('shops')
            .select('id, name, rating, review_count, discount_percentage')
            .in('id', shopIds);
          if (shopData) {
            shopData.forEach(s => { shopMap[s.id] = s; });
          }
        }

        const formatted = productData.map(item => {
          const catalog = catalogMap[item.catalog_id] || {};
          const shop = shopMap[item.shop_id] || {};
          const discount = shop.discount_percentage || 0;
          const price = item.regular_price || 0;
          const dealPrice = discount > 0 ? price * (1 - discount / 100) : price;

          return {
            id: item.id,
            catalogId: item.catalog_id,
            shopId: item.shop_id,
            name: catalog.name || 'Product',
            shop: shop.name || 'Shop',
            price: Math.round(dealPrice),
            originalPrice: price,
            discount: discount,
            rating: shop.rating || 0,
            reviews: shop.review_count || 0,
            category: catalog.category || 'Uncategorized',
            image: catalog.images?.[0] || '/images/products/placeholder.jpg',
            inStock: item.in_stock
          };
        });

        if (formatted.length > 0) {
          setFeaturedProducts(formatted);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // ========== FETCH SERVICE PROVIDERS ==========
  useEffect(() => {
    setServiceProviders(fallbackProviders);
    setLoadingServices(false);
    
    const fetchProviders = async () => {
      try {
        const { data: providerData, error } = await supabase
          .from('provider_services')
          .select('id, price, user_id, institution_id, service_id, is_active')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error || !providerData || providerData.length === 0) {
          return;
        }

        const serviceIds = providerData.map(p => p.service_id).filter(Boolean);
        let serviceMap = {};
        if (serviceIds.length > 0) {
          const { data: serviceData } = await supabase
            .from('service_catalog')
            .select('id, name, category, images')
            .in('id', serviceIds);
          if (serviceData) {
            serviceData.forEach(s => { serviceMap[s.id] = s; });
          }
        }

        const userIds = providerData.map(p => p.user_id).filter(Boolean);
        let userMap = {};
        if (userIds.length > 0) {
          const { data: userData } = await supabase
            .from('users')
            .select('id, full_name, rating, review_count, avatar_url')
            .in('id', userIds);
          if (userData) {
            userData.forEach(u => { userMap[u.id] = u; });
          }
        }

        const institutionIds = providerData.map(p => p.institution_id).filter(Boolean);
        let institutionMap = {};
        if (institutionIds.length > 0) {
          const { data: institutionData } = await supabase
            .from('institutions')
            .select('id, name, rating, review_count, logo, type')
            .in('id', institutionIds);
          if (institutionData) {
            institutionData.forEach(i => { institutionMap[i.id] = i; });
          }
        }

        const formatted = providerData.map(item => {
          const service = serviceMap[item.service_id] || {};
          const isIndividual = item.user_id !== null;
          const provider = isIndividual ? userMap[item.user_id] : institutionMap[item.institution_id];
          
          const name = isIndividual ? provider?.full_name : provider?.name;
          const rating = isIndividual ? provider?.rating : provider?.rating;
          const reviews = isIndividual ? provider?.review_count : provider?.review_count;
          const image = isIndividual ? provider?.avatar_url : provider?.logo;
          const type = isIndividual ? 'Individual' : 'Institutional';
          
          return {
            id: item.id,
            serviceId: item.service_id,
            providerId: isIndividual ? item.user_id : item.institution_id,
            name: name || 'Service Provider',
            type: type,
            category: service.category || 'Service',
            rating: rating || 0,
            reviews: reviews || 0,
            price: item.price || 0,
            priceDisplay: item.price ? `UGX ${item.price.toLocaleString()}` : 'Contact for price',
            isVerified: true,
            image: service.images?.[0] || image || '/images/services/placeholder.jpg',
            serviceName: service.name || 'Service',
            description: service.description || ''
          };
        });

        if (formatted.length > 0) {
          setServiceProviders(formatted);
        }
      } catch (err) {
        console.error('Error fetching providers:', err);
      }
    };

    fetchProviders();
  }, []);

  // ========== COUNTDOWN TIMER ==========
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ========== AUTO-ROTATE HERO SLIDES ==========
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // ========== HANDLERS ==========
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${product.name} added to cart!`);
  };

  const handleViewService = (provider, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/service/${provider.serviceId}`);
  };

  const providerCounts = {
    products: featuredProducts.length,
    individual: serviceProviders.filter(p => p.type === 'Individual').length,
    institutional: serviceProviders.filter(p => p.type === 'Institutional').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HERO SLIDER ========== */}
      {heroSlides.length > 0 ? (
        <section className="relative overflow-hidden">
          <div className="relative h-[320px] md:h-[420px] lg:h-[480px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id || index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg_color || 'from-blue-600 to-primary'} opacity-85`}></div>
                <img 
                  src={slide.image_url} 
                  alt={slide.title || 'Slide'}
                  className="w-full h-full object-cover mix-blend-overlay"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/hero/slide-fallback.jpg';
                  }}
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl text-white">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                        {slide.title || 'Welcome to Munolink'}
                      </h1>
                      <p className="text-lg sm:text-xl text-white/90 mb-6">
                        {slide.subtitle || 'Your trusted local marketplace'}
                      </p>
                      {slide.cta_text && (
                        <Link to={slide.cta_link || '/'}>
                          <button className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg flex items-center gap-2">
                            {slide.cta_text} <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slider Dots */}
            {heroSlides.length > 1 && (
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
            )}
          </div>
        </section>
      ) : (
        <div className="h-[320px] md:h-[420px] lg:h-[480px] bg-gradient-to-r from-blue-600 to-primary flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">📱</div>
            <h1 className="text-3xl font-bold">Welcome to Munolink</h1>
            <p className="text-white/80 mt-2">Loading...</p>
          </div>
        </div>
      )}

      {/* ========== FLASH DEALS ========== */}
      {flashDeals.length > 0 && (
        <section className="bg-gradient-to-r from-red-500 to-red-600 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full animate-pulse">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg sm:text-xl whitespace-nowrap">⚡ FLASH DEALS</span>
                  <span className="text-white/70 text-xs sm:text-sm hidden sm:inline ml-2">| Limited Time Offers</span>
                </div>
                <div className="flex items-center gap-1 ml-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-bold font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-white/70 text-[10px]">left</span>
                </div>
              </div>
              
              <Link to="/marketplace?deals=flash" className="text-white hover:text-white/80 text-sm font-medium flex items-center gap-1 flex-shrink-0 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto mt-3 pb-2 -mx-2 px-2">
              <div className="flex gap-3 min-w-max">
                {flashDeals.map((deal, index) => (
                  <div key={index} className="flex-shrink-0 w-[220px] group">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10 hover:shadow-xl">
                      <Link to={deal.item_link} className="block">
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={deal.image_url} 
                              alt={deal.title}
                              className="w-14 h-14 rounded-lg object-cover border-2 border-white/20"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/products/placeholder.jpg';
                              }}
                            />
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-bounce">
                              -{deal.discount_percentage}%
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 text-white">
                            <h4 className="text-xs font-semibold line-clamp-1 group-hover:underline">
                              {deal.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-bold text-yellow-300">
                                UGX {Number(deal.deal_price).toLocaleString()}
                              </span>
                              <span className="text-[10px] line-through text-white/50">
                                UGX {Number(deal.original_price).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-[10px] text-white/80 ml-0.5">
                                  {deal.rating?.toFixed(1) || '4.5'}
                                </span>
                              </div>
                              <span className="text-[10px] text-white/50">
                                ({deal.review_count || 0})
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="mt-2">
                        <div className="flex justify-between text-[8px] text-white/50 mb-0.5">
                          <span>Sold: {Math.floor(Math.random() * 40 + 30)}%</span>
                          <span>🔥 Hurry!</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.floor(Math.random() * 40 + 30)}%` }}
                          />
                        </div>
                      </div>
                      <Link 
                        to={deal.provider_link} 
                        className="mt-2 block text-center text-[10px] text-white/60 hover:text-white transition border-t border-white/10 pt-2 group-hover:border-white/20"
                      >
                        📍 {deal.provider_name} · {deal.location || 'Near you'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== QUICK CATEGORIES ========== */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingCategories ? (
            <div className="text-center py-4 text-gray-500">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {majorCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/marketplace?category=${cat.slug}`}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-3xl group-hover:scale-110 transition group-hover:bg-primary group-hover:text-white">
                    {cat.icon || '📦'}
                  </div>
                  <span className="text-xs font-medium text-gray-600 text-center group-hover:text-primary transition leading-tight">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== PROVIDER TYPE SWITCH ========== */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Browse:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setProviderType('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                    providerType === 'all' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Package className="w-4 h-4" /> All ({providerCounts.products + providerCounts.individual + providerCounts.institutional})
                </button>
                <button
                  onClick={() => setProviderType('products')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                    providerType === 'products' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" /> Products ({providerCounts.products})
                </button>
                <button
                  onClick={() => setProviderType('individual')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                    providerType === 'individual' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <User className="w-4 h-4" /> Individual ({providerCounts.individual})
                </button>
                <button
                  onClick={() => setProviderType('institutional')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                    providerType === 'institutional' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Building className="w-4 h-4" /> Institutional ({providerCounts.institutional})
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              {providerType === 'all' && 'Showing: All Providers'}
              {providerType === 'products' && 'Showing: Products Only'}
              {providerType === 'individual' && 'Showing: Individual Services'}
              {providerType === 'institutional' && 'Showing: Institutional Services'}
            </div>
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
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <Link to={`/product/${product.catalogId || product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/products/placeholder.jpg';
                      }}
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    <button 
                      className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-50 transition"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 transition" />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <div className="text-xs text-gray-400 line-clamp-1">{product.category}</div>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</h3>
                    <div className="text-xs text-gray-400 line-clamp-1">{product.shop}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm font-bold text-primary">UGX {product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-gray-400 line-through">UGX {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full py-2 bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-1 border-t border-gray-100"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICE PROVIDERS ========== */}
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
              <div key={provider.id} className="bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <Link to={`/business/${provider.providerId}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/services/placeholder.jpg';
                      }}
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
                    <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{provider.serviceName}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{provider.rating}</span>
                        <span className="text-[10px] text-gray-400">({provider.reviews})</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{provider.priceDisplay}</span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={(e) => handleViewService(provider, e)}
                  className="w-full py-2 bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-1 border-t border-gray-100"
                >
                  <Eye className="w-3.5 h-3.5" /> View Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SHOP BY CATEGORY ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛍️ Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {majorCategories.slice(0, 8).map((cat, i) => (
              <Link key={i} to={`/marketplace?category=${cat.slug}`} className="group">
                <div className={`bg-blue-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-4xl mb-2">{cat.icon || '📦'}</div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">View products</p>
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
            {featuredProducts.slice(0, 4).map((item) => (
              <Link key={item.id} to={`/product/${item.catalogId || item.id}`} className="group">
                <div className="bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/products/placeholder.jpg';
                      }}
                    />
                    {item.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        -{item.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm font-bold text-primary">UGX {item.price.toLocaleString()}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] text-gray-400 line-through">UGX {item.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TOP RATED BUSINESSES ========== */}
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
            {serviceProviders.slice(0, 5).map((biz, i) => (
              <Link key={i} to={`/business/${biz.providerId}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <img 
                    src={biz.image} 
                    alt={biz.name} 
                    className="w-full h-28 object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/businesses/placeholder.jpg';
                    }}
                  />
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

      {/* ========== WHY MUNOLINK ========== */}
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