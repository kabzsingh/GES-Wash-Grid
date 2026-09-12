import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-BErA7MhY.mjs";
import { Route as Route$2, Button, cn, useAuth, Input } from "./router-zrMmobBP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { a as ArrowLeft, F as FileText, R as Radio, G as Gauge, A as Activity, u as TriangleAlert, g as Droplets, t as TrendingUp, m as Pencil } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, a as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Line } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function MeterCard({
  name,
  meterType,
  value,
  unit,
  capacity,
  lowThreshold,
  today,
  total
}) {
  const Icon = meterType === "fresh_water" ? Droplets : Gauge;
  const typeColor = meterType === "wash" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : meterType === "fresh_water" ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400" : "bg-purple-500/15 text-purple-600 dark:text-purple-400";
  const typeBorder = meterType === "wash" ? "border-blue-200 dark:border-blue-800" : meterType === "fresh_water" ? "border-cyan-200 dark:border-cyan-800" : "border-purple-200 dark:border-purple-800";
  const typeLabel = meterType === "wash" ? "Wash" : meterType === "fresh_water" ? "Fresh Water" : "Chemical";
  const isWash = meterType === "wash";
  const fmt = (n) => isWash ? Math.round(n).toLocaleString() : n.toFixed(1);
  const unitLabel = isWash ? "washes" : unit;
  const percentage = capacity && capacity > 0 ? value / capacity * 100 : null;
  const isLow = lowThreshold !== null && lowThreshold !== void 0 && value <= lowThreshold;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-lg border bg-card p-4 shadow-card transition-all hover:shadow-glow",
        typeBorder
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: typeLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold truncate", children: name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-8 w-8 rounded-md grid place-items-center", typeColor), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
        ] }),
        today == null && total == null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold tabular-nums", children: [
            fmt(value),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: unitLabel })
          ] }),
          capacity && !isWash && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
            "Capacity: ",
            capacity,
            unit
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-3 text-xs", children: [
          today != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary/60 px-2 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold tabular-nums", children: [
              fmt(today),
              " ",
              unitLabel
            ] })
          ] }),
          total != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-secondary/60 px-2 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold tabular-nums", children: [
              fmt(total),
              " ",
              unitLabel
            ] })
          ] })
        ] }),
        capacity && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-secondary overflow-hidden mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "h-full transition-all",
                isLow ? "bg-destructive" : "bg-gradient-primary"
              ),
              style: { width: `${Math.min(100, percentage || 0)}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            Math.round(percentage || 0),
            "% full"
          ] })
        ] }),
        isLow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 px-2 py-1 bg-destructive/15 rounded text-xs font-medium text-destructive", children: "⚠ Low level alert" })
      ]
    }
  );
}
function SiteDetail() {
  const {
    siteId
  } = Route$2.useParams();
  const navigate = useNavigate();
  const [site, setSite] = reactExports.useState(null);
  const [meters, setMeters] = reactExports.useState([]);
  const [readings, setReadings] = reactExports.useState([]);
  const [totals, setTotals] = reactExports.useState({});
  const [todays, setTodays] = reactExports.useState({});
  const [liveEntries, setLiveEntries] = reactExports.useState([]);
  const [lastSeenTs, setLastSeenTs] = reactExports.useState(null);
  const [esp32LastSeen, setEsp32LastSeen] = reactExports.useState(null);
  const [now, setNow] = reactExports.useState(() => Date.now());
  const [chemLowEvents, setChemLowEvents] = reactExports.useState([]);
  const [dayBaseline, setDayBaseline] = reactExports.useState({});
  const [washAtLow, setWashAtLow] = reactExports.useState({});
  const lastKnownWashesSinceLowRef = reactExports.useRef({});
  const [washTrendData, setWashTrendData] = reactExports.useState([]);
  const [waterTrendData, setWaterTrendData] = reactExports.useState([]);
  const [chemicalFillHistory, setChemicalFillHistory] = reactExports.useState([]);
  const dayBaselineRef = reactExports.useRef({});
  reactExports.useEffect(() => {
    dayBaselineRef.current = dayBaseline;
  }, [dayBaseline]);
  const metersRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    metersRef.current = meters;
  }, [meters]);
  reactExports.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, []);
  const load = async () => {
    const [{
      data: s
    }, {
      data: m
    }, {
      data: apiKeys
    }] = await Promise.all([supabase.from("sites").select("name,location,machine_type,fresh_water_daily_threshold_liters,primary_color,secondary_color,accent_color").eq("id", siteId).single(), supabase.from("site_meters").select("id,meter_type,name,unit,capacity,low_threshold,device_key,position,chemical_group,sensor_type,count_for_avg_water").eq("site_id", siteId).order("position"), supabase.from("site_api_keys").select("last_used_at").eq("site_id", siteId).order("last_used_at", {
      ascending: false
    }).limit(1)]);
    setSite(s);
    const keyLastUsed = apiKeys?.[0]?.last_used_at ?? null;
    setEsp32LastSeen(keyLastUsed);
    setMeters(m ?? []);
    const since = new Date(Date.now() - 24 * 60 * 6e4).toISOString();
    const startOfDay = /* @__PURE__ */ new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const {
      data: r
    } = await supabase.from("readings").select("meter_id,value,recorded_at").eq("site_id", siteId).gte("recorded_at", since).order("recorded_at", {
      ascending: true
    }).limit(5e3);
    const rows = r ?? [];
    const chemMetersForSeed = (m ?? []).filter((x) => x.meter_type === "chemical" || x.meter_type === "chemical_flow");
    if (chemMetersForSeed.length > 0) {
      const latestChemReadings = await Promise.all(chemMetersForSeed.map((cm) => supabase.from("readings").select("meter_id,value,recorded_at").eq("meter_id", cm.id).order("recorded_at", {
        ascending: false
      }).limit(1).then((res) => res.data?.[0])));
      for (const lr of latestChemReadings) {
        if (lr) rows.push(lr);
      }
    }
    setReadings(rows);
    const chemMeters = (m ?? []).filter((x) => x.meter_type === "chemical");
    const {
      data: activeEvents
    } = await supabase.from("chemical_low_events").select("meter_id, went_low_at").eq("site_id", siteId).is("topped_up_at", null);
    const newLowEvents = (activeEvents ?? []).filter((e) => chemMeters.some((cm) => cm.id === e.meter_id)).map((e) => ({
      meter_id: e.meter_id,
      low_since: e.went_low_at
    }));
    setChemLowEvents(newLowEvents);
    const washMeter = (m ?? []).find((x) => x.meter_type === "wash");
    const newWashAtLow = {};
    if (washMeter) {
      for (const evt of newLowEvents) {
        const {
          data: wNearLow
        } = await supabase.from("readings").select("value").eq("meter_id", washMeter.id).lte("recorded_at", evt.low_since).order("recorded_at", {
          ascending: false
        }).limit(1);
        const wVal = wNearLow?.[0]?.value;
        if (wVal !== void 0) newWashAtLow[evt.meter_id] = Number(wVal);
      }
    }
    setWashAtLow(newWashAtLow);
    const seedMeters = m ?? [];
    const meterMap = new Map(seedMeters.map((x) => [x.id, x]));
    const seed = [...rows].sort((a, b) => b.recorded_at.localeCompare(a.recorded_at)).slice(0, 15).map((row, i) => {
      const mt = meterMap.get(row.meter_id);
      return {
        id: `seed-${i}-${row.meter_id}-${row.recorded_at}`,
        meter_id: row.meter_id,
        meter_name: mt?.name ?? "Unknown",
        meter_type: mt?.meter_type ?? "wash",
        unit: mt?.unit ?? "",
        value: Number(row.value),
        recorded_at: row.recorded_at
      };
    });
    setLiveEntries(seed);
    if (rows.length > 0) setLastSeenTs(rows[rows.length - 1].recorded_at);
    const absMeters = (m ?? []).filter((x) => x.meter_type === "wash" || x.meter_type === "fresh_water");
    const newBaseline = {};
    const absTotals = {};
    for (const am of absMeters) {
      const [{
        data: br
      }, {
        data: lr
      }] = await Promise.all([supabase.from("readings").select("value").eq("meter_id", am.id).lt("recorded_at", startOfDay.toISOString()).order("recorded_at", {
        ascending: false
      }).limit(1), supabase.from("readings").select("value").eq("meter_id", am.id).order("recorded_at", {
        ascending: false
      }).limit(1)]);
      const bv = br?.[0]?.value;
      if (bv !== void 0) newBaseline[am.id] = Number(bv);
      const lv = lr?.[0]?.value;
      if (lv !== void 0) absTotals[am.id] = Number(lv);
    }
    setDayBaseline(newBaseline);
    const [{
      data: sumSinceMidnight
    }, {
      data: allTime
    }] = await Promise.all([supabase.rpc("meter_totals_since", {
      _site_id: siteId,
      _since: startOfDay.toISOString()
    }), supabase.rpc("meter_totals", {
      _site_id: siteId
    })]);
    const todaysMap = {};
    const totalsMap = {};
    for (const row of sumSinceMidnight ?? []) todaysMap[row.meter_id] = Number(row.total) || 0;
    for (const row of allTime ?? []) totalsMap[row.meter_id] = Number(row.total) || 0;
    for (const am of absMeters) {
      const latest = absTotals[am.id];
      if (latest === void 0) continue;
      const baseline = newBaseline[am.id] ?? 0;
      totalsMap[am.id] = latest;
      todaysMap[am.id] = Math.max(0, latest - baseline);
    }
    setTodays(todaysMap);
    setTotals(totalsMap);
    const dayCutoffs = [];
    for (let i = 7; i >= 0; i--) {
      const c = /* @__PURE__ */ new Date();
      c.setDate(c.getDate() - i);
      if (i === 0) ;
      else {
        c.setHours(23, 59, 59, 999);
      }
      dayCutoffs.push(c);
    }
    const lastValueAtOrBefore = async (meterId, cutoff) => {
      const {
        data
      } = await supabase.from("readings").select("value,recorded_at").eq("meter_id", meterId).lte("recorded_at", cutoff.toISOString()).order("recorded_at", {
        ascending: false
      }).limit(1);
      return data && data.length > 0 ? {
        value: Number(data[0].value),
        recorded_at: data[0].recorded_at
      } : null;
    };
    const dailyDeltas = (points) => {
      const result = [];
      for (let i = 1; i < points.length; i++) {
        const cur = points[i];
        const prev = points[i - 1];
        if (!cur) continue;
        const prevValue = prev ? prev.value : cur.value;
        result.push({
          time: dayCutoffs[i].toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          value: Math.max(0, cur.value - prevValue)
        });
      }
      return result;
    };
    const washMeterForTrend = m?.find((x) => x.meter_type === "wash");
    if (washMeterForTrend) {
      const points = await Promise.all(dayCutoffs.map((c) => lastValueAtOrBefore(washMeterForTrend.id, c)));
      const trendData = dailyDeltas(points).map((d) => ({
        time: d.time,
        washes: d.value
      }));
      setWashTrendData(trendData);
    }
    const waterMetersForTrend = (m ?? []).filter((x) => x.meter_type === "fresh_water");
    if (waterMetersForTrend.length > 0) {
      const perMeterTrends = await Promise.all(waterMetersForTrend.map(async (wm) => {
        const points = await Promise.all(dayCutoffs.map((c) => lastValueAtOrBefore(wm.id, c)));
        return dailyDeltas(points);
      }));
      const combined = dayCutoffs.slice(1).map((c, i) => ({
        time: c.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        }),
        liters: perMeterTrends.reduce((sum, trend) => sum + (trend[i]?.value ?? 0), 0)
      }));
      setWaterTrendData(combined);
    }
    const chemMetersForTrend = m?.filter((x) => x.meter_type === "chemical") ?? [];
    if (chemMetersForTrend.length > 0) {
      const {
        data: fillHistory
      } = await supabase.from("chemical_low_events").select("meter_id, went_low_at, topped_up_at, wash_count_at_low, wash_count_at_topup, washes_during_low").eq("site_id", siteId).order("went_low_at", {
        ascending: false
      }).limit(20);
      setChemicalFillHistory(fillHistory ?? []);
    }
  };
  const applyRealtimeRow = (row) => {
    const meter = metersRef.current.find((m) => m.id === row.meter_id);
    if (!meter) {
      load();
      return;
    }
    const val = Number(row.value);
    const ts = row.recorded_at;
    setLiveEntries((prev) => [{
      id: `live-${row.meter_id}-${ts}-${Math.random().toString(36).slice(2, 6)}`,
      meter_id: row.meter_id,
      meter_name: meter.name,
      meter_type: meter.meter_type,
      unit: meter.unit,
      value: val,
      recorded_at: ts
    }, ...prev].slice(0, 20));
    setLastSeenTs((prev) => !prev || ts > prev ? ts : prev);
    setEsp32LastSeen((prev) => !prev || ts > prev ? ts : prev);
    setReadings((prev) => {
      const cutoff = new Date(Date.now() - 24 * 60 * 6e4).toISOString();
      return [...prev.filter((r) => r.recorded_at >= cutoff), {
        meter_id: row.meter_id,
        value: val,
        recorded_at: ts
      }];
    });
    const startOfDay = /* @__PURE__ */ new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const isToday = new Date(ts) >= startOfDay;
    if (isToday) {
      if (meter.meter_type === "wash" || meter.meter_type === "fresh_water") {
        const baseline = dayBaselineRef.current[row.meter_id] ?? 0;
        setTodays((prev) => ({
          ...prev,
          [row.meter_id]: Math.max(0, val - baseline)
        }));
      } else if (meter.meter_type === "chemical_flow") {
        setTodays((prev) => ({
          ...prev,
          [row.meter_id]: (prev[row.meter_id] ?? 0) + val
        }));
      }
    }
    if (meter.meter_type === "wash" || meter.meter_type === "fresh_water") {
      setTotals((prev) => ({
        ...prev,
        [row.meter_id]: Math.max(prev[row.meter_id] ?? 0, val)
      }));
    } else if (meter.meter_type === "chemical_flow") {
      setTotals((prev) => ({
        ...prev,
        [row.meter_id]: (prev[row.meter_id] ?? 0) + val
      }));
    }
    setTimeout(load, 150);
  };
  reactExports.useEffect(() => {
    load();
    const ch = supabase.channel(`site-${siteId}`).on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "readings",
      filter: `site_id=eq.${siteId}`
    }, (payload) => {
      const row = payload.new;
      applyRealtimeRow({
        meter_id: row.meter_id,
        value: Number(row.value),
        recorded_at: row.recorded_at
      });
    }).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [siteId]);
  const stats = reactExports.useMemo(() => {
    const latestByMeter = /* @__PURE__ */ new Map();
    for (const r of readings) {
      const meter = meters.find((m) => m.id === r.meter_id);
      if (!meter) continue;
      if (meter.meter_type === "chemical" || meter.meter_type === "chemical_flow") {
        const prev = latestByMeter.get(r.meter_id);
        if (!prev || prev.recorded_at < r.recorded_at) latestByMeter.set(r.meter_id, r);
      }
    }
    const sumBy = (type, src) => meters.filter((m) => m.meter_type === type).reduce((s, m) => s + (src[m.id] ?? 0), 0);
    return {
      washToday: sumBy("wash", todays),
      washLifetime: sumBy("wash", totals),
      freshToday: sumBy("fresh_water", todays),
      freshLifetime: sumBy("fresh_water", totals),
      latestByMeter
    };
  }, [readings, meters, totals, todays]);
  const chemicalLevelMeters = meters.filter((m) => m.meter_type === "chemical");
  const washMeters = meters.filter((m) => m.meter_type === "wash");
  const freshMeters = meters.filter((m) => m.meter_type === "fresh_water");
  const avgWaterMeters = freshMeters.filter((m) => m.count_for_avg_water);
  const rinseToday = avgWaterMeters.reduce((sum, m) => sum + (todays[m.id] ?? 0), 0);
  const avgWaterPerCar = avgWaterMeters.length > 0 && stats.washToday > 0 ? rinseToday / stats.washToday : null;
  const chemicalGroups = reactExports.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const m of chemicalLevelMeters) {
      const key = m.chemical_group || `lvl:${m.id}`;
      groups.set(key, {
        label: m.chemical_group || m.name,
        level: m
      });
    }
    return Array.from(groups.values());
  }, [chemicalLevelMeters]);
  if (!site) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading…" });
  const bestTs = [esp32LastSeen, lastSeenTs].filter(Boolean).sort().reverse()[0] ?? null;
  const ago = bestTs ? Math.max(0, Math.floor((now - new Date(bestTs).getTime()) / 1e3)) : null;
  const isOnline = ago !== null && ago < 90;
  const agoLabel = ago === null ? "never" : ago < 5 ? "just now" : ago < 60 ? `${ago}s ago` : ago < 3600 ? `${Math.floor(ago / 60)}m ago` : ago < 86400 ? `${Math.floor(ago / 3600)}h ago` : `${Math.floor(ago / 86400)}d ago`;
  const meterById = new Map(meters.map((m) => [m.id, m]));
  const pageThemeStyle = {};
  if (site.primary_color) pageThemeStyle["--primary"] = site.primary_color;
  if (site.secondary_color) pageThemeStyle["--secondary"] = site.secondary_color;
  if (site.accent_color) pageThemeStyle["--accent"] = site.accent_color;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-8", style: pageThemeStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 pb-6 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5 text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: site.name }),
          site.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: site.location }),
          site.machine_type && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70 mt-0.5", children: site.machine_type })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => navigate({
          to: `/sites/${siteId}/reports`
        }), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          "Reports"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 flex-shrink-0 ${isOnline ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-muted text-muted-foreground border border-border"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: `h-3 w-3 ${isOnline ? "text-emerald-500 fill-emerald-500" : "text-muted-foreground fill-slate-400"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isOnline ? "Live" : "Offline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: agoLabel })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-6 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Today" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-foreground", children: stats.washToday }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2", children: "washes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-6 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Total Wash Counts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-foreground", children: Math.round(stats.washLifetime) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2", children: "washes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg p-6 border ${site?.fresh_water_daily_threshold_liters != null && stats.freshToday > Number(site.fresh_water_daily_threshold_liters) ? "bg-red-50 border-red-300" : "bg-primary/10 border-primary/20"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          site?.fresh_water_daily_threshold_liters != null && stats.freshToday > Number(site.fresh_water_daily_threshold_liters) ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-semibold uppercase tracking-wide ${site?.fresh_water_daily_threshold_liters != null && stats.freshToday > Number(site.fresh_water_daily_threshold_liters) ? "text-red-700" : "text-muted-foreground"}`, children: [
            "Fresh Water Usage Today",
            site?.fresh_water_daily_threshold_liters != null && stats.freshToday > Number(site.fresh_water_daily_threshold_liters) && " – High Usage"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-bold ${site?.fresh_water_daily_threshold_liters != null && stats.freshToday > Number(site.fresh_water_daily_threshold_liters) ? "text-red-700" : "text-primary"}`, children: Math.round(stats.freshToday) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm mt-2 ${site?.fresh_water_daily_threshold_liters != null && stats.freshToday > Number(site.fresh_water_daily_threshold_liters) ? "text-red-600" : "text-primary"}`, children: [
          "liters",
          site?.fresh_water_daily_threshold_liters != null && ` (limit ${Number(site.fresh_water_daily_threshold_liters).toFixed(0)}L)`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 rounded-lg p-6 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Total Fresh Water" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary", children: Math.round(stats.freshLifetime) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-primary mt-2", children: "liters" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-6 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Avg Water / Car" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-foreground", children: avgWaterPerCar !== null ? avgWaterPerCar.toFixed(1) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2", children: avgWaterMeters.length > 0 ? `L per wash (${avgWaterMeters.map((m) => m.name).join(" + ")})` : "no meter selected — set in Admin" })
      ] })
    ] }),
    washTrendData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg border border-border shadow-sm p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-foreground mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-muted-foreground" }),
        "7-Day Wash Trend ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "(daily washes)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: washTrendData, margin: {
        top: 5,
        right: 30,
        left: 0,
        bottom: 5
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "time", stroke: "#64748b", style: {
          fontSize: "12px"
        }, angle: -45, textAnchor: "end", height: 80 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#64748b", style: {
          fontSize: "12px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }, labelStyle: {
          color: "#1e293b"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "washes", stroke: "#3b82f6", dot: false, strokeWidth: 2, isAnimationActive: false })
      ] }) })
    ] }),
    waterTrendData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg border border-border shadow-sm p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-foreground mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-5 w-5 text-primary" }),
        "7-Day Fresh Water Trend ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "(daily liters)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: waterTrendData, margin: {
        top: 5,
        right: 30,
        left: 0,
        bottom: 5
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "time", stroke: "#64748b", style: {
          fontSize: "12px"
        }, angle: -45, textAnchor: "end", height: 80 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#64748b", style: {
          fontSize: "12px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }, labelStyle: {
          color: "#1e293b"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "liters", stroke: "#06b6d4", dot: false, strokeWidth: 2, isAnimationActive: false })
      ] }) })
    ] }),
    washMeters.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Wash Counters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: washMeters.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterCard, { name: m.name, meterType: "wash", value: todays[m.id] ?? 0, unit: m.unit, capacity: m.capacity, lowThreshold: m.low_threshold, today: todays[m.id] ?? 0, total: totals[m.id] ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminAdjust, { meterId: m.id, siteId, unit: m.unit, onSaved: load })
      ] }, m.id)) })
    ] }) : null,
    freshMeters.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Water Meters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: freshMeters.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterCard, { name: m.name, meterType: "fresh_water", value: todays[m.id] ?? 0, unit: m.unit, capacity: m.capacity, lowThreshold: m.low_threshold, today: todays[m.id] ?? 0, total: totals[m.id] ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminAdjust, { meterId: m.id, siteId, unit: m.unit, onSaved: load })
      ] }, m.id)) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide", children: "Chemical levels" }),
      chemicalGroups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "No chemical meters configured." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: chemicalGroups.map((g, i) => {
        const lvl = g.level;
        let isLow = false;
        let washesSinceLow = null;
        let lowSinceLabel = null;
        let litresPerWash = null;
        let washesThisDrainCycle = null;
        const isProbe = lvl?.sensor_type === "probe";
        const isCounter = lvl?.sensor_type === "counter";
        const probeReading = isProbe && lvl ? stats.latestByMeter.get(lvl.id) : void 0;
        const litersRemaining = probeReading ? Number(probeReading.value) : null;
        if (isProbe && lvl) {
          isLow = litersRemaining != null && lvl.low_threshold != null && litersRemaining < lvl.low_threshold;
        } else if (isCounter && lvl) {
          const lowEvent = chemLowEvents.find((e) => e.meter_id === lvl.id);
          isLow = !!lowEvent;
          const latestCounterReading = stats.latestByMeter.get(lvl.id);
          const counterValue = latestCounterReading ? Number(latestCounterReading.value) : lastKnownWashesSinceLowRef.current[lvl.id] ?? 0;
          washesSinceLow = isLow ? counterValue : null;
          if (isLow && latestCounterReading) lastKnownWashesSinceLowRef.current[lvl.id] = counterValue;
          if (isLow && lowEvent) {
            const lowDelta = Math.floor((now - new Date(lowEvent.low_since).getTime()) / 1e3);
            lowSinceLabel = lowDelta < 60 ? "just now" : lowDelta < 3600 ? `${Math.floor(lowDelta / 60)}m ago` : lowDelta < 86400 ? `${Math.floor(lowDelta / 3600)}h ago` : `${Math.floor(lowDelta / 86400)}d ago`;
          }
        } else if (lvl) {
          const meterEvents = chemicalFillHistory.filter((e) => e.meter_id === lvl.id).slice().sort((a, b) => a.went_low_at.localeCompare(b.went_low_at));
          if (lvl.low_threshold != null && meterEvents.length >= 2) {
            const volumePerDrain = lvl.low_threshold;
            const perWashSamples = [];
            for (let idx = 1; idx < meterEvents.length; idx++) {
              const prev = meterEvents[idx - 1];
              const curr = meterEvents[idx];
              if (prev.topped_up_at !== null && prev.wash_count_at_topup !== null && curr.wash_count_at_low !== null) {
                const washesInCycle = curr.wash_count_at_low - prev.wash_count_at_topup;
                if (washesInCycle > 0) {
                  perWashSamples.push(volumePerDrain / washesInCycle);
                  if (idx === meterEvents.length - 1) washesThisDrainCycle = washesInCycle;
                }
              }
            }
            if (perWashSamples.length > 0) {
              litresPerWash = perWashSamples.reduce((s, v) => s + v, 0) / perWashSamples.length;
            }
          }
          const lowEvent = chemLowEvents.find((e) => e.meter_id === lvl.id);
          isLow = !!lowEvent;
          if (isLow && lowEvent) {
            const activeDbEvent = chemicalFillHistory.find((e) => e.meter_id === lvl.id && e.topped_up_at === null);
            const washMeterForSite = meters.find((mm) => mm.meter_type === "wash");
            const currentWashTotal = washMeterForSite ? stats.latestByMeter.get(washMeterForSite.id)?.value : void 0;
            const washCountAtLow = activeDbEvent?.wash_count_at_low ?? washAtLow[lvl.id];
            washesSinceLow = washCountAtLow !== void 0 && washCountAtLow !== null && currentWashTotal !== void 0 ? Number(currentWashTotal) - Number(washCountAtLow) : lastKnownWashesSinceLowRef.current[lvl.id] ?? null;
            if (washesSinceLow !== null) lastKnownWashesSinceLowRef.current[lvl.id] = washesSinceLow;
            const lowDelta = Math.floor((now - new Date(lowEvent.low_since).getTime()) / 1e3);
            lowSinceLabel = lowDelta < 60 ? "just now" : lowDelta < 3600 ? `${Math.floor(lowDelta / 60)}m ago` : lowDelta < 86400 ? `${Math.floor(lowDelta / 3600)}h ago` : `${Math.floor(lowDelta / 86400)}d ago`;
          }
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate", children: g.label }),
          lvl ? isProbe ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border p-3 ${isLow ? "border-destructive/40 bg-destructive/10" : "border-emerald-500/30 bg-emerald-500/10"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-semibold ${isLow ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`, children: isLow ? "⚠ Chemical Low" : "✓ Chemical OK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-mono px-1 rounded ${isLow ? "text-destructive/70" : "text-emerald-600/70 dark:text-emerald-400/70"}`, children: "PROBE" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: lvl.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-bold tabular-nums ${isLow ? "text-destructive" : "text-foreground"}`, children: litersRemaining != null ? litersRemaining.toFixed(1) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground pb-1", children: [
                lvl.unit || "L",
                " remaining",
                lvl.capacity ? ` of ${lvl.capacity}${lvl.unit || "L"}` : ""
              ] })
            ] }),
            lvl.capacity && litersRemaining != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${isLow ? "bg-destructive" : "bg-emerald-500"}`, style: {
              width: `${Math.max(0, Math.min(100, litersRemaining / lvl.capacity * 100))}%`
            } }) })
          ] }) : isLow ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-destructive", children: "⚠ Chemical Low" }),
              lowSinceLabel ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-destructive/70", children: [
                "since ",
                lowSinceLabel
              ] }) : isCounter ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono px-1 rounded text-destructive/70", children: "COUNTER" }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: lvl.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold tabular-nums text-destructive", children: Math.round(washesSinceLow ?? 0).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground pb-1", children: "washes since low" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-emerald-600 dark:text-emerald-400", children: "✓ Chemical OK" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: lvl.name })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground", children: "No level sensor" }),
          lvl && litresPerWash !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/60 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Chemical per wash" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tabular-nums", children: [
                litresPerWash.toFixed(3),
                " ",
                lvl.unit || "L"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[11px] text-muted-foreground", children: [
              "based on ",
              lvl.low_threshold,
              " ",
              lvl.unit || "L",
              " used per ",
              washesThisDrainCycle ?? "—",
              " washes (full → low)"
            ] })
          ] }),
          lvl && litresPerWash === null && lvl.low_threshold == null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-border p-3 text-[11px] text-muted-foreground", children: "Set the low-mark drop volume (e.g. 50L) in Admin to calculate chemical used per wash." })
        ] }, i);
      }) })
    ] }),
    chemicalFillHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Chemical Fill History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "washes used per fill · last 20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-muted-foreground border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Chemical" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Went low" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium", children: "Topped up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium text-right", children: "Washes used" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: chemicalFillHistory.map((evt, idx) => {
          const meter = meterById.get(evt.meter_id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: meter?.name ?? "Unknown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 tabular-nums", children: new Date(evt.went_low_at).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 tabular-nums", children: evt.topped_up_at ? new Date(evt.topped_up_at).toLocaleString() : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "still low" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-semibold tabular-nums", children: evt.washes_during_low !== null ? evt.washes_during_low.toLocaleString() : "—" })
          ] }, idx);
        }) })
      ] }) })
    ] })
  ] });
}
function AdminAdjust({
  meterId,
  siteId,
  unit,
  onSaved
}) {
  const {
    isAdmin
  } = useAuth();
  const [open, setOpen] = reactExports.useState(false);
  const [val, setVal] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  if (!isAdmin) return null;
  const submit = async () => {
    const n = Number(val);
    if (!Number.isFinite(n)) return toast.error("Enter a valid number");
    setBusy(true);
    const {
      error
    } = await supabase.from("readings").insert({
      site_id: siteId,
      meter_id: meterId,
      value: n,
      recorded_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Reading saved");
    setVal("");
    setOpen(false);
    onSaved();
  };
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "w-full justify-center text-xs h-7", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
      " Adjust reading"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, type: "number", step: "any", value: val, onChange: (e) => setVal(e.target.value), placeholder: `New value (${unit})`, className: "h-8 text-xs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8", onClick: submit, disabled: busy, children: busy ? "…" : "Save" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-8", onClick: () => {
      setOpen(false);
      setVal("");
    }, children: "×" })
  ] });
}
export {
  SiteDetail as component
};
