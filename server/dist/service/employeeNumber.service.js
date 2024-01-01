import EmployeeModel from '../mongodb/models/employee.model.js';
import { utilService } from '../utils/utils.js';
async function generateEmployeeNumber(companyId) {
    let number = utilService.getRandomInt(1000, 9999);
    const existingCode = await EmployeeModel.findOne({
        employeeNumber: number.toString(),
        companyId,
    });
    if (existingCode)
        return generateEmployeeNumber(companyId);
    return number.toString();
}
function isValidEmployeeNumber(employeeNumber) {
    const regex = /^\d{4}$/;
    return regex.test(employeeNumber);
}
export const employeeNumberService = {
    generateEmployeeNumber,
    isValidEmployeeNumber,
};
//# sourceMappingURL=employeeNumber.service.js.map