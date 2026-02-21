
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
  { id: "A1", name: "Al-Salam Staff Housing A", capacity: 50, currentOccupants: 42, location: "Riyadh, Industrial Area", monthlyCost: 25000 },
  { id: "A2", name: "Executive Suites North", capacity: 12, currentOccupants: 8, location: "Riyadh, Olaya", monthlyCost: 15000 },
  { id: "A3", name: "Worker Camp Complex B", capacity: 120, currentOccupants: 115, location: "Jeddah, Port Road", monthlyCost: 45000 },
  { id: "A4", name: "Fleet Drivers Dormitory", capacity: 30, currentOccupants: 12, location: "Dammam", monthlyCost: 8000 },
];

export default function AccommodationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">Accommodation Management</h1>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Building
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">212 Units</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={83} className="h-2" />
                  <span className="text-xs font-medium">83% Occupied</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Monthly Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">SAR 93,000</div>
                <p className="text-xs text-muted-foreground mt-1">Average SAR 438 per occupant</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Vacant Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">35 Units</div>
                <p className="text-xs text-muted-foreground mt-1">Ready for immediate move-in</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search accommodations..." className="pl-9" />
            </div>
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Building / Complex</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Monthly Rent</TableHead>
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
                          {occupancyRate >= 100 ? "Full" : occupancyRate > 80 ? "Near Capacity" : "Available"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        SAR {acc.monthlyCost.toLocaleString()}
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
