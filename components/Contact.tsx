import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Lado Izquierdo: Información */}
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Hablemos de tu{" "}
              <span className="text-ada-turquoise">operación</span>
            </h2>
            <p className="text-ada-gray mb-10 text-lg">
              Tu próxima operación comienza con una conversación. Cuéntanos qué
              necesitas y nuestro equipo te orientará sobre el servicio
              adecuado.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ada-turquoise/10 flex items-center justify-center text-ada-turquoise shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Correo electrónico
                  </h4>
                  <a
                    href="mailto:adagestiona@gmail.com"
                    className="text-ada-gray hover:text-ada-turquoise transition-colors"
                  >
                    adagestiona@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ada-turquoise/10 flex items-center justify-center text-ada-turquoise shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Teléfono / WhatsApp
                  </h4>
                  <a
                    href="tel:+59176932372"
                    className="text-ada-gray hover:text-ada-turquoise transition-colors"
                  >
                    +591 76932372
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ada-turquoise/10 flex items-center justify-center text-ada-turquoise shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Oficinas</h4>
                  <p className="text-ada-gray">
                    Cochabamba y Santa Cruz, Bolivia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Formulario */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Envíanos un mensaje
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ada-gray mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  className="w-full bg-ada-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ada-turquoise transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ada-gray mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  className="w-full bg-ada-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ada-turquoise transition-colors"
                  placeholder="tu@correo.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ada-gray mb-1">
                  Mensaje *
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-ada-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ada-turquoise transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-ada-turquoise text-ada-dark font-bold py-4 rounded-lg hover:bg-white transition-colors mt-2"
              >
                Enviar consulta <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
