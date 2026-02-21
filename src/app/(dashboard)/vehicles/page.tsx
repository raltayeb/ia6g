"use client";

import { useState } from "react";
import { Car, Plus, Search, MoreVertical, Fuel, Wrench, User, Edit, Trash2, Eye, Loader2, Filter } from "lucide-react";
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
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from "@/types/erp";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const vehicleSchema = z.object({
  plateNumber: z.string().min(1, "رقم اللوحة مطلوب"),
  model: z.string().min(2, "الموديل مطلوب"),
  type: z.enum(["Truck", "Sedan", "Van", "Bus"]),
  driverName: z.string().optional(),
  status: z.enum(["Active", "Maintenance", "Out of Service"]),
  purchaseValue: z.coerce.number().min(0, "القيمة لا يمكن أن تكون سالبة"),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

const mockVehicles: Vehicle[] = [
  { id: "1", plateNumber: "أ ب ج 1234", model: "تويوتا هايلكس 2023", type: "Truck", driverName: "أحمد علي", lastServiceDate: "2024-03-10", status: "Active", purchaseValue: 120000 },
  { id: "2", plateNumber: "د هـ و 5678", model: "هيونداي إلنترا 2022", type: "Sedan", driverName: "محمد خالد", lastServiceDate: "2024-02-15", status: "Maintenance", purchaseValue: 75000 },
  { id: "3", plateNumber: "ز ح ط 9012", model: "مرسيدس أكتروس", type: "Truck", driverName: "سعيد سالم", lastServiceDate: "2024-04-01", status: "Active", purchaseValue: 450000 },
  { id: "4", plateNumber: "ي ك ل 3456", model: "تويوتا هايس", type: "Van", driverName: "يوسف إبراهيم", lastServiceDate: "2023-12-20", status: "Out of Service", purchaseValue: 110000 },
  { id: "5", plateNumber: "م ن و 7890", model: "فورد F-150", type: "Truck", driverName: "فيصل أحمد", lastServiceDate: "2024-03-25", status: "Active", purchaseValue: 180000 },
];

export default function VehiclesPage() {
  const { toast } = useToast();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plateNumber: "",
      model: "",
      type: "Sedan",
      driverName: "",
      status: "Active",
      purchaseValue: 0,
    },
  });

  const onSubmit = (values: VehicleFormValues) => {
    setIsSubmitting(true);
    // محاكاة عملية الحفظ في قاعدة البيانات
    setTimeout(() => {
      console.log("Saving vehicle:", values);
      setIsSubmitting(false);
      setIsAddSheetOpen(false);
      form.reset();
      toast({
        title: "تم تسجيل المركبة",
        description: `تمت إضافة المركبة ذات اللوحة "${values.plateNumber}" إلى الأسطول بنجاح.`,
      });
    }, 1000);
  };

  const handleAction = (action: string, plate: string) => {
    toast({
      title: "إدارة الأسطول",
      description: `تم تنفيذ إجراء ${action} للمركبة ${plate}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">إدارة الأسطول</h1>
          </div>
          <Button 
            size="sm" 
            className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105 active:scale-95" 
            onClick={() => setIsAddSheetOpen(true)}
          >
            <Plus className="h-4 w-4" />
            إضافة مركبة
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي الوحدات</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <p className="text-xl font-medium text-right">{toArabicDigits(58)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">السائقين النشطين</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-emerald-600">
                <p className="text-xl font-medium text-right">{toArabicDigits(42)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">في الصيانة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-rose-600">
                <p className="text-xl font-medium text-right">{toArabicDigits(6)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">تكاليف الوقود</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="flex items-center gap-1 justify-start flex-row-reverse">
                  <span className="text-xl font-medium">{toArabicDigits(12.4)}ألف</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة أو السائق..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 rounded-full bg-white border-none h-10 px-4 text-xs font-medium shadow-sm">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>

          <div className="m3-table-container">
            <Table>
              <TableHeader className="m3-table-header">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-right font-medium py-4 px-6">رقم اللوحة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الموديل والنوع</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">السائق</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الحالة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">آخر صيانة</TableHead>
                  <TableHead className="w-[50px] py-4 px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow 
                    key={vehicle.id} 
                    className="m3-table-row cursor-pointer"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <TableCell className="text-right font-medium text-xs py-4 px-6">
                      {toArabicDigits(vehicle.plateNumber)}
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{vehicle.model}</span>
                        <span className="text-[9px] text-muted-foreground">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : 'فان'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-normal py-4 px-6">{vehicle.driverName || "غير محدد"}</TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <Badge 
                        variant="secondary"
                        className={`rounded-full px-3 py-0.5 text-[9px] font-medium border-none ${
                          vehicle.status === 'Active' ? "bg-emerald-50 text-emerald-700" : 
                          vehicle.status === 'Maintenance' ? "bg-amber-50 text-amber-700" : "bg-slate-50 text-slate-600"
                        }`}
                      >
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-[11px] text-muted-foreground font-normal py-4 px-6">{toArabicDigits(vehicle.lastServiceDate)}</TableCell>
                    <TableCell className="py-4 px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100">
                            <MoreVertical className="h-4 w-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-2xl p-1 border-none shadow-lg">
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-xs rounded-xl py-2 cursor-pointer" onClick={() => setSelectedVehicle(vehicle)}>
                            <span>عرض التفاصيل</span>
                            <Eye className="h-4 w-4 text-slate-400" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-xs rounded-xl py-2 cursor-pointer" onClick={() => handleAction("تعديل", vehicle.plateNumber)}>
                            <span>تعديل السجل</span>
                            <Edit className="h-4 w-4 text-slate-400" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-50" />
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-xs rounded-xl py-2 cursor-pointer text-rose-600" onClick={() => handleAction("شطب", vehicle.plateNumber)}>
                            <span>شطب المركبة</span>
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

        {/* نافذة إضافة مركبة جديدة */}
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8 w-full max-w-md sm:max-w-lg" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">إضافة مركبة للأسطول</SheetTitle>
              <SheetDescription className="text-xs">أدخل تفاصيل المركبة الجديدة لتحديث سجلات التشغيل</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="plateNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">رقم اللوحة</FormLabel>
                        <FormControl>
                          <Input placeholder="أ ب ج 1234" {...field} className="rounded-xl bg-slate-50 border-none h-11 text-center font-bold" />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">نوع المركبة</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs">
                              <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="Sedan" className="text-xs">سيدان</SelectItem>
                            <SelectItem value="Truck" className="text-xs">شاحنة</SelectItem>
                            <SelectItem value="Van" className="text-xs">فان / حافلة</SelectItem>
                            <SelectItem value="Bus" className="text-xs">حافلة كبيرة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">الموديل والمواصفات</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: تويوتا هايلكس 2024" {...field} className="rounded-xl bg-slate-50 border-none h-11" />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="driverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">السائق المعين</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="اسم السائق (اختياري)" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10" />
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="purchaseValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">قيمة الشراء</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="0" {...field} className="rounded-xl bg-slate-50 border-none h-11 pl-10" />
                            <SaudiRiyalIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">الحالة التشغيلية</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs">
                              <SelectValue placeholder="الحالة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="Active" className="text-xs">نشط</SelectItem>
                            <SelectItem value="Maintenance" className="text-xs">في الصيانة</SelectItem>
                            <SelectItem value="Out of Service" className="text-xs">خارج الخدمة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <SheetFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "تسجيل المركبة"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1 font-medium" onClick={() => setIsAddSheetOpen(false)}>
                    إلغاء
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>

        {/* نافذة عرض تفاصيل المركبة */}
        <Sheet open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل المركبة</SheetTitle>
              <SheetDescription className="text-xs">بيانات الأسطول والتشغيل</SheetDescription>
            </SheetHeader>
            {selectedVehicle && (
              <div className="space-y-6 text-right">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">رقم اللوحة</p>
                    <p className="text-sm font-medium">{toArabicDigits(selectedVehicle.plateNumber)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">الموديل</p>
                    <p className="text-sm font-medium">{selectedVehicle.model}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">السائق المعين</p>
                    <p className="text-sm font-medium">{selectedVehicle.driverName || "غير محدد"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">قيمة الشراء</p>
                      <div className="flex items-center gap-1 justify-start flex-row-reverse text-sm font-medium">
                        {formatCurrencyValue(selectedVehicle.purchaseValue)}
                        <SaudiRiyalIcon className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">تاريخ الصيانة</p>
                      <p className="text-sm font-medium">{toArabicDigits(selectedVehicle.lastServiceDate)}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedVehicle(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
