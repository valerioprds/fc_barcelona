import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.interface';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent implements OnInit {
  player: Player | undefined;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private translate: TranslateService

  ){
    // Set the default language
    this.translate.setDefaultLang('en');
    // Use the default language
    this.translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playerId = params.get('id');
      if (playerId) {
        this.loadPlayerDetails(playerId);
      }
    });
  }

  loadPlayerDetails(playerId: string): void {
    this.playerService.getPlayerById(playerId).subscribe((player) => {
      this.player = player;
    });
  }
}
