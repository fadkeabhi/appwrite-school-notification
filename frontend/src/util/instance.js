import axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	"content-type": "application/json"
});

export default instance;
