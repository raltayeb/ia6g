import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'نظام السلام | تخطيط موارد المؤسسات',
  description: 'نظام شامل لإدارة العقارات، الأسطول، والموارد البشرية',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
