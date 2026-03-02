"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, type MotionValue } from "framer-motion";
import {
  Download,
  Globe,
  Mail,
  MapPin,
  Menu,
  RefreshCw,
  SlidersHorizontal,
  Twitter,
  Linkedin,
  Zap,
  ArrowRight,
  Lock,
  CreditCard,
  RotateCcw,
  Bolt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const containerClass = "max-w-7xl mx-auto px-6 lg:px-8";

const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

function ChromeMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
    >
      <path
        d="M12 2a10 10 0 0 1 8.66 5H12a5 5 0 0 0-4.33 2.5L5.34 5.5A9.96 9.96 0 0 1 12 2Z"
        fill="#EA4335"
      />
      <path
        d="M20.66 7A10 10 0 0 1 12 22l4.33-7.5A5 5 0 0 0 12 7h8.66Z"
        fill="#34A853"
      />
      <path
        d="M12 22A10 10 0 0 1 3.34 7h8.66a5 5 0 0 0 4.33 7.5L12 22Z"
        fill="#FBBC05"
      />
      <circle cx="12" cy="12" r="3.2" fill="#4285F4" />
    </svg>
  );
}

function WordByWordHeadline() {
  const words = useMemo(
    () => ["Collect", "Google", "Maps", "Leads", "Safely", "and", "Fast."],
    [],
  );

  return (
    <h1 className="font-black text-6xl md:text-7xl lg:text-8xl leading-none tracking-tighter">
      <span className="sr-only">Collect Google Maps Leads Safely and Fast.</span>
      <span aria-hidden="true" className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
        {words.map((w, i) => {
          const isEmphasis = w === "Safely" || w === "Fast.";
          return (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className={cn(
                "inline-block",
                isEmphasis &&
                  "bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent",
              )}
            >
              {w}{" "}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const motionValue = useMotionValue<number>(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return () => {
      unsub();
    };
  }, [motionValue]);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center text-center px-6"
    >
      <CountUpWhenInView motionValue={motionValue} to={value} />
      <div className="text-5xl font-black text-white tabular-nums">
        {display.toLocaleString()}
        {suffix ? <span className="text-green-400">{suffix}</span> : null}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-widest mt-2">
        {label}
      </div>
    </motion.div>
  );
}

function CountUpWhenInView({
  motionValue,
  to,
}: {
  motionValue: MotionValue<number>;
  to: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration: 1.2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, motionValue, to]);

  return <span ref={ref} className="sr-only" />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50"
          : "bg-transparent",
      )}
    >
      <div className={cn(containerClass, "h-16 flex items-center justify-between")}
      >
        <a href="#" className="flex items-center gap-2" aria-label="MapLeads Pro Home">
          <MapPin className="h-5 w-5 text-green-500" />
          <span className="font-bold text-white">MapLeads</span>
          <span className="font-bold text-green-500">Pro</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/Extention.zip" download>
            <Button
              className="rounded-full px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              aria-label="Download Extension"
            >
              <ChromeMark className="mr-2" />
              Download Extension
            </Button>
          </a>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-200"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#050505] border-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      {l.label}
                    </a>
                  ))}
                  <Separator className="bg-gray-800" />
                  <a href="/Extention.zip" download>
                    <Button
                      className="rounded-full bg-green-600 hover:bg-green-500 text-white w-full"
                      aria-label="Download Extension"
                    >
                      <ChromeMark className="mr-2" />
                      Download Extension
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}


function Hero() {
  const leads = [
    { name: "Sunset Dental Clinic", phone: "(305) 555-0192", rating: "4.8", email: "contact@sunsetdental.com" },
    { name: "Miami Smile Studio", phone: "(786) 555-0341", rating: "4.9", email: "hello@miamismile.com" },
    { name: "Downtown Dentistry", phone: "(305) 555-0887", rating: "4.6", email: "—" },
    { name: "Bay Area Dental Group", phone: "(305) 555-0234", rating: "4.7", email: "info@baydental.com" },
    { name: "Coral Gables Smiles", phone: "(305) 555-0571", rating: "4.5", email: "—" },
  ];

  const [progress, setProgress] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); return 100; }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (visibleRows >= leads.length) return;
    const t = setTimeout(() => setVisibleRows((v) => v + 1), 600);
    return () => clearTimeout(t);
  }, [visibleRows, leads.length]);

  return (
    <section className="relative min-h-screen flex items-center bg-[#050505] dot-grid overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] blur-[140px] opacity-15 bg-green-500 rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] blur-[140px] opacity-10 bg-emerald-600 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[2px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent pointer-events-none" />

      <div className={cn(containerClass, "relative py-20 md:py-28 w-full")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Copy ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Pill badge */}
            <motion.a
              variants={fadeInUp}
              href="#features"
              className="self-start inline-flex items-center gap-2 border border-green-500/30 bg-green-500/5 text-green-400 text-xs rounded-full px-4 py-2 hover:bg-green-500/10 transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Now with AI Email Finder
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mt-7 font-black text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tighter"
            >
              <span className="text-white">Collect </span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Google Maps</span>
              <br />
              <span className="text-white">Leads </span>
              <span className="relative inline-block">
                <span className="text-white">Safely</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 Q100 1 198 6" stroke="url(#ul)" strokeWidth="2.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="ul" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#4ade80"/>
                      <stop offset="1" stopColor="#34d399"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="text-white"> &amp; </span>
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Fast.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="mt-7 text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              Extract business leads from Google Maps and enrich them with emails.
              Built for stable, safe scraping at scale —{" "}
              <span className="text-gray-200 font-medium">500+ leads/hour</span> depending on niche &amp; website speed.
            </motion.p>

            {/* Feature pills */}
            <motion.div variants={fadeInUp} className="mt-7 flex flex-wrap gap-2">
              {[
                { icon: Zap, text: "Bulk Extract" },
                { icon: Mail, text: "AI Email Finder" },
                { icon: Download, text: "CSV Export" },
                { icon: Globe, text: "80+ Countries" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 rounded-full bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-gray-300">
                  <Icon className="h-3.5 w-3.5 text-green-400" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <div className="flex flex-col">
                <a href="/Extention.zip" download>
                  <Button className="rounded-full px-8 py-6 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_0_50px_rgba(34,197,94,0.45)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] hover:opacity-95 transition-all">
                    <ChromeMark className="mr-2" />
                    Download Extension — Free
                  </Button>
                </a>
                <div className="mt-2 text-xs text-gray-500 pl-1">✓ No credit card &nbsp;·&nbsp; ✓ 30 sec install &nbsp;·&nbsp; ✓ Chrome, Brave &amp; Edge</div>
              </div>
              <a href="#how-it-works">
                <Button variant="ghost" className="rounded-full px-6 py-6 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600">
                  See how it works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {["MR", "ST", "JK", "LP", "AH"].map((i) => (
                  <Avatar key={i} className="h-9 w-9 border-2 border-[#050505]">
                    <AvatarFallback className="bg-gradient-to-br from-green-900 to-gray-800 text-green-300 text-xs font-semibold">
                      {i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="text-sm text-white font-semibold flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span> 4.9/5 rating
                </div>
                <div className="text-xs text-gray-500">Trusted by 50,000+ professionals in 80+ countries</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Live Extension Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            {/* Floating chips */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -top-5 -left-4 z-20 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5"
            >
              <div className="h-8 w-8 rounded-full bg-green-500/15 flex items-center justify-center">
                <Zap className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-white text-xs font-bold">247 leads</div>
                <div className="text-gray-500 text-[10px]">extracted today</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute -bottom-5 -right-4 z-20 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500/15 flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-white text-xs font-bold">89 emails found</div>
                <div className="text-gray-500 text-[10px]">AI enrichment active</div>
              </div>
            </motion.div>

            {/* Main panel */}
            <div className="rounded-3xl border border-gray-800 bg-[#0D1117] shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-gray-900/70 border-b border-gray-800 px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-[65%] rounded-full bg-black/50 border border-gray-700/60 px-4 py-1.5 text-[11px] text-gray-400 flex items-center gap-2">
                    <span className="text-green-500">🔒</span> google.com/maps/search/dentists+Miami
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-6 w-6 rounded-md bg-green-600/20 border border-green-500/30 flex items-center justify-center">
                    <MapPin className="h-3.5 w-3.5 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Split: map + panel */}
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Map placeholder */}
                <div className="md:col-span-2 bg-[#111823] relative min-h-[280px] overflow-hidden">
                  <div className="absolute inset-0">
                    {/* Subtle map grid lines */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(74,222,128,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    {/* Map pins */}
                    {[
                      { top: "22%", left: "35%" }, { top: "45%", left: "58%" },
                      { top: "65%", left: "28%" }, { top: "38%", left: "72%" },
                      { top: "72%", left: "62%" },
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.25, duration: 0.4, type: "spring" }}
                        className="absolute"
                        style={pos}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center shadow-lg",
                          i === 0 ? "bg-green-500 shadow-green-500/50" : "bg-gray-700 border border-gray-600"
                        )}>
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                        {i === 0 && (
                          <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping" />
                        )}
                      </motion.div>
                    ))}
                    {/* Area highlight */}
                    <div className="absolute top-[20%] left-[20%] w-[60%] h-[55%] border-2 border-green-500/20 rounded-xl bg-green-500/3" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 border border-gray-700 rounded-lg px-3 py-1.5 text-[10px] text-gray-300">
                    Miami, FL · 5 mi radius
                  </div>
                </div>

                {/* Extension panel */}
                <div className="md:col-span-3 bg-[#0D1117] border-l border-gray-800 p-5 flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-green-500/15 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">MapLeads Pro</div>
                        <div className="text-[10px] text-gray-500">Chrome Extension</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                      </span>
                      Extracting...
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>Progress</span>
                      <span className="text-green-400 font-mono">{progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-600">{Math.round(progress * 2.47)} of 247 leads extracted</div>
                  </div>

                  {/* Results table */}
                  <div className="rounded-xl border border-gray-800 overflow-hidden text-[10px] flex-1">
                    <div className="grid grid-cols-12 text-gray-500 px-3 py-2 bg-gray-900/60 border-b border-gray-800 font-medium">
                      <div className="col-span-4">Business</div>
                      <div className="col-span-3">Phone</div>
                      <div className="col-span-3">Email</div>
                      <div className="col-span-2">★ Rating</div>
                    </div>
                    {leads.map((row, i) => (
                      <motion.div
                        key={row.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={i < visibleRows ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-12 px-3 py-2 text-gray-300 border-b border-gray-800/50 last:border-b-0 hover:bg-gray-800/20 transition-colors"
                      >
                        <div className="col-span-4 truncate font-medium text-white">{row.name}</div>
                        <div className="col-span-3 truncate text-gray-400">{row.phone}</div>
                        <div className={cn("col-span-3 truncate", row.email === "—" ? "text-gray-700" : "text-green-400")}>
                          {row.email === "—" ? "—" : <span className="flex items-center gap-0.5"><Mail className="h-2.5 w-2.5 shrink-0" />{row.email.split("@")[0]}…</span>}
                        </div>
                        <div className="col-span-2 text-yellow-400">{row.rating}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-gray-500">
                      <span className="text-green-400 font-bold">{Math.round(progress * 2.47)}</span> leads &nbsp;·&nbsp;
                      <span className="text-blue-400 font-bold">{Math.round(progress * 0.89)}</span> emails
                    </div>
                    <Button size="sm" className="rounded-full bg-green-600 hover:bg-green-500 text-white text-[10px] h-7 px-3 gap-1.5">
                      <Download className="h-3 w-3" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function TrustBar() {
  const logos = ["GrowthLab", "LeadNinja", "SalesForge", "AgencyPro", "OutreachHQ", "ClientFlow", "PipelineHQ", "ReachNow"];
  return (
    <section className="py-10 bg-[#050505] border-y border-gray-800/40 overflow-hidden">
      <div className="text-[10px] tracking-[0.2em] text-gray-600 uppercase text-center mb-7">
        Trusted by growth teams &amp; agencies worldwide
      </div>
      <div className="flex gap-12 animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((t, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 text-gray-700 font-bold text-sm hover:text-gray-400 transition-colors shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500/40 shrink-0" />
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}


function ProblemSolution() {
  const before = [
    "Spending hours manually copying from Google Maps",
    "Missing phone numbers and emails entirely",
    "Paying $500+/month for outdated lead databases",
    "Limited to searching one location at a time",
    "Leads are weeks or months old when you get them",
    "No way to filter by rating or review count",
    "Error-prone spreadsheet copy/paste workflow",
  ];
  const after = [
    "Extract leads in bulk and enrich with emails automatically",
    "AI auto-detects emails from business websites",
    "100% free to start — no database subscriptions",
    "Run searches across 50 cities simultaneously",
    "Real-time data pulled live from Google Maps",
    "Filter by star rating, review count, open status",
    "One-click CSV export ready for your CRM",
  ];
  return (
    <motion.section {...sectionMotionProps} className="py-24 md:py-32 bg-[#050505] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent pointer-events-none" />
      <div className={containerClass}>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-1.5 text-xs text-gray-400 font-medium mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 inline-block" />
            The Old Way vs. The MapLeads Way
          </div>
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight text-white">
            Stop Wasting Time.{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Start Scaling.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_72px_1fr] gap-0 items-start">
          <Card className="rounded-2xl p-8 bg-red-950/10 border border-red-500/15 shadow-[0_0_40px_rgba(0,0,0,0.6)] h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center text-lg">😩</div>
              <div className="text-lg font-bold text-white">Before MapLeads Pro</div>
            </div>
            <ul className="space-y-3">
              {before.map((t) => (
                <li key={t} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="hidden lg:flex flex-col items-center justify-center h-full gap-2 px-2 pt-12">
            <div className="flex-1 w-px bg-gradient-to-b from-red-500/20 to-green-500/20" />
            <div className="rounded-full border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-[10px] text-gray-400 font-bold tracking-wide">VS</div>
            <div className="flex-1 w-px bg-gradient-to-b from-green-500/20 to-transparent" />
          </div>

          <Card className="rounded-2xl p-8 bg-green-950/10 border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.07)] h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-green-500/10 flex items-center justify-center text-lg">🚀</div>
              <div className="text-lg font-bold text-white">After MapLeads Pro</div>
            </div>
            <ul className="space-y-3">
              {after.map((t) => (
                <li key={t} className="flex gap-3 text-gray-200 text-sm leading-relaxed">
                  <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}



function Features() {
  const features = [
    {
      icon: Zap,
      title: "Bulk Lead Extraction",
      desc: "Extract hundreds of business leads from any Google Maps search result in a single click. Names, phones, addresses, websites, hours — all captured automatically.",
      tag: "Core Feature",
    },
    {
      icon: Mail,
      title: "AI Email Finder",
      desc: "Our engine visits each business website and intelligently locates contact emails, contact forms, and social profiles — enriching your leads automatically.",
      tag: "AI Powered",
    },
    {
      icon: Download,
      title: "Instant CSV & Excel Export",
      desc: "Download your leads as a perfectly formatted CSV or Excel file in one click, ready to import into any CRM, email tool, or outreach platform.",
      tag: "Popular",
    },
    {
      icon: SlidersHorizontal,
      title: "Advanced Lead Filters",
      desc: "Filter results by star rating, minimum review count, open/closed status, business category, and more. Only get the leads that match your ideal client profile.",
      tag: "Smart",
    },
    {
      icon: RefreshCw,
      title: "Auto Scroll & Pagination",
      desc: "MapLeads Pro automatically scrolls through all search results, triggering Google Maps to load more listings. No manual scrolling — just pure automation.",
      tag: "Automation",
    },
    {
      icon: Globe,
      title: "Multi-Location Campaigns",
      desc: "Run the same search query across multiple cities, states, or countries in one session. Perfect for agencies running regional or national lead gen campaigns.",
      tag: "Agency",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#050505]">
      <div className={containerClass}>
        <motion.div {...sectionMotionProps}>
          <div className="text-center">
            <div className="text-sm font-medium tracking-widest uppercase text-gray-500">
              Features
            </div>
            <h2 className="mt-4 font-bold text-4xl md:text-5xl tracking-tight text-white">
              Packed With Features That Actually Matter
            </h2>
            <p className="mt-5 text-base text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Everything a sales professional needs to fill their pipeline — built into
              one lightweight Chrome Extension.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={fadeInUp}>
                  <Card className="group rounded-2xl p-8 bg-gray-900 border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-green-500/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] transition-all">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge className="rounded-full bg-green-500/10 text-green-400 text-xs px-3 py-1 border border-green-500/10">
                        {f.tag}
                      </Badge>
                    </div>
                    <div className="mt-6 text-xl font-semibold text-white">
                      {f.title}
                    </div>
                    <div className="mt-3 text-base text-gray-400 leading-relaxed">
                      {f.desc}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      isChrome: true,
      title: "Download the Extension",
      desc: "Download MapLeads Pro and install in under 30 seconds. No account needed. Works on Chrome, Brave, and Edge.",
      cta: { label: "Download Free →", href: "/Extention.zip" },
    },
    {
      n: "02",
      icon: MapPin,
      title: "Search on Google Maps",
      desc: "Open Google Maps and search any business + location — e.g. 'dentists near Miami'. The extension activates automatically.",
      cta: null,
    },
    {
      n: "03",
      icon: Download,
      title: "Extract & Export",
      desc: "Hit 'Extract Leads', watch data populate in real-time, then export as CSV. Done — ready for outreach.",
      cta: null,
    },
  ];
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/10 to-transparent pointer-events-none" />
      <div className={containerClass}>
        <motion.div {...sectionMotionProps}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/80 px-4 py-1.5 text-xs text-gray-400 font-medium mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
              How It Works
            </div>
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight text-white">
              From Install to{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">First Export</span>
              {" "}in 5 Minutes
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base">
              No learning curve. No API setup. Just install, search, and export.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-800/60 rounded-3xl overflow-hidden border border-gray-800">
            {steps.map((step, i) => {
              const Icon = step.icon as React.ElementType | undefined;
              return (
                <div key={step.n} className={cn(
                  "relative bg-[#0D1117] p-8 flex flex-col",
                  i === 1 && "lg:border-x lg:border-x-gray-800/60"
                )}>
                  {i < 2 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-gray-900 border border-gray-700 items-center justify-center text-green-400">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-5">{step.n}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      {step.isChrome ? <ChromeMark className="h-5 w-5" /> : Icon ? <Icon className="h-5 w-5 text-green-400" /> : null}
                    </div>
                    <div className="text-lg font-bold text-white">{step.title}</div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{step.desc}</p>
                  {step.cta && (
                    <a href={step.cta.href} download className="mt-6 inline-flex items-center text-sm text-green-400 hover:text-green-300 font-medium transition-colors">
                      {step.cta.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-black/60 border border-gray-800 p-6 font-mono text-sm overflow-x-auto">
            <div className="min-w-[480px] space-y-1">
              <div className="text-gray-600 mb-2"># MapLeads Pro — Live Extraction Log</div>
              <div><span className="text-gray-600">[00:00]</span> <span className="text-green-400">✅</span> Extension loaded on Google Maps</div>
              <div><span className="text-gray-600">[00:01]</span> <span className="text-blue-400">🔍</span> Search: <span className="text-yellow-400">"roofing contractors Austin TX"</span></div>
              <div><span className="text-gray-600">[00:03]</span> <span className="text-green-400">📍</span> <span className="text-white">Sunset Roofing Co.</span> → <span className="text-blue-400">(512) 555-0142</span> → <span className="text-green-400">📧 contact@sunsetroofing.com</span></div>
              <div><span className="text-gray-600">[00:05]</span> <span className="text-green-400">📍</span> <span className="text-white">Texas Roof Masters</span> → <span className="text-blue-400">(512) 555-0891</span></div>
              <div><span className="text-gray-600">[00:08]</span> <span className="text-green-400">📍</span> <span className="text-white">Austin Pro Roofers</span> → <span className="text-blue-400">(512) 555-0334</span> → <span className="text-green-400">📧 hello@austinproroofers.com</span></div>
              <div className="typing-cursor"><span className="text-gray-600">[00:47]</span> <span className="text-green-400">✅</span> <span className="text-white font-bold">247 leads</span> extracted · <span className="text-blue-400">89 emails</span> found · 💾 CSV ready</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 127, suffix: "M+", label: "Leads Extracted", icon: Zap, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    { value: 50000, suffix: "+", label: "Active Users", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { value: 195, label: "Countries Supported", icon: MapPin, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
    { value: 49, suffix: " ★", label: "Average Rating", icon: Mail, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  ];
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute -top-24 right-1/2 translate-x-1/2 w-[620px] h-[620px] blur-[120px] opacity-15 bg-green-500 rounded-full pointer-events-none" />
      <div className={cn(containerClass, "relative")}>
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-white">Trusted at Scale</h2>
          <p className="mt-3 text-gray-500 text-sm">Numbers that speak for themselves.</p>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} variants={fadeInUp} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-7 flex flex-col items-center text-center hover:border-gray-700 transition-all">
                <div className={cn("h-11 w-11 rounded-xl border flex items-center justify-center mb-4", s.bg)}>
                  <Icon className={cn("h-5 w-5", s.color)} />
                </div>
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


function Pricing() {
  const [annual, setAnnual] = useState(true);
  const proPrice = annual ? 17 : 29;
  const agencyPrice = annual ? 49 : 79;


  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#050505]">
      <div className={containerClass}>
        <motion.div {...sectionMotionProps}>
          <div className="text-center">
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight text-white">
              Simple Pricing. No Surprises.
            </h2>
            <p className="mt-5 text-base text-gray-400 leading-relaxed">
              Start free, upgrade when you need more. Cancel anytime.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className={cn("text-sm", annual ? "text-gray-500" : "text-white")}>Monthly</div>
            <Switch
              checked={annual}
              onCheckedChange={setAnnual}
              aria-label="Toggle annual billing"
            />
            <div className={cn("text-sm", annual ? "text-white" : "text-gray-500")}>Annual</div>
            <Badge className="rounded-full bg-green-500/10 text-green-400 border border-green-500/10">
              Save 40%
            </Badge>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl p-8 bg-gray-900 border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-400">FREE</div>
                  <div className="mt-2 text-4xl font-black text-white">$0<span className="text-gray-500 text-lg">/mo</span></div>
                  <div className="mt-2 text-gray-400">Perfect to try</div>
                </div>
                <Badge className="bg-gray-800 text-gray-400 rounded-full">Starter</Badge>
              </div>
              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✅ 50 leads per search</li>
                <li>✅ CSV export</li>
                <li>✅ Basic filters</li>
                <li className="text-gray-500">❌ Email finder</li>
                <li className="text-gray-500">❌ Multi-location</li>
                <li className="text-gray-500">❌ Priority support</li>
              </ul>
              <a href="/Extention.zip" download className="block">
                <Button
                  variant="outline"
                  className="mt-8 w-full rounded-full border-gray-700 bg-white/5 text-gray-100"
                  aria-label="Download extension free"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Extension Free
                </Button>
              </a>
            </Card>

            <Card className="rounded-2xl p-8 bg-gray-900 border border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.15)] scale-[1.03]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-400">PRO</div>
                  <div className="mt-2 text-4xl font-black text-white">${proPrice}<span className="text-gray-500 text-lg">/mo</span></div>
                  <div className="mt-2 text-gray-400">Most Popular</div>
                </div>
                <Badge className="bg-green-500 text-white rounded-full">Most Popular</Badge>
              </div>
              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✅ Unlimited leads</li>
                <li>✅ AI email finder</li>
                <li>✅ Advanced filters</li>
                <li>✅ Multi-location (10 cities)</li>
                <li>✅ Priority support</li>
                <li>✅ CRM integrations</li>
              </ul>
              <a href="#contact" className="block">
                <Button
                  className="mt-8 w-full rounded-full bg-green-600 hover:bg-green-500 text-white"
                  aria-label="Get Pro plan"
                >
                  Get Pro Access
                </Button>
              </a>
            </Card>

            <Card className="rounded-2xl p-8 bg-gray-900 border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-400">AGENCY</div>
                  <div className="mt-2 text-4xl font-black text-white">${agencyPrice}<span className="text-gray-500 text-lg">/mo</span></div>
                  <div className="mt-2 text-gray-400">For Teams</div>
                </div>
                <Badge className="bg-gray-800 text-gray-200 rounded-full">Teams</Badge>
              </div>
              <ul className="mt-6 space-y-3 text-gray-300">
                <li>✅ Everything in Pro</li>
                <li>✅ 5 team seats</li>
                <li>✅ 50 cities multi-location</li>
                <li>✅ API access</li>
                <li>✅ White-label export</li>
                <li>✅ Dedicated account manager</li>
                <li>✅ Custom onboarding</li>
              </ul>
              <a href="#contact" className="block">
                <Button
                  variant="outline"
                  className="mt-8 w-full rounded-full border-gray-700 bg-white/5 text-gray-100"
                  aria-label="Contact sales"
                >
                  Contact Sales
                </Button>
              </a>
            </Card>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2"><Lock className="h-4 w-4" /> SSL Secure</div>
            <div className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> No credit card to start</div>
            <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4" /> 30-day refund guarantee</div>
            <div className="flex items-center gap-2"><Bolt className="h-4 w-4" /> Instant activation</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { initials: "MR", name: "Marcus Reynolds", role: "Founder, GrowthLab Agency", highlight: "3,200 leads in one afternoon", quote: "I generated 3,200 roofing contractor leads across 12 cities in a single afternoon. What used to take my VA a full week now takes me 2 hours. MapLeads Pro paid for itself on day one." },
    { initials: "ST", name: "Sarah Thomasson", role: "B2B Sales Manager, SalesForge", highlight: "12% → 41% contact rate", quote: "The email finder alone is worth 10x the subscription cost. We went from 12% to 41% contact rates on outreach campaigns after switching to MapLeads data." },
    { initials: "JK", name: "James Kowalski", role: "Freelance Lead Gen Consultant", highlight: "30% → 85% profit margin", quote: "I charge clients $800 per lead gen campaign. MapLeads Pro lets me deliver in 1 hour instead of 8. My profit margin went from 30% to over 85%. Absolute game changer." },
    { initials: "LP", name: "Lisa Park", role: "Marketing Director, ClientFlow", highlight: "Always-current live data", quote: "We tried every lead tool on the market. Nothing comes close to MapLeads for data freshness. The data is pulled live from Google — it is always current." },
    { initials: "DM", name: "David Morales", role: "Real Estate Investor", highlight: "Fresh phone numbers daily", quote: "As someone who cold calls real estate agents, having fresh, accurate phone numbers is everything. MapLeads gives me a competitive edge none of my competitors have." },
    { initials: "AH", name: "Amira Hassan", role: "Agency Owner, OutreachHQ", highlight: "15 clients in one session", quote: "Running campaigns for 15 clients simultaneously. The multi-location feature lets me extract leads for all of them in one session. The ROI on this tool is just absurd." },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] blur-[120px] opacity-10 bg-green-500 rounded-full pointer-events-none" />
      <div className={containerClass}>
        <motion.div {...sectionMotionProps}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-1.5 text-xs text-gray-400 font-medium mb-5">
              <span className="text-yellow-400">⭐</span> 4.9 / 5 from 2,400+ reviews
            </div>
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight text-white">
              Loved by{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">50,000+</span>{" "}
              Professionals
            </h2>
            <p className="mt-4 text-gray-400 text-base">Real results from real users across 80+ countries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <Card key={t.name} className="group rounded-2xl p-7 bg-gray-900/70 border border-gray-800 hover:border-green-500/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] transition-all flex flex-col">
                <div className="text-4xl text-green-500/20 font-serif leading-none mb-3">"</div>
                <div className="mb-3">
                  <span className="inline-block rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-semibold px-2.5 py-1">
                    {t.highlight}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-5 pt-4 border-t border-gray-800 flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-gray-700">
                    <AvatarFallback className="bg-gradient-to-br from-green-900 to-gray-800 text-green-300 text-xs font-bold">{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                  <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



function FAQ() {
  const items = [
    {
      q: "Is MapLeads Pro safe to use?",
      a: "MapLeads Pro is designed for stable extraction of publicly visible business information. It runs inside your browser and focuses on responsible usage patterns. As with any automation tool, use it within reasonable limits and follow applicable website policies and local laws.",
      badge: "Safety",
    },
    {
      q: "Which browsers are supported?",
      a: "MapLeads Pro works on all Chromium-based browsers — Google Chrome, Brave, and Microsoft Edge. It is not currently available for Firefox or Safari.",
      badge: "Compatibility",
    },
    {
      q: "How does the AI email finder work?",
      a: "The extension visits each business website and intelligently scans for contact emails, contact pages, and social profiles — enriching your leads automatically. Results vary by industry and how complete each business website is.",
      badge: "Features",
    },
    {
      q: "How fast is the extraction?",
      a: "Speed depends on Google Maps loading times and websites being visited for email enrichment. Many users collect 500+ leads per hour in good conditions, but results vary by niche, location, and website speed.",
      badge: "Performance",
    },
    {
      q: "Is my data stored on your servers?",
      a: "No. All extracted lead data is processed and stored locally in your browser. We never see, store, or sell your lead data. You own your data 100%.",
      badge: "Privacy",
    },
    {
      q: "Can I export the results?",
      a: "Yes. Export your leads to CSV or Excel in one click — perfectly formatted and ready to import into any CRM, email tool, or outreach platform.",
      badge: "Export",
    },
    {
      q: "Can I use it for client work?",
      a: "Absolutely. Agencies and freelancers use MapLeads Pro to build lead lists for clients at scale. Just ensure your outreach complies with local laws and email regulations.",
      badge: "Agencies",
    },
    {
      q: "Why MapLeads Pro over other scrapers?",
      a: "Most tools are brittle, require complex setup, or break frequently. MapLeads Pro is browser-based, simple, and built to be stable — extract and export quickly with zero script maintenance.",
      badge: "Comparison",
    },
  ];

  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const badgeColors: Record<string, string> = {
    Safety: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Compatibility: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Features: "text-green-400 bg-green-500/10 border-green-500/20",
    Performance: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Privacy: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    Export: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    Agencies: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    Comparison: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  function FAQColumn({ colItems, startIdx }: { colItems: typeof items; startIdx: number }) {
    return (
      <Accordion type="single" collapsible className="w-full space-y-3">
        {colItems.map((item, idx) => (
          <AccordionItem
            key={item.q}
            value={`item-${startIdx + idx}`}
            className="group rounded-2xl border border-gray-800 bg-gray-900/60 px-6 hover:border-green-500/30 hover:bg-gray-900 transition-all duration-200 data-[state=open]:border-green-500/40 data-[state=open]:bg-gray-900 data-[state=open]:shadow-[0_0_30px_rgba(34,197,94,0.08)]"
          >
            <AccordionTrigger className="hover:no-underline py-5 gap-4 [&>svg]:text-gray-500 [&>svg]:group-hover:text-green-400 [&>svg]:transition-colors">
              <div className="flex items-center gap-4 text-left flex-1">
                <span className="text-2xl font-black tabular-nums bg-gradient-to-b from-gray-600 to-gray-800 bg-clip-text text-transparent shrink-0 w-6">
                  {String(startIdx + idx + 1).padStart(2, "0")}
                </span>
                <span className="text-white font-semibold text-base leading-snug group-hover:text-green-50 transition-colors">
                  {item.q}
                </span>
              </div>
              <Badge
                className={cn(
                  "rounded-full text-[10px] px-2.5 py-0.5 border font-medium shrink-0 hidden sm:inline-flex",
                  badgeColors[item.badge] ?? "text-gray-400 bg-gray-800 border-gray-700"
                )}
              >
                {item.badge}
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pl-10 pr-2 text-gray-400 leading-relaxed text-sm">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-10 bg-green-500 rounded-full pointer-events-none" />

      <div className={cn(containerClass, "relative")}>
        <motion.div {...sectionMotionProps}>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-1.5 text-xs text-gray-400 font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
              Got Questions?
            </div>
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight text-white">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="mt-5 text-base text-gray-400 leading-relaxed">
              Everything you need to know about MapLeads Pro — how it works, pricing, data privacy, and more.
            </p>
          </div>

          {/* Two-column accordion grid */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FAQColumn colItems={left} startIdx={0} />
            <FAQColumn colItems={right} startIdx={left.length} />
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-900/40 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-semibold">Still have questions?</div>
              <div className="text-sm text-gray-400 mt-1">
                Our team is happy to help — usually respond within a few hours.
              </div>
            </div>
            <a href="#contact">
              <Button className="rounded-full bg-green-600 hover:bg-green-500 text-white px-6 shrink-0">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const checks = [
    "Free plan, no credit card required",
    "Setup in under 30 seconds",
    "Works on Chrome, Brave & Edge",
    "30-day money back guarantee",
  ];
  return (
    <section className="py-28 md:py-40 relative overflow-hidden">
      {/* layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-green-950/20 to-[#050505]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] blur-[140px] opacity-20 bg-green-500 rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent pointer-events-none" />

      <div className={cn(containerClass, "relative text-center")}>
        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-xs text-green-400 font-medium mb-7">
          🚀 Ready to scale your outreach?
        </div>
        <h2 className="font-black text-5xl md:text-7xl tracking-tight text-white leading-[1.05]">
          Your pipeline{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">won't fill</span>
          <br />itself.
        </h2>
        <p className="mt-7 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Join 50,000+ agencies, freelancers, and sales teams using MapLeads Pro to
          generate qualified leads every single day — for free.
        </p>

        {/* dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/Extention.zip" download>
            <Button
              className="rounded-full px-8 py-6 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_0_40px_rgba(34,197,94,0.45)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] transition-shadow"
              aria-label="Download Extension for Free"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Extension — Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="#contact">
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-gray-700 bg-white/5 text-gray-100 hover:border-green-500/50 transition-colors"
              aria-label="Talk to sales"
            >
              <Mail className="mr-2 h-5 w-5" />
              Talk to Sales
            </Button>
          </a>
        </div>

        {/* checklist */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {checks.map((c) => (
            <div key={c} className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="text-green-400">✓</span>
              {c}
            </div>
          ))}
        </div>

        {/* social proof */}
        <div className="mt-10 text-xs text-gray-600">
          ⭐ 4.9 / 5 · 50,000+ active users · Trusted in 195 countries
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800/50">
      <div className={cn(containerClass, "py-16")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <span className="font-bold text-white">MapLeads</span>
              <span className="font-bold text-green-500">Pro</span>
            </div>
            <p className="mt-4 text-gray-400">
              The smartest way to generate leads from Google Maps.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a aria-label="Twitter" href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a aria-label="LinkedIn" href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:justify-self-end w-full max-w-md">
            <div className="text-white font-semibold">Get lead gen tips in your inbox</div>
            <div className="mt-4 flex gap-3">
              <input
                aria-label="Email address"
                placeholder="you@company.com"
                className="flex-1 rounded-full bg-gray-900 border border-gray-800 px-5 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40"
              />
              <Button
                className="rounded-full bg-green-600 hover:bg-green-500 text-white px-6"
                aria-label="Subscribe"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="text-sm text-white font-semibold">Product</div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#" >Chrome Extension</a>
              <a href="#">Changelog</a>
              <a href="#">Status Page</a>
            </div>
          </div>
          <div>
            <div className="text-sm text-white font-semibold">Resources</div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <a href="#">Documentation</a>
              <a href="#">Blog</a>
              <a href="#">Lead Gen Guide</a>
              <a href="#">API Reference</a>
            </div>
          </div>
          <div>
            <div className="text-sm text-white font-semibold">Company</div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Press Kit</a>
              <a href="#">Affiliate Program</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div>
            <div className="text-sm text-white font-semibold">Legal</div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR Compliance</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>

        <Separator className="mt-14 bg-gray-800/60" />
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>© 2025 MapLeads Pro. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0D1117]">
      <div className={containerClass}>
        <motion.div {...sectionMotionProps}>
          <div className="text-center">
            <div className="text-sm font-medium tracking-widest uppercase text-gray-500">Contact Us</div>
            <h2 className="mt-4 font-bold text-4xl md:text-5xl tracking-tight text-white">
              Get in Touch
            </h2>
            <p className="mt-5 text-base text-gray-400 max-w-xl mx-auto">
              Have questions about MapLeads Pro? Want to upgrade or talk to sales? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-14 max-w-2xl mx-auto">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-green-500/30 bg-green-500/5 p-12 text-center"
              >
                <div className="text-5xl mb-4">✅</div>
                <div className="text-2xl font-bold text-white">Message Sent!</div>
                <div className="mt-3 text-gray-400">We&apos;ll get back to you within 24 hours.</div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 md:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400" htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      className="rounded-xl bg-black/40 border border-gray-700 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="rounded-xl bg-black/40 border border-gray-700 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you need..."
                    className="rounded-xl bg-black/40 border border-gray-700 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold text-sm"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <FinalCTA />
      <Footer />
    </main>
  );
}
