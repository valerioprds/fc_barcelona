import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Player } from '../models/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {


  private jsonUrl = '/assets/players/players.json';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.jsonUrl);
  }

  //todo controlador de errores try catch console log throw error

  getPlayerById(id: string): Observable<Player> {
    return this.http.get<Player[]>(this.jsonUrl).pipe(
      map(players => players.find(player => player.id === id) as Player)
    );
  }

  //
}
