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
const categoria_routes_1 = __importDefault(require("./categoria.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST CRUD Categoría wey',
            version: '1.0.0',
            description: 'xxxxxDocumentación de la API REST CRUD de categorías con Node.js, TypeScript y MySQL',
        },
        servers: [
            {
                url: 'http://localhost:8090',
                description: 'Servidor local'
            }
        ],
        tags: [
            {
                name: 'Categorías',
                description: 'Operaciones relacionadas con categorías'
            }
        ],
        paths: {
            '/api/categoria': {
                get: {
                    tags: ['Categorías'],
                    summary: 'Obtener todas las categorías',
                    description: 'Retorna una lista de todas las categorías x',
                    responses: {
                        '200': {
                            description: 'Lista de categorías',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Categoria'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Categorías'],
                    summary: 'Crear una nueva categoría',
                    description: 'Crea una nueva categoría en el sistema',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['cat_nombre'],
                                    properties: {
                                        cat_nombre: {
                                            type: 'string',
                                            description: 'Nombre de la categoría'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Categoría creada exitosamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Categoria'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/categoria/{id}': {
                get: {
                    tags: ['Categorías'],
                    summary: 'Obtener una categoría por ID',
                    description: 'Retorna una categoría específica por su ID',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer'
                            },
                            description: 'ID de la categoría'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Categoría encontrada',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Categoria'
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: ['Categorías'],
                    summary: 'Actualizar una categoría',
                    description: 'Actualiza una categoría existente por su ID',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer'
                            },
                            description: 'ID de la categoría a actualizar'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['cat_nombre'],
                                    properties: {
                                        cat_nombre: {
                                            type: 'string',
                                            description: 'Nuevo nombre de la categoría'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Categoría actualizada exitosamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Categoria'
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Categorías'],
                    summary: 'Eliminar una categoría',
                    description: 'Elimina una categoría por su ID',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer'
                            },
                            description: 'ID de la categoría a eliminar'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Categoría eliminada exitosamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string'
                                            },
                                            deleted: {
                                                $ref: '#/components/schemas/Categoria'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            schemas: {
                Categoria: {
                    type: 'object',
                    properties: {
                        cat_id: {
                            type: 'integer'
                        },
                        cat_nombre: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    apis: [path_1.default.join(__dirname, 'categoria.routes.ts')],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
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
// Middleware básico
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Configuración de Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
}));
// Rutas de la API
app.use('/api', categoria_routes_1.default);
const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Category API started on port: ' + port);
});
