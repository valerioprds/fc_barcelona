import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Player } from '../models/player.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private jsonUrl = '/assets/players/players.json';

  constructor(private http: HttpClient, private router: Router) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.jsonUrl);
  }

  //todo controlador de errores try catch console log throw error



  getPlayerById(id: string): Observable<Player> {
    return this.http.get<Player[]>(this.jsonUrl).pipe(
      map((players) => {
        const player = players.find((player) => player.id === id);
        if (!player) {
          throw new Error('Player not found');
        }
        return player as Player;
      }),
      catchError((error) => {
        console.error('Error fetching player:', error);
        // Redirigir a la página de error
        this.router.navigate(['/error']);
        // Emitir un observable de error con un mensaje personalizado
        return throwError('Failed to fetch player; please try again later.');
      })
    );
  }
}
