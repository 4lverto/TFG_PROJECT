/////////////////////
// Requirements
/////////////////////

import { Header } from "@/shared/adapters/ui/Header";
import { Footer } from "@/shared/adapters/ui/Footer";
import "./globals.css";

/////////////////////
// Helpers
/////////////////////

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col">
        <div className="">
          <Header />
        </div>
        <div className="pt-10 pb-16 flex-grow">{children}</div>

        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}