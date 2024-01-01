import CompanyModel from '../mongodb/models/company.model.js';
import { utilService } from '../utils/utils.js';
async function generateCompanyNumber() {
    let number = utilService.getRandomInt(1000, 9999);
    const existingCode = await CompanyModel.findOne({
        companyNumber: number.toString(),
    });
    if (existingCode)
        return generateCompanyNumber();
    return number.toString();
}
function isValidCompanyNumber(companyNumber) {
    const regex = /^\d{4}$/;
    return regex.test(companyNumber);
}
export const companyNumberService = {
    generateCompanyNumber,
    isValidCompanyNumber,
};
//# sourceMappingURL=companyNumber.service.js.map