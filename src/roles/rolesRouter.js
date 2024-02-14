import express from "express";
import { rolesController } from "./rolesController.js";
import * as auths from "../../middlewares/auth.js";
const router = express();

router.post("/create", auths.roles("create", "roles"), rolesController.create);
router.post("/update", auths.roles("edit", "roles"), rolesController.update);
router.post("/delete", auths.roles("delete", "roles"), rolesController.delete);
router.post("/getall", auths.roles("read", "roles"), rolesController.getAll);
router.post("/getbyid", auths.roles("read", "roles"), rolesController.getById);

export default router;
