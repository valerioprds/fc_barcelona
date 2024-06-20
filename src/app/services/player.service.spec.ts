import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Player } from '../models/classes/player.class';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;
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

  beforeEach(() => {
    const routerSpy = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService, { provide: Router, useValue: routerSpy }],
    });

    service = TestBed.inject(PlayerService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch players', () => {
    service.getPlayers().subscribe((players) => {
      expect(players.length).toBe(1);
      expect(players).toEqual(mockPlayers);
    });

    const req = httpMock.expectOne('/assets/players/players.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });

  it('should handle error when fetching players', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    service.getPlayers().subscribe(
      () => fail('should have failed with an error'),
      (error) => {
        expect(error).toBe('Failed to fetch players; please try again later.');
      },
    );

    const req = httpMock.expectOne('/assets/players/players.json');
    req.flush('Error fetching players', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching players:',
      expect.anything(),
    );
  });

  it('should fetch player by id', () => {
    service.getPlayerById('1').subscribe((player) => {
      expect(player).toEqual(mockPlayers[0]);
    });

    const req = httpMock.expectOne('/assets/players/players.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });

  it('should handle error when player not found', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const routerSpy = jest.spyOn(router, 'navigate');

    service.getPlayerById('999').subscribe(
      () => fail('should have failed with an error'),
      (error) => {
        expect(error).toBe('Failed to fetch player; please try again later.');
      },
    );

    const req = httpMock.expectOne('/assets/players/players.json');
    req.flush(mockPlayers);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching player:',
      expect.anything(),
    );
    expect(routerSpy).toHaveBeenCalledWith(['/error']);
  });
});
