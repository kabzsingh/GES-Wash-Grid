import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, d as useRouter } from "../_libs/tanstack__react-router.mjs";
import { A as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { s as supabase } from "./client-BErA7MhY.mjs";
import { useAuth, Button, Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, grantAdminBootstrap, previewTheme, listAllUsers, setUserRole, deleteUser, cn, Textarea, Switch, createSiteApiKey } from "./router-zrMmobBP.mjs";
import { a as getSupabaseProjectRef } from "./supabase-project-DjNV3F7_.mjs";
import { R as Root, P as Portal, a as Content, C as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { i as LoaderCircle, r as ShieldCheck, u as TriangleAlert, n as Plus, K as KeyRound, e as Copy, P as Palette, S as Save, w as Users, f as Cpu, m as Pencil, T as Trash2, X, U as UserCheck, B as Building2, v as UserX, M as Mail, o as Send, b as Check } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./db-BkCXe06b.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "./runtime-env-B3DY4n68.mjs";
import "../_libs/xlsx.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
function parseRpcResult(data) {
  const row = data;
  return { granted: !!row?.granted, isAdmin: !!row?.is_admin };
}
function isMissingRpcError(error) {
  if (!error) return false;
  return error.code === "PGRST202" || error.status === 404 || (error.message?.includes("bootstrap_first_admin") ?? false);
}
async function bootstrapAdminAccess(userId) {
  const { data: rpcData, error: rpcError } = await supabase.rpc("bootstrap_first_admin");
  if (!rpcError) return parseRpcResult(rpcData);
  if (!isMissingRpcError(rpcError)) throw rpcError;
  const { error: insertError } = await supabase.from("user_roles").insert({
    user_id: userId,
    role: "admin"
  });
  if (!insertError) return { granted: true, isAdmin: true };
  if (insertError.code === "42501") {
    const err = new Error(insertError.message);
    err.code = "42501";
    throw err;
  }
  const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const isAdminNow = (roles ?? []).some((r) => r.role === "admin");
  return { granted: false, isAdmin: isAdminNow };
}
async function clearSupabaseSession() {
  const ref = getSupabaseProjectRef();
  if (typeof window !== "undefined" && ref) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith("sb-") && key.includes(ref)) continue;
      if (key?.startsWith("sb-")) localStorage.removeItem(key);
    }
  }
  await supabase.auth.signOut();
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const SETUP_SQL_HINT = "Supabase Dashboard → SQL Editor → run scripts/setup-admin.sql from this repo.";
function AdminPage() {
  const {
    isAdmin,
    refreshRoles,
    user,
    loading
  } = useAuth();
  const nav = useNavigate();
  const bootstrapServer = useServerFn(grantAdminBootstrap);
  const [sites, setSites] = reactExports.useState([]);
  const [meters, setMeters] = reactExports.useState([]);
  const [keys, setKeys] = reactExports.useState([]);
  const [newSiteName, setNewSiteName] = reactExports.useState("");
  const [selectedSiteId, setSelectedSiteId] = reactExports.useState(null);
  const [newSiteLoc, setNewSiteLoc] = reactExports.useState("");
  const [revealedKey, setRevealedKey] = reactExports.useState(null);
  const [sketchSite, setSketchSite] = reactExports.useState(null);
  const [isBootstrapping, setIsBootstrapping] = reactExports.useState(false);
  const [needsDbSetup, setNeedsDbSetup] = reactExports.useState(false);
  const [bootstrapNote, setBootstrapNote] = reactExports.useState(null);
  const projectRef = getSupabaseProjectRef();
  const load = async () => {
    if (!isAdmin) return;
    try {
      const {
        data: s,
        error: sErr
      } = await supabase.from("sites").select("*").order("created_at");
      if (sErr) toast.error("Error loading sites: " + sErr.message);
      else setSites(s ?? []);
      const {
        data: m,
        error: mErr
      } = await supabase.from("site_meters").select("*").order("position");
      if (mErr) toast.error("Error loading meters: " + mErr.message);
      else setMeters(m ?? []);
      const {
        data: k,
        error: kErr
      } = await supabase.from("site_api_keys").select("*").order("created_at");
      if (kErr) toast.error("Error loading API keys: " + kErr.message);
      else setKeys(k ?? []);
    } catch (e) {
      console.error("Load failed", e);
      toast.error("Failed to load admin data");
    }
  };
  const runBootstrap = reactExports.useCallback(async () => {
    if (!user?.id) return;
    setIsBootstrapping(true);
    setNeedsDbSetup(false);
    setBootstrapNote(null);
    try {
      const {
        data: {
          session
        }
      } = await supabase.getSession();
      const token = session?.access_token ?? "";
      const res = await bootstrapServer({
        data: {
          __token: token
        }
      });
      if (res.granted || res.isAdmin) {
        await refreshRoles();
        if (res.granted) toast.success("You've been granted Admin access!");
      } else {
        const clientRes = await bootstrapAdminAccess(user.id);
        if (clientRes.granted || clientRes.isAdmin) {
          await refreshRoles();
          if (clientRes.granted) toast.success("You're set as admin (via fallback)");
        } else {
          setBootstrapNote("No admin role detected. Please ensure you have run the setup SQL in your Supabase dashboard.");
          setNeedsDbSetup(true);
        }
      }
    } catch (e) {
      console.error("Bootstrap error:", e);
      setNeedsDbSetup(true);
      toast.error(e?.message || "Failed to verify admin access");
    } finally {
      setIsBootstrapping(false);
    }
  }, [user?.id, refreshRoles, bootstrapServer]);
  reactExports.useEffect(() => {
    if (loading || !user?.id) return;
    if (!isAdmin) void runBootstrap();
  }, [loading, user?.id, isAdmin, runBootstrap]);
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  if (loading || isBootstrapping) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Verifying admin permissions..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 max-w-xs italic", children: "This usually takes a few seconds. If it hangs, please check your internet connection." })
    ] });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto mt-12 rounded-xl border border-border bg-card p-8 shadow-xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-muted rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-muted-foreground opacity-50" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-2xl tracking-tight", children: "Access Restricted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: [
        "Your account (",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user?.email }),
        ") does not have administrator privileges on project",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mx-1 px-1.5 py-0.5 rounded bg-muted text-xs font-mono", children: projectRef || "unknown" }),
        "."
      ] }),
      needsDbSetup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 text-left rounded-lg border border-amber-500/20 bg-amber-500/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Database Setup Required" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700/80 dark:text-amber-300/80 leading-relaxed mb-3", children: SETUP_SQL_HINT }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono bg-background/50 p-2 rounded border border-amber-500/10 overflow-x-auto whitespace-pre", children: `-- Find this script in:
scripts/setup-admin.sql` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => void runBootstrap(), disabled: isBootstrapping, className: "w-full", children: [
          isBootstrapping ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
          "Retry Access Check"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", onClick: async () => {
          await clearSupabaseSession();
          toast.info("Signed out. Please sign up for a new account.");
          nav({
            to: "/signup"
          });
        }, children: "Sign out & Switch User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => nav({
          to: "/dashboard"
        }), className: "text-muted-foreground", children: "Return to Dashboard" })
      ] })
    ] });
  }
  const addSite = async () => {
    if (!newSiteName.trim()) return;
    const {
      error
    } = await supabase.from("sites").insert({
      name: newSiteName.trim(),
      location: newSiteLoc.trim() || null
    });
    if (error) return toast.error(error.message);
    setNewSiteName("");
    setNewSiteLoc("");
    load();
    toast.success("Site created successfully");
  };
  const removeSite = async (id) => {
    if (!confirm("Are you sure? This will permanently delete the site and all its data.")) return;
    const {
      error
    } = await supabase.from("sites").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
    toast.success("Site deleted");
  };
  const addMeter = async (siteId, m) => {
    const name = (m.name ?? "").trim();
    const deviceKey = (m.device_key ?? "").trim();
    if (!name || !deviceKey) {
      toast.error("Name and Device Key are required");
      return false;
    }
    try {
      const {
        error
      } = await supabase.from("site_meters").insert({
        site_id: siteId,
        meter_type: m.meter_type,
        name,
        unit: (m.unit ?? "").trim() || "",
        capacity: m.capacity ?? null,
        low_threshold: m.low_threshold ?? null,
        device_key: deviceKey,
        chemical_group: m.chemical_group?.trim() || null,
        modbus_address: m.modbus_address ?? null,
        sensor_type: m.sensor_type ?? "switch",
        position: meters.filter((x) => x.site_id === siteId).length
      });
      if (error) {
        toast.error(error.message);
        return false;
      }
      load();
      toast.success("Meter added");
      return true;
    } catch (e) {
      toast.error(e.message || "Failed to add meter");
      return false;
    }
  };
  const updateMeter = async (id, updates) => {
    try {
      const payload = {
        capacity: updates.capacity,
        low_threshold: updates.low_threshold
      };
      if (updates.modbus_address !== void 0) payload.modbus_address = updates.modbus_address;
      if (updates.sensor_type !== void 0) payload.sensor_type = updates.sensor_type;
      const {
        error
      } = await supabase.from("site_meters").update(payload).eq("id", id);
      if (error) {
        toast.error(error.message);
        return false;
      }
      load();
      toast.success("Meter settings saved");
      return true;
    } catch (e) {
      toast.error(e.message || "Failed to update meter");
      return false;
    }
  };
  const toggleAvgWaterMeter = async (id, checked) => {
    try {
      const {
        error
      } = await supabase.from("site_meters").update({
        count_for_avg_water: checked
      }).eq("id", id);
      if (error) {
        toast.error(error.message);
        return false;
      }
      load();
      toast.success(checked ? "Now counted in Avg Water/Car" : "Excluded from Avg Water/Car");
      return true;
    } catch (e) {
      toast.error(e.message || "Failed to update meter");
      return false;
    }
  };
  const removeMeter = async (id) => {
    if (!confirm("Remove this meter? This cannot be undone.")) return;
    const {
      error
    } = await supabase.from("site_meters").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
    toast.success("Meter removed");
  };
  const updateBranding = async (siteId, branding) => {
    const {
      error
    } = await supabase.from("sites").update(branding).eq("id", siteId);
    if (error) {
      toast.error(error.message);
      return false;
    }
    load();
    toast.success("Branding updated");
    return true;
  };
  const updateSiteDetails = async (siteId, details) => {
    if (!details.name.trim()) {
      toast.error("Site name is required");
      return false;
    }
    const {
      error
    } = await supabase.from("sites").update({
      name: details.name.trim(),
      location: details.location?.trim() || null,
      machine_type: details.machine_type?.trim() || null
    }).eq("id", siteId);
    if (error) {
      toast.error(error.message);
      return false;
    }
    load();
    toast.success("Site details updated");
    return true;
  };
  const generateKey = useServerFn(createSiteApiKey);
  const handleGenKey = async (siteId) => {
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      const res = await generateKey({
        data: {
          siteId,
          label: "ESP32",
          __token: session?.access_token ?? ""
        }
      });
      setRevealedKey(res.apiKey);
      load();
    } catch (e) {
      toast.error(e.message ?? "Key generation failed");
    }
  };
  const revokeKey = async (id) => {
    const {
      error
    } = await supabase.from("site_api_keys").update({
      revoked: true
    }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
    toast.success("Key revoked");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-8 pb-20 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Admin Console" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Configure site infrastructure, monitor ESP32 connectivity, and manage reports." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppThemePanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UsersPanel, { currentUserId: user?.id ?? "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-primary" }),
        "Infrastructure Management"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium mb-4 text-muted-foreground", children: "Register New Wash Site" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-5 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "site-name", children: "Friendly Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "site-name", value: newSiteName, onChange: (e) => setNewSiteName(e.target.value), placeholder: "e.g. Manchester Central" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "site-loc", children: "Location / Area" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "site-loc", value: newSiteLoc, onChange: (e) => setNewSiteLoc(e.target.value), placeholder: "e.g. M1 1AA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addSite, className: "w-full gap-2 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Create Site"
          ] }) })
        ] })
      ] }),
      sites.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground shrink-0", children: "Show site" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSiteId ?? "__all__", onValueChange: (siteId) => setSelectedSiteId(siteId === "__all__" ? null : siteId), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a site..." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "All Sites" }),
            sites.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, children: s.name }, s.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
        sites.filter((site) => !selectedSiteId || site.id === selectedSiteId).map((site) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: `site-card-${site.id}`, className: "rounded-xl transition-shadow scroll-mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiteAdminCard, { site, meters: meters.filter((m) => m.site_id === site.id), keys: keys.filter((k) => k.site_id === site.id), onRemoveSite: () => removeSite(site.id), onAddMeter: (m) => addMeter(site.id, m), onUpdateMeter: updateMeter, onToggleAvgWaterMeter: toggleAvgWaterMeter, onRemoveMeter: removeMeter, onGenerateKey: () => handleGenKey(site.id), onRevokeKey: revokeKey, onGenerateSketch: () => setSketchSite(site), onUpdateBranding: (branding) => updateBranding(site.id, branding), onUpdateSiteDetails: (details) => updateSiteDetails(site.id, details) }) }, site.id)),
        sites.length === 0 && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 text-center rounded-xl border border-dashed border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No wash sites registered yet. Add one above to get started." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!revealedKey, onOpenChange: (o) => {
      if (!o) setRevealedKey(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-5 w-5 text-primary" }),
        "API Key Generated"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Action required:" }),
          " Copy this key immediately. For security, it will never be displayed again."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-secondary/80 p-4 font-mono text-sm break-all border border-border/50 pr-12", children: revealedKey }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "absolute right-2 top-1/2 -translate-y-1/2 hover:bg-background", onClick: () => {
            navigator.clipboard.writeText(revealedKey ?? "");
            toast.success("Copied to clipboard");
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground italic bg-muted/50 p-2 rounded", children: [
          "Note: Include this in the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "x-site-api-key" }),
          " header of your ESP32 requests."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EspSketchDialog, { site: sketchSite, meters: sketchSite ? meters.filter((m) => m.site_id === sketchSite.id) : [], onClose: () => setSketchSite(null) }, sketchSite?.id ?? "esp-sketch-closed")
  ] });
}
function AppThemePanel() {
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [mode, setMode] = reactExports.useState("dark");
  const [primary, setPrimary] = reactExports.useState("#5ad1e0");
  const [accent, setAccent] = reactExports.useState("#2c8f9e");
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await supabase.from("app_settings").select("theme_mode, primary_color, accent_color").eq("id", true).maybeSingle();
      if (data) {
        setMode(data.theme_mode ?? "dark");
        setPrimary(data.primary_color ?? "#5ad1e0");
        setAccent(data.accent_color ?? "#2c8f9e");
      }
      setLoading(false);
    })();
  }, []);
  reactExports.useEffect(() => {
    if (!loading) previewTheme(mode, primary, accent);
  }, [primary, accent, mode, loading]);
  const handleSave = async () => {
    setSaving(true);
    const {
      error
    } = await supabase.from("app_settings").update({
      theme_mode: mode,
      primary_color: primary,
      accent_color: accent,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", true);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("App theme saved — applies for all users");
  };
  const handleReset = () => {
    setMode("dark");
    setPrimary("#5ad1e0");
    setAccent("#2c8f9e");
  };
  if (loading) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-5 w-5 text-primary" }),
      "App Theme"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Set the default look for everyone using the app. Colors apply globally; each person's light/dark mode toggle still overrides just their own view." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Default mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: mode, onValueChange: (v) => setMode(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "dark", children: "Dark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "light", children: "Light" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Primary color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: primary, onChange: (e) => setPrimary(e.target.value), className: "h-9 w-9 rounded border border-border cursor-pointer bg-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: primary, onChange: (e) => setPrimary(e.target.value), className: "h-9 font-mono text-xs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Accent color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: accent, onChange: (e) => setAccent(e.target.value), className: "h-9 w-9 rounded border border-border cursor-pointer bg-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: accent, onChange: (e) => setAccent(e.target.value), className: "h-9 font-mono text-xs" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2 border-t border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: handleReset, children: "Reset to default" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: handleSave, disabled: saving, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          " ",
          saving ? "Saving..." : "Save Theme"
        ] })
      ] })
    ] })
  ] });
}
function MeterRow({
  meter,
  onUpdateMeter,
  onToggleAvgWaterMeter,
  onRemoveMeter
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [capacity, setCapacity] = reactExports.useState(meter.capacity != null ? String(meter.capacity) : "");
  const [lowThreshold, setLowThreshold] = reactExports.useState(meter.low_threshold != null ? String(meter.low_threshold) : "");
  const [modbusAddress, setModbusAddress] = reactExports.useState(meter.modbus_address != null ? String(meter.modbus_address) : "");
  const [sensorType, setSensorType] = reactExports.useState(meter.sensor_type ?? "switch");
  const [saving, setSaving] = reactExports.useState(false);
  const [savingAvgWater, setSavingAvgWater] = reactExports.useState(false);
  const isChemical = meter.meter_type === "chemical" || meter.meter_type === "chemical_flow";
  const isChemicalLevel = meter.meter_type === "chemical";
  const isFreshWater = meter.meter_type === "fresh_water";
  const handleSave = async () => {
    setSaving(true);
    const ok = await onUpdateMeter(meter.id, {
      capacity: capacity.trim() ? Number(capacity) : null,
      low_threshold: lowThreshold.trim() ? Number(lowThreshold) : null,
      modbus_address: modbusAddress.trim() ? Number(modbusAddress) : null,
      sensor_type: isChemicalLevel ? sensorType : void 0
    });
    setSaving(false);
    if (ok) setEditing(false);
  };
  const handleToggleAvgWater = async (checked) => {
    setSavingAvgWater(true);
    await onToggleAvgWaterMeter(meter.id, checked);
    setSavingAvgWater(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center px-2 py-1 rounded bg-muted font-mono text-[10px] font-bold text-muted-foreground", children: [
          "ID",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: meter.device_key })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: meter.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-muted-foreground/70", children: meter.meter_type.replace("_", " ") }),
            meter.chemical_group && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold border border-indigo-500/10", children: [
              "GRP: ",
              meter.chemical_group
            ] }),
            isChemicalLevel && !editing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${meter.sensor_type === "probe" ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/10" : "bg-muted text-muted-foreground/70 border-border"}`, children: meter.sensor_type === "probe" ? "PROBE" : "SWITCH" }),
            !editing && meter.capacity != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/60", children: [
              "Drum: ",
              meter.capacity,
              meter.unit
            ] }),
            !editing && meter.low_threshold != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/60", children: [
              "Float trips at: ",
              meter.low_threshold,
              meter.unit,
              " used"
            ] }),
            !editing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-mono ${meter.modbus_address != null ? "text-muted-foreground/60" : "text-amber-500"}`, children: meter.modbus_address != null ? `Modbus: ${meter.modbus_address}` : "Modbus: not set" })
          ] }),
          isFreshWater && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground/80 cursor-pointer select-none w-fit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: meter.count_for_avg_water, disabled: savingAvgWater, onChange: (e) => handleToggleAvgWater(e.target.checked), className: "h-3 w-3 accent-primary" }),
            'Count this meter in "Avg Water / Car"'
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setEditing((v) => !v), className: "h-8 w-8 text-muted-foreground hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => onRemoveMeter(meter.id), className: "h-8 w-8 text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/60 grid grid-cols-2 gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "HMI Modbus Address (mapping table)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", type: "number", placeholder: "e.g. 3025", value: modbusAddress, onChange: (e) => setModbusAddress(e.target.value) })
      ] }),
      isChemical && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        isChemicalLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Sensor Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sensorType, onValueChange: (v) => setSensorType(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "switch", children: "Switch (float — low/ok only)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "probe", children: "Probe (continuous level reading)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "counter", children: "Counter (PLC counts washes since low)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-[10px]", children: [
            "Total drum capacity (",
            meter.unit || "L",
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", type: "number", placeholder: "e.g. 210", value: capacity, onChange: (e) => setCapacity(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: isChemicalLevel && sensorType === "probe" ? `Low alert threshold (${meter.unit || "L"} remaining)` : `Float trips after (${meter.unit || "L"} used from full)` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", type: "number", placeholder: "e.g. 50", value: lowThreshold, onChange: (e) => setLowThreshold(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-8 text-xs", onClick: () => setEditing(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 text-xs", onClick: handleSave, disabled: saving, children: saving ? "Saving..." : "Save" })
      ] })
    ] })
  ] });
}
function SiteAdminCard({
  site,
  meters,
  keys,
  onRemoveSite,
  onAddMeter,
  onUpdateMeter,
  onToggleAvgWaterMeter,
  onRemoveMeter,
  onGenerateKey,
  onRevokeKey,
  onGenerateSketch,
  onUpdateBranding,
  onUpdateSiteDetails
}) {
  const [type, setType] = reactExports.useState("chemical");
  const [name, setName] = reactExports.useState("");
  const [unit, setUnit] = reactExports.useState("L");
  const [deviceKey, setDeviceKey] = reactExports.useState("");
  const [modbusAddress, setModbusAddress] = reactExports.useState("");
  const [capacity, setCapacity] = reactExports.useState("");
  const [low, setLow] = reactExports.useState("");
  const [group, setGroup] = reactExports.useState("");
  const [sensorType, setSensorType] = reactExports.useState("switch");
  const [editingDetails, setEditingDetails] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState(site.name);
  const [editLocation, setEditLocation] = reactExports.useState(site.location ?? "");
  const [editMachineType, setEditMachineType] = reactExports.useState(site.machine_type ?? "");
  const [savingDetails, setSavingDetails] = reactExports.useState(false);
  const saveSiteDetails = async () => {
    setSavingDetails(true);
    const ok = await onUpdateSiteDetails({
      name: editName,
      location: editLocation || null,
      machine_type: editMachineType || null
    });
    setSavingDetails(false);
    if (ok) setEditingDetails(false);
  };
  const cancelEditDetails = () => {
    setEditName(site.name);
    setEditLocation(site.location ?? "");
    setEditMachineType(site.machine_type ?? "");
    setEditingDetails(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 px-6 py-4 flex items-center justify-between border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded bg-background border border-border flex items-center justify-center font-bold text-primary shrink-0", children: site.name.charAt(0) }),
        editingDetails ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editName, onChange: (e) => setEditName(e.target.value), placeholder: "Site name", className: "h-8 text-sm font-semibold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editLocation, onChange: (e) => setEditLocation(e.target.value), placeholder: "Location / Address", className: "h-8 text-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editMachineType, onChange: (e) => setEditMachineType(e.target.value), placeholder: "Machine type (e.g. Delta DOP-107EV)", className: "h-8 text-sm" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg leading-tight truncate", children: site.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider font-medium flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3 w-3" }),
            site.location || "Remote Site",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 opacity-30", children: "•" }),
            meters.length,
            " Sensor",
            meters.length === 1 ? "" : "s",
            site.machine_type && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 opacity-30", children: "•" }),
              site.machine_type
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: editingDetails ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", onClick: saveSiteDetails, disabled: savingDetails, className: "h-8 text-xs font-semibold", children: [
          savingDetails ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5 mr-1.5" }),
          "Save"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: cancelEditDetails, className: "h-8 text-xs", children: "Cancel" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: () => setEditingDetails(true), className: "h-8 w-8", title: "Edit site details", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: onGenerateSketch, disabled: meters.length === 0, className: "h-8 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Sketch"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: onRemoveSite, className: "h-8 w-8 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground/80", children: "Meter & Sensor Configuration" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          meters.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MeterRow, { meter: m, onUpdateMeter, onToggleAvgWaterMeter, onRemoveMeter }, m.id)),
          meters.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 border-2 border-dashed border-border rounded-lg bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No sensors configured for this site." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg bg-muted/20 p-4 border border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase text-muted-foreground mb-3 tracking-widest", children: "Connect New Meter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "wash", children: "Wash" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fresh_water", children: "Water" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "chemical", children: "Level" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "e.g. Soap 1", value: name, onChange: (e) => setName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Device Key" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "esp_id", value: deviceKey, onChange: (e) => setDeviceKey(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "")) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "HMI Modbus Addr" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "e.g. 3025", type: "number", value: modbusAddress, onChange: (e) => setModbusAddress(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Unit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "L / ml", value: unit, onChange: (e) => setUnit(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Cap" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "200", type: "number", value: capacity, onChange: (e) => setCapacity(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Alert" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "20", type: "number", value: low, onChange: (e) => setLow(e.target.value) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col md:flex-row gap-3 items-end", children: [
            type === "chemical" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Sensor Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sensorType, onValueChange: (v) => setSensorType(v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "switch", children: "Switch (float — low/ok only)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "probe", children: "Probe (continuous level reading)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "counter", children: "Counter (PLC counts washes since low)" })
                ] })
              ] })
            ] }),
            (type === "chemical" || type === "chemical_flow") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: "Chemical Grouping (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-8 text-xs", placeholder: "e.g. Blue Soap", value: group, onChange: (e) => setGroup(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-8 px-4 font-bold text-[11px]", onClick: async () => {
              const ok = await onAddMeter({
                meter_type: type,
                name: name.trim(),
                unit,
                device_key: deviceKey.trim(),
                modbus_address: modbusAddress.trim() ? Number(modbusAddress) : null,
                capacity: capacity ? Number(capacity) : null,
                low_threshold: low ? Number(low) : null,
                chemical_group: group.trim() || null,
                sensor_type: type === "chemical" ? sensorType : "switch"
              });
              if (!ok) return;
              setName("");
              setDeviceKey("");
              setModbusAddress("");
              setCapacity("");
              setLow("");
              setGroup("");
              setSensorType("switch");
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
              " Add Sensor"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground/80", children: "Active ESP32 Access Keys" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: onGenerateKey, className: "h-7 text-[10px] font-bold uppercase border-dashed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3 w-3 mr-1.5" }),
            " New Key"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-border/60 px-4 py-2.5 bg-muted/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] bg-background border border-border px-2 py-0.5 rounded font-bold shadow-sm", children: [
                k.key_prefix,
                "••••••••"
              ] }),
              k.revoked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase text-destructive bg-destructive/10 px-1.5 py-0.5 rounded", children: "Revoked" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: k.last_used_at ? `Activity: ${new Date(k.last_used_at).toLocaleDateString()}` : "Not used" })
            ] }),
            !k.revoked && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => onRevokeKey(k.id), className: "h-7 text-[10px] font-bold text-destructive hover:bg-destructive/10 uppercase tracking-wider", children: "Deactivate" })
          ] }, k.id)),
          keys.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic text-center py-4 bg-muted/10 rounded-lg", children: "No security keys active. Generate one to start streaming data." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiteThemeSettings, { site, onUpdateBranding }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaterAlertSettings, { site, onSaved: () => {
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PollIntervalSettings, { site, onSaved: () => {
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportSettings, { site, onSaved: () => {
      } }) })
    ] })
  ] });
}
function SiteThemeSettings({
  site,
  onUpdateBranding
}) {
  const defaults = {
    primary: "#5ad1e0",
    secondary: "#243b53",
    accent: "#2c8f9e"
  };
  const [primary, setPrimary] = reactExports.useState(site.primary_color || defaults.primary);
  const [secondary, setSecondary] = reactExports.useState(site.secondary_color || defaults.secondary);
  const [accent, setAccent] = reactExports.useState(site.accent_color || defaults.accent);
  const [saving, setSaving] = reactExports.useState(false);
  const save = async () => {
    setSaving(true);
    await onUpdateBranding({
      primary_color: primary,
      secondary_color: secondary,
      accent_color: accent,
      logo_url: site.logo_url ?? null,
      background_url: site.background_url ?? null
    });
    setSaving(false);
  };
  const reset = async () => {
    setPrimary(defaults.primary);
    setSecondary(defaults.secondary);
    setAccent(defaults.accent);
    setSaving(true);
    await onUpdateBranding({
      primary_color: defaults.primary,
      secondary_color: defaults.secondary,
      accent_color: defaults.accent,
      logo_url: site.logo_url ?? null,
      background_url: site.background_url ?? null
    });
    setSaving(false);
  };
  const ColorField = ({
    label,
    value,
    onChange
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value, onChange: (e) => onChange(e.target.value), className: "h-9 w-9 rounded border border-border cursor-pointer bg-transparent p-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, onChange: (e) => onChange(e.target.value), className: "h-9 text-xs font-mono", placeholder: "#5ad1e0" })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/50 bg-muted/20 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-4 w-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold uppercase tracking-widest text-muted-foreground", children: "Site Theme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Colors used on this site's Dashboard tile and Site Details page. Doesn't affect other sites or the global app theme." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: reset, disabled: saving, className: "h-8 text-xs font-bold", children: "Reset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: save, disabled: saving, className: "h-8 text-xs font-bold", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }) : null,
          "Save Theme"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorField, { label: "Primary", value: primary, onChange: setPrimary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorField, { label: "Secondary", value: secondary, onChange: setSecondary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorField, { label: "Accent", value: accent, onChange: setAccent })
    ] })
  ] });
}
function PollIntervalSettings({
  site,
  onSaved
}) {
  const [seconds, setSeconds] = reactExports.useState(String(site.poll_interval_seconds ?? 15));
  const [saving, setSaving] = reactExports.useState(false);
  const save = async () => {
    setSaving(true);
    const value = Number(seconds);
    if (!seconds.trim() || Number.isNaN(value) || value < 5 || value > 3600) {
      setSaving(false);
      return toast.error("Enter a number of seconds between 5 and 3600");
    }
    const {
      error
    } = await supabase.from("sites").update({
      poll_interval_seconds: Math.round(value)
    }).eq("id", site.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Poll interval saved");
    onSaved();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/50 bg-muted/20 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold uppercase tracking-widest text-muted-foreground", children: "ESP32 Poll Interval" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "How often the ESP32 reads meters and sends data. Only affects sketches generated after saving — already-flashed devices need to be reflashed to pick up a change." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: save, disabled: saving, className: "h-8 text-xs font-bold", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }) : null,
        "Save Interval"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: "Poll Interval (seconds)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 5, max: 3600, className: "h-9 bg-background", value: seconds, onChange: (e) => setSeconds(e.target.value), placeholder: "e.g. 15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 px-1", children: "Default is 15 seconds. Longer intervals reduce data freshness but also reduce load on the HMI/PLC and network traffic." })
    ] })
  ] });
}
function WaterAlertSettings({
  site,
  onSaved
}) {
  const [threshold, setThreshold] = reactExports.useState(site.fresh_water_daily_threshold_liters != null ? String(site.fresh_water_daily_threshold_liters) : "");
  const [saving, setSaving] = reactExports.useState(false);
  const save = async () => {
    setSaving(true);
    const value = threshold.trim() ? Number(threshold) : null;
    if (value != null && (Number.isNaN(value) || value < 0)) {
      setSaving(false);
      return toast.error("Enter a valid number of liters");
    }
    const {
      error
    } = await supabase.from("sites").update({
      fresh_water_daily_threshold_liters: value
    }).eq("id", site.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Water alert threshold saved");
    onSaved();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/50 bg-primary/5 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold uppercase tracking-widest text-primary/80", children: "Fresh Water Daily Alert" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Flag this site on the main dashboard if today's fresh water usage exceeds the limit below." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: save, disabled: saving, className: "h-8 text-xs font-bold", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }) : null,
        "Save Threshold"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: "Daily Limit (liters)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, className: "h-9 bg-background", value: threshold, onChange: (e) => setThreshold(e.target.value), placeholder: "e.g. 20000" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 px-1", children: "Leave blank to disable this alert for the site." })
    ] })
  ] });
}
function ReportSettings({
  site,
  onSaved
}) {
  const [hour, setHour] = reactExports.useState(site.report_hour ?? 7);
  const [tz, setTz] = reactExports.useState(site.timezone || "UTC");
  const [recipients, setRecipients] = reactExports.useState((site.report_recipients ?? []).join(", "));
  const [daily, setDaily] = reactExports.useState(site.daily_report_enabled ?? true);
  const [monthly, setMonthly] = reactExports.useState(site.monthly_report_enabled ?? true);
  const [saving, setSaving] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const save = async () => {
    setSaving(true);
    const list = recipients.split(/[,\s;]+/).map((s) => s.trim()).filter(Boolean);
    const bad = list.find((e) => !/.+@.+\..+/.test(e));
    if (bad) {
      setSaving(false);
      return toast.error(`Invalid email address: ${bad}`);
    }
    const {
      error
    } = await supabase.from("sites").update({
      report_hour: hour,
      timezone: tz,
      report_recipients: list,
      daily_report_enabled: daily,
      monthly_report_enabled: monthly
    }).eq("id", site.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Automated report settings saved");
    onSaved();
  };
  const sendTest = async () => {
    setSending(true);
    try {
      await supabase.from("report_send_log").delete().eq("site_id", site.id);
      const res = await fetch(`/api/public/hooks/send-reports?force=${site.id}`, {
        method: "POST"
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Network error");
      toast.success("Test report dispatched successfully!");
    } catch (e) {
      toast.error(e.message ?? "Failed to send test report");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/50 bg-primary/5 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold uppercase tracking-widest text-primary/80", children: "Automated Site Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Scheduled email analytics for site performance." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: sendTest, disabled: sending, className: "h-8 text-xs font-bold bg-background", children: [
          sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-3 w-3" }),
          "Instant Test"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: save, disabled: saving, className: "h-8 text-xs font-bold", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }) : null,
          "Save Schedule"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: "Scheduled Send Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(hour), onValueChange: (v) => setHour(Number(v)), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Array.from({
            length: 24
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(i), children: [
            String(i).padStart(2, "0"),
            ":00 (Site Local)"
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: "Site Timezone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-9 bg-background", value: tz, onChange: (e) => setTz(e.target.value), placeholder: "e.g. Africa/Johannesburg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: "Delivery Recipients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { className: "min-h-[80px] bg-background text-sm", value: recipients, onChange: (e) => setRecipients(e.target.value), placeholder: "manager@wash.com, ops@wash.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 px-1", children: "Multiple addresses supported. Separate with commas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-primary/10 bg-background px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "Daily Intelligence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground", children: [
            "Every morning at ",
            String(hour).padStart(2, "0"),
            ":00"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: daily, onCheckedChange: setDaily })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-primary/10 bg-background px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "Monthly CSV Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "Full site data on the 1st of every month." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: monthly, onCheckedChange: setMonthly })
      ] })
    ] })
  ] });
}
function buildEsp32Sketch(site, meters) {
  const endpoint = `${typeof window !== "undefined" ? window.location.origin : "https://your-deployment-url.com"}/api/public/ingest`;
  const pollIntervalSeconds = site.poll_interval_seconds ?? 15;
  const configured = meters.filter((m) => m.modbus_address != null);
  const missing = meters.filter((m) => m.modbus_address == null);
  const meterEntries = configured.length > 0 ? configured.map((m) => {
    const zeroBased = m.modbus_address - 1;
    const safeName = m.name.replace(/"/g, '\\"');
    const safeKey = m.device_key.replace(/"/g, '\\"');
    return `  { ${zeroBased}, "${safeKey}", "${safeName}" },  // mapping table ${m.modbus_address}`;
  }).join("\n") : "  // No meters have a Modbus Address configured yet — add one for each meter in Admin first.";
  const mappingComment = configured.length > 0 ? configured.map((m) => {
    const addr = m.modbus_address;
    return `//   Modbus Addr ${addr}-${addr + 1}  ->  ${m.name}  (DWORD)  [device_key ${m.device_key}]`;
  }).join("\n") : "//   (no meters configured yet)";
  const missingComment = missing.length > 0 ? "//\n// ⚠ The following meters have NO Modbus Address set in Admin yet, so they\n// are NOT included below. Set each one's HMI Modbus Address in Admin > this\n// site > Meter & Sensor Configuration, then regenerate this sketch:\n" + missing.map((m) => `//   - ${m.name} (device_key ${m.device_key})`).join("\n") + "\n" : "";
  const sketch = `// Auto-generated for site: ${site.name}
// "Bulletproof" version — hardened for unattended field operation.
//
// Reads ${configured.length} meter value(s) from the Delta HMI/PLC over Modbus TCP
// (the HMI acts as a Modbus TCP Server on port 502, exposing PLC
// D-registers via the Modbus TCP Mapping Table configured in DOPSoft),
// then POSTs them over HTTPS to the wash dashboard ingest API.
//
// === MODBUS MAPPING (from DOPSoft Modbus TCP Mapping Table) ===
${mappingComment}
${missingComment}
// IMPORTANT: word order (high/low) for 32-bit values is uncertain.
// This tries LOW-word-first (register N = low 16 bits, N+1 = high 16
// bits), Delta's typical default. If a reading looks wildly wrong vs
// the HMI screen, swap combineWords() to: ((uint32_t)lo << 16) | hi;
//
// NOTE ON MODBUS ADDRESSING: mapping table addresses are 1-based
// (e.g. 3025). The wire protocol is 0-based, so 3025 in the table
// means we request address 3024. This -1 offset is already applied.
//
// === HARDENING NOTES (what makes this "bulletproof") ===
//  1. HTTPS actually works: HTTPClient on ESP32 needs an explicit
//     WiFiClientSecure attached via http.begin(client, url) for
//     https:// URLs to connect reliably. setInsecure() skips cert
//     validation (fine for this use case; the endpoint isn't handling
//     anything more sensitive than meter counts and an API key header).
//  2. Modbus reads retry up to MODBUS_MAX_RETRIES times before a
//     meter is marked failed for this cycle.
//  3. A hardware watchdog reboots the device if the main loop ever
//     stalls (bad socket state, driver lockup, etc.) for more than
//     WDT_TIMEOUT_S seconds.
//  4. WiFi reconnect uses backoff instead of hammering reconnect in
//     a tight loop when WiFi is down for an extended period.
//  5. The Modbus TCP socket is proactively closed/reopened every
//     SOCKET_REFRESH_CYCLES polls, since some Delta HMIs silently
//     let long-held sockets go stale without sending a FIN/RST.
//  6. Offline queue (SPIFFS) still buffers readings if the network
//     or API is down, and is capped at MAX_FILE_LINES.
//
// ============================================================
// TODO BEFORE FLASHING — fill in the values below from the dashboard:
//   1. WIFI_SSID / WIFI_PASS   -> WiFi credentials for this site
//   2. SITE_API_KEY            -> "ws_live_..." key for ${site.name}
//   3. HMI_IP                  -> IP address of the HMI/PLC on this site's LAN
// ============================================================

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <esp_task_wdt.h>

const char* WIFI_SSID    = "";                          // TODO: ${site.name} WiFi SSID
const char* WIFI_PASS    = "";                          // TODO: ${site.name} WiFi password
const char* SITE_API_KEY = "";                          // TODO: dashboard API key for ${site.name} (generate in Admin > this site > API Keys)
const char* INGEST_URL   = "${endpoint}";
const char* QUEUE_FILE   = "/queue.jsonl";

// HMI acting as Modbus TCP Server
const char* HMI_IP = "";   // TODO: ${site.name} HMI/PLC IP, e.g. "192.168.8.10"
const int   MODBUS_PORT = 502;

const unsigned long POLL_INTERVAL_MS   = ${pollIntervalSeconds}UL * 1000UL; // how often to read + send
const int           MAX_FILE_LINES     = 5000;
const int           MODBUS_MAX_RETRIES = 3;              // per-register retry attempts
const int           SOCKET_REFRESH_CYCLES = 40;           // ~10 min at 15s interval
const unsigned long WDT_TIMEOUT_S      = 30;              // reboot if loop stalls this long
const unsigned long WIFI_RETRY_BASE_MS = 2000;            // backoff base for WiFi reconnect
const unsigned long WIFI_RETRY_MAX_MS  = 60000;           // cap backoff at 60s

WiFiClient modbusSocket;
uint16_t modbusTransactionId = 0;
unsigned long lastPollMs = 0;
int pollsSinceSocketOpen = 0;
unsigned long wifiRetryDelay = WIFI_RETRY_BASE_MS;
unsigned long lastWifiAttemptMs = 0;
bool spiffsAvailable = false; // set in setup(); guards all offline-queue file access

// ===== Modbus register map =====
// modbusAddr is already 0-based (mapping table address minus 1).
struct MeterReg {
  int modbusAddr;
  const char* deviceKey;
  const char* label;
};

MeterReg meters[] = {
${meterEntries}
};
const int NUM_METERS = sizeof(meters) / sizeof(meters[0]);

// Combine two 16-bit registers into a 32-bit value.
// Delta typically stores DWORD as LOW word first, HIGH word second.
// If values look wrong once tested, swap to: ((uint32_t)lo << 16) | hi;
uint32_t combineWords(uint16_t lo, uint16_t hi) {
  return ((uint32_t)hi << 16) | lo;
}

// ===== SPIFFS helpers (offline-buffering pattern) =====
// All guarded by spiffsAvailable — if SPIFFS failed to mount in setup(),
// these become no-ops and loop() falls back to sending readings live
// instead of queuing them (see loop() below).
void appendToQueue(uint32_t values[], bool ok[], int count) {
  if (!spiffsAvailable) return;
  File f = SPIFFS.open(QUEUE_FILE, FILE_APPEND);
  if (!f) { Serial.println("Failed to open queue"); return; }
  f.print("{");
  for (int i = 0; i < count; i++) {
    f.printf("\\"v%d\\":%u,\\"ok%d\\":%d", i, values[i], i, ok[i] ? 1 : 0);
    if (i < count - 1) f.print(",");
  }
  f.println("}");
  f.close();
}

int countQueueLines() {
  if (!spiffsAvailable) return 0;
  File f = SPIFFS.open(QUEUE_FILE, FILE_READ);
  if (!f) return 0;
  int c = 0;
  while (f.available()) { f.readStringUntil('\\n'); c++; }
  f.close();
  return c;
}

void removeFirstLines(int n) {
  if (!spiffsAvailable) return;
  File src = SPIFFS.open(QUEUE_FILE, FILE_READ);
  File tmp = SPIFFS.open("/tmp.jsonl", FILE_WRITE);
  if (!src || !tmp) return;
  int skipped = 0;
  while (src.available()) {
    String line = src.readStringUntil('\\n');
    if (skipped < n) { skipped++; continue; }
    if (line.length() > 0) tmp.println(line);
  }
  src.close(); tmp.close();
  SPIFFS.remove(QUEUE_FILE);
  SPIFFS.rename("/tmp.jsonl", QUEUE_FILE);
}

// Builds the ingest JSON payload directly from live meter readings (used
// when SPIFFS isn't available, bypassing the on-disk queue entirely).
String buildPayloadFromLive(uint32_t values[], bool ok[]) {
  String payload = "{\\"readings\\":[";
  bool first = true;
  for (int i = 0; i < NUM_METERS; i++) {
    if (!ok[i]) continue;
    if (!first) payload += ",";
    payload += "{\\"device_key\\":\\"" + String(meters[i].deviceKey) + "\\",\\"value\\":" + String(values[i]) + "}";
    first = false;
  }
  payload += "]}";
  return payload;
}

// ===== WiFi with backoff =====
void connectWifi() {
  if (WiFi.status() == WL_CONNECTED) {
    wifiRetryDelay = WIFI_RETRY_BASE_MS; // reset backoff once healthy
    return;
  }

  unsigned long now = millis();
  if (now - lastWifiAttemptMs < wifiRetryDelay) return; // still backing off
  lastWifiAttemptMs = now;

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting WiFi");
  unsigned long t0 = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - t0 < 10000) {
    delay(250);
    Serial.print(".");
    esp_task_wdt_reset(); // don't let a slow connect trip the watchdog
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(" OK");
    wifiRetryDelay = WIFI_RETRY_BASE_MS;
  } else {
    Serial.println(" FAIL, backing off");
    wifiRetryDelay = min(wifiRetryDelay * 2, WIFI_RETRY_MAX_MS);
  }
}

// ===== HTTPS send (fixed: explicit WiFiClientSecure so https:// actually connects) =====
bool postPayload(const String& payload) {
  WiFiClientSecure client;
  client.setInsecure(); // no cert pinning needed for this endpoint/use case

  HTTPClient http;
  if (!http.begin(client, INGEST_URL)) {
    Serial.println("http.begin() failed");
    return false;
  }
  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-site-api-key", SITE_API_KEY);
  http.setTimeout(8000);
  int code = http.POST(payload);
  http.end();

  if (code == 200) return true;
  Serial.printf("Send failed (HTTP %d)\\n", code);
  return false;
}

void flushQueue() {
  if (!spiffsAvailable) return;
  File f = SPIFFS.open(QUEUE_FILE, FILE_READ);
  if (!f || f.size() == 0) { if (f) f.close(); return; }
  int sent = 0;
  while (f.available()) {
    String line = f.readStringUntil('\\n');
    line.trim();
    if (line.length() == 0) continue;
    StaticJsonDocument<512> doc;
    if (deserializeJson(doc, line)) continue;

    String payload = "{\\"readings\\":[";
    bool first = true;
    for (int i = 0; i < NUM_METERS; i++) {
      char okKey[8];
      snprintf(okKey, sizeof(okKey), "ok%d", i);
      bool wasOk = doc[okKey] | 0;
      if (!wasOk) continue; // skip readings that failed this cycle - don't send bogus 0

      char key[8];
      snprintf(key, sizeof(key), "v%d", i);
      uint32_t val = doc[key];

      if (!first) payload += ",";
      payload += "{\\"device_key\\":\\"" + String(meters[i].deviceKey) + "\\",\\"value\\":" + String(val) + "}";
      first = false;
    }
    payload += "]}";

    if (first) continue; // every reading in this queued line failed

    if (WiFi.status() != WL_CONNECTED) connectWifi();
    if (WiFi.status() != WL_CONNECTED) break;

    if (postPayload(payload)) {
      sent++;
    } else {
      break; // stop on first failure, retry whole remaining queue next cycle
    }
    esp_task_wdt_reset();
  }
  f.close();
  if (sent > 0) {
    Serial.printf("Flushed %d records\\n", sent);
    removeFirstLines(sent);
  }
}

bool ensureModbusConnected(bool forceReconnect = false) {
  if (forceReconnect && modbusSocket.connected()) {
    modbusSocket.stop();
  }
  if (modbusSocket.connected()) return true;

  Serial.print("Connecting to HMI Modbus TCP...");
  if (!modbusSocket.connect(HMI_IP, MODBUS_PORT)) {
    Serial.println(" FAILED");
    return false;
  }
  modbusSocket.setTimeout(2000);
  Serial.println(" OK");
  pollsSinceSocketOpen = 0;
  return true;
}

// Reads \`numRegs\` holding registers starting at \`startAddr\` (0-based)
// from the Modbus TCP server. Writes results into outRegs[]. Returns
// true on success.
bool modbusReadHoldingRegistersOnce(uint16_t startAddr, uint16_t numRegs, uint16_t outRegs[]) {
  if (!ensureModbusConnected()) return false;

  // Flush any stale/leftover bytes sitting in the socket buffer from a
  // previous slow response before sending a new request.
  while (modbusSocket.available()) {
    modbusSocket.read();
  }

  modbusTransactionId++;

  // Build the Modbus TCP request frame (MBAP header + PDU)
  uint8_t request[12];
  request[0] = (modbusTransactionId >> 8) & 0xFF; // Transaction ID hi
  request[1] = modbusTransactionId & 0xFF;        // Transaction ID lo
  request[2] = 0x00;                              // Protocol ID hi (always 0)
  request[3] = 0x00;                              // Protocol ID lo (always 0)
  request[4] = 0x00;                              // Length hi
  request[5] = 0x06;                              // Length lo (6 bytes follow)
  request[6] = 0x01;                              // Unit ID (station number)
  request[7] = 0x03;                              // Function code: Read Holding Registers
  request[8] = (startAddr >> 8) & 0xFF;           // Start address hi
  request[9] = startAddr & 0xFF;                  // Start address lo
  request[10] = (numRegs >> 8) & 0xFF;            // Quantity hi
  request[11] = numRegs & 0xFF;                   // Quantity lo

  modbusSocket.write(request, sizeof(request));

  // Expected response: 9-byte header/prefix + 2 bytes per register
  int expectedLen = 9 + (numRegs * 2);
  uint8_t response[64];
  int received = 0;
  unsigned long t0 = millis();
  while (received < expectedLen && millis() - t0 < 2000) {
    if (modbusSocket.available()) {
      int n = modbusSocket.read(response + received, expectedLen - received);
      if (n > 0) received += n;
    } else {
      delay(2);
    }
  }

  if (received < expectedLen) {
    Serial.printf("Modbus read timeout (got %d of %d bytes)\\n", received, expectedLen);
    modbusSocket.stop(); // force reconnect next attempt
    return false;
  }

  // response[7] = function code (should echo 0x03, or 0x83 if error)
  if (response[7] == 0x83) {
    Serial.printf("Modbus exception code: 0x%02X\\n", response[8]);
    return false;
  }
  if (response[7] != 0x03) {
    Serial.println("Unexpected Modbus function code in response");
    return false;
  }

  // response[8] = byte count, response[9..] = register data (big-endian per register)
  for (int i = 0; i < numRegs; i++) {
    uint8_t hiByte = response[9 + (i * 2)];
    uint8_t loByte = response[9 + (i * 2) + 1];
    outRegs[i] = ((uint16_t)hiByte << 8) | loByte;
  }
  return true;
}

// Retries a register read up to MODBUS_MAX_RETRIES times, forcing a
// fresh socket connection between attempts.
bool modbusReadHoldingRegisters(uint16_t startAddr, uint16_t numRegs, uint16_t outRegs[]) {
  for (int attempt = 1; attempt <= MODBUS_MAX_RETRIES; attempt++) {
    if (modbusReadHoldingRegistersOnce(startAddr, numRegs, outRegs)) return true;
    Serial.printf("  retry %d/%d for addr %u\\n", attempt, MODBUS_MAX_RETRIES, startAddr);
    ensureModbusConnected(true); // force reconnect before next attempt
    delay(150);
    esp_task_wdt_reset();
  }
  return false;
}

bool readAllMeters(uint32_t outValues[], bool outOk[]) {
  bool anyOk = false;

  // Proactively refresh the socket periodically — some Delta HMIs let
  // long-held Modbus sockets go stale without a clean FIN/RST.
  pollsSinceSocketOpen++;
  if (pollsSinceSocketOpen >= SOCKET_REFRESH_CYCLES) {
    Serial.println("Refreshing Modbus socket (periodic maintenance)");
    ensureModbusConnected(true);
  }

  for (int i = 0; i < NUM_METERS; i++) {
    uint16_t regs[2];
    if (!modbusReadHoldingRegisters((uint16_t)meters[i].modbusAddr, 2, regs)) {
      Serial.printf("%s: read failed after retries\\n", meters[i].label);
      outValues[i] = 0;
      outOk[i] = false;
      delay(100);
      esp_task_wdt_reset();
      continue;
    }

    uint16_t lo = regs[0];
    uint16_t hi = regs[1];
    outValues[i] = combineWords(lo, hi);
    outOk[i] = true;
    anyOk = true;

    Serial.printf("%s (Modbus addr %d): raw lo=%u hi=%u -> value=%u\\n",
                  meters[i].label, meters[i].modbusAddr + 1, lo, hi, outValues[i]);

    delay(100); // brief pause between requests, avoids overlapping/stale responses
    esp_task_wdt_reset();
  }
  return anyOk; // true if AT LEAST ONE meter was read successfully this cycle
}

void setup() {
  Serial.begin(115200);
  delay(500);

  // Hardware watchdog: reboot automatically if the loop ever stalls.
  //
  // NOTE: newer Arduino-ESP32 cores (3.x, ESP-IDF 5.x) already auto-init the
  // Task Watchdog Timer for the idle tasks before setup() ever runs. Calling
  // esp_task_wdt_init() again on top of that returns ESP_ERR_INVALID_STATE
  // ("TWDT already initialized") — reconfigure the existing one instead of
  // treating that as a fatal error.
  esp_task_wdt_config_t wdtConfig = {
    .timeout_ms = WDT_TIMEOUT_S * 1000,
    .idle_core_mask = 0,
    .trigger_panic = true
  };
  esp_err_t wdtInitErr = esp_task_wdt_init(&wdtConfig);
  if (wdtInitErr == ESP_ERR_INVALID_STATE) {
    esp_task_wdt_reconfigure(&wdtConfig);
  } else if (wdtInitErr != ESP_OK) {
    Serial.printf("WDT init returned %d (continuing)\\n", wdtInitErr);
  }
  esp_err_t wdtAddErr = esp_task_wdt_add(NULL);
  if (wdtAddErr != ESP_OK && wdtAddErr != ESP_ERR_INVALID_ARG) {
    Serial.printf("WDT add returned %d (continuing)\\n", wdtAddErr);
  }

  // SPIFFS mount, with an explicit format-and-retry if the first mount
  // fails (error -10025 / SPIFFS_ERR_NOT_A_FS means the flash region isn't
  // a valid filesystem yet — first boot on a fresh chip, or the previous
  // partition table used a different filesystem there).
  //
  // If SPIFFS still isn't available after that (e.g. the board's Partition
  // Scheme in Tools menu doesn't actually allocate a SPIFFS partition), the
  // device keeps running WITHOUT the offline queue: readings are sent live
  // each cycle and simply dropped (not buffered) if the network is down,
  // rather than the whole device being non-functional.
  if (SPIFFS.begin(true)) {
    spiffsAvailable = true;
  } else {
    Serial.println("SPIFFS mount failed, formatting...");
    if (SPIFFS.format() && SPIFFS.begin(true)) {
      spiffsAvailable = true;
      Serial.println("SPIFFS formatted and mounted OK");
    } else {
      spiffsAvailable = false;
      Serial.println("SPIFFS unavailable — running WITHOUT offline queue buffering.");
      Serial.println("Check Tools > Partition Scheme in Arduino IDE: pick a scheme that includes a SPIFFS partition (e.g. 'Default 4MB with spiffs').");
    }
  }
  if (spiffsAvailable) {
    Serial.printf("SPIFFS OK — %u bytes free\\n", SPIFFS.totalBytes() - SPIFFS.usedBytes());
  }

  connectWifi();
}

void loop() {
  esp_task_wdt_reset();

  if (WiFi.status() != WL_CONNECTED) connectWifi();

  unsigned long now = millis();
  if (now - lastPollMs >= POLL_INTERVAL_MS) {
    lastPollMs = now;

    uint32_t values[NUM_METERS];
    bool ok[NUM_METERS];
    readAllMeters(values, ok); // fills what it can; failed reads are marked not-ok

    if (spiffsAvailable) {
      if (countQueueLines() >= MAX_FILE_LINES) removeFirstLines(100);
      appendToQueue(values, ok, NUM_METERS);
      flushQueue();
    } else {
      // No offline buffering available this boot — send directly. If this
      // fails (WiFi/API down), this cycle's reading is simply skipped
      // rather than queued, since there's nowhere to persist it.
      bool anyOk = false;
      for (int i = 0; i < NUM_METERS; i++) if (ok[i]) { anyOk = true; break; }
      if (anyOk && WiFi.status() == WL_CONNECTED) {
        postPayload(buildPayloadFromLive(values, ok));
      }
    }
  }

  delay(10);
}
`;
  return sketch;
}
function EspSketchDialog({
  site,
  meters,
  onClose
}) {
  const code = site ? buildEsp32Sketch(site, meters) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!site, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] flex flex-col gap-4 overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-5 w-5 text-primary" }),
      "ESP32 Configuration Script — ",
      site?.name
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground shrink-0 leading-relaxed", children: [
      "Copy the code below into the Arduino IDE. Ensure you have the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ESP32 Board Library" }),
      " installed. Wire your pulse counters or level sensors to the designated GPIO pins and map them to the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "TODO" }),
      " variables at the bottom of the sketch."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative overflow-hidden rounded-lg border border-border bg-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { readOnly: true, value: code, className: "font-mono text-[11px] h-full w-full resize-none bg-transparent p-6 leading-relaxed", spellCheck: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "absolute right-4 top-4 shadow-lg h-8 px-4 font-bold", onClick: () => {
        navigator.clipboard.writeText(code);
        toast.success("Sketch copied to clipboard");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 mr-2" }),
        " Copy to Clipboard"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "shrink-0 border-t pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, className: "h-9 font-semibold", children: "Close" }) })
  ] }) });
}
function UsersPanel({
  currentUserId
}) {
  const list = useServerFn(listAllUsers);
  const setRole = useServerFn(setUserRole);
  const del = useServerFn(deleteUser);
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [busyId, setBusyId] = reactExports.useState(null);
  const load = async () => {
    setLoading(true);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      const token = session?.access_token ?? "";
      const data = await list({
        data: {
          __token: token
        }
      });
      setUsers(data);
    } catch (e) {
      toast.error(e.message ?? "Failed to load users");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    void load();
  }, []);
  const changeRole = async (userId, role) => {
    setBusyId(userId);
    try {
      const {
        data: {
          session: s1
        }
      } = await supabase.auth.getSession();
      await setRole({
        data: {
          userId,
          role,
          __token: s1?.access_token ?? ""
        }
      });
      toast.success(role === "none" ? "Access revoked" : `Set as ${role}`);
      await load();
    } catch (e) {
      toast.error(e.message ?? "Failed");
    } finally {
      setBusyId(null);
    }
  };
  const removeUser = async (userId, email) => {
    if (!confirm(`Permanently delete ${email}? This cannot be undone.`)) return;
    setBusyId(userId);
    try {
      const {
        data: {
          session: s2
        }
      } = await supabase.auth.getSession();
      await del({
        data: {
          userId,
          __token: s2?.access_token ?? ""
        }
      });
      toast.success("User deleted");
      await load();
    } catch (e) {
      toast.error(e.message ?? "Failed");
    } finally {
      setBusyId(null);
    }
  };
  const pending = users.filter((u) => u.roles.length === 0);
  const approved = users.filter((u) => u.roles.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-sm border-l-4 border-l-amber-500/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-lg", children: "User Access Control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approve new sign-ups and manage roles." })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "ml-auto h-4 w-4 animate-spin text-muted-foreground" })
    ] }),
    pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
        " Pending Approval (",
        pending.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pending.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user: u, busy: busyId === u.id, currentUserId, onApprove: (role) => changeRole(u.id, role), onRevoke: () => changeRole(u.id, "none"), onDelete: () => removeUser(u.id, u.email), isPending: true }, u.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2", children: [
        "Approved Users (",
        approved.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        approved.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user: u, busy: busyId === u.id, currentUserId, onApprove: (role) => changeRole(u.id, role), onRevoke: () => changeRole(u.id, "none"), onDelete: () => removeUser(u.id, u.email) }, u.id)),
        approved.length === 0 && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic py-3", children: "No approved users yet." })
      ] })
    ] })
  ] });
}
function UserRow({
  user,
  busy,
  currentUserId,
  onApprove,
  onRevoke,
  onDelete,
  isPending
}) {
  const isSelf = user.id === currentUserId;
  const [sitesOpen, setSitesOpen] = reactExports.useState(false);
  const isOperator = user.roles.includes("operator");
  const isAdmin = user.roles.includes("admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-lg border px-4 py-3 ${isPending ? "border-amber-500/30 bg-amber-500/5" : "border-border bg-background"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate", children: user.email }),
        isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded", children: "You" }),
        user.roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${r === "admin" ? "bg-violet-500/10 text-violet-500" : "bg-emerald-500/10 text-emerald-500"}`, children: r }, r))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
        "Joined ",
        new Date(user.created_at).toLocaleDateString(),
        user.last_sign_in_at && ` · Last seen ${new Date(user.last_sign_in_at).toLocaleDateString()}`
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 flex-wrap", children: [
      busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }),
      isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "default", disabled: busy, onClick: () => onApprove("operator"), className: "h-8 text-xs gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3 w-3" }),
          " Approve"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", disabled: busy, onClick: () => onApprove("admin"), className: "h-8 text-xs", children: "Approve as Admin" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        isOperator && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setSitesOpen(true), className: "h-8 text-xs gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
          " Sites"
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground italic px-2", children: "All sites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { disabled: busy || isSelf, value: user.roles[0] ?? "none", onValueChange: (v) => {
          if (v === "none") onRevoke();
          else onApprove(v);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-32 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "operator", children: "Operator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Revoke access" })
          ] })
        ] })
      ] }),
      !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", disabled: busy, onClick: onDelete, className: "h-8 w-8 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteAccessDialog, { open: sitesOpen, onOpenChange: setSitesOpen, userId: user.id, userEmail: user.email })
  ] });
}
function SiteAccessDialog({
  open,
  onOpenChange,
  userId,
  userEmail
}) {
  const [sites, setSites] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [loading, setLoading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) return;
    setLoading(true);
    (async () => {
      try {
        const [{
          data: s,
          error: sErr
        }, {
          data: a,
          error: aErr
        }] = await Promise.all([supabase.from("sites").select("id,name,location").order("name"), supabase.from("site_operators").select("site_id").eq("user_id", userId)]);
        if (sErr) throw sErr;
        if (aErr) throw aErr;
        setSites(s ?? []);
        setSelected(new Set((a ?? []).map((r) => r.site_id)));
      } catch (e) {
        toast.error(e.message ?? "Failed to load sites");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, userId]);
  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const save = async () => {
    setSaving(true);
    try {
      const {
        error: delErr
      } = await supabase.from("site_operators").delete().eq("user_id", userId);
      if (delErr) throw delErr;
      const rows = Array.from(selected).map((site_id) => ({
        user_id: userId,
        site_id
      }));
      if (rows.length > 0) {
        const {
          error: insErr
        } = await supabase.from("site_operators").insert(rows);
        if (insErr) throw insErr;
      }
      toast.success(`Site access updated (${rows.length} site${rows.length === 1 ? "" : "s"})`);
      onOpenChange(false);
    } catch (e) {
      toast.error(e.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary" }),
      "Site Access"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Select which sites ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: userEmail }),
      " can view on their dashboard."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[50vh] overflow-y-auto rounded-lg border border-border divide-y divide-border", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mx-auto text-muted-foreground" }) }) : sites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-xs text-muted-foreground italic", children: "No sites registered yet." }) : sites.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: selected.has(s.id), onCheckedChange: () => toggle(s.id) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium truncate", children: s.name }),
        s.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: s.location })
      ] })
    ] }, s.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), disabled: saving, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving || loading, children: [
        saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Save Access (",
        selected.size,
        ")"
      ] })
    ] })
  ] }) });
}
export {
  AdminPage as component
};
