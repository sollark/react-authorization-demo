import express from 'express';
import asyncHandler from '../../middleware/asyncHandler.js';
import requireAuth from '../../middleware/requireAuth.js';
import { getAllEmployees, getEmployeeNumber } from './employee.controller.js';
const router = express.Router();
router.get('/all', requireAuth, asyncHandler(getAllEmployees));
router.get('employeeNumber', requireAuth, asyncHandler(getEmployeeNumber));
export { router as employeeRoutes };
//# sourceMappingURL=employee.routes.js.map