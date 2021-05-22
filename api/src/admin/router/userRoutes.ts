import { Router } from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';
import { protect, restrictTo } from '../middlewares/auth';
import { ROLES } from '../../constants';
import { validateFields } from '../../shared/middlewares/loginMiddleware';

const router = Router();

router.post('/login', validateFields, authController.login);

// Authenticate and authorize all routes after this middleware
router.use(protect, restrictTo(ROLES.admin, ROLES.staff));

router.get('/', userController.getAllUsers);
router.get('/current-user', authController.getLoggedInUser);

export default router;