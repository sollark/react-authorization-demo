import BadRequestError from '../../errors/BadRequestError.js';
import AccountModel from '../../mongodb/models/account.model.js';
import CompanyModel from '../../mongodb/models/company.model.js';
import DepartmentModel from '../../mongodb/models/department.model.js';
import EmployeeModel from '../../mongodb/models/employee.model.js';
import ProfileModel from '../../mongodb/models/profile.model.js';
import logger from '../../service/logger.service.js';
import { employeeService } from '../employee/employee.service.js';
import { profileService } from '../profile/profile.service.js';
async function createAccount(uuid, profileId) {
    const accountDoc = await AccountModel.create({
        uuid,
        profile: profileId,
    });
    if (!accountDoc) {
        logger.warn(`accountService - cannot create account: ${uuid}`);
        throw new BadRequestError('Could not create account');
    }
    const account = await AccountModel.findById(accountDoc._id)
        .populate('profile')
        .populate('employee')
        .lean()
        .exec();
    if (!account) {
        logger.warn(`accountService - account is not found: ${uuid}`);
        throw new BadRequestError('Account is not found');
    }
    logger.info(`accountService - createAccount, account is created:  ${account._id}`);
    return account;
}
async function getAccount(uuid) {
    const account = await AccountModel.findOne({ uuid })
        .populate('role')
        .populate('profile')
        .populate({
        path: 'employee',
        select: '-profile',
        populate: [
            {
                path: 'company',
                select: 'companyName companyNumber departments',
                populate: {
                    path: 'departments',
                    select: 'departmentName',
                },
            },
            {
                path: 'department',
                select: 'departmentName',
            },
            { path: 'supervisor' },
            { path: 'subordinates' },
        ],
    })
        .populate('status')
        .lean()
        .exec();
    if (!account) {
        logger.warn(`accountService - getAccount, account is not found: ${uuid}`);
        throw new BadRequestError('Account is not found');
    }
    logger.info(`accountService - getAccount, account fetched: ${account._id}`);
    return account;
}
async function getAccounts(employeeIds) {
    const accounts = await AccountModel.find({ employee: { $in: employeeIds } }, { isComplete: 0 })
        .select('-isComplete')
        .populate('profile')
        .populate({
        path: 'employee',
        select: '-profile -supervisor -subordinates',
        populate: [
            {
                path: 'company',
                select: 'companyName',
            },
            {
                path: 'department',
                select: 'departmentName',
            },
        ],
    })
        .lean()
        .exec();
    if (!accounts) {
        logger.warn(`accountService - getAccounts, accounts are not found`);
        throw new BadRequestError('Accounts are not found');
    }
    logger.info(`accountService - getAccounts, number of accounts fetched: ${accounts.length}`);
    return accounts;
}
async function getAccountDoc(uuid) {
    const account = await AccountModel.findOne({ uuid }).lean().exec();
    if (!account) {
        logger.warn(`accountService - getAccountDoc, account is not found: ${uuid}`);
        throw new BadRequestError('Account is not found');
    }
    return account;
}
async function getEmployeeAccountDoc(employeeId) {
    const accountDoc = await AccountModel.findOne({ employee: employeeId })
        .lean()
        .exec();
    return accountDoc;
}
async function setProfile(accountId, profileId) {
    const accountDoc = await AccountModel.findById(accountId);
    if (!accountDoc)
        throw new BadRequestError('Account is not found');
    const oldProfileId = accountDoc.profile;
    if (oldProfileId)
        await profileService.deleteProfile(oldProfileId);
    const account = await AccountModel.findByIdAndUpdate(accountId, { profile: profileId }, 
    // returns new version of document, if false returns original version, before updates
    { new: true })
        .lean()
        .exec();
    if (!account) {
        logger.warn(`accountService - setProfile, cannot set profile: ${accountId} ${profileId}`);
        throw new BadRequestError('Account cannot be updated');
    }
    logger.info(`accountService - setProfile, profileId: ${profileId}`);
}
async function setRole(accountId, role) {
    const account = await AccountModel.findByIdAndUpdate(accountId, { role }, 
    // returns new version of document, if false returns original version, before updates
    { new: true }).exec();
}
async function setStatus(accountId, status) {
    const account = await AccountModel.findByIdAndUpdate(accountId, { status }, 
    // returns new version of document, if false returns original version, before updates
    { new: true }).exec();
}
async function connectEmployee(accountId, employeeId) {
    const profileId = await employeeService.getProfileId(employeeId);
    // TODO: check if employee is already assigned to another account
    // TODO: check if account has already assigned profile. Can be separate function to set profile
    const account = await AccountModel.findByIdAndUpdate(accountId, {
        $set: {
            employee: employeeId,
            profile: profileId,
            isComplete: true,
        },
    }, 
    // returns new version of document, if false returns original version, before updates
    { new: true })
        .populate('role')
        .populate('profile')
        .populate({
        path: 'employee',
        populate: [
            {
                path: 'company',
                select: 'companyName companyNumber',
            },
            {
                path: 'department',
                select: 'departmentName',
            },
            { path: 'profile' },
            { path: 'supervisor' },
            { path: 'subordinates' },
        ],
    })
        .populate('status')
        .lean()
        .exec();
    return account;
}
async function disconnectEmployee(accountId) {
    const account = await AccountModel.findByIdAndUpdate(accountId, {
        $unset: {
            employee: 1,
            isComplete: false,
        },
    }, 
    // returns new version of document, if false returns original version, before updates
    { new: true });
    logger.info(`accountService - disconnectEmployee, accountId: ${accountId}`);
}
async function completeAccount(accountId) {
    const updatedAccount = await AccountModel.findByIdAndUpdate(accountId, { isComplete: true }, 
    // returns new version of document, if false returns original version, before updates
    { new: true })
        .populate('role')
        .populate('profile')
        .populate({
        path: 'employee',
        populate: [
            {
                path: 'company',
                select: 'companyName companyNumber',
            },
            {
                path: 'department',
                select: 'departmentName',
            },
            { path: 'profile' },
            { path: 'supervisor' },
            { path: 'subordinates' },
        ],
    })
        .populate('status')
        .lean()
        .exec();
    if (!updatedAccount) {
        logger.warn(`accountService - completeAccount, cannot update account: ${accountId}`);
        throw new BadRequestError('Account cannot be updated');
    }
    logger.info(`accountService - completeAccount, account is completed: ${updatedAccount._id}`);
    return updatedAccount;
}
async function updateAccount(accountId, role, status) {
    const account = await AccountModel.findByIdAndUpdate(accountId, { role, status }, 
    // returns new version of document, if false returns original version, before updates
    { new: true })
        .populate('profile')
        .populate({
        path: 'employee',
        select: '-profile -supervisor -subordinates',
        populate: [
            {
                path: 'company',
                select: 'companyName',
            },
            {
                path: 'department',
                select: 'departmentName',
            },
        ],
    })
        .lean()
        .exec();
    logger.info(`accountService - updateAccount, account is updated: ${accountId}`);
    return account;
}
async function deleteAccount(identifier) {
    await AccountModel.findOneAndDelete({ identifier });
}
function sortAccountData(accountData) {
    // function usage:
    // const [
    //   updatedProfileData,
    //   updateEmployeeData,
    //   updatedCompanyData,
    //   updatedDepartmentData,
    // ] = accountService.sortAccountData(accountData)
    const profileSchemaKeys = Object.keys(ProfileModel.schema.paths);
    const employeeSchemaKeys = Object.keys(EmployeeModel.schema.paths);
    const companySchemaKeys = Object.keys(CompanyModel.schema.paths);
    const departmentSchemaKeys = Object.keys(DepartmentModel.schema.paths);
    const { updatedProfileData, updateEmployeeData, updatedCompanyData, updatedDepartmentData, } = Object.entries(accountData).reduce((accumulator, [key, value]) => {
        if (profileSchemaKeys.includes(key)) {
            accumulator.updatedProfileData[key] = value;
        }
        else if (employeeSchemaKeys.includes(key)) {
            accumulator.updateEmployeeData[key] = value;
        }
        else if (companySchemaKeys.includes(key)) {
            accumulator.updatedCompanyData[key] = value;
        }
        else if (departmentSchemaKeys.includes(key)) {
            accumulator.updatedDepartmentData[key] = value;
        }
        return accumulator;
    }, {
        updatedProfileData: {},
        updateEmployeeData: {},
        updatedCompanyData: {},
        updatedDepartmentData: {},
    });
    console.log('sortAccountData, updatedProfileData: ', updatedProfileData);
    console.log('sortAccountData, updateEmployeeData: ', updateEmployeeData);
    console.log('sortAccountData, updatedCompanyData: ', updatedCompanyData);
    console.log('sortAccountData, updatedDepartmentData: ', updatedDepartmentData);
    return [
        updatedProfileData,
        updateEmployeeData,
        updatedCompanyData,
        updatedDepartmentData,
    ];
}
export const accountService = {
    createAccount,
    getAccount,
    getAccounts,
    getAccountDoc,
    getEmployeeAccountDoc,
    setProfile,
    setRole,
    setStatus,
    connectEmployee,
    disconnectEmployee,
    completeAccount,
    updateAccount,
    deleteAccount,
    sortAccountData,
};
// expanded logging:
// logger.info(
//   `accountService - createAccount, account is created:  ${JSON.stringify(
//     account,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )
//# sourceMappingURL=account.service.js.map