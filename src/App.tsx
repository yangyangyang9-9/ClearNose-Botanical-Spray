import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductSection } from "@/components/ProductSection";
import { HowToUseSection } from "@/components/HowToUseSection";
import { IngredientsSection } from "@/components/IngredientsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProductSection />
        <HowToUseSection />
        <IngredientsSection />
        <ReviewsSection />
        <FAQSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
