"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoria = getCategoria;
exports.getCategoria_x_id = getCategoria_x_id;
exports.insertCategoria = insertCategoria;
exports.updateCategoria = updateCategoria;
exports.deleteCategoria = deleteCategoria;
const promise_1 = require("mysql2/promise");
const dbconfig_1 = __importDefault(require("./dbconfig"));
async function getCategoria() {
    const connection = await (0, promise_1.createConnection)(dbconfig_1.default);
    try {
        const [categorias] = await connection.execute('CALL SP_L_CATEGORIA_01()');
        return categorias[0];
    }
    finally {
        await connection.end();
    }
}
async function getCategoria_x_id(cat_id) {
    const connection = await (0, promise_1.createConnection)(dbconfig_1.default);
    try {
        const [result] = await connection.execute('CALL SP_CATEGORIA_X_ID(?)', [cat_id]);
        return result[0];
    }
    finally {
        await connection.end();
    }
}
async function insertCategoria(categoria) {
    if (!categoria.cat_nom) {
        throw new Error('cat_nom is required');
    }
    const connection = await (0, promise_1.createConnection)(dbconfig_1.default);
    try {
        const [result] = await connection.execute('CALL SP_I_CATEGORIA_01(?, ?)', [categoria.cat_nom, categoria.cat_obs]);
        return result[0];
    }
    finally {
        await connection.end();
    }
}
async function updateCategoria(categoria) {
    if (!categoria.cat_id || !categoria.cat_nom) {
        throw new Error('cat_id and cat_nom are required');
    }
    const connection = await (0, promise_1.createConnection)(dbconfig_1.default);
    try {
        const [result] = await connection.execute('CALL SP_U_CATEGORIA_01(?, ?, ?)', [categoria.cat_id, categoria.cat_nom, categoria.cat_obs]);
        return result[0];
    }
    finally {
        await connection.end();
    }
}
async function deleteCategoria(cat_id) {
    if (!cat_id) {
        throw new Error('cat_id is required');
    }
    const connection = await (0, promise_1.createConnection)(dbconfig_1.default);
    try {
        const [result] = await connection.execute('CALL SP_D_CATEGORIA_01(?)', [cat_id]);
        return result[0] || null;
    }
    finally {
        await connection.end();
    }
}
