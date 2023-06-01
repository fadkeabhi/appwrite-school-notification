export const server = 'http://localhost:4000'; 
export const frontend = 'http://localhost:3000'; 
export const callback = `${frontend}/callback`;
export const callbackBackend = `${server}/auth/callback`;
export const getAppWriteProjectId = `${server}/user/projectid`;
export const googleCheckInRoute = `${server}/auth/google`; 
export const getUserRoute = `${server}/user/session`;
export const logOutRoute = `${server}/logout`;

export const getTeacherRoute = `${server}/admin/teachers`;
export const createTeacherRoute = `${server}/admin/teacher/create`;
export const updateTeacherRoute = `${server}/admin/teacher/update`;

export const getStudentRoute = `${server}/admin/students`;
export const createStudentRoute = `${server}/admin/student/create`;
export const updateStudentRoute = `${server}/admin/student/update`;
export const updateStudentClassRoute = `${server}/admin/student/class/update`;
export const removeStudentClassRoute = `${server}/admin/student/class/remove`;

export const getClassRoute = `${server}/admin/class`;
export const createClassRoute = `${server}/admin/class/create`;
export const linkTeacherClassRoute = `${server}/admin/teacher/class/add`;
export const unlinkTeacherClassRoute = `${server}/admin/teacher/class/remove`;

export const createPostRoute = `${server}/teacher/feed/create`;
export const GetPostRoute = `${server}/teacher/feed/get`;

export const getFeedStudentRoute = `${server}/student/feed/100`;
export const getStudentKeyRoute = `${server}/student/novu/key`;
