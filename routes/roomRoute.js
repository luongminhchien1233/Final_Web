import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  getAllRoom,
} from "./../controllers/roomController.js";

const router = express.Router();

//routes
// create
router.post(
  "/",
  requireSignIn,
  isAdmin,
  createRoom
);

//update
router.put(
  "/:id",
  requireSignIn,
  isAdmin,
  updateRoom
);

//getALl
router.get("/", getAllRoom);

//single
router.get("/:id", getRoomById);

//delete
router.delete(
  "/:id",
  requireSignIn,
  isAdmin,
  deleteRoom
);

export default router;