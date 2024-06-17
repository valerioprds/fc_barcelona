export interface Player {
  id: string;
  name: string;
  position: string;
  image: string;
  placeOfBirth: string;
  dateOfBirth: string;
  weight: number;
  height: number;
  honors: {
    laLiga: number;
    championsLeague: number;
    copaDelRey: number;
    clubWorldCup: number;
  };
  biography: {
    en: string;
    es: string;
  };  stats: {
    games: number;
    cleanSheets?: number;
    saves?: number;
    goals?: number;
    assists?: number;
    seasons: {
      start: number;
      end: number;
      games: number;
      cleanSheets?: number;
      saves?: number;
      goals?: number;
      assists?: number;
    };
  };

  //  todo modelaje de esta clase de jugador 
}
