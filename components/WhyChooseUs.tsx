export default function WhyChooseUs() {
  const valores = [
    {
      titulo: "Cobertura Nacional",
      desc: "Presencia estratégica en Cochabamba y Santa Cruz.",
    },
    {
      titulo: "Equipo Experto",
      desc: "Liderado por profesionales con amplia experiencia.",
    },
    {
      titulo: "Transparencia Total",
      desc: "Procesos claros desde el inicio hasta la liberación.",
    },
    {
      titulo: "Seguridad",
      desc: "Evitamos sanciones asegurando el cumplimiento estricto.",
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            ¿Por qué <span className="text-ada-turquoise">elegirnos?</span>
          </h2>
          <p className="text-ada-gray max-w-2xl mx-auto">
            Nos diferenciamos por nuestra eficiencia y conocimiento del mercado
            boliviano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valores.map((valor, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-ada-turquoise/20 flex items-center justify-center text-ada-turquoise mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {valor.titulo}
              </h3>
              <p className="text-sm text-ada-gray">{valor.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
