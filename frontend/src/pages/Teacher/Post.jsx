import React, { useEffect, useState } from "react";
import { createPostRoute } from "../../API/Routes";
import instance from "../../util/instance";
import { useNavigate } from "react-router";

function Post({ user }) {
    const navigate = useNavigate();
  const [ClassData, setClass] = useState(user.class);
  const [Clas, setSelectedClass] = useState("");
  const [content,setContent] = useState('');
  const [title,setTitle] = useState('');
  const SubmitPostHandler = async (e) => {
    e.preventDefault();
    const {data} = instance.post(createPostRoute,{title,content,clas:Clas});
    console.log(data);
    navigate('/teacher');
  }
  return (
    <div className="h-screen w-screen flex flex-col bg-[#F1F6F9]">
      <header className="bg-[#212A3E] text-[#F1F6F9] flex items-start justify-between p-4">
        <button onClick={()=>navigate('/teacher')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <form method="POST" onSubmit={(e)=>{SubmitPostHandler(e)}} className="bg-white flex flex-col p-5 items-center gap-5 justify-center shadow-lg rounded-lg">
          <h1 className="text-xl font-medium tracking-[10px] py-4">POST</h1>
          <div className="flex flex-col items-start gap-2 justify-center">
            <label>
              Title <span className="text-red-800">*</span>
            </label>
            <input 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter Title"
              className="outline-none bg-[#394867] rounded-md text-xl w-[350px] p-2 text-white"
            />
          </div>
          <div className="flex flex-col items-start gap-2 justify-center">
            <label>
              Content <span className="text-red-800">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              placeholder="Enter Content"
              className="outline-none resize-none h-[100px] bg-[#394867] rounded-md text-lg w-[350px] p-2 text-white"
            />
          </div>
          <div className="flex flex-col mx-4">
            <label>
              Class<span className="text-red-800">*</span>
            </label>
            <select
              value={Clas}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="outline-none bg-[#394867] rounded-md text-xl w-[350px] p-2 text-white"
            >
              <option value={0}>Select Class</option>
              {ClassData.map((clas) => (
                <option value={clas} key={clas}>
                  {clas}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-1 p-5">
            <button type="submit" className="flex hover:ring-2 bg-green-200 hover:bg-green-300 p-2 px-5 rounded-md gap-4">
                <h1>POST</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transform -rotate-45">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
