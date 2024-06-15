export interface Player {
  id: string;
  name: string;
  image: string;
  stats: {
    goals: number;
    assists: number;
  };
}
