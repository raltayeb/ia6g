
"use client";

import { Settings, Shield, UserCog, Lock, Users, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const roles = [
  { name: "Super Admin", users: 2, access: "All Modules", level: "Full" },
  { name: "Fleet Manager", users: 3, access: "Vehicles, Maintenance", level: "Restricted" },
  { name: "Accountant", users: 4, access: "Finance, Zakat, Payroll", level: "Restricted" },
  { name: "Property Manager", users: 5, access: "Properties, Accommodations", level: "Restricted" },
];

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="font-headline text-xl font-bold text-primary">Administration & Roles</h1>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  User Role Management
                </CardTitle>
                <CardDescription>Define system-wide permissions and access levels.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.name}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell>
                          <Badge variant={role.level === "Full" ? "default" : "secondary"}>
                            {role.level}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full gap-2">
                  <UserCog className="h-4 w-4" />
                  Manage All Roles
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Security Policy
                </CardTitle>
                <CardDescription>Configure global security settings for Al-Salam ERP.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="font-bold">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for all administrative users.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="font-bold">Auto-Lock Session</Label>
                    <p className="text-xs text-muted-foreground">Log out users after 15 minutes of inactivity.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="font-bold">External API Access</Label>
                    <p className="text-xs text-muted-foreground">Allow 3rd party integrations (e.g. Supabase, GAZT).</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Active Sessions
              </CardTitle>
              <CardDescription>Monitoring real-time access to the ERP platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border p-4 bg-muted/20 flex flex-col gap-3">
                {[
                  { user: "Ahmed A.", location: "Riyadh Office", time: "Now", device: "Chrome / Windows" },
                  { user: "Khalid M.", location: "Mobile (Field)", time: "12m ago", device: "Safari / iOS" },
                  { user: "Sami F.", location: "Remote", time: "2h ago", device: "Edge / Windows" },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      <span className="font-bold">{session.user}</span>
                      <span className="text-muted-foreground">{session.location}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-xs text-muted-foreground">{session.device}</span>
                      <Badge variant="outline" className="text-[10px]">{session.time}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
