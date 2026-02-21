"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في نظام شركة طارق الجعفرى لإدارة الموارد.",
      });
      router.push("/overview");
    }, 1500);
  };

  return (
    <div className="min-h-svh flex items-center justify-center bg-[#F8F9FA] p-6 font-sans" dir="rtl">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-emerald-50 text-primary shadow-sm">
            <Building2 className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">شركة طارق الجعفرى</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium opacity-70">
              نظام إدارة الموارد المتكامل ERP
            </p>
          </div>
        </div>

        <Card className="rounded-[32px] border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="pt-8 px-8 pb-4 text-right">
            <CardTitle className="text-lg font-medium">تسجيل الدخول</CardTitle>
            <CardDescription className="text-xs">أدخل بياناتك للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <CardContent className="px-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium pr-1">البريد الإلكتروني</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="rounded-2xl bg-slate-50 border-none h-12 pr-11 text-right"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="password" global-font-medium className="text-xs font-medium">كلمة المرور</Label>
                  <Button variant="link" className="text-[10px] h-auto p-0 text-primary opacity-80">نسيت كلمة المرور؟</Button>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="rounded-2xl bg-slate-50 border-none h-12 pr-11 text-right font-mono"
                    required
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-full h-12 mt-4 font-medium shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "دخول"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pb-8 px-8 pt-6 flex justify-center border-t border-slate-50 mt-4">
            <p className="text-[10px] text-muted-foreground">
              ليس لديك حساب؟ <Button variant="link" className="text-[10px] h-auto p-0 text-primary font-medium">اتصل بمدير النظام</Button>
            </p>
          </CardFooter>
        </Card>

        <div className="text-center">
          <p className="text-[9px] text-muted-foreground opacity-50">
            &copy; {new Date().getFullYear()} شركة طارق الجعفرى. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
}
