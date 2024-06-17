import { Component, Input } from '@angular/core';
import { Player } from '../../models/player.interface';

@Component({
  selector: 'app-playercard',
  templateUrl: './playercard.component.html',
  styleUrl: './playercard.component.scss'
})
export class PlayercardComponent {

  @Input() player!: Player;

}
