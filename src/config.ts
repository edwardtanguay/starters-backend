import dotenv from 'dotenv';

dotenv.config();

export const fullBackendUrl = process.env.BASE_URL + ':' + process.env.PORT;

export const port = process.env.PORT;