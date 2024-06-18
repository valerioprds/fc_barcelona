import { Person } from './person.interface';
import { Honors } from './honors.interface';
import { Stats } from './stats.interface';
import { Biography } from './biography.interface';

export interface Player extends Person {
  position: string;
  image: string;
  honors: Honors;
  biography: Biography;
  stats: Stats;
}
