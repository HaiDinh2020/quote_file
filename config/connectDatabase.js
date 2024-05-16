const express = require('express');
const mongoose = require('mongoose');


mongoose.connect("mongodb://0.0.0.0:27017/qoute_file")

const qouteSchema = new mongoose.Schema({
    id: { type: Number, default: -1 },
    website: { type: String, default: "" },
    link_website: { type: String, default: "#" },
    position: { type: String, default: "" },
    dimensions: { type: String, default: "" },
    platform: { type: String, default: "" },
    link_demo: [{ type: String, default: "" }],
    display_link_demo: [{ type: String, default: "" }],
    buying_method: { type: String, default: "" },
    homepage: { type: String, default: "" },
    c_s_roadblock: { type: String, default: "" },
    ctr: { type: String, default: "" },
    type: { type: Number, default: 0 },
    est: { type: String, default: "" },
    price: { type: String, default: "" },
    week: { type: String, default: "" },
    month: { type: String, default: "" },
    quarter_year: { type: String, default: "" },
    e_i: { type: String, default: "" },
    cross_site: { type: String, default: "" },
    detailed_cross_site: { type: String, default: "" },
    subject: { type: String, default: "" },
    note: { type: String, default: "" },
})

const quoteModel1 = mongoose.model("quote_2", qouteSchema)

module.exports = {
    quoteModel1,
}