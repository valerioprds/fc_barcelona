import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerDetailsComponent } from './player-details.component';
import { PlayerService } from '../../services/player.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Player } from '../../models/player.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlayerDetailsComponent', () => {
  let component: PlayerDetailsComponent;
  let fixture: ComponentFixture<PlayerDetailsComponent>;
  let playerService: PlayerService;
  let translateService: TranslateService;
  let route: ActivatedRoute;

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
      declarations: [PlayerDetailsComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayerById: jest.fn().mockReturnValue(of(mockPlayer)),
          },
        },
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1',
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailsComponent);
    component = fixture.componentInstance;
    playerService = TestBed.inject(PlayerService);
    translateService = TestBed.inject(TranslateService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to English', () => {
    expect(translateService.getDefaultLang()).toBe('en');
  });

  it('should fetch player details on init', () => {
    expect(component.player).toEqual(mockPlayer);
  });

  it('should switch language', () => {
    component.switchLanguage('es');
    expect(translateService.currentLang).toBe('es');
  });

  it('should update biography when language changes', () => {
    component.player = mockPlayer;
    translateService.use('es');
    expect(component.translatedBiography).toBe('Biografía en español');
  });

  it('should handle error when player not found', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockErrorService = TestBed.inject(PlayerService);
    jest.spyOn(mockErrorService, 'getPlayerById').mockReturnValue(throwError('Player not found'));

    component.loadPlayerDetails('999');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching player details:', 'Player not found');
  });
});
