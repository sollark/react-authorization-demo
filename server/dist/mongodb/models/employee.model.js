import { Schema, model } from 'mongoose';
export const EMPLOYEE_STATUS = {
    unregistered: 'unregistered',
    registered: 'registered',
};
const EmployeeSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
    employeeNumber: { type: String },
    position: { type: String },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    employeeStatus: {
        type: String,
        enum: Object.values(EMPLOYEE_STATUS),
        default: EMPLOYEE_STATUS.unregistered,
        required: true,
        immutable: true,
    },
});
// it cant be inside EmployeeSchema because it will cause circular dependency, so it has to be defined outside
EmployeeSchema.add({
    supervisor: EmployeeSchema,
    subordinates: [EmployeeSchema],
});
const EmployeeModel = model('Employee', EmployeeSchema);
export default EmployeeModel;
//# sourceMappingURL=employee.model.js.map