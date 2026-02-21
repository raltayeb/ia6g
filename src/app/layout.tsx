import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { DirectionProvider } from "@/components/ui/direction";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
});

export const metadata: Metadata = {
  title: "نظام السلام | إدارة موارد المؤسسات",
  description: "نظام متطور لإدارة العقارات، الأسطول، والموارد البشرية بمعايير عالمية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoKufiArabic.variable} antialiased`}>
      <body className="font-sans">
        <DirectionProvider direction="rtl">
          {children}
          <Toaster />
        </DirectionProvider>
      </body>
    </html>
  );
}
