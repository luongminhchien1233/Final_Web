import React, {useEffect, useState} from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import {toast} from "react-toastify";
import axios from "axios";
import RoomForm from "../../components/Form/RoomForm";
import { Modal } from "antd";
const CreateRoom = () => {
  const [rooms, setRooms] = useState([])
  const [name, setName] = useState("");
  const [icUrl, seticUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedicUrl, setUpadteicUrl] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/room", {
        name, icUrl
      });
      if (data?.status == 200) {
        toast.success(`${name} is created`);
        getAllRoom();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };
  // Get All Room
  const getAllRoom = async() =>{
    try{
      const { data } = await axios.get("/api/v1/room/");
      if (data.status == 200) {
        setRooms(data.data);
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
        `/api/v1/room/${pId}`
      );
      if (data.status == 200) {
        toast.success(`Room is deleted`);

        getAllRoom();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/room/${selected._id}`,
        { name: updatedName, icUrl: updatedicUrl }
      );
      if (data.status == 200) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllRoom();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  useEffect(()=>{
    getAllRoom();
  }, []);

  return (
    <Layout title={"Dashboard - Create Room"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Room</h1>
            <div className="p-3 w-50">
              <RoomForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                icUrl={icUrl}
                seticUrl={seticUrl}
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
                  {rooms?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setUpadteicUrl(c.icUrl);
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
              <RoomForm
                value={updatedName}
                setValue={setUpdatedName}
                icUrl={updatedicUrl}
                seticUrl={setUpadteicUrl}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRoom;