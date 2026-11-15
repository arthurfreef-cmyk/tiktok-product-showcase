import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft, MoreHorizontal, Share2, ShoppingCart,
} from "lucide-react";
import { Gallery } from "@/components/produto/Gallery";
import { Info } from "@/components/produto/Info";
import { Reviews } from "@/components/produto/Reviews";
import { Description } from "@/components/produto/Description";
import { brl, specs } from "@/components/produto/data";
import { MoreProducts } from "@/components/produto/MoreProducts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida" },
      { name: "description", content: "Escova Elétrica 9 em 1 recarregável com 9 escovas. -59%, de R$120,00 por R$48,90 com frete grátis." },
      { property: "og:title", content: "Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida" },
      { property: "og:description", content: "De R$120,00 por R$48,90 com frete grátis. 4.6 estrelas, 374 vendidos." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [spec, setSpec] = useState("1");
  const [qty, setQty] = useState(1);
  const current = specs.find((item) => item.id === spec) ?? specs[0];
  const subtotal = current.price * qty;
  const originalTotal = current.old * qty;
  const addressFields: { key: keyof Address; label: string; placeholder: string; required?: boolean; wide?: boolean; type?: string }[] = [
    { key: "name", label: "Nome completo", placeholder: "Seu nome completo", required: true, wide: true },
    { key: "phone", label: "Celular", placeholder: "(00) 00000-0000", required: true, type: "tel" },
    { key: "cep", label: "CEP", placeholder: "00000-000", required: true },
    { key: "number", label: "Número", placeholder: "Nº", required: true },
    { key: "complement", label: "Complemento (opcional)", placeholder: "Apto, bloco, referência", wide: true },
  ];
  const updateAddress = (key: keyof Address, rawValue: string) => {
    let value = rawValue;
    if (key === "cep") {
      const digits = rawValue.replace(/\D/g, "").slice(0, 8);
      value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
      setCepStatus("idle");
    }
    if (key === "phone") {
      const digits = rawValue.replace(/\D/g, "").slice(0, 11);
      value = digits.length > 10
        ? digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
        : digits.length > 6
          ? digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
          : digits.length > 2
            ? digits.replace(/^(\d{2})(\d+)/, "($1) $2")
            : digits;
    }
    if (key === "state") value = rawValue.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
    setAddress((previous) => ({ ...previous, [key]: value }));
    setNotice("");
  };

  useEffect(() => {
    const cep = address.cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      setCepStatus("idle");
      return;
    }
    let cancelled = false;
    setCepStatus("loading");
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Falha ao consultar CEP");
        const data = await response.json();
        if (data.erro) throw new Error("CEP não encontrado");
        if (cancelled) return;
        setAddress((previous) => ({
          ...previous,
          street: data.logradouro || previous.street,
          neighborhood: data.bairro || previous.neighborhood,
          city: data.localidade || previous.city,
          state: data.uf || previous.state,
        }));
        setCepStatus("success");
      } catch {
        if (!cancelled) setCepStatus("error");
      }
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [address.cep]);

  const addressComplete = Boolean(
    address.name.trim() &&
    address.phone.replace(/\D/g, "").length >= 10 &&
    address.cep.replace(/\D/g, "").length === 8 &&
    address.street.trim() &&
    address.number.trim() &&
    address.neighborhood.trim() &&
    address.city.trim() &&
    address.state.trim().length === 2
  );

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background/95 px-3 py-2 backdrop-blur">
        <button aria-label="Voltar"><ChevronLeft className="size-6" /></button>
        <div className="flex gap-4"><Share2 className="size-5" /><ShoppingCart className="size-5" /><MoreHorizontal className="size-5" /></div>
      </header>
      <nav className="truncate px-4 pb-2 text-xs text-muted-foreground">TikTok Shop › Eletrodomésticos › Eletrodomésticos › Esfregões elétricos › <span className="text-foreground">Escova Elétrica 9 em 1</span></nav>
      <Gallery cover={current.img} />
      <Info spec={spec} setSpec={setSpec} qty={qty} setQty={setQty} />
      <div className="h-2 bg-muted" />
      <Reviews />
      <div className="h-2 bg-muted" />
      <Description />
      <div className="h-2 bg-muted" />
      <MoreProducts />
      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t bg-background p-3">
        <a href={`/checkout?spec=${encodeURIComponent(spec)}&qty=${qty}`} className="block w-full rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground">Comprar agora</a>
      </div>
    </div>
  );
}
