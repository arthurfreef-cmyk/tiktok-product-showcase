import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props { photos: string[]; index: number; onChange: (i: number) => void; onClose: () => void }

/** Visualizador de fotos em tela cheia, com navegação por toque nos botões e teclado. */
export function Lightbox({ photos, index, onChange, onClose }: Props) {
  const go = (d: number) => onChange((index + d + photos.length) % photos.length);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, photos.length, onChange, onClose]);
  const src = photos[index];
  if (!src) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90" onClick={onClose}>
      <button aria-label="Fechar" onClick={onClose} className="absolute right-3 top-3 text-background"><X className="size-7" /></button>
      {photos.length > 1 && (
        <>
          <button aria-label="Anterior" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 text-background"><ChevronLeft className="size-8" /></button>
          <button aria-label="Próxima" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 text-background"><ChevronRight className="size-8" /></button>
        </>
      )}
      <img src={src} alt={`Foto ${index + 1} de ${photos.length}`} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
      <span className="absolute bottom-4 text-sm text-background">{index + 1} / {photos.length}</span>
    </div>
  );
}
