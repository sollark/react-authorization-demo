import { asyncLocalStorage } from '../service/als.service.js';
import { tokenService } from '../service/token.service.js';
async function setupAsyncLocalStorage(req, res, next) {
    const storage = {};
    asyncLocalStorage.run(storage, async () => {
        const alsStore = asyncLocalStorage.getStore();
        if (!alsStore)
            return next();
        // collect user data from token
        const accessToken = getAuthToken(req);
        if (!accessToken)
            return next();
        const tokenData = await validateToken(accessToken);
        if (!tokenData)
            return next();
        const { uuid, companyNumber, employeeNumber } = getUserData(tokenData);
        alsStore.userData = { uuid, companyNumber, employeeNumber };
        // collect request data from cookie
        const publicId = req.cookies['publicId'];
        alsStore.requestData = { publicId };
        next();
    });
}
function getAuthToken(req) {
    return req.headers.authorization?.split(' ')[1];
}
async function validateToken(token) {
    return await tokenService.validateAccessToken(token);
}
function getUserData(tokenData) {
    return tokenData.userData;
}
export default setupAsyncLocalStorage;
//# sourceMappingURL=als.js.map