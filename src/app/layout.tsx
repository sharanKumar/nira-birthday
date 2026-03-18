import type { Metadata } from "next";
import { MusicProvider } from "@/components/MusicContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nira's 2nd Birthday Bash 🐝",
  description:
    "You're invited to celebrate Nira's 2nd Birthday! Join us for a sweet bumble bee themed evening of fun, cake, and celebration on April 11th.",
  keywords: ["birthday", "invitation", "Nira", "celebration", "bumble bee", "2nd birthday"],
  metadataBase: new URL("https://nira-birthday.vercel.app"),
  openGraph: {
    title: "Nira's 2nd Birthday Bash 🐝",
    description:
      "You're invited to celebrate Nira's 2nd Birthday! A sweet bumble bee celebration awaits.",
    type: "website",
    siteName: "Nira's 2nd Birthday Bash",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nira's 2nd Birthday Bash 🐝",
    description: "You're invited to celebrate Nira's 2nd Birthday!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
          <MusicProvider>{children}</MusicProvider>
        </body>
    </html>
  );
}
