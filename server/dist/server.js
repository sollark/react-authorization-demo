import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import { config } from './config/config.js';
import { connectMongo } from './mongodb/connect.js';
// import middleware
import setupAsyncLocalStorage from './middleware/als.js';
import { deleteSensitiveData } from './middleware/deleteSensitiveData.js';
import errorHandler from './middleware/errorHandler.js';
// import routes
import { accountRoutes } from './api/account/account.routes.js';
import { authRoutes } from './api/auth/auth.routes.js';
import { employeeRoutes } from './api/employee/employee.routes.js';
// import for __dirname
import { fileURLToPath } from 'url';
import { companyRoutes } from './api/company/company.routes.js';
import { profileRoutes } from './api/profile/profile.routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
// CORS
console.log('cors', config.env);
if (config.env === 'production') {
    console.log('Node env:', config.env);
    app.use(express.static(path.resolve(__dirname, 'public')));
}
else {
    app.use(cors({
        credentials: true,
        origin: config.server.origins,
    }));
}
// app.get('/', (req, res) => {
//   res.send('Server is up!')
// })
// middlewares
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// async local storage
app.all('*', setupAsyncLocalStorage);
// delete sensitive data ('__v', '_id', 'identifier', 'password')
app.use(deleteSensitiveData);
// routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/company', companyRoutes);
// server globals
const publicPath = path.join(__dirname, 'public', 'index.html');
const clientRoute = '/**';
app.get(clientRoute, (req, res, next) => res.sendFile(publicPath));
// 404
app.use(clientRoute, (req, res, next) => {
    const error = new Error(`${req.method} ${req.originalUrl} not found!`);
    next(error);
});
// error handler
app.use(errorHandler);
// start server
server.listen(config.server.port, () => console.log(`Server is up and running on port ${config.server.port}`));
// connect to MongoDB
try {
    await connectMongo();
}
catch (error) {
    process.exit(1);
}
//# sourceMappingURL=server.js.map