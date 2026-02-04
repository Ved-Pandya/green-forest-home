import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Calendar, Users, Home } from "lucide-react";

interface BookingData {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  room_type: string;
  status: string;
}

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    const fetchBookings = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "bookings"), where("user_id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const bookingsData: BookingData[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          bookingsData.push({
            id: doc.id,
            check_in: data.check_in,
            check_out: data.check_out,
            guests: data.guests,
            room_type: data.room_type,
            status: data.status,
          });
        });
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, authLoading, navigate]);

  if (loading || authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">My Bookings</h1>
        </div>
      </section>

      <section className="py-12 container mx-auto px-6 max-w-4xl">
        {bookings.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-card">
            <h3 className="text-xl font-medium mb-2">No bookings found</h3>
            <Button onClick={() => navigate("/booking")}>Book a Room</Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-card p-6 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-lg font-semibold capitalize"><Home className="w-5 h-5 text-primary" />{booking.room_type}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{booking.check_in} - {booking.check_out}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{booking.guests} Guests</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium uppercase bg-green-100 text-green-800">{booking.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};
export default MyBookings;