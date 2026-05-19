import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell, GraduationCap, Award, Trophy, CalendarDays, BarChart3,
  Home, Bus, Wallet, Settings, ChevronDown, ChevronRight, ChevronLeft,
  TrendingUp, TrendingDown, Phone, MessageCircle, MapPin, Navigation,
  LogOut, Info, HelpCircle, Flag, User, Lock, Loader2, ArrowLeft,
  CheckCircle2, XCircle, CreditCard, Shield, Plus, BookOpen, Megaphone,
  AlarmClock, Users, FileText, Flame, Crown, Sparkles, QrCode,
  ClipboardList, Utensils, Dumbbell, FlaskConical, Palette, Music2,
  Upload, Search, Send, Video, PhoneCall, PhoneOff, Mic, MicOff,
  CalendarPlus, Check, Briefcase, Smile,
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
  | "schedule" | "van" | "fees" | "settings" | "teachers";

type ParentTab = "home" | "van" | "fees" | "teachers";

const SCHOOL = "Northfield Academy";

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [tab, setTab] = useState<ParentTab>("home");
  const [role, setRole] = useState<"parent" | "student">("parent");

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
    if (s === "teachers") setTab("teachers");
  };

  const isStudent = role === "student" && screen !== "splash" && screen !== "login";
  const showToggle = screen !== "splash" && screen !== "login";

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-start sm:justify-center p-0 sm:p-6 gap-4">
      {/* Global Parent/Student Toggle — top of canvas */}
      {showToggle && (
        <div className="w-full sm:w-[402px] px-3 sm:px-0 pt-3 sm:pt-0">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-1.5 flex items-center gap-1">
            {(["parent", "student"] as const).map((r) => {
              const on = role === r;
              return (
                <button
                  key={r}
                  onClick={() => { setRole(r); if (r === "parent") setTab("home"); setScreen("home"); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${on
                      ? r === "parent"
                        ? "bg-gradient-to-r from-[#1E3A8A] to-indigo-600 text-white shadow-md"
                        : "bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-md"
                      : "text-slate-500"
                    }`}
                >
                  {r === "parent" ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                  {r} View
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* iPhone 16 mock frame */}
      <div className="relative w-full sm:w-[402px] h-[100dvh] sm:h-[874px] bg-black sm:rounded-[3.2rem] sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:p-[10px] overflow-hidden">
        <div className={`relative w-full h-full sm:rounded-[2.6rem] overflow-hidden flex flex-col ${isStudent ? "bg-slate-950" : "bg-background"}`}>
          {/* Notch */}
          <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 z-50 h-7 w-32 bg-black rounded-full" />
          {/* Status bar */}
          <div className={`shrink-0 h-11 px-7 flex items-end justify-between pb-1 text-[12px] font-semibold relative z-10 ${isStudent ? "text-white/80 bg-slate-950" : "text-foreground/80 bg-background"}`}>
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className={`w-4 h-2 rounded-sm border ${isStudent ? "border-white/70" : "border-foreground/70"}`} />
              <span>100%</span>
            </span>
          </div>

          <div key={screen + role} className="flex-1 min-h-0 overflow-hidden animate-fade-in">
            {screen === "splash" && <Splash />}
            {screen === "login" && <Login onLogin={(r) => { setRole(r); navigate("home"); }} />}
            {screen !== "splash" && screen !== "login" && role === "student" && (
              <StudentApp />
            )}
            {role === "parent" && screen === "home" && <HomeScreen onOpen={navigate} onTab={(t) => navigate(t)} />}
            {role === "parent" && screen === "marks" && <MarksScreen onBack={() => navigate("home")} />}
            {role === "parent" && screen === "ranks" && <RanksScreen onBack={() => navigate("home")} />}
            {role === "parent" && screen === "attendance" && <AttendanceScreen onBack={() => navigate("home")} />}
            {role === "parent" && screen === "schedule" && <ScheduleScreen onBack={() => navigate("home")} />}
            {role === "parent" && screen === "van" && <VanScreen />}
            {role === "parent" && screen === "fees" && <FeesScreen />}
            {role === "parent" && screen === "teachers" && <TeachersScreen />}
            {role === "parent" && screen === "settings" && <SettingsScreen />}
          </div>

          {/* Bottom Nav (parent only) */}
          {role === "parent" && (["home", "van", "fees", "teachers"] as Screen[]).includes(screen) && (
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

function Login({ onLogin }: { onLogin: (role: "parent" | "student") => void }) {
  const [mode, setMode] = useState<"phone" | "roll">("phone");
  const [role, setRole] = useState<"parent" | "student">("parent");
  const [country, setCountry] = useState("+91");
  const [value, setValue] = useState("");

  return (
    <div className="h-full flex flex-col px-6 pt-6 pb-6 bg-background overflow-y-auto">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-brand text-brand-foreground flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">{SCHOOL}</h1>
        <p className="text-sm text-muted-foreground">Sign in to continue</p>
      </div>

      {/* <div className="mt-5 grid grid-cols-2 p-1 bg-secondary rounded-2xl">
        {(["parent", "student"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              role === r ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {r === "parent" ? "Parent" : "Student"}
          </button>
        ))}
      </div> */}

      <div className="mt-5">
        <div className="grid grid-cols-2 p-1 bg-secondary rounded-2xl">
          {(["phone", "roll"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
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
          onClick={() => onLogin(role)}
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
  onTab: (s: ParentTab) => void;
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
    { key: "teachers", label: "Teachers", icon: MessageCircle, color: "bg-indigo-100 text-indigo-700" },
    { key: "fees", label: "Fees", icon: Wallet, color: "bg-rose-100 text-rose-600" },
    { key: "van", label: "Live Van", icon: Bus, color: "bg-sky-100 text-sky-700" },
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

              {/* Settings - Navigate directly */}
              <button
                onClick={() => {
                  setMenu(false);
                  onOpen("settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary text-foreground"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                Settings
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>

              {/* Other menu items */}
              {[
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
                className={`absolute inset-0 bg-gradient-to-br ${n.color} p-4 flex flex-col justify-between transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"
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
                    <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
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
    <button className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${active ? "bg-brand text-brand-foreground border-brand" : "bg-background border-border text-foreground"
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
            <div key={i} className={`px-4 py-3 flex items-center gap-3 ${i ? "border-t border-border/60" : ""
              } ${l.me ? "bg-brand-soft" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${l.r === 1 ? "bg-amber-100 text-amber-700" :
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
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><ChevronLeft className="w-4 h-4" /></button>
            <p className="text-sm font-semibold">May 2026</p>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const isAbsent = absent.has(d);
              const isWeekend = weekend.has(d);
              const isFuture = future.has(d);
              return (
                <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${isFuture ? "text-muted-foreground/40" :
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
                    <span className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full ${h.pending > 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success"
                      }`}>{h.status}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {open === i && (
                  <div className="px-4 pb-4 space-y-2 text-sm animate-accordion-down">
                    <div className="flex justify-between"><span className="text-muted-foreground">Tuition</span><span>₹{Math.round(h.total * 0.7).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Transport</span><span>₹{Math.round(h.total * 0.2).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Activities</span><span>₹{Math.round(h.total * 0.1).toLocaleString()}</span></div>
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

/* ===== Parent–Teacher Communication Suite (P1.10) ===== */
type TeacherStatus = "available" | "teaching" | "offline";
type Teacher = {
  id: string; name: string; subject: string; initials: string;
  status: TeacherStatus; color: string;
};

const TEACHERS: Teacher[] = [
  { id: "t1", name: "Ms. Priya Menon", subject: "Mathematics", initials: "PM", status: "available", color: "from-indigo-500 to-blue-500" },
  { id: "t2", name: "Mr. Rohan Verma", subject: "Physics", initials: "RV", status: "teaching", color: "from-amber-500 to-orange-500" },
  { id: "t3", name: "Mrs. Anjali Iyer", subject: "Chemistry", initials: "AI", status: "available", color: "from-emerald-500 to-teal-500" },
  { id: "t4", name: "Mr. David Cole", subject: "English Lit.", initials: "DC", status: "teaching", color: "from-rose-500 to-pink-500" },
  { id: "t5", name: "Dr. Sara Khan", subject: "Biology", initials: "SK", status: "offline", color: "from-violet-500 to-purple-500" },
  { id: "t6", name: "Mr. Arjun Nair", subject: "Class Teacher", initials: "AN", status: "available", color: "from-sky-500 to-cyan-500" },
];

function StatusPip({ s }: { s: TeacherStatus }) {
  const map = {
    available: { dot: "bg-emerald-500", text: "Available Now", chip: "bg-emerald-50 text-emerald-700" },
    teaching: { dot: "bg-amber-500", text: "Currently Teaching", chip: "bg-amber-50 text-amber-700" },
    offline: { dot: "bg-slate-400", text: "Offline", chip: "bg-slate-100 text-slate-600" },
  }[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${map.chip}`}>
      <span className={`relative w-1.5 h-1.5 rounded-full ${map.dot}`}>
        {s === "available" && <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />}
      </span>
      {map.text}
    </span>
  );
}

function TeachersScreen() {
  const [view, setView] = useState<"list" | "chat" | "call" | "book">("list");
  const [active, setActive] = useState<Teacher>(TEACHERS[0]);
  const [toast, setToast] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const open = (t: Teacher, v: "chat" | "call" | "book") => { setActive(t); setView(v); };
  const filtered = TEACHERS.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.subject.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-secondary/40 pb-[88px] relative">
      {/* Header */}
      <div className="px-5 pt-3 pb-4 bg-gradient-to-br from-[#1E3A8A] to-indigo-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/70">Faculty Matrix</p>
            <h1 className="text-lg font-bold leading-tight">Grade 4-B Teachers</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teacher or subject"
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/15 placeholder-white/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {filtered.map((t) => (
          <div key={t.id} className="bg-background rounded-2xl border border-border/60 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center font-bold shadow`}>
                {t.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{t.name}</p>
                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-brand-soft text-brand px-2 py-0.5 rounded-full">
                    <BookOpen className="w-3 h-3" /> {t.subject}
                  </span>
                  <StatusPip s={t.status} />
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => open(t, "chat")}
                className="h-10 rounded-xl bg-brand-soft text-brand font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
              >
                <MessageCircle className="w-4 h-4" /> Chat
              </button>
              <button
                onClick={() => open(t, "call")}
                disabled={t.status === "offline"}
                className="h-10 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition disabled:opacity-40"
              >
                <Phone className="w-4 h-4" /> Voice Call
              </button>
            </div>
            <button
              onClick={() => open(t, "book")}
              className="mt-2 w-full h-10 rounded-xl border border-dashed border-brand/40 text-brand font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-brand-soft transition"
            >
              <CalendarPlus className="w-4 h-4" /> Schedule PTM / Booking
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No teachers found</p>
        )}
      </div>

      {/* Overlays */}
      {view === "chat" && <ChatOverlay teacher={active} onClose={() => setView("list")} />}
      {view === "call" && <CallOverlay teacher={active} onClose={() => setView("list")} />}
      {view === "book" && (
        <BookingDrawer
          teacher={active}
          onClose={() => setView("list")}
          onConfirm={(msg) => { setView("list"); setToast(msg); setTimeout(() => setToast(null), 2600); }}
        />
      )}
      {toast && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}
    </div>
  );
}

function ChatOverlay({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
  const [msgs, setMsgs] = useState([
    { from: "t", text: `Hello! This is ${teacher.name}. How can I help?`, time: "10:14" },
    { from: "p", text: "Hi, just wanted to check on this week's homework.", time: "10:16" },
    { from: "t", text: "Sure — chapters 4 and 5, plus the practice set.", time: "10:17" },
  ]);
  const [input, setInput] = useState("");
  const chips = ["Homework Issue", "Sick Leave", "Exam Inquiry", "Behavior", "Fees"];
  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "p", text, time: "now" }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "t", text: "Got it — I'll reply shortly. 👍", time: "now" }]);
    }, 900);
  };

  return (
    <div className="absolute inset-0 z-40 bg-secondary/40 flex flex-col animate-fade-in">
      <div className="px-4 pt-3 pb-3 bg-background border-b border-border flex items-center gap-3 shadow-sm">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${teacher.color} text-white flex items-center justify-center font-semibold text-xs`}>
          {teacher.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{teacher.name}</p>
          <p className="text-[10px] text-muted-foreground">{teacher.subject} · Online</p>
        </div>
        <button className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Phone className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        <div className="text-center text-[10px] text-muted-foreground py-2">Today · 10:12 AM</div>
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "p" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm shadow-sm ${m.from === "p"
                ? "bg-gradient-to-br from-[#1E3A8A] to-indigo-600 text-white rounded-br-md"
                : "bg-background text-foreground border border-border rounded-bl-md"
              }`}>
              {m.text}
              <div className={`text-[9px] mt-0.5 ${m.from === "p" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pt-2 pb-2 flex gap-1.5 overflow-x-auto bg-background/60 border-t border-border">
        {chips.map((c) => (
          <button key={c} onClick={() => send(c)} className="shrink-0 px-3 py-1.5 rounded-full bg-brand-soft text-brand text-[11px] font-semibold whitespace-nowrap">
            {c}
          </button>
        ))}
      </div>

      <div className="px-3 pb-3 pt-2 bg-background border-t border-border flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Smile className="w-4 h-4 text-muted-foreground" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          placeholder="Type a message…"
          className="flex-1 h-11 px-4 rounded-full bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button onClick={() => send(input)} className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1E3A8A] to-indigo-600 text-white flex items-center justify-center shadow-lg">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CallOverlay({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
  const [sec, setSec] = useState(0);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <div className="absolute inset-0 z-50 animate-fade-in overflow-hidden">
      {/* Blurred backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${teacher.color} opacity-80`} />
      <div className="absolute inset-0 backdrop-blur-2xl bg-slate-900/60" />

      <div className="relative h-full flex flex-col items-center text-white px-6 pt-12 pb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">VoIP Call · Encrypted</p>
        <p className="text-sm text-white/80 mt-1">Connected</p>

        <div className="mt-10 relative">
          <span className="absolute -inset-3 rounded-full border border-white/30 animate-ping" />
          <span className="absolute -inset-6 rounded-full border border-white/20 animate-pulse" />
          <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${teacher.color} ring-4 ring-white/20 flex items-center justify-center text-4xl font-bold shadow-2xl`}>
            {teacher.initials}
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-bold">{teacher.name}</h2>
        <p className="text-sm text-white/70">{teacher.subject}</p>
        <p className="mt-4 text-3xl font-mono tabular-nums tracking-wider">{mm}:{ss}</p>

        <div className="mt-auto w-full">
          <div className="flex items-center justify-center gap-5 mb-6">
            <button onClick={() => setMuted(m => !m)} className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur ${muted ? "bg-white text-slate-900" : "bg-white/15 text-white"}`}>
              {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button className="w-14 h-14 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center">
              <Video className="w-5 h-5" />
            </button>
            <button className="w-14 h-14 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-rose-500 shadow-[0_15px_40px_-10px_rgba(244,63,94,0.7)] active:scale-95 transition"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingDrawer({
  teacher, onClose, onConfirm,
}: { teacher: Teacher; onClose: () => void; onConfirm: (msg: string) => void }) {
  const [mode, setMode] = useState<"virtual" | "physical">("virtual");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [20, 21, 22, 23, 24, 25, 26];
  const slots = ["09:00", "09:30", "10:00", "11:00", "12:30", "14:00", "15:30", "16:00"];

  return (
    <div className="absolute inset-0 z-40 animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-5 max-h-[78%] overflow-y-auto animate-slide-in-right" style={{ animationName: "fade-in" }}>
        <div className="mx-auto w-10 h-1.5 rounded-full bg-border mb-4" />

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${teacher.color} text-white flex items-center justify-center font-semibold`}>
            {teacher.initials}
          </div>
          <div>
            <p className="text-sm font-semibold">Book PTM with {teacher.name}</p>
            <p className="text-[11px] text-muted-foreground">{teacher.subject}</p>
          </div>
        </div>

        {/* Mode */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-2xl">
          {([
            { k: "virtual", label: "Virtual Video", icon: Video },
            { k: "physical", label: "On-Campus", icon: MapPin },
          ] as const).map((o) => (
            <button
              key={o.k}
              onClick={() => setMode(o.k)}
              className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${mode === o.k ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
            >
              <o.icon className="w-3.5 h-3.5" /> {o.label}
            </button>
          ))}
        </div>

        {/* Date picker */}
        <p className="mt-5 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Date</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((d, i) => {
            const on = day === i;
            return (
              <button
                key={d}
                onClick={() => setDay(i)}
                className={`shrink-0 w-14 py-2.5 rounded-2xl flex flex-col items-center transition ${on ? "bg-gradient-to-br from-[#1E3A8A] to-indigo-600 text-white shadow-lg" : "bg-secondary text-foreground"
                  }`}
              >
                <span className="text-[10px] font-medium opacity-80">{d}</span>
                <span className="text-base font-bold">{dates[i]}</span>
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        <p className="mt-5 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available Slots</p>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((s) => {
            const on = slot === s;
            return (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`py-2.5 rounded-xl text-xs font-semibold border transition ${on ? "bg-brand text-brand-foreground border-brand shadow" : "bg-background border-border text-foreground"
                  }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => slot && onConfirm(`PTM booked for ${days[day]} ${dates[day]} at ${slot}`)}
          disabled={!slot}
          className="mt-6 w-full h-12 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-indigo-600 text-white font-semibold shadow-lg shadow-brand/25 active:scale-[0.99] transition disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" /> Confirm Booking
        </button>
      </div>
    </div>
  );
}


function BottomNav({
  active, onChange,
}: {
  active: ParentTab;
  onChange: (s: ParentTab) => void;
}) {
  const items = [
    { key: "home" as const, icon: Home, label: "Home" },
    { key: "van" as const, icon: Bus, label: "Live Van" },
    { key: "fees" as const, icon: Wallet, label: "Fees" },
    { key: "teachers" as const, icon: MessageCircle, label: "Teachers" },
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
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl transition ${on ? "text-brand" : "text-muted-foreground"
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

/* ============================================================
   STUDENT VIEW — Dark, gamified experience (separate flow)
   ============================================================ */

type SScreen = "home" | "homework" | "ranks" | "schedule" | "wallet" | "profile";

function StudentApp() {
  const [scr, setScr] = useState<SScreen>("home");
  const [tab, setTab] = useState<SScreen>("home");
  const go = (s: SScreen) => { setScr(s); if (["home", "schedule", "wallet", "profile"].includes(s)) setTab(s); };

  return (
    <div className="dark flex-1 min-h-0 flex flex-col bg-slate-950 text-slate-100">
      <div key={scr} className="flex-1 min-h-0 overflow-y-auto animate-fade-in pb-24">
        {scr === "home" && <SHome onOpen={go} />}
        {scr === "homework" && <SHomework onBack={() => go("home")} />}
        {scr === "ranks" && <SRanks onBack={() => go("home")} />}
        {scr === "schedule" && <SSchedule />}
        {scr === "wallet" && <SWallet />}
        {scr === "profile" && <SProfile />}
      </div>
      <SBottomNav active={tab} onChange={(t) => go(t)} />
    </div>
  );
}

/* ---- Student: Home ---- */
function SHome({ onOpen }: { onOpen: (s: SScreen) => void }) {
  const [remaining, setRemaining] = useState(18 * 60);
  useEffect(() => {
    const i = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);
  const total = 45 * 60;
  const pct = ((total - remaining) / total) * 100;
  const mm = Math.floor(remaining / 60);
  const ss = String(remaining % 60).padStart(2, "0");

  const grid = [
    { icon: ClipboardList, label: "Homework", color: "from-indigo-500 to-violet-600", onClick: () => onOpen("homework") },
    { icon: CalendarDays, label: "Timetable", color: "from-cyan-500 to-sky-600", onClick: () => onOpen("schedule") },
    { icon: FileText, label: "Exam Prep", color: "from-rose-500 to-pink-600", onClick: () => { } },
    { icon: Users, label: "Clubs", color: "from-emerald-500 to-teal-600", onClick: () => { } },
    { icon: Trophy, label: "Leaderboard", color: "from-amber-500 to-orange-600", onClick: () => onOpen("ranks") },
    { icon: Megaphone, label: "School Feed", color: "from-fuchsia-500 to-purple-600", onClick: () => { } },
  ];

  return (
    <div className="px-5 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white ring-2 ring-indigo-400/40">A</div>
          <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full">L5</span>
        </div>
        <div className="text-center">
          <p className="text-[11px] text-slate-400">Good morning</p>
          <p className="text-sm font-bold">Hey Alex! 👋</p>
        </div>
        <button className="relative w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950" />
        </button>
      </div>

      {/* Hero live tracker */}
      <div className="mt-5 relative rounded-3xl p-[1.5px] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]">
        <div className="rounded-[1.4rem] bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-indigo-300 uppercase">● Live now</span>
            <span className="text-[10px] text-slate-400">Period 3 of 7</span>
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-400">Currently in</p>
              <h2 className="text-xl font-extrabold text-white">Physics · Room 204</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400">remaining</p>
              <p className="text-lg font-bold text-emerald-400 tabular-nums">{mm}:{ss}</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <StatChip icon={<Flame className="w-4 h-4 text-orange-400" />} label="Streak" value="12d" sub="🔥 days" tone="orange" />
        <StatChip icon={<Crown className="w-4 h-4 text-amber-400" />} label="House" value="450" sub="🦁 Lions" tone="amber" />
        <StatChip icon={<ClipboardList className="w-4 h-4 text-rose-400" />} label="Pending" value="3" sub="📝 due" tone="rose" />
      </div>

      {/* Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {grid.map((g) => (
          <button key={g.label} onClick={g.onClick} className="group relative rounded-2xl bg-slate-900 border border-slate-800 p-4 text-left active:scale-[0.97] transition overflow-hidden">
            <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${g.color} opacity-20 blur-xl`} />
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center shadow-lg`}>
              <g.icon className="w-5 h-5 text-white" />
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{g.label}</p>
            <p className="text-[10px] text-slate-400">Tap to open</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatChip({ icon, label, value, sub, tone }: { icon: React.ReactNode; label: string; value: string; sub: string; tone: "orange" | "amber" | "rose" }) {
  const ring = tone === "orange" ? "ring-orange-500/30" : tone === "amber" ? "ring-amber-500/30" : "ring-rose-500/30";
  return (
    <div className={`rounded-2xl bg-slate-900 border border-slate-800 p-3 ring-1 ${ring}`}>
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-[9px] text-slate-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1.5 text-lg font-extrabold text-white tabular-nums">{value}</p>
      <p className="text-[10px] text-slate-400">{sub}</p>
    </div>
  );
}

/* ---- Student: Homework ---- */
function SHomework({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"todo" | "submitted">("todo");
  const [confetti, setConfetti] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);

  const todos = [
    { id: "h1", subject: "Math", title: "Chapter 7 — Quadratics", due: "Today, 6 PM", urgency: "today" },
    { id: "h2", subject: "English", title: "Essay: My Hero", due: "Tomorrow", urgency: "today" },
    { id: "h3", subject: "History", title: "WW2 Timeline", due: "Fri", urgency: "week" },
    { id: "h4", subject: "Bio", title: "Cell Diagram", due: "Sat", urgency: "week" },
  ];
  const visibleTodos = todos.filter((t) => !submitted.includes(t.id));
  const submittedList = todos.filter((t) => submitted.includes(t.id));

  const handleSubmit = (id: string) => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 1400);
    setTimeout(() => setSubmitted((s) => [...s, id]), 500);
  };

  return (
    <div className="px-5 pt-3">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
        <h1 className="text-lg font-bold">Homework</h1>
      </div>

      <div className="mt-4 grid grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
        {(["todo", "submitted"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`py-2 rounded-xl text-sm font-semibold transition ${tab === t ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400"}`}>
            {t === "todo" ? `To-Do (${visibleTodos.length})` : `Submitted (${submittedList.length})`}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {(tab === "todo" ? visibleTodos : submittedList).map((c) => {
          const border = c.urgency === "today" ? "border-l-rose-500" : "border-l-amber-400";
          return (
            <div key={c.id} className={`rounded-2xl bg-slate-900 border border-slate-800 border-l-4 ${tab === "todo" ? border : "border-l-emerald-500"} p-4`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">{c.subject}</span>
                <span className={`text-[10px] font-semibold ${c.urgency === "today" ? "text-rose-400" : "text-amber-400"}`}>{tab === "submitted" ? "✓ Submitted" : c.due}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-white">{c.title}</p>
              {tab === "todo" && (
                <button onClick={() => handleSubmit(c.id)} className="mt-3 w-full h-10 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition shadow-lg shadow-indigo-500/30">
                  <Upload className="w-4 h-4" /> Submit Assignment
                </button>
              )}
            </div>
          );
        })}
        {tab === "todo" && visibleTodos.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">🎉 All caught up!</div>
        )}
      </div>

      {confetti && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="animate-scale-in flex flex-col items-center">
            <div className="text-6xl">🎉</div>
            <p className="mt-2 text-emerald-400 font-bold">Submitted!</p>
          </div>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="absolute w-2 h-2 rounded-sm animate-fade-in" style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              background: ["#6366F1", "#10B981", "#F59E0B", "#EC4899"][i % 4],
              transform: `rotate(${Math.random() * 360}deg)`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Student: Leaderboard ---- */
function SRanks({ onBack }: { onBack: () => void }) {
  const podium = [
    { name: "Priya", pts: 980, medal: "🥇", color: "from-amber-400 to-yellow-500", h: "h-24" },
    { name: "Rohan", pts: 945, medal: "🥈", color: "from-slate-300 to-slate-400", h: "h-20" },
    { name: "Mia", pts: 920, medal: "🥉", color: "from-orange-400 to-amber-600", h: "h-16" },
  ];
  const others = [
    { r: 4, name: "Kabir", pts: 880 },
    { r: 5, name: "Ana", pts: 855 },
    { r: 6, name: "Yusuf", pts: 830 },
    { r: 7, name: "Alex (You)", pts: 815, me: true },
    { r: 8, name: "Leo", pts: 790 },
    { r: 9, name: "Sara", pts: 770 },
  ];

  return (
    <div className="px-5 pt-3 pb-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
        <h1 className="text-lg font-bold">Leaderboard</h1>
      </div>

      <p className="mt-4 text-xs text-slate-400">Class 10-B · This week</p>

      {/* Podium */}
      <div className="mt-4 grid grid-cols-3 gap-2 items-end">
        {[podium[1], podium[0], podium[2]].map((p, idx) => (
          <div key={p.name} className="flex flex-col items-center">
            <div className="relative">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center font-bold text-slate-900 ring-4 ring-slate-900`}>{p.name[0]}</div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">{p.medal}</span>
            </div>
            <p className="mt-2 text-xs font-bold truncate max-w-full">{p.name}</p>
            <p className="text-[10px] text-emerald-400 tabular-nums">{p.pts} pts</p>
            <div className={`mt-2 w-full ${p.h} rounded-t-xl bg-gradient-to-b ${p.color} opacity-80`} />
          </div>
        ))}
      </div>

      {/* Others */}
      <div className="mt-5 space-y-2">
        {others.map((o) => (
          <div key={o.r} className={`flex items-center gap-3 rounded-2xl border p-3 ${o.me ? "bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/30" : "bg-slate-900 border-slate-800"}`}>
            <span className="w-6 text-center text-sm font-bold text-slate-400">#{o.r}</span>
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-sm">{o.name[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{o.name}</p>
              <p className="text-[10px] text-slate-400">{o.pts} points</p>
            </div>
            {o.me && <TrendingUp className="w-4 h-4 text-emerald-400" />}
          </div>
        ))}
      </div>

      {/* Sticky user rank */}
      <div className="sticky bottom-2 mt-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 p-4 shadow-[0_10px_30px_-5px_rgba(99,102,241,0.6)]">
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-80">Your rank</p>
            <p className="text-lg font-extrabold">Rank #7 — Moving up! 🚀</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold">+2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Student: Schedule ---- */
function SSchedule() {
  const [selected, setSelected] = useState(2);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [11, 12, 13, 14, 15, 16, 17];
  const slots = [
    { time: "08:00", title: "Math · Algebra", room: "201", icon: BarChart3, tone: "indigo" },
    { time: "09:00", title: "Physics", room: "204", icon: FlaskConical, tone: "violet" },
    { time: "10:15", title: "Recess", room: "Yard", icon: Sparkles, tone: "amber" },
    { time: "10:45", title: "English Lit", room: "112", icon: BookOpen, tone: "rose" },
    { time: "12:00", title: "Lunch", room: "Cafeteria", icon: Utensils, tone: "emerald" },
    { time: "13:00", title: "Art Studio", room: "Art-1", icon: Palette, tone: "fuchsia" },
    { time: "14:15", title: "Sports Practice", room: "Field", icon: Dumbbell, tone: "cyan" },
    { time: "15:30", title: "Music Club", room: "Hall", icon: Music2, tone: "purple" },
  ];
  const toneMap: Record<string, string> = {
    indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    rose: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    fuchsia: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
    cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  };

  return (
    <div className="px-5 pt-3">
      <h1 className="text-lg font-bold">My Schedule</h1>
      <p className="text-xs text-slate-400">November 2025</p>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {days.map((d, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`shrink-0 w-12 py-3 rounded-2xl flex flex-col items-center transition ${selected === i ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40" : "bg-slate-900 border border-slate-800 text-slate-300"}`}>
            <span className="text-[10px] opacity-75">{d}</span>
            <span className="text-base font-bold">{dates[i]}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 relative">
        <div className="absolute left-[34px] top-2 bottom-2 w-px bg-slate-800" />
        <div className="space-y-3">
          {slots.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-12 pt-2 text-[10px] font-semibold text-slate-400 tabular-nums">{s.time}</span>
              <span className="relative mt-2 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-950 z-10" />
              <div className={`flex-1 rounded-2xl border p-3 ${toneMap[s.tone]}`}>
                <div className="flex items-center gap-2">
                  <s.icon className="w-4 h-4" />
                  <p className="text-sm font-bold text-white">{s.title}</p>
                </div>
                <p className="text-[10px] opacity-80 mt-0.5">Room {s.room}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Student: Wallet & Campus Pass ---- */
function SWallet() {
  const txns = [
    { icon: Utensils, label: "Cafeteria Lunch", time: "Today, 12:30", amt: -4.5 },
    { icon: BookOpen, label: "School Store · Notebook", time: "Yesterday", amt: -3.0 },
    { icon: Plus, label: "Top-up from Parent", time: "Mon", amt: +20.0 },
    { icon: Utensils, label: "Snack Bar", time: "Mon", amt: -2.0 },
  ];
  return (
    <div className="px-5 pt-3">
      <h1 className="text-lg font-bold">Digital Wallet</h1>

      {/* Campus pass */}
      <div className="mt-4 rounded-3xl p-[1.5px] bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-500 shadow-[0_0_50px_-10px_rgba(99,102,241,0.7)]">
        <div className="rounded-[1.4rem] bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-widest text-indigo-300 font-bold">CAMPUS ID</p>
              <p className="text-base font-extrabold text-white mt-1">Alex Morgan</p>
              <p className="text-[11px] text-slate-400">Class 10-B · ID NA-2025-0421</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-extrabold text-xl text-white">A</div>
          </div>
          <div className="mt-4 bg-white rounded-2xl p-3 flex items-center justify-center">
            <QrCode className="w-32 h-32 text-slate-900" />
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">Scan to board bus · library check-out</p>
        </div>
      </div>

      {/* Cafeteria wallet */}
      <div className="mt-4 rounded-2xl bg-slate-900 border border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Cafeteria balance</p>
            <p className="text-3xl font-extrabold text-emerald-400 tabular-nums">$24.50</p>
          </div>
          <button className="px-4 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 active:scale-95 transition flex items-center gap-1">
            <Plus className="w-4 h-4" /> Top up
          </button>
        </div>
      </div>

      {/* Transactions */}
      <p className="mt-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent activity</p>
      <div className="mt-2 space-y-2">
        {txns.map((t, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-900 border border-slate-800 p-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.amt > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-300"}`}>
              <t.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{t.label}</p>
              <p className="text-[10px] text-slate-400">{t.time}</p>
            </div>
            <span className={`text-sm font-bold tabular-nums ${t.amt > 0 ? "text-emerald-400" : "text-slate-200"}`}>
              {t.amt > 0 ? "+" : ""}${Math.abs(t.amt).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Student: Profile ---- */
function SProfile() {
  return (
    <div className="px-5 pt-3">
      <h1 className="text-lg font-bold">Profile</h1>
      <div className="mt-4 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 p-5 text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.6)]">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-extrabold text-2xl ring-2 ring-white/40">A</div>
          <div>
            <p className="font-extrabold text-lg">Alex Morgan</p>
            <p className="text-xs opacity-80">Class 10-B · Level 5</p>
            <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold">
              <Crown className="w-3 h-3" /> 450 House Points
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-[10px] mb-1"><span>XP to Level 6</span><span>740 / 1000</span></div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400" style={{ width: "74%" }} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { label: "Badges", value: "12", icon: Award },
          { label: "Streak", value: "12d", icon: Flame },
          { label: "Rank", value: "#7", icon: Trophy },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-slate-900 border border-slate-800 p-3 text-center">
            <s.icon className="w-4 h-4 mx-auto text-indigo-400" />
            <p className="text-base font-extrabold mt-1">{s.value}</p>
            <p className="text-[10px] text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-900 border border-slate-800 divide-y divide-slate-800">
        {[
          { icon: User, label: "Edit profile" },
          { icon: Bell, label: "Notifications" },
          { icon: Shield, label: "Privacy" },
          { icon: HelpCircle, label: "Help & Support" },
          { icon: LogOut, label: "Sign out" },
        ].map((it) => (
          <button key={it.label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-slate-800/50 transition">
            <it.icon className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-sm">{it.label}</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---- Student bottom nav ---- */
function SBottomNav({ active, onChange }: { active: SScreen; onChange: (s: SScreen) => void }) {
  const items: { id: SScreen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "schedule", label: "Schedule", icon: CalendarDays },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 z-40 px-4 pb-3 pt-2 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
      <div className="grid grid-cols-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-1.5 shadow-2xl">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <button key={it.id} onClick={() => onChange(it.id)} className={`flex flex-col items-center gap-0.5 py-2 rounded-xl transition ${on ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40" : "text-slate-400"}`}>
              <it.icon className="w-[18px] h-[18px]" />
              <span className="text-[10px] font-medium">{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
