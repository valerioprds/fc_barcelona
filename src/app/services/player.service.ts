import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private players = [
    { id: 1, nombre: 'Jugador 1', estadisticas: { puntos: 20, asistencias: 5, rebotes: 10 } },
    { id: 2, nombre: 'Jugador 2', estadisticas: { puntos: 25, asistencias: 7, rebotes: 12 } },
    // Agrega más jugadores aquí
  ];




  constructor() { }




  getPlayers() {
    return this.players;
  }


  getPlayer(id: number) {
    return this.players.find(player => player.id === id);
    
  }
}
