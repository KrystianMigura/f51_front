const token = localStorage.getItem("token");
class Query {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Connection': 'keep-alive',
            'token': 'Berarer ' + token
        };
        this.url = "https://127.0.0.1:8443"
    }

    async post(url, body) {
        const data = await fetch(this.url+ url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => { return  data })
            .catch(error => { return error });
        return data;
    }

    async get(url) {
       return await fetch(this.url+ url,{
            method: 'GET',
            headers: this.headers
        });
    }

    async put(url, data) {
        return await fetch(this.url+ url,{
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(res => res.json())
    }

    async del(url, data) {
        return await fetch(this.url+ url,{
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(res => res.json())
    }

    async options(url) {
        return await fetch(this.url+ url,{
            method: 'OPTIONS',
            headers: this.headers
        });
    }
}
module.exports = {
    Query : new Query()
};