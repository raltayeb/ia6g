
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
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">إدارة العقارات</h1>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة عقار
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن عقارات..." className="pr-9" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">الإجمالي: {mockProperties.length}</Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-emerald-100 text-emerald-800 border-none">الدخل النشط: 132,000 ر.س</Badge>
            </div>
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">اسم العقار</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الدخل الشهري</TableHead>
                  <TableHead className="text-left">التقييم</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow key={prop.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        {prop.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      {prop.type === 'Commercial' ? 'تجاري' : prop.type === 'Residential' ? 'سكني' : 'صناعي'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {prop.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={prop.status === "Occupied" ? "default" : prop.status === "Vacant" ? "secondary" : "destructive"}
                        className={prop.status === "Occupied" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                      >
                        {prop.status === "Occupied" ? "مؤجر" : prop.status === "Vacant" ? "شاغر" : "صيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left font-mono">
                      {prop.monthlyIncome > 0 ? `${prop.monthlyIncome.toLocaleString()} ر.س` : "-"}
                    </TableCell>
                    <TableCell className="text-left font-mono text-muted-foreground">
                      {(prop.value / 1000000).toFixed(1)} مليون ر.س
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
