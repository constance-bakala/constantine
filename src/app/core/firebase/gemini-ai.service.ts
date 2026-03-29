import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { TranslateService } from '@ngx-translate/core';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';
import { CatalogCategory, CatalogItem } from '@shared/interfaces/catalog.interfaces';

/** Représente un message dans la conversation du chatbot. */
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

/** Résultat de la génération de description IA pour un article. */
export interface GeneratedDescription {
  fr: string;
  en: string;
}

@Injectable({ providedIn: 'root' })
export class GeminiAiService {

  private readonly ai = getAI(this.app, { backend: new GoogleAIBackend() });

  constructor(
    private app: FirebaseApp,
    private translate: TranslateService,
  ) { }

  /** Langue courante de l'application ('fr' | 'en'). */
  get currentLang(): 'fr' | 'en' {
    return (this.translate.getCurrentLang() ?? 'fr') as 'fr' | 'en';
  }

  // ── Génération de description ──────────────────────────────────────────────

  /**
   * Génère une description commerciale FR + EN pour un article à partir de son image.
   * Utilise Gemini multimodal (image → texte).
   *
   * @param imageUrl      URL publique de la photo de couverture de l'article.
   * @param categoryTitle Titre de la catégorie (ex : "Bijoux", "Robes wax").
   */
  async generateItemDescription(
    imageUrl: string,
    categoryTitle: string,
  ): Promise<GeneratedDescription> {
    const model = getGenerativeModel(this.ai, { model: 'gemini-2.5-flash-lite' });

    const base64 = await this.urlToBase64(imageUrl);
    const mimeType = this.detectMimeType(imageUrl);

    const prompt = `Tu es un copywriter expert pour "Délice Éternel", boutique de mode africaine à Libreville (Gabon).

Commence par analyser attentivement l'image et note les caractéristiques visuelles précises :
- Couleurs dominantes et motifs (wax, tissu uni, imprimé, rayures…)
- Longueur des manches (sans manches, manches courtes, manches ¾, longues manches)
- Longueur du vêtement (court, mi-long, maxi)
- Coupe et silhouette (ajustée, fluide, évasée, droite, portefeuille…)
- Détails distinctifs visibles (col, décolleté, ceinture, broderie, volants, fentes…)

Ensuite, rédige une description commerciale de 2-3 phrases qui mentionne UNIQUEMENT les détails que tu observes réellement dans cette image. Chaque description doit être unique et spécifique à cet article — évite les formulations génériques.

Catégorie : "${categoryTitle}". Ton : chaleureux, élégant, commercial.

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans backticks :
{"fr":"description spécifique en français","en":"specific description in English"}`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64, mimeType } },
    ]);

    const rawText = result.response.text().trim();
    // Extrait le JSON même si Gemini ajoute du texte autour
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Réponse Gemini invalide : ' + rawText);
    return JSON.parse(jsonMatch[0]) as GeneratedDescription;
  }

  // ── Chatbot multi-tour ─────────────────────────────────────────────────────

  /**
   * Envoie un message au chatbot et retourne la réponse de Gemini.
   * La session est maintenue en interne pour conserver l'historique.
   *
   * @param userMessage  Message saisi par l'utilisateur.
   * @param history      Historique de la conversation (pour reconstituer le contexte).
   */
  /**
   * Construit un résumé textuel du catalogue à injecter dans le system prompt.
   * Inclut les fourchettes de prix si les articles sont déjà chargés dans le store.
   */
  buildCatalogContext(
    categories: CatalogCategory[],
    itemsByCategory: Record<string, CatalogItem[]>,
  ): string {
    if (!categories.length) return '';
    const lines = categories.map(cat => {
      const items = itemsByCategory[cat.prefix] ?? [];
      if (items.length) {
        const prices = items.map(i => i.priceXAF);
        const min = Math.min(...prices).toLocaleString('fr');
        const max = Math.max(...prices).toLocaleString('fr');
        return `- ${cat.title} (${cat.prefix}) : ${items.length} articles, ${min}–${max} FCFA`;
      }
      return `- ${cat.title} (${cat.prefix})`;
    });
    return `\nCatalogue disponible :\n${lines.join('\n')}\n`;
  }

  async sendChatMessage(
    userMessage: string,
    history: ChatMessage[],
    catalogContext = '',
  ): Promise<string> {
    const lang = this.currentLang;

    const systemInstruction = lang === 'fr'
      ? `Tu es l'assistant de Délice Éternel, une boutique de mode africaine à Libreville (Gabon).
Tu réponds en français, de façon chaleureuse et concise (3 phrases max).
Tu aides les clients sur : les produits du catague, les tailles, les paiements (Airtel Money, Moov Money, Remitly, Western Union), la livraison (coursier Libreville 2 000–5 000 FCFA, expédition internationale DHL/FedEx) et les codes promo.
Si tu ne sais pas, dis-le honnêtement et invite le client à nous contacter par email.${catalogContext}`
      : `You are the assistant for Délice Éternel, an African fashion boutique in Libreville (Gabon).
You respond in English, warmly and concisely (3 sentences max).
You help customers with: products category, sizes, payments (Airtel Money, Moov Money, Remitly, Western Union), delivery (courier in Libreville 2,000–5,000 FCFA, international shipping DHL/FedEx) and promo codes.
If you don't know, say so honestly and invite the customer to contact us by email.${catalogContext}`;

    // Reconstitue l'historique au format attendu par Gemini
    // On exclut le dernier message (l'utilisateur courant) et les messages
    // model en tête d'historique (ex: message de bienvenue) car Gemini
    // exige que le premier élément de l'historique soit role 'user'.
    const allPrev = history.slice(0, -1);
    const firstUserIdx = allPrev.findIndex(m => m.role === 'user');
    const geminiHistory = (firstUserIdx === -1 ? [] : allPrev.slice(firstUserIdx)).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const model = getGenerativeModel(this.ai, {
      model: 'gemini-2.5-flash-lite',
      systemInstruction,
    });

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  }

  // ── Helpers privés ─────────────────────────────────────────────────────────

  /** Télécharge une image depuis son URL et la convertit en base64. */
  private async urlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Supprime le préfixe "data:image/...;base64,"
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /** Déduit le MIME type à partir de l'extension de l'URL. */
  private detectMimeType(url: string): string {
    const lower = url.toLowerCase();
    if (lower.includes('.webp')) return 'image/webp';
    if (lower.includes('.png')) return 'image/png';
    return 'image/jpeg';
  }
}
