const express = require("express");
const { findByIdAndDelete } = require("../models/accessories.model");
const router = express.Router();
const Accessory = require("../models/accessories.model")
const auth = require("../auth-middleware")

// get all accessories
router.get("/accessories", async function (request, response, next) {

    try {
        let result = await Accessory.find()
        console.log(result)
        response.json(result);

    } catch (error) {
        return next(error)
    }

})

// get single accessory by ID

router.get("/accessories/:accessoryId", async function (request, response, next) {

    try {
        let result = await Accessory.findById(request.params.accessoryId)

        // return 404 if no result is found
        if (result == null) {
            return next(new Error("Cannot find requested resource"))
        }

        // - behøver ikke have denne linje med, fordi det er 200 automatisk - "response.status(200)"
        response.json(result)

    } catch (error) {
        return next(error)

    }
})

router.post("/accessories", auth, function (request, response, next) {

    try {
        let accessory = new Accessory({// vi kan bruge fields fordi vi bruger formidable
            brand: request.fields.brand,
            productname: request.fields.productname,
            productgroup: request.fields.productgroup,
            price: request.fields.price
        })
        accessory.save();

        response.status(201);
        response.json(accessory)

    } catch (error) {
        return next(error)
    }

})

router.patch("/accessories/:accessoryId", auth, async function (request, response, next) {
    let { brand, productname, productgroup, price, } = request.fields
    let updateObject = {}

    if (brand) updateObject.brand = brand;
    if (productname) updateObject.productname = productname;
    if (productgroup) updateObejct.productgroup = productgroup;
    if (price) updateObejct.price = price;

    let accessory = await Accessory.findByIdAndUpdate(request.params.accessoryId, updateObject, { new: true })
    //let accessory = Accessory.findById()

    response.json(accessory)
})

router.delete("/accessories/:accessoryId", auth, async function (request, response, next) {
    try {
        await Accessory.findByIdAndDelete(request.params.accessoryId)

        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }
})

module.exports = router;