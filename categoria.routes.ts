import { Router, Request, Response } from 'express';
import * as dbocategoria from './categoria.db';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         cat_id:
 *           type: integer
 *         cat_nombre:
 *           type: string
 */

/**
 * @swagger
 * /api/categoria:
 *   get:
 *     tags: [Categoríasx]
 *     summary: Obtener todas las categorías d
 *     description: Retorna una lista de todas las categoríasx
 *     responses:
 *       200:
 *         description: Lista de categorías x
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error del servidor
 */
router.get('/categoria', async (_req: Request, res: Response) => {
    try {
        const result = await dbocategoria.getCategoria();
        res.json(result);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/categoria/{id}:
 *   get:
 *     tags: [Categorías]
 *     summary: Obtener una categoría por ID
 *     description: Retorna una categoría específica por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
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

/**
 * @swagger
 * /api/categoria:
 *   post:
 *     tags: [Categorías]
 *     summary: Crear una nueva categoría
 *     description: Crea una nueva categoría en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cat_nombre
 *             properties:
 *               cat_nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error del servidor
 */
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

/**
 * @swagger
 * /api/categoria/{id}:
 *   put:
 *     tags: [Categorías]
 *     summary: Actualizar una categoría
 *     description: Actualiza una categoría existente por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cat_nombre
 *             properties:
 *               cat_nombre:
 *                 type: string
 *                 description: Nuevo nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
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

/**
 * @swagger
 * /api/categoria/{id}:
 *   delete:
 *     tags: [Categorías]
 *     summary: Eliminar una categoría
 *     description: Elimina una categoría por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deleted:
 *                   $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
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

export default router;
