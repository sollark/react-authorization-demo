import { model, Schema } from 'mongoose';
const TokenDataSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
});
const TokenDataModel = model('TokenData', TokenDataSchema);
export default TokenDataModel;
//# sourceMappingURL=token.model.js.map