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

  // ── Recommandations catégories ─────────────────────────────────────────────

  /**
   * Suggère des catégories similaires à proposer en "Voir aussi".
   * Résultat stocké dans `relatedCategories` de la catégorie Firebase.
   */
  async suggestRelatedCategories(
    current: CatalogCategory,
    allCategories: CatalogCategory[],
  ): Promise<string[]> {
    const model = getGenerativeModel(this.ai, { model: 'gemini-2.5-flash-lite' });
    const others = allCategories.filter(c => c.prefix !== current.prefix);
    const catList = others.map(c =>
      `- ${c.prefix}: "${c.title}"${c.description ? ' — ' + c.description.replace(/<[^>]+>/g, '').slice(0, 80) : ''}`
    ).join('\n');

    const prompt = `Tu es un expert en mode africaine pour "Délice Éternel", boutique à Libreville (Gabon).

Catégorie actuelle : "${current.title}" (${current.prefix})${current.description ? '\nDescription : ' + current.description.replace(/<[^>]+>/g, '').slice(0, 150) : ''}

Autres catégories disponibles :
${catList}

Sélectionne 2 à 3 catégories qui seraient les meilleures alternatives ou variantes similaires à proposer en "Voir aussi" à un client consultant "${current.title}".

Réponds UNIQUEMENT avec un tableau JSON des préfixes, sans markdown, sans backticks :
["prefix1","prefix2"]`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const match = rawText.match(/\[[\s\S]*?\]/);
    if (!match) throw new Error('Réponse IA invalide : ' + rawText.slice(0, 100));
    const returned = JSON.parse(match[0]) as string[];
    return returned
      .map(p => others.find(c => c.prefix.toLowerCase() === p.toLowerCase())?.prefix)
      .filter((p): p is string => !!p);
  }

  /**
   * Suggère des catégories complémentaires pour "Vos suggestions".
   * Ex : robe → boucles d'oreilles, sac, ceinture.
   * Résultat stocké dans `complementaryCategories` de la catégorie Firebase.
   */
  async suggestComplementaryCategories(
    current: CatalogCategory,
    allCategories: CatalogCategory[],
  ): Promise<string[]> {
    const model = getGenerativeModel(this.ai, { model: 'gemini-2.5-flash-lite' });
    const others = allCategories.filter(c => c.prefix !== current.prefix);
    if (!others.length) return [];

    // Inclut prefix, titre FR et EN pour maximiser la compréhension de l'IA
    const catList = others.map(c => {
      const titleEn = c.titleEn ? ` / "${c.titleEn}"` : '';
      return `- PREFIXE="${c.prefix}" TITRE="${c.title}"${titleEn}`;
    }).join('\n');

    const prompt = `Tu es un expert en mode et accessoires africains pour "Délice Éternel", boutique à Libreville (Gabon).

CATÉGORIE QUE LE CLIENT CONSULTE :
- Préfixe : "${current.prefix}"
- Titre : "${current.title}"${current.titleEn ? ` / "${current.titleEn}"` : ''}

AUTRES CATÉGORIES DISPONIBLES DANS LA BOUTIQUE :
${catList}

MISSION : Détermine quelles catégories de la liste ci-dessus compléteraient stylistiquement un article de la catégorie "${current.title}".
Exemples d'associations naturelles en mode : robe/dress → bijoux/jewellery, boucles d'oreilles, sac ; haut → bas, ceinture ; chaussures → sac, bijoux.
RÈGLE IMPORTANTE : même s'il n'y a qu'une seule catégorie disponible, tu dois l'inclure si elle est complémentaire.
Inclus TOUTES les catégories de la liste qui ont une association stylistique logique avec "${current.title}".

Réponds UNIQUEMENT avec un tableau JSON contenant les valeurs exactes des champs PREFIXE (respecte la casse exacte), sans markdown, sans backticks :
["prefixe1","prefixe2"]`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const match = rawText.match(/\[[\s\S]*?\]/);
    if (!match) throw new Error('Réponse IA invalide : ' + rawText.slice(0, 100));
    const returned = JSON.parse(match[0]) as string[];
    // Correspondance insensible à la casse pour éviter les erreurs de capitalisation de l'IA
    return returned
      .map(p => others.find(c => c.prefix.toLowerCase() === p.toLowerCase())?.prefix)
      .filter((p): p is string => !!p);
  }

  /**
   * Suggère jusqu'à 4 articles complémentaires à un article donné.
   * Utilise les descriptions textuelles (couleurs, motifs, style).
   * Résultat stocké dans `complementaryItemRefs` de l'article Firebase.
   *
   * @param item              Article pour lequel chercher des compléments.
   * @param candidates        Articles issus des catégories complémentaires (publiés).
   */
  async suggestComplementaryItems(
    item: CatalogItem,
    candidates: CatalogItem[],
  ): Promise<string[]> {
    const eligible = candidates.filter(c => c.published && c.id !== item.id && c.descriptionFr);
    if (!eligible.length) return [];

    const model = getGenerativeModel(this.ai, { model: 'gemini-2.5-flash-lite' });

    const itemContext = item.descriptionFr
      ? item.descriptionFr.slice(0, 250)
      : `Référence : ${item.reference}`;

    const candList = eligible
      .map(c => `- ID="${c.id}" REF="${c.reference}" DESC="${(c.descriptionFr ?? '').slice(0, 150)}"`)
      .join('\n');

    const prompt = `Tu es un expert styliste pour "Délice Éternel", boutique de mode africaine à Libreville (Gabon).

ARTICLE CONSULTÉ PAR LE CLIENT :
REF="${item.reference}"
Description : ${itemContext}

ARTICLES DISPONIBLES DANS LES CATÉGORIES COMPLÉMENTAIRES :
${candList}

MISSION : Sélectionne les 4 articles (ou moins s'il y en a moins de 4) qui compléteraient le mieux le look avec l'article ci-dessus.
Critères par ordre de priorité : couleurs et motifs similaires ou harmonieux, style (wax, uni, imprimé…) cohérent, silhouette adaptée.
Si l'article a des motifs rouges, priorise les articles avec des touches rouges. Si uni, sélectionne des compléments qui s'harmonisent.

Réponds UNIQUEMENT avec un tableau JSON des valeurs exactes des champs ID (respecte la casse exacte), sans markdown, sans backticks :
["id1","id2","id3","id4"]`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const match = rawText.match(/\[[\s\S]*?\]/);
    if (!match) throw new Error('Réponse IA invalide');
    const ids = JSON.parse(match[0]) as string[];
    // Filtre insensible à la casse et limite à 4
    return ids
      .map(id => eligible.find(c => c.id.toLowerCase() === id.toLowerCase())?.id)
      .filter((id): id is string => !!id)
      .slice(0, 4);
  }

  /**
   * Génère un texte promotionnel FR + EN pour Instagram/WhatsApp.
   * Résultat stocké dans `promoTextFr` et `promoTextEn` de la catégorie Firebase.
   */
  async generateCategoryPromoText(
    category: CatalogCategory,
  ): Promise<{ fr: string; en: string }> {
    const model = getGenerativeModel(this.ai, { model: 'gemini-2.5-flash-lite' });

    const prompt = `Tu es un copywriter social media pour "Délice Éternel", boutique de mode africaine à Libreville (Gabon).

Catégorie : "${category.title}"${category.description ? '\nDescription : ' + category.description.replace(/<[^>]+>/g, '').slice(0, 200) : ''}

Rédige un post promotionnel accrocheur pour Instagram/WhatsApp (150–200 caractères max, emojis inclus). Ton chaleureux, féminin, élégant. Le post doit donner envie de découvrir la catégorie.

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans backticks :
{"fr":"texte français avec emojis","en":"English text with emojis"}`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Réponse IA invalide');
    return JSON.parse(match[0]) as { fr: string; en: string };
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
