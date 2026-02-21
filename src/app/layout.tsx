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
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#F2F2F7] text-[#1C1C1E] selection:bg-primary/20 selection:text-primary">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
