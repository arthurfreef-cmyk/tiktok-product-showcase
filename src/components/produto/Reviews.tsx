import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ratingBars, reviewPhotos, reviews } from "./data";
import { Stars } from "./Stars";

const filters = ["Tudo", "Inclui imagens ou vídeos", "Compras verificadas"] as const;

export function Reviews() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tudo");
  const [page, setPage] = useState(3);
  const max = 48;
  return (
    <section className="space-y-4 px-4 py-4">
      <h2 className="flex items-center gap-2 text-xl font-bold">4.5 <Star className="size-5 fill-star" /> <span className="text-base font-semibold">61 avaliações globais</span></h2>
      <div className="space-y-1.5">
        {ratingBars.map((b) => (
          <div key={b.stars} className="flex items-center gap-2 text-sm">
            <span className="flex w-7 items-center gap-0.5 font-semibold">{b.stars}<Star className="size-3 fill-star" /></span>
            <div className="h-1.5 flex-1 rounded-full bg-muted"><div className="h-full rounded-full bg-foreground" style={{ width: `${(b.count / max) * 100}%` }} /></div>
            <span className="w-5 text-right text-muted-foreground">{b.count}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Fotos de avaliações</span><button className="text-sale">Ver todas as fotos</button></div>
        <div className="flex gap-2 overflow-x-auto">
          {reviewPhotos.map((p, i) => (
            <div key={i} className="relative size-24 shrink-0 overflow-hidden rounded">
              <img src={p.img} alt={`Foto de ${p.user}`} className="size-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p className="font-semibold">Classificar por</p>
        <button className="flex items-center gap-1 rounded border px-2 py-1">Recomendado <ChevronDown className="size-3" /></button>
        <p className="pt-1 font-semibold">Filtrar por</p>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("rounded border px-2 py-1", f === filter ? "border-foreground font-semibold" : "bg-muted text-muted-foreground")}>{f}</button>
          ))}
        </div>
        <div className="flex justify-between pt-1"><span className="text-muted-foreground">Exibindo 61 de 61 avaliações</span><button className="text-sale" onClick={() => setFilter("Tudo")}>Limpar filtros</button></div>
      </div>
      <ul className="space-y-5">
        {reviews.filter((r) => filter !== "Inclui imagens ou vídeos" || r.photo).map((r) => (
          <li key={r.id} className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-ship font-semibold text-primary-foreground">{r.initial}</span>
              <div><p className="font-semibold">{r.user} · Compras verificadas</p><p className="text-xs text-muted-foreground">BR</p></div>
            </div>
            <Stars value={r.stars} />
            <p>{r.text}</p>
            {r.photo && <img src={r.photo} alt="Foto da avaliação" className="size-16 rounded object-cover" />}
            <p className="text-xs text-muted-foreground">Item: 1 peça</p>
            <p className="text-xs text-muted-foreground">{r.date}</p>
          </li>
        ))}
      </ul>
      <nav className="flex items-center justify-center gap-3 text-sm" aria-label="Páginas">
        <button onClick={() => setPage(Math.max(1, page - 1))} className="flex items-center"><ChevronLeft className="size-4" />Anterior</button>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => setPage(n)} className={cn("size-6 rounded", n === page && "bg-foreground text-background")}>{n}</button>
        ))}
        <span>…</span><button onClick={() => setPage(21)}>21</button>
        <button onClick={() => setPage(Math.min(21, page + 1))} className="flex items-center">Próximo<ChevronRight className="size-4" /></button>
      </nav>
    </section>
  );
}
