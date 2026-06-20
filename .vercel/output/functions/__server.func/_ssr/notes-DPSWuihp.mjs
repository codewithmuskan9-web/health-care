import { t as supabase } from "./client-Dwnyx5Ze.mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes-DPSWuihp.js
var import_jsx_runtime = require_jsx_runtime();
function NotesPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["all-notes"],
		queryFn: async () => {
			const { data, error } = await supabase.from("visits").select("id,visit_date,doctor_notes,diagnosis,patient:patients(id,full_name)").not("doctor_notes", "is", null).neq("doctor_notes", "").order("visit_date", { ascending: false }).limit(100);
			if (error) throw error;
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold md:text-3xl",
			children: "Doctor Notes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Clinical notes from every appointment."
		})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading…"
		}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-dashed p-12 text-center text-sm text-muted-foreground",
			children: "No notes yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: data.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-shadow border-border/60 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(new Date(v.visit_date), "PPpp") }), v.diagnosis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: v.diagnosis
						})]
					}),
					v.patient && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/patients/$id",
						params: { id: v.patient.id },
						className: "mt-1 block font-display font-semibold hover:text-primary",
						children: v.patient.full_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap text-sm",
						children: v.doctor_notes
					})
				]
			}, v.id))
		})]
	});
}
//#endregion
export { NotesPage as component };
