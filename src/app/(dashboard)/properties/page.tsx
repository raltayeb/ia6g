"use client";

import { Building2, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye, Filter } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Property } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockProperties: Property[] = [
  { id: "1", name: "ساحة السلام التجارية", type: "Commercial", location: "الرياض، العليا", status: "Occupied", monthlyIncome: 45000, value: 5500000 },
  { id: "2", name: "مجمع سكن العمال ب", type: "Residential", location: "جدة، المدينة الصناعية", status: "Occupied", monthlyIncome: 12000, value: 2100000 },
  { id: "3", name: "برج وردة الصحراء", type: "Residential", location: "الدمام، الكورنيش", status: "Maintenance", monthlyIncome: 0, value: 8900000 },
  { id: "4", name: "المستودع اللوجستي الشمالي", type: "Industrial", location: "الرياض، مخرج 18", status: "Vacant", monthlyIncome: 0, value: 3400000 },
  { id: "5", name: "الأجنحة التنفيذية المركزية", type: "Commercial", location: "الرياض، كافد", status: "Occupied", monthlyIncome: 75000, value: 12000000 },
];

export default function PropertiesPage() {
  const { toast } = useToast();

  const handleAction = (action: string, name: string) => {
    toast({
      title: "إدارة العقارات",
      description: `تم اختيار ${action} لعقار ${name}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-black text-primary">إدارة العقارات</h1>
          </div>
          <Button size="sm" className="gap-2 rounded-xl shadow-sm font-bold h-9" onClick={() => handleAction("إضافة", "جديد")}>
            <Plus className="h-4 w-4" />
            إضافة عقار
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">إجمالي الوحدات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-black text-right">{toArabicDigits(mockProperties.length)} عقارات</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">العائد الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black">{formatCurrencyValue(132000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">نسبة الإشغال</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-black text-emerald-600 text-right">{toArabicDigits(85)}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن عقار..." className="pr-10 h-10 rounded-2xl border-none bg-white/80 text-xs" dir="rtl" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl bg-white/80 border-none h-10 px-4 text-xs font-bold">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>

          <Card className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">العقار والنوع</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الموقع</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الدخل الشهري</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow key={prop.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">{prop.name}</span>
                        <span className="text-[9px] text-muted-foreground">{prop.type === 'Commercial' ? 'تجاري' : 'سكني'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground justify-end">
                        {prop.location}
                        <MapPin className="h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="secondary" 
                        className={`rounded-lg px-3 py-0.5 text-[9px] font-bold border-none ${
                          prop.status === "Occupied" ? "bg-emerald-100 text-emerald-700" : 
                          prop.status === "Vacant" ? "bg-slate-100 text-slate-600" : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {prop.status === "Occupied" ? "مؤجر" : prop.status === "Vacant" ? "شاغر" : "صيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-black justify-end text-xs">
                        {formatCurrencyValue(prop.monthlyIncome)}
                        <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-2xl">
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => handleAction("عرض", prop.name)}>
                            <span>عرض التفاصيل</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => handleAction("تعديل", prop.name)}>
                            <span>تعديل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs text-rose-600" onClick={() => handleAction("حذف", prop.name)}>
                            <span>حذف</span>
                            <Trash2 className="h-4 w-4" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
