import infoRouter from '../info/Routes';
import userRouter from '../user/Routes';

export default function routes(app) {
  app.use('/info', infoRouter);
  app.use('/user', userRouter);
}