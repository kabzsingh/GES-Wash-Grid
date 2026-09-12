import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { Route$1 as Route, Button, cn } from "./router-zrMmobBP.mjs";
import { s as supabase } from "./client-BErA7MhY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { w as writeSync, u as utils } from "../_libs/xlsx.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { C as Calendar, t as TrendingUp, D as Download } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./db-BkCXe06b.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "./runtime-env-B3DY4n68.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function SiteReportsPage() {
  const {
    siteId
  } = Route.useParams();
  const [siteName, setSiteName] = reactExports.useState("");
  const [reportType, setReportType] = reactExports.useState("daily");
  const [selectedDate, setSelectedDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [loading, setLoading] = reactExports.useState(false);
  const [maxDaysBack, setMaxDaysBack] = reactExports.useState(90);
  reactExports.useEffect(() => {
    loadSiteInfo();
  }, [siteId]);
  const loadSiteInfo = async () => {
    try {
      const {
        data
      } = await supabase.from("sites").select("name").eq("id", siteId).single();
      if (data) setSiteName(data.name);
    } catch (e) {
      console.error("Error loading site:", e);
    }
  };
  const fetchAllReadings = async (siteId2, startISO, endISO) => {
    const pageSize = 1e3;
    const firstPage = await supabase.from("readings").select("meter_id, value, recorded_at", {
      count: "estimated"
    }).eq("site_id", siteId2).gte("recorded_at", startISO).lte("recorded_at", endISO).order("recorded_at", {
      ascending: true
    }).range(0, pageSize - 1);
    if (firstPage.error) throw firstPage.error;
    let all = firstPage.data ?? [];
    const estimatedTotal = firstPage.count ?? all.length;
    if (all.length === pageSize && estimatedTotal > pageSize) {
      const pageCount = Math.ceil(estimatedTotal / pageSize) - 1;
      const pagePromises = Array.from({
        length: pageCount
      }, (_, i) => {
        const from = (i + 1) * pageSize;
        return supabase.from("readings").select("meter_id, value, recorded_at").eq("site_id", siteId2).gte("recorded_at", startISO).lte("recorded_at", endISO).order("recorded_at", {
          ascending: true
        }).range(from, from + pageSize - 1);
      });
      const results = await Promise.all(pagePromises);
      for (const {
        data,
        error
      } of results) {
        if (error) throw error;
        if (data) all = all.concat(data);
      }
      let lastPageLen = results.length > 0 ? results[results.length - 1].data?.length ?? 0 : firstPage.data?.length ?? 0;
      let nextFrom = pageCount * pageSize + pageSize;
      while (lastPageLen === pageSize) {
        const extra = await supabase.from("readings").select("meter_id, value, recorded_at").eq("site_id", siteId2).gte("recorded_at", startISO).lte("recorded_at", endISO).order("recorded_at", {
          ascending: true
        }).range(nextFrom, nextFrom + pageSize - 1);
        if (extra.error) throw extra.error;
        lastPageLen = extra.data?.length ?? 0;
        if (extra.data) all = all.concat(extra.data);
        nextFrom += pageSize;
      }
    }
    return all;
  };
  const generateReport = async () => {
    setLoading(true);
    try {
      await Promise.race([generateReportInner(), new Promise((_, reject) => setTimeout(() => reject(new Error("Report generation timed out after 45s — try a shorter date range, or check your connection.")), 45e3))]);
    } catch (e) {
      console.error("Error generating report:", e);
      toast.error(e.message || "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };
  const generateReportInner = async () => {
    const reportDate = new Date(selectedDate);
    let startDate, endDate, fileName;
    if (reportType === "daily") {
      startDate = new Date(reportDate);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(reportDate);
      endDate.setHours(23, 59, 59, 999);
      fileName = `${siteName}_Daily_Report_${selectedDate}.xlsx`;
    } else {
      startDate = new Date(reportDate.getFullYear(), reportDate.getMonth(), 1);
      endDate = new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      fileName = `${siteName}_Monthly_Report_${reportDate.getFullYear()}-${String(reportDate.getMonth() + 1).padStart(2, "0")}.xlsx`;
    }
    const {
      data: meters
    } = await supabase.from("site_meters").select("id, name, meter_type, unit").eq("site_id", siteId);
    const {
      data: chemicalEvents
    } = await supabase.from("chemical_low_events").select("meter_id, went_low_at, topped_up_at, washes_during_low").eq("site_id", siteId).gte("went_low_at", startDate.toISOString()).lte("went_low_at", endDate.toISOString());
    const workbook = utils.book_new();
    const infoRows = [[`Wash Dashboard Report - ${siteName}`], [`Report Type: ${reportType === "daily" ? "Daily" : "Monthly"}`], [`Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`], [`Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}`]];
    if (reportType === "daily") {
      const readings = await fetchAllReadings(siteId, startDate.toISOString(), endDate.toISOString());
      const {
        breakdown,
        summary
      } = buildHourlyDailySheet(meters || [], readings, startDate);
      addSheet(workbook, "Hourly Breakdown", [...infoRows, [], ...breakdown]);
      addSheet(workbook, "Day Summary", summary);
    } else {
      const {
        breakdown,
        summary
      } = await buildDailyMonthlySheet(meters || [], siteId, startDate);
      addSheet(workbook, "Daily Breakdown", [...infoRows, [], ...breakdown]);
      addSheet(workbook, "Month Summary", summary);
    }
    if (chemicalEvents && chemicalEvents.length > 0) {
      const rows = [["Meter", "Went Low", "Topped Up", "Washes Used"]];
      chemicalEvents.forEach((e) => {
        const meter = meters?.find((m) => m.id === e.meter_id);
        const toppedUp = e.topped_up_at ? new Date(e.topped_up_at).toLocaleString() : "Still low";
        const washesUsed = e.washes_during_low !== null ? e.washes_during_low : "—";
        rows.push([meter?.name || "Unknown", new Date(e.went_low_at).toLocaleString(), toppedUp, washesUsed]);
      });
      addSheet(workbook, "Chemical Fill History", rows);
    }
    const wbout = writeSync(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success(`Report downloaded: ${fileName}`);
  };
  const getMaxDate = () => {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  };
  const getMinDate = () => {
    const minDate = /* @__PURE__ */ new Date();
    minDate.setDate(minDate.getDate() - maxDaysBack);
    minDate.setHours(0, 0, 0, 0);
    return minDate.toISOString().split("T")[0];
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background p-4 md:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.history.back(), className: "text-primary hover:underline flex items-center gap-2", children: "← Back to Site" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-foreground mb-2", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: siteName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Download comprehensive data reports" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 space-y-6 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Report Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: reportType === "daily" ? "default" : "outline", onClick: () => setReportType("daily"), className: "flex-1 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
            "Daily Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: reportType === "monthly" ? "default" : "outline", onClick: () => setReportType("monthly"), className: "flex-1 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
            "Monthly Report"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: reportType === "daily" ? "Select Date" : "Select Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: reportType === "daily" ? "date" : "month", value: reportType === "daily" ? selectedDate : selectedDate.slice(0, 7), onChange: (e) => {
          if (reportType === "daily") {
            setSelectedDate(e.target.value);
          } else {
            setSelectedDate(`${e.target.value}-01`);
          }
        }, min: getMinDate(), max: getMaxDate(), className: "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "Available: Last ",
          maxDaysBack,
          " days"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-2", children: "Report Includes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [
          reportType === "daily" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Hour-by-hour breakdown (00:00–23:00)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Daily and Total for wash counts and water meters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Chemical status (OK/LOW) per hour" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Day summary + chemical level events" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Day-by-day breakdown for the month" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Daily and Total for wash counts and water meters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Chemical status (OK/LOW) per day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Month summary + chemical level events" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✓ Native Excel format (.xlsx), multiple sheets" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: generateReport, disabled: loading, className: "w-full gap-2 h-12 text-base", size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }),
        loading ? "Generating..." : "Download Report"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Quick Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickReportButton, { label: "Today", date: /* @__PURE__ */ new Date(), type: "daily", onDownload: () => {
          setReportType("daily");
          setSelectedDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
          setTimeout(() => generateReport(), 100);
        }, loading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickReportButton, { label: "Yesterday", date: new Date(Date.now() - 864e5), type: "daily", onDownload: () => {
          const yesterday = new Date(Date.now() - 864e5);
          setReportType("daily");
          setSelectedDate(yesterday.toISOString().split("T")[0]);
          setTimeout(() => generateReport(), 100);
        }, loading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickReportButton, { label: "Last 7 Days", date: new Date(Date.now() - 6048e5), type: "daily", onDownload: () => {
          const lastWeek = new Date(Date.now() - 6048e5);
          setReportType("daily");
          setSelectedDate(lastWeek.toISOString().split("T")[0]);
          setTimeout(() => generateReport(), 100);
        }, loading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickReportButton, { label: "This Month", date: /* @__PURE__ */ new Date(), type: "monthly", onDownload: () => {
          setReportType("monthly");
          setSelectedDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
          setTimeout(() => generateReport(), 100);
        }, loading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickReportButton, { label: "Last Month", date: new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 1)), type: "monthly", onDownload: () => {
          const lastMonth = /* @__PURE__ */ new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          setReportType("monthly");
          setSelectedDate(lastMonth.toISOString().split("T")[0]);
          setTimeout(() => generateReport(), 100);
        }, loading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuickReportButton, { label: "2 Months Ago", date: new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 2)), type: "monthly", onDownload: () => {
          const twoMonthsAgo = /* @__PURE__ */ new Date();
          twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
          setReportType("monthly");
          setSelectedDate(twoMonthsAgo.toISOString().split("T")[0]);
          setTimeout(() => generateReport(), 100);
        }, loading })
      ] })
    ] })
  ] });
}
function addSheet(workbook, sheetName, rows) {
  const ws = utils.aoa_to_sheet(rows);
  const colCount = rows.reduce((max, r) => Math.max(max, r.length), 0);
  const widths = [];
  for (let c = 0; c < colCount; c++) {
    let maxLen = 8;
    for (const row of rows) {
      const cell = row[c];
      if (cell != null) maxLen = Math.max(maxLen, String(cell).length);
    }
    widths.push({
      wch: Math.min(maxLen + 2, 45)
    });
  }
  ws["!cols"] = widths;
  const safeName = sheetName.replace(/[\[\]:*?/\\]/g, "").slice(0, 31);
  utils.book_append_sheet(workbook, ws, safeName);
}
function buildHourlyDailySheet(meters, readings, dayStart) {
  const washFreshMeters = meters.filter((m) => m.meter_type === "wash" || m.meter_type === "fresh_water");
  const chemicalMeters = meters.filter((m) => m.meter_type === "chemical" || m.meter_type === "chemical_flow");
  const byMeter = /* @__PURE__ */ new Map();
  readings.forEach((r) => {
    if (!byMeter.has(r.meter_id)) byMeter.set(r.meter_id, []);
    byMeter.get(r.meter_id).push(r);
  });
  byMeter.forEach((arr) => arr.sort((a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()));
  const valueAt = (meterId, cutoff) => {
    const arr = byMeter.get(meterId);
    if (!arr || arr.length === 0) return void 0;
    let result;
    for (const r of arr) {
      if (new Date(r.recorded_at).getTime() <= cutoff.getTime()) {
        result = Number(r.value);
      } else break;
    }
    return result;
  };
  const midnightValue = {};
  washFreshMeters.forEach((m) => {
    midnightValue[m.id] = valueAt(m.id, dayStart) ?? 0;
  });
  const headerCols = ["Hour"];
  washFreshMeters.forEach((m) => {
    headerCols.push(`${m.name} - Daily (${m.unit || (m.meter_type === "wash" ? "washes" : "")})`);
    headerCols.push(`${m.name} - Total (${m.unit || (m.meter_type === "wash" ? "washes" : "")})`);
  });
  chemicalMeters.forEach((m) => {
    headerCols.push(`${m.name} - Status`);
  });
  const breakdown = [headerCols];
  const now = /* @__PURE__ */ new Date();
  const isToday = dayStart.toDateString() === now.toDateString();
  const lastHour = isToday ? now.getHours() : 23;
  for (let h = 0; h <= lastHour; h++) {
    const cutoff = new Date(dayStart);
    cutoff.setHours(h, 59, 59, 999);
    const row = [`${String(h).padStart(2, "0")}:00`];
    washFreshMeters.forEach((m) => {
      const total = valueAt(m.id, cutoff);
      if (total === void 0) {
        row.push("—", "—");
      } else {
        const daily = Math.max(0, total - midnightValue[m.id]);
        row.push(daily, total);
      }
    });
    chemicalMeters.forEach((m) => {
      const state = valueAt(m.id, cutoff);
      row.push(state === void 0 ? "—" : state >= 1 ? "LOW" : "OK");
    });
    breakdown.push(row);
  }
  const summary = [["Meter", "Daily", "Total / Status"]];
  washFreshMeters.forEach((m) => {
    const total = valueAt(m.id, new Date(dayStart.getTime() + 24 * 3600 * 1e3 - 1)) ?? midnightValue[m.id];
    const daily = Math.max(0, total - midnightValue[m.id]);
    summary.push([m.name, daily, total]);
  });
  chemicalMeters.forEach((m) => {
    const state = valueAt(m.id, new Date(dayStart.getTime() + 24 * 3600 * 1e3 - 1));
    summary.push([m.name, "", state === void 0 ? "No data" : state >= 1 ? "LOW" : "OK"]);
  });
  return {
    breakdown,
    summary
  };
}
async function buildDailyMonthlySheet(meters, siteId, monthStart, monthEnd) {
  const washFreshMeters = meters.filter((m) => m.meter_type === "wash" || m.meter_type === "fresh_water");
  const chemicalMeters = meters.filter((m) => m.meter_type === "chemical" || m.meter_type === "chemical_flow");
  const allMeters = [...washFreshMeters, ...chemicalMeters];
  const now = /* @__PURE__ */ new Date();
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  const isCurrentMonth = now.getFullYear() === monthStart.getFullYear() && now.getMonth() === monthStart.getMonth();
  const lastDay = isCurrentMonth ? now.getDate() : daysInMonth;
  const monthStartBoundary = new Date(monthStart);
  monthStartBoundary.setHours(0, 0, 0, 0);
  const cutoffs = [new Date(monthStartBoundary.getTime() - 1)];
  for (let d = 1; d <= lastDay; d++) {
    const c = new Date(monthStart.getFullYear(), monthStart.getMonth(), d);
    c.setHours(23, 59, 59, 999);
    cutoffs.push(c);
  }
  const pointQueries = allMeters.flatMap((m) => cutoffs.map(async (cutoff) => {
    const {
      data,
      error
    } = await supabase.from("readings").select("value, recorded_at").eq("meter_id", m.id).lte("recorded_at", cutoff.toISOString()).order("recorded_at", {
      ascending: false
    }).limit(1);
    if (error) throw error;
    return {
      meterId: m.id,
      cutoffTime: cutoff.getTime(),
      value: data && data.length > 0 ? Number(data[0].value) : void 0
    };
  }));
  const points = await Promise.all(pointQueries);
  const valueAtCutoff = /* @__PURE__ */ new Map();
  points.forEach((p) => valueAtCutoff.set(`${p.meterId}:${p.cutoffTime}`, p.value));
  const valueAt = (meterId, cutoff) => valueAtCutoff.get(`${meterId}:${cutoff.getTime()}`);
  const baselineCutoff = cutoffs[0];
  const baseline = {};
  washFreshMeters.forEach((m) => {
    baseline[m.id] = valueAt(m.id, baselineCutoff) ?? 0;
  });
  const headerCols = ["Date"];
  washFreshMeters.forEach((m) => {
    headerCols.push(`${m.name} - Daily (${m.unit || (m.meter_type === "wash" ? "washes" : "")})`);
    headerCols.push(`${m.name} - Total (${m.unit || (m.meter_type === "wash" ? "washes" : "")})`);
  });
  chemicalMeters.forEach((m) => {
    headerCols.push(`${m.name} - Status`);
  });
  const breakdown = [headerCols];
  const prevTotal = {
    ...baseline
  };
  for (let d = 1; d <= lastDay; d++) {
    const dayDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), d);
    const cutoff = cutoffs[d];
    const row = [dayDate.toLocaleDateString()];
    washFreshMeters.forEach((m) => {
      const total = valueAt(m.id, cutoff);
      if (total === void 0) {
        row.push("—", "—");
      } else {
        const daily = Math.max(0, total - prevTotal[m.id]);
        row.push(daily, total);
        prevTotal[m.id] = total;
      }
    });
    chemicalMeters.forEach((m) => {
      const state = valueAt(m.id, cutoff);
      row.push(state === void 0 ? "—" : state >= 1 ? "LOW" : "OK");
    });
    breakdown.push(row);
  }
  const summary = [["Meter", "Monthly", "Total / Status"]];
  const monthEndCutoff = cutoffs[lastDay];
  washFreshMeters.forEach((m) => {
    const total = valueAt(m.id, monthEndCutoff) ?? baseline[m.id];
    const monthlyUsed = Math.max(0, total - baseline[m.id]);
    summary.push([m.name, monthlyUsed, total]);
  });
  chemicalMeters.forEach((m) => {
    const state = valueAt(m.id, monthEndCutoff);
    summary.push([m.name, "", state === void 0 ? "No data" : state >= 1 ? "LOW" : "OK"]);
  });
  return {
    breakdown,
    summary
  };
}
function QuickReportButton({
  label,
  date,
  type,
  onDownload,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 hover:border-primary/50 cursor-pointer transition-all", onClick: onDownload, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: type === "daily" ? date.toLocaleDateString() : new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 text-primary opacity-50 group-hover:opacity-100" })
  ] }) });
}
export {
  SiteReportsPage as component
};
