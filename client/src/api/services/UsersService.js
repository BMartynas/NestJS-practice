import api from '../apiClient'

const loginUrl = 'auth/login';
const registerUrl = 'users';
const profileUrl = 'profile'

class UsersService {

    static login(user) {
        return api.post(loginUrl, user);
    }
    
    static register(user) {
        return api.post(registerUrl, user);
    }

    static getProfile() {
        return new Promise((resolve, reject) => {
            api.get(profileUrl).then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}

export default UsersService;