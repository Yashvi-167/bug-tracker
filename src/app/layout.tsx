import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LogStream | Premium Bug Tracking & Session Replay",
  description: "Production-grade bug tracking platform with built-in session recording and replay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark h-full">
        <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500/30`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
