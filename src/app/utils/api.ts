import { Tournament, CreateTournament } from "../types/tournament";

export const fetchTournaments = async (): Promise<Tournament[]> => {
    const response = await fetch('https://game-backend-0o62.onrender.com/api/tournaments');
    if (!response.ok) {
      throw new Error('Failed to fetch tournaments');
    }
    return response.json();
  };
  
  export const fetchTournamentById = async (id: number): Promise<Tournament> => {
    const response = await fetch(`https://game-backend-0o62.onrender.com/api/tournaments/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tournament');
    }
    return response.json();
  };

  export const searchTournaments = async (query: string): Promise<Tournament[]> => {
    const response = await fetch(`https://game-backend-0o62.onrender.com/api/tournaments/search?query=${query}`);
    if (!response.ok) {
      throw new Error("Failed to search tournaments");
    }
    return response.json();
  };

  export const createTournament = async (tournament: CreateTournament): Promise<Tournament> => {
    const response = await fetch("https://game-backend-0o62.onrender.com/api/tournaments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tournament),
    });
    if (!response.ok) {
      throw new Error("Failed to create tournament");
    }
    return response.json();
  };