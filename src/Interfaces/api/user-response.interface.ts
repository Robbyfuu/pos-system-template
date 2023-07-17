export interface User {
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    roles: [string];
    updatedAt: string;
    createdAt: string;
    __v: number;
}
export interface UserResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}