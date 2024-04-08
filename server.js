const express = require('express');
const mongoose = require('mongoose');
var path = require('path')

const app = express();
app.use(express.static(path.join('../app')))
app.set("view engine", "ejs");
app.set("views", "./views");

mongoose.connect("mongodb://0.0.0.0:27017/qoute_file")

const qouteSchema = new mongoose.Schema({
  _id: String,
  id: {type: Number, default: -1},
  website:  {type: String, default: ""},
  link_website: {type: String, default: "#"},
  position: {type: String, default: ""},
  dimensions: {type: String, default: ""},
  platform: {type: String, default: ""},
  link_demo: [{type: String, default: ""}],
  display_link_demo: [{type: String, default: ""}],
  buying_method: {type: String, default: ""},
  homepage: {type: String, default: ""},
  c_s_roadblock: {type: String, default: ""},
  ctr: {type: String, default: ""},
  type: {type: Number, default: 0},
  est: {type: String, default: ""},
  price: {type: String, default: ""},
  
  e_i: {type: String, default: ""},
  cross_site: {type: String, default: ""},
  subject: {type: String, default: ""},
  note: {type: String, default: ""},
})

const quoteModel1 = mongoose.model("quote_2", qouteSchema)





app.get("/m", (req, res) => {
  quoteModel1.find({}).then(function (users) {
    res.json(users)
  }).catch(function (err) {
    console.log(err)
  })
})
var data1 = [],
    data2 = [],
    data3 = [],
    data4 = [],
    data5 = [],
    data6 = [];

app.get("/", (req, res) => {
  
  quoteModel1.find({type: 1}).then(function (data) {
    data1  = data;
  }).catch(function (err) {
    console.log(err)
  })
  quoteModel1.find({type: 2}).then(function (data) {
    data2  = data;
  }).catch(function (err) {
    console.log(err)
  })
  quoteModel1.find({type: 3}).then(function (data) {
    data3  = data;
  }).catch(function (err) {
    console.log(err)
  })
  quoteModel1.find({type: 4}).then(function (data) {
    data4  = data;
  }).catch(function (err) {
    console.log(err)
  })
  quoteModel1.find({type: { $in: [5, 6] }}).then(function (data) {
    data5  = data;
  }).catch(function (err) {
    console.log(err)
  })
  quoteModel1.find({type: 7}).then(function (data) {
    data6  = data;
  }).catch(function (err) {
    console.log(err)
  })
  
  res.render("index", { data1: data1, data2, data3, data4, data5, data6 })
})

app.listen(3001, () => {
  console.log("server is running...")
})