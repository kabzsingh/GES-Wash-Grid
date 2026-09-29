import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Droplets, FlaskConical, Gauge, Shield } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({ component: Landing });

// A small illustrative readout — not live data, just a concrete stand-in
// for the thing this product actually does, shown as the hero rather than
// describing it in prose. Ticks gently so it reads as "live" without being
// a distracting animation.
function LiveReadoutPanel() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  const rows = [
    { site: "Total Centurion Gate", label: "Wash Count", value: 214 + tick, unit: "washes today" },
    { site: "Sasol La Montagne", label: "Fresh Water", value: 1842 + tick * 3, unit: "L today" },
    { site: "Europcar Jetpark", label: "Multi Clean", value: null, unit: "OK", ok: true },
  ];

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/40">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        <span className="text-xs font-medium text-muted-foreground">Live — 6 sites reporting</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.site} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-sm font-medium">{r.label}</div>
              <div className="text-xs text-muted-foreground">{r.site}</div>
            </div>
            <div className="text-right">
              {r.ok ? (
                <span className="text-sm font-mono font-medium text-success">{r.unit}</span>
              ) : (
                <>
                  <div className="text-sm font-mono font-semibold tabular-nums">{r.value?.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{r.unit}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Landing() {
  const { session, loading } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (!loading && session) nav({ to: "/dashboard" });
  }, [loading, session, nav]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Autowash Dashboard" className="h-8 w-8 rounded-lg object-contain bg-white" />
            <span className="font-semibold tracking-tight">Autowash Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/signup"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6">
        <section className="py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-lg">
              One dashboard for every wash bay you run.
            </h1>
            <p className="mt-5 text-base text-muted-foreground max-w-md">
              Wash counts, fresh water, and chemical levels, streamed straight from your ESP32
              meters to a single live view. Built for fleets running 20 or more sites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup"><Button size="lg">Start free</Button></Link>
              <Link to="/login"><Button size="lg" variant="outline">I already have an account</Button></Link>
            </div>
          </div>
          <LiveReadoutPanel />
        </section>

        <section className="border-t border-border py-14">
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-8">
            {[
              { icon: Gauge, title: "Wash counts", text: "Today and lifetime totals from every wash bay." },
              { icon: Droplets, title: "Fresh water", text: "Track usage per meter, spot leaks fast." },
              { icon: FlaskConical, title: "Chemical levels", text: "Tank gauges with low-level alerts." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-14 mb-6">
          <div className="flex items-start gap-4">
            <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div className="w-full">
              <h2 className="text-lg font-medium">Secure ingest for your ESP32s</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                Each site gets its own API key. Your ESP32 posts JSON readings to a single endpoint — we handle storage, time series, and access control automatically.
              </p>
              <pre className="mt-4 text-xs font-mono bg-card rounded-lg p-4 overflow-x-auto border border-border">
{`POST /api/public/ingest
x-site-api-key: ws_live_********
{
  "readings": [
    { "device_key": "wash",  "value": 1 },
    { "device_key": "fresh", "value": 12.4 },
    { "device_key": "chem1", "value": 78.2 }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Autowash Dashboard
      </footer>
    </div>
  );
}
