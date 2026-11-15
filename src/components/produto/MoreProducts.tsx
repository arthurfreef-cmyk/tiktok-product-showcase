import { moreProducts } from "./data";

export function MoreProducts() {
  return (
    <section className="px-4 py-4">
      <h2 className="mb-3 text-lg font-bold">Explore mais de KOBAC HUI</h2>
      <div className="grid grid-cols-2 gap-3">
        {moreProducts.map((p) => (
          <article key={p.title} className="text-xs">
            <div className="relative aspect-square overflow-hidden rounded bg-muted">
              <img src={p.img} alt={p.title} loading="lazy" className="size-full object-cover" />
              <span className="absolute bottom-1 left-1 rounded-sm bg-ship px-1 text-[10px] text-primary-foreground">Free shipping</span>
            </div>
            <p className="mt-1 line-clamp-2"><span className="mr-1 rounded-sm bg-sale px-1 text-[10px] text-primary-foreground">Black Friday</span>{p.title}</p>
            <p className="text-muted-foreground">{p.sold}</p>
            <p>{p.off && <span className="mr-1 text-sale">{p.off}</span>}<b className="text-sm">R${p.price}</b> <span className="text-muted-foreground line-through">R${p.old}</span></p>
          </article>
        ))}
      </div>
    </section>
  );
}
