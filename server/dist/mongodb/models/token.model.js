import { model, Schema, Types } from 'mongoose';
const RefreshTokenSchema = new Schema({
    identifier: { type: Types.ObjectId, ref: 'Auth', required: true },
    refreshToken: { type: String, required: true, unique: true },
});
const RefreshToken = model('RefreshToken', RefreshTokenSchema);
export default RefreshToken;
//# sourceMappingURL=token.model.js.map