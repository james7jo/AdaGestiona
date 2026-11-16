"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Eye, HeartHandshake, User } from "lucide-react";

export default function About() {
  return (
    <section
      id="nosotros"
      className="py-24 px-4 container mx-auto relative z-10 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Lado Izquierdo: Imagen con animación y nota de diseño */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Efecto de brillo de fondo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-ada-turquoise to-blue-500 rounded-3xl blur-2xl opacity-20"></div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-ada-blue/40 backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
              alt="Equipo profesional trabajando"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />

            {/* Nota flotante dentro de la imagen */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-ada-dark/90 border border-white/10 backdrop-blur-md">
              <span className="text-ada-turquoise text-xs font-bold tracking-widest uppercase mb-1 block">
                ADAGESTIONA
              </span>
              <p className="text-white font-semibold text-lg leading-tight">
                Tu seguridad,
                <br />
                nuestra prioridad.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Lado Derecho: Texto, Valores y Tarjeta de la Gerente */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ada-turquoise/10 border border-ada-turquoise/20 text-ada-turquoise text-xs font-bold tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ada-turquoise"></span>
            CONÓCENOS
          </div>

          <h2 className="text-4xl font-bold mb-6 text-white leading-tight">
            Tu aliado en cada <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ada-turquoise to-blue-400">
              gestión aduanera.
            </span>
          </h2>

          <p className="text-ada-gray text-lg mb-4 leading-relaxed">
            En <strong className="text-white">ADAGESTIONA GROUP S.R.L.</strong>{" "}
            acompañamos a personas y empresas en sus operaciones de comercio
            exterior, brindando orientación y gestión aduanera de acuerdo con
            las características de cada operación.
          </p>
          <p className="text-ada-gray mb-8 leading-relaxed">
            Trabajamos para que nuestros clientes comprendan sus procesos,
            cuenten con información clara y reciban acompañamiento durante las
            distintas etapas de su gestión.
          </p>

          {/* Valores con Iconos */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-ada-turquoise/10 flex items-center justify-center text-ada-turquoise shrink-0">
                <Compass size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold">Misión</h4>
                <p className="text-sm text-ada-gray">
                  Brindar servicios de gestión aduanera con responsabilidad,
                  claridad y compromiso.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-ada-turquoise/10 flex items-center justify-center text-ada-turquoise shrink-0">
                <Eye size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold">Visión</h4>
                <p className="text-sm text-ada-gray">
                  Consolidar relaciones de confianza y aportar al desarrollo del
                  comercio exterior.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-ada-turquoise/10 flex items-center justify-center text-ada-turquoise shrink-0">
                <HeartHandshake size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold">Valores</h4>
                <p className="text-sm text-ada-gray">
                  Seguridad, transparencia, responsabilidad y atención
                  personalizada.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta de la Gerente */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ada-turquoise/20 flex items-center justify-center text-ada-turquoise">
                <User size={24} />
              </div>
              <div>
                <p className="text-white font-bold">
                  Mgtr. Heidy Molina Crespo
                </p>
                <p className="text-ada-turquoise text-sm">Gerente General</p>
              </div>
            </div>
            <a
              href="#contacto"
              className="px-4 py-2 bg-ada-turquoise/10 hover:bg-ada-turquoise text-ada-turquoise hover:text-ada-dark rounded-lg transition-colors text-sm font-bold flex items-center gap-1"
            >
              Contactar <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
