import { i as stringType, n as literalType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-C75n1QKL.js
var cnicRegex = /^\d{5}-\d{7}-\d{1}$|^\d{13}$/;
var phoneRegex = /^(\+92|0)?3\d{9}$/;
function normalizeCnic(v) {
	const digits = v.replace(/\D/g, "").slice(0, 13);
	if (digits.length <= 5) return digits;
	if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
	return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}
function normalizePhone(v) {
	let d = v.replace(/[^\d+]/g, "");
	if (d.startsWith("0")) d = "+92" + d.slice(1);
	else if (d.startsWith("92")) d = "+" + d;
	else if (d.startsWith("3")) d = "+92" + d;
	return d.slice(0, 13);
}
var patientSchema = objectType({
	full_name: stringType().trim().min(2, "Name is required").max(120),
	cnic: stringType().trim().regex(cnicRegex, "CNIC must be 13 digits (e.g. 35202-1234567-1)").optional().or(literalType("")),
	phone: stringType().trim().regex(phoneRegex, "Use a valid Pakistani mobile (e.g. +923001234567)").optional().or(literalType("")),
	gender: enumType([
		"male",
		"female",
		"other"
	]).optional(),
	date_of_birth: stringType().optional().or(literalType("")),
	blood_group: stringType().max(5).optional().or(literalType("")),
	address: stringType().max(500).optional().or(literalType("")),
	allergies: stringType().max(500).optional().or(literalType("")),
	summary: stringType().max(1e3).optional().or(literalType(""))
}).refine((d) => d.cnic || d.phone, {
	message: "Provide CNIC or phone",
	path: ["cnic"]
});
function calcAge(dob) {
	if (!dob) return null;
	const d = new Date(dob);
	if (isNaN(d.getTime())) return null;
	const diff = Date.now() - d.getTime();
	return Math.floor(diff / (1e3 * 60 * 60 * 24 * 365.25));
}
function initials(name) {
	return name.split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
//#endregion
export { patientSchema as a, normalizePhone as i, initials as n, normalizeCnic as r, calcAge as t };
