import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Utensils, Coffee, CheckCircle2 } from "lucide-react";

const Restaurant = () => {
  const timings = [
    { label: "Breakfast", time: "7:30 AM - 10:30 AM", icon: <Coffee className="w-5 h-5" /> },
    { label: "Lunch", time: "12:30 PM - 3:00 PM", icon: <Utensils className="w-5 h-5" /> },
    { label: "Dinner", time: "7:30 PM - 10:30 PM", icon: <Utensils className="w-5 h-5" /> },
  ];

  const menuCategories = {
    indian: [
      { name: "Chicken Biryani", price: "₹220", desc: "Our signature aromatic biryani served with raita.", img: "/images/food-biryani.jpeg" }, // REAL IMAGE USED HERE
      { name: "Bengali Thali", price: "₹180", desc: "Traditional platter with rice, dal, veg, and fish/chicken.", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=60" },
      { name: "Butter Naan & Paneer", price: "₹150", desc: "Soft clay-oven bread with rich cottage cheese gravy.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=60" },
    ],
    chinese: [
      { name: "Chicken Chowmein", price: "₹140", desc: "Stir-fried noodles with fresh veggies and chicken.", img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&auto=format&fit=crop&q=60" },
      { name: "Chilli Chicken", price: "₹200", desc: "Spicy and tangy boneless chicken chunks.", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=60" },
      { name: "Fried Rice", price: "₹130", desc: "Classic wok-tossed rice with vegetables.", img: "https://images.unsplash.com/photo-1603133872878-684f1084261d?w=800&auto=format&fit=crop&q=60" },
    ],
    tandoori: [
      { name: "Chicken Tandoori", price: "₹350", desc: "Whole chicken marinated in yogurt and spices, roasted to perfection.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60" },
      { name: "Chicken Tikka Kebab", price: "₹250", desc: "Smoky boneless chicken skewers.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60" },
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url("/images/restaurant-exterior.jpeg")' }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Green Forest Restaurant</h1>
          <p className="text-xl md:text-2xl font-light">Trusted institution for Chowmein, Bengali & Tandoori Food</p>
        </div>
      </section>

      {/* Intro / Hygiene Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-xl">
               <img src="/images/kitchen-prep.jpeg" alt="Our Kitchen" className="w-full h-auto object-cover" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif">Freshly Prepared, Every Time</h2>
              <p className="text-muted-foreground text-lg">
                At Green Forest, we believe in transparency and hygiene. Our chefs prepare every meal with fresh ingredients in our clean, open kitchen environment. Whether you crave spicy Tandoori or comforting Bengali rice dishes, we serve it hot and fresh.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600 w-5 h-5"/> <span>Fresh Local Ingredients</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600 w-5 h-5"/> <span>Hygienic Preparation</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600 w-5 h-5"/> <span>Outdoor & Indoor Seating</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timings Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-8">Opening Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {timings.map((t, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-col items-center pb-2">
                  <div className="p-3 bg-primary/10 rounded-full mb-2 text-primary">
                    {t.icon}
                  </div>
                  <CardTitle>{t.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-muted-foreground">{t.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">Our Specialties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Indian • Chinese • Tandoori
          </p>
        </div>

        <Tabs defaultValue="indian" className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full md:w-[400px] grid-cols-3">
              <TabsTrigger value="indian">Indian</TabsTrigger>
              <TabsTrigger value="chinese">Chinese</TabsTrigger>
              <TabsTrigger value="tandoori">Tandoori</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(menuCategories).map(([key, items]) => (
            <TabsContent key={key} value={key} className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <div key={index} className="group rounded-lg overflow-hidden border bg-card hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl font-medium">{item.name}</h3>
                        <span className="font-bold text-primary">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-12">
          <p className="text-lg font-medium">For Home Delivery / Reservations Call:</p>
          <p className="text-3xl font-bold text-primary mt-2">92392 28229</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Restaurant;