import { t as supabase } from "./client-Dwnyx5Ze.mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as FileText, M as CalendarCheck, P as Activity, S as FlaskConical, i as UserPlus, n as Users } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as initials } from "./format-C75n1QKL.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as format, r as startOfDay, t as subDays } from "../_libs/date-fns.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Dx9WjNBz.js
var import_jsx_runtime = require_jsx_runtime();
function useDashboard() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const since = subDays(/* @__PURE__ */ new Date(), 30).toISOString();
			const [patientsAll, patientsRecent, visitsAll, visitsRecent, prescriptions, labs, recentPatients, recentVisits] = await Promise.all([
				supabase.from("patients").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("patients").select("id", {
					count: "exact",
					head: true
				}).gte("created_at", since),
				supabase.from("visits").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("visits").select("visit_date").gte("visit_date", since),
				supabase.from("prescriptions").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("lab_reports").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("patients").select("id,full_name,cnic,phone,photo_url,created_at").order("created_at", { ascending: false }).limit(5),
				supabase.from("visits").select("id,visit_date,chief_complaint,diagnosis,patient:patients(id,full_name,photo_url)").order("visit_date", { ascending: false }).limit(6)
			]);
			const byDay = /* @__PURE__ */ new Map();
			for (let i = 13; i >= 0; i--) {
				const d = format(subDays(/* @__PURE__ */ new Date(), i), "MMM d");
				byDay.set(d, 0);
			}
			(visitsRecent.data ?? []).forEach((v) => {
				const k = format(startOfDay(new Date(v.visit_date)), "MMM d");
				if (byDay.has(k)) byDay.set(k, (byDay.get(k) ?? 0) + 1);
			});
			const chart = Array.from(byDay, ([day, visits]) => ({
				day,
				visits
			}));
			return {
				patientsCount: patientsAll.count ?? 0,
				patientsNew30: patientsRecent.count ?? 0,
				visitsCount: visitsAll.count ?? 0,
				rxCount: prescriptions.count ?? 0,
				labsCount: labs.count ?? 0,
				chart,
				recentPatients: recentPatients.data ?? [],
				recentVisits: recentVisits.data ?? []
			};
		}
	});
}
function Stat({ label, value, sub, Icon, tone = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "card-shadow border-border/60 p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 font-display text-3xl font-bold tabular-nums",
					children: value
				}),
				sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: sub
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${{
					primary: "bg-primary-soft text-primary",
					accent: "bg-accent/20 text-accent-foreground",
					success: "bg-success/15 text-success",
					warning: "bg-warning/20 text-warning-foreground"
				}[tone]}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		})
	});
}
function Dashboard() {
	const { data, isLoading } = useDashboard();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold md:text-3xl",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Overview of your clinic activity."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "h-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/patients/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2 h-4 w-4" }), " New patient"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total patients",
						value: isLoading ? "—" : data.patientsCount,
						sub: data ? `${data.patientsNew30} new in 30 days` : void 0,
						Icon: Users,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total visits",
						value: isLoading ? "—" : data.visitsCount,
						Icon: CalendarCheck,
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Prescriptions",
						value: isLoading ? "—" : data.rxCount,
						Icon: FileText,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Lab reports",
						value: isLoading ? "—" : data.labsCount,
						Icon: FlaskConical,
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "card-shadow lg:col-span-2 border-border/60 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-semibold",
							children: "Visits — last 14 days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Daily appointment volume"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: data?.chart ?? [],
								margin: {
									left: -20,
									right: 8,
									top: 8,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "g1",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--primary)",
											stopOpacity: .35
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--primary)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--border)",
										strokeDasharray: "3 3",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tickLine: false,
										axisLine: false,
										tick: {
											fontSize: 11,
											fill: "var(--muted-foreground)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										allowDecimals: false,
										tickLine: false,
										axisLine: false,
										tick: {
											fontSize: 11,
											fill: "var(--muted-foreground)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 12,
										border: "1px solid var(--border)",
										background: "var(--card)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "visits",
										stroke: "var(--primary)",
										strokeWidth: 2,
										fill: "url(#g1)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "card-shadow border-border/60 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "Recent patients"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [(data?.recentPatients ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/patients/$id",
							params: { id: p.id },
							className: "flex items-center gap-3 rounded-lg p-2 hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-full med-gradient text-sm font-semibold text-white",
								children: initials(p.full_name)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: p.full_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: p.cnic || p.phone
								})]
							})]
						}, p.id)), data?.recentPatients.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No patients yet."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-shadow border-border/60 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "Recent visits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/patients",
						className: "text-sm font-medium text-primary hover:underline",
						children: "View all patients →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-left text-xs uppercase tracking-wide text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-medium",
									children: "Patient"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-medium",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-medium",
									children: "Complaint"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-medium",
									children: "Diagnosis"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [(data?.recentVisits ?? []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: v.patient ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/patients/$id",
											params: { id: v.patient.id },
											className: "flex items-center gap-2 font-medium hover:text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary",
												children: initials(v.patient.full_name)
											}), v.patient.full_name]
										}) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-muted-foreground",
										children: format(new Date(v.visit_date), "PP")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: v.chief_complaint || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "—"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: v.diagnosis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: v.diagnosis
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "—"
										})
									})
								]
							}, v.id)), data?.recentVisits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 4,
								className: "py-8 text-center text-sm text-muted-foreground",
								children: "No visits recorded yet."
							}) })]
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
