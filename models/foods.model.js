// models/foods

const { Schema, model, SchemaTypes } = require("mongoose")

const FoodSchema = new Schema({ // constructer skal ifølge konventionen stå med stort
    brand: SchemaTypes.String,
    productname: SchemaTypes.String,
    price: SchemaTypes.Number,
    weight: SchemaTypes.Number,
    animal: SchemaTypes.String
})

const Food = model("Food", FoodSchema)

module.exports = Food;