import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public Pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import RoleSelection from "./pages/RoleSelection";

// Customer Pages
import CustomerHome from "./pages/customer/CustomerHome";
import ExploreGyms from "./pages/customer/ExploreGyms";
import GymDetails from "./pages/customer/GymDetails";
import Bookings from "./pages/customer/Bookings";
import SavedGyms from "./pages/customer/SavedGyms";
import CustomerProfile from "./pages/customer/CustomerProfile";
import BmiCalculator from "./pages/customer/BmiCalculator";

// Trainer Pages
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerGymDetails from "./pages/trainer/TrainerGymDetails";
import SlotsCapacity from "./pages/trainer/SlotsCapacity";
import SlotAnalytics from "./pages/trainer/SlotAnalytics";
import TrainerSubscription from "./pages/trainer/TrainerSubscription";
import AddGym from "./pages/trainer/AddGym";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/role-selection" element={<RoleSelection />} />

            {/* Customer Routes */}
            <Route path="/customer/home" element={<CustomerHome />} />
            <Route path="/customer/explore" element={<ExploreGyms />} />
            <Route path="/customer/gym/:id" element={<GymDetails />} />
            <Route path="/customer/bookings" element={<Bookings />} />
            <Route path="/customer/saved" element={<SavedGyms />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/customer/bmi" element={<BmiCalculator />} />

            {/* Trainer Routes */}
            <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
            <Route path="/trainer/gym-details" element={<TrainerGymDetails />} />
            <Route path="/trainer/slots" element={<SlotsCapacity />} />
            <Route path="/trainer/analytics" element={<SlotAnalytics />} />
            <Route path="/trainer/subscription" element={<TrainerSubscription />} />
            <Route path="/trainer/add-gym" element={<AddGym />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
