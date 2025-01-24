import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "./Providers";
import Sidebar from "@/components/navbar/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TokTik",
  description: "Welcome to TokTik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex">
            <div className="hidden md:inline">
              <Sidebar />
            </div>
            <div className="p-8 grow h-full overflow-auto max-h-[85vh]">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
