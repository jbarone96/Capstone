export const PORT = 3001;
export const API_URL = process.env.API_URL ? `/${process.env.API_URL}` : '/api';
export const DB_URL = process.env.DB_URL || `mongodb+srv://admin:topeatsKNZ@topeats.cjwmtm7.mongodb.net/?retryWrites=true&w=majority`;
