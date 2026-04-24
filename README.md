# Access Portal API

Backend robusto construido con **Node.js**, **Express** y **TypeScript**. Se encarga de gestionar las solicitudes de acceso, validar folios mediante un flujo con **n8n** y persistir los datos en **PostgreSQL/MySQL** vía **Sequelize**.

## Tecnologías
* **Runtime:** Node.js + TypeScript
* **Framework:** Express
* **ORM:** Sequelize
* **Validación:** Express-validator
* **Automatización:** Integración con n8n Webhooks

## 🛠️ Instalación y Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Variables de Entorno:**
    Crea un archivo `.env` en la raíz con lo siguiente:
    ```env
    PORT=4000
    DATABASE_URL=postgres://usuario:password@localhost:5432/nombre_db
    N8N_WEBHOOK_URL=[https://tu-instancia.n8n.cloud/webhook/solicitud](https://tu-instancia.n8n.cloud/webhook/solicitud)
    ```

3.  **Scripts disponibles:**
    * `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática (nodemon).
    * `npm run build`: Compila el código TypeScript a JavaScript.

## Endpoints Principales

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/solicitar-acceso` | Crea/Actualiza solicitud y dispara el Webhook a n8n. |
| `GET` | `/api/verificar-estatus/:email` | Polling endpoint para consultar el estado actual. |
| `PATCH` | `/api/solicitudes/actualizar-estatus` | Endpoint seguro para que n8n actualice a 'Aceptado' o 'Rechazado'. |

## Logs de Consola
El backend incluye un sistema de trazabilidad detallado. Podrás monitorear en tiempo real:
* Payloads entrantes de n8n.
* Errores de validación de correo institucional.
* Intentos de duplicidad de folios.
