const connectDb = require('../config/connectDatabase')

const quoteModel1 = connectDb.quoteModel1;

const formData = async (req, res) => {
    quoteModel1.find({}).sort({  type: 1, id:1 , website: 1 }).then(function (data) {
        res.render("formData", { data })
    }).catch(function (err) {
        console.log(err)
    })
}

const nextPage = async(req, res) => {

}

const login = async (req, res) => {
    res.render("pages/login", {message: "login success"})
}

const register = async (req, res) => {
    res.render("pages/register", {message: "register"})
}

const createForm = async(req, res) => {
    const distinctWebsites = await quoteModel1.distinct("website")
    var response = [];
    for (const website of distinctWebsites) {
        const type = await quoteModel1.findOne({ website: website }, { type: 1, _id: 0, website: 1, link_website: 1 });
        response.push(type)
    }
    res.render("formCreate", {websites : response});
}

module.exports = {
    formData, createForm, login, register
}