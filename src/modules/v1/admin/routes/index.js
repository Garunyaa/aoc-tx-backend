import express from 'express';
import adminValidator from '../validators/admin-validator';
import paramsValidator from '../validators/params-validator';
import adminAuthentication from '../authentication/admin-authentication';
import loginAdmin from '../controllers/admin-management/login-admin';
import logoutAdmin from '../controllers/admin-management/logout-admin';
import initiativeValidator from '../validators/initiative-validator';
import createInitiative from '../controllers/initiative-management/create-initiative';
import listInitiatives from '../controllers/initiative-management/list-initiatives';
import deleteInitiative from '../controllers/initiative-management/delete-initiative';
import updateInitiative from '../controllers/initiative-management/update-initiative';
import getInitiativeDetails from '../controllers/initiative-management/get-initiative-details';

const adminRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

// admin routes
adminRouter.post('/login', [adminValidator.login], loginAdmin.get);
adminRouter.delete('/logout', [adminAuthentication.check], logoutAdmin.delete);

// initiative routes
adminRouter.post('/create-initiative', [adminAuthentication.check, initiativeValidator.create], createInitiative.create);
adminRouter.get('/list-initiatives', [adminAuthentication.check], listInitiatives.list);
adminRouter.get('/initiative-details/:id', [adminAuthentication.check, paramsValidator.validate], getInitiativeDetails.get);
adminRouter.patch('/update-initiative/:id', [adminAuthentication.check, initiativeValidator.update], updateInitiative.update);
adminRouter.delete('/delete-initiative/:id', [adminAuthentication.check, paramsValidator.validate], deleteInitiative.delete);

module.exports = adminRouter;