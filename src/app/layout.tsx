import Footer from "@/components/shared/Footer";
import HeaderNavigation from "@/components/shared/HeaderNavigation";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Company Website</title>
        <meta name="description" content="Your site description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen flex flex-col text-white">
        <HeaderNavigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
