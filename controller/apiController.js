const express = require('express');
const connectDb = require('../config/connectDatabase')

const quoteModel1 = connectDb.quoteModel1;

const createRow = async (req, res) => {

    try {

        // check connect db
        if (!quoteModel1) {
            return res.status(500).json({ message: "Failed to connect to the database" })
        }

        // check missing field
        const dataReq = req.body;
        if (!dataReq) {
            return res.status(400).json({ message: "new data was not send from client" })
        }

        const { website, link_website, position, dimensions, platform, link_demo, display_link_demo, buying_method, homepage, c_s_roadblock,
            ctr, type, est, price, week, month, quarter_year, e_i, cross_site, detailed_cross_site, subject, note } = dataReq

       
        if (!type || !website || !link_website || !position || !dimensions || !platform || !display_link_demo.length) {
            return res.status(400).json({ message: "missing input fields" })
        }

        // check conflict
        var id;
        const checkWebsite = await quoteModel1.findOne({link_website: link_website })
        if (checkWebsite && checkWebsite.website != website) {
            return res.status(409).json({ message: "Link website already exists for a different website" });
        }
        if (checkWebsite && checkWebsite.type != type) {
            return res.status(409).json({ message: "Link website already exists in a different type" });
        }

        var isNewWebsite = false;
        if (checkWebsite) {
            id = checkWebsite.id
        } else {
            const maxId = await quoteModel1.findOne({ type: type }).sort({ id: -1 }).limit(1)
            if (maxId) {
                id = maxId.id + 1;
            } else {
                id = 1;
            }
            isNewWebsite = true;
        }
        

        const newQuote = new quoteModel1({
            id, website, link_website, position, dimensions, platform, link_demo, display_link_demo, buying_method, homepage, c_s_roadblock,
            ctr, type, est, price, week, month, quarter_year, e_i, cross_site, detailed_cross_site, subject, note
        })
        
        await newQuote.save().then(quote => {
            return res.status(200).json({_id: quote._id, id: quote.id, isNewWebsite: isNewWebsite , message: "Quote create successfully" })
        }).catch(err => console.error('Error saving quote:', err));


    } catch (error) {
        console.log("server error ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

const getData = async (req, res) => {
    quoteModel1.find({}).sort({ type: 1, website: 1, id: 1 }).then(function (data) {
        res.render("index", { data })
    }).catch(function (err) {
        console.log(err)
    })
}

const getPages = async (req, res) => {
    // quoteModel1.distinct("website")
    const distinctWebsites = await quoteModel1.distinct("website")
    var response = [];
    for (const website of distinctWebsites) {
        const type = await quoteModel1.findOne({ website: website }, { type: 1, _id: 0, website: 1 });
        response.push(type)
    }
    res.json(response);
}

const updateRow = async (req, res) => {

    try {

        // check connect db
        if (!quoteModel1) {
            return res.status(5000).json({ message: "Failed to connect to the database" })
        }

        // check missing field
        const _id = req.params.id
        const dataReq = req.body
        console.log(2, req.body)
        if (!dataReq) {
            return res.status(400).json({ message: "new data was not send from client" })
        }

        const { id, website, link_website, position, dimensions, platform, link_demo, display_link_demo, buying_method, homepage, c_s_roadblock,
            ctr, type, est, price, week, month, quarter_year, e_i, cross_site, detailed_cross_site, subject, note } = dataReq

        if (!type || !website || !link_website || !position || !dimensions || !platform || !display_link_demo.length) {
            return res.status(400).json({ message: "missing input fields"  })
        }

        // check data
        const updateData = await quoteModel1.findOneAndUpdate({ _id: _id }, {
            id, website, link_website, position, dimensions, platform, link_demo, display_link_demo, buying_method, homepage, c_s_roadblock,
            ctr, type, est, price, week, month, quarter_year, e_i, cross_site, detailed_cross_site, subject, note
        }, { new: true })

        if (!updateData) {
            return res.status(404).json("can not find this data to update")
        }

        return res.status(200).json({ message: "data update successfully" })

    } catch (error) {
        console.log("server error ", error)
        return res.status(500).json({ message: "Server error" })
    }

}

const deleteRow = async (req, res) => {
    try {
        const id = req.params.id
        const deleteData = await quoteModel1.findByIdAndDelete({ _id: id })

        if (!deleteData) {
            return res.status(404).json("can not find this data to delete")
        }

        return res.status(200).json({ message: "data delete successfully" })
    } catch (error) {
        console.log("server error ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

const search = async (req, res) => {

}

module.exports = {
    createRow, getData, updateRow, deleteRow, getPages
}