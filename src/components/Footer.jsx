// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Munolink" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <span className="text-xl font-bold block">Munolink</span>
                <span className="text-xs text-gray-400">For Better Connections</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Uganda's local commerce platform connecting buyers, shops, and service providers 
              across the country. Shop local, support local.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-gray-400 hover:text-white transition text-sm">All Products</Link></li>
              <li><Link to="/deals" className="text-gray-400 hover:text-white transition text-sm">Deals & Discounts</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition text-sm">Categories</Link></li>
            </ul>
          </div>

          {/* Businesses */}
          <div>
            <h3 className="font-bold text-lg mb-4">Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="/businesses" className="text-gray-400 hover:text-white transition text-sm">All Businesses</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-white transition text-sm">Partners</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition text-sm">List Your Business</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition text-sm">About Us</Link></li>
            </ul>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Phone size={14} /> +256 700 123 456</div>
              <div className="flex items-center gap-2"><Mail size={14} /> info@munolink.com</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> Jinja City, Uganda</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Munolink. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Made with ❤️ in Uganda 🇺🇬</span>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}