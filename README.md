# 📦 CRUD SQL/NodeJS

**API REST para gestión de categorías** usando **Node.js** y **MySQL**.


---

## 🚀 Instalación rápida

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanSalvadorMC/rest-api-node-mysql
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

## 📝 Notas adicionales

- ✅ El body parser es ahora **nativo de Express** (no requiere `body-parser`).
- ❌ Se eliminó la dependencia de `mssql`.
- 📂 Los scripts SQL de ejemplo están en: `docs/SQL.sql`.

## Configuración de la Base de Datos

1. Crea la base de datos y la tabla ejecutando el siguiente script en tu gestor de MySQL:

```sql
CREATE DATABASE DBTEST2;
USE DBTEST2;

CREATE TABLE TM_CATEGORIA (
    CAT_ID INT AUTO_INCREMENT PRIMARY KEY,
    CAT_NOM VARCHAR(50) NOT NULL,
    CAT_OBS VARCHAR(150)
);
```

2. Crea los procedimientos almacenados (SPs):

```sql
-- Listar todas las categorías
CREATE PROCEDURE SP_L_CATEGORIA_01()
BEGIN
    SELECT * FROM TM_CATEGORIA;
END;

-- Insertar una nueva categoría
CREATE PROCEDURE SP_I_CATEGORIA_01(
    IN CAT_NOM VARCHAR(50),
    IN CAT_OBS VARCHAR(150)
)
BEGIN
    INSERT INTO TM_CATEGORIA (CAT_NOM, CAT_OBS) VALUES (CAT_NOM, CAT_OBS);
    SELECT * FROM TM_CATEGORIA;
END;

-- Actualizar una categoría
CREATE PROCEDURE SP_U_CATEGORIA_01(
    IN CAT_ID INT,
    IN CAT_NOM VARCHAR(50),
    IN CAT_OBS VARCHAR(150)
)
BEGIN
    UPDATE TM_CATEGORIA SET CAT_NOM = CAT_NOM, CAT_OBS = CAT_OBS WHERE CAT_ID = CAT_ID;
    SELECT * FROM TM_CATEGORIA;
END;

-- Obtener una categoría por ID
CREATE PROCEDURE SP_CATEGORIA_X_ID(
    IN CAT_ID INT
)
BEGIN
    SELECT * FROM TM_CATEGORIA WHERE CAT_ID = CAT_ID;
END;

-- Eliminar una categoría por ID
CREATE PROCEDURE SP_D_CATEGORIA_01(
    IN CAT_ID INT
)
BEGIN
    SELECT CAT_ID, CAT_NOM FROM TM_CATEGORIA WHERE CAT_ID = CAT_ID;
    DELETE FROM TM_CATEGORIA WHERE CAT_ID = CAT_ID;
END;
```

## Dependencias y Descripción

```
"dependencies": {
    "body-parser": "^1.19.0",

    Los desarrolladores quienes implementan servidores, 
    requieren frecuentemente accesar a la 
    información del cuerpo de dicha petición.

    "cors": "2.8.1",

    Es un mecanismo que utiliza cabeceras HTTP adicionales para permitir 
    que un user agent obtenga permiso para acceder a recursos seleccionados 
    desde un servidor, en un origen distinto (dominio) al que pertenece.

    "express": "^4.17.1",

    Espress.js, según sus creadores, es un framework de desarrollo de aplicaciones 
    web minimalista y flexible para Node.js". Está inspirado en Sinatra, 
    además es robusto, rápido, flexible y muy simple. Entre otras características, 
    ofrece Router de URL (Get, Post, Put …), 
    facilidades para motores de plantillas (Jade, EJS, JinJS …), 
    Middeleware via Connect y un buen test coverage

    "mssql": "^6.2.1"

    Para SQL SERVER
},
"devDependencies": {
    "nodemon": "^2.0.4"

    Nodemon es una utilidad que monitorea los cambios en el código fuente que se esta 
    desarrollando y automáticamente re inicia el servidor.
},
```