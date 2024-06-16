import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private translate: TranslateService
  ) {
    // Set the default language
    this.translate.setDefaultLang('en');
    // Use the default language
    this.translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  navigateToPlayer(playerId: string): void {
    this.router.navigate(['player/', playerId]);
  }
}
