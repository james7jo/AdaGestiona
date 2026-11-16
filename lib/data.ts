// lib/data.ts
export interface Servicio {
  titulo: string;
  desc: string;
  icono: string;
}

export const servicios: Servicio[] = [
  {
    titulo: "Gestión de Documentos Aduaneros",
    desc: "Preparamos y presentamos la documentación necesaria ante la Aduana Nacional de Bolivia.",
    icono: "document"
  },
  {
    titulo: "Clasificación Arancelaria",
    desc: "Asistimos en la correcta clasificación de mercancías según el arancel vigente.",
    icono: "tag"
  },
  {
    titulo: "Liquidación de Tributos",
    desc: "Calculamos y gestionamos el pago de impuestos (IVA) y derechos de aduana.",
    icono: "calculator"
  },
  {
    titulo: "Inspección de Mercancías",
    desc: "Coordinamos las inspecciones físicas requeridas por la Aduana.",
    icono: "search"
  },
  {
    titulo: "Asesoramiento Normativo",
    desc: "Brindamos orientación sobre regulaciones vigentes para evitar sanciones.",
    icono: "shield"
  },
  {
    titulo: "Liberación de Mercancías",
    desc: "Nos encargamos de liberar las mercancías de almacenes aduaneros.",
    icono: "check"
  }
];