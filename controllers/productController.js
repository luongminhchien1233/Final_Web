import Product from "../models/productModels.js"
import Category from "../models/categoryModels.js";
import orderModels from "../models/orderModels.js";
import Room from "../models/roomModels.js"
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProduct = async (req, res) => {
    const { title, desc, roomId, categoryId, price ,quantity } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !title:
        return res.status(403).send({ error: "Name is Required" });
      case !desc:
        return res.status(403).send({ error: "Description is Required" });
      case !roomId:
        return res.status(403).send({ error: "Room is Required" });
      case !categoryId:
        return res.status(403).send({ error: "Category is Required" });
      case !price:
        return res.status(403).send({ error: "Price is Required" });
      case !quantity:
        return res.status(403).send({ error: "Quantity is Required" });;
      case photo && photo.size > 1000000:
        return res
          .status(403)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid RoomId!"
        });
    }
    const room = await Room.findById(roomId);
    if (!room) {
        return res.status(400).json({
            status: 400,
            message: "RoomId does not exist!"
        });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
        status: 400,
        message: "Invalid CategoryId"
    });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
        return res.status(400).json({
            status: 400,
            message: "CategoryId does not exist!"
        });
    }
    //const productNew = new Product({ ...req.fields});
    const productNew = new Product ({
        title: title,
        desc: desc,
        room: roomId,
        category: categoryId,
        price: price,
        quantity: quantity,
    });
    if (photo) {
        productNew.photo.data = fs.readFileSync(photo.path);
        productNew.photo.contentType = photo.type;
    }
    try {
      const savedProduct = await productNew.save();
      return res.status(200).json({
        status: 200,
        data: savedProduct,
        message: "Create Successfully!"
    });
    } catch (err) {
      res.status(500).json(err);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { title, desc, roomId, categoryId, price ,quantity } =
          req.fields;
        const { photo } = req.files;
        switch (true) {
          case !title:
            return res.status(403).send({ error: "Name is Required" });
          case !desc:
            return res.status(403).send({ error: "Description is Required" });
          case !roomId:
            return res.status(403).send({ error: "Room is Required" });
          case !categoryId:
            return res.status(403).send({ error: "Category is Required" });
          case !price:
            return res.status(403).send({ error: "Price is Required" });
          case !quantity:
            return res.status(403).send({ error: "Quantity is Required" });;
          case photo && photo.size > 1000000:
            return res
              .status(403)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
    
        if (roomId && mongoose.Types.ObjectId.isValid(roomId)) {
            const room = await Room.findById(roomId);
            if (!room) {
                return res.status(400).json({
                    status: 400,
                    message: "RoomId does not exist!"
                });
            }
        }
        if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({
                    status: 400,
                    message: "CategoryId does not exist!"
                });
            }
        }
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          { ...req.fields},
          { new: true }
        );
        if (photo) {
          product.photo.data = fs.readFileSync(photo.path);
          product.photo.contentType = photo.type;
        }
        const updatedProduct = await product.save();
        // Send response
        return res.status(200).json({
            status: 200,
            data: updatedProduct,
            message: "Update Successful!"
        });
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          status: 200,
          message: "Product has been deleted..."
      });
      } catch (err) {
        res.status(500).json(err);
      }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).select("-photo");
        return res.status(200).json({
          status: 200,
          data: product,
          message: "Get Product Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product
      .find({})
      // .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All Products ",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get photo
export const getProductPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

export const getProductByCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({
              status: 400,
              message: "Invalid CategoryId"
          });
        }
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(400).json({
                status: 400,
                message: "CategoryId does not exist!"
            });
        }
        let products = await Product.find({ category: req.params.id }).select("-photo");
        return res.status(200).json({
            status: 200,
            data: products,
            message: "Find Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

export const getProductByRoom = async (req, res) => {
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
        let products = await Product.find({ room: req.params.id }).select("-photo");
        return res.status(200).json({
            status: 200,
            data: products,
            message: "Find Successfully!"
        });
      } catch (err) {
        res.status(500).json(err);
    }
};

// filters
export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked && checked.length > 0) args.category = checked;
    console.log(radio)
    if (radio && radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args).select("-photo");
    res.status(200).send({
      status: 200,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await Product
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { desc: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3);
      // .populate("category");
    res.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModels({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};