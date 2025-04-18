
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">SnapShare</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Share Your Moments with the World
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of photographers and creatives. Upload, discover, and share beautiful moments captured through your lens.
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
