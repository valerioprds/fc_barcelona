import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PlayerService } from '../../services/player.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Player } from '../../models/player.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let playerService: PlayerService;
  let translateService: TranslateService;
  let router: Router;

  const mockPlayers: Player[] = [
    {
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
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn().mockReturnValue(of(mockPlayers)),
          },
        },
        TranslateService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    playerService = TestBed.inject(PlayerService);
    translateService = TestBed.inject(TranslateService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to English', () => {
    expect(translateService.getDefaultLang()).toBe('en');
  });

  it('should fetch players on init', () => {
    expect(component.players.length).toBe(1);
    expect(component.players).toEqual(mockPlayers);
  });

  it('should switch language', () => {
    component.switchLanguage('es');
    expect(translateService.currentLang).toBe('es');
  });

  it('should navigate to player details', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navigateToPlayer('1');
    expect(navigateSpy).toHaveBeenCalledWith(['player/', '1']);
  });
});
