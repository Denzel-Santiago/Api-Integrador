import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

// Importar rutas de módulos
import rolRoutes from './rol/routes/rolRoutes';
import userRoutes from './User/routes/usersRoutes';
import horarioTrabajoRoutes from './horario_trabajo/routes/horario_trabajo_Routes';
import reporteRoutes from './reporte/routes/reporteRoutes';
import tarifaRoutes from './Tarifa/routes/tarifaRoutes';
import urbanRoutes from './Urban/routes/urbanRoutes';
import viajeRoutes from './Viaje/routes/viajeRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';
//import adminRoutes from './Administrador/routes/AdminRoutes';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de los módulos
//app.use('/api/employee', employeeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/horario_trabajo',horarioTrabajoRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/reporte',reporteRoutes);
app.use('/api/tarifa',tarifaRoutes);
app.use('/api/urban',urbanRoutes);
app.use('/api/viaje',viajeRoutes);
// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
