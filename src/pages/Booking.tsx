import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [specialRequests, setSpecialRequests] = useState("");
  const [phone, setPhone] = useState("");

  // CONSTANTS
  const TOTAL_ROOMS = 4;
  const ROOM_PRICE = 2000; // Price per night in INR
  const ROOM_TYPE = "Cottage";

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * ROOM_PRICE : 0;
  };

  const checkAvailability = async () => {
    // Logic: Find any booking that overlaps with requested dates
    // Overlap = (Existing.Start < Requested.End) AND (Existing.End > Requested.Start)
    
    // 1. Get all bookings that end AFTER our requested start date
    // (This filters out bookings that are already finished)
    const q = query(
      collection(db, "bookings"),
      where("check_out", ">", checkIn)
    );

    const snapshot = await getDocs(q);
    let occupiedCount = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      // 2. JS Filter: Check if the booking starts BEFORE our requested end date
      // AND exclude cancelled bookings
      if (data.check_in < checkOut && data.status !== 'cancelled') {
        occupiedCount++;
      }
    });

    return occupiedCount < TOTAL_ROOMS;
  };

  const handlePaymentAndBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "Login Required", description: "Please login to book.", variant: "destructive" });
      navigate("/auth");
      return;
    }

    if (calculateTotal() === 0) {
      toast({ title: "Invalid Dates", description: "Please select valid check-in and check-out dates.", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      // 1. Check Availability
      const isAvailable = await checkAvailability();
      if (!isAvailable) {
        toast({ 
          title: "Dates Unavailable", 
          description: `Sorry, all ${TOTAL_ROOMS} cottages are booked for these dates.`, 
          variant: "destructive" 
        });
        setLoading(false);
        return;
      }

      // 2. Initialize Razorpay Payment
      const options = {
        key: "rzp_test_YOUR_KEY_HERE", // TODO: Replace with your Razorpay Test Key ID
        amount: calculateTotal() * 100, // Amount in paise
        currency: "INR",
        name: "Green Forest Home",
        description: `Booking for ${ROOM_TYPE}`,
        handler: async function (response: any) {
          // 3. Payment Success -> Save Booking
          await saveBooking(response.razorpay_payment_id);
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
          contact: phone
        },
        theme: {
          color: "#4CAF50"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        toast({ title: "Payment Failed", description: response.error.description, variant: "destructive" });
        setLoading(false);
      });
      rzp1.open();

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const saveBooking = async (paymentId: string) => {
    try {
      await addDoc(collection(db, "bookings"), {
        user_id: user?.uid,
        room_type: ROOM_TYPE,
        guests: parseInt(guests),
        check_in: checkIn,
        check_out: checkOut,
        first_name: user?.displayName?.split(" ")[0] || "Guest",
        last_name: user?.displayName?.split(" ")[1] || "",
        email: user?.email,
        phone: phone,
        special_requests: specialRequests,
        status: "confirmed",
        payment_id: paymentId,
        amount_paid: calculateTotal(),
        created_at: serverTimestamp(),
      });

      toast({ title: "Success!", description: "Booking confirmed and paid." });
      navigate("/my-bookings");
    } catch (error) {
      toast({ title: "Error", description: "Payment successful but booking failed to save. Contact support.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Book Your Cottage</h1>
          <p className="text-muted-foreground">Only {TOTAL_ROOMS} exclusive cottages available.</p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-6 max-w-2xl">
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <form onSubmit={handlePaymentAndBooking} className="space-y-6">
            <div className="bg-green-50 p-4 rounded text-center mb-6">
              <span className="text-sm font-bold text-green-800">ROOM TYPE: COTTAGE</span>
              <div className="text-2xl font-serif mt-1">₹{ROOM_PRICE} <span className="text-sm text-muted-foreground">/ night</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-medium">Check-in Date</label><Input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Check-out Date</label><Input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guests</label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2"><label className="text-sm font-medium">Phone Number</label><Input type="tel" required placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Special Requests</label><Textarea placeholder="Dietary restrictions, etc." value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} /></div>

            {calculateTotal() > 0 && (
              <div className="flex justify-between items-center py-4 border-t border-b font-semibold">
                <span>Total Amount:</span>
                <span className="text-xl">₹{calculateTotal()}</span>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Processing..." : `Pay ₹${calculateTotal()} & Confirm`}
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Booking;