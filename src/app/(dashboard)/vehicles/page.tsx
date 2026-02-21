
"use client";

import { Car, Plus, Search, MapPin, MoreVertical, Fuel, Wrench, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle } from "@/types/erp";

const mockVehicles: Vehicle[] = [
  { id: "1", plateNumber: "أ ب ج 1234", model: "تويوتا هايلكس 2023", type: "Truck", driverName: "أحمد علي", lastServiceDate: "2024-03-10", status: "Active", purchaseValue: 120000 },
  { id: "2", plateNumber: "د هـ و 5678", model: "هيونداي إلنترا 2022", type: "Sedan", driverName: "محمد خالد", lastServiceDate: "2024-02-15", status: "Maintenance", purchaseValue: 75000 },
  { id: "3", plateNumber: "ز ح ط 9012", model: "مرسيدس أكتروس", type: "Truck", driverName: "سعيد سالم", lastServiceDate: "2024-04-01", status: "Active", purchaseValue: 450000 },
  { id: "4", plateNumber: "ي ك ل 3456", model: "تويوتا هايس", type: "Van", driverName: "يوسف إبراهيم", lastServiceDate: "2023-12-20", status: "Out of Service", purchaseValue: 110000 },
  { id: "5", plateNumber: "م ن و 7890", model: "فورد F-150", type: "Truck", driverName: "فيصل أحمد", lastServiceDate: "2024-03-25", status: "Active", purchaseValue: 180000 },
];

export default function VehiclesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">إدارة الأسطول</h1>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            تسجيل مركبة
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-emerald-500 rounded-full text-white">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-emerald-700 font-bold uppercase">إجمالي الوحدات</p>
                  <p className="text-2xl font-bold text-emerald-900">58</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-full text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-bold uppercase">السائقين النشطين</p>
                  <p className="text-2xl font-bold text-blue-900">42</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-amber-500 rounded-full text-white">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-amber-700 font-bold uppercase">في الصيانة</p>
                  <p className="text-2xl font-bold text-amber-900">6</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-slate-100">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-slate-500 rounded-full text-white">
                  <Fuel className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-700 font-bold uppercase">تكاليف الوقود</p>
                  <p className="text-2xl font-bold text-slate-900">12.4 ألف ر.س</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة أو الموديل..." className="pr-9" />
            </div>
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-right">الموديل والنوع</TableHead>
                  <TableHead className="text-right">السائق</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">آخر صيانة</TableHead>
                  <TableHead className="text-left">التقييم</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold">{vehicle.plateNumber}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{vehicle.model}</span>
                        <span className="text-xs text-muted-foreground">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : vehicle.type === 'Van' ? 'فان' : 'حافلة'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-[10px] text-white font-bold">
                          {vehicle.driverName?.split(' ').map(n => n[0]).join('')}
                        </div>
                        {vehicle.driverName || "غير محدد"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={vehicle.status === "Active" ? "default" : vehicle.status === "Maintenance" ? "secondary" : "destructive"}
                        className={vehicle.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                      >
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{vehicle.lastServiceDate}</TableCell>
                    <TableCell className="text-left font-mono">
                      {vehicle.purchaseValue.toLocaleString()} ر.س
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
