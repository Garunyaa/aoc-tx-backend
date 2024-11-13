import BaseConfig from "../config/base-config";
import adminRouter from "../modules/v1/admin/routes";
import userRouter from "../modules/v1/user/routes";
import fileRouter from "../modules/v1/file-upload/routes/fileupload-routes"
import logsRouter from "../modules/v1/log/routes/index"
import basicAuth from 'express-basic-auth';
import { responseHandler } from "../utils/response-handler";
import fs from 'fs'
import path from 'path';
import cors from 'cors';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');
const jsonData = require('../swagger/swagger.json');

export default class RouteServiceProvider extends BaseConfig {

    constructor() {
        super();
        this.loadRoutes();
        this.routeNotFound();
    }

    /**
     * 
     * @param {*} route functions 
     */
    loadRoutes() {
        this.app.use(cors());
        this.app.get('/', (req, res) => {
            res.json({ message: 'Application api working' });
        });


        const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/swagger.json'), 'utf8'));

        // Swagger route
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsonData));
        this.app.use('/api/v1/logs', logsRouter);
        this.app.use('/api/v1/admin', adminRouter);
        this.app.use('/api/v1/user', userRouter);
        this.app.use('/api/v1/file-upload', fileRouter);
        this.app.use('/logs-page', basicAuth({
            users: { [process.env.LOG_USERNAME]: process.env.LOG_PASSWORD },
            challenge: true
        }));
        // Serve logs.html from the 'public' directory
        this.app.get('/logs-page', (req, res) => {
            const publicPath = path.join(__dirname, '../../public');
            res.sendFile(path.join(publicPath, 'logs.html'));
        });
    }

    routeNotFound() {
        this.app.use((req, res, next) => {
            return responseHandler.errorResponse(res, {}, 'Requested route not found', 404);
        });
    }
};