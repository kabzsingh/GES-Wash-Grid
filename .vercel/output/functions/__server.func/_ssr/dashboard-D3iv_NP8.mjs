import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-BErA7MhY.mjs";
import { useAuth, useTheme, Button } from "./router-zrMmobBP.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { l as Moon, s as Sun, k as MapPin, R as Radio, G as Gauge, t as TrendingUp, u as TriangleAlert, g as Droplets, A as Activity } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "outline",
      size: "icon",
      onClick: toggleTheme,
      className: "rounded-lg w-10 h-10",
      title: `Switch to ${theme === "light" ? "dark" : "light"} mode`,
      children: theme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-slate-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-slate-400" })
    }
  );
}
function DashboardPage() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const [sites, setSites] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (authLoading) return;
    loadDashboard();
  }, [authLoading]);
  const loadDashboard = async () => {
    try {
      const {
        data: adminCheck
      } = await supabase.from("user_roles").select("role").eq("user_id", user?.id).eq("role", "admin").single();
      let siteIds = [];
      if (adminCheck) {
        const {
          data: allSites
        } = await supabase.from("sites").select("id");
        siteIds = (allSites || []).map((s) => s.id);
      } else {
        const [{
          data: operatorSites
        }, {
          data: userSites
        }] = await Promise.all([supabase.from("site_operators").select("site_id").eq("user_id", user?.id), supabase.from("user_access").select("site_id").eq("user_id", user?.id)]);
        const combined = /* @__PURE__ */ new Set([...(operatorSites || []).map((s) => s.site_id), ...(userSites || []).map((s) => s.site_id)]);
        siteIds = Array.from(combined);
      }
      if (siteIds.length === 0) {
        setSites([]);
        setLoading(false);
        return;
      }
      const {
        data: sitesData
      } = await supabase.from("sites").select("id, name, location, machine_type, logo_url, created_at, fresh_water_daily_threshold_liters, primary_color, secondary_color, accent_color").in("id", siteIds);
      if (!sitesData) {
        setSites([]);
        setLoading(false);
        return;
      }
      const metricsPromises = sitesData.map(async (site) => {
        const todayMidnight = /* @__PURE__ */ new Date();
        todayMidnight.setHours(0, 0, 0, 0);
        const midnightISO = todayMidnight.toISOString();
        const isNewToday = new Date(site.created_at).getTime() >= todayMidnight.getTime();
        const {
          data: latest
        } = await supabase.from("readings").select("meter_id, value, recorded_at").eq("site_id", site.id).order("recorded_at", {
          ascending: false
        }).limit(50);
        const {
          data: midnightReadings
        } = await supabase.from("readings").select("meter_id, value, recorded_at").eq("site_id", site.id).lte("recorded_at", midnightISO).order("recorded_at", {
          ascending: false
        }).limit(100);
        const {
          data: meters
        } = await supabase.from("site_meters").select("id, meter_type, sensor_type, low_threshold, count_for_avg_water").eq("site_id", site.id);
        const {
          data: activeLowEvents
        } = await supabase.from("chemical_low_events").select("meter_id").eq("site_id", site.id).is("topped_up_at", null);
        const activeLowMeterIds = new Set((activeLowEvents ?? []).map((e) => e.meter_id));
        let washToday = 0, washTotal = 0, freshToday = 0, freshTotal = 0, chemLow = 0, chemTotal = 0, avgWaterToday = 0;
        let lastSeen = "";
        const meterMap = new Map(meters?.map((m) => [m.id, m]) || []);
        const latestByMeter = /* @__PURE__ */ new Map();
        const midnightByMeter = /* @__PURE__ */ new Map();
        (latest || []).forEach((r) => {
          if (!latestByMeter.has(r.meter_id)) {
            latestByMeter.set(r.meter_id, r);
          }
          if (!lastSeen || r.recorded_at > lastSeen) lastSeen = r.recorded_at;
        });
        (midnightReadings || []).forEach((r) => {
          if (!midnightByMeter.has(r.meter_id)) {
            midnightByMeter.set(r.meter_id, r);
          }
        });
        latestByMeter.forEach((latestReading, meterId) => {
          const meter = meterMap.get(meterId);
          if (!meter) return;
          const latestValue = Number(latestReading.value);
          const midnightValue = midnightByMeter.has(meterId) ? Number(midnightByMeter.get(meterId).value) : 0;
          if (meter.meter_type === "wash") {
            washTotal += latestValue;
            washToday += Math.max(0, latestValue - midnightValue);
          } else if (meter.meter_type === "fresh_water") {
            const deltaToday = Math.max(0, latestValue - midnightValue);
            freshToday += deltaToday;
            freshTotal += latestValue;
            if (meter.count_for_avg_water) avgWaterToday += deltaToday;
          } else if (meter.meter_type === "chemical") {
            chemTotal++;
            if (meter.sensor_type === "probe") {
              if (meter.low_threshold != null && latestValue < Number(meter.low_threshold)) chemLow++;
            } else {
              if (activeLowMeterIds.has(meterId)) chemLow++;
            }
          }
        });
        const now = (/* @__PURE__ */ new Date()).getTime();
        const lastSeenTime = lastSeen ? new Date(lastSeen).getTime() : 0;
        const online = now - lastSeenTime < 5 * 60 * 1e3;
        return {
          id: site.id,
          name: site.name,
          location: site.location,
          machine_type: site.machine_type,
          primary_color: site.primary_color,
          secondary_color: site.secondary_color,
          accent_color: site.accent_color,
          logo_url: site.logo_url,
          online,
          wash_today: washToday,
          wash_total: washTotal,
          fresh_today: freshToday,
          fresh_total: freshTotal,
          chemicals_total: chemTotal,
          chemicals_low: chemLow,
          is_new_today: isNewToday,
          fresh_water_alert: site.fresh_water_daily_threshold_liters != null && freshToday > Number(site.fresh_water_daily_threshold_liters),
          avg_water_per_car: washToday > 0 ? avgWaterToday / washToday : null
        };
      });
      const results = await Promise.all(metricsPromises);
      setSites(results.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (e) {
      console.error("Failed to load dashboard:", e);
    } finally {
      setLoading(false);
    }
  };
  if (authLoading || loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-48 bg-muted rounded animate-pulse mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 bg-muted rounded-lg animate-pulse" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight text-foreground", children: "Operations Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Real-time monitoring of all wash sites" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
    ] }),
    sites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 bg-card rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "No sites configured yet" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: sites.map((site) => /* @__PURE__ */ jsxRuntimeExports.jsx(SiteCard, { site }, site.id)) })
  ] });
}
function SiteCard({
  site
}) {
  const chemicalHealthy = site.chemicals_total === 0 || site.chemicals_low === 0;
  const themeStyle = {};
  if (site.primary_color) themeStyle["--primary"] = site.primary_color;
  if (site.secondary_color) themeStyle["--secondary"] = site.secondary_color;
  if (site.accent_color) themeStyle["--accent"] = site.accent_color;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sites/$siteId", params: {
    siteId: site.id
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all h-full cursor-pointer overflow-hidden", style: themeStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full transition-all ${site.online ? "bg-emerald-500 w-full" : "bg-muted-foreground/40 w-1/4"}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg", children: site.name }),
        site.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: site.location })
        ] }),
        site.machine_type && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground/70 mt-0.5 truncate", children: site.machine_type })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: `h-3 w-3 ${site.online ? "text-emerald-500 fill-emerald-500" : "text-muted-foreground fill-slate-500"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: site.online ? "text-emerald-400 font-medium" : "text-muted-foreground", children: site.online ? "Live" : "Offline" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-4 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "h-4 w-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: site.is_new_today ? "Since Setup" : "Today" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: site.wash_today }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "washes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-4 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Total Wash Counts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: Math.round(site.wash_total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "washes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg p-4 border ${site.fresh_water_alert ? "bg-red-950/40 border-red-500/60" : "bg-muted border-border"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            site.fresh_water_alert ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] font-semibold uppercase tracking-wide ${site.fresh_water_alert ? "text-red-300" : "text-muted-foreground"}`, children: [
              "Fresh Water Usage Today",
              site.fresh_water_alert ? " – High" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${site.fresh_water_alert ? "text-red-300" : "text-foreground"}`, children: Math.round(site.fresh_today) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs mt-1 ${site.fresh_water_alert ? "text-red-300/80" : "text-cyan-400"}`, children: site.is_new_today ? "liters since setup" : "liters" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-4 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Total Fresh Water" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: Math.round(site.fresh_total) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "liters" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg p-4 border ${chemicalHealthy ? "bg-muted border-border" : "bg-amber-900 border-amber-700"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            chemicalHealthy ? /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-cyan-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Chem" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${chemicalHealthy ? "text-foreground" : "text-amber-100"}`, children: site.chemicals_total === 0 ? "—" : chemicalHealthy ? "✓" : site.chemicals_low }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs mt-1 ${chemicalHealthy ? "text-cyan-400" : "text-amber-400"}`, children: site.chemicals_total === 0 ? "no meters" : chemicalHealthy ? "all ok" : `${site.chemicals_low} low` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-4 border border-border mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: "Avg Water / Car" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: site.avg_water_per_car !== null ? site.avg_water_per_car.toFixed(1) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cyan-400 mt-1", children: site.avg_water_per_car !== null ? "L per wash today" : "set meter(s) in Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm font-medium text-muted-foreground group-hover:text-cyan-400 transition-colors pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4", children: "View details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg group-hover:translate-x-1 transition-transform mt-4", children: "→" })
      ] })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
