
"use client";

import { Wallet, Plus, Download, Search, Filter, ArrowUpRight, ArrowDownRight, FileText, TrendingUp } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "@/types/erp";

const mockTransactions: Transaction[] = [
  { id: "T1", date: "2024-05-01", description: "Monthly Rental - Plaza Unit 3", amount: 15000, type: "Income", category: "Property" },
  { id: "T2", date: "2024-05-02", description: "Fleet Fuel Expense - Bulk", amount: 4200, type: "Expense", category: "Fleet" },
  { id: "T3", date: "2024-05-03", description: "Worker Housing Maintenance", amount: 1200, type: "Expense", category: "HR" },
  { id: "T4", date: "2024-05-04", description: "Consultancy Fee - Legal", amount: 3500, type: "Expense", category: "Other" },
  { id: "T5", date: "2024-05-05", description: "Advance Payment - New Project", amount: 50000, type: "Income", category: "Other" },
];

export default function FinancePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">Financial Management</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Reports
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Total Balance</p>
                  <p className="text-2xl font-bold">SAR 2,450,000</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Monthly Income</p>
                  <p className="text-2xl font-bold text-emerald-600">+ SAR 85,200</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Monthly Expense</p>
                  <p className="text-2xl font-bold text-red-600">- SAR 32,400</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Net Profit</p>
                  <p className="text-2xl font-bold">SAR 52,800</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="invoices">Invoices & Billing</TabsTrigger>
              <TabsTrigger value="ledger">General Ledger</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search description or category..." className="pl-9" />
                </div>
                <Button variant="ghost" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="rounded-xl border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="text-sm">{tx.date}</TableCell>
                        <TableCell className="font-medium">{tx.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1.5 text-xs font-bold ${tx.type === "Income" ? "text-emerald-600" : "text-red-600"}`}>
                            {tx.type === "Income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {tx.type}
                          </div>
                        </TableCell>
                        <TableCell className={`text-right font-mono font-bold ${tx.type === "Income" ? "text-emerald-600" : "text-red-600"}`}>
                          {tx.type === "Income" ? "+" : "-"} SAR {tx.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Manage and track billing for tenants and clients.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">No Invoices Found</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px]">
                    You haven't generated any invoices for this month yet.
                  </p>
                  <Button className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Create First Invoice
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
