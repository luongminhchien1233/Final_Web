import React from "react";

const RoomForm = ({ handleSubmit, value, setValue, icUrl, seticUrl }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Room"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Icon Url"
            value={icUrl}
            onChange={(e) => seticUrl(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default RoomForm;