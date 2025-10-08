import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GO Velo - Accélère ta liberté !',
  description: 'Vente en ligne de bicyclettes, pièces de rechange et accessoires pour vélos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
