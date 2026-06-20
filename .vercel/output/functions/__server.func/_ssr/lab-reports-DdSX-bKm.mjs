import { t as supabase } from "./client-Dwnyx5Ze.mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as FlaskConical, w as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-reports-DdSX-bKm.js
var import_jsx_runtime = require_jsx_runtime();
function LabReports() {
	const { data, isLoading } = useQuery({
		queryKey: ["all-labs"],
		queryFn: async () => {
			const { data, error } = await supabase.from("lab_reports").select("*, patient:patients(id,full_name)").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	const open = async (path) => {
		const { data, error } = await supabase.storage.from("patient-files").createSignedUrl(path, 600);
		if (error) return toast.error(error.message);
		window.open(data.signedUrl, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold md:text-3xl",
			children: "Laboratory Reports"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "All uploaded reports and medical images."
		})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading…"
		}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-dashed p-12 text-center text-sm text-muted-foreground",
			children: "No reports uploaded yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: data.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-shadow border-border/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate font-semibold",
								children: l.title
							}),
							l.patient && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/patients/$id",
								params: { id: l.patient.id },
								className: "text-xs text-primary hover:underline",
								children: l.patient.full_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: format(new Date(l.created_at), "PP")
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "mt-3 w-full",
					onClick: () => open(l.file_path),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-2 h-4 w-4" }), " Open file"]
				})]
			}, l.id))
		})]
	});
}
//#endregion
export { LabReports as component };
