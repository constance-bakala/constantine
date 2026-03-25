import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  OnDestroy, ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ChatMessage, GeminiAiService } from '@app/core/firebase/gemini-ai.service';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChatWidgetComponent implements OnDestroy {

  isOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  private langSub: Subscription;

  constructor(
    private gemini: GeminiAiService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.langSub = this.translate.onLangChange.subscribe(() => {
      // Met à jour le message de bienvenue si c'est le seul message affiché
      if (this.messages.length === 1 && this.messages[0].role === 'model') {
        this.addWelcomeMessage();
      }
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
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

  // ── Envoi de message ──────────────────────────────────────────────────────

  async send(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages = [...this.messages, { role: 'user', text }];
    this.userInput = '';
    this.isLoading = true;
    this.cdr.markForCheck();
    this.scrollToBottom();

    try {
      const reply = await this.gemini.sendChatMessage(text, this.messages);
      this.messages = [...this.messages, { role: 'model', text: reply }];
    } catch (err) {
      console.error('[ChatWidget] Gemini error:', err);
      const errorText = this.translate.getCurrentLang() === 'en'
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
    const text = this.translate.getCurrentLang() === 'en'
      ? 'Hello! 👋 I\'m the Délice Éternel assistant. How can I help you today?'
      : 'Bonjour ! 👋 Je suis l\'assistant Délice Éternel. Comment puis-je vous aider ?';
    this.messages = [{ role: 'model', text }];
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }
}
