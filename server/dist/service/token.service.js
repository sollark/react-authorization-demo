import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import TokenDataModel from '../mongodb/models/token.model.js';
const { refreshSecret, accessSecret } = config.jwt;
function generateTokens(payload) {
    if (!accessSecret)
        throw new Error('JWT_ACCESS_SECRET is not defined');
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET is not defined');
    console.log('generateTokens, payload', payload);
    const accessToken = jwt.sign(payload, accessSecret, {
        expiresIn: '10m',
    });
    const refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: '1h',
    });
    return { accessToken, refreshToken };
}
async function saveToken(refreshToken) {
    const oldRefreshToken = await getRefreshToken(refreshToken);
    if (oldRefreshToken) {
        await TokenDataModel.findOneAndDelete({ refreshToken });
    }
    await TokenDataModel.create({ refreshToken });
}
async function removeToken(refreshToken) {
    const result = await TokenDataModel.deleteOne({ refreshToken });
    return result;
}
async function getRefreshToken(refreshToken) {
    const tokenData = await TokenDataModel.findOne({ refreshToken });
    return tokenData?.refreshToken;
}
async function validateAccessToken(token) {
    if (!accessSecret)
        throw new Error('JWT_ACCESS_SECRET is not defined');
    try {
        const payload = jwt.verify(token, accessSecret);
        return payload;
    }
    catch (error) {
        console.log('validateAccessToken error', error.message);
        return null;
    }
}
async function validateRefreshToken(token) {
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET is not defined');
    try {
        const payload = jwt.verify(token, refreshSecret);
        console.log('validateRefreshToken, payload', payload);
        return payload;
    }
    catch (error) {
        console.log('validateRefreshToken error', error.message);
        return null;
    }
}
async function isExpired(token) {
    const payload = await validateRefreshToken(token);
    if (!payload)
        return true;
    const { exp } = payload;
    if (!exp)
        return true;
    const now = Math.floor(Date.now() / 1000);
    if (now > exp)
        return true;
    return false;
}
export const tokenService = {
    generateTokens,
    saveToken,
    removeToken,
    getRefreshToken,
    validateAccessToken,
    validateRefreshToken,
    isExpired,
};
//# sourceMappingURL=token.service.js.map