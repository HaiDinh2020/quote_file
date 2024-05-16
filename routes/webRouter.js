const express = require('express');
const webController = require('../controller/webController')

const webRouter = express.Router()
webRouter.use(express.json())


webRouter.get("/form", webController.formData )
webRouter.get("/createform", webController.createForm)
webRouter.get("/login", webController.login)
webRouter.get("/register", webController.register)

module.exports =  webRouter;