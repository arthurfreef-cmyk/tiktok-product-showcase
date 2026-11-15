import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft, MoreHorizontal, Share2, ShoppingCart, MapPin, PackageCheck,
  ShieldCheck, Truck, LockKeyhole, CreditCard, Wallet, CheckCircle2, Loader2, AlertCircle,
} from "lucide-react";
import { Gallery } from "@/components/produto/Gallery";
import { Info } from "@/components/produto/Info";
import { Reviews } from "@/components/produto/Reviews";
import { Description } from "@/components/produto/Description";
import { brl, specs } from "@/components/produto/data";
import { MoreProducts } from "@/components/produto/MoreProducts";

type Address = {
  name: string; phone: string; cep: string; street: string; number: string;
  complement: string; neighborhood: string; city: string; state: string;
};

const emptyAddress: Address = {
  name: "", phone: "", cep: "", street: "", number: "",
  complement: "", neighborhood: "", city: "", state: "",
};

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
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [shipping, setShipping] = useState<"free" | "sedex">("free");
  const [notice, setNotice] = useState("");
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const current = specs.find((item) => item.id === spec) ?? specs[0];
  const subtotal = current.price * qty;
  const originalTotal = current.old * qty;
  const addressFields: { key: keyof Address; label: string; placeholder: string; required?: boolean; wide?: boolean; type?: string }[] = [
    { key: "name", label: "Nome completo", placeholder: "Como devemos chamar você?", required: true, wide: true },
    { key: "phone", label: "Celular", placeholder: "(00) 00000-0000", required: true, type: "tel" },
    { key: "cep", label: "CEP", placeholder: "00000-000", required: true },
    { key: "street", label: "Rua / Avenida", placeholder: "Nome da rua", required: true, wide: true },
    { key: "number", label: "Número", placeholder: "Nº", required: true },
    { key: "complement", label: "Complemento", placeholder: "Apto, bloco (opcional)" },
    { key: "neighborhood", label: "Bairro", placeholder: "Seu bairro", required: true },
    { key: "city", label: "Cidade", placeholder: "Sua cidade", required: true },
    { key: "state", label: "Estado (UF)", placeholder: "UF", required: true },
  ];
  const updateAddress = (key: keyof Address, rawValue: string) => {
    let value = rawValue;
    if (key === "cep") {
      const digits = rawValue.replace(/\\D/g, "").slice(0, 8);
      value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
      setCepStatus("idle");
    }
    if (key === "phone") {
      const digits = rawValue.replace(/\\D/g, "").slice(0, 11);
      value = digits.length > 10
        ? digits.replace(/^(\\d{2})(\\d{5})(\\d{4})$/, "($1) $2-$3")
        : digits.length > 6
          ? digits.replace(/^(\\d{2})(\\d{4})(\\d{0,4})$/, "($1) $2-$3")
          : digits.length > 2
            ? digits.replace(/^(\\d{2})(\\d+)/, "($1) $2")
            : digits;
    }
    if (key === "state") value = rawValue.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
    setAddress((previous) => ({ ...previous, [key]: value }));
    setNotice("");
  };

  const lookupCep = async () => {
    const cep = address.cep.replace(/\\D/g, "");
    if (cep.length !== 8) {
      setCepStatus("error");
      return;
    }
    setCepStatus("loading");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Falha ao consultar CEP");
      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");
      setAddress((previous) => ({
        ...previous,
        street: data.logradouro || previous.street,
        neighborhood: data.bairro || previous.neighborhood,
        city: data.localidade || previous.city,
        state: data.uf || previous.state,
      }));
      setCepStatus("success");
      setNotice("");
    } catch {
      setCepStatus("error");
    }
  };
  const addressComplete = address.name.trim() && address.phone.trim() && address.cep.trim() &&
    address.street.trim() && address.number.trim() && address.neighborhood.trim() &&
    address.city.trim() && address.state.trim();

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
              <p className="text-[11px] text-gray-500 sm:text-xs">Preencha seus dados para entrega</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <LockKeyhole className="size-4" /> Ambiente seguro
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl space-y-4 px-3 py-4 sm:space-y-5 sm:px-6 sm:py-7">
          <div className="mb-1 rounded-xl bg-white px-4 py-4 shadow-sm sm:px-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#15966b]">● Pedido em preenchimento</span>
              <span className="text-[11px] text-gray-500">Etapa 1 de 4</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1.5" aria-label="Etapas do checkout">
              <span className="h-1.5 rounded-full bg-[#fe2c55]" />
              <span className="h-1.5 rounded-full bg-gray-200" />
              <span className="h-1.5 rounded-full bg-gray-200" />
              <span className="h-1.5 rounded-full bg-gray-200" />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-5">
            <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="size-5 text-[#fe2c55]" />
                <h1 className="text-base font-bold sm:text-lg">Endereço de entrega</h1>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {addressFields.map((field) => (
                  <label key={field.key} className={field.wide ? "sm:col-span-2" : ""}>
                    <span className="mb-1.5 block text-xs font-semibold text-gray-700">{field.label}{field.required && <span className="text-[#fe2c55]"> *</span>}</span>
                    <input
                      type={field.type ?? "text"}
                      value={address[field.key]}
                      onChange={(event) => updateAddress(field.key, event.target.value)}
                      onBlur={field.key === "cep" ? () => void lookupCep() : undefined}
                      placeholder={field.placeholder}
                      autoComplete={field.key === "name" ? "name" : field.key === "phone" ? "tel" : field.key === "cep" ? "postal-code" : field.key === "street" ? "street-address" : "off"}
                      required={field.required}
                      maxLength={field.key === "state" ? 2 : field.key === "cep" ? 9 : undefined}
                      className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#fe2c55] focus:ring-2 focus:ring-[#fe2c55]/10"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-3 flex min-h-5 items-center gap-2 text-[11px]" aria-live="polite">
                {cepStatus === "loading" && <><Loader2 className="size-3.5 animate-spin text-gray-500" /><span className="text-gray-500">Consultando CEP...</span></>}
                {cepStatus === "success" && <><CheckCircle2 className="size-3.5 text-[#15966b]" /><span className="text-[#15966b]">Endereço localizado. Confira os dados antes de continuar.</span></>}
                {cepStatus === "error" && <><AlertCircle className="size-3.5 text-amber-600" /><span className="text-amber-700">Não foi possível localizar o CEP. Você pode preencher o endereço manualmente.</span></>}
                {cepStatus === "idle" && <span className="text-gray-500">* Campos obrigatórios. Digite o CEP para preencher o endereço automaticamente.</span>}
              </div>
            </section>

            <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Truck className="size-5 text-[#fe2c55]" />
                <h2 className="text-base font-bold sm:text-lg">Forma de envio</h2>
              </div>
              <div className="space-y-3">
                <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 sm:p-4 ${shipping === "free" ? "border-[#15966b] bg-[#15966b]/5" : "border-gray-200"}`}>
                  <input type="radio" name="shipping" checked={shipping === "free"} onChange={() => setShipping("free")} className="mt-1 size-4 accent-[#15966b]" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 text-sm font-bold">Frete grátis <span className="rounded bg-[#15966b]/10 px-2 py-0.5 text-[10px] font-bold text-[#12835e]">GRÁTIS</span></span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-500">Entrega econômica por transportadora parceira. Prazo maior que o envio expresso.</span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-[#15966b]">R$ 0,00</span>
                </label>

                <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 sm:p-4 ${shipping === "sedex" ? "border-[#fe2c55] bg-[#fe2c55]/5" : "border-gray-200"}`}>
                  <input type="radio" name="shipping" checked={shipping === "sedex"} onChange={() => setShipping("sedex")} className="mt-1 size-4 accent-[#fe2c55]" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded bg-[#f7d21e] px-2 py-1 text-sm font-black italic tracking-tight text-[#173b75]">SEDEX</span>
                      <span className="text-sm font-bold">Frete expresso</span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-gray-500">Envio expresso pelos Correios. Valor e prazo precisam ser confirmados pelo CEP.</span>
                  </span>
                  <span className="shrink-0 text-right text-xs font-semibold text-gray-600">A calcular</span>
                </label>
              </div>
              {shipping === "sedex" && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">O valor do SEDEX ainda não está conectado a uma cotação dos Correios. Não será acrescentada uma tarifa estimada ao pedido.</p>}
            </section>

            <section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Wallet className="size-5 text-[#fe2c55]" />
                <h2 className="text-base font-bold sm:text-lg">Forma de pagamento</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 opacity-60">
                  <span className="grid size-10 place-items-center rounded-lg bg-gray-100"><span className="text-lg font-black text-[#15966b]">PIX</span></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">PIX</span><span className="block text-xs text-gray-500">Pagamento instantâneo</span></span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500">Indisponível</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 opacity-60">
                  <span className="grid size-10 place-items-center rounded-lg bg-gray-100"><CreditCard className="size-5 text-gray-600" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">Cartão de crédito ou débito</span><span className="block text-xs text-gray-500">Visa, Mastercard e outras bandeiras</span></span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500">Indisponível</span>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">As opções de pagamento estão sendo configuradas e ainda não podem ser selecionadas.</p>
            </section>

            <section className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2"><PackageCheck className="size-5 text-[#fe2c55]" /><h2 className="text-base font-bold sm:text-lg">Resumo do pedido</h2></div>
              <div className="mb-4 flex min-w-0 gap-3">
                <img src={current.img} alt="Escova Elétrica 9 em 1" className="size-16 shrink-0 rounded-lg bg-gray-100 object-cover" />
                <div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-semibold">Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida</p><p className="mt-1 text-xs text-gray-500">{current.label} · Qtd: {qty}</p><p className="mt-1 text-sm font-bold">R$ {brl(subtotal)}</p></div>
              </div>
              <div className="space-y-3 border-t pt-4 text-sm">
                <div className="flex items-start justify-between gap-3"><span className="text-gray-600">Subtotal do produto</span><span className="shrink-0 font-medium tabular-nums">R$ {brl(subtotal)}</span></div>
                <div className="flex items-start justify-between gap-3"><span className="text-gray-600">Preço original</span><span className="shrink-0 text-gray-500 line-through tabular-nums">R$ {brl(originalTotal)}</span></div>
                <div className="flex items-start justify-between gap-3"><span className="text-gray-600">Desconto no produto</span><span className="shrink-0 font-medium text-[#fe2c55] tabular-nums">- R$ {brl(originalTotal - subtotal)}</span></div>
                <div className="flex items-center justify-between gap-3 border-t pt-3"><span className="text-gray-600">Frete {shipping === "free" ? "econômico" : "SEDEX"}</span><span className="font-medium">{shipping === "free" ? "Grátis" : "A calcular"}</span></div>
                <div className="flex items-center justify-between border-t pt-4 text-base font-bold"><span>Total {shipping === "sedex" ? "parcial" : ""}</span><span className="tabular-nums">{shipping === "free" ? `R$ ${brl(subtotal)}` : `R$ ${brl(subtotal)} + SEDEX`}</span></div>
              </div>
              {notice && <p role="alert" className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">{notice}</p>}
              <button type="button" onClick={() => setNotice(!addressComplete ? "Preencha todos os campos obrigatórios do endereço para continuar." : shipping === "sedex" ? "Seu endereço está preenchido, mas o SEDEX só poderá ser confirmado após a integração da cotação oficial dos Correios. Nenhum valor será cobrado ou estimado." : "Seu endereço está preenchido. As opções PIX, crédito e débito ainda estão indisponíveis; por isso, o pedido não será enviado nem haverá cobrança.")} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#fe2c55] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#e9274d] active:scale-[0.99]">
                Revisar pedido <ChevronLeft className="size-4 rotate-180" />
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p>
            </section>
            <section className="rounded-xl border border-[#15966b]/15 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#15966b]" />
                <h2 className="text-sm font-bold sm:text-base">Compra protegida</h2>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">Seus dados de entrega são usados para processar o envio do pedido.</p>
            </section>
          </div>

          </div>
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
