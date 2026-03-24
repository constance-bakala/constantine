import { Component } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

type ClothType = 'upper_body' | 'lower_body' | 'dresses';

@Component({
  selector: 'app-admin-tryon',
  templateUrl: './admin-tryon.component.html',
  styleUrls: ['./admin-tryon.component.scss'],
  standalone: false,
})
export class AdminTryonComponent {

  garmentPreview: string | null = null;
  personPreview:  string | null = null;
  resultPreview:  string | null = null;
  garmentB64: string | null = null;
  personB64:  string | null = null;

  clothType: ClothType = 'dresses';
  loading = false;
  error   = '';

  readonly clothTypes: { value: ClothType; label: string }[] = [
    { value: 'dresses',    label: 'Robe entière' },
    { value: 'upper_body', label: 'Haut du corps' },
    { value: 'lower_body', label: 'Bas du corps'  },
  ];

  constructor(private fns: Functions) {}

  onGarmentPick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.readImage(file, (preview, b64) => {
      this.garmentPreview = preview;
      this.garmentB64     = b64;
      this.resultPreview  = null;
    });
  }

  onPersonPick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.readImage(file, (preview, b64) => {
      this.personPreview = preview;
      this.personB64     = b64;
      this.resultPreview = null;
    });
  }

  private readImage(file: File, cb: (preview: string, b64: string) => void): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const b64 = dataUrl.replace(/^data:image\/\w+;base64,/, '');
      cb(dataUrl, b64);
    };
    reader.readAsDataURL(file);
  }

  get canRun(): boolean {
    return !!this.garmentB64 && !!this.personB64 && !this.loading;
  }

  async runTryon(): Promise<void> {
    if (!this.canRun) return;
    this.loading = true;
    this.error   = '';
    this.resultPreview = null;

    try {
      const callable = httpsCallable<any, { result: string }>(this.fns, 'tryonVirtual');
      const res = await callable({
        garment:   this.garmentB64,
        person:    this.personB64,
        clothType: this.clothType,
      });
      this.resultPreview = `data:image/jpeg;base64,${res.data.result}`;
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de l\'appel à l\'API.';
      console.error('[AdminTryon]', err);
    } finally {
      this.loading = false;
    }
  }

  downloadResult(): void {
    if (!this.resultPreview) return;
    const a = document.createElement('a');
    a.href = this.resultPreview;
    a.download = `tryon_${Date.now()}.jpg`;
    a.click();
  }

  reset(): void {
    this.garmentPreview = null;
    this.personPreview  = null;
    this.resultPreview  = null;
    this.garmentB64     = null;
    this.personB64      = null;
    this.error          = '';
  }
}
