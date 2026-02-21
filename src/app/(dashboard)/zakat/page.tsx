"use client";

import { useState } from "react";
import { ShieldCheck, Download, Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function ZakatPage() {
  const [year, setYear] = useState("2024");
  
  // Simulated data for demonstration
  const zakatAssets = {
    realEstate: 35000000,
    fleet: 12000000,
    cash: 8500000,
    accountsReceivable: 4200000
  };

  const totalWealth = Object.values(zakatAssets).reduce((a, b) => a + b, 0);
  const zakatAmount = totalWealth * 0.025;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">Zakat & Tax Reporting</h1>
          </div>
          <div className="flex gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">Hijri 1445</SelectItem>
                <SelectItem value="2023">Hijri 1444</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export GAZT Report
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          <Alert className="bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold">GAZT Compliance Notice</AlertTitle>
            <AlertDescription className="text-primary/80">
              The calculations below are based on the standard 2.5% Zakat rate for net wealth as per ZATCA (Saudi Zakat, Tax and Customs Authority) guidelines.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Asset Valuation Summary
                </CardTitle>
                <CardDescription>Breakdown of assets subject to Zakat for the current period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { label: "Owned Real Estate Portfolio", value: zakatAssets.realEstate, percentage: 60 },
                    { label: "Fleet & Heavy Equipment", value: zakatAssets.fleet, percentage: 20 },
                    { label: "Liquidity (Bank Balances)", value: zakatAssets.cash, percentage: 15 },
                    { label: "Outstanding Invoices (Receivables)", value: zakatAssets.accountsReceivable, percentage: 5 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-mono">SAR {item.value.toLocaleString()}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t flex justify-between items-end">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Zakatable Wealth</p>
                    <p className="text-3xl font-bold">SAR {totalWealth.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider">Net Zakat Due (2.5%)</p>
                    <p className="text-3xl font-bold text-emerald-600">SAR {zakatAmount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    Filing Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className="text-xs uppercase opacity-70">Current Phase</p>
                    <p className="text-lg font-bold">Data Reconciliation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-sm">Pending External Audit</span>
                  </div>
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold mt-2">
                    Submit Filing
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Zakat History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { year: "1444 H", amount: "SAR 1,240,000", status: "Paid" },
                    { year: "1443 H", amount: "SAR 1,180,000", status: "Paid" },
                  ].map((h) => (
                    <div key={h.year} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{h.year}</p>
                        <p className="text-xs text-muted-foreground">{h.amount}</p>
                      </div>
                      <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200">
                        {h.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
