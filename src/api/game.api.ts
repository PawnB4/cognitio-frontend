import axios from "./axios";

type GenerateGameOptions = {
    game_number: number;
    difficulty: number;
    number_excercises: number;
}

export const generateGameRequest = async (options: GenerateGameOptions) =>{
    const res = await axios.post(`/game/generate`, options);
    return res.data.ejercicios
}

