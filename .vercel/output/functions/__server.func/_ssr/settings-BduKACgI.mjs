import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Dwnyx5Ze.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Save, v as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as useCurrentUser } from "./use-current-user-CibuiH6M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BduKACgI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user } = useCurrentUser();
	const [f, setF] = (0, import_react.useState)({
		full_name: "",
		specialization: "",
		clinic_name: "",
		phone: ""
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
			if (data) setF({
				full_name: data.full_name ?? "",
				specialization: data.specialization ?? "",
				clinic_name: data.clinic_name ?? "",
				phone: data.phone ?? ""
			});
			setLoading(false);
		});
	}, [user]);
	const save = async () => {
		if (!user) return;
		setSaving(true);
		const { error } = await supabase.from("profiles").update(f).eq("id", user.id);
		setSaving(false);
		if (error) return toast.error(error.message);
		toast.success("Profile saved");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold md:text-3xl",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Your doctor profile and clinic info."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "card-shadow border-border/60 p-6",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: user?.email ?? "",
							disabled: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.full_name,
							onChange: (e) => setF({
								...f,
								full_name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Specialization" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.specialization,
							onChange: (e) => setF({
								...f,
								specialization: e.target.value
							}),
							placeholder: "e.g. General Physician"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Clinic name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.clinic_name,
							onChange: (e) => setF({
								...f,
								clinic_name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.phone,
							onChange: (e) => setF({
								...f,
								phone: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: save,
							disabled: saving,
							children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }), "Save changes"]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { SettingsPage as component };
