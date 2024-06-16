import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayerService } from './player.service';
import { Player } from '../models/player.interface';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;

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
    // Add more mock players if necessary
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService],
    });

    service = TestBed.inject(PlayerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all players', () => {
    service.getPlayers().subscribe((players) => {
      expect(players.length).toBe(1);
      expect(players).toEqual(mockPlayers);
    });

    const req = httpMock.expectOne('/assets/players/players.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });

  it('should retrieve a player by id', () => {
    service.getPlayerById('1').subscribe((player) => {
      expect(player).toEqual(mockPlayers[0]);
    });

    const req = httpMock.expectOne('/assets/players/players.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });

  it('should return undefined for a non-existent player id', () => {
    service.getPlayerById('2').subscribe((player) => {
      expect(player).toBeUndefined();
    });

    const req = httpMock.expectOne('/assets/players/players.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });
});
