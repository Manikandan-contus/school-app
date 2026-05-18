import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell, GraduationCap, Award, Trophy, CalendarDays, BarChart3,
  Home, Bus, Wallet, Settings, ChevronDown, ChevronRight, ChevronLeft,
  TrendingUp, TrendingDown, Phone, MessageCircle, MapPin, Navigation,
  LogOut, Info, HelpCircle, Flag, User, Lock, Loader2, ArrowLeft,
  CheckCircle2, XCircle, CreditCard, Shield, Plus, BookOpen, Megaphone,
  AlarmClock, Users, FileText,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northfield Academy — School App" },
      { name: "description", content: "Mobile school management app prototype: marks, attendance, fees, live van tracking and more." },
    ],
  }),
  component: App,
});

type Screen =
  | "splash" | "login" | "home" | "marks" | "ranks" | "attendance"
  | "schedule" | "van" | "fees" | "settings";

const SCHOOL = "Northfield Academy";

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [tab, setTab] = useState<"home" | "van" | "fees" | "settings">("home");

  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("login"), 1800);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const navigate = (s: Screen) => {
    setScreen(s);
    if (s === "home") setTab("home");
    if (s === "van") setTab("van");
    if (s === "fees") setTab("fees");
    if (s === "settings") setTab("settings");
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 sm:p-6">
      {/* iPhone 16 mock frame */}
      <div className="relative w-full sm:w-[402px] h-[100dvh] sm:h-[874px] bg-black sm:rounded-[3.2rem] sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:p-[10px] overflow-hidden">
        <div className="relative w-full h-full bg-background sm:rounded-[2.6rem] overflow-hidden flex flex-col">
          {/* Notch */}
          <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 z-50 h-7 w-32 bg-black rounded-full" />
          {/* Status bar */}
          <div className="shrink-0 h-11 px-7 flex items-end justify-between pb-1 text-[12px] font-semibold text-foreground/80 bg-background relative z-10">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-2 rounded-sm border border-foreground/70" />
              <span>100%</span>
            </span>
          </div>

          <div key={screen} className="flex-1 min-h-0 overflow-hidden animate-fade-in">
            {screen === "splash" && <Splash />}
            {screen === "login" && <Login onLogin={() => navigate("home")} />}
            {screen === "home" && <HomeScreen onOpen={navigate} onTab={(t) => navigate(t)} />}
            {screen === "marks" && <MarksScreen onBack={() => navigate("home")} />}
            {screen === "ranks" && <RanksScreen onBack={() => navigate("home")} />}
            {screen === "attendance" && <AttendanceScreen onBack={() => navigate("home")} />}
            {screen === "schedule" && <ScheduleScreen onBack={() => navigate("home")} />}
            {screen === "van" && <VanScreen />}
            {screen === "fees" && <FeesScreen />}
            {screen === "settings" && <SettingsScreen />}
          </div>

          {/* Bottom Nav */}
          {(["home", "van", "fees", "settings"] as Screen[]).includes(screen) && (
            <BottomNav active={tab} onChange={(t) => navigate(t)} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ Screens ============ */

function Splash() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-brand to-brand/80 text-brand-foreground">
      <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center shadow-2xl ring-1 ring-white/20">
        <GraduationCap className="w-12 h-12" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{SCHOOL}</h1>
      <p className="mt-1 text-sm text-white/70">Excellence. Discipline. Growth.</p>
      <div className="absolute bottom-20 flex items-center gap-2 text-white/80 text-xs">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading your dashboard…</span>
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"phone" | "roll">("phone");
  const [country, setCountry] = useState("+91");
  const [value, setValue] = useState("");

  return (
    <div className="h-full flex flex-col px-6 pt-8 pb-6 bg-background">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-brand text-brand-foreground flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">{SCHOOL}</h1>
        <p className="text-sm text-muted-foreground">Sign in to your student portal</p>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-2 p-1 bg-secondary rounded-2xl">
          {(["phone", "roll"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {m === "phone" ? "Phone Number" : "Roll Number"}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <label className="text-xs font-medium text-muted-foreground">
            {mode === "phone" ? "Phone Number" : "Roll Number"}
          </label>
          {mode === "phone" ? (
            <div className="mt-2 flex gap-2">
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="appearance-none h-12 pl-3 pr-8 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option>+91</option><option>+1</option><option>+44</option><option>+971</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
              <div className="relative flex-1">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full h-12 pl-9 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. NA-2025-0421"
                className="w-full h-12 pl-9 pr-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          We'll send a one-time verification code.
        </p>
      </div>

      <div className="mt-auto">
        <button
          onClick={onLogin}
          className="w-full h-13 py-3.5 rounded-2xl bg-brand text-brand-foreground font-semibold shadow-lg shadow-brand/25 active:scale-[0.99] transition"
        >
          Continue
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing you agree to our <span className="text-brand font-medium">Terms</span> & <span className="text-brand font-medium">Privacy</span>.
        </p>
      </div>
    </div>
  );
}

/* ===== Home ===== */
function HomeScreen({
  onOpen,
}: {
  onOpen: (s: Screen) => void;
  onTab: (s: "home" | "van" | "fees" | "settings") => void;
}) {
  const [menu, setMenu] = useState(false);
  const news = [
    { title: "Annual Sports Day", date: "May 24", tag: "Event", color: "from-brand to-indigo-600" },
    { title: "Science Fair Winners", date: "May 18", tag: "News", color: "from-emerald-600 to-teal-500" },
    { title: "PTM This Saturday", date: "May 22", tag: "Notice", color: "from-rose-500 to-orange-500" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % news.length), 3500);
    return () => clearInterval(t);
  }, []);

  const cards: { key: Screen; label: string; icon: any; color: string }[] = [
    { key: "marks", label: "Marks", icon: BarChart3, color: "bg-brand-soft text-brand" },
    { key: "ranks", label: "Ranks", icon: Trophy, color: "bg-amber-100 text-amber-700" },
    { key: "attendance", label: "Attendance", icon: CalendarDays, color: "bg-success-soft text-success" },
    { key: "schedule", label: "Schedule", icon: AlarmClock, color: "bg-violet-100 text-violet-700" },
    { key: "marks", label: "Achievements", icon: Award, color: "bg-rose-100 text-rose-600" },
    { key: "schedule", label: "Homework", icon: BookOpen, color: "bg-sky-100 text-sky-700" },
  ];

  return (
    <div className="h-full flex flex-col bg-secondary/40 pb-[88px]">
      {/* Header */}
      <div className="px-5 pt-3 pb-4 bg-background flex items-center justify-between relative">
        <button onClick={() => setMenu((v) => !v)} className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-indigo-500 text-white flex items-center justify-center font-semibold">
            AR
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-background rounded-full" />
        </button>
        <div className="text-center">
          <p className="text-[11px] text-muted-foreground leading-none">Welcome back</p>
          <p className="text-sm font-semibold text-foreground mt-0.5">{SCHOOL}</p>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">3</span>
        </button>

        {menu && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setMenu(false)} />
            <div className="absolute left-4 top-16 z-40 w-56 bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in origin-top-left">
              <div className="p-4 border-b border-border">
                <p className="text-sm font-semibold">Aarav Reddy</p>
                <p className="text-xs text-muted-foreground">Class X-B · Roll 21</p>
              </div>
              {[
                { label: "Settings", icon: Settings },
                { label: "About Us", icon: Info },
                { label: "Contact Us", icon: HelpCircle },
                { label: "Report", icon: Flag },
              ].map((it) => (
                <button key={it.label} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary text-foreground">
                  <it.icon className="w-4 h-4 text-muted-foreground" /> {it.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger border-t border-border hover:bg-danger-soft">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-6">
        {/* News carousel */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">News & Events</h2>
            <button className="text-xs text-brand font-medium">See all</button>
          </div>
          <div className="relative h-32 rounded-2xl overflow-hidden">
            {news.map((n, i) => (
              <div
                key={n.title}
                className={`absolute inset-0 bg-gradient-to-br ${n.color} p-4 flex flex-col justify-between transition-opacity duration-500 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-white/90" />
                  <span className="text-[10px] uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">{n.tag}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg leading-snug">{n.title}</p>
                  <p className="text-white/80 text-xs">{n.date}</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {news.map((_, i) => (
                <span key={i} className={`h-1 rounded-full transition-all ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Academics</h2>
          <div className="grid grid-cols-3 gap-3">
            {cards.map((c) => (
              <button
                key={c.label}
                onClick={() => onOpen(c.key)}
                className="bg-background rounded-2xl p-3 flex flex-col items-start gap-2 active:scale-95 transition shadow-sm border border-border/60"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>
                  <c.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-foreground">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick today */}
        <div className="bg-background rounded-2xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Today</h3>
            <span className="text-xs text-muted-foreground">Mon, May 18</span>
          </div>
          <div className="space-y-2.5">
            {[
              { t: "Mathematics", s: "08:30 – 09:20", room: "Room 204" },
              { t: "Physics Lab", s: "10:10 – 11:30", room: "Lab B" },
              { t: "English Lit.", s: "12:00 – 12:50", room: "Room 110" },
            ].map((p) => (
              <div key={p.t} className="flex items-center gap-3">
                <div className="w-1 h-10 rounded-full bg-brand" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.t}</p>
                  <p className="text-xs text-muted-foreground">{p.s} · {p.room}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Headers ===== */
function ScreenHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="px-5 pt-3 pb-4 bg-background flex items-center gap-3 border-b border-border/60">
      {onBack && (
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}
      <h1 className="text-base font-semibold">{title}</h1>
    </div>
  );
}

/* ===== Marks ===== */
function MarksScreen({ onBack }: { onBack: () => void }) {
  const subjects = [
    { s: "Mathematics", m: 92, prev: 84 },
    { s: "Physics", m: 78, prev: 81 },
    { s: "Chemistry", m: 85, prev: 79 },
    { s: "English", m: 88, prev: 86 },
    { s: "Biology", m: 74, prev: 80 },
  ];
  const total = subjects.reduce((a, b) => a + b.m, 0);
  const percent = Math.round((total / (subjects.length * 100)) * 100);

  return (
    <div className="h-full flex flex-col bg-secondary/40">
      <ScreenHeader title="Marks & Analytics" onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="px-5 py-3 flex gap-2 overflow-x-auto bg-background border-b border-border/60">
          <FilterChip label="May 2026" />
          <FilterChip label="Mid-Term" active />
          <FilterChip label="All Subjects" />
        </div>

        <div className="p-5 space-y-4">
          {/* Summary */}
          <div className="bg-gradient-to-br from-brand to-indigo-600 text-white rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-white/70">Mid-Term Result</p>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-4xl font-bold">{percent}%</p>
                <p className="text-sm text-white/80">{total} / {subjects.length * 100} marks</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">Grade</p>
                <p className="text-2xl font-bold">A</p>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-background rounded-2xl border border-border/60 overflow-hidden">
            {subjects.map((s, i) => {
              const diff = s.m - s.prev;
              const up = diff >= 0;
              return (
                <div key={s.s} className={`p-4 flex items-center justify-between ${i ? "border-t border-border/60" : ""}`}>
                  <div>
                    <p className="text-sm font-medium">{s.s}</p>
                    <p className="text-xs text-muted-foreground">Prev: {s.prev}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold tabular-nums">{s.m}</span>
                    <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${
                      up ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
                    }`}>
                      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {up ? "+" : ""}{diff}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Analytics */}
          <div className="bg-background rounded-2xl p-4 border border-border/60">
            <h3 className="text-sm font-semibold mb-3">Performance trend</h3>
            <div className="h-24 flex items-end gap-2">
              {subjects.map((s) => (
                <div key={s.s} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-secondary rounded-md relative" style={{ height: 80 }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-brand rounded-md" style={{ height: `${s.m}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{s.s.slice(0, 3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-background rounded-2xl p-4 border border-border/60 space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Teacher's Comment</p>
              <p className="text-sm mt-1 text-foreground">Strong improvement in Math and Chemistry. Focus on Biology with extra practice problems.</p>
            </div>
            <div className="border-t border-border/60 pt-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Achievements & Improvements</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5" /> Top scorer in Mathematics</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5" /> +6 in Chemistry vs last term</li>
                <li className="flex gap-2"><XCircle className="w-4 h-4 text-danger mt-0.5" /> Biology slipped by 6 points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
      active ? "bg-brand text-brand-foreground border-brand" : "bg-background border-border text-foreground"
    }`}>
      {label} <ChevronDown className="inline w-3 h-3 -mt-0.5" />
    </button>
  );
}

/* ===== Ranks ===== */
function RanksScreen({ onBack }: { onBack: () => void }) {
  const leaders = [
    { n: "Priya S.", r: 1, m: 96 },
    { n: "Rohan K.", r: 2, m: 94 },
    { n: "You (Aarav R.)", r: 3, m: 92, me: true },
    { n: "Anonymous", r: 4, m: 90 },
    { n: "Meera V.", r: 5, m: 89 },
    { n: "Anonymous", r: 6, m: 87 },
    { n: "Ishan M.", r: 7, m: 85 },
  ];
  return (
    <div className="h-full flex flex-col bg-secondary/40">
      <ScreenHeader title="Rank Details" onBack={onBack} />
      <div className="sticky top-0 z-10 bg-background border-b border-border/60 px-5 py-3 flex gap-2 overflow-x-auto">
        <FilterChip label="Class X-B" active />
        <FilterChip label="Mid-Term" />
        <FilterChip label="Overall" />
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/80">Your Rank</p>
            <p className="text-4xl font-bold mt-1">#3</p>
            <p className="text-sm text-white/90">out of 64 students</p>
          </div>
          <Trophy className="w-14 h-14 text-white/80" />
        </div>

        <div className="bg-background rounded-2xl border border-border/60 overflow-hidden">
          {leaders.map((l, i) => (
            <div key={i} className={`px-4 py-3 flex items-center gap-3 ${
              i ? "border-t border-border/60" : ""
            } ${l.me ? "bg-brand-soft" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                l.r === 1 ? "bg-amber-100 text-amber-700" :
                l.r === 2 ? "bg-slate-200 text-slate-700" :
                l.r === 3 ? "bg-orange-100 text-orange-700" :
                "bg-secondary text-muted-foreground"
              }`}>{l.r}</div>
              <div className="flex-1">
                <p className={`text-sm ${l.me ? "font-semibold text-brand" : "font-medium"}`}>{l.n}</p>
                <p className="text-xs text-muted-foreground">{l.m}% average</p>
              </div>
              {l.me && <span className="text-[10px] font-bold bg-brand text-brand-foreground px-2 py-0.5 rounded-full">YOU</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Attendance ===== */
function AttendanceScreen({ onBack }: { onBack: () => void }) {
  const present = 94;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const absent = new Set([4, 11, 22]);
  const weekend = new Set([1, 7, 8, 14, 15, 21, 28, 29]);
  const future = new Set([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);

  const C = 2 * Math.PI * 42;
  return (
    <div className="h-full flex flex-col bg-secondary/40">
      <ScreenHeader title="Attendance" onBack={onBack} />
      <div className="px-5 py-3 flex gap-2 overflow-x-auto bg-background border-b border-border/60">
        <FilterChip label="May 2026" active />
        <FilterChip label="This Term" />
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-background rounded-2xl p-5 border border-border/60 flex items-center gap-5">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" stroke="currentColor" className="text-secondary" strokeWidth="9" fill="none" />
              <circle
                cx="50" cy="50" r="42" stroke="currentColor" className="text-success"
                strokeWidth="9" fill="none" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C - (present / 100) * C}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{present}%</span>
              <span className="text-[10px] text-muted-foreground">overall</span>
            </div>
          </div>
          <div className="flex-1 space-y-2 text-sm">
            <Row dot="bg-success" label="Present" value="78 days" />
            <Row dot="bg-danger" label="Absent" value="5 days" />
            <Row dot="bg-secondary" label="Holiday" value="12 days" />
          </div>
        </div>

        <div className="bg-background rounded-2xl p-4 border border-border/60">
          <div className="flex items-center justify-between mb-3">
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><ChevronLeft className="w-4 h-4"/></button>
            <p className="text-sm font-semibold">May 2026</p>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><ChevronRight className="w-4 h-4"/></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-1">
            {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const isAbsent = absent.has(d);
              const isWeekend = weekend.has(d);
              const isFuture = future.has(d);
              return (
                <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                  isFuture ? "text-muted-foreground/40" :
                  isAbsent ? "bg-danger-soft text-danger" :
                  isWeekend ? "text-muted-foreground" :
                  "bg-success-soft text-success"
                }`}>
                  {d}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <Legend color="bg-success" label="Present" />
            <Legend color="bg-danger" label="Absent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${dot}`} />{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-1.5 text-muted-foreground"><span className={`w-2.5 h-2.5 rounded-full ${color}`} />{label}</span>;
}

/* ===== Schedule ===== */
function ScheduleScreen({ onBack }: { onBack: () => void }) {
  const events = [
    { d: "Tue, May 19", t: "10:00 AM", title: "Physics Mid-Term", tag: "Exam", color: "bg-rose-100 text-rose-600" },
    { d: "Wed, May 20", t: "All day", title: "Math Assignment due", tag: "Assignment", color: "bg-amber-100 text-amber-700" },
    { d: "Sat, May 23", t: "11:00 AM", title: "Parent-Teacher Meeting", tag: "Meeting", color: "bg-violet-100 text-violet-700" },
    { d: "Mon, May 25", t: "09:30 AM", title: "Annual Sports Day", tag: "Event", color: "bg-success-soft text-success" },
    { d: "Fri, May 29", t: "08:30 AM", title: "Chemistry Lab Test", tag: "Exam", color: "bg-rose-100 text-rose-600" },
  ];
  return (
    <div className="h-full flex flex-col bg-secondary/40">
      <ScreenHeader title="Schedule & Events" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {events.map((e, i) => (
          <div key={i} className="bg-background rounded-2xl p-4 border border-border/60 flex gap-3">
            <div className="w-12 text-center shrink-0">
              <p className="text-[10px] uppercase text-muted-foreground">{e.d.split(",")[0]}</p>
              <p className="text-lg font-bold text-brand leading-none mt-0.5">{e.d.split(" ")[2]}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{e.d.split(" ")[1]}</p>
            </div>
            <div className="flex-1 border-l border-border/60 pl-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${e.color}`}>{e.tag}</span>
                <span className="text-[11px] text-muted-foreground">{e.t}</span>
              </div>
              <p className="text-sm font-medium mt-1">{e.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Van ===== */
function VanScreen() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPos((p) => (p + 1) % 100), 120);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-full flex flex-col bg-secondary/40 pb-[88px]">
      <div className="px-5 pt-3 pb-3 bg-background border-b border-border/60 flex items-center justify-between">
        <h1 className="text-base font-semibold">Live Van Tracking</h1>
        <span className="flex items-center gap-1.5 text-xs text-success font-medium">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live
        </span>
      </div>

      {/* Map */}
      <div className="relative h-[44%] bg-[#e8eef5] overflow-hidden">
        {/* fake streets */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
          <rect width="400" height="400" fill="#e8eef5" />
          <path d="M0,80 L400,120" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M0,220 L400,260" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M80,0 L120,400" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M280,0 L320,400" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M20,360 C140,300 260,260 380,80" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeDasharray="6 6" />
          {/* school */}
          <circle cx="380" cy="80" r="8" fill="#10B981" />
          {/* home */}
          <circle cx="20" cy="360" r="8" fill="#1E3A8A" />
        </svg>
        {/* moving marker */}
        <div
          className="absolute w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center shadow-lg ring-4 ring-brand/20 transition-all"
          style={{
            left: `${10 + pos * 0.7}%`,
            top: `${85 - pos * 0.7}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Bus className="w-5 h-5" />
        </div>
        <div className="absolute top-3 left-3 right-3 flex gap-2">
          <div className="bg-background/90 backdrop-blur rounded-xl px-3 py-2 text-xs flex items-center gap-2 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand" /> ETA: <strong>12 min</strong>
          </div>
          <div className="bg-background/90 backdrop-blur rounded-xl px-3 py-2 text-xs flex items-center gap-2 shadow-sm">
            <Navigation className="w-3.5 h-3.5 text-brand" /> 2.4 km away
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="mx-5 -mt-3 relative z-10 bg-danger-soft border border-danger/30 text-danger rounded-2xl px-4 py-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-danger text-white flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Delay Notice</p>
          <p className="text-xs">15 mins delay due to traffic on MG Road.</p>
        </div>
        <PushToggle />
      </div>

      {/* Driver sheet */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-background rounded-2xl p-4 border border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-semibold text-lg">RK</div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Ramesh Kumar</p>
              <p className="text-xs text-muted-foreground">Driver · 8 yrs experience</p>
              <p className="text-xs text-muted-foreground mt-0.5">Van No. <span className="font-medium text-foreground">KA-05-MX-3429</span></p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="h-11 rounded-xl bg-brand text-brand-foreground text-sm font-semibold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call
            </button>
            <button className="h-11 rounded-xl bg-secondary text-foreground text-sm font-semibold flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Message
            </button>
          </div>
        </div>

        <div className="bg-background rounded-2xl p-4 border border-border/60">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Route Stops</p>
          {["Home Stop (Pickup)", "Lakeview Junction", "MG Road", "School Gate"].map((s, i, a) => (
            <div key={s} className="flex items-center gap-3 py-1.5">
              <div className="flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full ${i <= 1 ? "bg-success" : "bg-secondary"}`} />
                {i < a.length - 1 && <div className={`w-px h-5 ${i < 1 ? "bg-success" : "bg-border"}`} />}
              </div>
              <p className={`text-sm ${i <= 1 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PushToggle() {
  const [on, setOn] = useState(true);
  return (
    <button onClick={() => setOn(!on)} className={`w-9 h-5 rounded-full transition relative ${on ? "bg-danger" : "bg-border"}`}>
      <span className={`absolute top-0.5 ${on ? "left-4" : "left-0.5"} w-4 h-4 rounded-full bg-white transition-all`} />
    </button>
  );
}

/* ===== Fees ===== */
function FeesScreen() {
  const [open, setOpen] = useState<number | null>(0);
  const history = [
    { year: "2025–26", total: 84000, paid: 60000, pending: 24000, status: "ongoing" },
    { year: "2024–25", total: 78000, paid: 78000, pending: 0, status: "cleared" },
    { year: "2023–24", total: 72000, paid: 72000, pending: 0, status: "cleared" },
  ];
  return (
    <div className="h-full flex flex-col bg-secondary/40 pb-[160px]">
      <div className="px-5 pt-3 pb-3 bg-background border-b border-border/60">
        <h1 className="text-base font-semibold">Fees</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-gradient-to-br from-brand to-indigo-600 text-white rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-white/70">Academic Year 2025–26</p>
          <p className="text-3xl font-bold mt-1">₹84,000</p>
          <p className="text-xs text-white/80">Total annual fees</p>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-success" style={{ width: "71%" }} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[10px] text-white/70 uppercase">Paid</p>
              <p className="text-lg font-semibold text-emerald-300">₹60,000</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[10px] text-white/70 uppercase">Pending</p>
              <p className="text-lg font-semibold text-rose-300">₹24,000</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Payment History</h3>
          <div className="bg-background rounded-2xl border border-border/60 overflow-hidden">
            {history.map((h, i) => (
              <div key={h.year} className={i ? "border-t border-border/60" : ""}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{h.year}</p>
                    <p className="text-xs text-muted-foreground">₹{h.total.toLocaleString()} total</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full ${
                      h.pending > 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success"
                    }`}>{h.status}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {open === i && (
                  <div className="px-4 pb-4 space-y-2 text-sm animate-accordion-down">
                    <div className="flex justify-between"><span className="text-muted-foreground">Tuition</span><span>₹{Math.round(h.total*0.7).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Transport</span><span>₹{Math.round(h.total*0.2).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Activities</span><span>₹{Math.round(h.total*0.1).toLocaleString()}</span></div>
                    <div className="flex justify-between font-semibold border-t border-border pt-2"><span>Pending</span><span className={h.pending > 0 ? "text-danger" : "text-success"}>₹{h.pending.toLocaleString()}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[88px] left-0 right-0 px-5 pb-3 bg-gradient-to-t from-background via-background to-transparent pt-6">
        <button className="w-full h-13 py-3.5 rounded-2xl bg-brand text-brand-foreground font-semibold shadow-lg shadow-brand/25 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" /> Pay ₹24,000 Securely In-App
        </button>
      </div>
    </div>
  );
}

/* ===== Settings ===== */
function SettingsScreen() {
  const items = [
    { icon: User, label: "Account & Profile" },
    { icon: Bell, label: "Notifications" },
    { icon: Lock, label: "Privacy & Security" },
    { icon: Users, label: "Linked Parents" },
    { icon: FileText, label: "Documents" },
    { icon: Info, label: "About Us" },
    { icon: HelpCircle, label: "Contact Support" },
  ];
  return (
    <div className="h-full flex flex-col bg-secondary/40 pb-[88px]">
      <div className="px-5 pt-3 pb-3 bg-background border-b border-border/60">
        <h1 className="text-base font-semibold">Settings</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-background rounded-2xl p-4 border border-border/60 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand to-indigo-500 text-white flex items-center justify-center font-semibold text-lg">AR</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Aarav Reddy</p>
            <p className="text-xs text-muted-foreground">Class X-B · Roll 21</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="bg-background rounded-2xl border border-border/60 overflow-hidden">
          {items.map((it, i) => (
            <button key={it.label} className={`w-full px-4 py-3.5 flex items-center gap-3 ${i ? "border-t border-border/60" : ""}`}>
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"><it.icon className="w-4 h-4 text-foreground" /></div>
              <span className="flex-1 text-left text-sm">{it.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
        <button className="w-full h-12 rounded-2xl bg-danger-soft text-danger font-semibold flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}

/* ===== Bottom Nav ===== */
function BottomNav({
  active, onChange,
}: {
  active: "home" | "van" | "fees" | "settings";
  onChange: (s: "home" | "van" | "fees" | "settings") => void;
}) {
  const items = [
    { key: "home" as const, icon: Home, label: "Home" },
    { key: "van" as const, icon: Bus, label: "Van" },
    { key: "fees" as const, icon: Wallet, label: "Fees" },
    { key: "settings" as const, icon: Settings, label: "Settings" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="mx-3 mb-3 bg-background/95 backdrop-blur border border-border rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] grid grid-cols-4 px-2 py-2">
        {items.map((it) => {
          const on = active === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl transition ${
                on ? "text-brand" : "text-muted-foreground"
              }`}
            >
              <div className={`w-10 h-7 flex items-center justify-center rounded-full transition ${on ? "bg-brand-soft" : ""}`}>
                <it.icon className="w-[18px] h-[18px]" />
              </div>
              <span className="text-[10px] font-medium">{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
