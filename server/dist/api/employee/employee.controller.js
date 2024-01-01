import { companyNumberService } from '../../service/companyNumber.service.js';
import { employeeService } from './employee.service.js';
export async function getAllEmployees(req, res, next) {
    const employees = await employeeService.getAllEmployees();
    if (!employees) {
        return res.status(400).json({
            success: false,
            message: 'Cannot find employees',
        });
    }
    res.status(200).json({
        success: true,
        message: 'Successfully retrieved all employees',
        data: {
            employees,
        },
    });
}
export async function getEmployeeNumber(req, res, next) {
    const employeeNumber = companyNumberService.generateCompanyNumber();
    res.status(200).json({
        success: true,
        message: 'Successfully retrieved employeeNumber',
        data: { employeeNumber },
    });
}
//# sourceMappingURL=employee.controller.js.map