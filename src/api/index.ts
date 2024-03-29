import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';

// routes import
import auth from '../middlewares/auth';
import verifyRole from '../middlewares/verifyRole';
import usersRouter from './users/users';
import signUpRouter from './signUp/signUp';
import loginRouter from './login/login';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// other routes will be added here to the router
router.use('/users', auth, verifyRole(['admin']), usersRouter);
router.use('/signUp', signUpRouter);
router.use('/login', loginRouter);

export default router;
