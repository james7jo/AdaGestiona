"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [anio, setAnio] = useState(2026);

  useEffect(() => {
    setAnio(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black/60 border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo y Nombre */}
          <div className="col-span-1 md:col-span-2">
            <a className="flex items-center gap-3 mb-4" href="#inicio">
              <div className="w-10 h-10 rounded-xl bg-ada-turquoise flex items-center justify-center text-ada-dark font-bold text-xl">
                AG
              </div>
              <div className="flex flex-col">
                <strong className="text-white text-lg tracking-wider">
                  ADA<span className="text-ada-turquoise">GESTIONA</span>
                </strong>
                <small className="text-ada-gray text-xs tracking-widest">
                  GROUP S.R.L. · AGENCIA DESPACHANTE DE ADUANA
                </small>
              </div>
            </a>
            <p className="text-ada-gray text-sm mt-4 max-w-sm">
              Tu seguridad, nuestra prioridad. <br />
              Gestión aduanera sin preocupaciones.
            </p>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href={
                  process.env.NEXT_PUBLIC_FACEBOOK || "https://facebook.com/"
                }
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ada-gray hover:text-ada-turquoise hover:border-ada-turquoise transition-all"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z" />
                </svg>
              </a>
              <a
                href={
                  process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/"
                }
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ada-gray hover:text-ada-turquoise hover:border-ada-turquoise transition-all"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r=".8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Parte inferior */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ada-gray">
          <span>
            © {anio} ADAGESTIONA GROUP S.R.L. Todos los derechos reservados.
          </span>
          <a
            href="#inicio"
            className="flex items-center gap-1 hover:text-ada-turquoise transition-colors"
          >
            Volver arriba <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
