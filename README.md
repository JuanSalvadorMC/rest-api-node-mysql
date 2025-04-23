# 📦 CRUDSQL_NodeJS

**API REST para gestión de categorías** usando **Node.js**, **Express** y **MySQL**.

![API Banner](https://user-images.githubusercontent.com/674621/144755461-aaa0b917-e7ec-4bb3-87d2-78b5c7db1f67.png)  
<sub>📷 Imagen ilustrativa del entorno de desarrollo</sub>

---

## 🚀 Instalación rápida

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd ApiNodeJsMysql
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la conexión a la base de datos en `dbconfig.js`.

4. Inicia el servidor:
   ```bash
   npm start
   ```

---

## 🔌 Endpoints disponibles

| Método | Ruta                    | Descripción                           |
|--------|-------------------------|---------------------------------------|
| GET    | `/api/categoria`        | Lista todas las categorías            |
| GET    | `/api/categoria/:id`    | Obtiene una categoría por ID          |
| POST   | `/api/categoria`        | Crea una nueva categoría              |
| PUT    | `/api/categoria/:id`    | Actualiza una categoría existente     |
| DELETE | `/api/categoria/:id`    | Elimina una categoría y devuelve info |

📫 Puedes probar los endpoints usando **Postman**, **Insomnia** o **curl**.

---

## 🎬 Demo

![API Demo GIF](https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)  
<sub>🎥 Interacción con los endpoints desde Postman</sub>

---

## 📝 Notas adicionales

- ✅ El body parser es ahora **nativo de Express** (no requiere `body-parser`).
- ❌ Se eliminó la dependencia de `mssql`.
- 📂 Los scripts SQL de ejemplo están en: `docs/SQL.sql`.