import express from 'express';
import { prisma } from '../../prismaClient';
import ErrorResponse from '../../interfaces/ErrorResponse';
import { generateJwt } from '../../utils/generateJwt';
import bcrypt from 'bcryptjs';
import User, { LoginResponse } from '../../interfaces/User';

const router = express.Router();

type LoginRequest = Pick<User, 'username' | 'password'>;

const invalidUsernameOrPassword = (res: express.Response) => {
  return res.status(401).json({ message: 'Invalid username or password' });
};

router.post<{}, LoginResponse | ErrorResponse, LoginRequest>(
  '/',
  async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return invalidUsernameOrPassword(res);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return invalidUsernameOrPassword(res);
      }

      const token = generateJwt(user);

      await prisma.user.update({ where: { id: user.id }, data: { token } });

      return res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
);

export default router;
