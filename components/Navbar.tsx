export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ada-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ada-turquoise animate-pulse"></div>
            <span className="font-bold text-lg md:text-xl tracking-wider text-white">
              ADAGESTIONA{" "}
              <span className="text-ada-turquoise text-sm hidden sm:inline">
                GROUP
              </span>
            </span>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            <a
              href="#inicio"
              className="text-ada-gray hover:text-ada-turquoise transition-colors text-sm font-medium"
            >
              Inicio
            </a>
            <a
              href="#nosotros"
              className="text-ada-gray hover:text-ada-turquoise transition-colors text-sm font-medium"
            >
              Nosotros
            </a>
            <a
              href="#servicios"
              className="text-ada-gray hover:text-ada-turquoise transition-colors text-sm font-medium"
            >
              Servicios
            </a>
            <a
              href="#proceso"
              className="text-ada-gray hover:text-ada-turquoise transition-colors text-sm font-medium"
            >
              Proceso
            </a>
            <a
              href="#contacto"
              className="text-ada-gray hover:text-ada-turquoise transition-colors text-sm font-medium"
            >
              Contacto
            </a>

            <a
              href="#contacto"
              className="px-5 py-2.5 bg-ada-turquoise text-ada-dark font-bold rounded-lg hover:bg-white transition-colors text-sm"
            >
              Solicitar Asesoría
            </a>
          </div>

          {/* Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button className="text-white text-3xl focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
