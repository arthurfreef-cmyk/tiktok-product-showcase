import { useCallback, useMemo, useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ratingBars, reviews, type Review } from "./data";
import { Stars } from "./Stars";
import { ReviewItem } from "./ReviewItem";
import { Lightbox } from "./Lightbox";

const filters = ["Tudo", "Inclui imagens ou vídeos", "Compras verificadas"] as const;
type Filter = (typeof filters)[number];
type Sort = "Recomendado" | "Mais recentes";

const applyFilter = (list: Review[], f: Filter) => (f === "Inclui imagens ou vídeos" ? list.filter((r) => r.photos.length > 0) : list);

export function Reviews() {
  const [filter, setFilter] = useState<Filter>("Tudo");
  const [sort, setSort] = useState<Sort>("Recomendado");
  const [viewer, setViewer] = useState<{ photos: string[]; index: number } | null>(null);
  const max = Math.max(...ratingBars.map((b) => b.count));

  const visible = useMemo(() => {
    const list = applyFilter(reviews, filter);
    return sort === "Mais recentes" ? [...list].sort((a, b) => b.date.localeCompare(a.date)) : list;
  }, [filter, sort]);
  const allPhotos = useMemo(() => reviews.flatMap((r) => r.photos.map((p) => ({ src: p, r }))), []);

  const open = useCallback((photos: string[], index: number) => setViewer({ photos, index }), []);
  const close = useCallback(() => setViewer(null), []);
  const change = useCallback((index: number) => setViewer((v) => (v ? { ...v, index } : v)), []);

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
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Fotos de avaliações</span>
          <button className="text-sale" onClick={() => open(allPhotos.map((p) => p.src), 0)}>Ver todas as fotos</button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allPhotos.map((p, i) => (
            <button key={p.src} onClick={() => open(allPhotos.map((x) => x.src), i)} className="relative size-24 shrink-0 overflow-hidden rounded" aria-label={`Foto de ${p.r.user}`}>
              <img src={p.src} alt="" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 px-1 pb-0.5 text-left text-[10px] text-background">
                <span className="block">{p.r.user}</span><Stars value={p.r.stars} className="[&_svg]:size-2.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p className="font-semibold">Classificar por</p>
        <button onClick={() => setSort(sort === "Recomendado" ? "Mais recentes" : "Recomendado")} className="flex items-center gap-1 rounded border px-2 py-1">{sort} <ChevronDown className="size-3" /></button>
        <p className="pt-1 font-semibold">Filtrar por</p>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={f === filter} className={cn("rounded border px-2 py-1", f === filter ? "border-foreground font-semibold" : "bg-muted text-muted-foreground")}>{f}</button>
          ))}
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-muted-foreground">Exibindo {visible.length} de {reviews.length} avaliações</span>
          {filter !== "Tudo" && <button className="text-sale" onClick={() => setFilter("Tudo")}>Limpar filtros</button>}
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Nenhuma avaliação encontrada.</p>
      ) : (
        <ul className="space-y-5">{visible.map((r) => <ReviewItem key={r.id} review={r} onOpen={open} />)}</ul>
      )}
      {viewer && <Lightbox photos={viewer.photos} index={viewer.index} onChange={change} onClose={close} />}
    </section>
  );
}
