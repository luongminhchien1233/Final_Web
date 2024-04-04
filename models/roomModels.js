import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique: true,
        },
        icUrl: {
            type:String,
            required:true,
        }
    },
    {timestamps: true}
)

export default mongoose.model("Room", RoomSchema);