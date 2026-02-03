import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar, Users, Home, Plus } from "lucide-react";

interface Booking {
  id: string;
  room_type: string;
  guests: number;
  check_in: string;
  check_out: string;
  status: string;
  created_at: string;
}

const roomTypeLabels: Record<string, string> = {
  standard: "Standard Room",
  deluxe: "Deluxe Room",
  suite: "Forest Suite",
  villa: "Private Villa",
};

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("check_in", { ascending: true });

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            My Bookings
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            View and manage your upcoming reservations at Green Forest.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-card p-8 rounded-lg shadow-elegant">
                  <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="font-serif text-2xl text-foreground mb-2">
                    No Bookings Yet
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    You haven't made any reservations yet. Start planning your escape to nature.
                  </p>
                  <Link to="/booking">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Make a Reservation
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl text-foreground">
                    Your Reservations
                  </h2>
                  <Link to="/booking">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Booking
                    </Button>
                  </Link>
                </div>
                
                {bookings.map((booking) => (
                  <Card key={booking.id} className="shadow-elegant">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-serif text-xl">
                          {roomTypeLabels[booking.room_type] || booking.room_type}
                        </CardTitle>
                        <Badge 
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(booking.check_in), "MMM d")} - {format(new Date(booking.check_out), "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}</span>
                        </div>
                        <div className="text-muted-foreground">
                          Booked on {format(new Date(booking.created_at), "MMM d, yyyy")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyBookings;
