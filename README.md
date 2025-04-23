# CRUDSQL_NodeJS

API REST para gestión de categorías usando Node.js, Express y MySQL.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd ApiNodeJsMysql
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura la base de datos en `dbconfig.js` según tus credenciales.
4. Ejecuta el servidor:
   ```bash
   npm start
   ```

## Endpoints

- `GET /api/categoria` — Lista todas las categorías
- `GET /api/categoria/:id` — Obtiene una categoría por id
- `POST /api/categoria` — Crea una nueva categoría
- `PUT /api/categoria/:id` — Actualiza una categoría existente
- `DELETE /api/categoria/:id` — Elimina una categoría y devuelve el id y nombre de la eliminada

Puedes probar los endpoints con Postman, Insomnia o curl.

## Notas
- El body parser ahora es nativo de Express (no se requiere body-parser).
- El proyecto ya no depende de mssql.
- Los scripts SQL de ejemplo están en `docs/SQL.sql`.