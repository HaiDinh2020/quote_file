const express = require('express');
const apiController = require('../controller/apiController');
const passport = require('passport');
const passportConfig = require('../middleware/passport')

const apiRouter = express.Router()
apiRouter.use(express.json())

apiRouter.get('/', apiController.getData )
apiRouter.get('/pages', apiController.getPages)

apiRouter.post('/form/', passportConfig, apiController.createRow)
apiRouter.put('/form/:id',passportConfig,  apiController.updateRow)
apiRouter.delete('/form/:id', passportConfig, apiController.deleteRow)

module.exports =  apiRouter;