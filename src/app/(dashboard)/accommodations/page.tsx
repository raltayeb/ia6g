"use client";

import { Home, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accommodation } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockAccommodations: Accommodation[] = [
  { id: "A1", name: "سكن موظفي السلام أ", capacity: 50, currentOccupants: 42, location: "الرياض، المنطقة الصناعية", monthlyCost: 25000 },
  { id: "A2", name: "أجنحة التنفيذيين شمال", capacity: 12, currentOccupants: 8, location: "الرياض، العليا", monthlyCost: 15000 },
  { id: "A3", name: "مجمع كامب العمال ب", capacity: 120, currentOccupants: 115, location: "جدة، طريق الميناء", monthlyCost: 45000 },
  { id: "A4", name: "سكن سائقي الأسطول", capacity: 30, currentOccupants: 12, location: "الدمام", monthlyCost: 8000 },
];

export default function AccommodationsPage() {
  const { toast } = useToast();

  const handleAction = (action: string, name: string) => {
    toast({
      title: "تم تنفيذ الإجراء",
      description: `تم اختيار ${action} لـ ${name}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="font-headline text-lg font-bold text-primary">إدارة السكن</h1>
          </div>
          <Button className="gap-2 rounded-xl shadow-sm" onClick={() => handleAction("إضافة", "مبنى جديد")}>
            <Plus className="h-4 w-4" />
            مبنى جديد
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">إجمالي السعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-black text-right">{toArabicDigits(212)} وحدة</div>
                <div className="flex flex-row-reverse items-center gap-3 mt-3">
                  <Progress value={83} className="h-1.5 flex-1" />
                  <span className="text-[10px] font-bold text-blue-600">{toArabicDigits(83)}%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">التكلفة الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black">{formatCurrencyValue(93000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-80" />
                </div>
                <p className="text-[9px] text-muted-foreground mt-2 font-bold text-right">بمتوسط {toArabicDigits(438)} ريال / ساكن</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80 border-r-4 border-r-emerald-500">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">الوحدات الشاغرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-black text-emerald-600 text-right">{toArabicDigits(35)} وحدة</div>
                <p className="text-[9px] text-muted-foreground mt-2 font-bold text-right">جاهزة للتسكين الفوري</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن السكن..." className="pr-9 rounded-xl border-slate-200 text-right bg-white/80" dir="rtl" />
            </div>
          </div>

          <div className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[300px] text-right font-bold text-xs">المبنى / المجمع</TableHead>
                  <TableHead className="text-right font-bold text-xs">الموقع</TableHead>
                  <TableHead className="text-right font-bold text-xs">الإشغال</TableHead>
                  <TableHead className="text-right font-bold text-xs">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-xs">الإيجار</TableHead>
                  <TableHead className="w-[80px] text-center font-bold text-xs">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccommodations.map((acc) => {
                  const occupancyRate = (acc.currentOccupants / acc.capacity) * 100;
                  return (
                    <TableRow key={acc.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                      <TableCell className="font-medium text-right">
                        <div className="flex items-center gap-3 justify-end">
                          <div className="flex flex-col text-right">
                            <span className="font-bold text-[13px]">{acc.name}</span>
                            <span className="text-[9px] text-muted-foreground font-mono">{acc.id}</span>
                          </div>
                          <div className="p-2 bg-primary/5 rounded-xl shrink-0">
                            <Home className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground justify-end">
                          {acc.location}
                          <MapPin className="h-3 w-3" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col gap-1.5 w-full max-w-[100px] ml-auto">
                          <div className="flex flex-row-reverse justify-between text-[9px] font-black">
                            <span>{toArabicDigits(acc.currentOccupants)}/{toArabicDigits(acc.capacity)}</span>
                            <span>{toArabicDigits(Math.round(occupancyRate))}%</span>
                          </div>
                          <Progress 
                            value={occupancyRate} 
                            className="h-1" 
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant={occupancyRate >= 100 ? "destructive" : occupancyRate > 80 ? "secondary" : "default"}
                          className={`rounded-lg text-[9px] font-bold px-2 py-0 ${occupancyRate < 80 ? "bg-emerald-500 border-none" : ""}`}
                        >
                          {occupancyRate >= 100 ? "مكتمل" : occupancyRate > 80 ? "شبه ممتلئ" : "متاح"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-1 font-black justify-end text-xs">
                          {formatCurrencyValue(acc.monthlyCost)}
                          <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-70" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44 font-headline rounded-2xl">
                            <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs py-2" onClick={() => handleAction("عرض التفاصيل", acc.name)}>
                              <span>عرض التفاصيل</span>
                              <Eye className="h-4 w-4" />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs py-2" onClick={() => handleAction("تعديل", acc.name)}>
                              <span>تعديل السجل</span>
                              <Edit className="h-4 w-4" />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs py-2 text-rose-600" onClick={() => handleAction("حذف", acc.name)}>
                              <span>حذف السجل</span>
                              <Trash2 className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
