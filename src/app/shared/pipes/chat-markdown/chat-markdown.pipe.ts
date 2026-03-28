import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Convertit un sous-ensemble de Markdown (gras, listes, sauts de ligne)
 * en HTML sécurisé pour l'affichage des réponses du chatbot.
 *
 * Supporte :
 *   **texte**  → <strong>texte</strong>
 *   - item     → <ul><li>item</li></ul>
 *   \n         → <br> (hors contexte liste)
 */
@Pipe({ name: 'chatMarkdown', standalone: false })
export class ChatMarkdownPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string): SafeHtml {
    if (!text) return this.sanitizer.bypassSecurityTrustHtml('');

    const lines = text.split('\n');
    let html = '';
    let inList = false;
    let firstLine = true;

    for (const raw of lines) {
      // Escape HTML entities
      const escaped = raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Apply inline bold: **text**
      const inline = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      const isBullet = /^[-•]\s+/.test(inline);

      if (isBullet && !inList) { html += '<ul>'; inList = true; }
      if (!isBullet && inList) { html += '</ul>'; inList = false; }

      if (isBullet) {
        html += `<li>${inline.replace(/^[-•]\s+/, '')}</li>`;
      } else {
        if (!firstLine && !inList) html += '<br>';
        html += inline;
      }

      firstLine = false;
    }

    if (inList) html += '</ul>';

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
