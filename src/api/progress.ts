import axios from "./axios";

type GenerateProgressOptions = {
  level: number;
  type: string;
  correct: number;
  incorrect: number;
}

export const generateProgressRequest = async (options: GenerateProgressOptions) =>{
  const res = await axios.post(`/progress`, options);
  return res.data
}

