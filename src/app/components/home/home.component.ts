import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from './../../models/clases/player.class';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private translate: TranslateService,
  ) {
    // Set the default language
    this.translate.setDefaultLang('en');
    // Use the default language
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  navigateToPlayer(playerId: string): void {
    this.router.navigate(['player/', playerId]);
  }
}
