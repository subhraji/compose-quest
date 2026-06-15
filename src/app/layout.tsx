import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Compose Quest — Learn Jetpack Compose Like an Adventure",
  description:
    "The most beginner-friendly way to learn Jetpack Compose. A visual, interactive, AI-guided journey from your first Composable to advanced UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
