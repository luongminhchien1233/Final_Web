import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import {
  braintreeTokenController,
  brainTreePaymentController,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProduct,
  getProductByCategory,
  getProductByRoom,
  getProductPhoto,
  productFilter,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController
} from "./../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
// create
router.post(
  "/",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);

//update
router.put(
  "/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

//getALl
router.get("/", getAllProduct);

//getALl
router.post("/filter/", productFilter);

//product count
router.get("/product-count/", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//serach
router.get("/search/:keyword", searchProductController)

//similar product
router.get("/related-product/:pid/:cid", realtedProductController)

//get Photo
router.get("/product-photo/:id", getProductPhoto);

//get Product By Cate
router.get("/category/:id", getProductByCategory);

//get Product By Room
router.get("/room/:id", getProductByRoom);

//single
router.get("/:id", getProductById);


//delete
router.delete(
  "/:id",
  requireSignIn,
  isAdmin,
  deleteProduct
);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);



export default router;