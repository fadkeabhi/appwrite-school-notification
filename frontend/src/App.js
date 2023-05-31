import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dash from './pages/Dash';
import { getUserRoute } from './API/Routes';
import instance from './util/instance';
import AdminDash from './pages/Admin/AdminDash';
import Teacher from './pages/Admin/Teacher';
import AddTeacher from './pages/Admin/AddTeacher';
import EditTeacher from './pages/Admin/EditTeacher';

import Student from './pages/Admin/Student';
import AddStudent from './pages/Admin/AddStudent';
import EditStudent from './pages/Admin/EditStudent';

import Clas from './pages/Admin/Clas';
import AddClass from './pages/Admin/AddClass';
import EditClass from './pages/Admin/EditClass';
import TeacherDash from './pages/TeacherDash';
import Post from './pages/Teacher/Post';

import StudentDash from './pages/Student/StudentDash'
import Feed from './pages/Student/Feed'
import Callback from './util/callback'

import { useNavigate } from "react-router-dom";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function App() {
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    
    
    const getUser = async () => {


      const { data } = await instance.get(getUserRoute);
      if (!user.role && data.role) {
        setUser(data);
      }
      else if(user.role){
        //nothing
      }
      else {
        await delay(5000);
        getUser();
      }
      console.log(user)
    }

    getUser();
  }, [user])


  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Home />}></Route>
        <Route exact path={'/admin'} element={<AdminDash user={user} />}></Route>
        <Route exact path={'/admin/teacher'} element={<Teacher />}></Route>
        <Route exact path={'/admin/teacher/add'} element={<AddTeacher />} ></Route>
        <Route exact path={`/admin/teacher/edit`} element={<EditTeacher />}></Route>
        <Route exact path={`/admin/student`} element={<Student />}></Route>
        <Route exact path={'/admin/student/add'} element={<AddStudent />} ></Route>
        <Route exact path={`/admin/student/edit`} element={<EditStudent />}></Route>
        <Route exact path={`/admin/class`} element={<Clas />}></Route>
        <Route exact path={`/admin/class/add`} element={<AddClass />}></Route>
        <Route exact path={`/admin/class/edit`} element={<EditClass />}></Route>
        <Route exact path={`/dash`} element={<Feed user={user} />}></Route>
        <Route exact path='/teacher' element={user ? <TeacherDash user={user} /> : <Navigate to={'/'} />}></Route>
        <Route exact path='/teacher/createpost' element={user ? <Post user={user} /> : <Navigate to={'/'} />}></Route>
        <Route exact path='/callback' element={<Callback />}></Route>
      </Routes>
    </div>
  );
}

export default App;
