import Navbar from "@/components/layout/NaveBar";
import HeroSection from "@/components/layout/hero-section";
import ServicesSection from "@/components/layout/services-section";
import HowItWorksSection from "@/components/layout/how-it-works-section";
import TestimonialsSection from "@/components/layout/testmonial-section"
import CTASection from "@/components/layout/cta-section"
import Footer from "@/components/layout/footer"
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="animate-fade-in w-full">
          <HeroSection />
          <ServicesSection />
          <HowItWorksSection/>
          <TestimonialsSection/>
          <CTASection/>
          <Footer/>
        </div>
      </main>
    </>
  );
}
