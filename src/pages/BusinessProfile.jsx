// src/pages/BusinessProfile.jsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Star, 
  Heart, 
  MapPin, 
  Shield, 
  Phone, 
  Mail, 
  Globe, 
  Clock,
  Calendar,
  Users,
  Award,
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
  Building,
  Stethoscope,
  Ambulance,
  Baby,
  Scissors,
  Beaker,
  Pill,
  Activity,
  Home,
  User,
  Briefcase,
  Sparkles,
  TrendingUp,
  Clock as ClockIcon,
  Eye
} from 'lucide-react';
import Button from '../components/Button';

export default function BusinessProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [features, setFeatures] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [similarBusinesses, setSimilarBusinesses] = useState([]);

  // Fallback data
  const fallbackBusiness = {
    id: 1,
    name: 'Jinja Regional Hospital',
    category: 'Healthcare',
    type: 'Hospital',
    tagline: 'Quality healthcare services for the community.',
    description: 'Jinja Regional Hospital is a premier healthcare facility dedicated to providing comprehensive medical services to the community.',
    location: 'Jinja, Uganda',
    rating: 4.8,
    reviews: 234,
    isVerified: true,
    isOpen: true,
    is24Hours: true,
    isFeatured: true,
    phone: '+256 700 123 456',
    email: 'info@jinjaregionalhospital.ug',
    website: 'www.jinjaregionalhospital.ug',
    services: 12,
    employees: 150,
    patients: 15000,
    departments: 8,
    coverImage: '/images/businesses/hospital-cover.jpg',
    logo: '/images/businesses/hospital-logo.jpg',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#'
    },
    workingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Emergency Only'
    },
    emergency: '24/7 Emergency Services Available'
  };

  const fallbackServices = [
    { icon: <Stethoscope className="w-5 h-5 text-primary" />, name: 'Outpatient Care', desc: 'General consultations and check-ups' },
    { icon: <Building className="w-5 h-5 text-primary" />, name: 'Inpatient Services', desc: 'Comfortable wards for overnight care' },
    { icon: <Ambulance className="w-5 h-5 text-primary" />, name: 'Emergency Services', desc: '24/7 emergency medical response' },
    { icon: <Baby className="w-5 h-5 text-primary" />, name: 'Maternity & Child Health', desc: 'Prenatal, delivery, and pediatric care' },
    { icon: <Scissors className="w-5 h-5 text-primary" />, name: 'Surgery & Specialized Care', desc: 'Advanced surgical procedures' },
    { icon: <Beaker className="w-5 h-5 text-primary" />, name: 'Laboratory Services', desc: 'Diagnostic testing and analysis' },
    { icon: <Pill className="w-5 h-5 text-primary" />, name: 'Pharmacy', desc: 'Prescription medications and health products' },
    { icon: <Activity className="w-5 h-5 text-primary" />, name: 'Health Screening', desc: 'Preventive health check-ups' },
  ];

  const fallbackFeatures = [
    { icon: <Users className="w-5 h-5 text-primary" />, title: 'Qualified Staff', desc: 'Highly trained medical professionals' },
    { icon: <Shield className="w-5 h-5 text-primary" />, title: 'Modern Equipment', desc: 'State-of-the-art medical technology' },
    { icon: <Home className="w-5 h-5 text-primary" />, title: 'Clean Environment', desc: 'Safe and hygienic facilities' },
    { icon: <Heart className="w-5 h-5 text-primary" />, title: 'Patient First', desc: 'Compassionate, patient-centered care' },
  ];

  const fallbackGallery = [
    '/images/businesses/gallery-1.jpg',
    '/images/businesses/gallery-2.jpg',
    '/images/businesses/gallery-3.jpg',
    '/images/businesses/gallery-4.jpg',
    '/images/businesses/gallery-5.jpg',
    '/images/businesses/gallery-6.jpg'
  ];

  const fallbackTestimonials = [
    {
      id: 1,
      name: 'Sarah Nantongo',
      role: 'Patient',
      text: 'The care I received was exceptional. The staff was professional, compassionate, and made me feel at ease throughout my treatment.',
      rating: 5,
      date: 'Dec 2026',
      image: '/images/avatars/avatar-1.jpg'
    },
    {
      id: 2,
      name: 'John Muwonge',
      role: 'Patient',
      text: 'I booked my appointment through Munolink and the experience was seamless. The facility is well-equipped and the staff are highly knowledgeable.',
      rating: 5,
      date: 'Nov 2026',
      image: '/images/avatars/avatar-2.jpg'
    },
    {
      id: 3,
      name: 'Grace Auma',
      role: 'Patient',
      text: 'The maternity ward is top-notch. The nurses were incredibly supportive during my delivery. Thank you!',
      rating: 5,
      date: 'Oct 2026',
      image: '/images/avatars/avatar-3.jpg'
    }
  ];

  const fallbackSimilar = [
    {
      id: 2,
      name: 'Jinja Medical Center',
      category: 'Healthcare',
      rating: 4.6,
      reviews: 156,
      isOpen: true,
      image: '/images/businesses/medical-center.jpg'
    },
    {
      id: 3,
      name: 'Lake Victoria Hospital',
      category: 'Healthcare',
      rating: 4.7,
      reviews: 189,
      isOpen: true,
      image: '/images/businesses/lake-hospital.jpg'
    },
    {
      id: 4,
      name: 'Jinja Pharmacy',
      category: 'Healthcare',
      rating: 4.5,
      reviews: 98,
      isOpen: true,
      image: '/images/businesses/pharmacy.jpg'
    },
    {
      id: 5,
      name: "St. Mary's Clinic",
      category: 'Healthcare',
      rating: 4.8,
      reviews: 234,
      isOpen: false,
      image: '/images/businesses/clinic.jpg'
    }
  ];

  // Fetch business data
  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      try {
        // Try to get the business from institutions table
        const { data: institutionData, error: institutionError } = await supabase
          .from('institutions')
          .select('*')
          .eq('id', id)
          .single();

        if (institutionData) {
          setBusiness({
            ...institutionData,
            id: institutionData.id,
            name: institutionData.name,
            category: institutionData.type || 'Service Provider',
            type: institutionData.type || 'Institution',
            tagline: institutionData.description?.slice(0, 100) || 'Quality services for the community.',
            description: institutionData.description || 'Professional services provider.',
            location: institutionData.city || institutionData.address || 'Jinja, Uganda',
            rating: institutionData.rating || 0,
            reviews: institutionData.review_count || 0,
            isVerified: institutionData.is_verified || false,
            isOpen: institutionData.is_open || true,
            is24Hours: false,
            isFeatured: false,
            phone: institutionData.phone || '+256 700 123 456',
            email: institutionData.email || 'info@example.ug',
            website: institutionData.website || 'www.example.ug',
            services: 0,
            employees: 0,
            patients: 0,
            departments: 0,
            coverImage: institutionData.cover_image || '/images/businesses/placeholder-cover.jpg',
            logo: institutionData.logo || '/images/businesses/placeholder-logo.jpg',
            social: {
              facebook: '#',
              twitter: '#',
              instagram: '#',
              youtube: '#'
            },
            workingHours: institutionData.working_hours || {
              monday: '8:00 AM - 6:00 PM',
              tuesday: '8:00 AM - 6:00 PM',
              wednesday: '8:00 AM - 6:00 PM',
              thursday: '8:00 AM - 6:00 PM',
              friday: '8:00 AM - 6:00 PM',
              saturday: '8:00 AM - 2:00 PM',
              sunday: 'Closed'
            },
            emergency: 'Emergency services available'
          });
        } else {
          // Try shops table
          const { data: shopData, error: shopError } = await supabase
            .from('shops')
            .select('*')
            .eq('id', id)
            .single();

          if (shopData) {
            setBusiness({
              ...shopData,
              id: shopData.id,
              name: shopData.name,
              category: shopData.category || 'Shop',
              type: 'Shop',
              tagline: 'Quality products and services.',
              description: 'Your trusted local shop.',
              location: shopData.area || shopData.address || 'Jinja, Uganda',
              rating: shopData.rating || 0,
              reviews: shopData.review_count || 0,
              isVerified: shopData.is_verified || false,
              isOpen: shopData.is_open || true,
              is24Hours: false,
              isFeatured: false,
              phone: shopData.phone || '+256 700 123 456',
              email: 'info@example.ug',
              website: 'www.example.ug',
              services: 0,
              employees: 0,
              patients: 0,
              departments: 0,
              coverImage: '/images/businesses/placeholder-cover.jpg',
              logo: '/images/businesses/placeholder-logo.jpg',
              social: {
                facebook: '#',
                twitter: '#',
                instagram: '#',
                youtube: '#'
              },
              workingHours: {
                monday: '8:00 AM - 6:00 PM',
                tuesday: '8:00 AM - 6:00 PM',
                wednesday: '8:00 AM - 6:00 PM',
                thursday: '8:00 AM - 6:00 PM',
                friday: '8:00 AM - 6:00 PM',
                saturday: '8:00 AM - 2:00 PM',
                sunday: 'Closed'
              },
              emergency: 'Contact for emergencies'
            });
          } else {
            // Use fallback
            setBusiness(fallbackBusiness);
          }
        }

        // Set fallback data for other sections
        setServices(fallbackServices);
        setFeatures(fallbackFeatures);
        setGalleryImages(fallbackGallery);
        setTestimonials(fallbackTestimonials);
        setSimilarBusinesses(fallbackSimilar);

      } catch (err) {
        console.error('Error fetching business:', err);
        setBusiness(fallbackBusiness);
        setServices(fallbackServices);
        setFeatures(fallbackFeatures);
        setGalleryImages(fallbackGallery);
        setTestimonials(fallbackTestimonials);
        setSimilarBusinesses(fallbackSimilar);
      }
      setLoading(false);
    };

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900">Business not found</h2>
          <p className="text-gray-500 mt-2">The business you're looking for doesn't exist.</p>
          <Link to="/businesses" className="text-primary hover:underline mt-4 inline-block">
            Browse Businesses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== Breadcrumb ========== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/businesses" className="hover:text-primary transition">Businesses</Link>
            <span className="text-gray-300">/</span>
            <span className="text-primary font-medium">{business.name}</span>
          </div>
        </div>
      </div>

      {/* ========== Hero Section ========== */}
      <div className="relative">
        <div className="w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <img 
            src={business.coverImage} 
            alt={business.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/businesses/placeholder-cover.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white flex-shrink-0">
                  <img 
                    src={business.logo} 
                    alt={business.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/businesses/placeholder-logo.jpg';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{business.name}</h1>
                    {business.isVerified && (
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-white/90 text-sm md:text-base">{business.tagline}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs md:text-sm text-white/80 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {business.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {business.rating} ({business.reviews} reviews)
                    </div>
                    <div className="flex items-center gap-1">
                      {business.isOpen ? (
                        <span className="text-green-400">● Open {business.is24Hours ? '24/7' : 'Now'}</span>
                      ) : (
                        <span className="text-red-400">● Closed</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition flex items-center gap-2"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="hidden sm:inline text-sm">Save</span>
                </button>
                <button 
                  onClick={() => setIsShared(!isShared)}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Share</span>
                </button>
                <Button size="small" className="bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="w-4 h-4" /> Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Tab Navigation ========== */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3">
            {['Overview', 'Services', 'Reviews', 'Photos', 'Location', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-sm font-medium whitespace-nowrap transition pb-2 border-b-2 ${
                  activeTab === tab.toLowerCase()
                    ? 'text-primary border-primary'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Main Content ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== Left Column - Services ========== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Our Services</h2>
              <div className="space-y-3">
                {services.map((service, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{service.name}</h4>
                      <p className="text-xs text-gray-500">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">Book Appointment</Button>
            </div>
          </div>

          {/* ========== Middle Column - Details ========== */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About Us</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{business.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 text-center">
                  <div className="flex justify-center mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold">Book & Pay with Munolink</h3>
                <p className="text-white/80 text-sm mt-1">Get exclusive discounts when you book through the platform</p>
                <Button className="mt-4" variant="secondary">Book Now</Button>
                <div className="absolute top-4 right-4 bg-yellow-400 text-primary font-bold px-3 py-1 rounded-full text-xs">
                  Save 10%
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Working Hours
              </h2>
              <div className="space-y-2">
                {business.workingHours && Object.entries(business.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="capitalize text-gray-600">{day}</span>
                    <span className="text-gray-900 font-medium">{hours}</span>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm text-primary font-semibold">{business.emergency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== Right Column - Quick Info ========== */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Map Location</p>
                  <p className="text-xs text-gray-400">{business.location}</p>
                </div>
              </div>
              <div className="p-4">
                <Button className="w-full" size="small" variant="outline">
                  Get Directions
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-600">{business.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-600">{business.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-600">{business.website}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <a href={business.social?.facebook || '#'} className="text-gray-400 hover:text-primary transition"><Facebook className="w-5 h-5" /></a>
                <a href={business.social?.twitter || '#'} className="text-gray-400 hover:text-primary transition"><Twitter className="w-5 h-5" /></a>
                <a href={business.social?.instagram || '#'} className="text-gray-400 hover:text-primary transition"><Instagram className="w-5 h-5" /></a>
                <a href={business.social?.youtube || '#'} className="text-gray-400 hover:text-primary transition"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{business.patients || '0'}+</div>
                  <div className="text-xs text-gray-500">Patients Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{business.employees || '0'}+</div>
                  <div className="text-xs text-gray-500">Staff Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{business.departments || '0'}</div>
                  <div className="text-xs text-gray-500">Departments</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== Photo Gallery ========== */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src={img} 
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/businesses/placeholder-gallery.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ========== Testimonials ========== */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Testimonials</h2>
            <Link to="#" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/avatars/placeholder.jpg';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
                <div className="text-xs text-gray-400 mt-3">{testimonial.date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== Similar Businesses ========== */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar Providers</h2>
            <Link to="/businesses" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarBusinesses.map((biz) => (
              <Link key={biz.id} to={`/business/${biz.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition">
                  <div className="relative">
                    <img 
                      src={biz.image} 
                      alt={biz.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/businesses/placeholder.jpg';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-medium">
                      {biz.isOpen ? (
                        <span className="text-green-500">● Open</span>
                      ) : (
                        <span className="text-red-500">● Closed</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{biz.name}</h4>
                    <div className="text-xs text-gray-500">{biz.category}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{biz.rating}</span>
                      <span className="text-xs text-gray-400">({biz.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========== Promotional Banner ========== */}
        <section className="mt-12 bg-primary rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-5xl mb-4">🏥</div>
            <h2 className="text-3xl font-bold mb-3">Better Health. Better Community.</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">
              Book healthcare services through Munolink and get exclusive discounts.
            </p>
            <Button size="large" variant="secondary">Book Health Service</Button>
          </div>
          <div className="absolute top-0 right-0 text-8xl opacity-5">❤️</div>
          <div className="absolute bottom-0 left-0 text-8xl opacity-5">💉</div>
        </section>
      </div>
    </div>
  );
}