import express, { Request, Response } from 'express';
import cors from 'cors';
import * as mysql from 'mysql2/promise';
import dbConfig from './dbconfig';
import * as dbocategoria from './dbcategoria';

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
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

// Get all categories
router.get('/categoria', async (_req: Request, res: Response) => {
    try {
        const result = await dbocategoria.getCategoria();
        res.json(result);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get category by id
router.get('/categoria/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await dbocategoria.getCategoria_x_id(id);
        if (result && result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error getting category by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create new category
router.post('/categoria', async (req: Request, res: Response) => {
    try {
        const categoria = { ...req.body };
        const result = await dbocategoria.insertCategoria(categoria);
        res.status(201).json(result[0]);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category' });
    }
});

// Update category
router.put('/categoria/:id', async (req: Request, res: Response) => {
    try {
        const categoria = { ...req.body, cat_id: parseInt(req.params.id, 10) };
        const result = await dbocategoria.updateCategoria(categoria);
        if (result && result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Category not found to update' });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category' });
    }
});

// Delete category
router.delete('/categoria/:id', async (req: Request, res: Response) => {
    try {
        const cat_id = parseInt(req.params.id, 10);
        const result = await dbocategoria.deleteCategoria(cat_id);
        if (result && result.length > 0) {
            res.json({
                message: 'Category deleted successfully',
                deleted: result[0]
            });
        } else {
            res.status(404).json({ message: `Category with id ${cat_id} not found` });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Error deleting category' });
    }
});

const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Category API started on port: ' + port);
});
