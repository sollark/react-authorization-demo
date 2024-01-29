import { Schema, model } from 'mongoose';
export const ACCOUNT_STATUS = {
    incomplete: 'incomplete',
    pending: 'pending',
    active: 'active',
    inactive: 'inactive',
    deleted: 'deleted',
};
export const USER_ROLE = {
    guest: 'guest',
    employee: 'employee',
    manager: 'manager',
    supervisor: 'supervisor',
    admin: 'admin',
};
const AccountSchema = new Schema({
    uuid: { type: String, unique: true },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(ACCOUNT_STATUS),
        default: ACCOUNT_STATUS.pending,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.employee,
        required: true,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    },
});
const accountModel = model('Account', AccountSchema);
export default accountModel;
// account population
// .populate<{ role: Role }>('role')
// .populate<{ profile: Profile }>('profile')
// .populate<{ employee: Employee }>({
//   path: 'employee',
//   populate: [
//     {
//       path: 'company',
//       populate: [{ path: 'departments' }, { path: 'employees' }],
//     },
//     {
//       path: 'department',
//       populate: [{ path: 'company' }, { path: 'employees' }],
//     },
//     { path: 'profile' },
//     { path: 'supervisor' },
//     { path: 'subordinates' },
//   ],
// })
// .populate<{ status: Status }>('status')
// .lean()
// .exec()
//# sourceMappingURL=account.model.js.map