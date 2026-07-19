// src/components/MobileMenu.jsx
import { Link } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import Button from './Button';

export default function MobileMenu({ isOpen, setIsOpen }) {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Shop' },
    { to: '/services', label: 'Services' },
    { to: '/businesses', label: 'Businesses' },
    { to: '/deals', label: 'Deals' },
    { to: '/about', label: 'About Us' },
  ];

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 bg-white z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <img 
              src="/logo.png" 
              alt="Munolink" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold text-primary">Munolink</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search in Mobile */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, services..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="mt-6 space-y-3">
            <Button className="w-full" onClick={() => { setIsOpen(false); }}>
              Get Started
            </Button>
            <Button variant="outline" className="w-full" onClick={() => { setIsOpen(false); }}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}