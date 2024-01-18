import { config } from '../config/config.js';
import CustomError from '../errors/CustomError.js';
import InternalServerError from '../errors/InternalServerError.js';
import logger from '../service/logger.service.js';
function errorHandler(error, req, res, next) {
    console.log('errorHandler middleware');
    if (config.env === 'development') {
        console.log(error.stack);
    }
    console.log(error.stack);
    logger.error(error.message);
    logger.error(error.stack);
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            errors: error.serializeErrors(),
        });
    }
    // unknown error 500
    const internalServerError = new InternalServerError('Internal Server Error');
    return res.status(internalServerError.statusCode).json({
        errors: internalServerError.serializeErrors(),
    });
}
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map