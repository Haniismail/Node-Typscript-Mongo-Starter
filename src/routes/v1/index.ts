import express from 'express';
import auth from './auth/auth';
import users from './user/user';
import admin from './admin/admin';
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/admins', admin);
export default router;
