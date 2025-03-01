import "./globals.css";
import Head from "next/head";
import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <ClientWrapper>
          <Suspense fallback={<SuspenseLoader />}>
            <Header />
            <main className="w-full min-h-screen bg-accent/60 pt-18">
              {children}
            </main>
            <Toaster />
          </Suspense>
        </ClientWrapper>
      </body>
    </html>
  );
}
