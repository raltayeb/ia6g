"use client";

import { 
  Building2, 
  Car, 
  Users, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const financialData = [
  { month: "Jan", revenue: 45000, expense: 32000 },
  { month: "Feb", revenue: 52000, expense: 31000 },
  { month: "Mar", revenue: 48000, expense: 35000 },
  { month: "Apr", revenue: 61000, expense: 38000 },
  { month: "May", revenue: 55000, expense: 42000 },
  { month: "Jun", revenue: 67000, expense: 40000 },
];

const stats = [
  { title: "Total Properties", value: "24", icon: Building2, trend: "+2", color: "text-blue-600" },
  { title: "Fleet Size", value: "58", icon: Car, trend: "+5", color: "text-green-600" },
  { title: "Total Workforce", value: "142", icon: Users, trend: "+12", color: "text-purple-600" },
  { title: "Monthly Revenue", value: "SAR 1.2M", icon: DollarSign, trend: "+12.5%", color: "text-emerald-600" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="font-headline text-xl font-bold text-primary">Al-Salam Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-600 font-medium inline-flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </span>{" "}
                    vs last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Financial Trend */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Monthly revenue vs expenses (SAR)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `SAR ${value/1000}k`} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                                    <span className="font-bold text-emerald-600">{payload[0].value}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Expense</span>
                                    <span className="font-bold text-red-600">{payload[1].value}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>Latest events from modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { title: "New Lease Agreement", sub: "Building A - Unit 402", time: "2h ago", type: "property" },
                    { title: "Vehicle Service Completed", sub: "Truck #42 (Volvo FH)", time: "5h ago", type: "vehicle" },
                    { title: "New Employee Onboarded", sub: "Ahmed Khalid - Fleet Manager", time: "Yesterday", type: "hr" },
                    { title: "Zakat Payment Processed", sub: "Q2 2024 Filing", time: "2 days ago", type: "finance" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
