import { ExternalLink } from "lucide-react";

export default function Updates() {
  const enlaces = [
    {
      titulo: "Aduana Nacional de Bolivia",
      desc: "Portal oficial para consultar normativa, comunicados y servicios aduaneros.",
      url: "https://www.aduana.gob.bo/",
    },
    {
      titulo: "Circulares y comunicados",
      desc: "Consulta las publicaciones oficiales y verifica siempre su fecha y vigencia.",
      url: "https://www.aduana.gob.bo/",
    },
    {
      titulo: "Cámara Nacional de Despachantes de Aduanas",
      desc: "Información institucional y recursos del sector.",
      url: "#",
    },
  ];

  return (
    <section
      id="actualidad"
      className="py-24 bg-ada-blue/20 relative z-10 border-t border-white/5"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enlaces <span className="text-ada-turquoise">Institucionales</span>
          </h2>
          <p className="text-ada-gray max-w-2xl mx-auto">
            Fuentes oficiales para mantenerte al día con las normativas
            aduaneras de Bolivia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {enlaces.map((enlace, i) => (
            <a
              key={i}
              href={enlace.url}
              target="_blank"
              rel="noreferrer"
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-ada-turquoise/50 hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-ada-turquoise transition-colors">
                    {enlace.titulo}
                  </h3>
                  <ExternalLink
                    size={18}
                    className="text-ada-gray group-hover:text-ada-turquoise transition-colors"
                  />
                </div>
                <p className="text-ada-gray text-sm">{enlace.desc}</p>
              </div>
              <div className="mt-6 text-sm font-semibold text-ada-turquoise flex items-center gap-2">
                Visitar sitio oficial
              </div>
            </a>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-ada-turquoise/10 border border-ada-turquoise/20 text-center text-sm text-ada-gray">
          <strong className="text-white">Importante:</strong> Los enlaces
          conducen a fuentes externas. La publicación de circulares propias en
          esta sección podrá habilitarse posteriormente mediante un panel de
          administración.
        </div>
      </div>
    </section>
  );
}
