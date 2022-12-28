import dotenv from 'dotenv';

dotenv.config();

export const backendUrl = process.env.BACKEND_URL;

export const port = process.env.PORT;

export const onlineBackendUrl = 'https://starters.tanguay.eu'; // for GitHub image links, etc.