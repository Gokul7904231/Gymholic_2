import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Dumbbell, MapPin, Clock, Star, Shield, Users, Zap, ChevronRight, 
  Instagram, Twitter, Facebook, Linkedin, Mail, Phone, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroGym from '@/assets/hero-gym.jpg';

const Index = () => {
  const testimonials = [
    {
      name: 'Arun Kumar',
      role: 'Customer',
      text: 'Gymholic made it super easy to find nearby gyms and book slots.',
      rating: 5,
    },
    {
      name: 'Iron Flex Gym',
      role: 'Gym Owner',
      text: 'After joining Gymholic, our gym bookings increased steadily.',
      rating: 4,
    },
    {
      name: 'Priya Sharma',
      role: 'Customer',
      text: 'The crowd indicators and slot booking are very helpful.',
      rating: 5,
    },
    {
      name: 'Javid Shariff',
      role: 'Customer',
      text: 'The Gymholic made my life good',
      rating: 5,
    },
  ];

  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold">Gymholic</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Home</Link>
            <Link to="/customer/explore" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Explore Gyms</Link>
            <a href="#plans" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Plans</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button variant="gym" size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={heroGym}
            alt="Modern gym interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Zap className="w-4 h-4" />
                Find Your Perfect Workout Spot
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                Your Fitness Journey{' '}
                <span className="gym-gradient-text">Starts Here</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover, book, and workout at the best gyms near you.
                Gymholic connects you with verified fitness centers,
                making your fitness goals more accessible than ever.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=register">
                  <Button variant="gym" size="xl">
                    Get Started Free
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/customer/explore">
                  <Button variant="outline" size="xl">
                    Explore Gyms
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12 pt-12 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <div className="text-3xl font-display font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Partner Gyms</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">50K+</div>
                <div className="text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">4.9</div>
                <div className="text-muted-foreground">App Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">Why Choose Gymholic?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to find, book, and manage your gym sessions in one place
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Find Nearby Gyms',
                description: 'Discover gyms close to you with real-time distance, walking time, and navigation support.',
              },
              {
                icon: Clock,
                title: 'Easy Booking',
                description: 'Book available slots instantly. See real-time capacity and never miss a workout.',
              },
              {
                icon: Shield,
                title: 'Verified Gyms',
                description: 'All partner gyms are verified for quality, safety, and excellent facilities.',
              },
              {
                icon: Star,
                title: 'Ratings & Reviews',
                description: 'Read honest reviews from real members to find the perfect gym for you.',
              },
              {
                icon: Users,
                title: 'Crowd Indicators',
                description: 'Know how busy a gym is before you go. Plan your workout during off-peak hours.',
              },
              {
                icon: Zap,
                title: 'Workout Streaks',
                description: 'Track your consistency and build healthy habits with workout streaks.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card p-8 rounded-2xl shadow-lg border border-border gym-card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            What People Say About Gymholic
          </h2>

          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 testimonial-marquee">
              {scrollingTestimonials.map((t, index) => (
                <div
                  key={index}
                  className="min-w-[320px] bg-card p-6 rounded-2xl shadow-lg border border-border"
                >
                  <p className="text-muted-foreground mb-4">“{t.text}”</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <span className="text-sm text-muted-foreground">{t.role}</span>
                    </div>
                    <span className="text-sm">⭐ {t.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              For fitness enthusiasts and gym owners alike
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Customers */}
            <motion.div
              className="bg-card p-8 rounded-2xl shadow-xl border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-sm font-semibold text-primary mb-2">For Fitness Enthusiasts</div>
              <h3 className="text-2xl font-display font-bold mb-6">Start Working Out Today</h3>

              <ul className="space-y-4 mb-8">
                {[
                  'Browse gyms near your location',
                  'View prices, amenities & real-time availability',
                  'Book slots instantly',
                  'Track your workout streaks',
                  'Get personalized recommendations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/auth?mode=register">
                <Button variant="gym" size="lg" className="w-full">
                  Join as Customer
                </Button>
              </Link>
            </motion.div>

            {/* For Trainers */}
            <motion.div
              className="bg-secondary text-secondary-foreground p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-sm font-semibold text-primary mb-2">For Gym Owners</div>
              <h3 className="text-2xl font-display font-bold mb-6">List Your Gym</h3>

              <ul className="space-y-4 mb-8">
                {[
                  'Reach thousands of fitness enthusiasts',
                  'Manage slots and capacity easily',
                  'View detailed analytics & insights',
                  'Get verified badge for trust',
                  'Affordable subscription plans',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-background/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">₹100</div>
                  <div className="text-sm opacity-80">/month</div>
                </div>
                <div className="flex-1 bg-primary/20 rounded-xl p-4 text-center border-2 border-primary">
                  <div className="text-2xl font-bold">₹1000</div>
                  <div className="text-sm opacity-80">/year</div>
                  <div className="text-xs text-primary font-semibold">Save 17%</div>
                </div>
              </div>

              <Link to="/auth?mode=register">
                <Button variant="gym" size="lg" className="w-full">
                  List Your Gym
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-gym-coral">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of members who are already crushing their fitness goals with Gymholic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="xl" className="bg-background text-foreground hover:bg-background/90">
                  Login
                </Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Register Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium SaaS Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
        <div className="container mx-auto px-4">
          
          {/* Top Section: 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Socials */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white font-bold text-2xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center shadow-lg shadow-primary/20">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                Gymholic
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Revolutionizing fitness accessibility in India. We connect enthusiasts with top-tier gyms through smart booking and real-time analytics.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-slate-800">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Product */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Smart Slot Booking</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Live Capacity Tracker</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Membership Management</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AI Fitness Analytics <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">New</span></a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Trainer Connect</a></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-2">Hiring</span></a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gymholic Blog</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Details */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-400">124, Tech Park Avenue,<br/>Velachery, Chennai, TN 600028</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:support@gymholic.com" className="hover:text-white transition-colors">support@gymholic.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-400">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-400">www.gymholic.in</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Admin Link */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Gymholic Inc. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-medium">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
              <Link to="/admin/login" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                 <Shield className="w-3 h-3" /> Admin Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
