import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LOGO_FAVICON = "https://i.ibb.co/DWxtttS/logo.png";

export const metadata: Metadata = {
  title: "Fahim Muntasir Akib | Full-Stack Developer",
  description:
    "Portfolio of Fahim Muntasir Akib - Full-Stack Developer from Chattogram, Bangladesh. IIUC CSE graduate.",
  icons: {
    icon: LOGO_FAVICON,
    shortcut: LOGO_FAVICON,
    apple: LOGO_FAVICON,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
