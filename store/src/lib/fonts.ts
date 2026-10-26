import { Bodoni_Moda, Newsreader } from "next/font/google";

// High-contrast Didone, the Vogue-style masthead look: hero copy, promo bar, header nav and wordmark.
export const didone = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], style: ["normal"] });

// Editorial transitional serif for product names (optical sizes give a display cut at large sizes).
export const productSerif = Newsreader({ subsets: ["latin"], axes: ["opsz"], style: ["normal"] });
