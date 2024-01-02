import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import TokenModel from '../mongodb/models/token.model.js';
const { refreshSecret, accessSecret } = config.jwt;
function generateTokens(data) {
    if (!accessSecret)
        throw new Error('JWT_ACCESS_SECRET is not defined');
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET is not defined');
    // console.log('generateTokens, data', data)
    const accessToken = jwt.sign({ data }, accessSecret, {
        expiresIn: '1d',
    });
    const refreshToken = jwt.sign({ data }, refreshSecret, {
        expiresIn: '10d',
    });
    return { accessToken, refreshToken };
}
async function saveToken(identifier, refreshToken) {
    const tokenData = await TokenModel.findOne({ identifier });
    // update refresh token
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    // new refresh token
    const token = await TokenModel.create({ identifier, refreshToken });
    return token;
}
async function removeToken(refreshToken) {
    const result = await TokenModel.deleteOne({ refreshToken });
    return result;
}
async function getToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
}
async function getIdentifier(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData?.identifier || null;
}
async function validateAccessToken(token) {
    if (!accessSecret)
        throw new Error('JWT_ACCESS_SECRET is not defined');
    try {
        const payload = jwt.verify(token, accessSecret);
        return payload;
    }
    catch (error) {
        console.log('validateAccessToken error', error);
        return null;
    }
}
async function validateRefreshToken(token) {
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET is not defined');
    try {
        const payload = jwt.verify(token, refreshSecret);
        return payload;
    }
    catch (error) {
        console.log('validateRefreshToken error', error);
        return null;
    }
}
export const tokenService = {
    generateTokens,
    saveToken,
    removeToken,
    getToken,
    getIdentifier,
    validateAccessToken,
    validateRefreshToken,
};
//# sourceMappingURL=token.service.js.map