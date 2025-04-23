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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql = __importStar(require("mysql2/promise"));
const dbconfig_1 = __importDefault(require("./dbconfig"));
const dbocategoria = __importStar(require("./dbcategoria"));
// Test DB connection on startup
(async () => {
    try {
        const connection = await mysql.createConnection(dbconfig_1.default);
        console.log('Database connection successful');
        await connection.end();
    }
    catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
})();
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', router);
// Get all categories
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
// Get category by id
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
// Create new category
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
// Update category
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
// Delete category
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
const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Category API started on port: ' + port);
});
