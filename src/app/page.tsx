// app/page.tsx
import { Hero } from "@/components/landing/Hero";
import { SearchFilters } from "@/components/landing/SearchFilters";
import { PropertyGrid } from "@/components/landing/PropertyGrid";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CallToAction } from "@/components/landing/CallToAction";
import  LandingFooter from "@/components/landing/Footer";
import { Perks } from "@/components/landing/Perks";
import TopProperties from "@/components/landing/TopProperties";
import { SignupBox } from "@/components/landing/SignupBox";
import Navbar  from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";


export default function HomePage() {
  return (
    <div className="bg-white text-gray-900">
      {/* <Navbar /> */}
      <Hero />
      {/* <SearchFilters /> */}
      <TopProperties />
      {/* <PropertyGrid /> */}
      <WhyChooseUs />
      <HowItWorks />
      {/* <Testimonials /> */}
         <Perks /> 
      <CallToAction />
      <SignupBox /> 
      <ContactSection />
      {/* <LandingFooter /> */}
    </div>
  );
}









// // app/page.tsx
// import { Hero } from "@/components/landing/Hero";
// import { SearchSection } from "@/components/landing/SearchSection";
// import { FeaturedListings } from "@/components/landing/FeaturedListings";
// import { HowItWorks } from "@/components/landing/HowItWorks";
// import { Testimonials } from "@/components/landing/Testimonials";
// import { Footer } from "@/components/landing/Footer";

// export default function HomePage() {
//   return (
//     <div className="bg-white text-gray-900">
//       <Hero />
//       <SearchSection />
//       <FeaturedListings />
//       <HowItWorks />
//       <Testimonials />
//       <Footer />
//     </div>
//   );
// }
