import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kalahari Hertz | IT Solutions & Cybersecurity Botswana",
  description: "Kalahari Hertz is a leading IT service provider in Gaborone, Botswana. We offer Managed IT Services, Cybersecurity, Cloud Solutions, Website Development, and IT Governance.",
  keywords: [
    "IT services Botswana", 
    "Cybersecurity Gaborone", 
    "Managed IT services", 
    "IT consulting Botswana", 
    "Cloud solutions Botswana", 
    "Printer rentals Gaborone", 
    "Kalahari Hertz"
  ],
  authors: [{ name: "Kalahari Hertz" }],
  creator: "Kalahari Hertz",
  metadataBase: new URL("https://kalaharihertz.co.bw"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kalahari Hertz | IT Solutions & Cybersecurity Botswana",
    description: "Empowering businesses in Botswana with cutting-edge IT, cybersecurity, and digital transformation solutions.",
    url: "https://kalaharihertz.co.bw",
    siteName: "Kalahari Hertz",
    locale: "en_BW",
    type: "website",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#06141B] text-white`}>
        
        {/* JSON-LD STRUCTURED DATA FOR AI & SEARCH ENGINES */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Kalahari Hertz",
              "description": "Kalahari Hertz is a dynamic IT service provider based in Gaborone, Botswana, delivering innovative technology solutions that drive efficiency, security, and growth.",
              "url": "https://kalaharihertz.co.bw",
              "telephone": "+26774076795",
              "email": "info@kalaharihertz.co.bw",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Plot 74212, Gaborone North",
                "addressLocality": "Gaborone",
                "addressCountry": "BW"
              },
              "founder": {
                "@type": "Person",
                "name": "Boago Stix Otsetswe",
                "jobTitle": "Director & IT Specialist",
                "knowsAbout": ["SSCP", "CC", "IBM Cybersecurity Analyst"]
              },
              "areaServed": "Botswana",
              "knowsAbout": [
                "Managed IT Services",
                "Cybersecurity",
                "Cloud Solutions",
                "IT Governance",
                "Website Development",
                "Data Protection",
                "Printer Rentals"
              ],
              "hasCredential": "PPADB Registered Company"
            })
          }}
        />

        {children}
      </body>
    </html>
  );
}