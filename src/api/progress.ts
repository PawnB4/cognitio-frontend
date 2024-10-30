import {client} from "./client";

type GenerateProgressOptions = {
  level: number;
  type: string;
  correct: number;
  incorrect: number;
}

export const generateProgressRequest = async (options: GenerateProgressOptions) =>{
  // const res = await client.post(`/progress`, options);
  // return res.
}

