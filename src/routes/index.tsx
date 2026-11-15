import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronDown,
  MoreHorizontal,
  Share2,
  ShoppingCart,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  LockKeyhole,
} from "lucide-react";
import { Gallery } from "@/components/produto/Gallery";
import { Info } from "@/components/produto/Info";
import { Reviews } from "@/components/produto/Reviews";
import { Description } from "@/components/produto/Description";
import { brl, specs } from "@/components/produto/data";
import { MoreProducts } from "@/components/produto/MoreProducts";

const SHIPPING_PRICE = 25.35;

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
  const [showCheckout, setShowCheckout] = useState(false);
  const current = specs.find((item) => item.id === spec) ?? specs[0];
  const subtotal = current.price * qty;
  const originalTotal = current.old * qty;
  const total = subtotal + SHIPPING_PRICE;

  if (showCheckout) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] text-[#161823]">
        <header className="sticky top-0 z-30 border-b bg-white">
          <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:h-16 sm:px-6">
            <button onClick={() => setShowCheckout(false)} aria-label="Voltar para o produto" className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-gray-100">
              <ChevronLeft className="size-6" />
            </button>
            <div className="min-w-0">
              <p className="text-sm font-bold sm:text-base">Finalizar pedido</p>
              <p className="text-[11px] text-gray-500 sm:text-xs">Revise os dados da sua compra</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <LockKeyhole className="size-4" /> Ambiente seguro
            </div>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            <section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="size-5 text-[#fe2c55]" />
                <h1 className="text-base font-bold sm:text-lg">Endereço de entrega</h1>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-dashed border-gray-300 p-3 sm:p-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gray-500" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Informe onde deseja receber</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">Os dados de entrega serão solicitados na próxima etapa do pedido.</p>
                </div>
                <ChevronDown className="ml-auto size-4 shrink-0 text-gray-400" />
              </div>
            </section>

            <section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <PackageCheck className="size-5 text-[#fe2c55]" />
                <h2 className="text-base font-bold sm:text-lg">Produto</h2>
              </div>
              <div className="flex min-w-0 gap-3 sm:gap-4">
                <img src={current.img} alt="Escova Elétrica 9 em 1" className="size-20 shrink-0 rounded-lg bg-gray-100 object-cover sm:size-24" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug">Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida</p>
                  <p className="mt-1 text-xs text-gray-500">{current.label} · Quantidade: {qty}</p>
                  <p className="mt-2 text-sm font-bold">R$ {brl(subtotal)}</p>
                  <p className="mt-0.5 text-xs text-gray-400 line-through">R$ {brl(originalTotal)}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
                <span className="text-gray-500">Entrega</span>
                <span className="font-medium">R$ {brl(SHIPPING_PRICE)}</span>
              </div>
            </section>

            <section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#15966b]" />
                <h2 className="text-sm font-bold sm:text-base">Compra protegida</h2>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">Seus dados são tratados com segurança. As informações de pagamento e confirmação serão apresentadas na próxima etapa.</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1"><LockKeyhole className="size-3.5" /> Pagamento seguro</span>
                <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5" /> Dados protegidos</span>
                <span className="inline-flex items-center gap-1"><Truck className="size-3.5" /> Acompanhamento</span>
              </div>
            </section>
          </div>

          <aside className="min-w-0">
            <section className="rounded-xl bg-white p-4 shadow-sm sm:sticky sm:top-20 sm:p-5">
              <h2 className="mb-4 text-base font-bold sm:text-lg">Resumo do pedido</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-3"><span className="text-gray-600">Subtotal do produto</span><span className="shrink-0 font-medium tabular-nums">R$ {brl(subtotal)}</span></div>
                <div className="flex items-start justify-between gap-3"><span className="text-gray-600">Preço original</span><span className="shrink-0 text-gray-500 line-through tabular-nums">R$ {brl(originalTotal)}</span></div>
                <div className="flex items-start justify-between gap-3"><span className="text-gray-600">Desconto no produto</span><span className="shrink-0 font-medium text-[#fe2c55] tabular-nums">- R$ {brl(originalTotal - subtotal)}</span></div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between gap-3"><span className="text-gray-600">Subtotal do envio</span><span className="font-medium tabular-nums">R$ {brl(SHIPPING_PRICE)}</span></div>
                  <div className="mt-2 flex items-center justify-between gap-3"><span className="text-gray-600">Taxa de envio</span><span className="font-medium tabular-nums">R$ {brl(SHIPPING_PRICE)}</span></div>
                </div>
                <div className="flex items-center justify-between border-t pt-4 text-base font-bold"><span>Total</span><span className="tabular-nums">R$ {brl(total)}</span></div>
              </div>
              <button type="button" onClick={() => window.alert("A etapa visual do checkout está pronta. A integração de endereço e pagamento precisa ser conectada antes de receber pedidos.")} className="mt-5 min-h-12 w-full rounded-full bg-[#fe2c55] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e9274d] active:scale-[0.99]">
                Fazer pedido
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500">Ao fazer um pedido, você concorda com os termos de uso e a política de privacidade.</p>
            </section>
          </aside>
        </div>
      </main>
    );
  }

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
        <button onClick={() => setShowCheckout(true)} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">Comprar agora</button>
      </div>
    </div>
  );
}
