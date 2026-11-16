"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Globe2,
  FileCheck2,
  Compass,
  Eye,
  HeartHandshake,
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Menu,
  X,
  ChevronDown,
  Anchor,
  FileText,
  Tags,
  Calculator,
  ScanSearch,
  Scale,
  PackageCheck,
  CheckCircle2,
  Truck,
  Building2,
  Layers,
  Sparkles,
  Plus,
  Minus,
  Plane,
  Ship,
  Clock,
  Navigation,
  ExternalLink,
} from "lucide-react";

/* ============================================================
   DATOS — cambia aquí los datos reales del cliente
   (Este archivo NO depende de colores personalizados de Tailwind:
   todo está con valores propios, así no hay conflictos de config)
   ============================================================ */
const PHONE = "59176932372"; // sin + ni espacios
const EMAIL = "adagestiona@gmail.com";
const WA = (
  msg = "Hola ADAGESTIONA, quisiera información sobre una operación de comercio exterior.",
) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

const SOCIALS = {
  facebook: "https://facebook.com/", // TODO: link real
  instagram: "https://instagram.com/", // TODO: link real
};

// Ubicación de la oficina en Cochabamba
const LAT = -17.3730572;
const LNG = -66.148823;
const ADDRESS = "Av. América (JVG2+PF8), Cochabamba, Bolivia";
const MAPS_LINK =
  "https://www.google.com/maps/place/JVG2%2BPF8,+Av.+Am%C3%A9rica,+Cochabamba/@-17.3731564,-66.1490562,20z/data=!4m6!3m5!1s0x93e374195fa58f63:0x6cd90cfa5260efae!8m2!3d-17.3730572!4d-66.148823";
const MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;

// Horarios de atención (hora de Bolivia). Minutos desde las 00:00.
// TODO: confirmar horarios reales con el cliente
const HOURS = [
  {
    label: "Lunes a Viernes",
    text: "08:30 – 18:30",
    days: [1, 2, 3, 4, 5],
    from: 8 * 60 + 30,
    to: 18 * 60 + 30,
  },
  { label: "Sábados", text: "Cerrado", days: [6], from: 0, to: 0 },
  { label: "Domingos y feriados", text: "Cerrado", days: [0], from: 0, to: 0 },
];

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "preguntas", label: "Preguntas" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "contacto", label: "Contacto" },
];

const ROTATING = ["importación", "exportación", "despacho", "nacionalización"];

const MARQUEE_A = [
  "Importación",
  "Exportación",
  "Clasificación arancelaria",
  "Liquidación de tributos",
  "Inspección de mercancías",
];
const MARQUEE_B = [
  "Asesoramiento normativo",
  "Liberación de mercancías",
  "Atención personalizada",
  "Cochabamba",
  "Santa Cruz",
];

// Fotos de Unsplash: reemplazar por fotos reales del cliente cuando las tengan
const IMG = {
  hero: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2000&q=80",
  team: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=80",
  containers:
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  warehouse:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  plane:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80",
  ship: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
};

const STATS = [
  {
    n: 2,
    s: "",
    l: "Oficinas en Bolivia",
    icon: Building2,
    g: "from-[#2DD4BF] to-[#3B82F6]",
  },
  {
    n: 6,
    s: "",
    l: "Servicios aduaneros",
    icon: Layers,
    g: "from-[#8B5CF6] to-[#F472B6]",
  },
  {
    n: 100,
    s: "%",
    l: "Atención personalizada",
    icon: Sparkles,
    g: "from-[#FBBF24] to-[#F97316]",
  },
];

const SERVICES = [
  {
    icon: FileText,
    t: "Gestión de Documentos",
    d: "Declaraciones de importación/exportación, certificados de origen y facturas.",
    g: "from-[#2DD4BF] to-[#3B82F6]",
    glow: "rgba(45,212,191,0.22)",
  },
  {
    icon: Tags,
    t: "Clasificación Arancelaria",
    d: "Clasificamos tus mercancías para determinar correctamente impuestos y tarifas.",
    g: "from-[#8B5CF6] to-[#F472B6]",
    glow: "rgba(139,92,246,0.22)",
  },
  {
    icon: Calculator,
    t: "Liquidación de Tributos",
    d: "Cálculo y pago de IVA, derechos de aduana y obligaciones fiscales.",
    g: "from-[#FBBF24] to-[#F97316]",
    glow: "rgba(251,191,36,0.28)",
  },
  {
    icon: ScanSearch,
    t: "Inspección de Mercancías",
    d: "Coordinamos las inspecciones físicas requeridas por la Aduana.",
    g: "from-[#34D399] to-[#06B6D4]",
    glow: "rgba(52,211,153,0.24)",
  },
  {
    icon: Scale,
    t: "Asesoramiento Normativo",
    d: "Orientación sobre regulaciones vigentes para evitar sanciones.",
    g: "from-[#6366F1] to-[#8B5CF6]",
    glow: "rgba(99,102,241,0.22)",
  },
  {
    icon: PackageCheck,
    t: "Liberación de Mercancías",
    d: "Despacho desde almacenes aduaneros coordinando la nacionalización.",
    g: "from-[#F472B6] to-[#FB7185]",
    glow: "rgba(244,114,182,0.25)",
  },
];

const STEPS = [
  {
    icon: Send,
    t: "Nos cuentas tu operación",
    d: "Qué importas o exportas, desde dónde y en qué plazo.",
    c: ["Tipo de mercancía", "Origen y destino", "Plazo estimado"],
    g: "from-[#2DD4BF] to-[#3B82F6]",
  },
  {
    icon: FileCheck2,
    t: "Revisamos tu documentación",
    d: "Verificamos facturas, certificados y clasificación arancelaria.",
    c: [
      "Facturas y certificados",
      "Clasificación arancelaria",
      "Observaciones a tiempo",
    ],
    g: "from-[#8B5CF6] to-[#F472B6]",
  },
  {
    icon: Calculator,
    t: "Gestionamos y liquidamos",
    d: "Declaración, tributos e inspecciones, con seguimiento claro.",
    c: [
      "Declaración aduanera",
      "Liquidación de tributos",
      "Coordinación de inspección",
    ],
    g: "from-[#FBBF24] to-[#F97316]",
  },
  {
    icon: PackageCheck,
    t: "Liberamos tu mercancía",
    d: "Coordinamos el despacho para que llegue a tus manos.",
    c: ["Despacho coordinado", "Nacionalización", "Entrega a tu operación"],
    g: "from-[#34D399] to-[#06B6D4]",
  },
];

const GALLERY = [
  {
    src: IMG.containers,
    t: "Puertos y contenedores",
    cls: "col-span-2 row-span-2",
  },
  { src: IMG.plane, t: "Carga aérea", cls: "" },
  { src: IMG.warehouse, t: "Almacenes", cls: "" },
  { src: IMG.ship, t: "Carga marítima", cls: "col-span-2" },
];

const ABOUT_TABS = [
  {
    id: "mision",
    icon: Compass,
    label: "Misión",
    text: "Brindar servicios de gestión aduanera con responsabilidad y claridad, acompañando cada operación de principio a fin.",
    chips: ["Responsabilidad", "Claridad", "Acompañamiento"],
    g: "from-[#2DD4BF] to-[#3B82F6]",
  },
  {
    id: "vision",
    icon: Eye,
    label: "Visión",
    text: "Consolidar relaciones de confianza y aportar al comercio exterior de nuestros clientes.",
    chips: ["Confianza", "Crecimiento", "Comercio exterior"],
    g: "from-[#8B5CF6] to-[#F472B6]",
  },
  {
    id: "valores",
    icon: HeartHandshake,
    label: "Valores",
    text: "Lo que guía nuestro trabajo todos los días, en cada trámite y con cada cliente.",
    chips: [
      "Seguridad",
      "Transparencia",
      "Responsabilidad",
      "Atención personalizada",
    ],
    g: "from-[#FBBF24] to-[#F97316]",
  },
];

const FAQ = [
  {
    q: "¿Qué necesito para iniciar una operación?",
    a: "Con contarnos qué mercancía es, su origen o destino y tu plazo, ya podemos orientarte. Luego te indicamos los documentos que corresponden a tu caso.",
  },
  {
    q: "¿Atienden importaciones y exportaciones?",
    a: "Sí. Gestionamos operaciones de importación y exportación, incluyendo clasificación arancelaria, liquidación de tributos y liberación de mercancías.",
  },
  {
    q: "¿Dónde están sus oficinas?",
    a: "Tenemos oficinas en Cochabamba (Av. América), Bolivia. Mira el mapa en la sección Ubicación o escríbenos por WhatsApp y te respondemos directamente.",
  },
  {
    q: "¿Cómo puedo hacer seguimiento de mi trámite?",
    a: "Te mantenemos informado en cada etapa del proceso para que siempre sepas en qué punto está tu operación.",
  },
];

const TRACK = [
  { t: "Documentos recibidos", icon: FileText },
  { t: "Clasificación arancelaria", icon: Tags },
  { t: "Tributos liquidados", icon: Calculator },
  { t: "Inspección coordinada", icon: ScanSearch },
  { t: "Mercancía liberada", icon: PackageCheck },
];

const DOTS = [
  { l: "6%", t: "22%", s: 6, d: 0, c: "#2DD4BF" },
  { l: "14%", t: "70%", s: 8, d: 1.2, c: "#F472B6" },
  { l: "27%", t: "40%", s: 5, d: 0.6, c: "#FBBF24" },
  { l: "38%", t: "84%", s: 7, d: 2, c: "#8B5CF6" },
  { l: "52%", t: "18%", s: 6, d: 1.6, c: "#2DD4BF" },
  { l: "63%", t: "62%", s: 5, d: 0.3, c: "#FBBF24" },
  { l: "74%", t: "30%", s: 8, d: 2.4, c: "#F472B6" },
  { l: "86%", t: "78%", s: 6, d: 0.9, c: "#2DD4BF" },
  { l: "92%", t: "14%", s: 5, d: 1.9, c: "#8B5CF6" },
];

/* ============================================================
   ICONOS DE REDES (SVG propios, con color de marca al hover)
   ============================================================ */
type SvgP = React.SVGProps<SVGSVGElement>;

const FacebookIcon = (p: SvgP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);
const InstagramIcon = (p: SvgP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
);
const TikTokIcon = (p: SvgP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);
const WhatsAppIcon = (p: SvgP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.46z" />
  </svg>
);

const NETS = [
  {
    name: "Facebook",
    href: SOCIALS.facebook,
    Icon: FacebookIcon,
    hover: "hover:bg-[#1877F2]",
  },
  {
    name: "Instagram",
    href: SOCIALS.instagram,
    Icon: InstagramIcon,
    hover:
      "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]",
  },
];

/* ============================================================
   HELPERS
   ============================================================ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  kicker,
  title,
  accent,
  text,
  light = false,
}: {
  kicker: string;
  title: string;
  accent: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="text-center mb-10 md:mb-12">
      <span
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-4 border ${
          light
            ? "bg-[#2DD4BF]/15 text-[#0F9488] border-[#2DD4BF]/40"
            : "bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/30"
        }`}
      >
        <Sparkles size={12} /> {kicker}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
        {title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#3B82F6] to-[#8B5CF6]">
          {accent}
        </span>
      </h2>
      {text && (
        <p
          className={`max-w-2xl mx-auto mt-3 text-sm sm:text-base ${light ? "text-[#4A5275]" : "text-[#A9B0D0]"}`}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/* ---------- Tarjeta de servicio (fondo claro, con inclinación 3D) ---------- */
function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });
  const bg = useTransform(
    [gx, gy],
    ([a, b]: number[]) =>
      `radial-gradient(320px circle at ${a}% ${b}%, ${s.glow}, transparent 65%)`,
  );

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <div style={{ perspective: 900 }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileTap={{ scale: 0.98 }}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative group h-full p-6 md:p-7 rounded-3xl bg-white border border-[#E3E8FA] shadow-[0_10px_30px_-12px_rgba(30,40,120,0.18)] hover:shadow-[0_24px_50px_-16px_rgba(30,40,120,0.35)] overflow-hidden transition-shadow"
        >
          <motion.div
            style={{ background: bg }}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div
            className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${s.g} opacity-15 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500`}
          />
          <span className="absolute bottom-1 right-4 text-7xl font-black text-[#0B1030]/[0.05]">
            0{i + 1}
          </span>

          <div
            className="relative flex flex-col h-full"
            style={{ transform: "translateZ(30px)" }}
          >
            <motion.div
              whileHover={{ rotate: 12, scale: 1.12 }}
              className={`w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${s.g} flex items-center justify-center mb-4 shadow-lg`}
            >
              <s.icon className="text-white" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold text-[#0B1030] mb-2">{s.t}</h3>
            <p className="text-[#4A5275] text-sm leading-relaxed mb-4">{s.d}</p>
            <a
              href={WA(`Hola ADAGESTIONA, quisiera información sobre: ${s.t}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#0F9488] group-hover:gap-3 transition-all"
            >
              Consultar <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ---------- Proceso interactivo (se anima solo y también se puede tocar) ---------- */
function Process() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const DUR = 4.5;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((p) => (p + 1) % STEPS.length), DUR * 1000);
    return () => clearTimeout(t);
  }, [i, paused]);

  const step = STEPS[i];
  const Vehicle = i < 2 ? Plane : i < 3 ? Truck : Ship;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ruta animada */}
      <div className="relative mx-4 md:mx-10 mb-8 h-14">
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-white/10" />
        <motion.div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F472B6] shadow-[0_0_14px_#2DD4BF]"
          animate={{ width: `${(i / (STEPS.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        />
        {STEPS.map((s, k) => (
          <button
            key={s.t}
            onClick={() => setI(k)}
            aria-label={s.t}
            style={{ left: `${(k / (STEPS.length - 1)) * 100}%` }}
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
              k <= i
                ? "bg-[#2DD4BF] border-[#2DD4BF] text-[#080A1A] scale-100"
                : "bg-[#0E1128] border-white/20 text-white/60"
            }`}
          >
            {k < i ? <CheckCircle2 size={18} /> : k + 1}
          </button>
        ))}
        <motion.div
          className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#080A1A] flex items-center justify-center shadow-xl pointer-events-none"
          animate={{
            left: `${(i / (STEPS.length - 1)) * 100}%`,
            y: [-6, -14, -6],
          }}
          transition={{
            left: { type: "spring", stiffness: 70, damping: 18 },
            y: { duration: 1.4, repeat: Infinity },
          }}
        >
          <Vehicle size={18} />
        </motion.div>
      </div>

      {/* pestañas con barra de progreso */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-4">
        {STEPS.map((s, k) => {
          const active = k === i;
          return (
            <button
              key={s.t}
              onClick={() => setI(k)}
              className={`relative text-left rounded-2xl p-3 md:p-4 border overflow-hidden transition-all ${
                active
                  ? "bg-white/10 border-white/30 scale-[1.02]"
                  : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${s.g} flex items-center justify-center ${
                    active ? "" : "opacity-60"
                  }`}
                >
                  <s.icon size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-widest text-[#2DD4BF]">
                    PASO {k + 1}
                  </p>
                  <p className="text-xs md:text-sm font-semibold leading-tight">
                    {s.t}
                  </p>
                </div>
              </div>
              {active && (
                <motion.span
                  key={`${i}-${paused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "0%" : "100%" }}
                  transition={{ duration: paused ? 0 : DUR, ease: "linear" }}
                  className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${s.g}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* panel de detalle */}
      <div className="relative rounded-3xl bg-white/[0.06] border border-white/10 backdrop-blur-md p-5 md:p-8 overflow-hidden min-h-[210px]">
        <div
          className={`absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br ${step.g} opacity-25 blur-3xl`}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="relative grid md:grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-center"
          >
            <motion.div
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${step.g} flex items-center justify-center shadow-2xl`}
            >
              <step.icon className="text-white" size={40} />
            </motion.div>
            <div>
              <p className="text-[#2DD4BF] text-xs font-bold tracking-widest mb-1">
                PASO {i + 1} DE {STEPS.length}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                {step.t}
              </h3>
              <p className="text-[#A9B0D0] text-sm md:text-base">{step.d}</p>
            </div>
            <ul className="space-y-2">
              {step.c.map((c, k) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + k * 0.1 }}
                  className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                >
                  <CheckCircle2 size={16} className="text-[#2DD4BF] shrink-0" />{" "}
                  {c}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Preguntas frecuentes ---------- */
function FaqItem({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-colors ${
        open
          ? "bg-white/10 border-[#2DD4BF]/40"
          : "bg-white/[0.04] border-white/10 hover:border-white/25"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 text-left p-4 md:p-5"
      >
        <span className="font-semibold text-sm md:text-base">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
            open ? "bg-[#2DD4BF] text-[#080A1A]" : "bg-white/10"
          }`}
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-4 md:px-5 pb-5 text-sm text-[#A9B0D0] leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Indicador "Abierto ahora" (hora de Bolivia) ---------- */
function useOpenNow() {
  const [state, setState] = useState<{ open: boolean; day: number } | null>(
    null,
  );
  useEffect(() => {
    const calc = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/La_Paz",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
        get("weekday"),
      );
      const mins =
        (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
      const slot = HOURS.find((h) => h.days.includes(day));
      setState({
        day,
        open: !!slot && slot.to > 0 && mins >= slot.from && mins < slot.to,
      });
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, []);
  return state;
}

/* ---------- Cinta infinita ---------- */
function MarqueeRow({
  items,
  reverse = false,
  accent,
}: {
  items: string[];
  reverse?: boolean;
  accent: string;
}) {
  return (
    <div
      className="flex w-max gap-4 ada-marquee"
      style={{ animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[...items, ...items, ...items, ...items].map((m, i) => (
        <span
          key={i}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-sm md:text-base font-semibold text-white/85 whitespace-nowrap"
        >
          <Anchor size={16} style={{ color: accent }} />
          {m}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   PÁGINA
   ============================================================ */
export default function Home() {
  // --- efectos globales ---
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const heroY = useTransform(scrollY, [0, 700], [0, 140]);

  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const mouseGlow = useTransform(
    [mx, my],
    ([a, b]: number[]) =>
      `radial-gradient(520px circle at ${a}px ${b}px, rgba(45,212,191,0.10), transparent 60%)`,
  );

  // --- navbar ---
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("inicio");

  // --- hero ---
  const [word, setWord] = useState(0);
  const [track, setTrack] = useState(0);

  // --- nosotros / faq ---
  const [tab, setTab] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);

  // --- contacto / whatsapp ---
  const [sent, setSent] = useState(false);
  const [tip, setTip] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });

    const rot = setInterval(
      () => setWord((p) => (p + 1) % ROTATING.length),
      2200,
    );
    const trk = setInterval(
      () => setTrack((p) => (p + 1) % TRACK.length),
      2000,
    );
    const t1 = setTimeout(() => setTip(true), 4000);
    const t2 = setTimeout(() => setTip(false), 12000);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      clearInterval(rot);
      clearInterval(trk);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mx, my]);

  // Por ahora la consulta se envía por WhatsApp (sin backend). Luego se conecta al sistema.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const text = `Hola ADAGESTIONA, soy ${f.get("nombre")} (${f.get("correo")}).\n\n${msg}`;
    window.open(WA(text), "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    form.reset();
    setMsg("");
  };

  const inputCls =
    "w-full bg-[#0A0D24]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 focus:outline-none transition-all";

  const T = ABOUT_TABS[tab];
  const now = useOpenNow();

  return (
    <div className="bg-[#080A1A] min-h-screen text-white selection:bg-[#2DD4BF] selection:text-[#080A1A] overflow-x-hidden font-sans">
      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 80px; }
        @keyframes ada-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ada-marquee { animation: ada-marquee 38s linear infinite; }
        .ada-marquee:hover { animation-play-state: paused; }
        @keyframes ada-shine { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(260%) skewX(-20deg); } }
        .ada-shine::after { content: ""; position: absolute; top: 0; bottom: 0; width: 40%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent); animation: ada-shine 3.2s ease-in-out infinite; }
        @keyframes ada-grad { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .ada-grad-text { background-size: 200% 200%; animation: ada-grad 5s ease infinite; }
        @keyframes ada-dash { to { stroke-dashoffset: -60; } }
        .ada-dash { animation: ada-dash 3s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ada-marquee, .ada-shine::after, .ada-grad-text, .ada-dash { animation: none !important; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* ============ BARRA DE PROGRESO + LUZ DEL MOUSE ============ */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F472B6] z-[60]"
      />
      <motion.div
        style={{ background: mouseGlow }}
        className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      />

      {/* ============ NAVBAR ============ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || menu
            ? "bg-[#080A1A]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[68px] md:h-20">
          <a href="#inicio" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center text-[#080A1A] font-extrabold shadow-lg shadow-[#2DD4BF]/30">
              AG
            </div>
            <span className="font-bold text-base md:text-lg tracking-wider">
              ADAGESTIONA{" "}
              <span className="text-[#2DD4BF] text-xs hidden sm:inline">
                GROUP
              </span>
            </span>
          </a>

          <div className="hidden xl:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="relative px-4 py-2 text-sm font-medium text-[#A9B0D0] hover:text-white transition-colors"
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
            <a
              href={WA()}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden ada-shine ml-3 px-5 py-2.5 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#080A1A] font-bold rounded-lg text-sm hover:scale-105 transition-transform"
            >
              Solicitar Asesoría
            </a>
          </div>

          <button
            className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setMenu(!menu)}
            aria-label="Menú"
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden overflow-hidden"
            >
              <div className="px-5 py-3 flex flex-col">
                {NAV.map((n, k) => (
                  <motion.a
                    key={n.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: k * 0.05 }}
                    href={`#${n.id}`}
                    onClick={() => setMenu(false)}
                    className={`py-3 text-lg font-medium border-b border-white/5 ${
                      active === n.id ? "text-[#2DD4BF]" : ""
                    }`}
                  >
                    {n.label}
                  </motion.a>
                ))}
                <a
                  href={WA()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="my-4 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white font-bold"
                >
                  <WhatsAppIcon className="w-5 h-5" /> Escribir por WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        {/* ============ HERO ============ */}
        <section
          id="inicio"
          className="relative flex items-center overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20 lg:min-h-screen"
        >
          <motion.div
            style={{ y: heroY, backgroundImage: `url('${IMG.hero}')` }}
            className="absolute inset-x-0 -top-10 -bottom-10 bg-cover bg-center bg-[#0E1128]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#080A1A] via-[#120A33]/90 to-[#0B2B3A]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A1A] via-transparent to-transparent" />

          {/* auroras */}
          <motion.div
            animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 right-[8%] w-60 md:w-80 h-60 md:h-80 rounded-full bg-[#8B5CF6]/30 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-[20%] w-60 h-60 rounded-full bg-[#2DD4BF]/25 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[35%] w-48 h-48 rounded-full bg-[#F472B6]/20 blur-3xl"
          />

          {/* partículas */}
          {DOTS.map((d, k) => (
            <motion.span
              key={k}
              className="absolute rounded-full"
              style={{
                left: d.l,
                top: d.t,
                width: d.s,
                height: d.s,
                background: d.c,
                boxShadow: `0 0 12px ${d.c}`,
              }}
              animate={{ y: [0, -22, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 4 + (k % 3),
                repeat: Infinity,
                delay: d.d,
              }}
            />
          ))}

          {/* ruta curva animada */}
          <svg
            className="absolute inset-0 w-full h-full opacity-40 hidden md:block pointer-events-none"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              id="route"
              d="M-20 560 C 250 380, 450 640, 700 420 S 1050 180, 1230 260"
              stroke="#2DD4BF"
              strokeWidth="2"
              strokeDasharray="8 10"
              className="ada-dash"
            />
            <circle r="7" fill="#FBBF24">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                path="M-20 560 C 250 380, 450 640, 700 420 S 1050 180, 1230 260"
              />
            </circle>
          </svg>

          <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
              {/* texto */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-[2.6rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-5"
                >
                  Tu{" "}
                  <span className="relative inline-block align-bottom">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={ROTATING[word]}
                        initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.45 }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] via-[#FBBF24] to-[#F472B6] ada-grad-text"
                      >
                        {ROTATING[word]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <br />
                  sin complicaciones.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="text-base md:text-lg text-[#C3C9E4] mb-7 max-w-xl leading-relaxed"
                >
                  Conectamos tu negocio con el comercio internacional. Gestión
                  aduanera con atención cercana y acompañamiento en cada etapa.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 mb-8"
                >
                  <a
                    href={WA()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden ada-shine inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#080A1A] font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] transition-all"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Conversemos por WhatsApp
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>
                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center px-7 py-4 bg-white/5 border border-white/20 font-semibold rounded-xl hover:bg-white/10 hover:border-[#F472B6]/60 transition-all backdrop-blur-sm"
                  >
                    Conocer servicios
                  </a>
                </motion.div>

                <div className="grid grid-cols-3 gap-2.5 md:gap-3 max-w-xl">
                  {[
                    {
                      icon: ShieldCheck,
                      t: "Gestión responsable",
                      d: "Cada operación",
                      c: "#2DD4BF",
                    },
                    {
                      icon: Globe2,
                      t: "Comercio exterior",
                      d: "Import. y export.",
                      c: "#FBBF24",
                    },
                    {
                      icon: FileCheck2,
                      t: "Soporte documental",
                      d: "Te orientamos",
                      c: "#F472B6",
                    },
                  ].map((b, k) => (
                    <motion.div
                      key={b.t}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + k * 0.12 }}
                      whileHover={{ y: -6 }}
                      className="p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md"
                    >
                      <b.icon
                        style={{ color: b.c }}
                        className="mb-1.5"
                        size={22}
                      />
                      <p className="font-bold text-[11px] sm:text-sm leading-tight">
                        {b.t}
                      </p>
                      <p className="text-[#A9B0D0] text-[10px] sm:text-xs hidden sm:block">
                        {b.d}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* tarjeta de seguimiento animada */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="relative max-w-md w-full mx-auto lg:ml-auto"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative rounded-3xl p-5 md:p-6 bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl shadow-black/40"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-[#2DD4BF] font-bold">
                        OPERACIÓN EN CURSO
                      </p>
                      <p className="font-bold text-lg">
                        Tu mercancía, paso a paso
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs bg-[#25D366]/20 text-[#4ADE80] px-2.5 py-1 rounded-full font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />{" "}
                      En vivo
                    </span>
                  </div>

                  <div className="space-y-2">
                    {TRACK.map((s, k) => {
                      const done = k < track;
                      const now = k === track;
                      return (
                        <motion.div
                          key={s.t}
                          animate={{ scale: now ? 1.03 : 1 }}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-colors ${
                            now
                              ? "bg-[#2DD4BF]/20 border-[#2DD4BF]/60"
                              : done
                                ? "bg-white/10 border-white/10"
                                : "bg-white/[0.04] border-white/5 opacity-60"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              done || now
                                ? "bg-[#2DD4BF] text-[#080A1A]"
                                : "bg-white/10"
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <s.icon size={16} />
                            )}
                          </div>
                          <span className="text-sm font-medium flex-1">
                            {s.t}
                          </span>
                          {now && (
                            <motion.span
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-[10px] font-bold text-[#2DD4BF]"
                            >
                              AHORA
                            </motion.span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#FBBF24] to-[#F472B6]"
                      animate={{
                        width: `${((track + 1) / TRACK.length) * 100}%`,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.a
            href="#nosotros"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#A9B0D0] hover:text-[#2DD4BF] hidden lg:block"
            aria-label="Bajar"
          >
            <ChevronDown size={30} />
          </motion.a>
        </section>

        {/* ============ CINTAS ============ */}
        <div className="relative border-y border-white/10 bg-gradient-to-r from-[#8B5CF6]/10 via-[#2DD4BF]/10 to-[#F472B6]/10 py-4 overflow-hidden space-y-3">
          <div className="absolute left-0 top-0 h-full w-16 md:w-28 bg-gradient-to-r from-[#080A1A] to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-16 md:w-28 bg-gradient-to-l from-[#080A1A] to-transparent z-10" />
          <MarqueeRow items={MARQUEE_A} accent="#2DD4BF" />
          <MarqueeRow items={MARQUEE_B} accent="#F472B6" reverse />
        </div>

        {/* ============ NOSOTROS ============ */}
        <section
          id="nosotros"
          className="relative py-14 md:py-20 overflow-hidden"
        >
          <div className="absolute -left-32 top-10 w-80 h-80 rounded-full bg-[#8B5CF6]/15 blur-3xl" />
          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal className="relative">
                <motion.div
                  animate={{ rotate: [0, 3, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -inset-3 bg-gradient-to-tr from-[#2DD4BF] via-[#8B5CF6] to-[#F472B6] rounded-[2rem] blur-2xl opacity-40"
                />
                <div className="relative rounded-3xl overflow-hidden border border-white/15 group bg-[#0E1128]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG.team}
                    alt="Equipo ADAGESTIONA"
                    loading="lazy"
                    className="w-full h-[320px] sm:h-[420px] md:h-[480px] object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A1A]/85 via-transparent to-[#8B5CF6]/10" />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#080A1A]/80 border border-[#2DD4BF]/40 backdrop-blur-md flex items-center gap-3"
                  >
                    <ShieldCheck className="text-[#2DD4BF] shrink-0" />
                    <p className="font-semibold text-sm">
                      Tu seguridad, nuestra prioridad.
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-4 -right-2 md:-right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#F97316] flex items-center justify-center shadow-xl"
                >
                  <Globe2 className="text-white" size={30} />
                </motion.div>
              </Reveal>

              <div>
                <Reveal>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                    ¿Quiénes{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#8B5CF6]">
                      Somos?
                    </span>
                  </h2>
                  <p className="text-[#B4BAD8] mb-6 md:text-lg">
                    En{" "}
                    <strong className="text-white">
                      ADAGESTIONA GROUP S.R.L.
                    </strong>{" "}
                    acompañamos a personas y empresas en sus operaciones de
                    comercio exterior, brindando orientación y gestión aduanera
                    de acuerdo con las características de cada operación.
                  </p>
                </Reveal>

                {/* pestañas interactivas */}
                <Reveal delay={0.1}>
                  <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-3">
                    {ABOUT_TABS.map((t, k) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(k)}
                        className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          tab === k
                            ? "text-[#080A1A]"
                            : "text-[#A9B0D0] hover:text-white"
                        }`}
                      >
                        {tab === k && (
                          <motion.span
                            layoutId="about-pill"
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${t.g}`}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        <t.icon size={16} className="relative" />
                        <span className="relative">{t.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative rounded-2xl bg-white/[0.06] border border-white/10 p-5 min-h-[150px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={T.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-[#D5D9EE] mb-4">{T.text}</p>
                        <div className="flex flex-wrap gap-2">
                          {T.chips.map((c, k) => (
                            <motion.span
                              key={c}
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + k * 0.08 }}
                              className={`px-3 py-1 rounded-full text-xs font-bold text-[#080A1A] bg-gradient-to-r ${T.g}`}
                            >
                              {c}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-5 inline-flex items-center gap-4 bg-gradient-to-r from-[#2DD4BF]/20 via-[#8B5CF6]/10 to-transparent border border-[#2DD4BF]/25 p-3.5 pr-7 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center">
                      <User className="text-[#080A1A]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Mgtr. Heidy Molina Crespo</p>
                      <p className="text-[#2DD4BF] text-sm">Gerente General</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ============ NÚMEROS ============ */}
        <section className="pb-14 md:pb-20 container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, rotate: i === 1 ? 1 : -1 }}
                  className="relative overflow-hidden flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 p-5 md:p-6 rounded-3xl bg-white/[0.06] border border-white/10 hover:border-white/30 transition-colors"
                >
                  <div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.g} opacity-25 blur-xl`}
                  />
                  <div
                    className={`relative w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${s.g} flex items-center justify-center shadow-lg`}
                  >
                    <s.icon className="text-white" size={26} />
                  </div>
                  <div className="relative">
                    <div
                      className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${s.g}`}
                    >
                      <Counter to={s.n} suffix={s.s} />
                    </div>
                    <p className="text-[#A9B0D0] text-sm">{s.l}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ SERVICIOS (panel claro para dar contraste) ============ */}
        <section id="servicios" className="px-3 md:px-6">
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-[#F4F6FF] to-[#E9EEFF] text-[#0B1030] py-14 md:py-20 px-4">
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#2DD4BF]/25 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F472B6]/20 blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#FBBF24]/15 blur-3xl" />
            <div className="relative max-w-7xl mx-auto">
              <SectionTitle
                light
                kicker="Qué hacemos"
                title="Nuestros"
                accent="Servicios"
                text="Soluciones integrales para agilizar tus operaciones de comercio exterior."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {SERVICES.map((s, i) => (
                  <ServiceCard key={s.t} s={s} i={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ PROCESO ============ */}
        <section
          id="proceso"
          className="relative py-14 md:py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#080A1A] via-[#14093A] to-[#080A1A]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8B5CF6]/20 blur-3xl rounded-full" />
          <div className="container mx-auto px-4 max-w-5xl relative">
            <SectionTitle
              kicker="Cómo trabajamos"
              title="Así es nuestro"
              accent="proceso"
              text="Toca cada paso para ver qué hacemos en cada etapa."
            />
            <Reveal>
              <Process />
            </Reveal>
          </div>
        </section>

        {/* ============ GALERÍA ============ */}
        <section className="py-14 md:py-20 container mx-auto px-4 max-w-7xl">
          <SectionTitle
            kicker="Comercio sin fronteras"
            title="Mercancías que"
            accent="llegan a destino"
            text="Mar, aire y tierra: coordinamos tu operación de principio a fin."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] md:auto-rows-[210px] gap-3 md:gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.t} delay={i * 0.08} className={g.cls}>
                <motion.div
                  whileHover="hover"
                  whileTap="hover"
                  className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 cursor-pointer bg-[#0E1128]"
                >
                  <motion.img
                    src={g.src}
                    alt={g.t}
                    loading="lazy"
                    variants={{ hover: { scale: 1.14 } }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A1A] via-[#080A1A]/10 to-transparent" />
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/25 to-[#8B5CF6]/25"
                  />
                  <p className="absolute bottom-3 left-4 right-3 font-bold text-sm md:text-lg">
                    {g.t}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ PREGUNTAS ============ */}
        <section
          id="preguntas"
          className="pb-14 md:pb-20 container mx-auto px-4 max-w-3xl"
        >
          <SectionTitle
            kicker="Resolvemos tus dudas"
            title="Preguntas"
            accent="frecuentes"
          />
          <div className="space-y-3">
            {FAQ.map((f, k) => (
              <Reveal key={f.q} delay={k * 0.06}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={faq === k}
                  onClick={() => setFaq(faq === k ? null : k)}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ UBICACIÓN + HORARIOS + MAPA ============ */}
        <section
          id="ubicacion"
          className="relative pb-14 md:pb-20 overflow-hidden"
        >
          <div className="absolute -right-32 top-0 w-80 h-80 rounded-full bg-[#2DD4BF]/12 blur-3xl" />
          <div className="container mx-auto px-4 max-w-7xl relative">
            <SectionTitle
              kicker="Visítanos"
              title="Dónde"
              accent="encontrarnos"
              text="Estamos en Cochabamba. Ven a vernos o escríbenos antes para coordinar tu visita."
            />

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5 md:gap-6">
              {/* tarjetas de información */}
              <div className="space-y-4">
                {/* dirección */}
                <Reveal>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex gap-4 p-5 rounded-3xl bg-white/[0.06] border border-white/10 hover:border-[#2DD4BF]/50 transition-colors"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-[#2DD4BF] font-bold mb-1">
                        OFICINA CENTRAL
                      </p>
                      <p className="font-bold text-lg leading-snug">
                        Cochabamba
                      </p>
                      <p className="text-[#B4BAD8] text-sm">{ADDRESS}</p>
                    </div>
                  </motion.div>
                </Reveal>

                {/* horarios */}
                <Reveal delay={0.08}>
                  <div className="p-5 rounded-3xl bg-white/[0.06] border border-white/10">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#F97316] flex items-center justify-center">
                          <Clock className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.2em] text-[#FBBF24] font-bold">
                            HORARIOS
                          </p>
                          <p className="font-bold text-lg leading-snug">
                            Atención al cliente
                          </p>
                        </div>
                      </div>
                      {now && (
                        <span
                          className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                            now.open
                              ? "bg-[#25D366]/20 text-[#4ADE80]"
                              : "bg-[#F472B6]/15 text-[#F9A8D4]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              now.open
                                ? "bg-[#4ADE80] animate-pulse"
                                : "bg-[#F9A8D4]"
                            }`}
                          />
                          {now.open ? "Abierto ahora" : "Cerrado ahora"}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {HOURS.map((h) => {
                        const today = now ? h.days.includes(now.day) : false;
                        return (
                          <li
                            key={h.label}
                            className={`flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm border transition-colors ${
                              today
                                ? "bg-[#2DD4BF]/15 border-[#2DD4BF]/50 font-semibold"
                                : "bg-white/[0.04] border-white/5 text-[#B4BAD8]"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {today && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                              )}
                              {h.label}
                            </span>
                            <span
                              className={
                                h.text === "Cerrado" ? "text-[#F9A8D4]" : ""
                              }
                            >
                              {h.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>

                {/* oficinas */}
                <Reveal delay={0.16}>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/25 to-[#8B5CF6]/5 border border-[#8B5CF6]/30">
                      <Building2 className="text-[#C4B5FD] mb-2" size={22} />
                      <p className="font-bold">Cochabamba</p>
                      <p className="text-xs text-[#B4BAD8]">
                        Oficina con atención presencial
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* botones */}
                <Reveal delay={0.22}>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <a
                      href={MAPS_DIR}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden ada-shine flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#080A1A] font-bold hover:scale-[1.03] transition-transform"
                    >
                      <Navigation size={18} /> Cómo llegar
                    </a>
                    <a
                      href={WA(
                        "Hola ADAGESTIONA, quisiera coordinar una visita a la oficina.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white font-bold hover:scale-[1.03] transition-transform"
                    >
                      <WhatsAppIcon className="w-5 h-5" /> Coordinar visita
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* mapa */}
              <Reveal delay={0.1} className="h-full">
                <div className="relative h-full min-h-[340px] md:min-h-[460px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40 bg-[#0E1128] group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#2DD4BF]/30 via-transparent to-[#F472B6]/30 blur-xl opacity-60 pointer-events-none" />
                  <iframe
                    title="Ubicación de ADAGESTIONA en Cochabamba"
                    src={MAPS_EMBED}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                  <motion.a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-3 right-3 bottom-3 sm:right-auto sm:max-w-xs flex items-center gap-3 p-3 rounded-2xl bg-[#080A1A]/90 border border-[#2DD4BF]/40 backdrop-blur-md shadow-xl hover:border-[#2DD4BF] transition-colors"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center">
                      <MapPin size={20} className="text-[#080A1A]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm">ADAGESTIONA GROUP</p>
                      <p className="text-xs text-[#B4BAD8] truncate">
                        Av. América, Cochabamba
                      </p>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-[#2DD4BF] shrink-0"
                    />
                  </motion.a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ CONTACTO ============ */}
        <section
          id="contacto"
          className="py-14 md:py-20 relative border-t border-white/10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#2DD4BF]/15 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F472B6]/15 blur-3xl rounded-full" />
          <div className="container mx-auto px-4 max-w-6xl relative">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                  Hablemos de tu{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#F472B6]">
                    operación
                  </span>
                </h2>
                <p className="text-[#B4BAD8] mb-7">
                  Tu próxima operación comienza con una conversación. Cuéntanos
                  qué necesitas.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: Mail,
                      t: "Correo",
                      v: EMAIL,
                      href: `mailto:${EMAIL}`,
                      g: "from-[#2DD4BF] to-[#3B82F6]",
                    },
                    {
                      icon: Phone,
                      t: "Teléfono",
                      v: "+591 76932372",
                      href: `tel:+${PHONE}`,
                      g: "from-[#8B5CF6] to-[#F472B6]",
                    },
                    {
                      icon: MapPin,
                      t: "Oficinas",
                      v: "Av. América, Cochabamba · Bolivia",
                      href: "#ubicacion",
                      g: "from-[#FBBF24] to-[#F97316]",
                    },
                  ].map((c) => {
                    const body = (
                      <motion.div
                        whileHover={{ x: 8 }}
                        className="flex gap-4 items-center p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-white/30 transition-colors"
                      >
                        <div
                          className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${c.g} flex items-center justify-center`}
                        >
                          <c.icon className="text-white" size={22} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-[#A9B0D0]">
                            {c.t}
                          </h4>
                          <p className="font-medium break-words">{c.v}</p>
                        </div>
                      </motion.div>
                    );
                    return c.href ? (
                      <a key={c.t} href={c.href} className="block">
                        {body}
                      </a>
                    ) : (
                      <div key={c.t}>{body}</div>
                    );
                  })}
                  <a
                    href={WA()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden ada-shine flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold hover:scale-[1.02] transition-transform"
                  >
                    <WhatsAppIcon className="w-5 h-5" /> Escribir directo por
                    WhatsApp
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <form
                  onSubmit={onSubmit}
                  className="bg-white/[0.07] border border-white/15 rounded-3xl p-5 md:p-7 backdrop-blur-md space-y-4 shadow-2xl shadow-black/30"
                >
                  <div>
                    <label className="block text-sm text-[#A9B0D0] mb-1">
                      Nombre completo
                    </label>
                    <input
                      name="nombre"
                      required
                      type="text"
                      autoComplete="name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A9B0D0] mb-1">
                      Correo electrónico
                    </label>
                    <input
                      name="correo"
                      required
                      type="email"
                      autoComplete="email"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A9B0D0] mb-2">
                      ¿Qué necesitas? (toca para sugerir)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        "Importación",
                        "Exportación",
                        "Clasificación",
                        "Tributos",
                      ].map((c) => (
                        <button
                          type="button"
                          key={c}
                          onClick={() =>
                            setMsg((m) =>
                              m
                                ? m
                                : `Quisiera información sobre ${c.toLowerCase()}. `,
                            )
                          }
                          className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/10 hover:bg-[#2DD4BF] hover:text-[#080A1A] transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <textarea
                      name="mensaje"
                      required
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Cuéntanos sobre tu operación…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="relative overflow-hidden ada-shine w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-[#080A1A] font-bold py-4 rounded-xl"
                  >
                    {sent ? (
                      <>
                        ¡Abriendo WhatsApp! <CheckCircle2 size={18} />
                      </>
                    ) : (
                      <>
                        Enviar consulta <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-black/50 border-t border-white/10 pt-12 pb-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <a href="#inicio" className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center text-[#080A1A] font-extrabold">
                  AG
                </div>
                <div>
                  <strong className="text-lg">
                    ADA<span className="text-[#2DD4BF]">GESTIONA</span>
                  </strong>
                  <br />
                  <small className="text-[#A9B0D0] text-[10px] tracking-widest">
                    GROUP S.R.L.
                  </small>
                </div>
              </a>
              <p className="text-[#A9B0D0] text-sm max-w-sm">
                Tu seguridad, nuestra prioridad. Gestión aduanera sin
                preocupaciones.
              </p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-[#A9B0D0] hover:text-[#2DD4BF] transition-colors"
              >
                <MapPin size={16} className="text-[#2DD4BF]" /> {ADDRESS}
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Síguenos</h4>
              <div className="flex gap-3">
                {NETS.map(({ name, href, Icon, hover }) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    whileHover={{ y: -6, rotate: -6, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all ${hover}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 text-center md:text-left text-sm text-[#A9B0D0]">
            © 2026 ADAGESTIONA GROUP S.R.L. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* ============ BOTÓN FLOTANTE WHATSAPP ============ */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {tip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden sm:block bg-white text-[#080A1A] text-sm font-semibold px-4 py-3 rounded-2xl rounded-br-sm shadow-xl"
            >
              ¿Hablamos de tu operación? 👋
            </motion.div>
          )}
        </AnimatePresence>
        <motion.a
          href={WA()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 1 }}
          whileHover={{ scale: 1.12, rotate: 8 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)]"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
          <WhatsAppIcon className="relative w-7 h-7 md:w-8 md:h-8" />
        </motion.a>
      </div>
    </div>
  );
}
