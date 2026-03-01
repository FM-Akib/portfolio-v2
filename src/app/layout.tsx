import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

// Body & headings: Outfit (400 regular, 600 semi-bold)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// Hero display: Poppins (700 bold)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
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
        className={`${outfit.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
