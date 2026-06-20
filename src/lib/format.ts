import { z } from "zod";

export const cnicRegex = /^\d{5}-\d{7}-\d{1}$|^\d{13}$/;
export const phoneRegex = /^(\+92|0)?3\d{9}$/;

export function normalizeCnic(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

export function normalizePhone(v: string) {
  let d = v.replace(/[^\d+]/g, "");
  if (d.startsWith("0")) d = "+92" + d.slice(1);
  else if (d.startsWith("92")) d = "+" + d;
  else if (d.startsWith("3")) d = "+92" + d;
  return d.slice(0, 13);
}

export const patientSchema = z.object({
  full_name: z.string().trim().min(2, "Name is required").max(120),
  cnic: z.string().trim().regex(cnicRegex, "CNIC must be 13 digits (e.g. 35202-1234567-1)").optional().or(z.literal("")),
  phone: z.string().trim().regex(phoneRegex, "Use a valid Pakistani mobile (e.g. +923001234567)").optional().or(z.literal("")),
  gender: z.enum(["male", "female", "other"]).optional(),
  date_of_birth: z.string().optional().or(z.literal("")),
  blood_group: z.string().max(5).optional().or(z.literal("")),
  address: z.string().max(500).optional().or(z.literal("")),
  allergies: z.string().max(500).optional().or(z.literal("")),
  summary: z.string().max(1000).optional().or(z.literal("")),
}).refine((d) => d.cnic || d.phone, { message: "Provide CNIC or phone", path: ["cnic"] });

export function calcAge(dob?: string | null) {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export function initials(name: string) {
  return name.split(/\s+/).map(p => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
