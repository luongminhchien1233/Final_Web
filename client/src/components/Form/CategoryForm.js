import React from "react";
import {toast} from "react-toastify";

const CategoryForm = ({ handleSubmit, value, setValue, roomId, setroomId, rooms }) => {
   // Hàm xử lý khi form được submit
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit form

    // Kiểm tra xem giá trị của roomId có trong danh sách rooms không
    const isRoomValid = rooms.some(room => room._id === roomId);

    // Nếu roomId không hợp lệ, hiển thị thông báo và không thực hiện hành động submit
    if (!isRoomValid) {
      toast.error("Please select a valid room from the list.");
      return;
    }

    // Nếu roomId hợp lệ, thực hiện hành động submit
    handleSubmit();
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="mb-3">
            <select className="form-select" onChange={(e) => setroomId(e.target.value)} value={roomId}>
            <option value="">Select a room</option>
            {rooms && rooms.map((room) => (
              <option key={room._id} value={room._id}>{room.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;