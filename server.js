const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
var path = require('path')
const configView = require('./config/viewEngine')
const apiRouter = require('./routes/apiRouter')
const webRouter = require('./routes/webRouter');
const authRouter = require('./routes/authRouter');

const app = express();

configView(app);



app.use(authRouter)
app.use(apiRouter)
app.use(webRouter)

app.get("/get-data", (req, res)=> {
  res.render("pages/form_data")
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server is running in ${port}...`)
})