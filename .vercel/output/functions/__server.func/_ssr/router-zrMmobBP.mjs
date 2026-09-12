import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-BErA7MhY.mjs";
import { createServerFn, TSS_SERVER_FUNCTION, getServerFnById } from "./index.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { T as Trigger, I as Icon, d as ScrollUpButton, S as ScrollDownButton, P as Portal, C as Content2, f as Viewport, L as Label$1, a as Item, b as ItemIndicator, c as ItemText, e as Separator, R as Root2, V as Value } from "../_libs/radix-ui__react-select.mjs";
import { g as getApiKeyByHash, d as getMetersForSite, r as requireSupabaseAuth } from "./db-BkCXe06b.mjs";
import { R as Root$1, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { g as getRuntimeEnv, b as getSupabaseAdmin } from "./runtime-env-B3DY4n68.mjs";
import { w as writeSync, u as utils } from "../_libs/xlsx.mjs";
import { c as ChevronDown, d as ChevronUp, b as Check } from "../_libs/lucide-react.mjs";
import { o as objectType, a as arrayType, s as stringType, e as enumType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const appCss = "/assets/styles-Caq-6Pwk.css";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
createServerFn({
  method: "GET"
}).handler(createSsrRpc("8d7f24c3687ad1408d854b37dc5edf2d3a510b4baf76498b108805ad6fce6f0c"));
const signIn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("600f8bfbba8479142f4e053530bf73429a7c4605f126101c81fcfe0af5d16585"));
const signOut = createServerFn({
  method: "POST"
}).handler(createSsrRpc("2ebab109cf2a30c0cf504179c4ac08c940ffdcf80725116fefa68023748a7a67"));
const Ctx = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [roles, setRoles] = reactExports.useState([]);
  const fetchRoles = async (userId) => {
    if (!userId) {
      setRoles([]);
      return;
    }
    try {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
      if (error) throw error;
      setRoles((data ?? []).map((r) => r.role));
    } catch (e) {
      console.error("Failed to fetch roles:", e);
      setRoles([]);
    }
  };
  reactExports.useEffect(() => {
    const applySession = async (s) => {
      if (s) {
        try {
          await signIn({
            data: {
              accessToken: s.access_token,
              refreshToken: s.refresh_token || ""
            }
          });
        } catch (e) {
          console.error("Failed to sync session to server:", e);
        }
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          await supabase.auth.signOut();
          setSession(null);
          setRoles([]);
          return;
        }
        setSession(s);
        await fetchRoles(data.user.id);
        return;
      }
      setSession(null);
      setRoles([]);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setTimeout(() => {
        void applySession(s);
      }, 0);
    });
    supabase.auth.getSession().then(({ data }) => applySession(data.session)).finally(() => setLoading(false));
    return () => sub.subscription.unsubscribe();
  }, []);
  const value = {
    session,
    user: session?.user ?? null,
    loading,
    roles,
    isAdmin: roles.includes("admin"),
    refreshRoles: () => fetchRoles(session?.user?.id),
    signOut: async () => {
      await supabase.auth.signOut();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value, children });
}
function useAuth() {
  const v = reactExports.useContext(Ctx);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
}
const ThemeContext = reactExports.createContext(void 0);
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return { r: num >> 16 & 255, g: num >> 8 & 255, b: num & 255 };
}
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = (g - b) / d % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}
function hueOf(hex) {
  try {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHsl(r, g, b).h;
  } catch {
    return 200;
  }
}
function contrastForeground(hex) {
  try {
    const { r, g, b } = hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "hsl(0 0% 9%)" : "hsl(0 0% 98%)";
  } catch {
    return "hsl(0 0% 98%)";
  }
}
function hsl(h, s, l) {
  return `hsl(${h.toFixed(1)} ${s}% ${l}%)`;
}
function generatePalette(mode, primaryHex, accentHex) {
  const hue = hueOf(primaryHex);
  const primaryForeground = contrastForeground(primaryHex);
  const accentForeground = contrastForeground(accentHex);
  const shared = {
    primary: primaryHex,
    "primary-foreground": primaryForeground,
    "primary-glow": primaryHex,
    accent: accentHex,
    "accent-foreground": accentForeground,
    ring: primaryHex,
    "chart-1": primaryHex,
    "chart-2": accentHex,
    "sidebar-primary": primaryHex,
    "sidebar-primary-foreground": primaryForeground,
    "sidebar-ring": primaryHex
  };
  if (mode === "dark") {
    return {
      ...shared,
      background: hsl(hue, 22, 10),
      foreground: hsl(hue, 15, 95),
      card: hsl(hue, 20, 14),
      "card-foreground": hsl(hue, 15, 95),
      popover: hsl(hue, 20, 14),
      "popover-foreground": hsl(hue, 15, 95),
      secondary: hsl(hue, 18, 19),
      "secondary-foreground": hsl(hue, 15, 95),
      muted: hsl(hue, 15, 17),
      "muted-foreground": hsl(hue, 10, 65),
      border: hsl(hue, 18, 24),
      input: hsl(hue, 18, 24),
      sidebar: hsl(hue, 20, 12),
      "sidebar-foreground": hsl(hue, 15, 95),
      "sidebar-accent": hsl(hue, 18, 19),
      "sidebar-accent-foreground": hsl(hue, 15, 95),
      "sidebar-border": hsl(hue, 18, 24)
    };
  }
  return {
    ...shared,
    background: hsl(hue, 45, 97),
    foreground: hsl(hue, 25, 12),
    card: hsl(hue, 30, 99),
    "card-foreground": hsl(hue, 25, 12),
    popover: hsl(hue, 30, 99),
    "popover-foreground": hsl(hue, 25, 12),
    secondary: hsl(hue, 25, 93),
    "secondary-foreground": hsl(hue, 25, 12),
    muted: hsl(hue, 20, 94),
    "muted-foreground": hsl(hue, 10, 40),
    border: hsl(hue, 20, 85),
    input: hsl(hue, 20, 85),
    sidebar: hsl(hue, 25, 96),
    "sidebar-foreground": hsl(hue, 25, 12),
    "sidebar-accent": hsl(hue, 25, 93),
    "sidebar-accent-foreground": hsl(hue, 25, 12),
    "sidebar-border": hsl(hue, 20, 85)
  };
}
function applyFullTheme(mode, primaryHex, accentHex) {
  const palette = generatePalette(mode, primaryHex, accentHex);
  const root = document.documentElement.style;
  for (const [key, value] of Object.entries(palette)) {
    root.setProperty(`--${key}`, value);
  }
}
const DEFAULT_PRIMARY = "#5ad1e0";
const DEFAULT_ACCENT = "#2c8f9e";
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState("dark");
  const [mounted, setMounted] = reactExports.useState(false);
  const brandRef = reactExports.useRef({ primary: DEFAULT_PRIMARY, accent: DEFAULT_ACCENT });
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("app_settings").select("theme_mode, primary_color, accent_color").eq("id", true).maybeSingle();
      if (cancelled) return;
      const primary = data?.primary_color || DEFAULT_PRIMARY;
      const accent = data?.accent_color || DEFAULT_ACCENT;
      brandRef.current = { primary, accent };
      const savedTheme = localStorage.getItem("app-theme");
      const initialTheme = savedTheme || data?.theme_mode || "dark";
      setThemeState(initialTheme);
      applyTheme(initialTheme, primary, accent);
      setMounted(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const applyTheme = (newTheme, primary, accent) => {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("app-theme", newTheme);
    applyFullTheme(newTheme, primary ?? brandRef.current.primary, accent ?? brandRef.current.accent);
  };
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, toggleTheme, setTheme }, children });
}
function previewTheme(mode, primary, accent) {
  applyFullTheme(mode, primary, accent);
}
function useTheme() {
  const context = reactExports.useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Autowash Dashboard — Live Wash Site Monitoring" },
      { name: "description", content: "Live dashboard for wash counts, fresh water, and chemical levels across your sites." },
      { property: "og:title", content: "Autowash Dashboard — Live Wash Site Monitoring" },
      { property: "og:description", content: "Live dashboard for wash counts, fresh water, and chemical levels across your sites." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Autowash Dashboard — Live Wash Site Monitoring" },
      { name: "twitter:description", content: "Live dashboard for wash counts, fresh water, and chemical levels across your sites." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f46d3f23-89b2-4358-a926-c8e5a4d3b970/id-preview-f0833c3f--90a10b40-ab44-4a66-9493-2f10678af304.lovable.app-1779028292557.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f46d3f23-89b2-4358-a926-c8e5a4d3b970/id-preview-f0833c3f--90a10b40-ab44-4a66-9493-2f10678af304.lovable.app-1779028292557.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "icon",
        type: "image/jpeg",
        href: "/favicon.jpg"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen transition-colors duration-300", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
const $$splitComponentImporter$7 = () => import("./signup-B3xjsod5.mjs");
const Route$9 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const logo = "/assets/logo-CIq9d0ZK.jpg";
const $$splitComponentImporter$6 = () => import("./login-Dk9hDCqx.mjs");
const Route$8 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
function AuthShell({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 justify-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Autowash Dashboard", className: "h-8 w-8 rounded-lg object-contain bg-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Autowash Dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-8 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-6", children: subtitle }),
      children
    ] })
  ] }) });
}
const $$splitComponentImporter$5 = () => import("../_authenticated-CaG_I-hi.mjs");
const Route$7 = createFileRoute("/_authenticated")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-BoPXIqs2.mjs");
const Route$6 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard-D3iv_NP8.mjs");
const Route$5 = createFileRoute("/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
const createSiteApiKey = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  siteId: stringType(),
  label: stringType().max(60).optional()
}).parse(data)).handler(createSsrRpc("7792bc1832e99c5c6a6fb3ca01d4a437b85dfb099009847db3e135dca20eba87"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("1ad5a0235a6b4641d679f8746acd98d84616d2ec66833663d1c4fb85ce7de5e9"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  host: stringType(),
  port: numberType(),
  user_email: stringType().email(),
  password: stringType(),
  from_name: stringType(),
  from_email: stringType().email(),
  encryption: enumType(["tls", "ssl", "none"])
}).parse(data)).handler(createSsrRpc("40bd0446e1a9930ad03c98862e1f9c5f4e6af7d52ae33a4622175ae593ac3c35"));
const grantAdminBootstrap = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(createSsrRpc("7bebfef9be062a84fde06bb909efd22ef3af6d7a0f787c8ea15abccdae412ddf"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("07cc230b8ff3fc4fb98b2ea4e3e53b03835cdf7028f66357d34608903a02b98f"));
const listAllUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(createSsrRpc("b3ef54427b9b6abe19b4e7fee6274e09e2e5a3e2f0432f352a6e602ed202cfc3"));
const setUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "operator", "none"])
}).parse(data)).handler(createSsrRpc("db980dd7fbef43d3fc13d10ddc5f8ed5aae0f52362aa36d741670b7c62aab77f"));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid()
}).parse(data)).handler(createSsrRpc("5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e"));
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root$1.displayName;
const $$splitComponentImporter$2 = () => import("./admin-DJ9RQuav.mjs");
const Route$4 = createFileRoute("/_authenticated/admin")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const PayloadSchema = objectType({
  readings: arrayType(objectType({
    device_key: stringType().min(1).max(64),
    value: numberType().finite(),
    type: enumType(["total", "today", "level", "event"]).default("total").optional(),
    recorded_at: stringType().datetime().optional()
  })).min(1).max(200)
});
function corsHeaders$1() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-site-api-key, authorization"
  };
}
async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.subtle) {
    throw new Error("Web Crypto Subtle API is not available.");
  }
  const hashBuffer = await cryptoObj.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
const Route$3 = createFileRoute("/api/public/ingest")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders$1() }),
      POST: async ({ request }) => {
        const env = getRuntimeEnv();
        if (!env?.SUPABASE_URL || !env?.SUPABASE_SERVICE_ROLE_KEY) {
          return json({ error: "Server configuration missing" }, 500);
        }
        const db = getSupabaseAdmin(env);
        const apiKey = request.headers.get("x-site-api-key") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
        if (!apiKey) return json({ error: "Missing x-site-api-key" }, 401);
        const hash = await sha256(apiKey);
        let keyRow;
        try {
          keyRow = await getApiKeyByHash(db, hash);
        } catch (e) {
          if (e.code === "PGRST116") return json({ error: "Invalid key" }, 401);
          return json({ error: e.message }, 500);
        }
        if (!keyRow || keyRow.revoked) return json({ error: "Invalid key" }, 401);
        let body;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }
        const parsed = PayloadSchema.safeParse(body);
        if (!parsed.success) return json({ error: "Invalid payload", issues: parsed.error.flatten() }, 400);
        const meters = await getMetersForSite(db, keyRow.site_id);
        const map = new Map(meters.map((m) => [m.device_key, { id: m.id, type: m.meter_type, sensorType: m.sensor_type }]));
        const readings = [];
        const chemicalSwitchReadings = [];
        const chemicalCounterReadings = [];
        const unknown = [];
        for (const r of parsed.data.readings) {
          const meterInfo = map.get(r.device_key);
          if (!meterInfo) {
            unknown.push(r.device_key);
            continue;
          }
          const isSwitchChemical = meterInfo.type === "chemical" && (meterInfo.sensorType === "switch" || meterInfo.sensorType == null);
          const isCounterChemical = meterInfo.type === "chemical" && meterInfo.sensorType === "counter";
          if (r.type === "level" || isSwitchChemical) {
            chemicalSwitchReadings.push({
              device_key: r.device_key,
              meter_id: meterInfo.id,
              site_id: keyRow.site_id,
              state: Math.round(r.value),
              // 0 or 1
              recorded_at: r.recorded_at || (/* @__PURE__ */ new Date()).toISOString()
            });
            readings.push({
              site_id: keyRow.site_id,
              meter_id: meterInfo.id,
              value: r.value,
              reading_type: "total",
              ...r.recorded_at ? { recorded_at: r.recorded_at } : {}
            });
            continue;
          }
          if (isCounterChemical) {
            chemicalCounterReadings.push({
              meter_id: meterInfo.id,
              site_id: keyRow.site_id,
              counter: Math.round(r.value),
              recorded_at: r.recorded_at || (/* @__PURE__ */ new Date()).toISOString()
            });
            readings.push({
              site_id: keyRow.site_id,
              meter_id: meterInfo.id,
              value: r.value,
              reading_type: "total",
              ...r.recorded_at ? { recorded_at: r.recorded_at } : {}
            });
            continue;
          }
          if (r.type !== "event") {
            readings.push({
              site_id: keyRow.site_id,
              meter_id: meterInfo.id,
              value: r.value,
              reading_type: r.type || "total",
              ...r.recorded_at ? { recorded_at: r.recorded_at } : {}
            });
          }
        }
        if (readings.length === 0 && chemicalSwitchReadings.length === 0 && chemicalCounterReadings.length === 0) {
          return json({ error: "No matching meters", unknown }, 400);
        }
        if (readings.length > 0) {
          const { error: insErr } = await db.from("readings").insert(readings);
          if (insErr) return json({ error: insErr.message }, 500);
        }
        let chemicalEvents = 0;
        for (const chem of chemicalSwitchReadings) {
          const washMeter = meters.find((m) => m.meter_type === "wash");
          try {
            const { data } = await db.rpc("handle_chemical_state_change", {
              p_site_id: chem.site_id,
              p_meter_id: chem.meter_id,
              p_new_state: chem.state,
              p_wash_meter_id: washMeter?.id || null,
              p_now: chem.recorded_at
            });
            if (data?.event !== "no_change") chemicalEvents++;
          } catch (e) {
            console.error(`Failed to handle chemical state for meter ${chem.meter_id}:`, e);
          }
        }
        for (const chem of chemicalCounterReadings) {
          try {
            const { data } = await db.rpc("handle_chemical_counter_change", {
              p_site_id: chem.site_id,
              p_meter_id: chem.meter_id,
              p_counter_value: chem.counter,
              p_now: chem.recorded_at
            });
            if (data?.event !== "no_change") chemicalEvents++;
          } catch (e) {
            console.error(`Failed to handle chemical counter for meter ${chem.meter_id}:`, e);
          }
        }
        await db.from("site_api_keys").update({ last_used_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("key_hash", hash);
        return json({
          ok: true,
          accepted: readings.length,
          chemical_events: chemicalEvents,
          unknown
        });
      }
    }
  }
});
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders$1() }
  });
}
const $$splitComponentImporter$1 = () => import("./sites._siteId-B6HI1P7M.mjs");
const Route$2 = createFileRoute("/_authenticated/sites/$siteId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
async function sendEmail(to, subject, text, attachment, sendgridApiKey, fromEmail, fromName) {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: { email: fromEmail, name: fromName },
      personalizations: [{ to: to.map((email) => ({ email })) }],
      subject,
      content: [{ type: "text/plain", value: text }],
      attachments: [
        {
          filename: attachment.filename,
          content: attachment.contentBase64,
          type: attachment.mime
        }
      ]
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SendGrid error: ${err}`);
  }
}
function nowInTz(tz, instant = /* @__PURE__ */ new Date()) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false
  });
  const parts = Object.fromEntries(fmt.formatToParts(instant).map((p) => [p.type, p.value]));
  return {
    hour: Number(parts.hour),
    day: Number(parts.day),
    ymd: `${parts.year}-${parts.month}-${parts.day}`,
    ym: `${parts.year}-${parts.month}`
  };
}
function ymdInTz(tz, instant) {
  return nowInTz(tz, instant).ymd;
}
async function fetchHourlyAgg(db, siteId, fromIso, toIso) {
  const { data, error } = await db.rpc("report_hourly_agg", { _site_id: siteId, _from: fromIso, _to: toIso });
  if (error) throw new Error(error.message);
  return data ?? [];
}
async function fetchDailyAgg(db, siteId, fromIso, toIso, tz) {
  const { data, error } = await db.rpc("report_daily_agg", { _site_id: siteId, _from: fromIso, _to: toIso, _tz: tz });
  if (error) throw new Error(error.message);
  return data ?? [];
}
function addAggSheet(workbook, sheetName, rows) {
  const ws = utils.aoa_to_sheet(rows);
  const colCount = rows.reduce((max, r) => Math.max(max, r.length), 0);
  const widths = [];
  for (let c = 0; c < colCount; c++) {
    let maxLen = 8;
    for (const row of rows) {
      const cell = row[c];
      if (cell != null) maxLen = Math.max(maxLen, String(cell).length);
    }
    widths.push({ wch: Math.min(maxLen + 2, 45) });
  }
  ws["!cols"] = widths;
  const safeName = sheetName.replace(/[\[\]:*?/\\]/g, "").slice(0, 31);
  utils.book_append_sheet(workbook, ws, safeName);
}
async function buildDailyReport(db, site, meters) {
  const tz = site.timezone || "UTC";
  const now = /* @__PURE__ */ new Date();
  const yesterday = new Date(now.getTime() - 24 * 36e5);
  const ymd = ymdInTz(tz, yesterday);
  const startLocal = /* @__PURE__ */ new Date(`${ymd}T00:00:00`);
  const endLocal = /* @__PURE__ */ new Date(`${ymd}T23:59:59.999`);
  const fromIso = new Date(startLocal.toISOString()).toISOString();
  const toIso = new Date(endLocal.getTime() + 1).toISOString();
  const readingsAgg = await fetchHourlyAgg(db, site.id, fromIso, toIso);
  const buckets = /* @__PURE__ */ new Map();
  for (const row of readingsAgg) {
    const hourKey = `${String(row.hour_bucket).padStart(2, "0")}:00`;
    if (!buckets.has(hourKey)) buckets.set(hourKey, /* @__PURE__ */ new Map());
    buckets.get(hourKey).set(row.meter_id, { sum: Number(row.sum_value), count: Number(row.count_value), last: Number(row.last_value) });
  }
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
  const header = ["hour", ...meters.map((m) => `${m.name} (${m.unit || m.meter_type})`)];
  const rows = [header];
  for (const h of hours) {
    const row = [h];
    for (const meter of meters) {
      const agg = buckets.get(h)?.get(meter.id);
      if (meter.meter_type === "wash") row.push(agg?.count ?? 0);
      else if (meter.meter_type === "fresh_water") row.push(Number((agg?.sum ?? 0).toFixed(2)));
      else row.push(agg ? Number(agg.last.toFixed(2)) : "");
    }
    rows.push(row);
  }
  const workbook = utils.book_new();
  addAggSheet(workbook, "Hourly Breakdown", rows);
  const contentBase64 = writeSync(workbook, { bookType: "xlsx", type: "base64" });
  const safeName = site.name.replace(/[^a-z0-9]+/gi, "_");
  return {
    subject: `Daily report — ${site.name} — ${ymd}`,
    text: `Daily report for ${site.name} — ${ymd}

See attached Excel file.`,
    periodKey: ymd,
    attachment: {
      filename: `${safeName}_daily_${ymd}.xlsx`,
      mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      contentBase64
    }
  };
}
async function buildMonthlyReport(db, site, meters) {
  const tz = site.timezone || "UTC";
  const now = /* @__PURE__ */ new Date();
  const localToday = nowInTz(tz, now);
  const [y, m] = localToday.ym.split("-").map(Number);
  const prevMonth = m === 1 ? 12 : m - 1;
  const prevYear = m === 1 ? y - 1 : y;
  const ym = `${prevYear}-${String(prevMonth).padStart(2, "0")}`;
  const fromIso = (/* @__PURE__ */ new Date(`${ym}-01T00:00:00`)).toISOString();
  const toIso = new Date(prevYear, prevMonth, 1).toISOString();
  const readingsAgg = await fetchDailyAgg(db, site.id, fromIso, toIso, tz);
  const days = /* @__PURE__ */ new Set();
  const map = /* @__PURE__ */ new Map();
  for (const row of readingsAgg) {
    const d = row.day_bucket;
    days.add(d);
    if (!map.has(d)) map.set(d, /* @__PURE__ */ new Map());
    map.get(d).set(row.meter_id, { sum: Number(row.sum_value), count: Number(row.count_value), last: Number(row.last_value) });
  }
  const sortedDays = Array.from(days).sort();
  const header = ["date", ...meters.map((m2) => `${m2.name} (${m2.unit || m2.meter_type})`)];
  const rows = [header];
  for (const d of sortedDays) {
    const row = [d];
    for (const meter of meters) {
      const agg = map.get(d)?.get(meter.id);
      if (meter.meter_type === "wash") row.push(agg?.count ?? 0);
      else if (meter.meter_type === "fresh_water") row.push(Number((agg?.sum ?? 0).toFixed(2)));
      else row.push(agg ? Number(agg.last.toFixed(2)) : "");
    }
    rows.push(row);
  }
  const workbook = utils.book_new();
  addAggSheet(workbook, "Daily Breakdown", rows);
  const contentBase64 = writeSync(workbook, { bookType: "xlsx", type: "base64" });
  const safeName = site.name.replace(/[^a-z0-9]+/gi, "_");
  return {
    subject: `Monthly report — ${site.name} — ${ym}`,
    text: `Monthly report for ${site.name} — ${ym}

See attached Excel file.`,
    periodKey: ym,
    attachment: {
      filename: `${safeName}_monthly_${ym}.xlsx`,
      mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      contentBase64
    }
  };
}
async function alreadySent(db, siteId, type, periodKey) {
  const { data, error } = await db.from("report_send_log").select("id").eq("site_id", siteId).eq("report_type", type).eq("period_key", periodKey).eq("status", "sent").limit(1);
  if (error) throw new Error(error.message);
  return (data?.length ?? 0) > 0;
}
async function logReportAttempt(db, siteId, type, periodKey, recipients, ok, errorMsg) {
  await db.from("report_send_log").insert({
    site_id: siteId,
    report_type: type,
    period_key: periodKey,
    recipients,
    status: ok ? "sent" : "failed",
    error: errorMsg ?? null
  });
}
async function processSite(db, site, sendgridApiKey) {
  const tz = site.timezone || "UTC";
  const local = nowInTz(tz);
  if (local.hour < site.report_hour) return { site: site.name, skipped: "hour-not-reached" };
  const recipients = (site.report_recipients ?? []).filter((e) => /.+@.+\..+/.test(e));
  if (recipients.length === 0) return { site: site.name, skipped: "no-recipients" };
  const { data: meters, error: mErr } = await db.from("site_meters").select("*").eq("site_id", site.id).order("position");
  if (mErr) throw new Error(mErr.message);
  const results = [];
  const fromEmail = "autowashges@gmail.com";
  const fromName = "Autowash Dashboard Reports";
  if (site.daily_report_enabled) {
    const r = await buildDailyReport(db, site, meters ?? []);
    if (await alreadySent(db, site.id, "daily", r.periodKey)) {
      results.push({ type: "daily", period: r.periodKey, skipped: "already-sent" });
    } else {
      try {
        await sendEmail(recipients, r.subject, r.text, r.attachment, sendgridApiKey, fromEmail, fromName);
        await logReportAttempt(db, site.id, "daily", r.periodKey, recipients, true);
        results.push({ type: "daily", period: r.periodKey, ok: true });
      } catch (e) {
        await logReportAttempt(db, site.id, "daily", r.periodKey, recipients, false, e.message);
        results.push({ type: "daily", period: r.periodKey, ok: false, error: e.message });
      }
    }
  }
  if (site.monthly_report_enabled && local.day === 1) {
    const r = await buildMonthlyReport(db, site, meters ?? []);
    if (await alreadySent(db, site.id, "monthly", r.periodKey)) {
      results.push({ type: "monthly", period: r.periodKey, skipped: "already-sent" });
    } else {
      try {
        await sendEmail(recipients, r.subject, r.text, r.attachment, sendgridApiKey, fromEmail, fromName);
        await logReportAttempt(db, site.id, "monthly", r.periodKey, recipients, true);
        results.push({ type: "monthly", period: r.periodKey, ok: true });
      } catch (e) {
        await logReportAttempt(db, site.id, "monthly", r.periodKey, recipients, false, e.message);
        results.push({ type: "monthly", period: r.periodKey, ok: false, error: e.message });
      }
    }
  }
  return { site: site.name, results };
}
async function runSendReports(env, force) {
  const db = getSupabaseAdmin(env);
  const sendgridApiKey = env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    return { ok: false, error: "SENDGRID_API_KEY is not set", processed: [] };
  }
  const { data: sites, error } = await db.from("sites").select("*");
  if (error) {
    return { ok: false, error: error.message, processed: [] };
  }
  const out = [];
  for (const site of sites ?? []) {
    if (force && site.id !== force) continue;
    try {
      const r = await processSite(
        db,
        force ? { ...site, report_hour: nowInTz(site.timezone || "UTC").hour } : site,
        sendgridApiKey
      );
      out.push(r);
    } catch (e) {
      out.push({ site: site.name, error: e.message });
    }
  }
  return { ok: true, processed: out };
}
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
const Route$1 = createFileRoute("/api/public/hooks/send-reports")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders() }),
      POST: async ({ request }) => {
        const env = getRuntimeEnv();
        const url = new URL(request.url);
        const force = url.searchParams.get("force");
        const result = await runSendReports(env, force);
        return Response.json(result, { status: result.ok ? 200 : 500, headers: corsHeaders() });
      },
      GET: async () => Response.json({ ok: true, hint: "POST to trigger" }, { headers: corsHeaders() })
    }
  }
});
const $$splitComponentImporter = () => import("./sites._siteId_.reports-zbV0YRRY.mjs");
const Route = createFileRoute("/_authenticated/sites/$siteId_/reports")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$9.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$a
});
const LoginRoute = Route$8.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$a
});
const AuthenticatedRoute = Route$7.update({
  id: "/_authenticated",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const AuthenticatedDashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAdminRoute = Route$4.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRoute
});
const ApiPublicIngestRoute = Route$3.update({
  id: "/api/public/ingest",
  path: "/api/public/ingest",
  getParentRoute: () => Route$a
});
const AuthenticatedSitesSiteIdRoute = Route$2.update({
  id: "/sites/$siteId",
  path: "/sites/$siteId",
  getParentRoute: () => AuthenticatedRoute
});
const ApiPublicHooksSendReportsRoute = Route$1.update({
  id: "/api/public/hooks/send-reports",
  path: "/api/public/hooks/send-reports",
  getParentRoute: () => Route$a
});
const AuthenticatedSitesSiteIdReportsRoute = Route.update({
  id: "/sites/$siteId_/reports",
  path: "/sites/$siteId/reports",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedRouteChildren = {
  AuthenticatedAdminRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedSitesSiteIdRoute,
  AuthenticatedSitesSiteIdReportsRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute,
  SignupRoute,
  ApiPublicIngestRoute,
  ApiPublicHooksSendReportsRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  AuthShell,
  Button,
  Input,
  Label,
  Route$2 as Route,
  Route as Route$1,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  cn,
  createSiteApiKey,
  deleteUser,
  grantAdminBootstrap,
  listAllUsers,
  logo,
  previewTheme,
  router,
  setUserRole,
  signIn,
  signOut,
  useAuth,
  useTheme
};
