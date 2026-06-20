import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patients.index-CWN73wC8.js
var $$splitComponentImporter = () => import("./patients.index-Dsm1Yjqa.mjs");
var searchSchema = objectType({ q: stringType().optional() });
var Route = createFileRoute("/_authenticated/patients/")({
	validateSearch: (s) => searchSchema.parse(s),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
