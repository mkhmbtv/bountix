import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { Header } from "./_components/header";

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

const HEADER_HEIGHT = "4rem";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full overflow-x-hidden"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
        style={
          {
            "--header-height": HEADER_HEIGHT,
          } as React.CSSProperties
        }
      >
        <NuqsAdapter>
          <ThemeProvider>
            <QueryProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </QueryProvider>
            <Toaster expand richColors />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
