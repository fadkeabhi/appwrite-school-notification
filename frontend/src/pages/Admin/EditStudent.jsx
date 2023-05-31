import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import instance from '../../util/instance';
import { getStudentRoute, updateStudentRoute } from '../../API/Routes';

function EditStudent() {
    const [email, setEmail] = useState("");
    const [parentEmail, setparentEmail] = useState("");
    const [fName, setfName] = useState("");
    const [pName, setpName] = useState("");
    const [lName, setlName] = useState("");
    const [sPhone, setsPhone] = useState("");
    const [pPhone, setpPhone] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const getData = async () => {
        const { data } = await instance.get(`${getStudentRoute}`);
        const result = data.find(({ _id }) => _id === id);
        return result;
    }
    const FormSubmitHandler = (e) => {
        e.preventDefault();
        const { data } = instance.post(updateStudentRoute, {
            email,
            fName,
            pName,
            lName,
            sPhone,
            pPhone
        });
        navigate('/admin/student');
    }
    useEffect(() => {
        getData().then((result) => {
            setEmail(result.email)
            setparentEmail(result.parentEmail);
            setfName(result.fName);
            setpName(result.pName);
            setlName(result.lName);
            setsPhone(result.sPhone);
            setpPhone(result.pPhone);
        });
    }, [id])
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
                    <h1 className="text-2xl font-semibold">UPDATE STUDENT</h1>
                    <div className="flex flex-col mx-4">
                        <p>EMAIL : {email}</p>
                    </div>
                    <div className="flex flex-col mx-4">
                        <p>PARENT EMAIL : {parentEmail}</p>
                    </div>
                    <div className="flex flex-col mx-4">
                        <label>
                            First name<span className="text-red-800">*</span>
                        </label>
                        <input
                            value={fName}
                            onChange={(e) => { setfName(e.target.value) }}
                            type="text"
                            placeholder="Enter First Name"
                            className="outline-none placeholder:text-gray-300 w-[400px] rounded-md p-2 bg-[#9BA4B5]"
                        />
                    </div>
                    <div className="flex flex-col mx-4">
                        <label>
                            Parent name<span className="text-red-800">*</span>
                        </label>
                        <input
                            value={pName}
                            onChange={(e) => { setpName(e.target.value) }}
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
                            onChange={(e) => setlName(e.target.value)}
                            type="text"
                            placeholder="Enter Last Name"
                            className="outline-none w-[400px] placeholder:text-gray-300 rounded-md p-2 bg-[#9BA4B5]"
                        />
                    </div>
                    <div className="flex flex-col mx-4">
                        <label>
                            Student Phone<span className="text-red-800">*</span>
                        </label>
                        <input
                            value={sPhone}
                            onChange={(e) => setsPhone(e.target.value)}
                            type="number"
                            placeholder="Enter Email"
                            className="outline-none w-[400px] rounded-md placeholder:text-gray-300 p-2 bg-[#9BA4B5]"
                        />
                    </div>
                    <div className="flex flex-col mx-4">
                        <label>
                            Parent Phone<span className="text-red-800">*</span>
                        </label>
                        <input
                            value={pPhone}
                            onChange={(e) => setpPhone(e.target.value)}
                            type="number"
                            placeholder="Enter Email"
                            className="outline-none w-[400px] rounded-md placeholder:text-gray-300 p-2 bg-[#9BA4B5]"
                        />
                    </div>
                    <div className="flex gap-4 p-5">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/student")}
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

export default EditStudent;