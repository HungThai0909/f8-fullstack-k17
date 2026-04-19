import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ExclusiveDeals from "@/components/sections/ExclusiveDeals";
import PopularCategories from "@/components/sections/PopularCategories";
import PopularRestaurants from "@/components/sections/PopularRestaurants";
import MobileAppBanner from "@/components/sections/MobileAppBanner";
import PartnerSections from "@/components/sections/PartnerSections";
import KnowMore from "@/components/sections/KnowMore";
import StatsCounter from "@/components/sections/StatsCounter";
import LoginModal from "@/components/auth/LoginModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Header onLoginClick={() => setLoginModalOpen(true)} />

        <main>
          <HeroSection />
          <ExclusiveDeals />
          <PopularCategories />
          <PopularRestaurants />
          <MobileAppBanner />
          <PartnerSections />
          <KnowMore />
          <StatsCounter />
        </main>

        <Footer />

        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
        />
      </div>
    </QueryClientProvider>
  );
}
