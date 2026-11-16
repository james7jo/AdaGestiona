import "./globals.css";

export const metadata = {
  title: "ADAGESTIONA GROUP S.R.L. | Agencia Despachante de Aduana",
  description:
    "Gestión aduanera sin preocupaciones. Importaciones y exportaciones en Bolivia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-ada-dark text-white antialiased selection:bg-ada-turquoise selection:text-ada-dark">
        {children}
      </body>
    </html>
  );
}
