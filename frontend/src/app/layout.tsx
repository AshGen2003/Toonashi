import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import AuthSync from "@/components/AuthSync"; // Import the component

export const metadata: Metadata = {
  title: "Toonashi | Your Premium Anime Destination",
  description: "Explore the world of anime with Toonashi. Trending titles, detailed information, and more.",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <AuthSync />
          <Toaster richColors closeButton position="top-right" theme="dark" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}