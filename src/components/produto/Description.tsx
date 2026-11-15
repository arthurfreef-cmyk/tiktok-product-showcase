import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const feats = ["Sem fio e recarregável", "9 escovas para diferentes tipos de limpeza", "Motor de alta rotação (450 RPM)", "Operação com um botão", "Leve e portátil", "Resistente a respingos de água"];

export function Description() {
  const [more, setMore] = useState(false);
  return (
    <section className="space-y-3 px-4 py-4 text-sm">
      <h2 className="text-lg font-bold">Sobre este produto</h2>
      <p className="flex justify-between font-semibold">Descrição do produto <ChevronUp className="size-4" /></p>
      <div className={cn("relative space-y-2 overflow-hidden", !more && "max-h-72")}>
        <p className="font-semibold">🧹 Prática e Portátil 🧹</p>
        <p>A Escova Elétrica Recarregável é perfeita para a limpeza diária. Com 9 escovas diferentes, limpe banheiros, cozinhas, azulejos, pias, vidros, estofados e cantos com eficiência. Antes do primeiro uso, carregue por 3 horas para melhor desempenho. Desconecte o cabo USB antes de ligar a escova. Não use durante o carregamento.</p>
        <p>Características</p>
        <ul className="space-y-1">{feats.map((f) => <li key={f}>· <b>{f}</b></li>)}</ul>
        <p>Especificações</p>
        <p>· <b>Modelo:</b> Mini Esfregão Elétrico Recarregável</p>
        <p>· <b>Material:</b> ABS + componentes eletrônicos</p>
        {!more && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background" />}
      </div>
      <div className="text-center"><button onClick={() => setMore(!more)} className="rounded bg-muted px-5 py-2 font-semibold">{more ? "Ver menos" : "Ver mais"}</button></div>
    </section>
  );
}
