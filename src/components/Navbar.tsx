import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-primary">
            Green Forest
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/restaurant" className="text-foreground/80 hover:text-foreground transition-colors">
              Dining
            </Link>
            <Link to="/booking" className="text-foreground/80 hover:text-foreground transition-colors">
              Book Now
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{user.displayName || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/my-bookings")}>
                    My Bookings
                  </DropdownMenuItem>
                  {/* Optional: Show Admin link only if admin */}
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b animate-fade-in">
            <div className="flex flex-col p-6 space-y-4">
              <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/restaurant" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Dining
              </Link>
              <Link to="/booking" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
              
              {user ? (
                <>
                  <Link to="/my-bookings" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    My Bookings
                  </Link>
                  <button 
                    onClick={() => { handleSignOut(); setIsOpen(false); }} 
                    className="text-lg font-medium text-left text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;