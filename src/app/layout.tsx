import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'نظام السلام | إدارة موارد المؤسسات',
  description: 'نظام متطور لإدارة العقارات، الأسطول، والموارد البشرية بمعايير عالمية',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#F7F9F2] text-[#1C1C1E]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
