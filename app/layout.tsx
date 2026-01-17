import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // SEO title (keyword-first)
  title: {
    default: "NREMT Practice Test (Free) + NREMT Prep Simulator | NREMTS",
    template: "%s | NREMTS",
  },

  // SEO description (keyword + benefit)
  description:
    "Free NREMT practice test + CAT-style simulator. Get an instant readiness score, detailed rationales, and a focused NREMT prep study plan for EMT & Paramedic.",

  // Helps Google understand the topic (lightweight)
  keywords: [
    "nremt practice test",
    "nremt prep",
    "nremt test prep",
    "emt practice test",
    "paramedic practice test",
    "nremt simulator",
    "nremt study guide",
    "nremt exam practice",
  ],

  manifest: "/manifest.json",
  applicationName: "NREMTS",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NREMTS",
  },

  // Social sharing (can be more “hooky” without hurting SEO)
  openGraph: {
    title: "NREMT Practice Test + CAT-Style Simulator (Free Diagnostic)",
    description:
      "Take a free NREMT practice test diagnostic in ~60 seconds. Get your readiness score + weakest domains instantly.",
    type: "website",
    siteName: "NREMTS",
  },

  twitter: {
    card: "summary_large_image",
    title: "NREMT Practice Test (Free) — Will the Computer Stop?",
    description:
      "Free diagnostic → readiness score + weakness plan. EMT & Paramedic modes.",
  },

  // Optional: prevents iOS from auto-detecting phone numbers etc.
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
