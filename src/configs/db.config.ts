import { registerAs } from "@nestjs/config";

export default registerAs(
    'db',
    (): Record<string, any> => ({
        database: process.env.POSTGRES_DB || 'devdb',
        user: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'admin1234',
        port: process.env.POSTGRES_PORT || '5432',
        host: process.env.POSTGRES_HOST || 'localhost',
    })
);