import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DEFAULT_LOCALE_ID} from '@helpers/constants';

@Injectable({providedIn: 'root'})
export class TranslateService {
  data: any = {};

  constructor(private http: HttpClient) {
  }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve) => {
      const langPath = `/assets/i18n/${lang || DEFAULT_LOCALE_ID}.json`;

      this.http.get<{}>(langPath).subscribe(translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
