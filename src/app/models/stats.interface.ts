export interface Stats {
  games: number;
  cleanSheets?: number;
  saves?: number;
  goals?: number;
  assists?: number;
  seasons: SeasonStats[];
}
export interface SeasonStats {
  start: number;
  end: number;
  games: number;
  cleanSheets?: number;
  saves?: number;
  goals?: number;
  assists?: number;
}
