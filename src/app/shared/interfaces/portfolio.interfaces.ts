export interface PortfolioData {
  portfolioLink: string;
  portfolioImagePrefix: string;
  portfolioName: string;
  portfolioImagesSize: number;
  portfolioDirectory: string;
  portfolioGroupIds: number[];
  coverFile?: string; // défaut : 'cover.png'
}
