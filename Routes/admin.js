import { Router } from 'express';

import { logAdmin } from '../Controllers';
import { validateLoginAdmin, checkIfAdminExists } from '../Middlewares';

const adminRouter = Router();

adminRouter.post('/admin/login', validateLoginAdmin, checkIfAdminExists, logAdmin);

export default adminRouter;
