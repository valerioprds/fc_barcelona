import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PlayerDetailsComponent } from './player-details.component';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.interface';

describe('PlayerDetailsComponent', () => {
  let component: PlayerDetailsComponent;
  let fixture: ComponentFixture<PlayerDetailsComponent>;
  let playerServiceMock: any;
  let translateServiceMock: any;
  let activatedRouteMock: any;

  const mockPlayer: Player = {
    id: '1',
    name: 'Player 1',
    position:  'Goalkeeper', 
    image: 'player1.jpg',
    placeOfBirth: 'City 1',
    dateOfBirth: '1990-01-01',
    weight: 80,
    height: 180,
    biography: { en: 'Biography 1', es: 'Biografía 1' },
    stats: {
      games: 100,
      cleanSheets: 50,
      saves: 200,
      seasons: {
        start: 2010,
        end: 2020,
        games: 100,
        cleanSheets: 50,
        saves: 200,
      },
    },
    honors: {
      laLiga: 1,
      championsLeague: 1,
      copaDelRey: 1,
      clubWorldCup: 1,
    },
  };

  beforeEach(() => {
    playerServiceMock = {
      getPlayerById: jest.fn().mockReturnValue(of(mockPlayer))
    };

    translateServiceMock = {
      setDefaultLang: jest.fn(),
      use: jest.fn(),
      currentLang: 'en',
      onLangChange: of({ lang: 'en' })
    };

    activatedRouteMock = {
      paramMap: of({
        get: jest.fn().mockReturnValue('1')
      })
    };

    TestBed.configureTestingModule({
      declarations: [PlayerDetailsComponent],
      providers: [
        { provide: PlayerService, useValue: playerServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load player details on init', () => {
    component.ngOnInit();
    expect(playerServiceMock.getPlayerById).toHaveBeenCalledWith('1');
    expect(component.player).toEqual(mockPlayer);
  });

  it('should update biography on language change', () => {
    component.ngOnInit();
    translateServiceMock.currentLang = 'es';
    component.updateBiography();
    expect(component.translatedBiography).toBe(mockPlayer.biography.es);
  });

  it('should switch language', () => {
    component.switchLanguage('es');
    expect(translateServiceMock.use).toHaveBeenCalledWith('es');
  });
});
