import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
