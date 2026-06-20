import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Dwnyx5Ze.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as IdCard, i as UserPlus, m as Phone, u as Search } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as initials, t as calcAge } from "./format-C75n1QKL.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as format } from "../_libs/date-fns.mjs";
import { t as Route } from "./patients.index-CWN73wC8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patients.index-Dsm1Yjqa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function usePatients(q) {
	return useQuery({
		queryKey: ["patients", q],
		queryFn: async () => {
			let query = supabase.from("patients").select("*").order("created_at", { ascending: false }).limit(100);
			if (q.trim()) {
				const term = `%${q.trim()}%`;
				query = query.or(`full_name.ilike.${term},cnic.ilike.${term},phone.ilike.${term}`);
			}
			const { data, error } = await query;
			if (error) throw error;
			return data ?? [];
		}
	});
}
function PatientsList() {
	const { q: initialQ } = Route.useSearch();
	const [q, setQ] = (0, import_react.useState)(initialQ ?? "");
	const { data, isLoading } = usePatients(q);
	const patients = (0, import_react.useMemo)(() => data ?? [], [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold md:text-3xl",
					children: "Patient Records"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						patients.length,
						" ",
						patients.length === 1 ? "patient" : "patients",
						" shown"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/patients/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2 h-4 w-4" }), " Add patient"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "card-shadow border-border/60 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search by name, CNIC, or mobile…",
						className: "h-11 pl-9"
					})]
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { className: "h-40 animate-pulse border-border/60 bg-muted/40" }, i))
			}) : patients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-shadow border-dashed p-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "No patients found. Try a different search or add a new patient."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/patients/new",
						children: "Add patient"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: patients.map((p) => {
					const age = calcAge(p.date_of_birth);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/patients/$id",
						params: { id: p.id },
						className: "group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "card-shadow h-full border-border/60 p-5 transition hover:border-primary/40 hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl med-gradient text-base font-bold text-white",
										children: initials(p.full_name)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "truncate font-semibold group-hover:text-primary",
												children: p.full_name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground",
												children: [
													age !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [age, " yr"] }),
													p.gender && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "capitalize",
														children: p.gender
													})] }),
													p.blood_group && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "ml-auto h-5 px-1.5 text-[10px]",
														children: p.blood_group
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 space-y-1 text-xs",
												children: [p.cnic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdCard, { className: "h-3 w-3" }), p.cnic]
												}), p.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), p.phone]
												})]
											})
										]
									})]
								}),
								p.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 line-clamp-2 text-xs text-muted-foreground",
									children: p.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 text-[11px] text-muted-foreground",
									children: ["Registered ", format(new Date(p.created_at), "PP")]
								})
							]
						})
					}, p.id);
				})
			})
		]
	});
}
//#endregion
export { PatientsList as component };
