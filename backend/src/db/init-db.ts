import { pool } from './connection';
import fs from 'fs';
import path from 'path';

const initDB = async() => {
    try {
        await pool.execute('DROP TABLE IF EXISTS votes');
        await pool.execute('DROP TABLE IF EXISTS ideas');
        console.log('Old tables have been deleted');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
        const schemaQueries = schemaSQL.split(';').filter(query => query.trim());

        for (const query of schemaQueries) {
            if (query.trim()) {
                await pool.execute(query);
            }
        }

        console.log('The database schema was created anew');
        const seedPath = path.join(__dirname, 'seed.sql');
        const seedSQL = fs.readFileSync(seedPath, 'utf8');
        const seedQueries = seedSQL.split(';').filter(query => query.trim());

        for (const query of seedQueries) {
            if (query.trim()) {
                await pool.execute(query);
            }
        }

        console.log('Test data added');
        console.log('The database has been completely redesigned!');

    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
};

initDB();