"use client";

import { useState } from "react";
import { Building2, Plus, Search, MapPin, MoreVertical, Edit, Trash2, Eye, Filter, Loader2 } from "lucide-react";
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
import { Property } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const propertySchema = z.object({
  name: z.string().min(3, "اسم العقار يجب أن يكون أكثر من ٣ أحرف"),
  type: z.enum(["Residential", "Commercial", "Industrial", "Land"]),
  location: z.string().min(5, "يرجى تحديد الموقع بدقة"),
  status: z.enum(["Occupied", "Vacant", "Maintenance"]),
  monthlyIncome: z.coerce.number().min(0, "الدخل لا يمكن أن يكون سالباً"),
  value: z.coerce.number().min(1000, "القيمة الإجمالية غير منطقية"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const mockProperties: Property[] = [
  { id: "1", name: "ساحة السلام التجارية", type: "Commercial", location: "الرياض، العليا", status: "Occupied", monthlyIncome: 45000, value: 5500000 },
  { id: "2", name: "مجمع سكن العمال ب", type: "Residential", location: "جدة، المدينة الصناعية", status: "Occupied", monthlyIncome: 12000, value: 2100000 },
  { id: "3", name: "برج وردة الصحراء", type: "Residential", location: "الدمام، الكورنيش", status: "Maintenance", monthlyIncome: 0, value: 8900000 },
  { id: "4", name: "المستودع اللوجستي الشمالي", type: "Industrial", location: "الرياض، مخرج 18", status: "Vacant", monthlyIncome: 0, value: 3400000 },
  { id: "5", name: "الأجنحة التنفيذية المركزية", type: "Commercial", location: "الرياض، كافد", status: "Occupied", monthlyIncome: 75000, value: 12000000 },
];

export default function PropertiesPage() {
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      type: "Residential",
      location: "",
      status: "Vacant",
      monthlyIncome: 0,
      value: 0,
    },
  });

  const onSubmit = (values: PropertyFormValues) => {
    setIsSubmitting(true);
    // محاكاة عملية الحفظ في قاعدة البيانات
    setTimeout(() => {
      console.log("Saving property:", values);
      setIsSubmitting(false);
      setIsAddSheetOpen(false);
      form.reset();
      toast({
        title: "تمت إضافة العقار",
        description: `تم تسجيل "${values.name}" في النظام بنجاح.`,
      });
    }, 1000);
  };

  const handleAction = (action: string, name: string) => {
    toast({
      title: "إدارة العقارات",
      description: `تم اختيار ${action} لعقار ${name}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">إدارة العقارات</h1>
          </div>
          <Button 
            size="sm" 
            className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105 active:scale-95" 
            onClick={() => setIsAddSheetOpen(true)}
          >
            <Plus className="h-4 w-4" />
            إضافة عقار
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي الوحدات</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-xl font-medium text-right">{toArabicDigits(mockProperties.length)} عقارات</div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">العائد الشهري</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="flex items-center gap-1 justify-start flex-row-reverse">
                  <span className="text-xl font-medium">{formatCurrencyValue(132000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">نسبة الإشغال</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="text-xl font-medium text-emerald-600 text-right">{toArabicDigits(85)}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن عقار..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
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
                  <TableHead className="text-right font-medium py-4 px-6">العقار والنوع</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الموقع</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الحالة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الدخل الشهري</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((prop) => (
                  <TableRow 
                    key={prop.id} 
                    className="m3-table-row cursor-pointer"
                    onClick={() => setSelectedProperty(prop)}
                  >
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-xs">{prop.name}</span>
                        <span className="text-[9px] text-muted-foreground">
                          {prop.type === 'Commercial' ? 'تجاري' : prop.type === 'Residential' ? 'سكني' : prop.type === 'Industrial' ? 'صناعي' : 'أرض'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground justify-start flex-row-reverse">
                        {prop.location}
                        <MapPin className="h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <Badge 
                        variant="secondary" 
                        className={`rounded-full px-3 py-0.5 text-[9px] font-medium border-none ${
                          prop.status === "Occupied" ? "bg-emerald-50 text-emerald-700" : 
                          prop.status === "Vacant" ? "bg-slate-50 text-slate-600" : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {prop.status === "Occupied" ? "مؤجر" : prop.status === "Vacant" ? "شاغر" : "صيانة"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex items-center gap-1 font-medium justify-start flex-row-reverse text-xs">
                        {formatCurrencyValue(prop.monthlyIncome)}
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
                        <DropdownMenuContent align="end" className="w-40 rounded-2xl border-none shadow-lg">
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => setSelectedProperty(prop)}>
                            <span>عرض التفاصيل</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => handleAction("تعديل", prop.name)}>
                            <span>تعديل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs text-rose-600" onClick={() => handleAction("حذف", prop.name)}>
                            <span>حذف</span>
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

        {/* نافذة إضافة عقار جديد */}
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8 w-full max-w-md sm:max-w-lg" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">إضافة عقار جديد</SheetTitle>
              <SheetDescription className="text-xs">يرجى إدخال بيانات العقار بدقة لتحديث المحفظة العقارية</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">اسم العقار</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: برج السلام المكتبي" {...field} className="rounded-xl bg-slate-50 border-none h-11" />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">نوع العقار</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs">
                              <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="Residential" className="text-xs">سكني</SelectItem>
                            <SelectItem value="Commercial" className="text-xs">تجاري</SelectItem>
                            <SelectItem value="Industrial" className="text-xs">صناعي</SelectItem>
                            <SelectItem value="Land" className="text-xs">أرض</SelectItem>
                          </SelectContent>
                        </Select>
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
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="Vacant" className="text-xs">شاغر</SelectItem>
                            <SelectItem value="Occupied" className="text-xs">مؤجر</SelectItem>
                            <SelectItem value="Maintenance" className="text-xs">صيانة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">الموقع الجغرافي</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="المدينة، الحي، الشارع..." {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10" />
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
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">القيمة الإجمالية</FormLabel>
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
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">الدخل الشهري المتوقع</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="0" {...field} className="rounded-xl bg-slate-50 border-none h-11 pl-10" />
                            <SaudiRiyalIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <SheetFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "حفظ العقار"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1 font-medium" onClick={() => setIsAddSheetOpen(false)}>
                    إلغاء
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>

        {/* نافذة عرض تفاصيل العقار */}
        <Sheet open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل العقار</SheetTitle>
              <SheetDescription className="text-xs">معلومات السجل والبيانات المالية</SheetDescription>
            </SheetHeader>
            {selectedProperty && (
              <div className="space-y-6 text-right">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">اسم العقار</p>
                    <p className="text-sm font-medium">{selectedProperty.name}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">الموقع</p>
                    <p className="text-sm font-medium">{selectedProperty.location}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">القيمة الإجمالية</p>
                      <div className="flex items-center gap-1 justify-start flex-row-reverse text-sm font-medium">
                        {formatCurrencyValue(selectedProperty.value)}
                        <SaudiRiyalIcon className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">الحالة</p>
                      <Badge className="rounded-full bg-emerald-50 text-emerald-700 border-none mt-1">{selectedProperty.status}</Badge>
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedProperty(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
