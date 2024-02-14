import express from 'express' 
import { joiningController } from './joiningController.js'
import { roles } from '../../middlewares/auth.js'



export const joiningRouter = express() 


joiningRouter.post("/create", joiningController.createJoining) 
joiningRouter.post("/update", joiningController.updateJoining) 
joiningRouter.post("/delete", joiningController.deleteJoining) 
joiningRouter.post("/getall", joiningController.getAllJoining) 
joiningRouter.post("/getbyId", joiningController.getJoiningById) 
joiningRouter.post("/getbyuserid",roles("read","joining"), joiningController.getByUserId)


