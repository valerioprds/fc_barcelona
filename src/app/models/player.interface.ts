import { IPerson } from './person.interface';
import { Honors } from './honors.interface';
import { Stats } from './stats.interface';
import { Biography } from './biography.interface';

export interface IPlayer extends IPerson {
  position: string;
  image: string;
  honors: Honors;
  biography: Biography;
  stats: Stats;
}
