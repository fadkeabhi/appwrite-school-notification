import React, { useState } from "react";
import Layout from "./components/Layout";
import { useNavigate } from "react-router";
import instance from "../../util/instance";
import { createClassRoute } from "../../API/Routes";

function AddClass() {
  const [clas, setClas] = useState("");
  const navigate = useNavigate();
  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(createClassRoute, {
        clas
    });
    setClas('');
    
    navigate('/admin/class');
  };
  return (
    <Layout>
      <div className="flex-1 w-full flex items-center justify-center rounded-lg">
        <form
          method="POST"
          onSubmit={(e) => {
            FormSubmitHandler(e);
          }}
          className="bg-white text-lg max-w-full font-semibold flex flex-col p-10 rounded-md gap-5 items-center justify-center"
        >
          <h1 className="text-lg font-semibold">TEACHER</h1>
          <div className="flex flex-col mx-4">
            <label>
              Class<span className="text-red-800">*</span>
            </label>
            <input
              value={clas}
              onChange={(e)=>setClas(e.target.value)}
              type="text"
              placeholder="Enter Class Name"
              className="outline-none placeholder:text-gray-300 w-[400px] rounded-md p-2 bg-[#9BA4B5]"
            />
          </div>
          <div className="flex gap-4 p-5">
            <button
              type="button"
              onClick={() => navigate("/admin/class")}
              className="bg-red-300 p-4 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-300 p-4 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddClass;
