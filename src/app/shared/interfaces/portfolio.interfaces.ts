export interface PortfolioData {
  portfolioLink: string;
  portfolioName: string;
  coverImageUrl: string;
  /** Toutes les images disponibles pour la rotation. Si vide, coverImageUrl est utilisée. */
  imageUrls?: string[];
}
