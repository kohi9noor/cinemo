import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthModel from "@/features/auth/components/auth-model";
import OnboardingModal from "@/features/auth/components/onboarding-modal";
import { Header } from "@/components/main/header";
import DebugLogout from "@/components/debug/debug-logout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinemo - Discover Movies & TV Shows",
  description:
    "Your personal cinema companion. Discover, track, and manage your favorite movies and TV shows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}

        <Toaster richColors position="top-center" theme="dark" expand={true} />
        <AuthModel />
        <OnboardingModal />
        <DebugLogout />
      </body>
    </html>
  );
}
