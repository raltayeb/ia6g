
"use client";

import { Settings, Shield, UserCog, Lock, Users, Save } from "lucide-react";
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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="font-headline text-xl font-bold text-primary">الإدارة والأدوار</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  إدارة أدوار المستخدمين
                </CardTitle>
                <CardDescription>تحديد صلاحيات النظام ومستويات الوصول.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الدور</TableHead>
                      <TableHead className="text-right">المستخدمين</TableHead>
                      <TableHead className="text-right">المستوى</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.name}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell>
                          <Badge variant={role.level === "Full" ? "default" : "secondary"}>
                            {role.level === 'Full' ? 'كامل' : 'مقيد'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full gap-2">
                  <UserCog className="h-4 w-4" />
                  إدارة جميع الأدوار
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  سياسة الأمن
                </CardTitle>
                <CardDescription>تكوين إعدادات الأمان العالمية لنظام السلام.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="font-bold">المصادقة الثنائية</Label>
                    <p className="text-xs text-muted-foreground">طلب 2FA لجميع المستخدمين الإداريين.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="font-bold">قفل الجلسة التلقائي</Label>
                    <p className="text-xs text-muted-foreground">تسجيل خروج المستخدمين بعد 15 دقيقة من عدم النشاط.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="font-bold">الوصول إلى واجهة برمجة التطبيقات</Label>
                    <p className="text-xs text-muted-foreground">السماح بعمليات التكامل مع أطراف ثالثة (مثل الزكاة والضريبة).</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  حفظ إعدادات الأمان
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                الجلسات النشطة
              </CardTitle>
              <CardDescription>مراقبة الوصول في الوقت الفعلي إلى منصة ERP.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border p-4 bg-muted/20 flex flex-col gap-3">
                {[
                  { user: "أحمد أ.", location: "مكتب الرياض", time: "الآن", device: "Chrome / Windows" },
                  { user: "خالد م.", location: "ميداني (الجوال)", time: "منذ 12 دقيقة", device: "Safari / iOS" },
                  { user: "سامي ف.", location: "عن بعد", time: "منذ ساعتين", device: "Edge / Windows" },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      <span className="font-bold">{session.user}</span>
                      <span className="text-muted-foreground">{session.location}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-xs text-muted-foreground">{session.device}</span>
                      <Badge variant="outline" className="text-[10px]">{session.time}</Badge>
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
