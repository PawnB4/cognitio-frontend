/* eslint-disable @typescript-eslint/no-explicit-any */
import {client} from "./client";

type GenerateGameOptions = {
    game_number: number;
    difficulty: number;
    number_excercises: number;
}

type GameResponse = {
    ejercicios: any[];
};

// POST request example
export const generateGameRequest = async (gameOptions: GenerateGameOptions): Promise<GameResponse> => {
    const res = await client.post<GameResponse>("/game/generate", gameOptions);
    console.log(res)
    return res.ejercicios;
};


