import UnauthorizedError from '../errors/UnauthorizedError.js';
import { tokenService } from '../service/token.service.js';
async function requireAuth(req, res, next) {
    console.log('requireAuth middleware');
    try {
        // check if authorization header is present
        const authorizationKey = req.headers.authorization;
        if (!authorizationKey) {
            // console.log('headers', req.headers)
            return next(new UnauthorizedError('You are not authorized to access this resource. Error code 1'));
        }
        // access token is sent in the authorization header
        const accessToken = authorizationKey.split(' ')[1];
        if (!accessToken) {
            return next(new UnauthorizedError('You are not authorized to access this resource. Error code 2'));
        }
        // validate access token
        const userData = await tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(new UnauthorizedError('You are not authorized to access this resource. Error code 3'));
        }
        next();
    }
    catch (error) {
        return next(new UnauthorizedError('You are not authorized to access this resource. Error code 4'));
    }
}
export default requireAuth;
//# sourceMappingURL=requireAuth.js.map