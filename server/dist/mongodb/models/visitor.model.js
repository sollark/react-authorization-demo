import { Schema, model } from 'mongoose';
const VisitorSchema = new Schema({
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    paths: { type: [String], default: [] },
    timestamps: { type: [Date], default: [] },
    device: { type: String, default: '' },
});
const VisitorModel = model('Visitor', VisitorSchema);
export default VisitorModel;
//# sourceMappingURL=visitor.model.js.map