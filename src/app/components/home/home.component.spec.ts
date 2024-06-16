import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let playerServiceMock: any;
  let routerMock: any;
  let translateServiceMock: any;

  const mockPlayers: Player[] = [
    {
      id: '1',
      name: 'Player 1',
      position: 'Goalkeeper',
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
    },
  ];

  beforeEach(() => {
    playerServiceMock = {
      getPlayers: jest.fn().mockReturnValue(of(mockPlayers)),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    translateServiceMock = {
      setDefaultLang: jest.fn(),
      use: jest.fn(),
      currentLang: 'en',
      onLangChange: of({ lang: 'en' }),
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TranslateModule.forRoot()], // Import TranslateModule
      providers: [
        { provide: PlayerService, useValue: playerServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default language to "en" on initialization', () => {
    component.ngOnInit();
    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
  });

  it('should load players on init', () => {
    component.ngOnInit();
    expect(playerServiceMock.getPlayers).toHaveBeenCalled();
    expect(component.players).toEqual(mockPlayers);
  });

  it('should navigate to player details', () => {
    const playerId = '1';
    component.navigateToPlayer(playerId);
    expect(routerMock.navigate).toHaveBeenCalledWith(['player/', playerId]);
  });

  it('should switch language', () => {
    const language = 'es';
    component.switchLanguage(language);
    expect(translateServiceMock.use).toHaveBeenCalledWith(language);
  });
});
