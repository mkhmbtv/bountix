import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TicketBounty",
  description: "My TicketBounty application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-full flex-col antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-secondary/20 px-8 py-24">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
