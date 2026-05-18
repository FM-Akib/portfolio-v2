import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AIAgent } from "@/components/sections";
import { profile, socialLinks } from "@/data";
import "./globals.css";

// Editorial serif — display & headings (italic available for accent)
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Refined modern sans — body
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Mono — meta, filenames, signatures
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const LOGO = "https://i.ibb.co/DWxtttS/logo.png";
const SITE_URL = profile.siteUrl;
const TITLE = `${profile.fullName.replace(/^Hey This is /i, "Muntasir Akib")} — Full-Stack Developer`;
const DESCRIPTION = profile.bio;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muntasir Akib — Full-Stack Developer",
    template: "%s · Muntasir Akib",
  },
  description: DESCRIPTION,
  applicationName: "Muntasir Akib Portfolio",
  authors: [{ name: "Fahim Muntasir Akib", url: SITE_URL }],
  creator: "Fahim Muntasir Akib",
  publisher: "Fahim Muntasir Akib",
  generator: "Next.js",
  keywords: [
    "Fahim Muntasir Akib",
    "Muntasir Akib",
    "Akib",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "MERN Stack",
    "Bangladesh Developer",
    "Chattogram",
    "IIUC",
    "Portfolio",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Muntasir Akib",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: LOGO,
        width: 1200,
        height: 630,
        alt: "Muntasir Akib — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [LOGO],
    creator: "@FM_Akib",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: LOGO,
    shortcut: LOGO,
    apple: LOGO,
  },
  category: "technology",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1814" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

// JSON-LD Person schema for rich results
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fahim Muntasir Akib",
  alternateName: ["Muntasir Akib", "Akib"],
  url: SITE_URL,
  image: LOGO,
  jobTitle: "Full-Stack Developer",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description: profile.bio,
  worksFor: {
    "@type": "Organization",
    name: "RILO IT & Software Ltd.",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "International Islamic University Chittagong",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chattogram",
    addressCountry: "Bangladesh",
  },
  sameAs: socialLinks.map((l) => l.href),
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Tailwind CSS",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Muntasir Akib Portfolio",
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: "Fahim Muntasir Akib" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${instrument.variable} ${geist.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <AIAgent />
        </ThemeProvider>
      </body>
    </html>
  );
}
