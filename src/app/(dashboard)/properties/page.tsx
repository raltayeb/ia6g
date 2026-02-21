"use client";

import { Building2, Plus, Search, MapPin, MoreVertical } from "lucide-react";
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
import { Property } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";

const mockProperties: Property[] = [
  { id: "1", name: "ساحة السلام", type: "Commercial", location: "الرياض، العليا", status: "Occupied", monthlyIncome: 45000, value: 5500000 },
  { id: "2", name: "مجمع سكن العمال ب", type: "Residential", location: "جدة، المدينة الصناعية", status: "Occupied", monthlyIncome: 12000, value: 2100000 },
  { id: "3", name: "برج وردة الصحراء", type: "Residential", location: "الدمام، الكورنيش", status: "Maintenance", monthlyIncome: 0, value: 8900000 },
  { id: "4", name: "المستودع الشمالي", type: "Industrial", location: "الرياض، مخرج 18", status: "Vacant", monthlyIncome: 0, value: 3400000 },
  { id: "5", name: "الأجنحة التنفيذية", type: "Commercial", location: "الرياض، كافد", status: "Occupied", monthlyIncome: 75000, value: 12000000 },
];

export default function PropertiesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">إدارة العقارات</h1>
          </div>
          <Button className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" />
            إضافة عقار
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن عقارات..." className="pr-9 rounded-xl border-slate-200" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1 rounded-lg">الإجمالي: {toArabicDigits(mockProperties.length)}</Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 border-none rounded-lg flex gap-1">
                <span>الدخل النشط:</span>
                <span>{formatCurrencyValue(132000)}</span>
                <SaudiRiyalIcon className="h-3.5 w-3.5" />
              </Badge>
            </div>
          </div>

          <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[250px] text-right font-bold">اسم العقار</TableHead>
                  <TableHead className="text-right font-bold">النوع</TableHead>
                  <TableHead className="text-right font-bold">الموقع</TableHead>
                  <TableHead className="text-right font-bold">الحالة</TableHead>
                  <TableHead className="text-right font-bold">الدخل الشهري</TableHead>
                  <TableHead className="text-right font-bold">التقييم</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow key={prop.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-right">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        {prop.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {prop.type === 'Commercial' ? 'تجاري' : prop.type === 'Residential' ? 'سكني' : 'صناعي'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {prop.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={prop.status === "Occupied" ? "default" : prop.status === "Vacant" ? "secondary" : "destructive"}
                        className={`rounded-lg ${prop.status === "Occupied" ? "bg-emerald-500 hover:bg-emerald-600 border-none" : ""}`}
                      >
                        {prop.status === "Occupied" ? "مؤجر" : prop.status === "Vacant" ? "شاغر" : "صيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {prop.monthlyIncome > 0 ? (
                        <div className="flex items-center gap-1 font-mono font-bold justify-end">
                          {formatCurrencyValue(prop.monthlyIncome)}
                          <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                        </div>
                      ) : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-mono text-muted-foreground justify-end">
                        {toArabicDigits((prop.value / 1000000).toFixed(1))} مليون
                        <SaudiRiyalIcon className="h-4 w-4 opacity-50" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="rounded-lg">
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
