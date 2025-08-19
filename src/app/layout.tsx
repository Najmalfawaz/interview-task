import Footer from "@/components/shared/Footer";
import HeaderNavigation from "@/components/shared/HeaderNavigation";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Your Site Title</title>
        <meta name="description" content="Your site description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add Open Graph / Twitter meta tags for social sharing */}
      </Head>
      <body className="min-h-screen flex flex-col text-white">
        <HeaderNavigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
