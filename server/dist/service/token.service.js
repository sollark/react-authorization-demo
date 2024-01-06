import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import TokenDataModel from '../mongodb/models/token.model.js';
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
async function saveToken(uuid, refreshToken) {
    const tokenData = await TokenDataModel.findOne({ uuid });
    // update refresh token
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    // new refresh token
    const token = await TokenDataModel.create({ uuid, refreshToken });
    return token;
}
async function removeToken(refreshToken) {
    const result = await TokenDataModel.deleteOne({ refreshToken });
    return result;
}
async function getTokenData(refreshToken) {
    const tokenData = await TokenDataModel.findOne({ refreshToken });
    return tokenData;
}
async function getUuid(refreshToken) {
    const tokenData = await TokenDataModel.findOne({ refreshToken });
    return tokenData?.uuid || null;
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
        console.log('validateRefreshToken, payload', payload);
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
    getTokenData,
    getUuid,
    validateAccessToken,
    validateRefreshToken,
};
//# sourceMappingURL=token.service.js.map