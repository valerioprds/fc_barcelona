import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  players: any[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

  navigateToPlayer(playerId: string): void {
    this.router.navigate(['/player', playerId]);
  }
}
