import Room from "../models/roomModels.js"
import mongoose from "mongoose";

export const createRoom = async (req, res) => {
    const roomNew = new Room ({
        name: req.body.name,
        icUrl: req.body.icUrl
    });
    try {
        const savedRoom = await roomNew.save();
        return res.status(200).json({
            status: 200,
            data: savedRoom,
            message: "Create Room Successfully!"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json({
            status: 200,
            data: updatedRoom,
            message: "Update Room Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 200,
            message: "Room has been deleted..."
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        return res.status(200).json({
            status: 200,
            data: room,
            message: "Find Room Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

export const getAllRoom = async (req, res) =>{
    try {
        let rooms = await Room.find();
        return res.status(200).json({
            status: 200,
            data: rooms,
            message: "Find All Rooms Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

