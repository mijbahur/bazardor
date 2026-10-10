export interface Category {
    slug: string;
    nameBn: string;
    icon: string;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string; // Category slug
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };

  markets: MarketPrice[];
}