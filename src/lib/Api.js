export default class Api {
    constructor() {
        this.baseUri = 'http://localhost:8081';
    }
    fetch(api, request = {}) {
        return fetch(`${this.baseUri}${api}`, request)
            .then(res => res.json());
    }
    post(api, body = {}) {
        const request = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };

        return this.fetch(api, request);
    }
    put(api, body = {}) {
        const request = {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };

        return this.fetch(api, request);
    }
    delete(api, body = {}) {
        const request = {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };

        return this.fetch(api, request);
    }

}
