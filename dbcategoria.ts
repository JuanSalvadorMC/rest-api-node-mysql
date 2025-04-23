import { Connection, createConnection } from 'mysql2/promise';
import dbConfig from './dbconfig';

export interface Categoria {
    cat_id?: number;
    cat_nom: string;
    cat_obs?: string;
}

export async function getCategoria(): Promise<Categoria[]> {
    const connection = await createConnection(dbConfig);
    try {
        const [categorias]: any = await connection.execute('CALL SP_L_CATEGORIA_01()');
        return categorias[0];
    } finally {
        await connection.end();
    }
}

export async function getCategoria_x_id(cat_id: number): Promise<Categoria[]> {
    const connection = await createConnection(dbConfig);
    try {
        const [result]: any = await connection.execute('CALL SP_CATEGORIA_X_ID(?)', [cat_id]);
        return result[0];
    } finally {
        await connection.end();
    }
}

export async function insertCategoria(categoria: Categoria): Promise<Categoria[]> {
    if (!categoria.cat_nom) {
        throw new Error('cat_nom is required');
    }
    const connection = await createConnection(dbConfig);
    try {
        const [result]: any = await connection.execute('CALL SP_I_CATEGORIA_01(?, ?)', [categoria.cat_nom, categoria.cat_obs]);
        return result[0];
    } finally {
        await connection.end();
    }
}

export async function updateCategoria(categoria: Categoria): Promise<Categoria[]> {
    if (!categoria.cat_id || !categoria.cat_nom) {
        throw new Error('cat_id and cat_nom are required');
    }
    const connection = await createConnection(dbConfig);
    try {
        const [result]: any = await connection.execute('CALL SP_U_CATEGORIA_01(?, ?, ?)', [categoria.cat_id, categoria.cat_nom, categoria.cat_obs]);
        return result[0];
    } finally {
        await connection.end();
    }
}

export async function deleteCategoria(cat_id: number): Promise<Categoria[] | null> {
    if (!cat_id) {
        throw new Error('cat_id is required');
    }
    const connection = await createConnection(dbConfig);
    try {
        const [result]: any = await connection.execute('CALL SP_D_CATEGORIA_01(?)', [cat_id]);
        return result[0] || null;
    } finally {
        await connection.end();
    }
}
