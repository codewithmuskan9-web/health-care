import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-Dwnyx5Ze.js
function createSupabaseClient() {
	return createClient("https://xdbaogxrxjlgrdphhgyr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYmFvZ3hyeGpsZ3JkcGhoZ3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDI2MTEsImV4cCI6MjA5NzQxODYxMX0.2CWbElR29YoneDLeCI6rh23CHVn3acS2WnmyPZQsx1o", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
