export interface PortfolioData {
  portfolioLink: string;
  portfolioName: string;     // FR
  portfolioNameEn?: string;  // EN
  coverImageUrl: string;
  /** Toutes les images disponibles pour la rotation. Si vide, coverImageUrl est utilisée. */
  imageUrls?: string[];
}
