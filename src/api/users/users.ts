import express from 'express';
import { prisma } from '../../prismaClient';
import User from '../../interfaces/User';

const usersRouter = express.Router();

type UserResponse = Pick<User, 'id' | 'name' | 'username'>;

usersRouter.get<{}, UserResponse[]>('/', (req, res, next) => {
  // dont select password and token
  try {
    prisma.user
      .findMany({
        select: { id: true, name: true, username: true, role: true },
      })
      .then((users) => {
        res.json(users);
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRouter.get<{ id: string }, UserResponse | null>(
  '/:id',
  (req, res, next) => {
    const { id } = req.params;
    try {
      prisma.user
        .findUnique({
          where: { id: Number(id) },
          select: { id: true, name: true, username: true, role: true },
        })
        .then((user) => {
          res.json(user);
        });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
);

export default usersRouter;
