import { client } from "./client";
import { Exercise, GenerateGameResponse, GenerateGameOptions } from "./types";


// POST request example
export const generateGameRequest = async (
    gameOptions: GenerateGameOptions
): Promise<Exercise[]> => {
    const response = await client.post<GenerateGameResponse, GenerateGameOptions>(
        "/game/generate",
        gameOptions
    );
    console.log(response)
    return response.ejercicios;
};
