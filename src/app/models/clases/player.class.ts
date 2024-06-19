import { Biography } from '../biography.interface';
import { Honors } from '../honors.interface';
import { IPerson } from '../person.interface';
import { IPlayer } from '../player.interface';
import { Stats } from '../stats.interface';
import { Person } from './person.class';

export class Player extends Person implements IPlayer {
  position: string;
  image: string;
  honors: Honors;
  biography: Biography;
  stats: Stats;

  // es la estrctura que vamos a crear con el json
  constructor(player: IPlayer, person: IPerson) {
    super(person); // llamamos al constructor de la clase padre Person
    this.position = player.position;
    this.image = player.image;
    this.honors = player.honors;
    this.biography = player.biography;
    this.stats = player.stats;
  }
}
