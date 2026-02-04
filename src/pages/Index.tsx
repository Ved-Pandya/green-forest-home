import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, MapPin, Wifi, Car } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image - Row of Cottages */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 scale-105" 
          style={{ backgroundImage: 'url("/images/hero-cottages.jpeg")' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-sm font-medium mb-4">
            Welcome to Jhargram's Finest
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
            Green Forest Home
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto text-gray-100">
            A peaceful retreat in Kamlasole, Gopiballavpur. Experience nature, comfort, and authentic Bengali hospitality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90">
                Book Your Stay
              </Button>
            </Link>
            <Link to="/restaurant">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black">
                View Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                Nature's Best Kept Secret
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Escape the city chaos and wake up to the sound of chirping birds. Green Forest Home offers expansive gardens, mango trees, and flowering plants that provide the perfect setting for relaxation.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-700"><Leaf size={20} /></div>
                  <span className="font-medium">Lush Gardens</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-700"><Wifi size={20} /></div>
                  <span className="font-medium">Free Wi-Fi</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full text-orange-700"><Car size={20} /></div>
                  <span className="font-medium">Free Parking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-700"><MapPin size={20} /></div>
                  <span className="font-medium">Gopiballavpur</span>
                </div>
              </div>
              
              <Link to="/booking" className="inline-flex items-center text-primary font-medium hover:underline mt-4">
                Check Availability <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/garden-vpath.jpeg" 
                alt="Garden Path" 
                className="rounded-lg shadow-lg w-full h-64 object-cover transform translate-y-8"
              />
              <img 
                src="/images/garden-wide.jpeg" 
                alt="Wide Garden View" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">A Glimpse of Greenery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From our rustic cottages to our multi-cuisine restaurant, explore the property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-lg aspect-[4/3]">
            <img 
              src="/images/cottage-detail.jpeg" 
              alt="Cottage Porch" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Rustic Cottages</span>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-lg aspect-[4/3]">
            <img 
              src="/images/hotel-night.jpeg" 
              alt="Hotel at Night" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Evening Ambience</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-[4/3]">
            <img 
              src="/images/restaurant-exterior.jpeg" 
              alt="Restaurant Exterior" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Family Restaurant</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;