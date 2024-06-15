import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.interface';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent implements OnInit {
  player: Player  | undefined;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const playerId = params.get('id');
      if (playerId) {
        this.loadPlayerDetails(playerId);
      }
    });
  }

  loadPlayerDetails(playerId: string): void {
    this.playerService.getPlayerById(playerId).subscribe(player => {
      this.player = player;
    });
  }
}
