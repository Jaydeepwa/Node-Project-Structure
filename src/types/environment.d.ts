declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      DB_URL: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export { };
