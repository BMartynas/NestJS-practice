import api from '../apiClient'

const url = 'cats/';

class CatsService {

    static getCats() {
        return new Promise((resolve, reject) => {
            api.get(url).then(res => {
                const data = res.data;
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    static getCat(catId) {
        return new Promise((resolve, reject) => {
            api.get(`${url}${catId}`).then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    static addCat(cat) {
        return api.post(url, cat);
    }

    static updateCat(catId, updatedCat) {
        return api.put(`${url}${catId}`, updatedCat);
    }

    static deleteCat(id) {
        return api.delete(`${url}${id}`);
    }

    static getPicture(catId) {
        return new Promise((resolve, reject) => {
            api.get(`${url}${catId}/picture`,{responseType: 'blob'}).then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}

export default CatsService;