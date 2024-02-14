import express from 'express';
import { jobsController } from './jobsController.js';
import * as auths from "../../middlewares/auth.js";
export const jobsRouter = express();

jobsRouter.post('/create', auths.roles("create","jobs"), jobsController.create);
jobsRouter.post('/getall', auths.roles("read","jobs"), jobsController.getAll);
jobsRouter.post('/getbyid', auths.roles("read","jobs"), jobsController.getById);
jobsRouter.post('/update', auths.roles("edit","jobs"), jobsController.update);
jobsRouter.post('/delete', auths.roles("delete","jobs"), jobsController.delete);
