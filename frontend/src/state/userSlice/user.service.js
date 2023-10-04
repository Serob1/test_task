import axios from '../../axios/axios';

function signupUser(body) {
    return axios.post('/api/register', body)
}

function loginUser(body) {
    return axios.post('/api/login', body)
}

function getAuthorizedUser(token) {
    return axios.get('/api/user', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

const UserService = {
    signupUser,
    loginUser,
    getAuthorizedUser,
}

export default UserService;