/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./client";
import { Exercise, GameResponse, GenerateGameOptions } from "./types";


// POST request example
export const generateGameRequest = async (
    gameOptions: GenerateGameOptions
): Promise<Exercise[]> => {
    const response = await client.post<GameResponse, GenerateGameOptions>(
        "/game/generate",
        gameOptions
    );
    console.log(response)
    return response.ejercicios;
};
