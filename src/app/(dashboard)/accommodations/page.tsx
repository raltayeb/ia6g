
import { Home, Plus, Search, MapPin, Users, DollarSign, MoreVertical } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accommodation } from "@/types/erp";

const mockAccommodations: Accommodation[] = [
  { id: "A1", name: "سكن موظفي السلام أ", capacity: 50, currentOccupants: 42, location: "الرياض، المنطقة الصناعية", monthlyCost: 25000 },
  { id: "A2", name: "أجنحة التنفيذيين شمال", capacity: 12, currentOccupants: 8, location: "الرياض، العليا", monthlyCost: 15000 },
  { id: "A3", name: "مجمع كامب العمال ب", capacity: 120, currentOccupants: 115, location: "جدة، طريق الميناء", monthlyCost: 45000 },
  { id: "A4", name: "سكن سائقي الأسطول", capacity: 30, currentOccupants: 12, location: "الدمام", monthlyCost: 8000 },
];

export default function AccommodationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">إدارة السكن</h1>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            مبنى جديد
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">إجمالي السعة</<<<<<<< CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">212 وحدة</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={83} className="h-2" />
                  <span className="text-xs font-medium">83% مشغول</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">التكلفة الشهرية الإجمالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">93,000 ر.س</div>
                <p className="text-xs text-muted-foreground mt-1">بمتوسط 438 ر.س لكل ساكن</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">الوحدات الشاغرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">35 وحدة</div>
                <p className="text-xs text-muted-foreground mt-1">جاهزة للتسكين الفوري</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن السكن..." className="pr-9" />
            </div>
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px] text-right">المبنى / المجمع</TableHead>
                  <TableHead className="text-right">الموقع</TableHead>
                  <TableHead className="text-right">نسبة الإشغال</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-left">الإيجار الشهري</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccommodations.map((acc) => {
                  const occupancyRate = (acc.currentOccupants / acc.capacity) * 100;
                  return (
                    <TableRow key={acc.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Home className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span>{acc.name}</span>
                            <span className="text-xs text-muted-foreground">{acc.id}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {acc.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1.5 w-full max-w-[120px]">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>{acc.currentOccupants}/{acc.capacity}</span>
                            <span>{Math.round(occupancyRate)}%</span>
                          </div>
                          <Progress 
                            value={occupancyRate} 
                            className={`h-1.5 ${occupancyRate > 90 ? 'bg-red-100' : ''}`} 
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={occupancyRate >= 100 ? "destructive" : occupancyRate > 80 ? "secondary" : "default"}
                          className={occupancyRate < 80 ? "bg-emerald-500" : ""}
                        >
                          {occupancyRate >= 100 ? "مكتمل" : occupancyRate > 80 ? "شبه ممتلئ" : "متاح"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-left font-mono text-sm">
                        {acc.monthlyCost.toLocaleString()} ر.س
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
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
