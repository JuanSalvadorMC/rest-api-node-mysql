import express, { Request, Response } from 'express';
import cors from 'cors';
import * as mysql from 'mysql2/promise';
import dbConfig from './dbconfig';
import categoriaRouter from './categoria.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

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
  apis: [path.join(__dirname, 'categoria.routes.ts')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

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

// Middleware básico
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
}));

// Rutas de la API
app.use('/api', categoriaRouter);

const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Category API started on port: ' + port);
});
