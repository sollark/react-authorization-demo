import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import BadRequestError from '../../errors/BadRequestError.js';
import UnauthorizedError from '../../errors/UnauthorizedError.js';
import authModel from '../../mongodb/models/auth.model.js';
import logger from '../../service/logger.service.js';
import { tokenService } from '../../service/token.service.js';
import { accountService } from '../account/account.service.js';
import { profileService } from '../profile/profile.service.js';
async function registration(credentials) {
    const { email, password } = credentials;
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // create new authentication
    const uuid = uuidv4();
    const auth = await authModel.create({ uuid, email, password: hashPassword });
    logger.info(`authService - New authentication created for email: ${email}`);
    // generate tokens
    const { accessToken, refreshToken } = await generateTokens(auth.uuid);
    // save refresh token to db
    await tokenService.saveToken(uuid, refreshToken);
    // create new profile and new account
    const profile = await profileService.createBlankProfile();
    if (!profile)
        throw new BadRequestError('Could not create profile');
    const account = await accountService.createAccount(uuid, profile._id);
    if (!account)
        throw new BadRequestError('Could not create account');
    return { accessToken, refreshToken };
}
async function signIn(uuid) {
    // generate tokens
    const tokens = await generateTokens(uuid);
    const { refreshToken } = tokens;
    // save refresh token to db
    await tokenService.saveToken(uuid, refreshToken);
    logger.info(`authService - user signed in: ${uuid}`);
    return tokens;
}
const signOut = async (refreshToken) => {
    const result = await tokenService.removeToken(refreshToken);
    logger.info(`authService - user signed out`, result);
    return result;
};
const refresh = async (refreshToken) => {
    if (!refreshToken)
        throw new UnauthorizedError('Refresh token is required');
    const payload = await tokenService.validateRefreshToken(refreshToken);
    const tokenData = await tokenService.getTokenData(refreshToken);
    if (!payload || !tokenData)
        return null;
    // generate tokens
    const tokens = tokenService.generateTokens(payload.data);
    // save refresh token to db
    await tokenService.saveToken(tokenData.uuid, tokens.refreshToken);
    return { ...tokens };
};
async function isEmailExists(email) {
    const existingAuthUser = await authModel.findOne({ email });
    return existingAuthUser ? true : false;
}
async function getUuid(email, password) {
    const result = await authModel.findOne({ email }).select('+password');
    if (!result)
        return null;
    const hashPassword = result.password;
    const isPasswordValid = await bcrypt.compare(password, hashPassword);
    return isPasswordValid ? result.uuid : null;
}
export const authService = {
    registration,
    signIn,
    signOut,
    refresh,
    isEmailExists,
    getUuid,
};
async function generateTokens(uuid) {
    return tokenService.generateTokens(uuid);
}
//# sourceMappingURL=auth.service.js.map