export interface Tournament {
    id: number;
    title: string;
    gameName: string;
    date: string;
    prizePool: number;
    status: "Upcoming" | "Completed";
    description: string;
  }

  export interface CreateTournament {
    title: string;
    gameName: string;
    date: string;
    prizePool: number;
    status: "Upcoming" | "Completed";
    description: string;
  }