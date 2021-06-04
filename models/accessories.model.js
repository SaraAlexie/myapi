// models/accessories

const { Schema, model, SchemaTypes } = require("mongoose")

const AccessorySchema = new Schema({ // constructer skal ifølge konventionen stå med stort
    brand: SchemaTypes.String,
    productname: SchemaTypes.String,
    productgroup: SchemaTypes.String,
    price: SchemaTypes.Number,
})

const Accessory = model("Accessory", AccessorySchema)

module.exports = Accessory;