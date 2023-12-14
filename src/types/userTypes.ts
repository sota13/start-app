export interface UserDetail{
    id: number;
    email: string;
    role?: "USER" | "ADMIN" | undefined;
    isVerfied?: boolean | undefined;
    refreshToken?: string | null | undefined;
    profile: {
        userId: number;
        id: number;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        fullName?: string | null | undefined;
        bio?: string | null | undefined;
        imageUrl?:string | undefined
    }
}