import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    const useSpy = jest.spyOn(translateService, 'use');

    component.switchLanguage('es');
    expect(useSpy).toHaveBeenCalledWith('es');
  });
});
