export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            DATABASE_URL: string;
            SHADOW_DATABASE_URL?: string;
            TOKEN_SECRET: string;
            JWT_EXPIRE: string;
        }
    }
}
