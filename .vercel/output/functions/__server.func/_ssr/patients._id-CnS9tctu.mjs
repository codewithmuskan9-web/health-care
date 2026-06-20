import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Dwnyx5Ze.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as FileText, E as CircleAlert, N as ArrowLeft, P as Activity, S as FlaskConical, a as Upload, b as IdCard, f as Printer, g as MapPin, j as Calendar, m as Phone, o as Trash2, p as Plus, s as StickyNote, t as X, v as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as initials, t as calcAge } from "./format-C75n1QKL.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as format } from "../_libs/date-fns.mjs";
import { t as Route } from "./patients._id-DURM93dW.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patients._id-CnS9tctu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function usePatient(id) {
	return useQuery({
		queryKey: ["patient", id],
		queryFn: async () => {
			const [patient, visits, rx, labs] = await Promise.all([
				supabase.from("patients").select("*").eq("id", id).single(),
				supabase.from("visits").select("*").eq("patient_id", id).order("visit_date", { ascending: false }),
				supabase.from("prescriptions").select("*").eq("patient_id", id).order("created_at", { ascending: false }),
				supabase.from("lab_reports").select("*").eq("patient_id", id).order("created_at", { ascending: false })
			]);
			if (patient.error) throw patient.error;
			return {
				patient: patient.data,
				visits: visits.data ?? [],
				prescriptions: rx.data ?? [],
				labs: labs.data ?? []
			};
		}
	});
}
function PatientDetail() {
	const { id } = Route.useParams();
	const { data, isLoading } = usePatient(id);
	const navigate = useNavigate();
	const qc = useQueryClient();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-muted-foreground",
		children: "Loading patient…"
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8",
		children: "Patient not found."
	});
	const { patient: p, visits, prescriptions, labs } = data;
	const age = calcAge(p.date_of_birth);
	const remove = async () => {
		if (!confirm("Delete this patient and all their records? This cannot be undone.")) return;
		const { error } = await supabase.from("patients").delete().eq("id", p.id);
		if (error) return toast.error(error.message);
		toast.success("Patient deleted");
		qc.invalidateQueries({ queryKey: ["patients"] });
		navigate({ to: "/patients" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/patients",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to patients"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-shadow border-border/60 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "med-gradient h-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "-mt-10 flex flex-wrap items-end gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-card med-gradient text-2xl font-bold text-white shadow-lg",
									children: initials(p.full_name)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-2xl font-bold md:text-3xl",
										children: p.full_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground",
										children: [
											age !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [age, " years"] }),
											p.gender && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "capitalize",
												children: ["· ", p.gender]
											}),
											p.blood_group && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												children: p.blood_group
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												children: ["Patient since ", format(new Date(p.created_at), "MMM yyyy")]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: remove,
									className: "text-destructive hover:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Delete"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4",
							children: [
								p.cnic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									Icon: IdCard,
									label: "CNIC",
									value: p.cnic
								}),
								p.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									Icon: Phone,
									label: "Phone",
									value: p.phone
								}),
								p.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									Icon: MapPin,
									label: "Address",
									value: p.address
								}),
								p.allergies && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									Icon: CircleAlert,
									label: "Allergies",
									value: p.allergies,
									tone: "warning"
								})
							]
						}),
						p.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "mt-6 border-border/60 bg-muted/40 p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Medical history summary"
							}), p.summary]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "timeline",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2 md:w-auto md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "timeline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mr-2 h-4 w-4" }), "Visits"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "rx",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), "Prescriptions"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "labs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "mr-2 h-4 w-4" }), "Lab reports"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "notes",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "mr-2 h-4 w-4" }), "Notes"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "timeline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitsTab, {
							patient: p,
							visits
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "rx",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrescriptionsTab, {
							patient: p,
							visits,
							prescriptions
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "labs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabsTab, {
							patient: p,
							visits,
							labs
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesTab, { visits })
					})
				]
			})
		]
	});
}
function Info({ Icon, label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/30 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-8 w-8 shrink-0 place-items-center rounded-md ${tone === "warning" ? "bg-warning/20 text-warning-foreground" : "bg-primary-soft text-primary"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate font-medium",
				children: value
			})]
		})]
	});
}
function VisitsTab({ patient, visits }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-shadow border-border/60 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display font-semibold",
				children: "Visit timeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					visits.length,
					" ",
					visits.length === 1 ? "visit" : "visits"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New visit"] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewVisitDialog, {
					patient,
					onClose: () => setOpen(false)
				})]
			})]
		}), visits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-8 text-center text-sm text-muted-foreground",
			children: "No visits recorded yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative space-y-5 border-l-2 border-border/70 pl-6",
			children: visits.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -left-[31px] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-4 ring-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: format(new Date(v.visit_date), "PPpp")
							}), v.diagnosis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: v.diagnosis })]
						}),
						v.chief_complaint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Complaint: "
							}), v.chief_complaint]
						}),
						v.doctor_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Notes: "
							}), v.doctor_notes]
						})
					]
				})]
			}, v.id))
		})]
	});
}
function NewVisitDialog({ patient, onClose }) {
	const qc = useQueryClient();
	const [f, setF] = (0, import_react.useState)({
		chief_complaint: "",
		diagnosis: "",
		doctor_notes: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		setSaving(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			const { error } = await supabase.from("visits").insert({
				patient_id: patient.id,
				doctor_id: u.user.id,
				...f
			});
			if (error) throw error;
			qc.invalidateQueries({ queryKey: ["patient", patient.id] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Visit recorded");
			onClose();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["New visit for ", patient.full_name] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Chief complaint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.chief_complaint,
					onChange: (e) => setF({
						...f,
						chief_complaint: e.target.value
					}),
					placeholder: "e.g. Persistent cough for 5 days"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Diagnosis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.diagnosis,
					onChange: (e) => setF({
						...f,
						diagnosis: e.target.value
					}),
					placeholder: "e.g. Acute bronchitis"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Doctor's notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					value: f.doctor_notes,
					onChange: (e) => setF({
						...f,
						doctor_notes: e.target.value
					})
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: save,
			disabled: saving,
			children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Save visit"]
		})] })
	] });
}
function PrescriptionsTab({ patient, visits, prescriptions }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const print = () => window.print();
	const remove = async (id) => {
		const { error } = await supabase.from("prescriptions").delete().eq("id", id);
		if (error) return toast.error(error.message);
		qc.invalidateQueries({ queryKey: ["patient", patient.id] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-shadow border-border/60 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center justify-between gap-2 no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display font-semibold",
					children: "Prescriptions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [prescriptions.length, " total"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: print,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-2 h-4 w-4" }), " Print"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add medicine"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewRxDialog, {
							patient,
							visits,
							onClose: () => setOpen(false)
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden print:mb-6 print:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xl font-bold",
					children: ["Prescription — ", patient.full_name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						patient.cnic,
						" · ",
						patient.phone
					]
				})]
			}),
			prescriptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-center text-sm text-muted-foreground",
				children: "No prescriptions yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-left text-xs uppercase tracking-wide text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Medicine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Dosage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Frequency"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Duration"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "pb-3 no-print" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: prescriptions.map((rx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 font-medium",
								children: [rx.medicine_name, rx.instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-normal text-muted-foreground",
									children: rx.instructions
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: rx.dosage || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: rx.frequency || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: rx.duration || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted-foreground",
								children: format(new Date(rx.created_at), "PP")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right no-print",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => remove(rx.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							})
						] }, rx.id))
					})]
				})
			})
		]
	});
}
function NewRxDialog({ patient, visits, onClose }) {
	const qc = useQueryClient();
	const [f, setF] = (0, import_react.useState)({
		medicine_name: "",
		dosage: "",
		frequency: "",
		duration: "",
		instructions: "",
		visit_id: visits[0]?.id ?? ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!f.medicine_name.trim()) {
			toast.error("Medicine name is required");
			return;
		}
		setSaving(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			const { error } = await supabase.from("prescriptions").insert({
				patient_id: patient.id,
				doctor_id: u.user.id,
				medicine_name: f.medicine_name,
				dosage: f.dosage,
				frequency: f.frequency,
				duration: f.duration,
				instructions: f.instructions,
				visit_id: f.visit_id || null
			});
			if (error) throw error;
			qc.invalidateQueries({ queryKey: ["patient", patient.id] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Prescription added");
			onClose();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add prescription" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Medicine *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.medicine_name,
						onChange: (e) => setF({
							...f,
							medicine_name: e.target.value
						}),
						placeholder: "e.g. Amoxicillin 500mg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Dosage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.dosage,
					onChange: (e) => setF({
						...f,
						dosage: e.target.value
					}),
					placeholder: "1 tablet"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Frequency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.frequency,
					onChange: (e) => setF({
						...f,
						frequency: e.target.value
					}),
					placeholder: "3x daily"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Duration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.duration,
					onChange: (e) => setF({
						...f,
						duration: e.target.value
					}),
					placeholder: "7 days"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instructions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.instructions,
					onChange: (e) => setF({
						...f,
						instructions: e.target.value
					}),
					placeholder: "After meals"
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: save,
			disabled: saving,
			children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Add"]
		})] })
	] });
}
function LabsTab({ patient, visits, labs }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const openFile = async (path) => {
		const { data, error } = await supabase.storage.from("patient-files").createSignedUrl(path, 600);
		if (error) return toast.error(error.message);
		window.open(data.signedUrl, "_blank");
	};
	const remove = async (lab) => {
		if (!confirm("Delete this lab report?")) return;
		await supabase.storage.from("patient-files").remove([lab.file_path]);
		const { error } = await supabase.from("lab_reports").delete().eq("id", lab.id);
		if (error) return toast.error(error.message);
		qc.invalidateQueries({ queryKey: ["patient", patient.id] });
		qc.invalidateQueries({ queryKey: ["dashboard"] });
		toast.success("Deleted");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-shadow border-border/60 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display font-semibold",
				children: "Laboratory reports"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [labs.length, " files"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-4 w-4" }), " Upload"] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewLabDialog, {
					patient,
					visits,
					onClose: () => setOpen(false)
				})]
			})]
		}), labs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-8 text-center text-sm text-muted-foreground",
			children: "No lab reports uploaded."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: labs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate font-semibold",
								children: l.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: format(new Date(l.created_at), "PP")
							}),
							l.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs",
								children: l.description
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "flex-1",
						onClick: () => openFile(l.file_path),
						children: "View"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => remove(l),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})]
				})]
			}, l.id))
		})]
	});
}
function NewLabDialog({ patient, visits, onClose }) {
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)("");
	const [desc, setDesc] = (0, import_react.useState)("");
	const [visitId, setVisitId] = (0, import_react.useState)(visits[0]?.id ?? "");
	const [file, setFile] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async () => {
		if (!file || !title.trim()) {
			toast.error("Pick a file and add a title");
			return;
		}
		setSaving(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			const uid = u.user.id;
			const path = `${uid}/${patient.id}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
			const up = await supabase.storage.from("patient-files").upload(path, file, { contentType: file.type });
			if (up.error) throw up.error;
			const { error } = await supabase.from("lab_reports").insert({
				patient_id: patient.id,
				doctor_id: uid,
				visit_id: visitId || null,
				title,
				description: desc,
				file_url: path,
				file_path: path,
				file_type: file.type
			});
			if (error) throw error;
			qc.invalidateQueries({ queryKey: ["patient", patient.id] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			toast.success("Uploaded");
			onClose();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Upload lab report" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "CBC, X-ray Chest, MRI…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: desc,
					onChange: (e) => setDesc(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "File *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "file",
					accept: "image/*,.pdf",
					onChange: (e) => setFile(e.target.files?.[0] ?? null)
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: save,
			disabled: saving,
			children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Upload"]
		})] })
	] });
}
function NotesTab({ visits }) {
	const noted = visits.filter((v) => v.doctor_notes?.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-shadow border-border/60 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display font-semibold",
				children: "Doctor notes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Notes captured during each visit"
			}),
			noted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: "No notes yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: noted.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(new Date(v.visit_date), "PPpp") }), v.diagnosis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: v.diagnosis
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: v.doctor_notes
					})]
				}, v.id))
			})
		]
	});
}
//#endregion
export { PatientDetail as component };
