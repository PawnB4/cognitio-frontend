// Generate game

export interface GenerateGameOptions {
    difficulty: number;
    game_number: number;
    number_excercises: number;
}

// Game-specific exercise types
export interface SynonymAntonymExercise{
    palabra: string;
    sinonimos: string[];
    antonimos: string[];
}

export interface WhoWasItExercise{
    texto: string;
    pregunta: string;
    opciones_correctas: string[];
    opciones_incorrectas: string[];
}

export interface ReadAndConcludeExercise{
    texto: string;
    pregunta: string;
    opciones_correctas: string[];
    opciones_incorrectas: string[];
}

// Union type for all possible exercises
export type Exercise =
    | SynonymAntonymExercise
    | ReadAndConcludeExercise
    | WhoWasItExercise;

export interface GameResponse {
    ejercicios: Exercise[];
}

// Generate progress

export interface GenerateProgressOptions {
    level: number;
    type: string;
    correct: number;
    incorrect: number;
}

export interface ProgressResponse {
    level: number;
    type: string;
    id: number;
    completed_at: string;
    correct: number;
    incorrect: number;
}


