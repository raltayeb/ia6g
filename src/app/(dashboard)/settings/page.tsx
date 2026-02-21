"use client";

import { Shield, UserCog, Lock, Users, Save, Bell, Globe, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toArabicDigits } from "@/lib/utils";

const roles = [
  { name: "مدير خارق", users: 2, access: "جميع الوحدات", level: "Full" },
  { name: "مدير أسطول", users: 3, access: "المركبات، الصيانة", level: "Restricted" },
  { name: "محاسب", users: 4, access: "المالية، الزكاة، الرواتب", level: "Restricted" },
  { name: "مدير عقارات", users: 5, access: "العقارات، السكن", level: "Restricted" },
];

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <SidebarTrigger className="-ml-1 text-primary" />
          <h1 className="text-sm font-black text-primary">الإعدادات والأدوار</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
              <CardHeader className="p-6 text-right">
                <CardTitle className="flex flex-row-reverse items-center gap-2 text-sm font-bold">
                  <Shield className="h-4 w-4 text-primary" />
                  إدارة أدوار المستخدمين
                </CardTitle>
                <CardDescription className="text-[10px]">تحديد صلاحيات النظام ومستويات الوصول.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="text-right font-bold text-[11px] uppercase">الدور</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase">المستخدمين</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase">المستوى</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.name} className="border-b border-slate-100/50 last:border-0">
                        <TableCell className="font-bold text-xs text-right">{role.name}</TableCell>
                        <TableCell className="text-right text-xs font-mono">{toArabicDigits(role.users)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="text-[9px] font-bold rounded-lg px-2 bg-emerald-50 text-emerald-700 border-none">
                            {role.level === 'Full' ? 'كامل' : 'مقيد'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t border-slate-100 p-4">
                <Button variant="ghost" className="w-full gap-2 rounded-xl text-[10px] font-bold">
                  <UserCog className="h-4 w-4" />
                  إدارة جميع الأدوار
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
              <CardHeader className="p-6 text-right">
                <CardTitle className="flex flex-row-reverse items-center gap-2 text-sm font-bold">
                  <Lock className="h-4 w-4 text-primary" />
                  سياسة الأمن
                </CardTitle>
                <CardDescription className="text-[10px]">تكوين إعدادات الأمان العالمية للنظام.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <div className="flex items-center justify-between">
                  <Switch defaultChecked />
                  <div className="flex flex-col text-right">
                    <Label className="font-bold text-xs">المصادقة الثنائية</Label>
                    <p className="text-[10px] text-muted-foreground">طلب 2FA لجميع المستخدمين الإداريين.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Switch defaultChecked />
                  <div className="flex flex-col text-right">
                    <Label className="font-bold text-xs">قفل الجلسة التلقائي</Label>
                    <p className="text-[10px] text-muted-foreground">تسجيل خروج المستخدمين بعد 15 دقيقة.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Switch />
                  <div className="flex flex-col text-right">
                    <Label className="font-bold text-xs">تكاملات الـ API</Label>
                    <p className="text-[10px] text-muted-foreground">السماح بالربط مع الزكاة والضريبة.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-100 p-4">
                <Button className="w-full gap-2 rounded-xl text-[10px] font-bold shadow-sm">
                  <Save className="h-4 w-4" />
                  حفظ الإعدادات
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
            <CardHeader className="p-6 text-right">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-sm font-bold">
                <Users className="h-4 w-4 text-primary" />
                الجلسات النشطة
              </CardTitle>
              <CardDescription className="text-[10px]">مراقبة الوصول في الوقت الفعلي إلى المنصة.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="rounded-2xl border border-slate-100 p-4 bg-white/50 flex flex-col gap-4">
                {[
                  { user: "أحمد أ.", location: "مكتب الرياض", time: "الآن", device: "Chrome / Windows" },
                  { user: "خالد م.", location: "ميداني (الجوال)", time: "منذ ١٢ دقيقة", device: "Safari / iOS" },
                  { user: "سامي ف.", location: "عن بعد", time: "منذ ساعتين", device: "Edge / Windows" },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div className="flex gap-4 items-center">
                      <Badge variant="outline" className="text-[9px] font-bold bg-white border-slate-100">{toArabicDigits(session.time)}</Badge>
                      <span className="text-[10px] text-muted-foreground">{session.device}</span>
                    </div>
                    <div className="flex gap-4 items-center text-right">
                      <span className="text-muted-foreground text-[10px]">{session.location}</span>
                      <span className="font-bold">{session.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
