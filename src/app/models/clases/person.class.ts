import { IPerson } from '../person.interface';

export class Person implements IPerson {
  id: string;
  name: string;
  placeOfBirth: string;
  dateOfBirth: string;
  weight: number;
  height: number;

  constructor(person: IPerson) {
    this.id = person.id;
    this.name = person.name;
    this.placeOfBirth = person.placeOfBirth;
    this.dateOfBirth = person.dateOfBirth;
    this.weight = person.weight;
    this.height = person.height;
  }
}
