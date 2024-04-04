import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import {toast} from "react-toastify";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [room, setRoom] = useState({});
  const [category, setCategory] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/${params.id}`
      );
      setProduct(data?.data);
      console.log(data?.data);
      getCategory(data?.data.category);
      getRoom(data?.data.room);
      getSimilarProduct(data?.data._id, data?.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  //Category
  const getCategory = async (id) => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/${id}`
      );
      setCategory(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Category
  const getRoom= async (id) => {
    try {
      const { data } = await axios.get(
        `/api/v1/room/${id}`
      );
      setRoom(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-5">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.title}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.title}</h6>
          <h6>Description : {product.desc}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Room : {room.name}</h6>
          <h6>Category : {category.name}</h6>
          <button class="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added to cart");
                    }}>ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.title}
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.desc.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;