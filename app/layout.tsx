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
  title: "SARZ TV - The Official Streaming Platform",
  description: "Exclusive beats, behind-the-scenes, live sessions, and more from the legendary producer Sarz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
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
