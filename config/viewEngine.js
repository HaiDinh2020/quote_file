const bodyParser = require('body-parser');
const express = require('express')

const app = express()

const configView = (app) => {

    app.use(bodyParser.urlencoded({extended:true}))
    app.set("view engine", "ejs");
    app.set("views", "./views");
    app.use(express.static('public'))
}


module.exports = configView;