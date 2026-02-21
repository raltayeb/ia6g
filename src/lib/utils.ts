import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * تحويل الأرقام إلى الأرقام العربية الشرقية (٠١٢٣٤٥٦٧٨٩)
 */
export function toArabicDigits(num: string | number | undefined): string {
  if (num === undefined || num === null) return "";
  const str = num.toString();
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (d) => arabicDigits[parseInt(d)]);
}

/**
 * تنسيق العملة بالريال السعودي مع الأرقام العربية
 */
export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined) return toArabicDigits(0) + " ر.س";
  return toArabicDigits(amount.toLocaleString('en-US')) + " ر.س";
}

/**
 * تحويل التاريخ إلى التاريخ الهجري بصيغة عربية
 */
export function toHijriDate(dateStr?: string | Date): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-uma-nu-arab', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
