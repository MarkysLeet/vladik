import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polygraphy 2.0 - Telegram First",
  description: "Industrial precision with messenger ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
