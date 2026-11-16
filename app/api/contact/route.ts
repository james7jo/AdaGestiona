import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, website } = body;

    // Campo trampa antispam: los usuarios reales no deben completarlo.
    if (website) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Completa nombre, correo y mensaje." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO || !process.env.CONTACT_FROM) {
      return NextResponse.json({ error: "El servicio de correo aún no está configurado." }, { status: 500 });
    }

    const safe = (value: string) =>
      String(value || "").replace(/[<>]/g, "").slice(0, 3000);

    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: [process.env.CONTACT_TO],
      replyTo: safe(email),
      subject: `Nueva consulta web — ${safe(name)}`,
      text: [
        `Nombre: ${safe(name)}`,
        `Correo: ${safe(email)}`,
        `Teléfono: ${safe(phone)}`,
        `Servicio: ${safe(service)}`,
        "",
        "Mensaje:",
        safe(message),
      ].join("\n"),
    });

    if (result.error) {
      return NextResponse.json({ error: "No se pudo enviar el mensaje. Intenta nuevamente." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ocurrió un error al procesar la solicitud." }, { status: 500 });
  }
}
