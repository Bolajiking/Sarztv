import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from "@/lib/auth/privy-provider";
import { LivepeerProvider } from "@/lib/video/livepeer-provider";
import { ErrorSuppressor } from "@/components/error-suppressor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CCI TV - Ministry Streaming Platform",
  description: "Leading people to a life of endless celebration in Christ. Join our digital sanctuary for live services, sermons, and spiritual growth.",
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
        <ErrorSuppressor />
        <PrivyProvider>
          <LivepeerProvider>
        {children}
          </LivepeerProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
