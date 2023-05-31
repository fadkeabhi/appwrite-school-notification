import React from 'react'
import { useNavigate } from 'react-router';
import {logOutRoute} from '../../API/Routes';
import instance from '../../util/instance';

function NavbarTeacher({ user }) {
  const navigate = useNavigate();
  const logOutHandler = async (e) => {
        const { data } = await instance.get(logOutRoute, {});
        navigate('/');
    }
  return (
    <div className="bg-[#212A3E] text-[#F1F6F9] flex items-center justify-between p-4">
      <div className="flex gap-2">
        <h1 className="text-xl font-bold">{user.fName} {user.lName}</h1>
      </div>
      <button
        onClick={logOutHandler}
        className="flex sm:w-[150px] px-3 py-2 rounded-lg bg-white text-black gap-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <p className="hidden sm:block">Logout</p>
      </button>
    </div>
  );
}

export default NavbarTeacher;
