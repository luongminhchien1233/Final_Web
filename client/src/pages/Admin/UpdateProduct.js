import React,  {useEffect, useState} from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import {toast} from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");


  // Get All Room
  const getAllRoom = async() =>{
    try{
      const { data } = await axios.get("/api/v1/room/");
      if (data.status == 200) {
        setRooms(data.data);
        console.log(data.data);
      }
    }catch(error){
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
    }
  };

  // Get All Room
  const getCategoryByRoom= async(pId) =>{
    try{
      const { data } = await axios.get(`/api/v1/category/room/${pId}`);
      if (data.status == 200) {
        setCategories(data.data);
      }
    }catch(error){
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
    }
  };

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/${params.id}`
      );
      setTitle(data.data.title);
      setId(data.data._id);
      setDesc(data.data.desc);
      setPrice(data.data.price);
      setQuantity(data.data.quantity);
      setCategory(data.data.category);
      setRoom(data.data.room);
      setUrl(`/api/v1/product/product-photo/${data.data._id}`)
      getCategoryByRoom(data.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("desc", desc);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      photo && productData.append("photo", photo);
      productData.append("categoryId", category);
      productData.append("roomId", room)
      const { data } = axios.put(
        `/api/v1/product/${id}`,
        productData
      );
      if (data?.status == 200) {
        toast.error(data?.message);
      } else {
        toast.success("Product Update Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/${id}`
      );
      if (data?.status == 200) {
        toast.success(`Category is deleted`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };


  useEffect(()=>{
    getAllRoom();
    getSingleProduct();
  }, [])
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a room"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  getCategoryByRoom(value);
                  setRoom(value);
                  setCategory();
                }}
                value = {room}
              >
                {rooms?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value = {category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src= {url}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={desc}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;