"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const otherLocale = locale === "es" ? "en" : "es";
  // Elimina el prefijo de idioma actual de la ruta
  const pathWithoutLocale = pathname.replace(/^\/(es|en)(\/|$)/, "/");
  const newPath = `/${otherLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Link
        href={newPath}
        className="px-3 py-1 rounded border bg-background text-foreground hover:bg-muted transition text-xs font-medium shadow"
        prefetch={false}
      >
        {otherLocale.toUpperCase()}
      </Link>
    </div>
  );
} 