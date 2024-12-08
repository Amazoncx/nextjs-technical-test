import { ReactNode } from "react";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { Space_Grotesk } from 'next/font/google';
const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Technical Test",
  description: "A test for implementing search and pagination with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      <body className={SpaceGrotesk.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}