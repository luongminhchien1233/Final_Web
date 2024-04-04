import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
  getCategoryByRoom,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/", categoryControlller);

//get  category by room
router.get("/room/:id", getCategoryByRoom);

//single category
router.get("/:id", singleCategoryController);

//delete category
router.delete(
  "/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;