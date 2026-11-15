import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { gallery } from "./data";
import { Countdown } from "./Countdown";

export function Gallery({ cover }: { cover: string }) {
  const images = [cover, ...gallery];
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [cover]);
  return (
    <section>
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img src={images[active]} alt="Escova Elétrica 9 em 1" className="size-full object-cover" />
      </div>
      <Countdown />
      <div className="flex gap-2 overflow-x-auto px-3 py-2">
        {images.map((src, i) => (
          <button key={src} onClick={() => setActive(i)} aria-label={`Foto ${i + 1}`}
            className={cn("size-14 shrink-0 overflow-hidden rounded border-2", i === active ? "border-foreground" : "border-transparent")}>
            <img src={src} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
