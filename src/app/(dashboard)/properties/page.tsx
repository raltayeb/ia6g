"use client";

import { Building2, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye, Filter, ArrowUpRight } from "lucide-react";
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
      <SidebarInset className="bg-background">
        <header className="flex h-20 shrink-0 items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-10 w-10 rounded-full" />
            <h1 className="text-xl font-black tracking-tight text-foreground">إدارة العقارات</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="rounded-full gap-2 font-bold px-6 h-11 border-none bg-secondary/80">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
            <Button className="rounded-full gap-2 font-black px-6 h-11 shadow-lg shadow-primary/20">
              <Plus className="h-5 w-5" />
              إضافة عقار جديد
            </Button>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-8 p-8 pt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="m3-card bg-emerald-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-emerald-600 opacity-40" />
              </div>
              <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">إجمالي العقارات</p>
              <p className="text-3xl font-black mt-1">{toArabicDigits(mockProperties.length)} وحدات</p>
            </Card>
            
            <Card className="m3-card bg-blue-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-blue-600 opacity-40" />
              </div>
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">الدخل الشهري</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-3xl font-black">{formatCurrencyValue(132000)}</span>
                <SaudiRiyalIcon className="h-5 w-5 text-blue-600 opacity-60" />
              </div>
            </Card>

            <Card className="m3-card bg-amber-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Activity className="h-6 w-6 text-amber-600" />
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm" />
              </div>
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">نسبة الإشغال</p>
              <p className="text-3xl font-black mt-1">{toArabicDigits(85)}%</p>
            </Card>
          </div>

          <div className="relative group max-w-xl">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="ابحث عن اسم العقار، الموقع، أو نوع الوحدة..." 
              className="pr-12 h-14 bg-secondary/30 border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 text-sm font-bold"
              dir="rtl"
            />
          </div>

          <Card className="rounded-[32px] border-none bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest px-8 h-14">اسم العقار والنوع</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">الموقع</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">الحالة التشغيلية</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">العائد الشهري</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest h-14">القيمة التقديرية</TableHead>
                  <TableHead className="w-[80px] h-14"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow key={prop.id} className="border-b border-muted/30 hover:bg-primary/[0.02] transition-colors group">
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4 justify-end">
                        <div className="flex flex-col text-right">
                          <span className="font-bold text-sm text-foreground">{prop.name}</span>
                          <span className="text-[10px] text-muted-foreground font-black uppercase">{prop.type === 'Commercial' ? 'تجاري' : prop.type === 'Residential' ? 'سكني' : 'صناعي'}</span>
                        </div>
                        <div className="h-10 w-10 bg-secondary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Building2 className="h-5 w-5" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end text-muted-foreground">
                        <span className="text-xs font-medium">{prop.location}</span>
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="secondary" 
                        className={`rounded-full px-4 py-1 text-[10px] font-black border-none ${
                          prop.status === "Occupied" ? "bg-emerald-100 text-emerald-700" : 
                          prop.status === "Vacant" ? "bg-secondary text-muted-foreground" : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {prop.status === "Occupied" ? "مؤجر بالكامل" : prop.status === "Vacant" ? "شاغر حالياً" : "تحت الصيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {prop.monthlyIncome > 0 ? (
                        <div className="flex items-center gap-1 justify-end">
                          <span className="font-black text-sm">{formatCurrencyValue(prop.monthlyIncome)}</span>
                          <SaudiRiyalIcon className="h-4 w-4 opacity-40" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-black text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <span className="font-black text-sm text-primary">{toArabicDigits((prop.value / 1000000).toFixed(1))} مليون</span>
                        <SaudiRiyalIcon className="h-4 w-4 opacity-40" />
                      </div>
                    </TableCell>
                    <TableCell className="px-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-secondary transition-all">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-[24px] p-2 border-none shadow-2xl">
                          <DropdownMenuItem className="flex justify-end gap-3 rounded-2xl py-3 text-xs font-bold" onClick={() => handleAction("عرض", prop.name)}>
                            <span>عرض بطاقة العقار</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-3 rounded-2xl py-3 text-xs font-bold" onClick={() => handleAction("تعديل", prop.name)}>
                            <span>تعديل السجل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-muted/50 my-1" />
                          <DropdownMenuItem className="flex justify-end gap-3 rounded-2xl py-3 text-xs font-bold text-destructive hover:bg-destructive/10" onClick={() => handleAction("حذف", prop.name)}>
                            <span>حذف من المنظومة</span>
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

import { Activity, Wallet } from "lucide-react";