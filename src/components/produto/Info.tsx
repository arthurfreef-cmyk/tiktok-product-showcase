import { Info as InfoIcon, Minus, Plus, Star, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, discount, specs } from "./data";

interface Props { spec: string; setSpec: (s: string) => void; qty: number; setQty: (n: number) => void }

export function Info({ spec, setSpec, qty, setQty }: Props) {
  const current = specs.find((s) => s.id === spec) ?? specs[0];
  const [int, dec] = brl(current?.price ?? 0).split(",");
  return (
    <section className="space-y-3 px-4 py-3">
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl text-sale">-{current ? discount(current) : 0}%</span>
        <span className="text-sm font-bold">R$</span><span className="text-3xl font-bold">{int}</span><span className="text-sm font-bold">,{dec}</span>
        <span className="text-sm text-muted-foreground line-through">R${brl(current?.old ?? 0)}</span>
      </div>
      <p className="flex items-center gap-1.5 font-semibold text-ship"><Truck className="size-4" /> Frete grátis</p>
      <h1 className="text-base font-semibold leading-snug">
        <span className="mr-1 rounded-sm bg-badge px-1 py-0.5 text-xs text-badge-foreground">Loja Estrela</span>
        Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida
      </h1>
      <p className="text-sm text-muted-foreground">Vendido por KOBAC HUI</p>
      <p className="flex items-center gap-1 text-sm">
        <b>4.6</b><Star className="size-3.5 fill-star" /><span className="text-muted-foreground">(59)</span>
        <span className="ml-1 text-muted-foreground">374 vendido(s)</span><InfoIcon className="size-3.5 text-muted-foreground" />
      </p>
      <div>
        <p className="mb-2 font-semibold">Especificação: <span className="font-normal text-muted-foreground">{current?.label}</span></p>
        <div className="flex gap-3">
          {specs.map((s) => (
            <button key={s.id} onClick={() => setSpec(s.id)}
              className={cn("w-[72px] rounded border-2 p-1 text-xs", s.id === spec ? "border-foreground" : "border-border")}>
              <img src={s.img} alt={s.label} className="aspect-square w-full object-cover" />
              <span className="mt-1 block">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Quantidade:</span>
        <div className="flex items-center gap-4">
          <button aria-label="Diminuir" onClick={() => setQty(Math.max(1, qty - 1))} className="text-muted-foreground"><Minus className="size-4" /></button>
          <span className="w-4 text-center">{qty}</span>
          <button aria-label="Aumentar" onClick={() => setQty(qty + 1)}><Plus className="size-4" /></button>
        </div>
      </div>
    </section>
  );
}
