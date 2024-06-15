export interface Player {
  id: string;
  name: string;
  image: string;
  position: string;
  stats: {
    games?: number;
    cleanSheets?: number;
    saves?: number;
    seasons?: {
      start?: number;
      end?: number;
      games?: number;
      cleanSheets?: number;
      saves?: number;
    };
  };
}
