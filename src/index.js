import express from "express";
import admin from "./adminRouter.js";
import employeeRouter from "./employeesRouter.js";
const router = express();

router.use("/admin", admin);
router.use("/employee", employeeRouter);

export default router;
