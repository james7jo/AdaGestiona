export default function Process() {
  const pasos = [
    {
      num: "01",
      titulo: "Recepción de documentos",
      desc: "Recibimos facturas, empaque y conocimiento de embarque.",
    },
    {
      num: "02",
      titulo: "Clasificación y liquidación",
      desc: "Calculamos impuestos según la partida arancelaria.",
    },
    {
      num: "03",
      titulo: "Presentación en Aduana",
      desc: "Ingresamos la DIM en el sistema oficial.",
    },
    {
      num: "04",
      titulo: "Pago de tributos",
      desc: "Gestionamos el pago de impuestos correspondientes.",
    },
    {
      num: "05",
      titulo: "Liberación",
      desc: "La Aduana valida y la carga queda libre para su retiro.",
    },
  ];

  return (
    <section
      id="proceso"
      className="py-24 bg-ada-blue/10 relative z-10 border-y border-white/5"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Nuestro <span className="text-ada-turquoise">Proceso</span>
          </h2>
          <p className="text-ada-gray">
            Transparencia en cada etapa de tu operación.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-ada-turquoise/50 before:to-transparent">
          {pasos.map((paso, i) => (
            <div
              key={i}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-ada-turquoise bg-ada-dark text-ada-turquoise font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(62,183,185,0.3)] z-10">
                {paso.num}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-2">
                  {paso.titulo}
                </h3>
                <p className="text-ada-gray text-sm">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
