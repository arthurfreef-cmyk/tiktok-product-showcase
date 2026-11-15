import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, MapPin, PackageCheck, ShieldCheck, Truck, LockKeyhole, CreditCard, Wallet, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { brl, specs } from "@/components/produto/data";
import tikTokShopLogoBase64 from "../../public/tiktok-shop-logo.b64?raw";
type Address = { name: string; phone: string; cep: string; street: string; number: string; complement: string; neighborhood: string; city: string; state: string; };
const emptyAddress: Address = { name: "", phone: "", cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" };
export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Finalizar compra – Escova Elétrica 9 em 1" }] }),
  component: Checkout,
});
function Checkout() {
  const [spec, setSpec] = useState("1");
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [shipping, setShipping] = useState<"jadlog" | "sedex">("jadlog");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [notice, setNotice] = useState("");
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const current = specs.find((item) => item.id === spec) ?? specs[0];
  const subtotal = current.price * qty;
  const originalTotal = current.old * qty;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSpec = params.get("spec");
    const requestedQty = Number(params.get("qty") || 1);
    if (requestedSpec && specs.some((item) => item.id === requestedSpec)) setSpec(requestedSpec);
    if (Number.isFinite(requestedQty)) setQty(Math.max(1, Math.min(20, requestedQty)));
  }, []);
  const addressFields = [
    { key: "name" as const, label: "Nome completo", placeholder: "Seu nome completo", required: true, wide: true },
    { key: "phone" as const, label: "Celular", placeholder: "(00) 00000-0000", required: true, type: "tel" },
    { key: "cep" as const, label: "CEP", placeholder: "00000-000", required: true },
    { key: "number" as const, label: "Número", placeholder: "Nº", required: true },
    { key: "complement" as const, label: "Complemento (opcional)", placeholder: "Apto, bloco, referência", wide: true },
  ];
  const updateAddress = (key: keyof Address, rawValue: string) => {
    let value = rawValue;
    if (key === "cep") { const digits = rawValue.replace(/\D/g, "").slice(0, 8); value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits; }
    if (key === "phone") { const digits = rawValue.replace(/\D/g, "").slice(0, 11); value = digits.length > 10 ? digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : digits.length > 6 ? digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3") : digits.length > 2 ? digits.replace(/^(\d{2})(\d+)/, "($1) $2") : digits; }
    setAddress((previous) => ({ ...previous, [key]: value }));
    setNotice("");
  };
  useEffect(() => {
    const cep = address.cep.replace(/\D/g, "");
    if (cep.length !== 8) { setCepStatus("idle"); return; }
    let cancelled = false;
    setCepStatus("loading");
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Falha ao consultar CEP");
        const data = await response.json();
        if (data.erro) throw new Error("CEP não encontrado");
        if (cancelled) return;
        setAddress((previous) => ({ ...previous, street: data.logradouro || previous.street, neighborhood: data.bairro || previous.neighborhood, city: data.localidade || previous.city, state: data.uf || previous.state }));
        setCepStatus("success");
      } catch { if (!cancelled) setCepStatus("error"); }
    }, 250);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [address.cep]);
  const addressComplete = Boolean(address.name.trim() && address.phone.replace(/\D/g, "").length >= 10 && address.cep.replace(/\D/g, "").length === 8 && address.street.trim() && address.number.trim() && address.neighborhood.trim() && address.city.trim() && address.state.trim().length === 2);
return (
      <main className="min-h-screen bg-[#f5f5f6] pb-32 text-[#161823]">
        <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
          <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-3 sm:h-16 sm:px-5">
            <a href="/" aria-label="Voltar para o produto" className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-gray-100">
              <ChevronLeft className="size-6" />
            </a>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold">Finalizar compra</p>
              <p className="text-[11px] text-gray-500">Revise os dados do seu pedido</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#f6f6f6] px-3 py-1.5 text-[10px] font-semibold text-gray-600">
              <LockKeyhole className="size-3.5" /> Checkout
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl space-y-2.5 px-2.5 pt-3 sm:space-y-3 sm:px-5 sm:pt-5">
          <section className="rounded-xl bg-white px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:px-5">
            <div className="mb-2 flex justify-center">
              <img src={`data:image/png;base64,${tikTokShopLogoBase64.trim()}`} alt="TikTok Shop" className="h-auto w-[min(100%,132px)] object-contain" />
            </div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold">Seu pedido</span>
              <span className="text-[11px] font-medium text-gray-500">1 de 1 produto</span>
            </div>
            <div className="flex gap-3">
              <div className="size-[88px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img src={current.img} alt="Escova Elétrica 9 em 1" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[13px] font-semibold leading-snug">Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida</p>
                <p className="mt-1 text-[11px] text-gray-500">Variação: {current.label}</p>
                <p className="mt-2 text-sm font-bold">R$ {brl(current.price)}</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded bg-[#f7f7f7] px-2 py-1">
                  <button aria-label="Diminuir quantidade" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-5 place-items-center text-gray-600">−</button>
                  <span className="min-w-4 text-center text-xs font-semibold tabular-nums">{qty}</span>
                  <button aria-label="Aumentar quantidade" onClick={() => setQty(qty + 1)} className="grid size-5 place-items-center text-gray-600">+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums">R$ {brl(subtotal)}</p>
                <p className="mt-1 text-[11px] text-gray-400 line-through">R$ {brl(originalTotal)}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-dashed border-gray-200 pt-3 text-[11px]">
              <span className="rounded-sm bg-[#fff0f2] px-2 py-1 font-semibold text-[#fe2c55]">Oferta especial</span>
              <span className="font-medium text-[#15966b]">Você economiza R$ {brl(originalTotal - subtotal)}</span>
            </div>
          </section>

          <section className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="size-[18px] text-[#fe2c55]" />
                <h1 className="text-sm font-bold">Endereço de entrega</h1>
              </div>
              <span className="text-[10px] font-medium text-gray-400">Obrigatório *</span>
            </div>
            <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
              {addressFields.map((field) => (
                <label key={field.key} className={field.wide ? "sm:col-span-2" : ""}>
                  <span className="mb-1.5 block text-[11px] font-semibold text-gray-600">{field.label}{field.required && <span className="text-[#fe2c55]"> *</span>}</span>
                  <input
                    type={field.type ?? "text"}
                    value={address[field.key]}
                    onChange={(event) => updateAddress(field.key, event.target.value)}
                    
                    placeholder={field.placeholder}
                    autoComplete={field.key === "name" ? "name" : field.key === "phone" ? "tel" : field.key === "cep" ? "postal-code" : field.key === "street" ? "street-address" : "off"}
                    required={field.required}
                    maxLength={field.key === "state" ? 2 : field.key === "cep" ? 9 : undefined}
                    className="min-h-11 w-full rounded-lg border border-[#e5e5e5] bg-white px-3 py-2.5 text-[13px] outline-none transition focus:border-[#fe2c55] focus:ring-2 focus:ring-[#fe2c55]/10"
                  />
                </label>
              ))}
            </div>
            <div className="mt-3 flex min-h-5 items-center gap-2 text-[11px]" aria-live="polite">
              {cepStatus === "loading" && <><Loader2 className="size-3.5 animate-spin text-gray-500" /><span className="text-gray-500">Buscando endereço...</span></>}
              {cepStatus === "success" && <><CheckCircle2 className="size-3.5 text-[#15966b]" /><span className="text-[#15966b]">CEP localizado. Confira os dados preenchidos.</span></>}
              {cepStatus === "error" && <><AlertCircle className="size-3.5 text-amber-600" /><span className="text-amber-700">CEP não localizado. Você pode preencher o endereço manualmente.</span></>}
              {cepStatus === "idle" && <span className="text-gray-400">Digite o CEP; o endereço e as opções de frete aparecem automaticamente.</span>}
            </div>
          </section>

          {cepStatus === "success" && (
            <section className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <Truck className="size-[18px] text-[#fe2c55]" />
                <h2 className="text-sm font-bold">Escolha seu frete</h2>
              </div>
              <div className="space-y-2">
                <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition ${shipping === "sedex" ? "border-[#fe2c55] bg-[#fff8f9]" : "border-gray-200"}`}>
                  <input type="radio" name="shipping" checked={shipping === "sedex"} onChange={() => setShipping("sedex")} className="size-4 accent-[#fe2c55]" />
                  <span className="flex h-9 w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#003f7d] px-1.5"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Sedex_logo.png" alt="SEDEX Correios" className="h-auto w-full object-contain" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold">Frete expresso SEDEX</span>
                    <span className="mt-0.5 block text-[11px] text-gray-500">Entrega expressa • valor a confirmar</span>
                  </span>
                </label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition ${shipping === "jadlog" ? "border-[#15966b] bg-[#15966b]/[0.045]" : "border-gray-200"}`}>
                  <input type="radio" name="shipping" checked={shipping === "jadlog"} onChange={() => setShipping("jadlog")} className="size-4 accent-[#15966b]" />
                  <span className="flex h-9 w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-white px-1.5"><img src="https://images.seeklogo.com/logo-png/50/1/jadlog-logo-png_seeklogo-502850.png" alt="Jadlog" className="h-auto w-full object-contain" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold">Frete grátis Jadlog</span>
                    <span className="mt-0.5 block text-[11px] text-gray-500">Entrega padrão sem custo</span>
                  </span>
                  <span className="text-xs font-bold text-[#15966b]">GRÁTIS</span>
                </label>
              </div>
            </section>
          )}
          <section className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Wallet className="size-[18px] text-[#fe2c55]" />
              <h2 className="text-sm font-bold">Forma de pagamento</h2>
            </div>
            <div className="space-y-2">
              <button type="button" onClick={() => setPaymentMethod("pix")} className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition ${paymentMethod === "pix" ? "border-[#fe2c55] bg-[#fff8f9]" : "border-gray-200"}`}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#e9f8f1] text-[13px] font-black text-[#15966b]">PIX</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold">Pix</span>
                  <span className="block text-[11px] text-gray-500">Pagamento instantâneo</span>
                </span>
                <span className={`grid size-[18px] place-items-center rounded-full border ${paymentMethod === "pix" ? "border-[#fe2c55]" : "border-gray-300"}`}>{paymentMethod === "pix" && <span className="size-2.5 rounded-full bg-[#fe2c55]" />}</span>
              </button>
              <button type="button" onClick={() => setPaymentMethod("card")} disabled className={`flex w-full opacity-60 items-center gap-3 rounded-lg border p-3.5 text-left transition ${paymentMethod === "card" ? "border-[#fe2c55] bg-[#fff8f9]" : "border-gray-200"}`}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gray-100"><CreditCard className="size-5 text-gray-600" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold">Cartão de crédito</span>
                  <span className="block text-[11px] text-gray-500">Indisponível no momento</span>
                </span>
                
              </button>
            </div>
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2.5 text-[11px] leading-relaxed text-amber-800">
              A interface de pagamento está preparada visualmente, mas a geração de cobranças ainda depende da conexão com um gateway. Nenhum pagamento será processado nesta etapa.
            </p>
          </section>

          <section className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <PackageCheck className="size-[18px] text-[#fe2c55]" />
              <h2 className="text-sm font-bold">Resumo do pedido</h2>
            </div>
            <div className="space-y-2.5 text-[12px]">
              <div className="flex justify-between gap-3"><span className="text-gray-500">Subtotal ({qty} {qty === 1 ? "item" : "itens"})</span><span className="font-medium tabular-nums">R$ {brl(subtotal)}</span></div>
              <div className="flex justify-between gap-3"><span className="text-gray-500">Desconto</span><span className="font-semibold text-[#15966b] tabular-nums">− R$ {brl(originalTotal - subtotal)}</span></div>
              <div className="flex justify-between gap-3"><span className="text-gray-500">Frete</span><span className={shipping === "jadlog" ? "font-semibold text-[#15966b]" : "font-semibold text-gray-600"}>{shipping === "jadlog" ? "Grátis (Jadlog)" : "SEDEX — valor a confirmar"}</span></div>
              <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3 text-[15px] font-bold"><span>Total do pedido</span><span className="tabular-nums">R$ {brl(subtotal)}</span></div>
            </div>
            {notice && <p role="alert" className="mt-3 rounded-lg bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800">{notice}</p>}
          </section>

          <div className="flex items-center justify-center gap-1.5 pb-2 text-[10px] text-gray-400">
            <ShieldCheck className="size-3.5" /> Confira seus dados antes de continuar
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-100 bg-white/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-gray-500">Total a pagar</p>
              <p className="text-lg font-extrabold leading-tight tabular-nums">R$ {brl(subtotal)}</p>
            </div>
            <button type="button" onClick={() => setNotice(!addressComplete ? "Preencha nome, celular, CEP e número para continuar." : "O checkout visual está pronto, mas ainda falta conectar o gateway de pagamento para gerar o Pix ou processar o cartão. Nenhuma cobrança foi criada.")} className="flex min-h-12 min-w-[180px] items-center justify-center rounded-full bg-[#fe2c55] px-6 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#e9274d] active:scale-[0.99]">
              Continuar
            </button>
          </div>
        </div>
      </main>
    );
}
