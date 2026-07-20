// src/pages/ProductDetail.jsx
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  MapPin, 
  Shield, 
  Truck, 
  Clock,
  Check,
  ArrowRight,
  Share2,
  Bookmark,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Package,
  CreditCard,
  RefreshCw,
  Tag,
  Plus,
  Minus,
  Store,
  Award,
  TrendingUp,
  Sparkles,
  Home,
  User,
  Mail,
  Phone,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Button from '../components/Button';

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Product data
  const product = {
    id: 1,
    name: 'Pearl Pishori Rice 2kg',
    category: 'Groceries',
    description: 'Premium quality Pishori rice, known for its long grains, fluffy texture, and rich aroma. Perfect for special occasions and everyday meals. Sourced from the finest rice-growing regions of Uganda, each grain is carefully selected to ensure the highest quality and taste.',
    price: 18000,
    originalPrice: 22000,
    discount: 18,
    rating: 4.8,
    reviews: 234,
    inStock: true,
    sku: 'RICE-001',
    weight: '2kg',
    brand: 'Pearl',
    seller: {
      name: 'FreshMart Supermarket',
      rating: 4.8,
      reviews: 456,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1534723452862-4c874018d3d4?w=100&h=100&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=600&h=600&fit=crop'
    ],
    benefits: [
      'Premium quality Pishori rice',
      'Long grains with fluffy texture',
      'Rich aroma and authentic taste',
      'Perfect for biryani, pilau, and everyday meals',
      'Hygienically packed for freshness'
    ],
    nutrition: {
      calories: '130 kcal',
      protein: '3.5g',
      carbohydrates: '28g',
      fat: '0.2g',
      fiber: '0.4g'
    },
    delivery: {
      location: 'Jinja, Uganda',
      fee: 5000,
      estimate: 'Today, before 8:00 PM',
      cutoff: '4:30 PM'
    }
  };

  // Frequently bought together products
  const bundleProducts = [
    {
      id: 2,
      name: 'Cooking Oil 2L',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Brown Sugar 1kg',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=150&h=150&fit=crop'
    }
  ];

  // Recommended products
  const recommendedProducts = [
    {
      id: 4,
      name: 'Cooking Oil 2L',
      price: 18000,
      rating: 4.5,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Brown Sugar 1kg',
      price: 8000,
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=200&h=200&fit=crop'
    },
    {
      id: 6,
      name: 'Fresh Eggs (30 pieces)',
      price: 15000,
      rating: 4.8,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop'
    },
    {
      id: 7,
      name: 'Soda (1.5L)',
      price: 3000,
      rating: 4.4,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
    }
  ];

  // Trust cards
  const trustCards = [
    { icon: <Shield className="w-5 h-5 text-primary" />, title: '100% Genuine', desc: 'Authentic products guaranteed' },
    { icon: <Truck className="w-5 h-5 text-primary" />, title: 'Fast Delivery', desc: 'Same-day delivery available' },
    { icon: <CreditCard className="w-5 h-5 text-primary" />, title: 'Secure Payments', desc: 'Protected transactions' },
    { icon: <RefreshCw className="w-5 h-5 text-primary" />, title: 'Easy Returns', desc: 'Hassle-free returns' },
  ];

  // Footer trust
  const footerTrust = [
    { icon: <Award className="w-5 h-5 text-primary" />, title: 'Best Prices', desc: 'Competitive pricing' },
    { icon: <Store className="w-5 h-5 text-primary" />, title: 'Trusted Shops', desc: 'Verified merchants' },
    { icon: <CreditCard className="w-5 h-5 text-primary" />, title: 'Secure Payments', desc: 'Pay with confidence' },
    { icon: <Headphones className="w-5 h-5 text-primary" />, title: 'Support 24/7', desc: 'Always here to help' },
  ];

  const bundleTotal = product.price + bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleSavings = bundleTotal * 0.1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== Breadcrumb ========== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/shop" className="hover:text-primary transition">Shop</Link>
            <span className="text-gray-300">/</span>
            <Link to="/shop/groceries" className="hover:text-primary transition">Groceries</Link>
            <span className="text-gray-300">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ========== Product Main Section ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ========== Left Column - Images ========== */}
          <div>
            <div className="grid grid-cols-5 gap-4">
              {/* Thumbnails */}
              <div className="col-span-1 space-y-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === i ? 'border-primary' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Product view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="col-span-4 relative bg-white rounded-2xl shadow-sm overflow-hidden aspect-square">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>
                <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-50 transition">
                  <Share2 className="w-5 h-5 text-gray-400 hover:text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* ========== Right Column - Product Info ========== */}
          <div className="space-y-4">
            {/* Category */}
            <div className="text-sm text-primary font-medium">{product.category}</div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-500">{product.reviews} reviews</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">UGX {product.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">UGX {product.originalPrice.toLocaleString()}</span>
              <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-600 font-medium">✓ In Stock</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">Sold by <Link to="/shop/1" className="text-primary hover:underline">{product.seller.name}</Link></span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" size="large">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button className="flex-1" size="large" variant="outline">
                Buy Now
              </Button>
            </div>

            {/* Loyalty Points */}
            <div className="bg-blue-50 rounded-xl p-3 text-sm text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Earn <strong>180</strong> Munolink points with this purchase</span>
            </div>

            {/* Trust Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {trustCards.map((card, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  {card.icon}
                  <div>
                    <div className="font-medium">{card.title}</div>
                    <div className="text-gray-400">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== Tab Navigation ========== */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex gap-6 overflow-x-auto px-6 pt-4">
            {['Overview', 'Details', 'Nutrition Info', 'Reviews', 'Shop Info'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-medium whitespace-nowrap transition pb-3 border-b-2 ${
                  activeTab === tab.toLowerCase().replace(' ', '-')
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-gray-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Storage Tip:</strong> Store in a cool, dry place away from direct sunlight to maintain freshness.</span>
                  </div>
                </div>

                {/* Delivery & Seller Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Delivery Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location</span>
                        <span className="font-medium">{product.delivery.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery Fee</span>
                        <span className="font-medium">UGX {product.delivery.fee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Arrival</span>
                        <span className="font-medium text-primary">{product.delivery.estimate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Order Before</span>
                        <span className="font-medium text-orange-500">{product.delivery.cutoff}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seller Card */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.seller.logo} 
                        alt={product.seller.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{product.seller.name}</h4>
                          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ✓ Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>⭐ {product.seller.rating}</span>
                          <span>{product.seller.reviews} reviews</span>
                        </div>
                      </div>
                      <Link to="/shop/1" className="text-primary text-sm font-medium hover:underline">
                        View Shop
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Product Name</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium">{product.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Availability</span>
                    <span className="font-medium text-green-600">In Stock</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition-info' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Nutrition Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {Object.entries(product.nutrition).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-primary">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">* Nutritional values are per serving</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Reviews</h3>
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{product.rating}</div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{product.reviews} reviews</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 w-16">5 star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-gray-500">72%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 w-16">4 star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                      <span className="text-gray-500">18%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 w-16">3 star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '6%' }}></div>
                      </div>
                      <span className="text-gray-500">6%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah N.', rating: 5, text: 'Excellent quality rice! The grains are long and fluffy. Perfect for pilau.', date: '2 days ago' },
                    { name: 'John M.', rating: 4, text: 'Good product. The price is reasonable and the quality is consistent.', date: '1 week ago' },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{review.name}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shop-info' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About {product.seller.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={product.seller.logo} 
                        alt={product.seller.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{product.seller.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>⭐ {product.seller.rating}</span>
                          <span>{product.seller.reviews} reviews</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium">✓ Verified Shop</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location</span>
                        <span>Jinja, Uganda</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category</span>
                        <span>Retail & Groceries</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Established</span>
                        <span>2018</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Products</span>
                        <span>1,200+</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="w-full">Visit Shop</Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4" /> Contact Shop
                    </Button>
                    <div className="flex gap-3 justify-center">
                      <a href="#" className="text-gray-400 hover:text-primary transition"><Facebook className="w-5 h-5" /></a>
                      <a href="#" className="text-gray-400 hover:text-primary transition"><Twitter className="w-5 h-5" /></a>
                      <a href="#" className="text-gray-400 hover:text-primary transition"><Instagram className="w-5 h-5" /></a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========== Frequently Bought Together ========== */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {[product, ...bundleProducts].map((item, i) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm font-bold text-primary">UGX {item.price.toLocaleString()}</div>
                    </div>
                  </div>
                  {i < bundleProducts.length && (
                    <div className="text-2xl font-bold text-gray-300">+</div>
                  )}
                </div>
              ))}
              <div className="text-2xl font-bold text-gray-300">=</div>
              <div className="text-center sm:text-left">
                <div className="text-sm text-gray-500">Bundle Total</div>
                <div className="text-xl font-bold text-primary">UGX {bundleTotal.toLocaleString()}</div>
                <div className="text-xs text-green-500">Save UGX {bundleSavings.toLocaleString()}</div>
              </div>
              <Button className="ml-auto">Add All to Cart</Button>
            </div>
          </div>
        </section>

        {/* ========== Customers Also Bought ========== */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customers Also Bought</h2>
            <Link to="/shop" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                    <div className="text-lg font-bold text-primary mt-1">UGX {item.price.toLocaleString()}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{item.rating}</span>
                      <span className="text-xs text-gray-400">({item.reviews})</span>
                    </div>
                    <button className="mt-3 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition text-sm font-medium flex items-center justify-center gap-1">
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========== Footer Trust ========== */}
        <section className="mt-12 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {footerTrust.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))} 
          </div>
        </section>
      </div>
    </div>
  );
}