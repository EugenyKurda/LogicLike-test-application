import app from './app';
import { testConnection } from './db/connection';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        const isDbConnected = await testConnection();

        if (!isDbConnected) {
            throw new Error('Couldn\'t connect to the database. Make sure that MySQL is running.');
        }

        console.log('Connection to the database is established');

        app.listen(PORT, () => {
            console.log(`-- The server is running on the port ${PORT}`);
            console.log(`-- API: http://localhost:${PORT}/api`);
        });

    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

startServer();