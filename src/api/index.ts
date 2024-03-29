import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';

// routes import
import auth from '../middlewares/auth';
import verifyRole from '../middlewares/verifyRole';
import usersRouter from './users/users';
import signUpRouter from './signUp/signUp';
import loginRouter from './login/login';

const api = express.Router();

api.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// other routes will be added here to the api
api.use('/users', auth, verifyRole(['admin']), usersRouter);
api.use('/signUp', signUpRouter);
api.use('/login', loginRouter);

export default api;
