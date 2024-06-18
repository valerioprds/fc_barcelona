import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
      providers: [TranslateService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fc_barcelona'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fc_barcelona');
  });

  it('should switch language', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const translateService = TestBed.inject(TranslateService);
    const useSpy = jest.spyOn(translateService, 'use');

    app.switchLanguage('es');
    expect(useSpy).toHaveBeenCalledWith('es');
  });
});
