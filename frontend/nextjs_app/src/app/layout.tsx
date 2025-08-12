/////////////////////
// Requirements
/////////////////////

import {Header} from "@/shared/adapters/ui/Header";
import {Footer} from "@/shared/adapters/ui/Footer";
import "./globals.css";

/////////////////////
// Helpers
/////////////////////

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="pt-20 pb-16 flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}