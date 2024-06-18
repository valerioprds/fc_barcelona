import { Component, Inject, Input } from '@angular/core';
import { Player } from '../../models/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playercard',
  templateUrl: './playercard.component.html',
  styleUrl: './playercard.component.scss',
})
export class PlayercardComponent {
  @Input() player!: Player;
  constructor(private router: Router) {}

  loading: boolean = false;

  onViewStats() {
    this.loading = true;

    // Simulate an async operation, such as loading data
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/player', this.player.id]);
    }, 2000); // Simulating a 2-second delay
  }
}
