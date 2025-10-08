import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GO Velo - Ride your passion!",
  description: "Boutique de vélos et accessoires",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}