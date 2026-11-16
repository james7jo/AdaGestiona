"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  FileCheck2,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* 1. Imagen de fondo con overlay oscuro */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2200&q=90')",
        }}
      />
      {/* Degradado para que el texto se lea perfecto */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-ada-dark via-ada-dark/90 to-transparent" />

      {/* Cuadrícula de fondo estilo tech */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Lado Izquierdo: Textos y Botones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ada-turquoise/10 border border-ada-turquoise/20 text-ada-turquoise text-xs font-bold tracking-wider mb-6 uppercase">
              <span className="w-2 h-2 rounded-full bg-ada-turquoise animate-pulse"></span>
              Agencia Despachante de Aduana
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Conectamos tu negocio con el <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ada-turquoise to-blue-400">
                comercio internacional.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-ada-gray mb-10 max-w-lg leading-relaxed">
              Gestión aduanera para tus operaciones de importación y
              exportación, con atención cercana y acompañamiento en cada etapa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ada-turquoise text-ada-dark font-bold rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(62,183,185,0.3)]"
              >
                Conversemos sobre tu operación <ArrowUpRight size={18} />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Conocer servicios <ArrowDown size={17} />
              </a>
            </div>

            {/* Los 3 puntos de valor (Gestión, Comercio, Soporte) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-2">
                <ShieldCheck className="text-ada-turquoise" size={24} />
                <b className="text-white text-sm">Gestión responsable</b>
                <small className="text-ada-gray text-xs leading-snug">
                  Atención orientada a cada operación
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <Globe2 className="text-ada-turquoise" size={24} />
                <b className="text-white text-sm">Comercio exterior</b>
                <small className="text-ada-gray text-xs leading-snug">
                  Importación y exportación
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <FileCheck2 className="text-ada-turquoise" size={24} />
                <b className="text-white text-sm">Soporte documental</b>
                <small className="text-ada-gray text-xs leading-snug">
                  Orientación durante el proceso
                </small>
              </div>
            </div>
          </motion.div>

          {/* Lado Derecho: Espacio para un elemento visual (o dejarlo vacío para que luzca la foto) */}
          <div className="hidden md:flex justify-end items-center h-full relative">
            {/* Etiqueta flotante lateral */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right text-ada-gray/40 text-sm tracking-[0.3em] font-light whitespace-nowrap">
              ADAGESTIONA GROUP S.R.L. · BOLIVIA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
