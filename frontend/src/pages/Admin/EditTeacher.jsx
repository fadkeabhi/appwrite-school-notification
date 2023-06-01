import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import instance from '../../util/instance';
import {  getClassRoute, getTeacherRoute, updateTeacherRoute } from '../../API/Routes';

function EditTeacher() {
    const [email, setEmail] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [phone, setPhone] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const getData = async() => {
        const {data} = await instance.get(`${getTeacherRoute}`);
        const result = data.find(({ $id }) => $id === id);
        return result;
    }
    const FormSubmitHandler = (e) =>{
        e.preventDefault();
        const {data} = instance.post(updateTeacherRoute,{
            email,lName,fName,phone
        });
        navigate('/admin/teacher');
    }
    useEffect(()=>{
        getData().then((result)=>{
            setEmail(result.email)
            setfName(result.fName);
            setlName(result.lName);
            setPhone(result.phone);
        });
    },[])
  return (
    <Layout>
      <div className="flex-1 w-full flex items-center justify-center rounded-lg">
        <form
          method="POST"
          onSubmit={(e) => {
            FormSubmitHandler(e);
          }}
          className="bg-white shadow-xl text-lg max-w-full font-semibold flex flex-col p-10 rounded-md gap-5 items-center justify-center"
        >
          <h1 className="text-2xl font-semibold">UPDATE TEACHER</h1>
          <div className="flex flex-col mx-4">
            <p>EMAIL : {email}</p>
          </div>
          <div className="flex flex-col mx-4">
            <label>
              First name<span className="text-red-800">*</span>
            </label>
            <input
              value={fName}
              onChange={(e)=>{setfName(e.target.value)}}
              type="text"
              placeholder="Enter First Name"
              className="outline-none placeholder:text-gray-300 w-[400px] rounded-md p-2 bg-[#9BA4B5]"
            />
          </div>
          <div className="flex flex-col">
            <label>
              Last Name<span className="text-red-800">*</span>
            </label>
            <input
              value={lName}
              onChange={(e)=>setlName(e.target.value)}
              type="text"
              placeholder="Enter Last Name"
              className="outline-none w-[400px] placeholder:text-gray-300 rounded-md p-2 bg-[#9BA4B5]"
            />
          </div>
          <div className="flex flex-col mx-4">
            <label>
              Phone<span className="text-red-800">*</span>
            </label>
            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              type="number"
              placeholder="Enter Email"
              className="outline-none w-[400px] rounded-md placeholder:text-gray-300 p-2 bg-[#9BA4B5]"
            />
          </div>
          <div className="flex gap-4 p-5">
            <button
              type="button"
              onClick={() => navigate("/admin/teacher")}
              className="bg-red-300 p-4 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-300 p-4 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default EditTeacher;