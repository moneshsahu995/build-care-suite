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
  User,
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
      icon: Building2,
      title: "Smart Facility Management",
      description: "Comprehensive building management with real-time monitoring and analytics",
      image: "/smart-building-dashboard-with-sensors.webp",
    },
    {
      icon: Wrench,
      title: "Work Order System",
      description: "Streamlined work order creation, assignment, and tracking with mobile support",
      image: "/maintenance-work-order-mobile-app.avif",
    },
    {
      icon: Leaf,
      title: "Green Building Certification",
      description: "Track IGBC, LEED, GRIHA, and BEE certifications with automated calculations",
      image: "/green-building-certification-energy-efficiency.avif",
    },
    {
      icon: BarChart3,
      title: "Inventory Management",
      description: "Real-time stock tracking with automated alerts and reorder points",
      image: "/warehouse-inventory-shelves-barcodes.webp",
    },
    {
      icon: Palette,
      title: "Interior Design Tools",
      description: "BOQ creation, procurement management, and site progress tracking",
      image: "/interior-design-moodboard-materials.avif",
    },
    {
      icon: ShoppingBag,
      title: "Vendor Marketplace",
      description: "Connect with verified vendors, manage RFQs, and compare bids",
      image: "/vendor-marketplace-b2b-procurement.webp",
    },

    {
      icon: Clock,
      title: "AMC Contract Management",
      description: "Automated contract renewals and maintenance schedule management",
      image: "/maintenance-schedule-calendar-reminders.avif",
    },
  ]

  const stats = [
    { value: '500+', label: 'Buildings Managed' },
    { value: '10,000+', label: 'Work Orders Completed' },
    { value: '200+', label: 'Certified Projects' },
    { value: '99.9%', label: 'Uptime' },
  ];

  const solutions = [
    {
      icon: User,
      title: 'Facility Managers',
      features: [
        'Centralized dashboard for all building operations',
        'Automated maintenance scheduling',
        'Real-time issue tracking and resolution'
      ]
    },
    {
      icon: Building2,
      title: 'Property Owners',
      features: [
        'Comprehensive asset management',
        'Financial performance tracking',
        'Vendor and contractor management'
      ]
    },
    {
      icon: Wrench,
      title: 'Maintenance Teams',
      features: [
        'Mobile work order management',
        'Inventory and parts tracking',
        'Preventive maintenance scheduling'
      ]
    },
    {
      icon: Leaf,
      title: 'Sustainability Teams',
      features: [
        'Energy and resource monitoring',
        'Green certification tracking',
        'Environmental impact reporting'
      ]
    }
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

  const contacts = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 1234567890',
      link: 'tel:+911234567890',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@buildmaintain.com',
      link: 'mailto:contact@buildmaintain.com',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Mumbai, India',
      link: '#',
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
          <div className="grid md:grid-cols-2 items-center gap-12">

            {/* Left Side - Text Content */}
            <div className="text-center md:text-left">
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
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                From facility management to green certifications, interior design to vendor marketplace —
                everything you need in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
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
                  <div key={index} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/Gemini_Generated_Image_l9qc22l9qc22l9qc-Photoroom.png" // replace with your image path
                alt="Facility Management Illustration"
                className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <section id="features" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 rounded-3xl blur-2xl"></div>

          <div className="text-center mb-20 relative">
            <Badge className="mb-4" variant="outline">✨ Features</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Everything You Need to Manage Buildings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools tailored for every stakeholder in the building management ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  {/* Feature Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={`${feature.title} illustration`}
                      className="h-full w-full object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  

                  <div className="p-6">

                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section id="testimonials" className="py-24 bg-gradient-to-tr from-secondary/10 to-primary/5 rounded-3xl my-20">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">💬 Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Trusted by Industry Leaders</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers say about <span className="font-semibold text-primary">BuildMaintain</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-card/70 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">“{t.content}”</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Solutions Section --- */}
        <section id="solutions" className="py-24 relative">
          <div className="text-center mb-20">
            <Badge className="mb-4" variant="outline">🧩 Solutions</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
              Built for Every Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized tools and workflows tailored to each professional in the ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((s, index) => {
              const Icon = s.icon;
              return (
                <div key={index} className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-14 h-14 rounded-xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {s.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">📞 Contact Us</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contacts.map((c, index) => {
              const Icon = c.icon;
              return (
                <a
                  key={index}
                  href={c.link}
                  className="group bg-card/60 border border-border/50 rounded-2xl p-8 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-accent/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-1 text-foreground">{c.title}</h4>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* --- CTA Section --- */}
        <div className="mt-20 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent)]"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Transform Your Building Management?</h2>
          <p className="text-lg mb-10 text-white/90 max-w-2xl mx-auto">
            Join hundreds of organizations using BuildMaintain to streamline operations and boost efficiency.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
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
