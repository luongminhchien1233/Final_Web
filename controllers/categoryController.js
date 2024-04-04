import Category from "../models/categoryModels.js";
import Room from "../models/roomModels.js"
import mongoose from "mongoose";

export const createCategoryController = async (req, res) => {
  const findCategory = await Category.findOne({ name: req.body.name });
  if(findCategory){
      return res.status(201).json({
          status: 201,
          message: "Category Name is Already have!"
      });;
  }
  try {
      if (!mongoose.Types.ObjectId.isValid(req.body.roomId)) {
          return res.status(201).json({
              status: 201,
              message: "Invalid RoomId!"
          });
      }
      const room = await Room.findById(req.body.roomId);
      if (!room) {
          return res.status(201).json({
              status: 201,
              message: "RoomId does not exist!"
          });
      }
      const categoryNew = new Category ({
          name: req.body.name,
          roomId: req.body.roomId
      });
      const savedCategory = await categoryNew.save();
      return res.status(200).json({
          status: 200,
          data: savedCategory,
          message: "Create Category Successfully!"
      });
  } catch (err) {
      res.status(500).json(err);
  }
};

export const updateCategoryController = async (req, res) => {
    // const findCategory = await Category.findOne({ name: req.body.name });
    // if(findCategory){
    //     return res.status(400).json({
    //         status: 400,
    //         message: "Category Name is Already have!"
    //     });;
    // }
    if (!mongoose.Types.ObjectId.isValid(req.body.roomId)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid RoomId!"
        });
    }
    const room = await Room.findById(req.body.roomId);
    if (!room) {
        return res.status(400).json({
            status: 400,
            message: "RoomId does not exist!"
        });
    }
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json({
            status: 200,
            data: updatedCategory,
            message: "Update Category Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    let categories = await Category.find();
    return res.status(200).json({
        status: 200,
        data: categories,
        message: "Find All Categories Successfully!"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).json({
        status: 200,
        data: category,
        message: "Find Category Successfully!"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        status: 200,
        message: "Category has been deleted..."
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCategoryByRoom = async (req, res) =>{
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
          status: 400,
          message: "Invalid RoomId!"
      });
    }
    const room = await Room.findById(req.params.id);
    if (!room) {
        return res.status(400).json({
            status: 400,
            message: "RoomId does not exist!"
        });
    }
    let categories = await Category.find({ roomId: req.params.id });
    return res.status(200).json({
        status: 200,
        data: categories,
        message: "Find Successfully!"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};