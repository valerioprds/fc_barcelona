import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayercardComponent } from './playercard.component';
import { Player } from '../../models/player.interface';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('PlayercardComponent', () => {
  let component: PlayercardComponent;
  let fixture: ComponentFixture<PlayercardComponent>;
  let router: Router;

  const mockPlayer: Player = {
    id: '1',
    name: 'Player One',
    placeOfBirth: 'City',
    dateOfBirth: '1990-01-01',
    weight: 70,
    height: 180,
    image: 'path/to/image.jpg',
    position: 'goalkeeper',
    honors: {
      laLiga: 3,
      championsLeague: 2,
      copaDelRey: 1,
      clubWorldCup: 1,
    },
    biography: {
      en: 'Biography in English',
      es: 'Biografía en español',
    },
    stats: {
      games: 100,
      cleanSheets: 50,
      saves: 200,
      goals: 0,
      assists: 0,
      seasons: [
        {
          start: 2010,
          end: 2011,
          games: 30,
          cleanSheets: 15,
          saves: 60,
          goals: 0,
          assists: 0,
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayercardComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.player = mockPlayer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display player details', () => {
    const playerNameElement = fixture.debugElement.query(
      By.css('.card-title'),
    ).nativeElement;
    expect(playerNameElement.textContent).toContain(mockPlayer.name);
  });

  it('should set loading to true and navigate to player details on button click', () => {
    jest.useFakeTimers();
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onViewStats();
    expect(component.loading).toBe(true);
    jest.advanceTimersByTime(2000);
    expect(component.loading).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/player', mockPlayer.id]);
    jest.useRealTimers();
  });
});
