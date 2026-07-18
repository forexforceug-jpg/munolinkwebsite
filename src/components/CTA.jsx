// src/components/CTA.jsx
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-4xl mx-auto text-center text-white px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 text-white/80">
          Join thousands of Ugandans already using Munolink.
        </p>
        <Button size="large" variant="secondary" onClick={() => navigate('/register')}>
          Create Free Account
        </Button>
      </div>
    </section>
  );
}