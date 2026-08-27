import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "freemocks.in - Free Mock Tests & CBT Assessment Platform",
  description:
    "Zero-latency, offline-resilient Computer Based Test (CBT) mock exam platform for SSC, Railways, Banking, Teaching & Defense exams with KaTeX math rendering and real-time percentile analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
