import React, {useEffect, useState} from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import {toast} from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";


const CreateCategory = () => {
  const [rooms, setRooms] = useState([])
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updateRoomId, setUpadteRoomId] = useState("");
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
  //handle Form
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category", {
        name, roomId
      });
      if (data?.status == 200) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  // Get All Room
  const getAllCategory= async() =>{
    try{
      const { data } = await axios.get("/api/v1/category/");
      if (data.status == 200) {
        setCategories(data.data);
      }
    }catch(error){
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/${pId}`
      );
      if (data.status == 200) {
        toast.success(`Category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    //e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/${selected._id}`,
        { name: updatedName, roomId: updateRoomId }
      );
      if (data.status == 200) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  useEffect(()=>{
    getAllRoom();
    getAllCategory();
  }, [])
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                roomId={roomId}
                setroomId={setRoomId}
                rooms={rooms}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setUpadteRoomId(c.roomId);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
                roomId={updateRoomId}
                setroomId={setUpadteRoomId}
                rooms={rooms}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;