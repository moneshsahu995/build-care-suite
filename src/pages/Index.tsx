import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Clock,
  Leaf,
  Palette,
  ShoppingBag,
  Wrench,
  Star,
  Award,
  TrendingUp,
  Globe,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      description: 'Secure multi-level access for all stakeholders from admins to field technicians',
    },
    {
      icon: Building2,
      title: 'Smart Facility Management',
      description: 'Comprehensive building management with real-time monitoring and analytics',
    },
    {
      icon: Wrench,
      title: 'Work Order System',
      description: 'Streamlined work order creation, assignment, and tracking with mobile support',
    },
    {
      icon: Leaf,
      title: 'Green Building Certification',
      description: 'Track IGBC, LEED, GRIHA, and BEE certifications with automated calculations',
    },
    {
      icon: BarChart3,
      title: 'Inventory Management',
      description: 'Real-time stock tracking with automated alerts and reorder points',
    },
    {
      icon: Palette,
      title: 'Interior Design Tools',
      description: 'BOQ creation, procurement management, and site progress tracking',
    },
    {
      icon: ShoppingBag,
      title: 'Vendor Marketplace',
      description: 'Connect with verified vendors, manage RFQs, and compare bids',
    },
    {
      icon: TrendingUp,
      title: 'Financial Management',
      description: 'Invoicing, payment tracking, and comprehensive financial reporting',
    },
    {
      icon: Clock,
      title: 'AMC Contract Management',
      description: 'Automated contract renewals and maintenance schedule management',
    },
  ];

  const stats = [
    { value: '500+', label: 'Buildings Managed' },
    { value: '10,000+', label: 'Work Orders Completed' },
    { value: '200+', label: 'Certified Projects' },
    { value: '99.9%', label: 'Uptime' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Facility Manager, Tech Corp',
      content: 'BuildMaintain has transformed how we manage our properties. The work order system alone has saved us countless hours.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Green Building Consultant',
      content: 'The certification tracking and automated calculations are game-changers. I can manage multiple projects effortlessly.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      role: 'Property Owner',
      content: 'Finally, a platform that brings everything together - from maintenance to certifications to vendor management.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">BuildMaintain</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#solutions" className="text-sm font-medium hover:text-primary transition-colors">Solutions</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <Badge className="mb-4" variant="secondary">
              <Zap className="h-3 w-3 mr-1" />
              India's Leading Facility Management Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Complete Building
              </span>
              <br />
              Management Solution
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              From facility management to green certifications, interior design to vendor marketplace - 
              everything you need in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 h-12">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Buildings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed for every stakeholder in the building management ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-secondary/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="secondary">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our customers say about BuildMaintain
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Solutions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Every Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized tools and workflows for different stakeholders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: 'Organization Admins',
                features: ['User management', 'Organization settings', 'Role assignments', 'Platform analytics'],
              },
              {
                icon: Wrench,
                title: 'Facility Managers',
                features: ['Building oversight', 'Work order management', 'Inventory control', 'Vendor coordination'],
              },
              {
                icon: Leaf,
                title: 'Green Building Consultants',
                features: ['Certification tracking', 'Compliance management', 'Automated calculations', 'Document management'],
              },
              {
                icon: Palette,
                title: 'Interior Designers',
                features: ['Project management', 'BOQ creation', 'Procurement tracking', 'Client collaboration'],
              },
            ].map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{solution.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Contact Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Phone, title: 'Phone', value: '+91 1234567890', link: 'tel:+911234567890' },
              { icon: Mail, title: 'Email', value: 'contact@buildmaintain.com', link: 'mailto:contact@buildmaintain.com' },
              { icon: MapPin, title: 'Office', value: 'Mumbai, India', link: '#' },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.link}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all text-center group"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold mb-1">{contact.title}</div>
                  <div className="text-sm text-muted-foreground">{contact.value}</div>
                </a>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <div className="mb-20 bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white text-center shadow-lg">
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
