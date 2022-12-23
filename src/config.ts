import dotenv from 'dotenv';

dotenv.config();

export const backendUrl = process.env.BACKEND_URL;

export const port = process.env.PORT;