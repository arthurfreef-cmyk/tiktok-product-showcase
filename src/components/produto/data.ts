import main from "@/assets/produto/main.jpg.asset.json";
import usb from "@/assets/produto/usb.webp.asset.json";
import cantos from "@/assets/produto/cantos.webp.asset.json";
import haste from "@/assets/produto/haste.webp.asset.json";
import limpeza from "@/assets/produto/limpeza.webp.asset.json";
import spec1 from "@/assets/produto/spec1.jpg.asset.json";
import spec2 from "@/assets/produto/spec2.jpg.asset.json";
import r1 from "@/assets/produto/r1.jpg.asset.json";
import r2 from "@/assets/produto/r2.jpg.asset.json";
import r3 from "@/assets/produto/r3.jpg.asset.json";
import r4 from "@/assets/produto/r4.jpg.asset.json";
import rsmall from "@/assets/produto/rsmall.jpg.asset.json";
import p1 from "@/assets/produto/p1.jpg.asset.json";
import p2 from "@/assets/produto/p2.jpg.asset.json";
import p3 from "@/assets/produto/p3.jpg.asset.json";
import p4 from "@/assets/produto/p4.jpg.asset.json";
import p5 from "@/assets/produto/p5.jpg.asset.json";

export const gallery: string[] = [main.url, usb.url, cantos.url, haste.url, limpeza.url];
export const specs = [
  { id: "1", label: "1 peça", img: spec1.url },
  { id: "2", label: "2 peça", img: spec2.url },
];
export const ratingBars = [
  { stars: 5, count: 48 },
  { stars: 4, count: 7 },
  { stars: 3, count: 1 },
  { stars: 2, count: 1 },
  { stars: 1, count: 4 },
];
export const reviewPhotos = [
  { img: r1.url, user: "b**i", stars: 5 },
  { img: r2.url, user: "b**i", stars: 5 },
  { img: r3.url, user: "b**i", stars: 5 },
  { img: r4.url, user: "J**a A**s", stars: 4 },
];
export interface Review { id: string; user: string; initial: string; stars: number; text: string; photo?: string; date: string }
export const reviews: Review[] = [
  { id: "a", user: "e**a", initial: "e", stars: 4, text: "Os acessórios caem com facilidade. Mas ainda assim, entendo que vale o valor do investimento", photo: rsmall.url, date: "2026-08-20" },
  { id: "b", user: "J**n", initial: "J", stars: 5, text: "Muito bom, mais e um pouco lento", date: "2026-10-03" },
  { id: "c", user: "o**e", initial: "o", stars: 5, text: "Muito boa a escova facilita bastante, recomendo muito prático o manuseio", date: "2026-11-11" },
];
export const moreProducts = [
  { img: p1.url, title: "Moedor Elétrico de Café e Especiarias Inox em Aço", sold: "5.6K vendido", price: "12,69", old: "370,00", off: "" },
  { img: p2.url, title: "Mini Filtro De Café Chá Coador De Café Sem Papel Reutilizável Portátil Ino...", sold: "18.4K vendido", price: "13,81", old: "30,00", off: "-54%" },
  { img: p3.url, title: "Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida", sold: "93 vendido", price: "45,40", old: "120,00", off: "-62%" },
  { img: p4.url, title: "Porta Escova Dental 3 em 1 com Esterilizador UV, Dispenser Automático e...", sold: "65 vendido", price: "20,33", old: "50,00", off: "-59%" },
  { img: p5.url, title: "Escova Dental Elétrica Sônica, Limpeza Profunda, Recarregável com", sold: "76 vendido", price: "14,63", old: "35,00", off: "-58%" },
];
