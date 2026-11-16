export default function Services() {
  const servicios = [
    {
      titulo: "Gestión de Documentos",
      desc: "Declaraciones de importación/exportación, certificados de origen y facturas comerciales.",
    },
    {
      titulo: "Clasificación Arancelaria",
      desc: "Asistencia en la correcta clasificación de mercancías determinando impuestos y tarifas.",
    },
    {
      titulo: "Liquidación de Tributos",
      desc: "Cálculo y pago de IVA, derechos de aduana y obligaciones fiscales.",
    },
    {
      titulo: "Inspección de Mercancías",
      desc: "Coordinación de inspecciones físicas requeridas por la Aduana.",
    },
    {
      titulo: "Asesoramiento Normativo",
      desc: "Orientación sobre regulaciones vigentes para evitar sanciones y retrasos.",
    },
    {
      titulo: "Liberación de Mercancías",
      desc: "Despacho desde almacenes aduaneros coordinando la nacionalización.",
    },
  ];

  return (
    <section
      id="servicios"
      className="py-24 px-4 container mx-auto relative z-10"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Nuestros <span className="text-ada-turquoise">Servicios</span>
        </h2>
        <p className="text-ada-gray max-w-2xl mx-auto">
          Soluciones integrales para agilizar tus operaciones de comercio
          exterior.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((s, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-ada-turquoise/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ada-turquoise/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-ada-turquoise/20 flex items-center justify-center mb-6 text-ada-turquoise font-bold text-xl border border-ada-turquoise/30">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-ada-turquoise transition-colors">
                {s.titulo}
              </h3>
              <p className="text-ada-gray text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
