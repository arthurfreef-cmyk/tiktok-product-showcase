import { describe, expect, it } from "vitest";
import { discount, specs } from "@/components/produto/data";
describe("preços", () => {
  it("1 peça custa 48,90 de 120", () => expect(specs[0]).toMatchObject({ price: 48.9, old: 120 }));
  it("2 peças custa 137,90 de 257", () => expect(specs[1]).toMatchObject({ price: 137.9, old: 257 }));
  it("desconto 2 peças é 46%", () => expect(discount(specs[1]!)).toBe(46));
});
