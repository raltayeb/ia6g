"use client";

import { useState } from "react";
import { Home, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye, Loader2, Building2, Users, Wallet } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accommodation } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const accommodationSchema = z.object({
  name: z.string().min(3, "اسم المبنى يجب أن يكون ٣ أحرف على الأقل"),
  capacity: z.coerce.number().min(1, "السعة يجب أن تكون أكبر من صفر"),
  location: z.string().min(5, "الموقع مطلوب بدقة"),
  monthlyCost: z.coerce.number().min(0, "التكلفة لا يمكن أن تكون سالبة"),
});

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

const mockAccommodations: Accommodation[] = [
  { id: "A1", name: "سكن موظفي السلام أ", capacity: 50, currentOccupants: 42, location: "الرياض، المنطقة الصناعية", monthlyCost: 25000 },
  { id: "A2", name: "أجنحة التنفيذيين شمال", capacity: 12, currentOccupants: 8, location: "الرياض، العليا", monthlyCost: 15000 },
  { id: "A3", name: "مجمع كامب العمال ب", capacity: 120, currentOccupants: 115, location: "جدة، طريق الميناء", monthlyCost: 45000 },
  { id: "A4", name: "سكن سائقي الأسطول", capacity: 30, currentOccupants: 12, location: "الدمام", monthlyCost: 8000 },
];

export default function AccommodationsPage() {
  const { toast } = useToast();
  const [selectedAcc, setSelectedAcc] = useState<Accommodation | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      location: "",
      monthlyCost: 0,
    },
  });

  const onSubmit = (values: AccommodationFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
      form.reset();
      toast({
        title: "تمت إضافة السكن",
        description: `تم تسجيل "${values.name}" بنجاح كجزء من أصول السكن.`,
      });
    }, 1000);
  };

  const handleAction = (action: string, name: string) => {
    toast({
      title: "إدارة السكن",
      description: `تم طلب إجراء "${action}" لـ ${name}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">إدارة السكن والإعاشة</h1>
          </div>
          <Button 
            size="sm" 
            className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105 active:scale-95" 
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            مبنى جديد
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي السعة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <div className="text-xl font-medium">{toArabicDigits(212)} وحدة</div>
                <div className="flex items-center gap-3 mt-3">
                  <Progress value={83} className="h-1 flex-1" />
                  <span className="text-[10px] font-medium text-primary">{toArabicDigits(83)}%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">التكلفة الشهرية</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <div className="flex items-center gap-1 justify-start">
                  <span className="text-xl font-medium">{formatCurrencyValue(93000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-60" />
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest">الوحدات الشاغرة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <div className="text-xl font-medium text-emerald-600">{toArabicDigits(35)} وحدة</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن السكن..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
            </div>
          </div>

          <div className="m3-table-container">
            <Table>
              <TableHeader className="m3-table-header">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-right font-medium py-4 px-6">المبنى / المجمع</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الموقع</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الإشغال</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الحالة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الإيجار</TableHead>
                  <TableHead className="w-[50px] py-4 px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccommodations.map((acc) => {
                  const occupancyRate = (acc.currentOccupants / acc.capacity) * 100;
                  return (
                    <TableRow 
                      key={acc.id} 
                      className="m3-table-row cursor-pointer"
                      onClick={() => setSelectedAcc(acc)}
                    >
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex items-center gap-3 justify-start text-right">
                          <div className="p-2 bg-emerald-50 rounded-xl shrink-0">
                            <Home className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="font-medium text-xs">{acc.name}</span>
                            <span className="text-[9px] text-muted-foreground font-mono">#{acc.id}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground justify-start text-right">
                          <MapPin className="h-3 w-3" />
                          {acc.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex flex-col gap-1 w-24">
                          <div className="flex justify-between text-[9px] font-medium">
                            <span>{toArabicDigits(acc.currentOccupants)}/{toArabicDigits(acc.capacity)}</span>
                            <span>{toArabicDigits(Math.round(occupancyRate))}%</span>
                          </div>
                          <Progress value={occupancyRate} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <Badge 
                          variant="secondary"
                          className={`rounded-full px-3 py-0.5 text-[9px] font-medium border-none ${occupancyRate >= 90 ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}
                        >
                          {occupancyRate >= 100 ? "مكتمل" : occupancyRate > 80 ? "شبه ممتلئ" : "متاح"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex items-center gap-1 font-medium justify-start text-xs text-right">
                          {formatCurrencyValue(acc.monthlyCost)}
                          <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-2xl border-none shadow-lg text-right">
                            <DropdownMenuItem className="flex justify-start gap-2 text-right text-xs" onClick={() => setSelectedAcc(acc)}>
                              <Eye className="h-4 w-4" />
                              <span>عرض التفاصيل</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-start gap-2 text-right text-xs" onClick={() => handleAction("تعديل", acc.name)}>
                              <Edit className="h-4 w-4" />
                              <span>تعديل</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex justify-start gap-2 text-right text-xs text-rose-600" onClick={() => handleAction("حذف", acc.name)}>
                              <Trash2 className="h-4 w-4" />
                              <span>حذف</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="rounded-[28px] border-none p-8 max-w-md w-[95%] sm:w-full" dir="rtl">
            <DialogHeader className="text-right mb-6">
              <DialogTitle className="text-lg font-medium text-primary">إضافة مبنى سكن جديد</DialogTitle>
              <DialogDescription className="text-xs">أدخل تفاصيل المبنى الجديد لتحديث سجلات الإسكان</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">اسم المبنى / المجمع</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="مثال: سكن السلام للموظفين - بلوك ب" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                          <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">الموقع الجغرافي</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="المدينة، الحي، الشارع..." {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">السعة القصوى (أفراد)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="0" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                            <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">التكلفة الشهرية</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="0" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                            <Wallet className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "حفظ المبنى"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1 font-medium" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Sheet open={!!selectedAcc} onOpenChange={() => setSelectedAcc(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل السكن</SheetTitle>
              <SheetDescription className="text-xs">بيانات السعة والإشغال والتكلفة</SheetDescription>
            </SheetHeader>
            {selectedAcc && (
              <div className="space-y-6 text-right">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">اسم المبنى</p>
                    <p className="text-sm font-medium">{selectedAcc.name}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">الموقع</p>
                    <p className="text-sm font-medium">{selectedAcc.location}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-right">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">السعة الكلية</p>
                      <p className="text-sm font-medium">{toArabicDigits(selectedAcc.capacity)} فرد</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-right">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">المشغول حالياً</p>
                      <p className="text-sm font-medium text-primary">{toArabicDigits(selectedAcc.currentOccupants)} فرد</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">التكلفة الشهرية</p>
                    <div className="flex items-center gap-1 justify-start font-medium text-sm">
                      {formatCurrencyValue(selectedAcc.monthlyCost)}
                      <SaudiRiyalIcon className="h-3 w-3 opacity-60" />
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedAcc(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
