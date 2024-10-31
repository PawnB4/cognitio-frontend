import { client } from "./client";
import { GenerateProgressOptions, ProgressResponse } from "./types";



export const generateProgressRequest = async (
  progressOptions: GenerateProgressOptions
): Promise<ProgressResponse> => {
  const response = await client.post<ProgressResponse, GenerateProgressOptions>(
    "/progress",
    progressOptions
  );
  return response;
};
