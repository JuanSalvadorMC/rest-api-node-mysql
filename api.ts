import express, { Request, Response } from 'express';
import cors from 'cors';
import * as mysql from 'mysql2/promise';
import dbConfig from './dbconfig';
import categoriaRouter from './categoria.routes';

// Test DB connection on startup
(async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Database connection successful');
        await connection.end();
    } catch (error: any) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
})();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', categoriaRouter);

const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Category API started on port: ' + port);
});
