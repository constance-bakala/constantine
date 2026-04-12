import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { SHOP_DEFAULTS } from '@app/core/firebase/app-config.repository';
import { ShopConfigService } from '@shared/services/shop-config.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(waitForAsync(() => {
    const shopStub: Partial<ShopConfigService> = {
      shop$: of({ ...SHOP_DEFAULTS }),
      whatsappDigits: (s: string | undefined | null) => String(s ?? '').replace(/\D/g, ''),
      whatsappWaPath: (s: string | undefined | null) => {
        const d = String(s ?? '').replace(/\D/g, '');
        return d.length >= 8 ? d : null;
      },
    };
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      providers: [{ provide: ShopConfigService, useValue: shopStub }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
