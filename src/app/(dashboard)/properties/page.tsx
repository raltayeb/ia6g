"use client";

import { Building2, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
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
  { id: "1", name: "ساحة السلام", type: "Commercial", location: "الرياض، العليا", status: "Occupied", monthlyIncome: 45000, value: 5500000 },
  { id: "2", name: "مجمع سكن العمال ب", type: "Residential", location: "جدة، المدينة الصناعية", status: "Occupied", monthlyIncome: 12000, value: 2100000 },
  { id: "3", name: "برج وردة الصحراء", type: "Residential", location: "الدمام، الكورنيش", status: "Maintenance", monthlyIncome: 0, value: 8900000 },
  { id: "4", name: "المستودع الشمالي", type: "Industrial", location: "الرياض، مخرج 18", status: "Vacant", monthlyIncome: 0, value: 3400000 },
  { id: "5", name: "الأجنحة التنفيذية", type: "Commercial", location: "الرياض، كافد", status: "Occupied", monthlyIncome: 75000, value: 12000000 },
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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background/95 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm font-bold tracking-tight">إدارة العقارات</h1>
          </div>
          <Button size="sm" className="gap-2 h-8 font-bold" onClick={() => handleAction("إضافة", "جديد")}>
            <Plus className="h-3.5 w-3.5" />
            إضافة عقار
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-xl shadow-none border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">إجمالي العقارات</p>
                  <p className="text-xl font-black">{toArabicDigits(mockProperties.length)}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-none border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">الدخل الشهري</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-emerald-600">{formatCurrencyValue(132000)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-emerald-600 opacity-70" />
                  </div>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Wallet className="h-4 w-4 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-none border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">نسبة الإشغال</p>
                  <p className="text-xl font-black text-blue-600">{toArabicDigits(85)}%</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن عقارات..." className="pr-10 h-9 rounded-lg text-xs" dir="rtl" />
            </div>
          </div>

          <Card className="rounded-xl border shadow-none overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">اسم العقار</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">النوع</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الموقع</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الدخل</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">التقييم</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow key={prop.id} className="hover:bg-muted/30">
                    <TableCell className="font-bold text-xs text-right">{prop.name}</TableCell>
                    <TableCell className="text-right text-[11px] font-medium text-muted-foreground">
                      {prop.type === 'Commercial' ? 'تجاري' : prop.type === 'Residential' ? 'سكني' : 'صناعي'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1.5 justify-end text-[10px] text-muted-foreground">
                        {prop.location}
                        <MapPin className="h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={prop.status === "Occupied" ? "default" : prop.status === "Vacant" ? "secondary" : "destructive"} className="text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {prop.status === "Occupied" ? "مؤجر" : prop.status === "Vacant" ? "شاغر" : "صيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-black text-xs">
                      {prop.monthlyIncome > 0 ? (
                        <div className="flex items-center gap-1 justify-end">
                          {formatCurrencyValue(prop.monthlyIncome)}
                          <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                        </div>
                      ) : "-"}
                    </TableCell>
                    <TableCell className="text-right text-[10px] font-black text-muted-foreground">
                      <div className="flex items-center gap-1 justify-end">
                        {toArabicDigits((prop.value / 1000000).toFixed(1))} مليون
                        <SaudiRiyalIcon className="h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("عرض", prop.name)}>
                            <span>عرض البطاقة</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("تعديل", prop.name)}>
                            <span>تعديل السجل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-rose-600" onClick={() => handleAction("حذف", prop.name)}>
                            <span>حذف العقار</span>
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

import { Wallet, Activity } from "lucide-react";
