import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"            
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
    },
    {timestamps: true}
)
export default mongoose.model("Product", ProductSchema);
