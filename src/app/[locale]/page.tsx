"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Home() {
  const t = useTranslations();
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEnviado(false);
    try {
      const res = await fetch("https://formspree.io/f/xyzpzbla", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
        }),
      });
      if (res.ok) {
        setEnviado(true);
        setForm({ nombre: "", email: "", mensaje: "" });
      } else {
        setError(t("contact.error"));
      }
    } catch (err) {
      setError(t("contact.error"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-20 gap-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black mb-2">{t("brand")}</h1>
        <h2 className="text-2xl font-semibold mb-4">{t("hero.title")}</h2>
        <p className="text-lg text-muted-foreground text-center max-w-xl mb-4">{t("hero.subtitle")}</p>
        <a href="#contacto" className="mt-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition">{t("hero.cta")}</a>
      </section>

      {/* Servicios */}
      <section className="py-16 bg-white flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold mb-4">{t("services.title")}</h2>
        <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center">
          <div className="bg-white rounded-xl shadow p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">{t("services.own.label")}</h3>
            <p>{t("services.own.desc")}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">{t("services.third.label")}</h3>
            <p>{t("services.third.desc")}</p>
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section className="py-16 flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold mb-4">{t("portfolio.title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="mb-4 w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-2xl">📱</div>
            <h4 className="font-semibold text-lg mb-1">{t("portfolio.app1.label")}</h4>
            <p className="text-sm text-muted-foreground text-center">{t("portfolio.app1.desc")}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="mb-4 w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-2xl">📝</div>
            <h4 className="font-semibold text-lg mb-1">{t("portfolio.app2.label")}</h4>
            <p className="text-sm text-muted-foreground text-center">{t("portfolio.app2.desc")}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="mb-4 w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-2xl">🌱</div>
            <h4 className="font-semibold text-lg mb-1">{t("portfolio.app3.label")}</h4>
            <p className="text-sm text-muted-foreground text-center">{t("portfolio.app3.desc")}</p>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 bg-white flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold mb-4">{t("process.title")}</h2>
        <ol className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center list-decimal list-inside">
          <li className="bg-white rounded-xl shadow p-6 flex-1">{t("process.step1")}</li>
          <li className="bg-white rounded-xl shadow p-6 flex-1">{t("process.step2")}</li>
          <li className="bg-white rounded-xl shadow p-6 flex-1">{t("process.step3")}</li>
          <li className="bg-white rounded-xl shadow p-6 flex-1">{t("process.step4")}</li>
        </ol>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold mb-4">{t("contact.title")}</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            name="nombre"
            placeholder={t("contact.name")}
            value={form.nombre}
            onChange={handleChange}
            required
            className="border border-border rounded px-4 py-2 bg-background"
          />
          <input
            type="email"
            name="email"
            placeholder={t("contact.email")}
            value={form.email}
            onChange={handleChange}
            required
            className="border border-border rounded px-4 py-2 bg-background"
          />
          <textarea
            name="mensaje"
            placeholder={t("contact.message")}
            value={form.mensaje}
            onChange={handleChange}
            required
            className="border border-border rounded px-4 py-2 bg-background min-h-[100px]"
          />
          {error && <div className="text-destructive text-sm">{error}</div>}
          {enviado && <div className="text-primary text-sm">{t("contact.success")}</div>}
          <button type="submit" className="mt-2 px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition">{t("contact.send")}</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm mt-auto">
        © {new Date().getFullYear()} {t("brand")}. {t("footer")}
      </footer>
    </div>
  );
} 