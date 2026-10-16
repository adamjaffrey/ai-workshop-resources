import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Implementation Workshop Resources",
  description: "Workshop resources with shared-password access.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
