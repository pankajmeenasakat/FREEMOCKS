"use client";

import React from "react";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { MetricsSection } from "../components/landing/MetricsSection";
import { PopularExamsSection } from "../components/landing/PopularExamsSection";
import { PassPromoSection } from "../components/landing/PassPromoSection";
import { TestSeriesSection } from "../components/landing/TestSeriesSection";
import { Footer } from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* 2. Main Navigation Bar (Ref Image 1) */}
      <Navbar />

      {/* 3. Main Landing Sections */}
      <main className="flex-1">
        {/* Hero Section (Ref Image 1) */}
        <HeroSection />

        {/* 4-Metric Grid Strip (Ref Image 2) */}
        <MetricsSection />

        {/* Popular Exams Grid with category switcher (Ref Image 2) */}
        <PopularExamsSection />

        {/* Freemocks Pass 670+ Value proposition (Ref Image 3) */}
        <PassPromoSection />

        {/* Popular Test Series (Ref Image 4) */}
        <TestSeriesSection />
      </main>

      {/* 4. Full Dark Footer (Ref Image 5) */}
      <Footer />
    </div>
  );
}
