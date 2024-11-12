// Games
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

export interface GenerateGameResponse {
    ejercicios: Exercise[];
}

// Progress

export interface GenerateProgressOptions {
    level: number;
    type: string;
    correct: number;
    incorrect: number;
}

export interface GenerateProgressResponse {
    level: number;
    type: string;
    id: number;
    completed_at: string;
    correct: number;
    incorrect: number;
}


// User / auth

export interface SignupUserOptions {
    username: string;
    email: string;
    image_url: string;
    password: string;
}

export interface SignupUserResponse {
    id: number;
    username: string;
    email: string;
    image_url: string;
    is_active: boolean;
}


export interface LoginUserOptions {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

