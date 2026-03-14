import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Lüks fontumuzu ekledik
import "./globals.css";

// Gemicha font yapılandırması
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "700", "800"], // Karakter sayfasındaki kalınlıklar
});

export const metadata: Metadata = {
  title: "GEMICHA | Cosmos Analytics",
  description: "Global daily insights powered by real-time cosmic ephemeris.",
  // Favicon ve Logo Ayarları
  icons: {
    icon: "/favicon.ico", // public/favicon.ico
    apple: "/logo.png",   // public/logo.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* İKONLAR İÇİN FONT AWESOME EKLENTİSİ (Play, Pause, Hoparlör vb.) */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
