import { client } from "./client";
import { GenerateProgressOptions, GenerateProgressResponse } from "./types";



export const generateProgressRequest = async (
  progressOptions: GenerateProgressOptions
): Promise<GenerateProgressResponse> => {
  const response = await client.post<GenerateProgressResponse, GenerateProgressOptions>(
    "/progress",
    progressOptions
  );
  return response;
};
