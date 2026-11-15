import av1 from "@/assets/produto/av1.webp.asset.json";
import av2 from "@/assets/produto/av2.webp.asset.json";
import av3 from "@/assets/produto/av3.webp.asset.json";
import av4 from "@/assets/produto/av4.webp.asset.json";
import av5 from "@/assets/produto/av5.webp.asset.json";
import av6 from "@/assets/produto/av6.webp.asset.json";
import um from "@/assets/produto/um.webp.asset.json";
import dois from "@/assets/produto/dois.jpg.asset.json";
import usb from "@/assets/produto/usb.webp.asset.json";
import cantos from "@/assets/produto/cantos.webp.asset.json";
import haste from "@/assets/produto/haste.webp.asset.json";
import limpeza from "@/assets/produto/limpeza.webp.asset.json";
import p1 from "@/assets/produto/p1.jpg.asset.json";
import p2 from "@/assets/produto/p2.jpg.asset.json";
import p3 from "@/assets/produto/p3.jpg.asset.json";
import p4 from "@/assets/produto/p4.jpg.asset.json";
import p5 from "@/assets/produto/p5.jpg.asset.json";

export const gallery: string[] = [usb.url, cantos.url, haste.url, limpeza.url];
export interface Spec { id: string; label: string; img: string; price: number; old: number }
export const specs: Spec[] = [
  { id: "1", label: "1 peça", img: um.url, price: 48.9, old: 120 },
  { id: "2", label: "2 peça", img: dois.url, price: 137.9, old: 257 },
];
export const brl = (n: number) => n.toFixed(2).replace(".", ",");
export const discount = (s: Spec) => Math.round((1 - s.price / s.old) * 100);
export const ratingBars = [
  { stars: 5, count: 48 },
  { stars: 4, count: 7 },
  { stars: 3, count: 1 },
  { stars: 2, count: 1 },
  { stars: 1, count: 4 },
];
export interface Review {
  id: string;
  user: string;
  avatar?: string;
  stars: number;
  text: string;
  photos: string[];
  item: string;
  date: string;
}
export const reviews: Review[] = [
  { id: "a", user: "e**a", stars: 4, text: "Os acessórios caem com facilidade. Mas ainda assim, entendo que vale o valor do investimento", photos: [av1.url, av2.url], item: "1 peça", date: "2026-08-20" },
  { id: "b", user: "J**n", stars: 5, text: "Muito bom, mais e um pouco lento", photos: [av5.url, av6.url], item: "1 peça", date: "2026-10-03" },
  { id: "c", user: "o**e", stars: 5, text: "Muito boa a escova facilita bastante, recomendo muito prático o manuseio", photos: [av3.url, av4.url], item: "1 peça", date: "2026-11-11" },
];
export const moreProducts = [
  { img: p1.url, title: "Moedor Elétrico de Café e Especiarias Inox em Aço", sold: "5.6K vendido", price: "12,69", old: "370,00", off: "" },
  { img: p2.url, title: "Mini Filtro De Café Chá Coador De Café Sem Papel Reutilizável Portátil Ino...", sold: "18.4K vendido", price: "13,81", old: "30,00", off: "-54%" },
  { img: p3.url, title: "Escova Elétrica 9 em 1 – Limpeza Fácil e Rápida", sold: "93 vendido", price: "45,40", old: "120,00", off: "-62%" },
  { img: p4.url, title: "Porta Escova Dental 3 em 1 com Esterilizador UV, Dispenser Automático e...", sold: "65 vendido", price: "20,33", old: "50,00", off: "-59%" },
  { img: p5.url, title: "Escova Dental Elétrica Sônica, Limpeza Profunda, Recarregável com", sold: "76 vendido", price: "14,63", old: "35,00", off: "-58%" },
];
