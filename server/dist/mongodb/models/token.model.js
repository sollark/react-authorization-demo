import { model, Schema } from 'mongoose';
const TokenDataSchema = new Schema({
    refreshToken: { type: String, required: true, unique: true },
}, { timestamps: true });
const TokenDataModel = model('TokenData', TokenDataSchema);
export default TokenDataModel;
//# sourceMappingURL=token.model.js.map