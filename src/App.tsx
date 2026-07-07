import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductSection } from "@/components/ProductSection";
import { HowToUseSection } from "@/components/HowToUseSection";
import { IngredientsSection } from "@/components/IngredientsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SleepSupportSection } from "@/components/SleepSupportSection";
import { FAQSection } from "@/components/FAQSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { Checkout } from "@/pages/Checkout";

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ProblemSection />
      <ProductSection />
      <HowToUseSection />
      <IngredientsSection />
      <ReviewsSection />
      <SleepSupportSection />
      <FAQSection />
      <PricingSection />
    </main>
    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
