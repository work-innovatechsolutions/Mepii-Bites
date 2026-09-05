import React from "react";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import CategoryCards from "@/components/CategoryCards";
import BestsellerSection from "@/components/BestsellerSection";
import FeaturedProductStory from "@/components/FeaturedProductStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import ComboSection from "@/components/ComboSection";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import BrandStory from "@/components/BrandStory";
import InstagramSection from "@/components/InstagramSection";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryCards />
      <BestsellerSection />
      <FeaturedProductStory />
      <WhyChooseUs />
      <ComboSection />
      <PromoBanner />
      <Testimonials />
      <BrandStory />
      <InstagramSection />
      <Newsletter />
    </>
  );
}
