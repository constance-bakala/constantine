import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { ChatMessage, GeminiAiService } from '@app/core/firebase/gemini-ai.service';
import { CatalogState } from '@shared/interfaces/catalog.interfaces';
import { selectCatalogState } from '@app/features/store/catalog';

interface ChatSuggestion {
  labelFr: string;
  labelEn: string;
  textFr: string;
  textEn: string;
}

const SUGGESTIONS: ChatSuggestion[] = [
  {
    labelFr: '💳 Comment payer ?',      labelEn: '💳 How to pay?',
    textFr:  'Comment puis-je payer ma commande ?',
    textEn:  'How can I pay for my order?',
  },
  {
    labelFr: '🚚 Livraison',             labelEn: '🚚 Delivery',
    textFr:  'Quels sont les délais et coûts de livraison ?',
    textEn:  'What are the delivery times and costs?',
  },
  {
    labelFr: '👗 Catégories',            labelEn: '👗 Categories',
    textFr:  'Quelles sont les catégories de produits disponibles ?',
    textEn:  'What product categories are available?',
  },
  {
    labelFr: '🏷️ Codes promo',           labelEn: '🏷️ Promo codes',
    textFr:  'Avez-vous des codes promo en ce moment ?',
    textEn:  'Do you have any promo codes right now?',
  },
];

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChatWidgetComponent implements OnInit, OnDestroy {

  isOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;
  suggestions = SUGGESTIONS;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  private catalogState: CatalogState | null = null;
  private subs = new Subscription();

  constructor(
    private gemini: GeminiAiService,
    private translate: TranslateService,
    private store: Store<any>,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Récupère le state catalogue pour enrichir le contexte Gemini
    this.subs.add(
      this.store.select(selectCatalogState).subscribe(state => {
        this.catalogState = state;
      })
    );

    // Met à jour le message de bienvenue si la langue change
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        if (this.messages.length === 1 && this.messages[0].role === 'model') {
          this.addWelcomeMessage();
        }
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Accesseurs ────────────────────────────────────────────────────────────

  get currentLang(): string {
    return this.translate.getCurrentLang() ?? 'fr';
  }

  /** Affiche les chips uniquement avant le premier message utilisateur. */
  get showSuggestions(): boolean {
    return !this.messages.some(m => m.role === 'user');
  }

  // ── Ouverture / fermeture ─────────────────────────────────────────────────

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addWelcomeMessage();
    }
    this.cdr.markForCheck();
  }

  close(): void {
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  // ── Suggestions rapides ───────────────────────────────────────────────────

  pickSuggestion(s: ChatSuggestion): void {
    const text = this.currentLang === 'en' ? s.textEn : s.textFr;
    this.userInput = text;
    this.send();
  }

  suggestionLabel(s: ChatSuggestion): string {
    return this.currentLang === 'en' ? s.labelEn : s.labelFr;
  }

  // ── Envoi de message ──────────────────────────────────────────────────────

  async send(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages = [...this.messages, { role: 'user', text }];
    this.userInput = '';
    this.isLoading = true;
    this.cdr.markForCheck();
    this.scrollToBottom();

    const catalogContext = this.catalogState
      ? this.gemini.buildCatalogContext(
          this.catalogState.categories.filter(c => c.published),
          this.catalogState.itemsByCategory,
        )
      : '';

    try {
      const reply = await this.gemini.sendChatMessage(text, this.messages, catalogContext);
      this.messages = [...this.messages, { role: 'model', text: reply }];
    } catch (err) {
      console.error('[ChatWidget] Gemini error:', err);
      const errorText = this.currentLang === 'en'
        ? 'Sorry, I encountered an error. Please try again.'
        : 'Désolé, une erreur est survenue. Veuillez réessayer.';
      this.messages = [...this.messages, { role: 'model', text: errorText }];
    } finally {
      this.isLoading = false;
      this.cdr.markForCheck();
      this.scrollToBottom();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private addWelcomeMessage(): void {
    const text = this.currentLang === 'en'
      ? 'Hello! 👋 I\'m the Délice Éternel assistant. How can I help you today?'
      : 'Bonjour ! 👋 Je suis l\'assistant Délice Éternel. Comment puis-je vous aider ?';
    this.messages = [{ role: 'model', text }];
    this.cdr.markForCheck();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }
}
