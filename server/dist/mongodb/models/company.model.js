import { model, Schema } from 'mongoose';
const CompanySchema = new Schema({
    companyName: { type: String, required: true },
    companyNumber: { type: String, required: true, unique: true },
    departments: [
        { type: Schema.Types.ObjectId, ref: 'Department', default: [] },
    ],
    employees: [{ type: Schema.Types.ObjectId, ref: 'Employee', default: [] }],
});
const CompanyModel = model('Company', CompanySchema);
export default CompanyModel;
//# sourceMappingURL=company.model.js.map