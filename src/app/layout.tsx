import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import SuspenseLoader from "@/components/SuspenseLoader";
import ClientWrapper from "@/components/wrappers/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentTube",
  description:
    "AI Content Agent to transform your video content with AI powered analysis, transcription, and insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <ClientWrapper>
          <Suspense fallback={<SuspenseLoader />}>
            <Header />
            <main>{children}</main>
          </Suspense>
        </ClientWrapper>
      </body>
    </html>
  );
}
