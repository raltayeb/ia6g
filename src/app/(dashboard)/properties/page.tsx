"use client";

import { Building2, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye, ClipboardList } from "lucide-react";
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
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="font-headline text-lg font-bold text-primary">إدارة العقارات</h1>
          </div>
          <Button className="gap-2 rounded-xl shadow-sm" onClick={() => handleAction("إضافة", "جديد")}>
            <Plus className="h-4 w-4" />
            إضافة عقار
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن عقارات..." className="pr-9 rounded-xl border-slate-200 text-right bg-white/80" dir="rtl" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 text-[10px] font-bold bg-white">الإجمالي: {toArabicDigits(mockProperties.length)}</Badge>
              <Badge variant="secondary" className="px-3 flex gap-1 items-center bg-emerald-50 text-emerald-700 border-none text-[10px] font-bold">
                <span>الدخل النشط:</span>
                <span>{formatCurrencyValue(132000)}</span>
                <SaudiRiyalIcon className="h-3 w-3" />
              </Badge>
            </div>
          </div>

          <div className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="text-right font-bold text-xs">اسم العقار</TableHead>
                  <TableHead className="text-right font-bold text-xs">النوع</TableHead>
                  <TableHead className="text-right font-bold text-xs">الموقع</TableHead>
                  <TableHead className="text-right font-bold text-xs">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-xs">الدخل الشهري</TableHead>
                  <TableHead className="text-right font-bold text-xs">التقييم</TableHead>
                  <TableHead className="w-[80px] text-center font-bold text-xs">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow key={prop.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                    <TableCell className="font-bold text-[13px] text-right">{prop.name}</TableCell>
                    <TableCell className="text-right text-xs">
                      {prop.type === 'Commercial' ? 'تجاري' : prop.type === 'Residential' ? 'سكني' : 'صناعي'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 text-muted-foreground justify-end text-[10px] font-medium">
                        {prop.location}
                        <MapPin className="h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={prop.status === "Occupied" ? "default" : prop.status === "Vacant" ? "secondary" : "destructive"} className="text-[9px] font-bold px-2 py-0 rounded-lg">
                        {prop.status === "Occupied" ? "مؤجر" : prop.status === "Vacant" ? "شاغر" : "صيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {prop.monthlyIncome > 0 ? (
                        <div className="flex items-center gap-1 font-black justify-end text-xs">
                          {formatCurrencyValue(prop.monthlyIncome)}
                          <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-70" />
                        </div>
                      ) : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 text-muted-foreground justify-end text-[10px] font-black">
                        {toArabicDigits((prop.value / 1000000).toFixed(1))} مليون
                        <SaudiRiyalIcon className="h-3 w-3" />
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
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs py-2" onClick={() => handleAction("عرض", prop.name)}>
                            <span>عرض البطاقة</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs py-2" onClick={() => handleAction("تعديل", prop.name)}>
                            <span>تعديل العقار</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs py-2 text-rose-600" onClick={() => handleAction("حذف", prop.name)}>
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
