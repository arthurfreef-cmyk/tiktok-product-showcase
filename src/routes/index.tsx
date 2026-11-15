import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft, MoreHorizontal, Share2, ShoppingCart,
} from "lucide-react";
import { Gallery } from "@/components/produto/Gallery";
import { Info } from "@/components/produto/Info";
import { Reviews } from "@/components/produto/Reviews";
import { Description } from "@/components/produto/Description";
import { specs } from "@/components/produto/data";
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
