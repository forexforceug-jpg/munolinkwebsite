// src/components/Hero.jsx
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Connect, Shop, and Grow with <br />
          <span className="text-yellow-300">Munolink</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Uganda's local commerce platform connecting buyers, shops,
          and service providers in your community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="large" onClick={() => navigate('/register')}>
            Get Started
          </Button>
          <Button size="large" variant="secondary" onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </div>
      </div>
    </section>
  );
}