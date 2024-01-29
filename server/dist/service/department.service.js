import BadRequestError from '../errors/BadRequestError.js';
import DepartmentModel from '../mongodb/models/department.model.js';
import logger from './logger.service.js';
async function createDepartment(companyId, departmentName) {
    const newDepartment = await DepartmentModel.create({
        departmentName,
        company: companyId,
        employees: [],
    });
    const department = await DepartmentModel.findById(newDepartment._id)
        .populate('company')
        .populate('employees')
        .lean()
        .exec();
    logger.info(`departmentService  - createDepartment, department:  ${department?.departmentName}`);
    return department;
}
async function updateDepartment(departmentId, updatedDepartmentData) {
    const department = await DepartmentModel.findByIdAndUpdate(departmentId, updatedDepartmentData, 
    // returns new version of document, if false returns original version, before updates
    { new: true })
        .populate('company')
        .populate('employees')
        .lean()
        .exec();
    if (!department) {
        logger.warn(`departmentService- updateDepartment, failed to update department: ${departmentId}`);
        throw new BadRequestError('Department is not found');
    }
    logger.info(`departmentService- updateDepartment, departmentId: ${department.departmentName}`);
    return department;
}
async function addEmployee(departmentId, employeeId) {
    const department = await DepartmentModel.findByIdAndUpdate(departmentId, {
        $push: { employees: employeeId },
    }, 
    // returns new version of document, if false returns original version, before updates
    { new: true })
        .populate('employees')
        .lean()
        .exec();
    if (!department) {
        logger.warn(`departmentService- addEmployee, department is not found: ${departmentId}`);
        throw new BadRequestError('Department is not found');
    }
    logger.info(`departmentService- addEmployee, department :  ${department.departmentName}`);
    return department;
}
async function removeEmployee(departmentId, employeeId) {
    const department = await DepartmentModel.findByIdAndUpdate(departmentId, {
        $pull: { employees: employeeId },
    }, 
    // returns new version of document, if false returns original version, before updates
    { new: true });
}
async function getDepartmentDBId(departmentName) {
    const department = await DepartmentModel.findOne({ departmentName });
    if (!department) {
        logger.warn(`departmentService- getDepartmentDBId, department is not found: ${departmentName}`);
        throw new BadRequestError('Department is not found');
    }
    return department._id;
}
export const departmentService = {
    createDepartment,
    updateDepartment,
    addEmployee,
    removeEmployee,
    getDepartmentDBId,
};
// logger.info(
//   `departmentService - department added:  ${JSON.stringify(
//     department,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )
//# sourceMappingURL=department.service.js.map