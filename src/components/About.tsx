import { Leaf, Utensils, Bed } from "lucide-react";

const features = [
  {
    icon: Bed,
    title: "Luxurious Rooms",
    description: "Spacious accommodations with stunning forest views and modern amenities.",
  },
  {
    icon: Utensils,
    title: "Farm-to-Table Dining",
    description: "Fresh, locally-sourced ingredients prepared by our expert chefs.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable practices that preserve and protect our natural surroundings.",
  },
];

const About = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            A Sanctuary in Nature
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Nestled deep within ancient woodlands, Green Forest offers a unique retreat where luxury meets sustainability. Our resort is designed to immerse you in the beauty of nature while providing world-class comfort and service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card p-8 rounded-lg text-center group hover:shadow-elegant transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
