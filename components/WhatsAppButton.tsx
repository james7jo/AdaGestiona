"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || "59170000000";
  const message = encodeURIComponent("Hola, quisiera recibir información sobre los servicios de ADAGESTIONA GROUP.");
  return <a className="whatsapp-float" href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><MessageCircle /><span>¿Hablamos?</span></a>;
}
