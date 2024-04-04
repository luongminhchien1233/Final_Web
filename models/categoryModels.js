import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true,
        unique: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
  },
  {timestamps: true}
);

export default mongoose.model("Category", categorySchema);