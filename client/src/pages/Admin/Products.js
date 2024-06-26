import React,  {useEffect, useState} from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import {toast} from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/");
      setProducts(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
                <Link
                key={new Date().getTime()}
                to={`/dashboard/admin/product/${p._id}`}
                className="product-link"
                >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.desc}</p>
                  </div>
                </div>
            </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;