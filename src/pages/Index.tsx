import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    'Role-based access control for multiple user types',
    'Building and facility management',
    'Work order tracking and management',
    'Green building certification tracking',
    'Inventory management with alerts',
    'Financial tracking and invoicing',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">BuildMaintain</span>
            </div>
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Building Maintenance & Project Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive platform for facility management, green building certification, 
            interior design, and vendor management - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 border border-border shadow-card hover:shadow-soft transition-shadow"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{feature}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your building management?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join hundreds of organizations using BuildMaintain to streamline operations, 
            track certifications, and manage facilities efficiently.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
