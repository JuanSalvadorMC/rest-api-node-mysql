"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbocategoria = __importStar(require("./categoria.db"));
const router = (0, express_1.Router)();
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
router.get('/categoria', async (_req, res) => {
    try {
        const result = await dbocategoria.getCategoria();
        res.json(result);
    }
    catch (error) {
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
router.get('/categoria/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await dbocategoria.getCategoria_x_id(id);
        if (result && result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Category not found' });
        }
    }
    catch (error) {
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
router.post('/categoria', async (req, res) => {
    try {
        const categoria = { ...req.body };
        const result = await dbocategoria.insertCategoria(categoria);
        res.status(201).json(result[0]);
    }
    catch (error) {
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
router.put('/categoria/:id', async (req, res) => {
    try {
        const categoria = { ...req.body, cat_id: parseInt(req.params.id, 10) };
        const result = await dbocategoria.updateCategoria(categoria);
        if (result && result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Category not found to update' });
        }
    }
    catch (error) {
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
router.delete('/categoria/:id', async (req, res) => {
    try {
        const cat_id = parseInt(req.params.id, 10);
        const result = await dbocategoria.deleteCategoria(cat_id);
        if (result && result.length > 0) {
            res.json({
                message: 'Category deleted successfully',
                deleted: result[0]
            });
        }
        else {
            res.status(404).json({ message: `Category with id ${cat_id} not found` });
        }
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Error deleting category' });
    }
});
exports.default = router;
