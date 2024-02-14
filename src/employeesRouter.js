import express from "express";
import projectModels from "./models/projectModelRouter.js";
import * as auths from "../middlewares/auth.js";
import { leaveRouter } from "./leaveApplied/leaveAppliedRouter.js";
const router = express();


router.use("/project/models", auths.auth, projectModels);
router.use("/leaveapplied", auths.auth, leaveRouter);
export default router;
