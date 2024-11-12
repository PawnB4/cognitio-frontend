import { client } from "./client";
import { SignupUserOptions, SignupUserResponse, LoginResponse, LoginUserOptions } from "./types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from 'js-cookie'

export const signupUserRequest = async (
    signupUserOptions: SignupUserOptions
): Promise<SignupUserResponse> => {
    const response = await client.post<SignupUserResponse, SignupUserOptions>(
        "/user/register",
        signupUserOptions
    );
    return response;
};

export const loginUserRequest = async (
    loginUserOptions: LoginUserOptions
): Promise<LoginResponse> => {
    const response = await client.post<LoginResponse, LoginUserOptions>(
        "/user/login",
        loginUserOptions
    );
    return response;
};

export const getUserRequest = async (): Promise<SignupUserResponse> => {
    const accessToken = Cookies.get("access_token")
    const headers = [{ key: "bearer-token", value: accessToken }];
    const response = await client.get<SignupUserResponse>(
        "/user/token/me",headers
    );
    return response;
};