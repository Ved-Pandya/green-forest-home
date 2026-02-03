import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-forest.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <p className="text-accent-foreground/90 text-sm tracking-[0.3em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight">
            Green Forest
            <span className="block text-3xl md:text-4xl font-light mt-2">
              Hotel & Restaurant
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
            Escape to nature's embrace. Experience tranquility, luxury, and sustainable living in the heart of the forest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Explore Rooms
            </Button>
            <Button variant="heroOutline" size="lg">
              View Restaurant
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
