export const generateGame = async (gameNumber: number, difficultyLevel: number, exercisesAmount: number) => {
    const res = await fetch("https://cognitio-back-production.up.railway.app/game/generate/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            game_number: gameNumber,
            difficulty: difficultyLevel,
            number_exercises: exercisesAmount,
        }),
    });
    const data = await res.json();
    return data.ejercicios;
};

export const generateProgress = async (amountCorrect: number, amountIncorrect: number, difficultyLevel: number) => {
    await fetch("https://cognitio-back-production.up.railway.app/progress/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "bearer-token": ""
        },
        body: JSON.stringify({
            level: difficultyLevel,
            type: "syn_ant",
            correct: amountCorrect,
            incorrect: amountIncorrect
        }),
    });
}