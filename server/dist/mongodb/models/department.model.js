import { Schema, model } from 'mongoose';
const DepartmentSchema = new Schema({
    departmentName: { type: String, required: true },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        select: false,
        required: true,
    },
    employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
});
const DepartmentModel = model('Department', DepartmentSchema);
export default DepartmentModel;
//# sourceMappingURL=department.model.js.map