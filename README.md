# GuitarLA — Backend API REST

> Servicio web RESTful construido sobre **Node.js**, **Express** y **PostgreSQL**. Actúa como núcleo de datos del ecosistema GuitarLA, exponiendo recursos de guitarras a través de una interfaz HTTP estandarizada.

---

##  Stack del Servidor

| Capa | Tecnología |
|------|-----------|
| Entorno de ejecución | Node.js + TypeScript |
| Framework HTTP | Express.js |
| Acceso a datos | Sequelize ORM |
| Motor de base de datos | PostgreSQL (Render) |
| Política de acceso | CORS habilitado |

---

##  Antes de Comenzar

Asegúrate de contar con lo siguiente:

- **Node.js** v18 o superior instalado en tu máquina.
- **npm** disponible como gestor de paquetes.
- Una instancia de **PostgreSQL** activa, ya sea local o alojada en Render.

---

##  Puesta en Marcha

### 1. Obtener el código

```bash
git clone <url-del-repo>
cd Examen-II-Guitarras-Back
```

### 2. Instalar paquetes

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://usuario:contraseña@host/nombre_db
```

> Base de datos en **Render**, ve al dashboard y copia el valor de **External Database URL**.

### 4. Preparar la base de datos

Ejecuta el siguiente script SQL para crear la tabla necesaria:

```sql
CREATE TABLE guitarra (
    id          SERIAL        PRIMARY KEY,
    nombre      VARCHAR(100)  NOT NULL,
    descripcion TEXT          NOT NULL,
    precio      INTEGER       NOT NULL,
    img         VARCHAR(255)  NOT NULL
);
```

### 5. Iniciar el servidor

```bash
npm run dev
```

 El servidor quedará escuchando en: `http://localhost:4000`

---

## Mapa de Endpoints

La API expone los siguientes endpoints desde la ruta `(http://localhost:4000/api/guitarras)`:

| Verbo HTTP | Ruta | Acción |
|-----------|------|--------|
| `GET` | `/api/guitarras` | Listar todas las guitarras |
| `GET` | `/api/guitarras/:id` | Consultar una guitarra por ID |
| `POST` | `/api/guitarras` | Registrar una nueva guitarra |
| `PUT` | `/api/guitarras/:id` | Modificar una guitarra existente |
| `DELETE` | `/api/guitarras/:id` | Dar de baja una guitarra |

### Body para insertar guitarras en la base de datos.

```json
{
  "nombre": "Hazel",
  "descripcion": "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.",
  "precio": 379,
  "img": "guitarra_12"
}
```


---

> Este servicio fue diseñado para integrarse directamente con el frontend **GuitarLA React**, aunque puede consumirse desde cualquier cliente HTTP.
"# GATEKEEPER-SYSTEM-Back" 
