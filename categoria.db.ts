import { createPool, Pool } from 'mysql2/promise';
import dbConfig from './dbconfig';
import { Categoria } from './categoria.model';

// Acceso a datos para la entidad Categoria
let pool: Pool | null = null;

function getPool(): Pool {
    if (!pool) {
        pool = createPool({
            ...dbConfig,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    return pool;
}

// Obtiene todas las categorías
export async function getCategoria(): Promise<Categoria[]> {
    const connection = await getPool().getConnection();
    try {
        const [categorias]: any = await connection.query('CALL SP_L_CATEGORIA_01()');
        return categorias[0];
    } finally {
        connection.release();
    }
}

// Obtiene una categoría por ID
export async function getCategoria_x_id(cat_id: number): Promise<Categoria[]> {
    const connection = await getPool().getConnection();
    try {
        const [result]: any = await connection.query('CALL SP_CATEGORIA_X_ID(?)', [cat_id]);
        return result[0];
    } finally {
        connection.release();
    }
}

// Inserta una nueva categoría
export async function insertCategoria(categoria: Categoria): Promise<Categoria[]> {
    if (!categoria.cat_nom) {
        throw new Error('cat_nom is required');
    }
    const connection = await getPool().getConnection();
    try {
        const [result]: any = await connection.query('CALL SP_I_CATEGORIA_01(?, ?)', [categoria.cat_nom, categoria.cat_obs]);
        return result[0];
    } finally {
        connection.release();
    }
}

// Actualiza una categoría existente
export async function updateCategoria(categoria: Categoria): Promise<Categoria[]> {
    if (!categoria.cat_id || !categoria.cat_nom) {
        throw new Error('cat_id and cat_nom are required');
    }
    const connection = await getPool().getConnection();
    try {
        const [result]: any = await connection.query('CALL SP_U_CATEGORIA_01(?, ?, ?)', [categoria.cat_id, categoria.cat_nom, categoria.cat_obs]);
        return result[0];
    } finally {
        connection.release();
    }
}

// Elimina una categoría por ID
export async function deleteCategoria(cat_id: number): Promise<Categoria[] | null> {
    if (!cat_id) {
        throw new Error('cat_id is required');
    }
    const connection = await getPool().getConnection();
    try {
        const [result]: any = await connection.query('CALL SP_D_CATEGORIA_01(?)', [cat_id]);
        return result[0] || null;
    } finally {
        connection.release();
    }
}
