import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, updateDoc, doc } from "firebase/firestore";
import { Calendar, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingData {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  first_name: string;
  email: string;
  phone: string;
  status: string;
  amount_paid: number;
  payment_id: string;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Add your admin email here to secure the page
  const ADMIN_EMAIL = "arnabgenius1@gmail.com"; 

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        toast({ title: "Access Denied", description: "You are not authorized to view this page.", variant: "destructive" });
        navigate("/");
        return;
      }
      fetchBookings();
    }
  }, [user, authLoading]);

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, "bookings"), orderBy("check_in", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingData));
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if(!confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
      toast({ title: "Status Updated", description: `Booking marked as ${newStatus}` });
      fetchBookings(); // Refresh list
    } catch (error) {
      console.error(error);
      toast({ title: "Error", variant: "destructive" });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3">Guest</th>
                  <th className="px-6 py-3">Dates</th>
                  <th className="px-6 py-3">Payment</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{booking.first_name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3"/> {booking.email}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3"/> {booking.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {booking.check_in}</div>
                      <div className="text-xs text-muted-foreground ml-6">to {booking.check_out}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-600">₹{booking.amount_paid}</div>
                      <div className="text-xs text-gray-500 font-mono">{booking.payment_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {booking.status !== 'cancelled' && (
                        <Button variant="destructive" size="sm" onClick={() => updateStatus(booking.id, 'cancelled')}>
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;