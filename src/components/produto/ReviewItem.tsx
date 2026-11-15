import { Stars } from "./Stars";
import type { Review } from "./data";

interface Props { review: Review; onOpen: (photos: string[], i: number) => void }

export function ReviewItem({ review: r, onOpen }: Props) {
  return (
    <li className="space-y-1.5 text-sm">
      <div className="flex items-center gap-2">
        {r.avatar ? (
          <img src={r.avatar} alt={r.user} className="size-8 rounded-full object-cover" />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-ship font-semibold text-primary-foreground">{r.user.charAt(0)}</span>
        )}
        <div><p className="font-semibold">{r.user} · Compras verificadas</p><p className="text-xs text-muted-foreground">BR</p></div>
      </div>
      <Stars value={r.stars} />
      <p>{r.text}</p>
      {r.photos.length > 0 && (
        <div className="flex gap-2">
          {r.photos.map((src, i) => (
            <button key={src} onClick={() => onOpen(r.photos, i)} aria-label={`Ver foto ${i + 1} de ${r.user}`} className="size-20 overflow-hidden rounded">
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground">Item: {r.item}</p>
      <p className="text-xs text-muted-foreground">{r.date}</p>
    </li>
  );
}
