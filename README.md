# CRUD SQL/NodeJS

**REST API for category management** using **Node.js**, **TypeScript** and **MySQL**.

---

## 🚀 Quick Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JuanSalvadorMC/rest-api-node-mysql
   cd ApiNodeJsMysql
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection in `dbconfig.ts`.

4. Build and start the server:
   ```bash
   npm run build
   npm start
   ```
   O para desarrollo:
   ```bash
   npm run dev
   ```

---

## 🔌 Available Endpoints

| Method | Route                  | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/categoria`       | List all categories                  |
| GET    | `/api/categoria/:id`   | Get a category by ID                 |
| POST   | `/api/categoria`       | Create a new category                |
| PUT    | `/api/categoria/:id`   | Update an existing category          |
| DELETE | `/api/categoria/:id`   | Delete a category and return info    |

You can test the endpoints using **Postman**, **Insomnia**, or **curl**.

---

## 📝 Additional Notes

- ✅ Express's native body parser is used (no need for `body-parser`).
- ❌ The `mssql` dependency has been removed.
- 📂 Example SQL scripts are in: `docs/SQL.sql`.
- 🟦 El proyecto está migrado a TypeScript y usa las últimas versiones de Express, CORS y Nodemon.

## Database Setup

1. Create the database and table by running the following script in your MySQL client:

```sql
CREATE DATABASE DBTEST2;
USE DBTEST2;

CREATE TABLE TM_CATEGORIA (
    CAT_ID INT AUTO_INCREMENT PRIMARY KEY,
    CAT_NOM VARCHAR(50) NOT NULL,
    CAT_OBS VARCHAR(150)
);
```

2. Create the stored procedures (SPs):

```sql
-- List all categories
CREATE PROCEDURE SP_L_CATEGORIA_01()
BEGIN
    SELECT * FROM TM_CATEGORIA;
END;

-- Insert a new category
CREATE PROCEDURE SP_I_CATEGORIA_01(
    IN CAT_NOM VARCHAR(50),
    IN CAT_OBS VARCHAR(150)
)
BEGIN
    INSERT INTO TM_CATEGORIA (CAT_NOM, CAT_OBS) VALUES (CAT_NOM, CAT_OBS);
    SELECT * FROM TM_CATEGORIA;
END;

-- Update a category
CREATE PROCEDURE SP_U_CATEGORIA_01(
    IN CAT_ID INT,
    IN CAT_NOM VARCHAR(50),
    IN CAT_OBS VARCHAR(150)
)
BEGIN
    UPDATE TM_CATEGORIA SET CAT_NOM = CAT_NOM, CAT_OBS = CAT_OBS WHERE CAT_ID = CAT_ID;
    SELECT * FROM TM_CATEGORIA;
END;

-- Get a category by ID
CREATE PROCEDURE SP_CATEGORIA_X_ID(
    IN CAT_ID INT
)
BEGIN
    SELECT * FROM TM_CATEGORIA WHERE CAT_ID = CAT_ID;
END;

-- Delete a category by ID
CREATE PROCEDURE SP_D_CATEGORIA_01(
    IN CAT_ID INT
)
BEGIN
    SELECT CAT_ID, CAT_NOM FROM TM_CATEGORIA WHERE CAT_ID = CAT_ID;
    DELETE FROM TM_CATEGORIA WHERE CAT_ID = CAT_ID;
END;
```

> You can find these scripts in `docs/SQL.sql` and run them in your MySQL database before starting the API.

## 📦 Dependencies

- **express**: Minimal and flexible Node.js web application framework.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **mysql2**: MySQL client for Node.js with Promise support.
- **typescript**: TypeScript support for type safety and modern JS features.

### Dev Dependencies

- **nodemon**: Utility that monitors for changes in your source and automatically restarts your server.
- **ts-node**: Run TypeScript files directly.
- **@types/**: Type definitions for TypeScript.

---

## 🗑️ Removed/Obsolete

- The `mssql` and `body-parser` dependencies are no longer required.
- Any SQL scripts or files not referenced above have been removed for clarity and maintenance.

---

Feel free to contribute or open issues if you find any problems!