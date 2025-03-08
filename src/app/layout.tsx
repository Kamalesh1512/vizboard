import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cn } from "@/lib/utils";
import ModalDialog from "@/components/global/modal-dialog";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VizBoardAI",
  description: "AI Tool for You",
  icons: "/logo.png",
  publisher: "BOOTSTRAP HUB",
  openGraph: {
    title: "VizBoardAI",
    description: "infogrpahics , ppt's builder",
    url: "https://www.vizboardai.in",
    siteName: "vizboardai.in",
    images: [
      {
        url: "/preview-thumbnail.png",
        width: 1200,
        height: 600,
        alt: "preview-thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("bg-transparent", outfit.className)}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModalDialog />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
