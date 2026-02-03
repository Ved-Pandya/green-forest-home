import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Green Forest</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your tranquil escape into nature. Experience luxury, sustainability, and serenity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#rooms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#restaurant" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Restaurant
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin size={16} />
                <span>123 Forest Lane, Woodland Valley</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail size={16} />
                <span>hello@greenforest.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Green Forest Hotel & Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
