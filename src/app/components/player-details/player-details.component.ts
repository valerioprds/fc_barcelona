import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/classes/player.class';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  player: Player | undefined;
  translatedBiography: string = '';

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private translate: TranslateService,
  ) {
    // Set the default language
    this.translate.setDefaultLang('en');
    // Use the default language
    this.translate.use('en');

    this.translate.onLangChange.subscribe(() => {
      this.updateBiography();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playerId = params.get('id');
      if (playerId) {
        this.loadPlayerDetails(playerId);
      }
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  loadPlayerDetails(playerId: string): void {
    this.playerService.getPlayerById(playerId).subscribe(
      (player) => {
        this.player = player;
        this.updateBiography();
      },
      (error) => {
        console.error('Error fetching player details:', error);
      },
    );
  }

  updateBiography(): void {
    if (this.player) {
      const currentLang = this.translate.currentLang as 'en' | 'es';
      this.translatedBiography =
        this.player.biography[currentLang] || this.player.biography['en'];
    }
  }
}
