import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import instance from '../../util/instance';
import { getClassRoute, getTeacherRoute, linkTeacherClassRoute, unlinkTeacherClassRoute, getStudentRoute, updateStudentClassRoute, removeStudentClassRoute } from '../../API/Routes';


function StudentComponent(props) {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [clas, setClas] = useState('');
    const [studentClass, setStudentClass] = useState('');

    useEffect(() => {
        if (props.data.class === props.clas) {
            setChecked(true)
        }
        setEmail(props.data.email)
        setClas(props.clas)
        setStudentClass(props.data.class)
    }, [props])

    const handleChange = async () => {
        if (!checked) {
            //add student to current class
            const { data } = instance.post(updateStudentClassRoute, {
                email,
                clas
            })
                .then((e) => {
                    setChecked(!checked);
                    setStudentClass(clas)
                })
        }
        else {
            const { data } = instance.post(removeStudentClassRoute, {
                email
            })
                .then((e) => {
                    setChecked(!checked);
                    setStudentClass("")
                })
        }
    }

    return (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />
                    {props.data.email}
                    <p>
                        {props.data.fName} {props.data.lName}
                    </p>
                    <p>
                        Class : {studentClass}
                    </p>
                </label>
            </div>
        </div>
    )
}

function StudentsComponent(props) {
    const [students, setStudents] = useState([]);
    const getSData = async () => {
        const { data } = await instance.get(`${getStudentRoute}`);
        return data;
    }

    useEffect(() => {
        getSData().then((result) => {
            setStudents(result);
        });
    }, [props])

    return (
        <div className='grid text-white p-3 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto'>
            {
                students.map((student) => (
                    <div className='flex bg-[#394867] rounded-md'>
                        <StudentComponent key={student.$id} data={student} clas={props.clas} className='flex-1 text-white text-lg font-semibold flex flex-col p-4 rounded-md' />
                    </div>
                ))
            }
        </div>
    )
}

function TeacherComponent(props) {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [clas, setClas] = useState('');
    //set initial status
    useEffect(() => {
        if (props?.data?.class?.includes(props.clas)) {
            setChecked(true)
        }
        setEmail(props.data.email)
        setClas(props.clas)
    }, [props])

    const handleChange = async () => {
        //change status
        if (!checked) {
            const { data } = instance.post(linkTeacherClassRoute, {
                email,
                clas
            })
                .then((e) => {
                    setChecked(!checked);
                })
        }
        else {
            const { data } = instance.post(unlinkTeacherClassRoute, {
                email,
                clas
            })
                .then((e) => {
                    setChecked(!checked);
                })
        }

    };
    return (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />
                    {props.data.email}
                    <p>
                        {props.data.fName} {props.data.lName}
                    </p>
                </label>
            </div>
        </div>

    )
}


function EditClass() {
    const [displayStudent, setDisplayStudent] = useState(false);
    const [clas, setClas] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const getCData = async () => {
        const { data } = await instance.get(`${getClassRoute}`);
        const result = data.find(({ $id }) => $id === id);
        return result;
    }

    const getTData = async () => {
        const { data } = await instance.get(`${getTeacherRoute}`);
        return data;
    }

    useEffect(() => {
        getCData().then((result) => {
            setClas(result.class);
        });
        getTData().then((result) => {
            setTeachers(result);
        });
    }, [id])
    const handleOpen = (e) => {
        setDisplayStudent(!displayStudent)
    }


    return (
        <Layout>
            <div className="flex-1 w-full flex items-center justify-center rounded-lg">
                <div className="bg-white shadow-xl text-lg max-w-full font-semibold flex flex-col p-10 rounded-md gap-5 items-center justify-center">
                    <h1 className="text-2xl font-semibold">UPDATE CLASS</h1>
                    <div className="flex flex-col mx-4">
                        <p>{clas}</p>
                    </div>
                    <h3 className="text-2xl font-semibold">Teachers Assigned</h3>
                    <div className='grid text-white p-3 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto'>
                        {
                            teachers.map((teacher) => (
                                <div className='flex bg-[#394867] rounded-md'>
                                    <TeacherComponent key={teacher.$id} data={teacher} clas={clas} className='flex-1 text-white text-lg font-semibold flex flex-col p-4 rounded-md' />
                                </div>
                            ))
                        }
                    </div>

                    <h3 className="text-2xl font-semibold" onClick={handleOpen}>Students Assigned</h3>
                    {
                        displayStudent &&
                        <div>
                            <StudentsComponent clas={clas} />
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default EditClass;